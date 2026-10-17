import { NEGOCIO } from "./firebase-config.js";
NEGOCIO.promoCumple = "Corte a mitad de precio";   // solo en el demo
// Firestore falso en memoria, solo para grabar el video de demostración (datos inventados).
let _s = 7; const rnd = () => (_s = (_s * 16807) % 2147483647) / 2147483647;
const pick = (a) => a[Math.floor(rnd() * a.length)];
const store = new Map(); const listeners = new Set();
const col = (p) => { if (!store.has(p)) store.set(p, new Map()); return store.get(p); };
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const sec = (d) => ({ seconds: Math.floor(d.getTime() / 1000), nanoseconds: 0 });
const hhmm = (h, m = 0) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
const id = () => Math.random().toString(36).slice(2, 12);
const hoy = new Date();
const dia = (n) => { const d = new Date(hoy); d.setDate(d.getDate() + n); return d; };

const SERV = [["Corte de cabello",150,200],["Corte y greca",200,200],["Corte y ceja",180,200],["Cejas",50,50],["Corte y barba",250,250],["Corte y facial",250,250],["Corte VIP",400,500]];
const NOM = ["Carlos","Diego","Luis","Emiliano","Jorge","Andrés","Marco","Iván","Ricardo","Fernando","Santiago","Axel","Mateo","Bruno","Héctor","Óscar","Raúl","Pablo","Sergio","Adrián"];
const APE = ["Mendoza","Ramírez","Hernández","Cruz","Salinas","Vega","Aguilar","Torres","Lozano","Ortega","Rivas","Peña","Guerrero","Castillo","Núñez","Ibarra","Cortés","Soto"];
const tel = () => "771555" + String(Math.floor(rnd() * 9000) + 1000);

// admins
col("admins").set("demo-admin", {});

// clientes
const clientes = [];
for (let i = 0; i < 58; i++) {
  const mesN = Math.floor(rnd() * 6), creado = dia(-Math.floor(rnd() * 170) - (i < 12 ? 0 : 0));
  if (i < 12) creado.setTime(dia(-Math.floor(rnd() * 16)).getTime());
  const s = Math.floor(rnd() * 11);
  const ult = rnd() < .72 ? dia(-Math.floor(rnd() * 28)) : dia(-35 - Math.floor(rnd() * 60));
  const c = { nombre: `${pick(NOM)} ${pick(APE)}`, telefono: tel(), sellos: s, creado: sec(creado), ultimaVisita: sec(ult), facialCanjeado: s >= 5 && rnd() < .5, tarjetas: s === 10 ? 1 : 0 };
  if (rnd() < .3) c.cumple = `${String(rnd() < .22 ? hoy.getMonth() + 1 : Math.floor(rnd() * 12) + 1).padStart(2, "0")}-${String(Math.floor(rnd() * 27) + 1).padStart(2, "0")}`;
  const cid = id(); col("clientes").set(cid, c); clientes.push([cid, c]);
}
// un cliente conocido para la escena de sellar
col("clientes").set("demo-cliente", { nombre: "Carlos Mendoza", telefono: "7715550142", sellos: 4, creado: sec(dia(-60)), ultimaVisita: sec(dia(-6)), facialCanjeado: false });

// citas
const nombreCita = () => `${pick(NOM)} ${pick(APE)}`;
function cita(fecha, hora, estado, origen = "web", extra = {}) {
  const [n, pn, pc] = pick(SERV);
  const precio = origen === "walkin" ? pn : pc;
  const o = { nombre: nombreCita(), telefono: tel(), servicio: n, precio, precioNormal: precio, fecha: iso(fecha), hora, estado, origen, creado: sec(dia(-2)), ...extra };
  col("citas").set(id(), o); return o;
}
// hoy
[[10,"atendida","web","Mateo Ortega","Corte y barba",250],[11,"atendida","web","Daniel Cortés","Corte de cabello",200],[12,"atendida","walkin","Raúl Soto","Corte y greca",200],[13,"atendida","web","Iván Mendoza","Corte y facial",250],[14,"atendida","web","Jorge Salinas","Corte VIP",500],
 [16,"confirmada","web","Emiliano Cruz","Corte y ceja",200],[17,"confirmada","web","Andrés Vega","Corte y barba",250],[18,"pendiente","web","Santiago Rivas","Corte de cabello",200],[19,"pendiente","web","Axel Peña","Corte y facial",250],[20,"confirmada","web","Luis Hernández","Corte VIP",500]]
  .forEach(([h,e,o,n,sv,p]) => col("citas").set(id(), { nombre: n, telefono: tel(), servicio: sv, precio: p, precioNormal: p, fecha: iso(dia(0)), hora: hhmm(h), estado: e, origen: o, creado: sec(dia(-1)), ...(e === "pendiente" ? { nuevaTarjeta: true } : {}) }));
// próximos días
[[1,11,"confirmada"],[1,13,"pendiente"],[1,17,"confirmada"],[2,10,"confirmada"],[2,16,"pendiente"],[3,12,"confirmada"]].forEach(([d,h,e]) => cita(dia(d), hhmm(h), e));
// últimos 6 meses
const porMes = [26, 34, 41, 49, 58, 52];
porMes.forEach((n, k) => {
  const off = k - 5; const base = new Date(hoy.getFullYear(), hoy.getMonth() + off, 1);
  const ult = off === 0 ? Math.max(1, hoy.getDate() - 1) : new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  for (let i = 0; i < n; i++) {
    const f = new Date(base.getFullYear(), base.getMonth(), Math.min(ult, 1 + Math.floor(rnd() * ult)));
    const r = rnd(); cita(f, hhmm(10 + Math.floor(rnd() * 10)), r < .86 ? "atendida" : r < .94 ? "cancelada" : "novino");
  }
});

// caja
const MET = ["efectivo","efectivo","transferencia","terminal"];
const conceptos = SERV.map(([n]) => n);
function mov(fecha, h, m, tipo, concepto, monto, metodo, propina = 0) {
  col("caja").set(id(), { tipo, concepto, monto, metodo, ...(propina ? { propina } : {}), fecha: iso(fecha), hora: hhmm(h, m), creado: sec(fecha), por: "admin" });
}
[[10,20,"Corte de cabello",150,"efectivo",0],[11,35,"Corte y barba",250,"transferencia",0],[12,50,"Corte y facial",250,"terminal",0],[13,40,"Corte de cabello",200,"efectivo",20],[14,30,"Corte VIP",500,"terminal",50],[15,10,"Corte y greca",200,"efectivo",0]]
  .forEach(([h,m,c,mo,me,p]) => mov(dia(0), h, m, "ingreso", c, mo, me, p));
mov(dia(0), 11, 0, "gasto", "Productos de limpieza", 180, "efectivo");
for (let d = -1; d >= -(hoy.getDate() - 1 > 6 ? hoy.getDate() - 1 : 6); d--) {
  const n = 5 + Math.floor(rnd() * 5);
  for (let i = 0; i < n; i++) { const [c, pn, pc] = pick(SERV); const conCita = rnd() < .55; mov(dia(d), 10 + Math.floor(rnd() * 10), pick([0,15,30,45]), "ingreso", c, conCita ? pc : pn, pick(MET), rnd() < .2 ? 20 : 0); }
  if (rnd() < .4) mov(dia(d), 12, 0, "gasto", pick(["Navajas y cuchillas","Café y bebidas","Toallas"]), pick([90,150,220,320]), "efectivo");
}

// stats
const vis = [88, 104, 121, 139, 162, 131];
vis.forEach((v, k) => { const m = new Date(hoy.getFullYear(), hoy.getMonth() + k - 5, 1); col("stats").set(`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`, { visitas: v, premios5: 6 + k * 2, premios10: 2 + k }); });

// ---------------- API tipo Firestore ----------------
const partes = (p) => p.split("/");
const SV = "__serverTimestamp";
export const serverTimestamp = () => ({ [SV]: 1 });
export const increment = (n) => ({ __inc: n });
export const collection = (_db, ...p) => ({ kind: "col", path: p.join("/") });
export const doc = (b, ...p) => {
  if (b.kind === "col") { const i = p[0] || id(); return { kind: "doc", path: b.path + "/" + i, id: i, col: b.path }; }
  const path = p.join("/"), s = partes(path); return { kind: "doc", path, id: s[s.length - 1], col: s.slice(0, -1).join("/") };
};
export const where = (f, op, v) => ({ t: "w", f, op, v });
export const orderBy = (f, dir = "asc") => ({ t: "o", f, dir });
export const limit = (n) => ({ t: "l", n });
export const query = (c, ...cons) => ({ kind: "q", path: c.path, cons });
const clone = (o) => JSON.parse(JSON.stringify(o));
const ds = (cp, i, d) => ({ id: i, ref: { kind: "doc", path: cp + "/" + i, id: i, col: cp }, exists: () => true, data: () => clone(d) });
const cmp = (a, b, op) => op === "==" ? a === b : op === ">=" ? a >= b : op === "<=" ? a <= b : op === ">" ? a > b : op === "<" ? a < b : op === "!=" ? a !== b : true;
const snapOf = (ref) => {
  if (ref.kind === "doc") { const d = col(ref.col).get(ref.id); return d ? ds(ref.col, ref.id, d) : { id: ref.id, ref, exists: () => false, data: () => undefined }; }
  let rows = [...col(ref.path).entries()];
  for (const c of ref.cons || []) {
    if (c.t === "w") rows = rows.filter(([, d]) => cmp(d[c.f], c.v, c.op));
    if (c.t === "o") rows.sort(([, a], [, b]) => (a[c.f] > b[c.f] ? 1 : a[c.f] < b[c.f] ? -1 : 0) * (c.dir === "desc" ? -1 : 1));
    if (c.t === "l") rows = rows.slice(0, c.n);
  }
  const docs = rows.map(([i, d]) => ds(ref.path, i, d));
  return { docs, empty: !docs.length, size: docs.length, forEach: (f) => docs.forEach(f) };
};
export const getDoc = async (r) => snapOf(r);
export const getDocs = async (q) => snapOf(q);
export const onSnapshot = (ref, next) => { const l = { ref, next }; listeners.add(l); setTimeout(() => next(snapOf(ref)), 0); return () => listeners.delete(l); };
const emit = (cp) => setTimeout(() => listeners.forEach((l) => { const p = l.ref.kind === "doc" ? l.ref.col : l.ref.path; if (p === cp) l.next(snapOf(l.ref)); }), 0);
const resolve = (old, nuevo) => { const o = { ...old }; for (const [k, v] of Object.entries(nuevo)) { if (v && v[SV]) o[k] = sec(new Date()); else if (v && v.__inc !== undefined) o[k] = (o[k] || 0) + v.__inc; else o[k] = v; } return o; };
export const addDoc = async (c, d) => { const i = id(); col(c.path).set(i, resolve({}, d)); emit(c.path); return { id: i }; };
export const setDoc = async (r, d, o) => { col(r.col).set(r.id, resolve(o && o.merge ? col(r.col).get(r.id) || {} : {}, d)); emit(r.col); };
export const updateDoc = async (r, d) => { col(r.col).set(r.id, resolve(col(r.col).get(r.id) || {}, d)); emit(r.col); };
export const deleteDoc = async (r) => { col(r.col).delete(r.id); emit(r.col); };
export const writeBatch = () => { const ops = []; return { set: (r, d, o) => ops.push(() => setDoc(r, d, o)), update: (r, d) => ops.push(() => updateDoc(r, d)), delete: (r) => ops.push(() => deleteDoc(r)), commit: async () => { for (const f of ops) await f(); } }; };
export const runTransaction = async (_db, fn) => fn({ get: async (r) => snapOf(r), update: (r, d) => updateDoc(r, d), set: (r, d, o) => setDoc(r, d, o) });
export const getFirestore = () => ({});
