// SafeSync — standalone client-only clone (React, no build step, localStorage persistence)
const e = React.createElement;
const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ---------------------------------------------------------------- */
/* Icons (hand-drawn, lucide-style line icons, no external deps)     */
/* ---------------------------------------------------------------- */
function Icon({ path, size = 18, className = "", strokeWidth = 2, viewBox = "0 0 24 24" }) {
  return e(
    "svg",
    {
      width: size, height: size, viewBox,
      fill: "none", stroke: "currentColor", strokeWidth,
      strokeLinecap: "round", strokeLinejoin: "round",
      className,
    },
    path
  );
}
const P = (d) => e("path", { d });
const ICONS = {
  flame: (props) => Icon({ ...props, path: [P("M12 2c1.2 3.2-2.3 4.6-2.3 8.1a4.3 4.3 0 1 0 8.6 0c0-1.3-.6-2.6-1.4-2.9.9 2.8-1.3 4.3-2.6 2.9 1.4-2.6-1.1-4.1-2.3-8.1z")] }),
  grid: (props) => Icon({ ...props, path: [P("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z")] }),
  clipboard: (props) => Icon({ ...props, path: [e("rect", { x: 6, y: 3, width: 12, height: 18, rx: 2, key: 1 }), e("path", { d: "M9 3h6v3H9z", key: 2 }), e("path", { d: "M9 11h6M9 15h4", key: 3 })] }),
  send: (props) => Icon({ ...props, path: [P("M4 12 20 4l-6 16-3-7-7-3z")] }),
  database: (props) => Icon({ ...props, path: [e("ellipse", { cx: 12, cy: 5, rx: 8, ry: 3, key: 1 }), e("path", { d: "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5", key: 2 }), e("path", { d: "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3", key: 3 })] }),
  users: (props) => Icon({ ...props, path: [e("circle", { cx: 9, cy: 8, r: 3.2, key: 1 }), e("path", { d: "M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5", key: 2 }), e("path", { d: "M16.5 5.2a3.2 3.2 0 0 1 0 6.1", key: 3 }), e("path", { d: "M15 14.5c2.8.3 4.8 2.4 4.8 5.5", key: 4 })] }),
  search: (props) => Icon({ ...props, path: [e("circle", { cx: 11, cy: 11, r: 7, key: 1 }), e("path", { d: "M21 21l-4.3-4.3", key: 2 })] }),
  filter: (props) => Icon({ ...props, path: [P("M4 5h16l-6 8v6l-4-2v-4z")] }),
  calendar: (props) => Icon({ ...props, path: [e("rect", { x: 3, y: 5, width: 18, height: 16, rx: 2, key: 1 }), e("path", { d: "M3 10h18M8 3v4M16 3v4", key: 2 })] }),
  pin: (props) => Icon({ ...props, path: [P("M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z"), e("circle", { cx: 12, cy: 9.5, r: 2.3, key: 2 })] }),
  user: (props) => Icon({ ...props, path: [e("circle", { cx: 12, cy: 8, r: 4, key: 1 }), e("path", { d: "M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5", key: 2 })] }),
  plus: (props) => Icon({ ...props, path: [P("M12 5v14M5 12h14")] }),
  mail: (props) => Icon({ ...props, path: [e("rect", { x: 3, y: 5, width: 18, height: 14, rx: 2, key: 1 }), e("path", { d: "m3 7 9 6 9-6", key: 2 })] }),
  chevronDown: (props) => Icon({ ...props, path: [P("m6 9 6 6 6-6")] }),
  x: (props) => Icon({ ...props, path: [P("M18 6 6 18M6 6l12 12")] }),
  logout: (props) => Icon({ ...props, path: [P("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"), P("M16 17l5-5-5-5"), P("M21 12H9")] }),
  arrowLeft: (props) => Icon({ ...props, path: [P("M19 12H5"), P("m12 19-7-7 7-7")] }),
  shield: (props) => Icon({ ...props, path: [P("M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5z")] }),
  image: (props) => Icon({ ...props, path: [e("rect", { x: 3, y: 3, width: 18, height: 18, rx: 2, key: 1 }), e("circle", { cx: 9, cy: 9, r: 2, key: 2 }), e("path", { d: "m21 15-5-5L5 21", key: 3 })] }),
  check: (props) => Icon({ ...props, path: [P("M20 6 9 17l-5-5")] }),
  trash: (props) => Icon({ ...props, path: [P("M3 6h18"), P("M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"), P("M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"), P("M10 11v6M14 11v6")] }),
  edit: (props) => Icon({ ...props, path: [P("M12 20h9"), P("M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z")] }),
  download: (props) => Icon({ ...props, path: [P("M12 3v12"), P("m7 10 5 5 5-5"), P("M5 21h14")] }),
  chevronRight: (props) => Icon({ ...props, path: [P("m9 18 6-6-6-6")] }),
  alert: (props) => Icon({ ...props, path: [P("M12 9v4"), P("M12 17h.01"), P("M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z")] }),
};
function Ic(name, props) { return (ICONS[name] || ICONS.alert)(props || {}); }

/* ---------------------------------------------------------------- */
/* Constants                                                          */
/* ---------------------------------------------------------------- */
const INCIDENT_TYPES_DEFAULT = [
  "Near Miss", "First Aid Case", "Medical Treatment Injury", "Lost Time Injury", "Fatality",
  "Slip Trip & Fall", "Vehicle Accident", "Fire Incident", "Explosion", "Chemical Spill",
  "Gas Leak", "Environmental Incident", "Property Damage", "Equipment Failure", "Electrical Incident",
  "Unsafe Act", "Unsafe Condition", "PPE Violation", "Occupational Illness", "Heat Stress",
  "Confined Space Incident", "Working at Height Incident", "Falling Object", "Manual Handling Injury",
  "Security Incident", "Theft", "Natural Disaster", "Animal/Insect Bite", "LPG Leakage",
  "Natural Disaster Impact", "Contractor Incident", "Public/Visitors Incident", "Other",
];
const LOCATIONS_DEFAULT = ["HQ", "Dhaka Plant", "Ctg Plant"];
const STATUSES = ["Open", "Under Review", "Closed"];
const ROLES = [
  { id: "reporter", label: "Reporter", desc: "Regular employee — reports and tracks own incidents", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "manager", label: "Manager", desc: "Monitors all incidents company-wide", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "admin", label: "Admin", desc: "Full access including master data & user management", badge: "bg-slate-900 text-white border-slate-900" },
];
const PERMISSIONS_DEFAULT = [
  { key: "submit_incident", label: "Submit Incident", roles: ["reporter", "manager", "admin"] },
  { key: "view_own_reports", label: "View Own Reports", roles: ["reporter", "manager", "admin"] },
  { key: "view_incident_log", label: "View Company-wide Incident Log", roles: ["manager", "admin"] },
  { key: "update_status", label: "Update Incident Status / Review", roles: ["manager", "admin"] },
  { key: "manage_master_data", label: "Manage Master Data / Lookup Lists", roles: ["admin"] },
  { key: "manage_users", label: "Manage Users", roles: ["admin"] },
];
const STATUS_STYLES = {
  "Open": "bg-red-50 text-red-700 border-red-200",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
  "Closed": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

/* ---------------------------------------------------------------- */
/* Store (localStorage-backed)                                       */
/* ---------------------------------------------------------------- */
const LS_KEY = "safesync_db_v1";
function loadDB() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) { /* ignore corrupt state */ }
  return seedDB();
}
function seedDB() {
  const now = new Date().toISOString();
  const db = {
    users: [
      { id: "u_admin", name: "Admin Demo", email: "admin@safesync.demo", password: "admin123", role: "admin" },
      { id: "u_manager", name: "Manager Demo", email: "manager@safesync.demo", password: "manager123", role: "manager" },
      { id: "u_reporter", name: "Reporter Demo", email: "reporter@safesync.demo", password: "reporter123", role: "reporter" },
    ],
    incidentTypes: INCIDENT_TYPES_DEFAULT.slice(),
    locations: LOCATIONS_DEFAULT.slice(),
    permissions: PERMISSIONS_DEFAULT.map((p) => ({ ...p, roles: p.roles.slice() })),
    incidents: [
      {
        id: "inc_seed1", number: "INC-20260810-091500", title: "Slippery floor near loading bay",
        reporterName: "Reporter Demo", yourLocation: "Dhaka Plant", incidentLocation: "Loading Bay 2",
        incidentDate: "2026-08-10T09:15", type: "Slip Trip & Fall",
        description: "Water leak created a slippery patch near the loading bay entrance.",
        status: "Open", reviewedBy: "", reviewNotes: "", attachmentName: "",
        createdBy: "u_reporter", createdByName: "Reporter Demo", createdDate: now,
      },
      {
        id: "inc_seed2", number: "INC-20260805-140230", title: "Minor LPG odour reported",
        reporterName: "Reporter Demo", yourLocation: "Ctg Plant", incidentLocation: "Storage Yard A",
        incidentDate: "2026-08-05T14:02", type: "LPG Leakage",
        description: "Faint gas odour detected near storage yard A, resolved after inspection.",
        status: "Under Review", reviewedBy: "Manager Demo", reviewNotes: "Inspection scheduled.", attachmentName: "",
        createdBy: "u_reporter", createdByName: "Reporter Demo", createdDate: now,
      },
    ],
    session: null,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(db));
  return db;
}
let _db = loadDB();
function saveDB() { localStorage.setItem(LS_KEY, JSON.stringify(_db)); }
const Store = {
  get: () => _db,
  setSession: (userId) => { _db.session = userId; saveDB(); },
  currentUser: () => _db.users.find((u) => u.id === _db.session) || null,
  addUser: (user) => { _db.users.push(user); saveDB(); },
  updateUserRole: (id, role) => { const u = _db.users.find((x) => x.id === id); if (u) u.role = role; saveDB(); },
  addIncident: (inc) => { _db.incidents.unshift(inc); saveDB(); },
  updateIncident: (id, patch) => { const i = _db.incidents.find((x) => x.id === id); if (i) Object.assign(i, patch); saveDB(); },
  addIncidentType: (name) => { if (!_db.incidentTypes.includes(name)) _db.incidentTypes.push(name); saveDB(); },
  removeIncidentType: (name) => { _db.incidentTypes = _db.incidentTypes.filter((t) => t !== name); saveDB(); },
  addLocation: (name) => { if (!_db.locations.includes(name)) _db.locations.push(name); saveDB(); },
  removeLocation: (name) => { _db.locations = _db.locations.filter((l) => l !== name); saveDB(); },
  setPermission: (key, role, allowed) => {
    const p = _db.permissions.find((x) => x.key === key);
    if (!p) return;
    const has = p.roles.includes(role);
    if (allowed && !has) p.roles.push(role);
    if (!allowed && has) p.roles = p.roles.filter((r) => r !== role);
    saveDB();
  },
  can: (role, key) => {
    const p = _db.permissions.find((x) => x.key === key);
    return p ? p.roles.includes(role) : false;
  },
};

/* ---------------------------------------------------------------- */
/* Helpers                                                            */
/* ---------------------------------------------------------------- */
function cx(...a) { return a.filter(Boolean).join(" "); }
function uid(prefix) { return prefix + "_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
function genIncidentNumber() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `INC-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }) +
    ", " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

/* ---------------------------------------------------------------- */
/* Auth context + hash router                                        */
/* ---------------------------------------------------------------- */
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/login");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/login");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}
function navigate(hash) { window.location.hash = hash; }

/* ---------------------------------------------------------------- */
/* UI primitives                                                     */
/* ---------------------------------------------------------------- */
function Button({ children, variant = "primary", className = "", ...rest }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    accent: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200",
  };
  return e("button", { className: cx(base, variants[variant], className), ...rest }, children);
}
function TextInput(props) {
  return e("input", {
    ...props,
    className: cx("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500", props.className),
  });
}
function TextArea(props) {
  return e("textarea", {
    ...props,
    className: cx("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500", props.className),
  });
}
function SelectInput({ children, ...props }) {
  return e("select", {
    ...props,
    className: cx("w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500", props.className),
  }, children);
}
function Label({ children }) { return e("label", { className: "block text-xs font-medium text-slate-600 mb-1" }, children); }
function Field({ label, children }) { return e("div", null, label ? e(Label, null, label) : null, children); }
function Card({ children, className = "" }) { return e("div", { className: cx("bg-white rounded-xl border border-slate-200", className) }, children); }
function Badge({ children, className = "" }) {
  return e("span", { className: cx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", className) }, children);
}
function StatCard({ label, value, color = "text-slate-900" }) {
  return e(Card, { className: "p-4" },
    e("div", { className: "text-xs font-medium text-slate-500" }, label),
    e("div", { className: cx("text-2xl font-bold mt-1", color) }, value)
  );
}
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2600); return () => clearTimeout(t); }, [message]);
  if (!message) return null;
  return e("div", { className: "fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg fade-in" }, message);
}

/* ---------------------------------------------------------------- */
/* Logo                                                               */
/* ---------------------------------------------------------------- */
function Logo({ size = 40, withText = true }) {
  return e("div", { className: "flex items-center gap-2.5" },
    e("div", {
      style: { width: size, height: size, background: "linear-gradient(135deg,#f97316,#ef4444)" },
      className: "rounded-xl flex items-center justify-center shrink-0",
    }, Ic("flame", { size: size * 0.55, className: "text-white" })),
    withText ? e("span", { className: "text-xl font-bold text-white" }, "SafeSync") : null
  );
}

/* ---------------------------------------------------------------- */
/* Auth pages                                                        */
/* ---------------------------------------------------------------- */
function AuthShell({ children }) {
  return e("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center p-6" },
    e("div", { className: "w-full max-w-sm" },
      e("div", { className: "flex justify-center mb-6" },
        e("div", { className: "flex items-center gap-2.5" },
          e("div", { style: { width: 44, height: 44, background: "linear-gradient(135deg,#f97316,#ef4444)" }, className: "rounded-xl flex items-center justify-center" }, Ic("flame", { size: 24, className: "text-white" })),
          e("span", { className: "text-2xl font-bold text-slate-900" }, "SafeSync")
        )
      ),
      e(Card, { className: "p-6 shadow-sm" }, children)
    )
  );
}
function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("admin@safesync.demo");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  function submit(ev) {
    ev.preventDefault();
    const db = Store.get();
    const u = db.users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password);
    if (!u) { setError("Invalid email or password."); return; }
    auth.login(u.id);
    navigate("#/");
  }
  return e(AuthShell, null,
    e("h1", { className: "text-lg font-semibold text-slate-900 mb-1" }, "Welcome back"),
    e("p", { className: "text-sm text-slate-500 mb-5" }, "Sign in to report and track incidents."),
    e("form", { onSubmit: submit, className: "space-y-4" },
      e(Field, { label: "Email" }, e(TextInput, { type: "email", value: email, onChange: (ev) => setEmail(ev.target.value), placeholder: "you@company.com", required: true })),
      e(Field, { label: "Password" }, e(TextInput, { type: "password", value: password, onChange: (ev) => setPassword(ev.target.value), placeholder: "••••••••", required: true })),
      error ? e("div", { className: "text-sm text-red-600" }, error) : null,
      e(Button, { type: "submit", variant: "accent", className: "w-full" }, "Sign in")
    ),
    e("div", { className: "mt-4 text-xs text-slate-500 bg-slate-50 rounded-lg p-3 leading-relaxed" },
      e("div", { className: "font-medium text-slate-700 mb-1" }, "Demo accounts"),
      e("div", null, "admin@safesync.demo / admin123"),
      e("div", null, "manager@safesync.demo / manager123"),
      e("div", null, "reporter@safesync.demo / reporter123")
    ),
    e("p", { className: "text-sm text-slate-500 mt-4 text-center" },
      "No account? ",
      e("a", { href: "#/register", className: "text-orange-600 font-medium hover:underline" }, "Create one")
    )
  );
}
function RegisterPage() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(ev) {
    ev.preventDefault();
    const db = Store.get();
    if (db.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError("An account with this email already exists.");
      return;
    }
    if (!name.trim() || !email.trim() || password.length < 4) {
      setError("Please fill all fields (password min 4 characters).");
      return;
    }
    const user = { id: uid("u"), name: name.trim(), email: email.trim(), password, role: "reporter" };
    Store.addUser(user);
    auth.login(user.id);
    navigate("#/");
  }
  return e(AuthShell, null,
    e("h1", { className: "text-lg font-semibold text-slate-900 mb-1" }, "Create your account"),
    e("p", { className: "text-sm text-slate-500 mb-5" }, "New accounts start as Reporter by default."),
    e("form", { onSubmit: submit, className: "space-y-4" },
      e(Field, { label: "Full name" }, e(TextInput, { value: name, onChange: (ev) => setName(ev.target.value), placeholder: "Your name", required: true })),
      e(Field, { label: "Email" }, e(TextInput, { type: "email", value: email, onChange: (ev) => setEmail(ev.target.value), placeholder: "you@company.com", required: true })),
      e(Field, { label: "Password" }, e(TextInput, { type: "password", value: password, onChange: (ev) => setPassword(ev.target.value), placeholder: "••••••••", required: true })),
      error ? e("div", { className: "text-sm text-red-600" }, error) : null,
      e(Button, { type: "submit", variant: "accent", className: "w-full" }, "Create account")
    ),
    e("p", { className: "text-sm text-slate-500 mt-4 text-center" },
      "Already have an account? ",
      e("a", { href: "#/login", className: "text-orange-600 font-medium hover:underline" }, "Sign in")
    )
  );
}

/* ---------------------------------------------------------------- */
/* Layout (sidebar + content)                                        */
/* ---------------------------------------------------------------- */
const NAV_ITEMS = [
  { key: "home", route: "#/", label: "Incident Log", icon: "grid", perm: "view_incident_log" },
  { key: "my-reports", route: "#/my-reports", label: "My Reports", icon: "clipboard", perm: "view_own_reports" },
  { key: "report", route: "#/report", label: "Report Incident", icon: "send", perm: "submit_incident" },
  { key: "master-data", route: "#/master-data", label: "Master Data", icon: "database", perm: "manage_master_data" },
  { key: "users", route: "#/users", label: "User Management", icon: "users", perm: "manage_users" },
];
function Sidebar({ active }) {
  const auth = useAuth();
  const role = auth.user.role;
  const roleInfo = ROLES.find((r) => r.id === role) || { label: role };
  return e("aside", { className: "w-64 shrink-0 bg-slate-900 min-h-screen flex flex-col" },
    e("div", { className: "px-5 py-5 border-b border-white/10" }, e(Logo, null)),
    e("nav", { className: "flex-1 py-4 px-3 space-y-1" },
      NAV_ITEMS.filter((item) => Store.can(role, item.perm)).map((item) =>
        e("a", {
          key: item.key, href: item.route,
          className: cx(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
            active === item.key ? "bg-orange-500/15 text-orange-400" : "text-slate-300 hover:bg-white/5 hover:text-white"
          ),
        }, Ic(item.icon, { size: 17 }), item.label)
      )
    ),
    e("div", { className: "border-t border-white/10 p-4 flex items-center gap-3" },
      e("div", { className: "w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold shrink-0" },
        (auth.user.name || "?").slice(0, 1).toUpperCase()),
      e("div", { className: "min-w-0 flex-1" },
        e("div", { className: "text-sm font-medium text-white truncate" }, auth.user.name),
        e("div", { className: "text-xs text-slate-400 truncate" }, roleInfo.label)
      ),
      e("button", { title: "Log out", onClick: () => { auth.logout(); navigate("#/login"); }, className: "text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5" }, Ic("logout", { size: 16 }))
    )
  );
}
function PageHeader({ title, subtitle, action }) {
  return e("div", { className: "flex items-start justify-between mb-6 flex-wrap gap-3" },
    e("div", null,
      e("h1", { className: "text-2xl font-bold text-slate-900" }, title),
      subtitle ? e("p", { className: "text-sm text-slate-500 mt-0.5" }, subtitle) : null
    ),
    action || null
  );
}
function Layout({ active, children }) {
  return e("div", { className: "flex min-h-screen bg-slate-50" },
    e(Sidebar, { active }),
    e("main", { className: "flex-1 p-6 md:p-8 max-w-6xl" }, children)
  );
}

/* ---------------------------------------------------------------- */
/* Incident card                                                     */
/* ---------------------------------------------------------------- */
function TypeBadge({ type }) {
  return e(Badge, { className: "bg-slate-100 text-slate-700 border-slate-200" }, type);
}
function StatusBadge({ status }) {
  return e(Badge, { className: STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200" }, status);
}
function IncidentCard({ inc }) {
  return e("a", { href: `#/incidents/${inc.id}`, className: "block border-b border-slate-100 last:border-0 py-4 px-1 hover:bg-slate-50 -mx-1 rounded-lg transition" },
    e("div", { className: "flex items-start justify-between gap-3" },
      e("div", { className: "min-w-0" },
        e("div", { className: "flex items-center gap-2 flex-wrap mb-1.5" },
          e("span", { className: "text-xs font-mono text-slate-400" }, inc.number),
          e(StatusBadge, { status: inc.status }),
          e(TypeBadge, { type: inc.type })
        ),
        e("div", { className: "font-semibold text-slate-900" }, inc.title),
        e("div", { className: "flex items-center gap-4 text-xs text-slate-500 mt-1.5 flex-wrap" },
          e("span", { className: "flex items-center gap-1" }, Ic("calendar", { size: 13 }), fmtDate(inc.incidentDate)),
          e("span", { className: "flex items-center gap-1" }, Ic("pin", { size: 13 }), inc.incidentLocation || inc.yourLocation),
          e("span", { className: "flex items-center gap-1" }, Ic("user", { size: 13 }), inc.reporterName)
        )
      ),
      e("div", { className: "text-slate-300 shrink-0 mt-1" }, Ic("chevronRight", { size: 18 }))
    )
  );
}

/* ---------------------------------------------------------------- */
/* Incident Log (home) page                                          */
/* ---------------------------------------------------------------- */
function IncidentLogPage() {
  const [tick, setTick] = useState(0);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const db = Store.get();
  const incidents = db.incidents;
  const filtered = incidents.filter((i) => {
    if (statusFilter !== "All" && i.status !== statusFilter) return false;
    if (typeFilter !== "All" && i.type !== typeFilter) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      if (!(i.title.toLowerCase().includes(s) || i.number.toLowerCase().includes(s) || i.reporterName.toLowerCase().includes(s) || (i.incidentLocation || "").toLowerCase().includes(s))) return false;
    }
    return true;
  });
  const counts = {
    total: incidents.length,
    open: incidents.filter((i) => i.status === "Open").length,
    review: incidents.filter((i) => i.status === "Under Review").length,
    closed: incidents.filter((i) => i.status === "Closed").length,
  };
  return e(Layout, { active: "home" },
    e(PageHeader, {
      title: "Incident Log", subtitle: "Report and track safety & incidents",
      action: e(Button, { variant: "primary", onClick: () => navigate("#/report") }, Ic("plus", { size: 16 }), "Report Incident"),
    }),
    e("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" },
      e(StatCard, { label: "Total Incidents", value: counts.total }),
      e(StatCard, { label: "Open", value: counts.open, color: "text-red-600" }),
      e(StatCard, { label: "Under Review", value: counts.review, color: "text-amber-600" }),
      e(StatCard, { label: "Closed", value: counts.closed, color: "text-emerald-600" })
    ),
    e(Card, { className: "p-4 mb-2" },
      e("div", { className: "flex flex-col md:flex-row gap-3" },
        e("div", { className: "relative flex-1" },
          e("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }, Ic("search", { size: 15 })),
          e(TextInput, { value: q, onChange: (ev) => setQ(ev.target.value), placeholder: "Search by title, number, reporter, location...", className: "pl-9" })
        ),
        e(SelectInput, { value: statusFilter, onChange: (ev) => setStatusFilter(ev.target.value), className: "md:w-44" },
          e("option", { value: "All" }, "All Statuses"),
          STATUSES.map((s) => e("option", { key: s, value: s }, s))
        ),
        e(SelectInput, { value: typeFilter, onChange: (ev) => setTypeFilter(ev.target.value), className: "md:w-52" },
          e("option", { value: "All" }, "All Types"),
          db.incidentTypes.map((t) => e("option", { key: t, value: t }, t))
        )
      )
    ),
    e(Card, { className: "p-4" },
      filtered.length === 0
        ? e("div", { className: "text-center text-sm text-slate-400 py-10" }, "No incidents match your filters.")
        : filtered.map((inc) => e(IncidentCard, { key: inc.id, inc }))
    )
  );
}

/* ---------------------------------------------------------------- */
/* My Reports page                                                   */
/* ---------------------------------------------------------------- */
function MyReportsPage() {
  const auth = useAuth();
  const [statusFilter, setStatusFilter] = useState("All");
  const db = Store.get();
  const mine = db.incidents.filter((i) => i.createdBy === auth.user.id);
  const filtered = mine.filter((i) => statusFilter === "All" || i.status === statusFilter);
  const counts = {
    total: mine.length,
    open: mine.filter((i) => i.status === "Open").length,
    review: mine.filter((i) => i.status === "Under Review").length,
    closed: mine.filter((i) => i.status === "Closed").length,
  };
  return e(Layout, { active: "my-reports" },
    e(PageHeader, {
      title: "My Reports", subtitle: "Track the progress of incidents you've submitted",
      action: e(Button, { variant: "primary", onClick: () => navigate("#/report") }, Ic("plus", { size: 16 }), "Report Incident"),
    }),
    e("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" },
      e(StatCard, { label: "My Reports", value: counts.total }),
      e(StatCard, { label: "Open", value: counts.open, color: "text-red-600" }),
      e(StatCard, { label: "Under Review", value: counts.review, color: "text-amber-600" }),
      e(StatCard, { label: "Closed", value: counts.closed, color: "text-emerald-600" })
    ),
    e(Card, { className: "p-4 mb-2 flex items-center gap-3" },
      e("span", { className: "text-xs font-medium text-slate-500" }, "Filter:"),
      e(SelectInput, { value: statusFilter, onChange: (ev) => setStatusFilter(ev.target.value), className: "w-44" },
        e("option", { value: "All" }, "All Statuses"),
        STATUSES.map((s) => e("option", { key: s, value: s }, s))
      )
    ),
    e(Card, { className: "p-4" },
      filtered.length === 0
        ? e("div", { className: "text-center text-sm text-slate-400 py-10" }, "You haven't submitted any incidents yet.")
        : filtered.map((inc) => e(IncidentCard, { key: inc.id, inc }))
    )
  );
}

/* ---------------------------------------------------------------- */
/* Report Incident (form) page                                       */
/* ---------------------------------------------------------------- */
function ReportIncidentPage() {
  const auth = useAuth();
  const db = Store.get();
  const [form, setForm] = useState({
    title: "", reporterName: auth.user.name, yourLocation: db.locations[0] || "",
    incidentLocation: "", incidentDate: new Date().toISOString().slice(0, 16),
    type: db.incidentTypes[0] || "", description: "", attachmentName: "",
  });
  const [toast, setToast] = useState("");
  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function submit(ev) {
    ev.preventDefault();
    const inc = {
      id: uid("inc"), number: genIncidentNumber(), ...form,
      status: "Open", reviewedBy: "", reviewNotes: "",
      createdBy: auth.user.id, createdByName: auth.user.name, createdDate: new Date().toISOString(),
    };
    Store.addIncident(inc);
    setToast(`Incident ${inc.number} submitted.`);
    setTimeout(() => navigate(`#/incidents/${inc.id}`), 700);
  }
  return e(Layout, { active: "report" },
    e(PageHeader, { title: "Report Incident", subtitle: "Submit a new safety or operational incident report" }),
    e(Card, { className: "p-6 max-w-3xl" },
      e("form", { onSubmit: submit, className: "space-y-5" },
        e(Field, { label: "Incident Name / Title" }, e(TextInput, { required: true, value: form.title, onChange: (ev) => set("title", ev.target.value), placeholder: "Short summary of what happened" })),
        e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
          e(Field, { label: "Reporter Name" }, e(TextInput, { required: true, value: form.reporterName, onChange: (ev) => set("reporterName", ev.target.value) })),
          e(Field, { label: "Your Location (site)" },
            e(SelectInput, { value: form.yourLocation, onChange: (ev) => set("yourLocation", ev.target.value) },
              db.locations.map((l) => e("option", { key: l, value: l }, l))))
        ),
        e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
          e(Field, { label: "Incident Location (specific place)" }, e(TextInput, { required: true, value: form.incidentLocation, onChange: (ev) => set("incidentLocation", ev.target.value), placeholder: "e.g. Loading Bay 2" })),
          e(Field, { label: "Incident Date & Time" }, e(TextInput, { type: "datetime-local", required: true, value: form.incidentDate, onChange: (ev) => set("incidentDate", ev.target.value) }))
        ),
        e(Field, { label: "Incident Type" },
          e(SelectInput, { value: form.type, onChange: (ev) => set("type", ev.target.value) },
            db.incidentTypes.map((t) => e("option", { key: t, value: t }, t)))),
        e(Field, { label: "Description" }, e(TextArea, { rows: 4, required: true, value: form.description, onChange: (ev) => set("description", ev.target.value), placeholder: "Describe what happened in detail..." })),
        e(Field, { label: "Attachment (photo)" },
          e("label", { className: "flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-3 py-3 text-sm text-slate-500 cursor-pointer hover:bg-slate-50" },
            Ic("image", { size: 16 }),
            form.attachmentName || "Click to attach a photo (stored as filename only in this demo)",
            e("input", { type: "file", className: "hidden", accept: "image/*", onChange: (ev) => set("attachmentName", ev.target.files[0] ? ev.target.files[0].name : "") })
          )),
        e("div", { className: "flex gap-3 pt-2" },
          e(Button, { type: "submit", variant: "accent" }, "Submit Incident"),
          e(Button, { type: "button", variant: "outline", onClick: () => window.history.back() }, "Cancel")
        )
      )
    ),
    e(Toast, { message: toast, onClose: () => setToast("") })
  );
}

/* ---------------------------------------------------------------- */
/* Incident Detail / Review page                                     */
/* ---------------------------------------------------------------- */
function IncidentDetailPage({ id }) {
  const auth = useAuth();
  const [, force] = useState(0);
  const db = Store.get();
  const inc = db.incidents.find((i) => i.id === id);
  const canReview = Store.can(auth.user.role, "update_status");
  const [status, setStatus] = useState(inc ? inc.status : "Open");
  const [reviewNotes, setReviewNotes] = useState(inc ? inc.reviewNotes : "");
  const [toast, setToast] = useState("");
  if (!inc) {
    return e(Layout, { active: "home" }, e(Card, { className: "p-8 text-center text-slate-500" }, "Incident not found.",
      e("div", { className: "mt-3" }, e(Button, { variant: "outline", onClick: () => navigate("#/") }, "Back to Incident Log"))));
  }
  function saveReview() {
    Store.updateIncident(inc.id, { status, reviewNotes, reviewedBy: auth.user.name });
    setToast("Review saved.");
    force((x) => x + 1);
  }
  return e(Layout, { active: "home" },
    e("a", { href: canReview ? "#/" : "#/my-reports", className: "inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-4" }, Ic("arrowLeft", { size: 15 }), "Back"),
    e(Card, { className: "p-6 max-w-3xl" },
      e("div", { className: "flex items-center gap-2 flex-wrap mb-2" },
        e("span", { className: "text-xs font-mono text-slate-400" }, inc.number),
        e(StatusBadge, { status: inc.status }),
        e(TypeBadge, { type: inc.type })
      ),
      e("h2", { className: "text-xl font-bold text-slate-900 mb-4" }, inc.title),
      e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-5" },
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Reporter"), e("div", { className: "text-slate-900" }, inc.reporterName)),
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Your Location") , e("div", { className: "text-slate-900" }, inc.yourLocation)),
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Incident Location"), e("div", { className: "text-slate-900" }, inc.incidentLocation)),
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Incident Date"), e("div", { className: "text-slate-900" }, fmtDate(inc.incidentDate))),
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Attachment"), e("div", { className: "text-slate-900" }, inc.attachmentName || "—")),
        e("div", null, e("div", { className: "text-xs text-slate-500 mb-0.5" }, "Submitted"), e("div", { className: "text-slate-900" }, fmtDate(inc.createdDate)))
      ),
      e("div", { className: "mb-6" }, e("div", { className: "text-xs text-slate-500 mb-1" }, "Description"), e("p", { className: "text-sm text-slate-700 leading-relaxed" }, inc.description)),
      e("div", { className: "border-t border-slate-100 pt-5" },
        canReview
          ? e("div", { className: "space-y-4" },
              e("div", { className: "font-semibold text-slate-900 text-sm" }, "Review & Update Status"),
              e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                e(Field, { label: "Status" },
                  e(SelectInput, { value: status, onChange: (ev) => setStatus(ev.target.value) },
                    STATUSES.map((s) => e("option", { key: s, value: s }, s)))),
                e(Field, { label: "Reviewed / Modified By" }, e(TextInput, { value: auth.user.name, disabled: true }))
              ),
              e(Field, { label: "Review Notes" }, e(TextArea, { rows: 3, value: reviewNotes, onChange: (ev) => setReviewNotes(ev.target.value), placeholder: "Add review notes..." })),
              e(Button, { variant: "accent", onClick: saveReview }, "Save Review")
            )
          : e("div", { className: "text-sm text-slate-500" },
              inc.reviewedBy ? `Last reviewed by ${inc.reviewedBy}${inc.reviewNotes ? ": " + inc.reviewNotes : ""}` : "This incident hasn't been reviewed yet."
            )
      )
    ),
    e(Toast, { message: toast, onClose: () => setToast("") })
  );
}

/* ---------------------------------------------------------------- */
/* Master Data page (admin)                                          */
/* ---------------------------------------------------------------- */
function ListManager({ title, icon, items, onAdd, onRemove, placeholder }) {
  const [val, setVal] = useState("");
  return e(Card, { className: "p-5" },
    e("div", { className: "flex items-center gap-2 mb-4" }, Ic(icon, { size: 16, className: "text-slate-500" }), e("h3", { className: "font-semibold text-slate-900 text-sm" }, title)),
    e("div", { className: "flex gap-2 mb-4" },
      e(TextInput, { value: val, placeholder, onChange: (ev) => setVal(ev.target.value), onKeyDown: (ev) => { if (ev.key === "Enter" && val.trim()) { onAdd(val.trim()); setVal(""); } } }),
      e(Button, { variant: "outline", onClick: () => { if (val.trim()) { onAdd(val.trim()); setVal(""); } } }, Ic("plus", { size: 15 }))
    ),
    e("div", { className: "space-y-1.5 max-h-72 overflow-y-auto" },
      items.map((item) =>
        e("div", { key: item, className: "flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-sm" },
          e("span", { className: "text-slate-700" }, item),
          e("button", { onClick: () => onRemove(item), className: "text-slate-400 hover:text-red-600" }, Ic("x", { size: 14 }))
        )
      )
    )
  );
}
function MasterDataPage() {
  const [, force] = useState(0);
  const db = Store.get();
  return e(Layout, { active: "master-data" },
    e(PageHeader, { title: "Master Data", subtitle: "Manage reference lists used across the app" }),
    e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" },
      e(ListManager, {
        title: "Incident Types", icon: "database", items: db.incidentTypes, placeholder: "Add a new incident type…",
        onAdd: (v) => { Store.addIncidentType(v); force((x) => x + 1); },
        onRemove: (v) => { Store.removeIncidentType(v); force((x) => x + 1); },
      }),
      e(ListManager, {
        title: "Locations / Sites", icon: "pin", items: db.locations, placeholder: "Add a new location…",
        onAdd: (v) => { Store.addLocation(v); force((x) => x + 1); },
        onRemove: (v) => { Store.removeLocation(v); force((x) => x + 1); },
      })
    )
  );
}

/* ---------------------------------------------------------------- */
/* User Management + Permissions Matrix (admin)                      */
/* ---------------------------------------------------------------- */
function PermissionsMatrix() {
  const [, force] = useState(0);
  const db = Store.get();
  return e(Card, { className: "p-5 mt-6" },
    e("h3", { className: "font-semibold text-slate-900 text-sm mb-1" }, "Role Permissions"),
    e("p", { className: "text-xs text-slate-500 mb-4" }, "Toggle which actions each role is allowed to perform."),
    e("div", { className: "overflow-x-auto" },
      e("table", { className: "w-full text-sm" },
        e("thead", null, e("tr", { className: "border-b border-slate-200" },
          e("th", { className: "text-left py-2 pr-4 font-medium text-slate-500" }, "Permission"),
          ROLES.map((r) => e("th", { key: r.id, className: "text-center py-2 px-3 font-medium text-slate-500" }, r.label))
        )),
        e("tbody", null,
          db.permissions.map((p) =>
            e("tr", { key: p.key, className: "border-b border-slate-100 last:border-0" },
              e("td", { className: "py-2.5 pr-4 text-slate-700" }, p.label),
              ROLES.map((r) => e("td", { key: r.id, className: "text-center py-2.5 px-3" },
                e("input", {
                  type: "checkbox", checked: p.roles.includes(r.id),
                  onChange: (ev) => { Store.setPermission(p.key, r.id, ev.target.checked); force((x) => x + 1); },
                  className: "w-4 h-4 accent-orange-500 cursor-pointer",
                })
              ))
            )
          )
        )
      )
    )
  );
}
function UserManagementPage() {
  const [, force] = useState(0);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("reporter");
  const [toast, setToast] = useState("");
  const db = Store.get();
  function invite(ev) {
    ev.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    if (db.users.some((u) => u.email.toLowerCase() === inviteEmail.trim().toLowerCase())) {
      setToast("A user with that email already exists.");
      return;
    }
    Store.addUser({ id: uid("u"), name: inviteName.trim(), email: inviteEmail.trim(), password: "changeme123", role: inviteRole });
    setInviteName(""); setInviteEmail("");
    setToast("User invited (demo password: changeme123).");
    force((x) => x + 1);
  }
  function roleBadgeClass(role) { return (ROLES.find((r) => r.id === role) || {}).badge || "bg-slate-100 text-slate-700 border-slate-200"; }
  return e(Layout, { active: "users" },
    e(PageHeader, { title: "User Management", subtitle: "Invite users, assign roles, and configure permissions" }),
    e(Card, { className: "p-5 mb-6" },
      e("div", { className: "flex items-center gap-2 mb-4" }, Ic("plus", { size: 16, className: "text-slate-500" }), e("h3", { className: "font-semibold text-slate-900 text-sm" }, "Invite a New User")),
      e("form", { onSubmit: invite, className: "grid grid-cols-1 md:grid-cols-4 gap-3 items-end" },
        e(Field, { label: "Name" }, e(TextInput, { value: inviteName, onChange: (ev) => setInviteName(ev.target.value), placeholder: "Full name" })),
        e(Field, { label: "Email" }, e(TextInput, { type: "email", value: inviteEmail, onChange: (ev) => setInviteEmail(ev.target.value), placeholder: "name@company.com" })),
        e(Field, { label: "Role" }, e(SelectInput, { value: inviteRole, onChange: (ev) => setInviteRole(ev.target.value) }, ROLES.map((r) => e("option", { key: r.id, value: r.id }, r.label)))),
        e(Button, { type: "submit", variant: "primary" }, Ic("mail", { size: 15 }), "Send Invite")
      )
    ),
    e("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" },
      ROLES.map((r) => e(Card, { key: r.id, className: "p-4" },
        e("div", { className: "flex items-center gap-2 mb-1" }, Ic("shield", { size: 14, className: "text-slate-400" }), e("span", { className: "font-semibold text-sm text-slate-900" }, r.label)),
        e("p", { className: "text-xs text-slate-500" }, r.desc)
      ))
    ),
    e(Card, { className: "p-5" },
      e("div", { className: "flex items-center justify-between mb-4" },
        e("h3", { className: "font-semibold text-slate-900 text-sm" }, "All Users"),
        e("span", { className: "text-xs text-slate-400" }, `${db.users.length} users`)
      ),
      e("div", { className: "space-y-2" },
        db.users.map((u) =>
          e("div", { key: u.id, className: "flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 last:border-0" },
            e("div", { className: "flex items-center gap-3 min-w-0" },
              e("div", { className: "w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0" }, u.name.slice(0, 1).toUpperCase()),
              e("div", { className: "min-w-0" },
                e("div", { className: "text-sm font-medium text-slate-900 truncate" }, u.name),
                e("div", { className: "text-xs text-slate-500 truncate" }, u.email)
              )
            ),
            e(SelectInput, {
              value: u.role, className: "w-36",
              onChange: (ev) => { Store.updateUserRole(u.id, ev.target.value); force((x) => x + 1); },
            }, ROLES.map((r) => e("option", { key: r.id, value: r.id }, r.label)))
          )
        )
      )
    ),
    e(PermissionsMatrix, null),
    e(Toast, { message: toast, onClose: () => setToast("") })
  );
}

/* ---------------------------------------------------------------- */
/* Root app + routing                                                */
/* ---------------------------------------------------------------- */
function useAuthState() {
  const [userId, setUserId] = useState(Store.get().session);
  return {
    user: Store.get().users.find((u) => u.id === userId) || null,
    login: (id) => { Store.setSession(id); setUserId(id); },
    logout: () => { Store.setSession(null); setUserId(null); },
  };
}
function Root() {
  const authState = useAuthState();
  const hash = useHashRoute();

  if (!authState.user) {
    return e(AuthCtx.Provider, { value: authState },
      hash === "#/register" ? e(RegisterPage) : e(LoginPage)
    );
  }

  const role = authState.user.role;
  let page;
  if (hash.startsWith("#/incidents/")) {
    page = e(IncidentDetailPage, { id: hash.replace("#/incidents/", "") });
  } else if (hash === "#/my-reports") {
    page = e(MyReportsPage);
  } else if (hash === "#/report") {
    page = Store.can(role, "submit_incident") ? e(ReportIncidentPage) : e(AccessDenied);
  } else if (hash === "#/master-data") {
    page = Store.can(role, "manage_master_data") ? e(MasterDataPage) : e(AccessDenied);
  } else if (hash === "#/users") {
    page = Store.can(role, "manage_users") ? e(UserManagementPage) : e(AccessDenied);
  } else {
    // home "#/"
    page = Store.can(role, "view_incident_log") ? e(IncidentLogPage) : e(MyReportsPage);
  }
  return e(AuthCtx.Provider, { value: authState }, page);
}
function AccessDenied() {
  return e(Layout, { active: "" },
    e(Card, { className: "p-10 text-center max-w-md mx-auto" },
      Ic("shield", { size: 28, className: "text-slate-300 mx-auto mb-3" }),
      e("div", { className: "font-semibold text-slate-900 mb-1" }, "Access denied"),
      e("p", { className: "text-sm text-slate-500" }, "Your role doesn't have permission to view this page.")
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(Root));
