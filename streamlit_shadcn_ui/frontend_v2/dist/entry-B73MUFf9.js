//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), u = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, O());
		else {
			var t = n(l);
			t !== null && j(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = u();
})), f = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function M(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function N(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, N(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), N(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += N(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += N(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return N(M(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function P(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return N(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function F(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var I = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, L = {
		map: P,
		forEach: function(e, t, n) {
			P(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return P(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return P(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = L, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: F
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, I);
		} catch (e) {
			I(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), p = /* @__PURE__ */ o(((e, t) => {
	t.exports = f();
})), m = /* @__PURE__ */ o(((e) => {
	var t = p();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), h = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = m();
})), g = /* @__PURE__ */ o(((e) => {
	var t = d(), n = p(), r = h();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var m = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), j = Symbol.iterator;
	function M(e) {
		return typeof e != "object" || !e ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var N = Symbol.for("react.client.reference");
	function P(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === N ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case k: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case D: return t = e.displayName || null, t === null ? P(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return P(e(t));
				} catch {}
		}
		return null;
	}
	var F = Array.isArray, I = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, z = [], B = -1;
	function V(e) {
		return { current: e };
	}
	function H(e) {
		0 > B || (e.current = z[B], z[B] = null, B--);
	}
	function U(e, t) {
		B++, z[B] = e.current, e.current = t;
	}
	var W = V(null), G = V(null), ee = V(null), te = V(null);
	function ne(e, t) {
		switch (U(ee, t), U(G, e), U(W, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		H(W), U(W, e);
	}
	function re() {
		H(W), H(G), H(ee);
	}
	function ie(e) {
		e.memoizedState !== null && U(te, e);
		var t = W.current, n = Hd(t, e.type);
		t !== n && (U(G, e), U(W, n));
	}
	function ae(e) {
		G.current === e && (H(W), H(G)), te.current === e && (H(te), Qf._currentValue = R);
	}
	var oe, se;
	function ce(e) {
		if (oe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			oe = t && t[1] || "", se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + oe + e + se;
	}
	var le = !1;
	function ue(e, t) {
		if (!e || le) return "";
		le = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			le = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? ce(n) : "";
	}
	function de(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return ce(e.type);
			case 16: return ce("Lazy");
			case 13: return e.child !== t && t !== null ? ce("Suspense Fallback") : ce("Suspense");
			case 19: return ce("SuspenseList");
			case 0:
			case 15: return ue(e.type, !1);
			case 11: return ue(e.type.render, !1);
			case 1: return ue(e.type, !0);
			case 31: return ce("Activity");
			default: return "";
		}
	}
	function fe(e) {
		try {
			var t = "", n = null;
			do
				t += de(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var pe = Object.prototype.hasOwnProperty, me = t.unstable_scheduleCallback, he = t.unstable_cancelCallback, ge = t.unstable_shouldYield, _e = t.unstable_requestPaint, ve = t.unstable_now, ye = t.unstable_getCurrentPriorityLevel, be = t.unstable_ImmediatePriority, xe = t.unstable_UserBlockingPriority, Se = t.unstable_NormalPriority, Ce = t.unstable_LowPriority, we = t.unstable_IdlePriority, Te = t.log, Ee = t.unstable_setDisableYieldValue, De = null, Oe = null;
	function ke(e) {
		if (typeof Te == "function" && Ee(e), Oe && typeof Oe.setStrictMode == "function") try {
			Oe.setStrictMode(De, e);
		} catch {}
	}
	var Ae = Math.clz32 ? Math.clz32 : K, je = Math.log, Me = Math.LN2;
	function K(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (je(e) / Me | 0) | 0;
	}
	var Ne = 256, Pe = 262144, Fe = 4194304;
	function Ie(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Le(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o) : i = Ie(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o)) : i = Ie(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Re(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function ze(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function q() {
		var e = Fe;
		return Fe <<= 1, !(Fe & 62914560) && (Fe = 4194304), e;
	}
	function Be(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ve(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function He(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ae(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Ue(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Ue(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ae(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function We(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ae(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ge(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ke(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ke(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function qe(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Je() {
		var e = L.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Ye(e, t) {
		var n = L.p;
		try {
			return L.p = e, t();
		} finally {
			L.p = n;
		}
	}
	var Xe = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + Xe, Qe = "__reactProps$" + Xe, $e = "__reactContainer$" + Xe, et = "__reactEvents$" + Xe, tt = "__reactListeners$" + Xe, nt = "__reactHandles$" + Xe, rt = "__reactResources$" + Xe, J = "__reactMarker$" + Xe;
	function it(e) {
		delete e[Ze], delete e[Qe], delete e[et], delete e[tt], delete e[nt];
	}
	function Y(e) {
		var t = e[Ze];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[$e] || n[Ze]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[Ze]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function at(e) {
		if (e = e[Ze] || e[$e]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ot(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function st(e) {
		var t = e[rt];
		return t ||= e[rt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ct(e) {
		e[J] = !0;
	}
	var lt = /* @__PURE__ */ new Set(), ut = {};
	function dt(e, t) {
		ft(e, t), ft(e + "Capture", t);
	}
	function ft(e, t) {
		for (ut[e] = t, e = 0; e < t.length; e++) lt.add(t[e]);
	}
	var pt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), mt = {}, ht = {};
	function gt(e) {
		return pe.call(ht, e) ? !0 : pe.call(mt, e) ? !1 : pt.test(e) ? ht[e] = !0 : (mt[e] = !0, !1);
	}
	function _t(e, t, n) {
		if (gt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function vt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function yt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function bt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function xt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function St(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ct(e) {
		if (!e._valueTracker) {
			var t = xt(e) ? "checked" : "value";
			e._valueTracker = St(e, t, "" + e[t]);
		}
	}
	function wt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = xt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Tt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Et = /[\n"\\]/g;
	function Dt(e) {
		return e.replace(Et, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ot(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + bt(t)) : e.value !== "" + bt(t) && (e.value = "" + bt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : At(e, o, bt(n)) : At(e, o, bt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + bt(s) : e.removeAttribute("name");
	}
	function kt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ct(e);
				return;
			}
			n = n == null ? "" : "" + bt(n), t = t == null ? n : "" + bt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ct(e);
	}
	function At(e, t, n) {
		t === "number" && Tt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function jt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + bt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Mt(e, t, n) {
		if (t != null && (t = "" + bt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + bt(n);
	}
	function Nt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (F(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = bt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ct(e);
	}
	function Pt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Ft = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function It(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Ft.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Lt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && It(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && It(e, o, t[o]);
	}
	function Rt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var zt = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Bt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Vt(e) {
		return Bt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Ht() {}
	var Ut = null;
	function Wt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Gt = null, Kt = null;
	function qt(e) {
		var t = at(e);
		if (t && (e = t.stateNode)) {
			var n = e[Qe] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ot(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Dt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Qe] || null;
								if (!a) throw Error(i(90));
								Ot(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && wt(r);
					}
					break a;
				case "textarea":
					Mt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && jt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Jt = !1;
	function Yt(e, t, n) {
		if (Jt) return e(t, n);
		Jt = !0;
		try {
			return e(t);
		} finally {
			if (Jt = !1, (Gt !== null || Kt !== null) && (_u(), Gt && (t = Gt, e = Kt, Kt = Gt = null, qt(t), e))) for (t = 0; t < e.length; t++) qt(e[t]);
		}
	}
	function Xt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Qe] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Zt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), X = !1;
	if (Zt) try {
		var Qt = {};
		Object.defineProperty(Qt, "passive", { get: function() {
			X = !0;
		} }), window.addEventListener("test", Qt, Qt), window.removeEventListener("test", Qt, Qt);
	} catch {
		X = !1;
	}
	var $t = null, en = null, tn = null;
	function nn() {
		if (tn) return tn;
		var e, t = en, n = t.length, r, i = "value" in $t ? $t.value : $t.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function rn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function an() {
		return !0;
	}
	function on() {
		return !1;
	}
	function sn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? an : on, this.isPropagationStopped = on, this;
		}
		return m(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = an);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = an);
			},
			persist: function() {},
			isPersistent: an
		}), t;
	}
	var cn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, ln = sn(cn), un = m({}, cn, {
		view: 0,
		detail: 0
	}), dn = sn(un), fn, pn, mn, hn = m({}, un, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: En,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== mn && (mn && e.type === "mousemove" ? (fn = e.screenX - mn.screenX, pn = e.screenY - mn.screenY) : pn = fn = 0, mn = e), fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : pn;
		}
	}), gn = sn(hn), _n = sn(m({}, hn, { dataTransfer: 0 })), vn = sn(m({}, un, { relatedTarget: 0 })), yn = sn(m({}, cn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), bn = sn(m({}, cn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), xn = sn(m({}, cn, { data: 0 })), Sn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Cn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, wn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Tn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = wn[e]) ? !!t[e] : !1;
	}
	function En() {
		return Tn;
	}
	var Dn = sn(m({}, un, {
		key: function(e) {
			if (e.key) {
				var t = Sn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = rn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: En,
		charCode: function(e) {
			return e.type === "keypress" ? rn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? rn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), On = sn(m({}, hn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), kn = sn(m({}, un, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: En
	})), An = sn(m({}, cn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), jn = sn(m({}, hn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Mn = sn(m({}, cn, {
		newState: 0,
		oldState: 0
	})), Nn = [
		9,
		13,
		27,
		32
	], Pn = Zt && "CompositionEvent" in window, Fn = null;
	Zt && "documentMode" in document && (Fn = document.documentMode);
	var In = Zt && "TextEvent" in window && !Fn, Ln = Zt && (!Pn || Fn && 8 < Fn && 11 >= Fn), Rn = " ", zn = !1;
	function Bn(e, t) {
		switch (e) {
			case "keyup": return Nn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Vn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "compositionend": return Vn(t);
			case "keypress": return t.which === 32 ? (zn = !0, Rn) : null;
			case "textInput": return e = t.data, e === Rn && zn ? null : e;
			default: return null;
		}
	}
	function Wn(e, t) {
		if (Hn) return e === "compositionend" || !Pn && Bn(e, t) ? (e = nn(), tn = en = $t = null, Hn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Ln && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Gn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Kn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Gn[e.type] : t === "textarea";
	}
	function qn(e, t, n, r) {
		Gt ? Kt ? Kt.push(r) : Kt = [r] : Gt = r, t = Td(t, "onChange"), 0 < t.length && (n = new ln("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Jn = null, Yn = null;
	function Xn(e) {
		_d(e, 0);
	}
	function Zn(e) {
		if (wt(ot(e))) return e;
	}
	function Qn(e, t) {
		if (e === "change") return t;
	}
	var $n = !1;
	if (Zt) {
		var er;
		if (Zt) {
			var tr = "oninput" in document;
			if (!tr) {
				var nr = document.createElement("div");
				nr.setAttribute("oninput", "return;"), tr = typeof nr.oninput == "function";
			}
			er = tr;
		} else er = !1;
		$n = er && (!document.documentMode || 9 < document.documentMode);
	}
	function rr() {
		Jn && (Jn.detachEvent("onpropertychange", ir), Yn = Jn = null);
	}
	function ir(e) {
		if (e.propertyName === "value" && Zn(Yn)) {
			var t = [];
			qn(t, Yn, e, Wt(e)), Yt(Xn, t);
		}
	}
	function ar(e, t, n) {
		e === "focusin" ? (rr(), Jn = t, Yn = n, Jn.attachEvent("onpropertychange", ir)) : e === "focusout" && rr();
	}
	function or(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zn(Yn);
	}
	function sr(e, t) {
		if (e === "click") return Zn(t);
	}
	function cr(e, t) {
		if (e === "input" || e === "change") return Zn(t);
	}
	function lr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var ur = typeof Object.is == "function" ? Object.is : lr;
	function dr(e, t) {
		if (ur(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!pe.call(t, i) || !ur(e[i], t[i])) return !1;
		}
		return !0;
	}
	function fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function pr(e, t) {
		var n = fr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = fr(n);
		}
	}
	function mr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function hr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Tt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Tt(e.document);
		}
		return t;
	}
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var _r = Zt && "documentMode" in document && 11 >= document.documentMode, vr = null, yr = null, br = null, xr = !1;
	function Sr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		xr || vr == null || vr !== Tt(r) || (r = vr, "selectionStart" in r && gr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), br && dr(br, r) || (br = r, r = Td(yr, "onSelect"), 0 < r.length && (t = new ln("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = vr)));
	}
	function Cr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var wr = {
		animationend: Cr("Animation", "AnimationEnd"),
		animationiteration: Cr("Animation", "AnimationIteration"),
		animationstart: Cr("Animation", "AnimationStart"),
		transitionrun: Cr("Transition", "TransitionRun"),
		transitionstart: Cr("Transition", "TransitionStart"),
		transitioncancel: Cr("Transition", "TransitionCancel"),
		transitionend: Cr("Transition", "TransitionEnd")
	}, Tr = {}, Er = {};
	Zt && (Er = document.createElement("div").style, "AnimationEvent" in window || (delete wr.animationend.animation, delete wr.animationiteration.animation, delete wr.animationstart.animation), "TransitionEvent" in window || delete wr.transitionend.transition);
	function Dr(e) {
		if (Tr[e]) return Tr[e];
		if (!wr[e]) return e;
		var t = wr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Er) return Tr[e] = t[n];
		return e;
	}
	var Or = Dr("animationend"), Z = Dr("animationiteration"), kr = Dr("animationstart"), Ar = Dr("transitionrun"), jr = Dr("transitionstart"), Mr = Dr("transitioncancel"), Nr = Dr("transitionend"), Pr = /* @__PURE__ */ new Map(), Fr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Fr.push("scrollEnd");
	function Ir(e, t) {
		Pr.set(e, t), dt(t, [e]);
	}
	var Lr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Rr = [], zr = 0, Br = 0;
	function Vr() {
		for (var e = zr, t = Br = zr = 0; t < e;) {
			var n = Rr[t];
			Rr[t++] = null;
			var r = Rr[t];
			Rr[t++] = null;
			var i = Rr[t];
			Rr[t++] = null;
			var a = Rr[t];
			if (Rr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Gr(n, i, a);
		}
	}
	function Hr(e, t, n, r) {
		Rr[zr++] = e, Rr[zr++] = t, Rr[zr++] = n, Rr[zr++] = r, Br |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ur(e, t, n, r) {
		return Hr(e, t, n, r), Kr(e);
	}
	function Wr(e, t) {
		return Hr(e, null, null, t), Kr(e);
	}
	function Gr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ae(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Kr(e) {
		if (50 < cu) throw cu = 0, lu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var qr = {};
	function Jr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Yr(e, t, n, r) {
		return new Jr(e, t, n, r);
	}
	function Xr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Zr(e, t) {
		var n = e.alternate;
		return n === null ? (n = Yr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Qr(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function $r(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Xr(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, W.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = Yr(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ei(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = Yr(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = Yr(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = Yr(19, n, t, a), e.elementType = E, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case D:
						s = 14;
						break a;
					case O:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Yr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ei(e, t, n, r) {
		return e = Yr(7, e, r, t), e.lanes = n, e;
	}
	function ti(e, t, n) {
		return e = Yr(6, e, null, t), e.lanes = n, e;
	}
	function ni(e) {
		var t = Yr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ri(e, t, n) {
		return t = Yr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ii = /* @__PURE__ */ new WeakMap();
	function ai(e, t) {
		if (typeof e == "object" && e) {
			var n = ii.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: fe(t)
			}, ii.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: fe(t)
		};
	}
	var oi = [], si = 0, ci = null, li = 0, ui = [], di = 0, fi = null, pi = 1, mi = "";
	function hi(e, t) {
		oi[si++] = li, oi[si++] = ci, ci = e, li = t;
	}
	function gi(e, t, n) {
		ui[di++] = pi, ui[di++] = mi, ui[di++] = fi, fi = e;
		var r = pi;
		e = mi;
		var i = 32 - Ae(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ae(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, pi = 1 << 32 - Ae(t) + i | n << i | r, mi = a + e;
		} else pi = 1 << a | n << i | r, mi = e;
	}
	function _i(e) {
		e.return !== null && (hi(e, 1), gi(e, 1, 0));
	}
	function vi(e) {
		for (; e === ci;) ci = oi[--si], oi[si] = null, li = oi[--si], oi[si] = null;
		for (; e === fi;) fi = ui[--di], ui[di] = null, mi = ui[--di], ui[di] = null, pi = ui[--di], ui[di] = null;
	}
	function yi(e, t) {
		ui[di++] = pi, ui[di++] = mi, ui[di++] = fi, pi = t.id, mi = t.overflow, fi = e;
	}
	var bi = null, xi = null, Si = !1, Ci = null, wi = !1, Ti = Error(i(519));
	function Ei(e) {
		throw Mi(ai(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ti;
	}
	function Di(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ze] = e, t[Qe] = r, n) {
			case "dialog":
				vd("cancel", t), vd("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				vd("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < hd.length; n++) vd(hd[n], t);
				break;
			case "source":
				vd("error", t);
				break;
			case "img":
			case "image":
			case "link":
				vd("error", t), vd("load", t);
				break;
			case "details":
				vd("toggle", t);
				break;
			case "input":
				vd("invalid", t), kt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				vd("invalid", t);
				break;
			case "textarea": vd("invalid", t), Nt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && (vd("beforetoggle", t), vd("toggle", t)), r.onScroll != null && vd("scroll", t), r.onScrollEnd != null && vd("scrollend", t), r.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || Ei(e, !0);
	}
	function Oi(e) {
		for (bi = e.return; bi;) switch (bi.tag) {
			case 5:
			case 31:
			case 13:
				wi = !1;
				return;
			case 27:
			case 3:
				wi = !0;
				return;
			default: bi = bi.return;
		}
	}
	function ki(e) {
		if (e !== bi) return !1;
		if (!Si) return Oi(e), Si = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && xi && Ei(e), Oi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = uf(e);
		} else t === 27 ? (t = xi, Zd(e.type) ? (e = lf, lf = null, xi = e) : xi = t) : xi = bi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ai() {
		xi = bi = null, Si = !1;
	}
	function ji() {
		var e = Ci;
		return e !== null && (Jl === null ? Jl = e : Jl.push.apply(Jl, e), Ci = null), e;
	}
	function Mi(e) {
		Ci === null ? Ci = [e] : Ci.push(e);
	}
	var Ni = V(null), Pi = null, Fi = null;
	function Ii(e, t, n) {
		U(Ni, t._currentValue), t._currentValue = n;
	}
	function Li(e) {
		e._currentValue = Ni.current, H(Ni);
	}
	function Ri(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function zi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ri(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ri(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Bi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					ur(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === te.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && zi(t, e, n, r), t.flags |= 262144;
	}
	function Vi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!ur(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Hi(e) {
		Pi = e, Fi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ui(e) {
		return Gi(Pi, e);
	}
	function Wi(e, t) {
		return Pi === null && Hi(e), Gi(e, t);
	}
	function Gi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Fi === null) {
			if (e === null) throw Error(i(308));
			Fi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Fi = Fi.next = t;
		return n;
	}
	var Ki = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, qi = t.unstable_scheduleCallback, Ji = t.unstable_NormalPriority, Yi = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Xi() {
		return {
			controller: new Ki(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Zi(e) {
		e.refCount--, e.refCount === 0 && qi(Ji, function() {
			e.controller.abort();
		});
	}
	var Qi = null, $i = 0, ea = 0, ta = null;
	function na(e, t) {
		if (Qi === null) {
			var n = Qi = [];
			$i = 0, ea = ld(), ta = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return $i++, t.then(ra, ra), t;
	}
	function ra() {
		if (--$i === 0 && Qi !== null) {
			ta !== null && (ta.status = "fulfilled");
			var e = Qi;
			Qi = null, ea = 0, ta = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ia(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var aa = I.S;
	I.S = function(e, t) {
		Zl = ve(), typeof t == "object" && t && typeof t.then == "function" && na(e, t), aa !== null && aa(e, t);
	};
	var oa = V(null);
	function sa() {
		var e = oa.current;
		return e === null ? Ml.pooledCache : e;
	}
	function ca(e, t) {
		t === null ? U(oa, oa.current) : U(oa, t.pool);
	}
	function la() {
		var e = sa();
		return e === null ? null : {
			parent: Yi._currentValue,
			pool: e
		};
	}
	var ua = Error(i(460)), da = Error(i(474)), fa = Error(i(542)), pa = { then: function() {} };
	function ma(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ha(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Ht, Ht), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ya(e), e;
			default:
				if (typeof t.status == "string") t.then(Ht, Ht);
				else {
					if (e = Ml, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ya(e), e;
				}
				throw _a = t, ua;
		}
	}
	function ga(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (_a = e, ua) : e;
		}
	}
	var _a = null;
	function va() {
		if (_a === null) throw Error(i(459));
		var e = _a;
		return _a = null, e;
	}
	function ya(e) {
		if (e === ua || e === fa) throw Error(i(483));
	}
	var ba = null, xa = 0;
	function Sa(e) {
		var t = xa;
		return xa += 1, ba === null && (ba = []), ha(ba, e, t);
	}
	function Ca(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function wa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ta(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Zr(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ti(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && ga(i) === t.type) ? (t = a(t, n.props), Ca(t, n), t.return = e, t) : (t = $r(n.type, n.key, n.props, null, e.mode, r), Ca(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ri(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ei(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ti("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = $r(t.type, t.key, t.props, null, e.mode, n), Ca(n, t), n.return = e, n;
					case v: return t = ri(t, e.mode, n), t.return = e, t;
					case O: return t = ga(t), f(e, t, n);
				}
				if (F(t) || M(t)) return t = ei(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Sa(t), n);
				if (t.$$typeof === C) return f(e, Wi(e, t), n);
				wa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case O: return n = ga(n), p(e, t, n, r);
				}
				if (F(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Sa(n), r);
				if (n.$$typeof === C) return p(e, t, Wi(e, n), r);
				wa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = ga(r), m(e, t, n, r, i);
				}
				if (F(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Sa(r), i);
				if (r.$$typeof === C) return m(e, t, n, Wi(t, r), i);
				wa(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), Si && hi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Si && hi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Si && hi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), Si && hi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Si && hi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Si && hi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && ga(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ca(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = ei(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = $r(o.type, o.key, o.props, null, e.mode, c), Ca(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = ri(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = ga(o), b(e, r, o, c);
				}
				if (F(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Sa(o), c);
				if (o.$$typeof === C) return b(e, r, Wi(e, o), c);
				wa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ti(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				xa = 0;
				var i = b(e, t, n, r);
				return ba = null, i;
			} catch (t) {
				if (t === ua || t === fa) throw t;
				var a = Yr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ea = Ta(!0), Da = Ta(!1), Oa = !1;
	function ka(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Aa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function ja(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Q(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, jl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Kr(e), Gr(e, null, n), t;
		}
		return Hr(e, r, t, n), Kr(e);
	}
	function Ma(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	function Na(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Pa = !1;
	function Fa() {
		if (Pa) {
			var e = ta;
			if (e !== null) throw e;
		}
	}
	function Ia(e, t, n, r) {
		Pa = !1;
		var i = e.updateQueue;
		Oa = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Pl & f) === f : (r & f) === f) {
					f !== 0 && f === ea && (Pa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = m({}, d, f);
								break a;
							case 2: Oa = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Hl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function La(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ra(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) La(n[e], t);
	}
	var za = V(null), Ba = V(0);
	function Va(e, t) {
		e = Bl, U(Ba, e), U(za, t), Bl = e | t.baseLanes;
	}
	function Ha() {
		U(Ba, Bl), U(za, za.current);
	}
	function Ua() {
		Bl = Ba.current, H(za), H(Ba);
	}
	var Wa = V(null), Ga = null;
	function Ka(e) {
		var t = e.alternate;
		U(Za, Za.current & 1), U(Wa, e), Ga === null && (t === null || za.current !== null || t.memoizedState !== null) && (Ga = e);
	}
	function qa(e) {
		U(Za, Za.current), U(Wa, e), Ga === null && (Ga = e);
	}
	function Ja(e) {
		e.tag === 22 ? (U(Za, Za.current), U(Wa, e), Ga === null && (Ga = e)) : Ya(e);
	}
	function Ya() {
		U(Za, Za.current), U(Wa, Wa.current);
	}
	function Xa(e) {
		H(Wa), Ga === e && (Ga = null), H(Za);
	}
	var Za = V(0);
	function Qa(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var $a = 0, eo = null, to = null, no = null, ro = !1, io = !1, ao = !1, oo = 0, so = 0, co = null, lo = 0;
	function uo() {
		throw Error(i(321));
	}
	function fo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!ur(e[n], t[n])) return !1;
		return !0;
	}
	function po(e, t, n, r, i, a) {
		return $a = a, eo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, I.H = e === null || e.memoizedState === null ? As : js, ao = !1, a = n(r, i), ao = !1, io && (a = ho(t, n, r, i)), mo(e), a;
	}
	function mo(e) {
		I.H = ks;
		var t = to !== null && to.next !== null;
		if ($a = 0, no = to = eo = null, ro = !1, so = 0, co = null, t) throw Error(i(300));
		e === null || qs || (e = e.dependencies, e !== null && Vi(e) && (qs = !0));
	}
	function ho(e, t, n, r) {
		eo = e;
		var a = 0;
		do {
			if (io && (co = null), so = 0, io = !1, 25 <= a) throw Error(i(301));
			if (a += 1, no = to = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			I.H = Ms, o = t(n, r);
		} while (io);
		return o;
	}
	function go() {
		var e = I.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Co(t) : t, e = e.useState()[0], (to === null ? null : to.memoizedState) !== e && (eo.flags |= 1024), t;
	}
	function _o() {
		var e = oo !== 0;
		return oo = 0, e;
	}
	function vo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function yo(e) {
		if (ro) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			ro = !1;
		}
		$a = 0, no = to = eo = null, io = !1, so = oo = 0, co = null;
	}
	function bo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return no === null ? eo.memoizedState = no = e : no = no.next = e, no;
	}
	function xo() {
		if (to === null) {
			var e = eo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = to.next;
		var t = no === null ? eo.memoizedState : no.next;
		if (t !== null) no = t, to = e;
		else {
			if (e === null) throw eo.alternate === null ? Error(i(467)) : Error(i(310));
			to = e, e = {
				memoizedState: to.memoizedState,
				baseState: to.baseState,
				baseQueue: to.baseQueue,
				queue: to.queue,
				next: null
			}, no === null ? eo.memoizedState = no = e : no = no.next = e;
		}
		return no;
	}
	function So() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Co(e) {
		var t = so;
		return so += 1, co === null && (co = []), e = ha(co, e, t), t = eo, (no === null ? t.memoizedState : no.next) === null && (t = t.alternate, I.H = t === null || t.memoizedState === null ? As : js), e;
	}
	function wo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Co(e);
			if (e.$$typeof === C) return Ui(e);
		}
		throw Error(i(438, String(e)));
	}
	function To(e) {
		var t = null, n = eo.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = eo.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = So(), eo.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Eo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Do(e) {
		return Oo(xo(), to, e);
	}
	function Oo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? ($a & f) === f : (Pl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ea && (d = !0);
					else if (($a & p) === p) {
						u = u.next, p === ea && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, eo.lanes |= p, Hl |= p;
					f = u.action, ao && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, eo.lanes |= f, Hl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !ur(o, e.memoizedState) && (qs = !0, d && (n = ta, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function ko(e) {
		var t = xo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			ur(o, t.memoizedState) || (qs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Ao(e, t, n) {
		var r = eo, a = xo(), o = Si;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !ur((to || a).memoizedState, n);
		if (s && (a.memoizedState = n, qs = !0), a = a.queue, ts(No.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || no !== null && no.memoizedState.tag & 1) {
			if (r.flags |= 2048, Xo(9, { destroy: void 0 }, Mo.bind(null, r, a, n, t), null), Ml === null) throw Error(i(349));
			o || $a & 127 || jo(r, t, n);
		}
		return n;
	}
	function jo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = eo.updateQueue, t === null ? (t = So(), eo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Mo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Po(t) && Fo(e);
	}
	function No(e, t, n) {
		return n(function() {
			Po(t) && Fo(e);
		});
	}
	function Po(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !ur(e, n);
		} catch {
			return !0;
		}
	}
	function Fo(e) {
		var t = Wr(e, 2);
		t !== null && fu(t, e, 2);
	}
	function Io(e) {
		var t = bo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ao) {
				ke(!0);
				try {
					n();
				} finally {
					ke(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Eo,
			lastRenderedState: e
		}, t;
	}
	function Lo(e, t, n, r) {
		return e.baseState = n, Oo(e, to, typeof r == "function" ? r : Eo);
	}
	function Ro(e, t, n, r, a) {
		if (Es(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			I.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, zo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function zo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = I.T, o = {};
			I.T = o;
			try {
				var s = n(i, r), c = I.S;
				c !== null && c(o, s), Bo(e, t, s);
			} catch (n) {
				Ho(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), I.T = a;
			}
		} else try {
			a = n(i, r), Bo(e, t, a);
		} catch (n) {
			Ho(e, t, n);
		}
	}
	function Bo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Vo(e, t, n);
		}, function(n) {
			return Ho(e, t, n);
		}) : Vo(e, t, n);
	}
	function Vo(e, t, n) {
		t.status = "fulfilled", t.value = n, Uo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, zo(e, n)));
	}
	function Ho(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Uo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Uo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Wo(e, t) {
		return t;
	}
	function Go(e, t) {
		if (Si) {
			var n = Ml.formState;
			if (n !== null) {
				a: {
					var r = eo;
					if (Si) {
						if (xi) {
							b: {
								for (var i = xi, a = wi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								xi = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ei(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = bo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Wo,
			lastRenderedState: t
		}, n.queue = r, n = Cs.bind(null, eo, r), r.dispatch = n, r = Io(!1), a = Ts.bind(null, eo, !1, r.queue), r = bo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ro.bind(null, eo, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ko(e) {
		return qo(xo(), to, e);
	}
	function qo(e, t, n) {
		if (t = Oo(e, t, Wo)[0], e = Do(Eo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Co(t);
		} catch (e) {
			throw e === ua ? fa : e;
		}
		else r = t;
		t = xo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (eo.flags |= 2048, Xo(9, { destroy: void 0 }, Jo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Jo(e, t) {
		e.action = t;
	}
	function Yo(e) {
		var t = xo(), n = to;
		if (n !== null) return qo(t, n, e);
		xo(), t = t.memoizedState, n = xo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Xo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = eo.updateQueue, t === null && (t = So(), eo.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Zo() {
		return xo().memoizedState;
	}
	function Qo(e, t, n, r) {
		var i = bo();
		eo.flags |= e, i.memoizedState = Xo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function $o(e, t, n, r) {
		var i = xo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		to !== null && r !== null && fo(r, to.memoizedState.deps) ? i.memoizedState = Xo(t, a, n, r) : (eo.flags |= e, i.memoizedState = Xo(1 | t, a, n, r));
	}
	function es(e, t) {
		Qo(8390656, 8, e, t);
	}
	function ts(e, t) {
		$o(2048, 8, e, t);
	}
	function ns(e) {
		eo.flags |= 4;
		var t = eo.updateQueue;
		if (t === null) t = So(), eo.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function rs(e) {
		var t = xo().memoizedState;
		return ns({
			ref: t,
			nextImpl: e
		}), function() {
			if (jl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function is(e, t) {
		return $o(4, 2, e, t);
	}
	function as(e, t) {
		return $o(4, 4, e, t);
	}
	function os(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ss(e, t, n) {
		n = n == null ? null : n.concat([e]), $o(4, 4, os.bind(null, t, e), n);
	}
	function cs() {}
	function ls(e, t) {
		var n = xo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && fo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function us(e, t) {
		var n = xo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && fo(t, r[1])) return r[0];
		if (r = e(), ao) {
			ke(!0);
			try {
				e();
			} finally {
				ke(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ds(e, t, n) {
		return n === void 0 || $a & 1073741824 && !(Pl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = du(), eo.lanes |= e, Hl |= e, n);
	}
	function fs(e, t, n, r) {
		return ur(n, t) ? n : za.current === null ? !($a & 42) || $a & 1073741824 && !(Pl & 261930) ? (qs = !0, e.memoizedState = n) : (e = du(), eo.lanes |= e, Hl |= e, t) : (e = ds(e, n, r), ur(e, t) || (qs = !0), e);
	}
	function ps(e, t, n, r, i) {
		var a = L.p;
		L.p = a !== 0 && 8 > a ? a : 8;
		var o = I.T, s = {};
		I.T = s, Ts(e, !1, t, n);
		try {
			var c = i(), l = I.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? ws(e, t, ia(c, r), uu(e)) : ws(e, t, r, uu(e));
		} catch (n) {
			ws(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, uu());
		} finally {
			L.p = a, o !== null && s.types !== null && (o.types = s.types), I.T = o;
		}
	}
	function ms() {}
	function hs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = gs(e).queue;
		ps(e, a, t, R, n === null ? ms : function() {
			return _s(e), n(r);
		});
	}
	function gs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: R,
			baseState: R,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Eo,
				lastRenderedState: R
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Eo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function _s(e) {
		var t = gs(e);
		t.next === null && (t = e.alternate.memoizedState), ws(e, t.next.queue, {}, uu());
	}
	function vs() {
		return Ui(Qf);
	}
	function ys() {
		return xo().memoizedState;
	}
	function bs() {
		return xo().memoizedState;
	}
	function xs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = uu();
					e = ja(n);
					var r = Q(t, e, n);
					r !== null && (fu(r, t, n), Ma(r, t, n)), t = { cache: Xi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ss(e, t, n) {
		var r = uu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Es(e) ? Ds(t, n) : (n = Ur(e, t, n, r), n !== null && (fu(n, e, r), Os(n, t, r)));
	}
	function Cs(e, t, n) {
		ws(e, t, n, uu());
	}
	function ws(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Es(e)) Ds(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, ur(s, o)) return Hr(e, t, i, 0), Ml === null && Vr(), !1;
			} catch {}
			if (n = Ur(e, t, i, r), n !== null) return fu(n, e, r), Os(n, t, r), !0;
		}
		return !1;
	}
	function Ts(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ld(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Es(e)) {
			if (t) throw Error(i(479));
		} else t = Ur(e, n, r, 2), t !== null && fu(t, e, 2);
	}
	function Es(e) {
		var t = e.alternate;
		return e === eo || t !== null && t === eo;
	}
	function Ds(e, t) {
		io = ro = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Os(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	var ks = {
		readContext: Ui,
		use: wo,
		useCallback: uo,
		useContext: uo,
		useEffect: uo,
		useImperativeHandle: uo,
		useLayoutEffect: uo,
		useInsertionEffect: uo,
		useMemo: uo,
		useReducer: uo,
		useRef: uo,
		useState: uo,
		useDebugValue: uo,
		useDeferredValue: uo,
		useTransition: uo,
		useSyncExternalStore: uo,
		useId: uo,
		useHostTransitionStatus: uo,
		useFormState: uo,
		useActionState: uo,
		useOptimistic: uo,
		useMemoCache: uo,
		useCacheRefresh: uo
	};
	ks.useEffectEvent = uo;
	var As = {
		readContext: Ui,
		use: wo,
		useCallback: function(e, t) {
			return bo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ui,
		useEffect: es,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Qo(4194308, 4, os.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Qo(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Qo(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = bo();
			t = t === void 0 ? null : t;
			var r = e();
			if (ao) {
				ke(!0);
				try {
					e();
				} finally {
					ke(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = bo();
			if (n !== void 0) {
				var i = n(t);
				if (ao) {
					ke(!0);
					try {
						n(t);
					} finally {
						ke(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ss.bind(null, eo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = bo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Io(e);
			var t = e.queue, n = Cs.bind(null, eo, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: cs,
		useDeferredValue: function(e, t) {
			return ds(bo(), e, t);
		},
		useTransition: function() {
			var e = Io(!1);
			return e = ps.bind(null, eo, e.queue, !0, !1), bo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = eo, a = bo();
			if (Si) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Ml === null) throw Error(i(349));
				Pl & 127 || jo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, es(No.bind(null, r, o, e), [e]), r.flags |= 2048, Xo(9, { destroy: void 0 }, Mo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = bo(), t = Ml.identifierPrefix;
			if (Si) {
				var n = mi, r = pi;
				n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = oo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = lo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: vs,
		useFormState: Go,
		useActionState: Go,
		useOptimistic: function(e) {
			var t = bo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ts.bind(null, eo, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: To,
		useCacheRefresh: function() {
			return bo().memoizedState = xs.bind(null, eo);
		},
		useEffectEvent: function(e) {
			var t = bo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (jl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, js = {
		readContext: Ui,
		use: wo,
		useCallback: ls,
		useContext: Ui,
		useEffect: ts,
		useImperativeHandle: ss,
		useInsertionEffect: is,
		useLayoutEffect: as,
		useMemo: us,
		useReducer: Do,
		useRef: Zo,
		useState: function() {
			return Do(Eo);
		},
		useDebugValue: cs,
		useDeferredValue: function(e, t) {
			return fs(xo(), to.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Do(Eo)[0], t = xo().memoizedState;
			return [typeof e == "boolean" ? e : Co(e), t];
		},
		useSyncExternalStore: Ao,
		useId: ys,
		useHostTransitionStatus: vs,
		useFormState: Ko,
		useActionState: Ko,
		useOptimistic: function(e, t) {
			return Lo(xo(), to, e, t);
		},
		useMemoCache: To,
		useCacheRefresh: bs
	};
	js.useEffectEvent = rs;
	var Ms = {
		readContext: Ui,
		use: wo,
		useCallback: ls,
		useContext: Ui,
		useEffect: ts,
		useImperativeHandle: ss,
		useInsertionEffect: is,
		useLayoutEffect: as,
		useMemo: us,
		useReducer: ko,
		useRef: Zo,
		useState: function() {
			return ko(Eo);
		},
		useDebugValue: cs,
		useDeferredValue: function(e, t) {
			var n = xo();
			return to === null ? ds(n, e, t) : fs(n, to.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ko(Eo)[0], t = xo().memoizedState;
			return [typeof e == "boolean" ? e : Co(e), t];
		},
		useSyncExternalStore: Ao,
		useId: ys,
		useHostTransitionStatus: vs,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: function(e, t) {
			var n = xo();
			return to === null ? (n.baseState = e, [e, n.queue.dispatch]) : Lo(n, to, e, t);
		},
		useMemoCache: To,
		useCacheRefresh: bs
	};
	Ms.useEffectEvent = rs;
	function Ns(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : m({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ps = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = uu(), i = ja(r);
			i.payload = t, n != null && (i.callback = n), t = Q(e, i, r), t !== null && (fu(t, e, r), Ma(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = uu(), i = ja(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Q(e, i, r), t !== null && (fu(t, e, r), Ma(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = uu(), r = ja(n);
			r.tag = 2, t != null && (r.callback = t), t = Q(e, r, n), t !== null && (fu(t, e, n), Ma(t, e, n));
		}
	};
	function Fs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !dr(n, r) || !dr(i, a) : !0;
	}
	function Is(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ps.enqueueReplaceState(t, t.state, null);
	}
	function $(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = m({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ls(e) {
		Lr(e);
	}
	function Rs(e) {
		console.error(e);
	}
	function zs(e) {
		Lr(e);
	}
	function Bs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Vs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Hs(e, t, n) {
		return n = ja(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Bs(e, t);
		}, n;
	}
	function Us(e) {
		return e = ja(e), e.tag = 3, e;
	}
	function Ws(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Vs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Vs(t, n, r), typeof i != "function" && (eu === null ? eu = /* @__PURE__ */ new Set([this]) : eu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Gs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Bi(t, n, a, !0), n = Wa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ga === null ? wu() : n.alternate === null && Vl === 0 && (Vl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Uu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Uu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Uu(e, r, a), wu(), !1;
		}
		if (Si) return t = Wa.current, t === null ? (r !== Ti && (t = Error(i(423), { cause: r }), Mi(ai(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ai(r, n), a = Hs(e.stateNode, r, a), Na(e, a), Vl !== 4 && (Vl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ti && (e = Error(i(422), { cause: r }), Mi(ai(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ai(o, n), ql === null ? ql = [o] : ql.push(o), Vl !== 4 && (Vl = 2), t === null) return !0;
		r = ai(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Hs(n.stateNode, r, e), Na(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (eu === null || !eu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Us(a), Ws(a, e, n, r), Na(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ks = Error(i(461)), qs = !1;
	function Js(e, t, n, r) {
		t.child = e === null ? Da(t, null, n, r) : Ea(t, e.child, n, r);
	}
	function Ys(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Hi(t), r = po(e, t, n, o, a, i), s = _o(), e !== null && !qs ? (vo(e, t, i), yc(e, t, i)) : (Si && s && _i(t), t.flags |= 1, Js(e, t, r, i), t.child);
	}
	function Xs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Xr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Zs(e, t, a, r, i)) : (e = $r(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !bc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? dr : n, n(o, r) && e.ref === t.ref) return yc(e, t, i);
		}
		return t.flags |= 1, e = Zr(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Zs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (dr(a, r) && e.ref === t.ref) if (qs = !1, t.pendingProps = r = a, bc(e, i)) e.flags & 131072 && (qs = !0);
			else return t.lanes = e.lanes, yc(e, t, i);
		}
		return ac(e, t, n, r, i);
	}
	function Qs(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return ec(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ca(t, a === null ? null : a.cachePool), a === null ? Ha() : Va(t, a), Ja(t);
			else return r = t.lanes = 536870912, ec(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ca(t, null), Ha(), Ya(t)) : (ca(t, a.cachePool), Va(t, a), Ya(t), t.memoizedState = null);
		return Js(e, t, i, n), t.child;
	}
	function $s(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function ec(e, t, n, r, i) {
		var a = sa();
		return a = a === null ? null : {
			parent: Yi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ca(t, null), Ha(), Ja(t), e !== null && Bi(e, t, r, !0), t.childLanes = i, null;
	}
	function tc(e, t) {
		return t = mc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function nc(e, t, n) {
		return Ea(t, e.child, null, n), e = tc(t, t.pendingProps), e.flags |= 2, Xa(t), t.memoizedState = null, e;
	}
	function rc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Si) {
				if (r.mode === "hidden") return e = tc(t, r), t.lanes = 536870912, $s(null, e);
				if (qa(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: fi === null ? null : {
						id: pi,
						overflow: mi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ni(e), n.return = t, t.child = n, bi = t, xi = null)) : e = null, e === null) throw Ei(t);
				return t.lanes = 536870912, null;
			}
			return tc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (qa(t), a) if (t.flags & 256) t.flags &= -257, t = nc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (qs || Bi(e, t, n, !1), a = (n & e.childLanes) !== 0, qs || a) {
				if (r = Ml, r !== null && (s = Ge(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Wr(e, s), fu(r, e, s), Ks;
				wu(), t = nc(e, t, n);
			} else e = o.treeContext, xi = cf(s.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = tc(t, r), t.flags |= 4096;
			return t;
		}
		return e = Zr(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function ic(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function ac(e, t, n, r, i) {
		return Hi(t), n = po(e, t, n, r, void 0, i), r = _o(), e !== null && !qs ? (vo(e, t, i), yc(e, t, i)) : (Si && r && _i(t), t.flags |= 1, Js(e, t, n, i), t.child);
	}
	function oc(e, t, n, r, i, a) {
		return Hi(t), t.updateQueue = null, n = ho(t, r, n, i), mo(e), r = _o(), e !== null && !qs ? (vo(e, t, a), yc(e, t, a)) : (Si && r && _i(t), t.flags |= 1, Js(e, t, n, a), t.child);
	}
	function sc(e, t, n, r, i) {
		if (Hi(t), t.stateNode === null) {
			var a = qr, o = n.contextType;
			typeof o == "object" && o && (a = Ui(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ps, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ka(t), o = n.contextType, a.context = typeof o == "object" && o ? Ui(o) : qr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ns(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ps.enqueueReplaceState(a, a.state, null), Ia(t, r, a, i), Fa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = $(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = qr, typeof u == "object" && u && (o = Ui(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Is(t, a, r, o), Oa = !1;
			var f = t.memoizedState;
			a.state = f, Ia(t, r, a, i), Fa(), l = t.memoizedState, s || f !== l || Oa ? (typeof d == "function" && (Ns(t, n, d, r), l = t.memoizedState), (c = Oa || Fs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Aa(e, t), o = t.memoizedProps, u = $(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = qr, typeof l == "object" && l && (c = Ui(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Is(t, a, r, c), Oa = !1, f = t.memoizedState, a.state = f, Ia(t, r, a, i), Fa();
			var p = t.memoizedState;
			o !== d || f !== p || Oa || e !== null && e.dependencies !== null && Vi(e.dependencies) ? (typeof s == "function" && (Ns(t, n, s, r), p = t.memoizedState), (u = Oa || Fs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Vi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, ic(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ea(t, e.child, null, i), t.child = Ea(t, null, n, i)) : Js(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = yc(e, t, i), e;
	}
	function cc(e, t, n, r) {
		return Ai(), t.flags |= 256, Js(e, t, n, r), t.child;
	}
	var lc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function uc(e) {
		return {
			baseLanes: e,
			cachePool: la()
		};
	}
	function dc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Gl), e;
	}
	function fc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(Za.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Si) {
				if (a ? Ka(t) : Ya(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: fi === null ? null : {
						id: pi,
						overflow: mi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ni(e), n.return = t, t.child = n, bi = t, xi = null)) : e = null, e === null) throw Ei(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Ya(t), a = t.mode, c = mc({
				mode: "hidden",
				children: c
			}, a), r = ei(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = uc(n), r.childLanes = dc(e, s, n), t.memoizedState = lc, $s(null, r)) : (Ka(t), pc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ka(t), t.flags &= -257, t = hc(e, t, n)) : t.memoizedState === null ? (Ya(t), c = r.fallback, a = t.mode, r = mc({
				mode: "visible",
				children: r.children
			}, a), c = ei(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ea(t, e.child, null, n), r = t.child, r.memoizedState = uc(n), r.childLanes = dc(e, s, n), t.memoizedState = lc, t = $s(null, r)) : (Ya(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ka(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Mi({
					value: r,
					source: null,
					stack: null
				}), t = hc(e, t, n);
			} else if (qs || Bi(e, t, n, !1), s = (n & e.childLanes) !== 0, qs || s) {
				if (s = Ml, s !== null && (r = Ge(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Wr(e, r), fu(s, e, r), Ks;
				af(c) || wu(), t = hc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, xi = cf(c.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = pc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Ya(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = Zr(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ei(c, a, n, null), c.flags |= 2) : c = Zr(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, $s(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = uc(n) : (a = c.cachePool, a === null ? a = la() : (l = Yi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = dc(e, s, n), t.memoizedState = lc, $s(e.child, r)) : (Ka(t), n = e.child, e = n.sibling, n = Zr(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function pc(e, t) {
		return t = mc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function mc(e, t) {
		return e = Yr(22, e, null, t), e.lanes = 0, e;
	}
	function hc(e, t, n) {
		return Ea(t, e.child, null, n), e = pc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function gc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ri(e.return, t, n);
	}
	function _c(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function vc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Za.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, U(Za, o), Js(e, t, r, n), r = Si ? li : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && gc(e, n, t);
			else if (e.tag === 19) gc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && Qa(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), _c(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Qa(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				_c(t, !0, n, null, a, r);
				break;
			case "together":
				_c(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function yc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Hl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Bi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Zr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Zr(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function bc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Vi(e)));
	}
	function xc(e, t, n) {
		switch (t.tag) {
			case 3:
				ne(t, t.stateNode.containerInfo), Ii(t, Yi, e.memoizedState.cache), Ai();
				break;
			case 27:
			case 5:
				ie(t);
				break;
			case 4:
				ne(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ii(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, qa(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ka(t), e = yc(e, t, n), e === null ? null : e.sibling) : fc(e, t, n) : (Ka(t), t.flags |= 128, null);
				Ka(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Bi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return vc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), U(Za, Za.current), r) break;
				return null;
			case 22: return t.lanes = 0, Qs(e, t, n, t.pendingProps);
			case 24: Ii(t, Yi, e.memoizedState.cache);
		}
		return yc(e, t, n);
	}
	function Sc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) qs = !0;
		else {
			if (!bc(e, n) && !(t.flags & 128)) return qs = !1, xc(e, t, n);
			qs = !!(e.flags & 131072);
		}
		else qs = !1, Si && t.flags & 1048576 && gi(t, li, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ga(t.elementType), t.type = e, typeof e == "function") Xr(e) ? (r = $(e, r), t.tag = 1, t = sc(null, t, e, r, n)) : (t.tag = 0, t = ac(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Ys(null, t, e, r, n);
								break a;
							}
							if (a === D) {
								t.tag = 14, t = Xs(null, t, e, r, n);
								break a;
							}
						}
						throw t = P(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return ac(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = $(r, t.pendingProps), sc(e, t, r, a, n);
			case 3:
				a: {
					if (ne(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Aa(e, t), Ia(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ii(t, Yi, r), r !== o.cache && zi(t, [Yi], n, !0), Fa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = cc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = ai(Error(i(424)), t), Mi(a), t = cc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (xi = cf(e.firstChild), bi = t, Si = !0, Ci = null, wi = !0, n = Da(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ai(), r === a) {
							t = yc(e, t, n);
							break a;
						}
						Js(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return ic(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Si || (n = t.type, e = t.pendingProps, r = Bd(ee.current).createElement(n), r[Ze] = t, r[Qe] = e, Pd(r, n, e), ct(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ie(t), e === null && Si && (r = t.stateNode = ff(t.type, t.pendingProps, ee.current), bi = t, wi = !0, a = xi, Zd(t.type) ? (lf = a, xi = cf(r.firstChild)) : xi = a), Js(e, t, t.pendingProps.children, n), ic(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Si && ((a = r = xi) && (r = tf(r, t.type, t.pendingProps, wi), r === null ? a = !1 : (t.stateNode = r, bi = t, xi = cf(r.firstChild), wi = !1, a = !0)), a || Ei(t)), ie(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = po(e, t, go, null, null, n), Qf._currentValue = a), ic(e, t), Js(e, t, r, n), t.child;
			case 6: return e === null && Si && ((e = n = xi) && (n = nf(n, t.pendingProps, wi), n === null ? e = !1 : (t.stateNode = n, bi = t, xi = null, e = !0)), e || Ei(t)), null;
			case 13: return fc(e, t, n);
			case 4: return ne(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ea(t, null, r, n) : Js(e, t, r, n), t.child;
			case 11: return Ys(e, t, t.type, t.pendingProps, n);
			case 7: return Js(e, t, t.pendingProps, n), t.child;
			case 8: return Js(e, t, t.pendingProps.children, n), t.child;
			case 12: return Js(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ii(t, t.type, r.value), Js(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Hi(t), a = Ui(a), r = r(a), t.flags |= 1, Js(e, t, r, n), t.child;
			case 14: return Xs(e, t, t.type, t.pendingProps, n);
			case 15: return Zs(e, t, t.type, t.pendingProps, n);
			case 19: return vc(e, t, n);
			case 31: return rc(e, t, n);
			case 22: return Qs(e, t, n, t.pendingProps);
			case 24: return Hi(t), r = Ui(Yi), e === null ? (a = sa(), a === null && (a = Ml, o = Xi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ka(t), Ii(t, Yi, a)) : ((e.lanes & n) !== 0 && (Aa(e, t), Ia(t, null, null, n), Fa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ii(t, Yi, r), r !== a.cache && zi(t, [Yi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ii(t, Yi, r))), Js(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Cc(e) {
		e.flags |= 4;
	}
	function wc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (xu()) e.flags |= 8192;
			else throw _a = pa, da;
		} else e.flags &= -16777217;
	}
	function Tc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (xu()) e.flags |= 8192;
		else throw _a = pa, da;
	}
	function Ec(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : q(), e.lanes |= t, Kl |= t);
	}
	function Dc(e, t) {
		if (!Si) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Oc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function kc(e, t, n) {
		var r = t.pendingProps;
		switch (vi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Oc(t), null;
			case 1: return Oc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Li(Yi), re(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ki(t) ? Cc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ji())), Oc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Cc(t), o === null ? (Oc(t), wc(t, a, null, r, n)) : (Oc(t), Tc(t, o))) : o ? o === e.memoizedState ? (Oc(t), t.flags &= -16777217) : (Cc(t), Oc(t), Tc(t, o)) : (e = e.memoizedProps, e !== r && Cc(t), Oc(t), wc(t, a, e, r, n)), null;
			case 27:
				if (ae(t), n = ee.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Oc(t), null;
					}
					e = W.current, ki(t) ? Di(t, e) : (e = ff(a, r, n), t.stateNode = e, Cc(t));
				}
				return Oc(t), null;
			case 5:
				if (ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Oc(t), null;
					}
					if (o = W.current, ki(t)) Di(t, o);
					else {
						var s = Bd(ee.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ze] = t, o[Qe] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Cc(t);
					}
				}
				return Oc(t), wc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Cc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ee.current, ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ze] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || Ei(t, !0);
					} else e = Bd(e).createTextNode(r), e[Ze] = t, t.stateNode = e;
				}
				return Oc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Oc(t), e = !1;
					} else n = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Xa(t), t) : (Xa(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Oc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ki(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Oc(t), a = !1;
					} else a = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Xa(t), t) : (Xa(t), null);
				}
				return Xa(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ec(t, t.updateQueue), Oc(t), null);
			case 4: return re(), e === null && xd(t.stateNode.containerInfo), Oc(t), null;
			case 10: return Li(t.type), Oc(t), null;
			case 19:
				if (H(Za), r = t.memoizedState, r === null) return Oc(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) Dc(r, !1);
				else {
					if (Vl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = Qa(e), o !== null) {
							for (t.flags |= 128, Dc(r, !1), e = o.updateQueue, t.updateQueue = e, Ec(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Qr(n, e), n = n.sibling;
							return U(Za, Za.current & 1 | 2), Si && hi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && ve() > Ql && (t.flags |= 128, a = !0, Dc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = Qa(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ec(t, e), Dc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Si) return Oc(t), null;
					} else 2 * ve() - r.renderingStartTime > Ql && n !== 536870912 && (t.flags |= 128, a = !0, Dc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Oc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ve(), e.sibling = null, n = Za.current, U(Za, a ? n & 1 | 2 : n & 1), Si && hi(t, r.treeForkCount), e);
			case 22:
			case 23: return Xa(t), Ua(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Oc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oc(t), n = t.updateQueue, n !== null && Ec(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && H(oa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Li(Yi), Oc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Ac(e, t) {
		switch (vi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Li(Yi), re(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Xa(t), t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Xa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return H(Za), null;
			case 4: return re(), null;
			case 10: return Li(t.type), null;
			case 22:
			case 23: return Xa(t), Ua(), e !== null && H(oa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Li(Yi), null;
			case 25: return null;
			default: return null;
		}
	}
	function jc(e, t) {
		switch (vi(t), t.tag) {
			case 3:
				Li(Yi), re();
				break;
			case 26:
			case 27:
			case 5:
				ae(t);
				break;
			case 4:
				re();
				break;
			case 31:
				t.memoizedState !== null && Xa(t);
				break;
			case 13:
				Xa(t);
				break;
			case 19:
				H(Za);
				break;
			case 10:
				Li(t.type);
				break;
			case 22:
			case 23:
				Xa(t), Ua(), e !== null && H(oa);
				break;
			case 24: Li(Yi);
		}
	}
	function Mc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function Nc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Hu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function Pc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ra(t, n);
			} catch (t) {
				Hu(e, e.return, t);
			}
		}
	}
	function Fc(e, t, n) {
		n.props = $(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Hu(e, t, n);
		}
	}
	function Ic(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Hu(e, t, n);
		}
	}
	function Lc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Hu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Hu(e, t, n);
		}
		else n.current = null;
	}
	function Rc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	function zc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[Qe] = t;
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	function Bc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Vc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Bc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Hc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ht));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Hc(e, t, n), e = e.sibling; e !== null;) Hc(e, t, n), e = e.sibling;
	}
	function Uc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Uc(e, t, n), e = e.sibling; e !== null;) Uc(e, t, n), e = e.sibling;
	}
	function Wc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[Ze] = e, t[Qe] = n;
		} catch (t) {
			Hu(e, e.return, t);
		}
	}
	var Gc = !1, Kc = !1, qc = !1, Jc = typeof WeakSet == "function" ? WeakSet : Set, Yc = null;
	function Xc(e, t) {
		if (e = e.containerInfo, Rd = sp, e = hr(e), gr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, Yc = t; Yc !== null;) if (t = Yc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Yc = e;
		else for (; Yc !== null;) {
			switch (t = Yc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = $(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Hu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Yc = e;
				break;
			}
			Yc = t.return;
		}
	}
	function Zc(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				fl(e, n), r & 4 && Mc(5, n);
				break;
			case 1:
				if (fl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Hu(n, n.return, e);
				}
				else {
					var i = $(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Hu(n, n.return, e);
					}
				}
				r & 64 && Pc(n), r & 512 && Ic(n, n.return);
				break;
			case 3:
				if (fl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ra(e, t);
					} catch (e) {
						Hu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Wc(n);
			case 26:
			case 5:
				fl(e, n), t === null && r & 4 && Rc(n), r & 512 && Ic(n, n.return);
				break;
			case 12:
				fl(e, n);
				break;
			case 31:
				fl(e, n), r & 4 && rl(e, n);
				break;
			case 13:
				fl(e, n), r & 4 && il(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ku.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Gc, !r) {
					t = t !== null && t.memoizedState !== null || Kc, i = Gc;
					var a = Kc;
					Gc = r, (Kc = t) && !a ? ml(e, n, !!(n.subtreeFlags & 8772)) : fl(e, n), Gc = i, Kc = a;
				}
				break;
			case 30: break;
			default: fl(e, n);
		}
	}
	function Qc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Qc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && it(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var $c = null, el = !1;
	function tl(e, t, n) {
		for (n = n.child; n !== null;) nl(e, t, n), n = n.sibling;
	}
	function nl(e, t, n) {
		if (Oe && typeof Oe.onCommitFiberUnmount == "function") try {
			Oe.onCommitFiberUnmount(De, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Kc || Lc(n, t), tl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Kc || Lc(n, t);
				var r = $c, i = el;
				Zd(n.type) && ($c = n.stateNode, el = !1), tl(e, t, n), pf(n.stateNode), $c = r, el = i;
				break;
			case 5: Kc || Lc(n, t);
			case 6:
				if (r = $c, i = el, $c = null, tl(e, t, n), $c = r, el = i, $c !== null) if (el) try {
					($c.nodeType === 9 ? $c.body : $c.nodeName === "HTML" ? $c.ownerDocument.body : $c).removeChild(n.stateNode);
				} catch (e) {
					Hu(n, t, e);
				}
				else try {
					$c.removeChild(n.stateNode);
				} catch (e) {
					Hu(n, t, e);
				}
				break;
			case 18:
				$c !== null && (el ? (e = $c, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd($c, n.stateNode));
				break;
			case 4:
				r = $c, i = el, $c = n.stateNode.containerInfo, el = !0, tl(e, t, n), $c = r, el = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Nc(2, n, t), Kc || Nc(4, n, t), tl(e, t, n);
				break;
			case 1:
				Kc || (Lc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Fc(n, t, r)), tl(e, t, n);
				break;
			case 21:
				tl(e, t, n);
				break;
			case 22:
				Kc = (r = Kc) || n.memoizedState !== null, tl(e, t, n), Kc = r;
				break;
			default: tl(e, t, n);
		}
	}
	function rl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Hu(t, t.return, e);
			}
		}
	}
	function il(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Hu(t, t.return, e);
		}
	}
	function al(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Jc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ol(e, t) {
		var n = al(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = qu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function sl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							$c = c.stateNode, el = !1;
							break a;
						}
						break;
					case 5:
						$c = c.stateNode, el = !1;
						break a;
					case 3:
					case 4:
						$c = c.stateNode.containerInfo, el = !0;
						break a;
				}
				c = c.return;
			}
			if ($c === null) throw Error(i(160));
			nl(o, s, a), $c = null, el = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) ll(t, e), t = t.sibling;
	}
	var cl = null;
	function ll(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				sl(t, e), ul(e), r & 4 && (Nc(3, e, e.return), Mc(3, e), Nc(5, e, e.return));
				break;
			case 1:
				sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), r & 64 && Gc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = cl;
				if (sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[J] || o[Ze] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[Ze] = e, ct(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Ze] = e, ct(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && zc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), n !== null && r & 4 && zc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (sl(t, e), ul(e), r & 512 && (Kc || n === null || Lc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Pt(a, "");
					} catch (t) {
						Hu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, zc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (qc = !0);
				break;
			case 6:
				if (sl(t, e), ul(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Hu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = cl, cl = gf(t.containerInfo), sl(t, e), cl = a, ul(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Hu(e, e.return, t);
				}
				qc && (qc = !1, dl(e));
				break;
			case 4:
				r = cl, cl = gf(e.stateNode.containerInfo), sl(t, e), ul(e), cl = r;
				break;
			case 12:
				sl(t, e), ul(e);
				break;
			case 31:
				sl(t, e), ul(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 13:
				sl(t, e), ul(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Xl = ve()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Gc, d = Kc;
				if (Gc = u || a, Kc = d || l, sl(t, e), Kc = d, Gc = u, ul(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Gc || Kc || pl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Hu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ol(e, n))));
				break;
			case 19:
				sl(t, e), ul(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ol(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: sl(t, e), ul(e);
		}
	}
	function ul(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Bc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Uc(e, Vc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Pt(o, ""), n.flags &= -33), Uc(e, Vc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Hc(e, Vc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Hu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function dl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			dl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function fl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Zc(e, t.alternate, t), t = t.sibling;
	}
	function pl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Nc(4, t, t.return), pl(t);
					break;
				case 1:
					Lc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Fc(t, t.return, n), pl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Lc(t, t.return), pl(t);
					break;
				case 22:
					t.memoizedState === null && pl(t);
					break;
				case 30:
					pl(t);
					break;
				default: pl(t);
			}
			e = e.sibling;
		}
	}
	function ml(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ml(i, a, n), Mc(4, a);
					break;
				case 1:
					if (ml(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Hu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) La(c[i], s);
						} catch (e) {
							Hu(r, r.return, e);
						}
					}
					n && o & 64 && Pc(a), Ic(a, a.return);
					break;
				case 27: Wc(a);
				case 26:
				case 5:
					ml(i, a, n), n && r === null && o & 4 && Rc(a), Ic(a, a.return);
					break;
				case 12:
					ml(i, a, n);
					break;
				case 31:
					ml(i, a, n), n && o & 4 && rl(i, a);
					break;
				case 13:
					ml(i, a, n), n && o & 4 && il(i, a);
					break;
				case 22:
					a.memoizedState === null && ml(i, a, n), Ic(a, a.return);
					break;
				case 30: break;
				default: ml(i, a, n);
			}
			t = t.sibling;
		}
	}
	function hl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Zi(n));
	}
	function gl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e));
	}
	function _l(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) vl(e, t, n, r), t = t.sibling;
	}
	function vl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				_l(e, t, n, r), i & 2048 && Mc(9, t);
				break;
			case 1:
				_l(e, t, n, r);
				break;
			case 3:
				_l(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e)));
				break;
			case 12:
				if (i & 2048) {
					_l(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Hu(t, t.return, e);
					}
				} else _l(e, t, n, r);
				break;
			case 31:
				_l(e, t, n, r);
				break;
			case 13:
				_l(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? _l(e, t, n, r) : (a._visibility |= 2, yl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? _l(e, t, n, r) : bl(e, t), i & 2048 && hl(o, t);
				break;
			case 24:
				_l(e, t, n, r), i & 2048 && gl(t.alternate, t);
				break;
			default: _l(e, t, n, r);
		}
	}
	function yl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					yl(a, o, s, c, i), Mc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, yl(a, o, s, c, i)) : u._visibility & 2 ? yl(a, o, s, c, i) : bl(a, o), i && l & 2048 && hl(o.alternate, o);
					break;
				case 24:
					yl(a, o, s, c, i), i && l & 2048 && gl(o.alternate, o);
					break;
				default: yl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					bl(n, r), i & 2048 && hl(r.alternate, r);
					break;
				case 24:
					bl(n, r), i & 2048 && gl(r.alternate, r);
					break;
				default: bl(n, r);
			}
			t = t.sibling;
		}
	}
	var xl = 8192;
	function Sl(e, t, n) {
		if (e.subtreeFlags & xl) for (e = e.child; e !== null;) Cl(e, t, n), e = e.sibling;
	}
	function Cl(e, t, n) {
		switch (e.tag) {
			case 26:
				Sl(e, t, n), e.flags & xl && e.memoizedState !== null && Gf(n, cl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Sl(e, t, n);
				break;
			case 3:
			case 4:
				var r = cl;
				cl = gf(e.stateNode.containerInfo), Sl(e, t, n), cl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = xl, xl = 16777216, Sl(e, t, n), xl = r) : Sl(e, t, n));
				break;
			default: Sl(e, t, n);
		}
	}
	function wl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Tl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Yc = r, Ol(r, e);
			}
			wl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) El(e), e = e.sibling;
	}
	function El(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e), e.flags & 2048 && Nc(9, e, e.return);
				break;
			case 3:
				Tl(e);
				break;
			case 12:
				Tl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Dl(e)) : Tl(e);
				break;
			default: Tl(e);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Yc = r, Ol(r, e);
			}
			wl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Nc(8, t, t.return), Dl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Dl(t));
					break;
				default: Dl(t);
			}
			e = e.sibling;
		}
	}
	function Ol(e, t) {
		for (; Yc !== null;) {
			var n = Yc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Nc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Zi(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Yc = r;
			else a: for (n = e; Yc !== null;) {
				r = Yc;
				var i = r.sibling, a = r.return;
				if (Qc(r), r === n) {
					Yc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Yc = i;
					break a;
				}
				Yc = a;
			}
		}
	}
	var kl = {
		getCacheForType: function(e) {
			var t = Ui(Yi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ui(Yi).controller.signal;
		}
	}, Al = typeof WeakMap == "function" ? WeakMap : Map, jl = 0, Ml = null, Nl = null, Pl = 0, Fl = 0, Il = null, Ll = !1, Rl = !1, zl = !1, Bl = 0, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = null, Jl = null, Yl = !1, Xl = 0, Zl = 0, Ql = Infinity, $l = null, eu = null, tu = 0, nu = null, ru = null, iu = 0, au = 0, ou = null, su = null, cu = 0, lu = null;
	function uu() {
		return jl & 2 && Pl !== 0 ? Pl & -Pl : I.T === null ? Je() : ld();
	}
	function du() {
		if (Gl === 0) if (!(Pl & 536870912) || Si) {
			var e = Pe;
			Pe <<= 1, !(Pe & 3932160) && (Pe = 262144), Gl = e;
		} else Gl = 536870912;
		return e = Wa.current, e !== null && (e.flags |= 32), Gl;
	}
	function fu(e, t, n) {
		(e === Ml && (Fl === 2 || Fl === 9) || e.cancelPendingCommit !== null) && (yu(e, 0), gu(e, Pl, Gl, !1)), Ve(e, n), (!(jl & 2) || e !== Ml) && (e === Ml && (!(jl & 2) && (Ul |= n), Vl === 4 && gu(e, Pl, Gl, !1)), td(e));
	}
	function pu(e, t, n) {
		if (jl & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Re(e, t), a = r ? Du(e, t) : Tu(e, t, !0), o = r;
		do {
			if (a === 0) {
				Rl && !r && gu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !hu(n)) {
				a = Tu(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = ql;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (yu(c, s).flags |= 256), s = Tu(c, s, !1), s !== 2) {
							if (zl && !l) {
								c.errorRecoveryDisabledLanes |= o, Ul |= o, a = 4;
								break a;
							}
							o = Jl, Jl = a, o !== null && (Jl === null ? Jl = o : Jl.push.apply(Jl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				yu(e, 0), gu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						gu(r, t, Gl, !Ll);
						break a;
					case 2:
						Jl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = Xl + 300 - ve(), 10 < a)) {
					if (gu(r, t, Gl, !Ll), Le(r, 0, !0) !== 0) break a;
					iu = t, r.timeoutHandle = Kd(mu.bind(null, r, n, Jl, $l, Yl, t, Gl, Ul, Kl, Ll, o, "Throttled", -0, 0), a);
					break a;
				}
				mu(r, n, Jl, $l, Yl, t, Gl, Ul, Kl, Ll, o, null, -0, 0);
			}
			break;
		} while (1);
		td(e);
	}
	function mu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Ht
			}, Cl(t, a, d);
			var m = (a & 62914560) === a ? Xl - ve() : (a & 4194048) === a ? Zl - ve() : 0;
			if (m = qf(d, m), m !== null) {
				iu = a, e.cancelPendingCommit = m(Pu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), gu(e, a, o, !l);
				return;
			}
		}
		Pu(e, t, a, n, r, i, o, s, c);
	}
	function hu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!ur(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function gu(e, t, n, r) {
		t &= ~Wl, t &= ~Ul, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ae(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Ue(e, n, t);
	}
	function _u() {
		return jl & 6 ? !0 : (nd(0, !1), !1);
	}
	function vu() {
		if (Nl !== null) {
			if (Fl === 0) var e = Nl.return;
			else e = Nl, Fi = Pi = null, yo(e), ba = null, xa = 0, e = Nl;
			for (; e !== null;) jc(e.alternate, e), e = e.return;
			Nl = null;
		}
	}
	function yu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), iu = 0, vu(), Ml = e, Nl = n = Zr(e.current, null), Pl = t, Fl = 0, Il = null, Ll = !1, Rl = Re(e, t), zl = !1, Kl = Gl = Wl = Ul = Hl = Vl = 0, Jl = ql = null, Yl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ae(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Bl = t, Vr(), n;
	}
	function bu(e, t) {
		eo = null, I.H = ks, t === ua || t === fa ? (t = va(), Fl = 3) : t === da ? (t = va(), Fl = 4) : Fl = t === Ks ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Il = t, Nl === null && (Vl = 1, Bs(e, ai(t, e.current)));
	}
	function xu() {
		var e = Wa.current;
		return e === null ? !0 : (Pl & 4194048) === Pl ? Ga === null : (Pl & 62914560) === Pl || Pl & 536870912 ? e === Ga : !1;
	}
	function Su() {
		var e = I.H;
		return I.H = ks, e === null ? ks : e;
	}
	function Cu() {
		var e = I.A;
		return I.A = kl, e;
	}
	function wu() {
		Vl = 4, Ll || (Pl & 4194048) !== Pl && Wa.current !== null || (Rl = !0), !(Hl & 134217727) && !(Ul & 134217727) || Ml === null || gu(Ml, Pl, Gl, !1);
	}
	function Tu(e, t, n) {
		var r = jl;
		jl |= 2;
		var i = Su(), a = Cu();
		(Ml !== e || Pl !== t) && ($l = null, yu(e, t)), t = !1;
		var o = Vl;
		a: do
			try {
				if (Fl !== 0 && Nl !== null) {
					var s = Nl, c = Il;
					switch (Fl) {
						case 8:
							vu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Wa.current === null && (t = !0);
							var l = Fl;
							if (Fl = 0, Il = null, ju(e, s, c, l), n && Rl) {
								o = 0;
								break a;
							}
							break;
						default: l = Fl, Fl = 0, Il = null, ju(e, s, c, l);
					}
				}
				Eu(), o = Vl;
				break;
			} catch (t) {
				bu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Fi = Pi = null, jl = r, I.H = i, I.A = a, Nl === null && (Ml = null, Pl = 0, Vr()), o;
	}
	function Eu() {
		for (; Nl !== null;) ku(Nl);
	}
	function Du(e, t) {
		var n = jl;
		jl |= 2;
		var r = Su(), a = Cu();
		Ml !== e || Pl !== t ? ($l = null, Ql = ve() + 500, yu(e, t)) : Rl = Re(e, t);
		a: do
			try {
				if (Fl !== 0 && Nl !== null) {
					t = Nl;
					var o = Il;
					b: switch (Fl) {
						case 1:
							Fl = 0, Il = null, ju(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ma(o)) {
								Fl = 0, Il = null, Au(t);
								break;
							}
							t = function() {
								Fl !== 2 && Fl !== 9 || Ml !== e || (Fl = 7), td(e);
							}, o.then(t, t);
							break a;
						case 3:
							Fl = 7;
							break a;
						case 4:
							Fl = 5;
							break a;
						case 7:
							ma(o) ? (Fl = 0, Il = null, Au(t)) : (Fl = 0, Il = null, ju(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Nl.tag) {
								case 26: s = Nl.memoizedState;
								case 5:
								case 27:
									var c = Nl;
									if (s ? Wf(s) : c.stateNode.complete) {
										Fl = 0, Il = null;
										var l = c.sibling;
										if (l !== null) Nl = l;
										else {
											var u = c.return;
											u === null ? Nl = null : (Nl = u, Mu(u));
										}
										break b;
									}
							}
							Fl = 0, Il = null, ju(e, t, o, 5);
							break;
						case 6:
							Fl = 0, Il = null, ju(e, t, o, 6);
							break;
						case 8:
							vu(), Vl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Ou();
				break;
			} catch (t) {
				bu(e, t);
			}
		while (1);
		return Fi = Pi = null, I.H = r, I.A = a, jl = n, Nl === null ? (Ml = null, Pl = 0, Vr(), Vl) : 0;
	}
	function Ou() {
		for (; Nl !== null && !ge();) ku(Nl);
	}
	function ku(e) {
		var t = Sc(e.alternate, e, Bl);
		e.memoizedProps = e.pendingProps, t === null ? Mu(e) : Nl = t;
	}
	function Au(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = oc(n, t, t.pendingProps, t.type, void 0, Pl);
				break;
			case 11:
				t = oc(n, t, t.pendingProps, t.type.render, t.ref, Pl);
				break;
			case 5: yo(t);
			default: jc(n, t), t = Nl = Qr(t, Bl), t = Sc(n, t, Bl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Mu(e) : Nl = t;
	}
	function ju(e, t, n, r) {
		Fi = Pi = null, yo(t), ba = null, xa = 0;
		var i = t.return;
		try {
			if (Gs(e, i, t, n, Pl)) {
				Vl = 1, Bs(e, ai(n, e.current)), Nl = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Nl = i, t;
			Vl = 1, Bs(e, ai(n, e.current)), Nl = null;
			return;
		}
		t.flags & 32768 ? (Si || r === 1 ? e = !0 : Rl || Pl & 536870912 ? e = !1 : (Ll = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Wa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Nu(t, e)) : Mu(t);
	}
	function Mu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Nu(t, Ll);
				return;
			}
			e = t.return;
			var n = kc(t.alternate, t, Bl);
			if (n !== null) {
				Nl = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Nl = t;
				return;
			}
			Nl = t = e;
		} while (t !== null);
		Vl === 0 && (Vl = 5);
	}
	function Nu(e, t) {
		do {
			var n = Ac(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Nl = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Nl = e;
				return;
			}
			Nl = e = n;
		} while (e !== null);
		Vl = 6, Nl = null;
	}
	function Pu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			zu();
		while (tu !== 0);
		if (jl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Br, He(e, n, o, s, c, l), e === Ml && (Nl = Ml = null, Pl = 0), ru = t, nu = e, iu = n, au = o, ou = a, su = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Ju(Se, function() {
				return Bu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = I.T, I.T = null, a = L.p, L.p = 2, s = jl, jl |= 4;
				try {
					Xc(e, t, n);
				} finally {
					jl = s, L.p = a, I.T = r;
				}
			}
			tu = 1, Fu(), Iu(), Lu();
		}
	}
	function Fu() {
		if (tu === 1) {
			tu = 0;
			var e = nu, t = ru, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = jl;
				jl |= 4;
				try {
					ll(t, e);
					var a = zd, o = hr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && mr(s.ownerDocument.documentElement, s)) {
						if (c !== null && gr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = pr(s, h), v = pr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					jl = i, L.p = r, I.T = n;
				}
			}
			e.current = t, tu = 2;
		}
	}
	function Iu() {
		if (tu === 2) {
			tu = 0;
			var e = nu, t = ru, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = jl;
				jl |= 4;
				try {
					Zc(e, t.alternate, t);
				} finally {
					jl = i, L.p = r, I.T = n;
				}
			}
			tu = 3;
		}
	}
	function Lu() {
		if (tu === 4 || tu === 3) {
			tu = 0, _e();
			var e = nu, t = ru, n = iu, r = su;
			t.subtreeFlags & 10256 || t.flags & 10256 ? tu = 5 : (tu = 0, ru = nu = null, Ru(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (eu = null), qe(n), t = t.stateNode, Oe && typeof Oe.onCommitFiberRoot == "function") try {
				Oe.onCommitFiberRoot(De, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = I.T, i = L.p, L.p = 2, I.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					I.T = t, L.p = i;
				}
			}
			iu & 3 && zu(), td(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === lu ? cu++ : (cu = 0, lu = e) : cu = 0, nd(0, !1);
		}
	}
	function Ru(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Zi(t)));
	}
	function zu() {
		return Fu(), Iu(), Lu(), Bu();
	}
	function Bu() {
		if (tu !== 5) return !1;
		var e = nu, t = au;
		au = 0;
		var n = qe(iu), r = I.T, a = L.p;
		try {
			L.p = 32 > n ? 32 : n, I.T = null, n = ou, ou = null;
			var o = nu, s = iu;
			if (tu = 0, ru = nu = null, iu = 0, jl & 6) throw Error(i(331));
			var c = jl;
			if (jl |= 4, El(o.current), vl(o, o.current, s, n), jl = c, nd(0, !1), Oe && typeof Oe.onPostCommitFiberRoot == "function") try {
				Oe.onPostCommitFiberRoot(De, o);
			} catch {}
			return !0;
		} finally {
			L.p = a, I.T = r, Ru(e, t);
		}
	}
	function Vu(e, t, n) {
		t = ai(n, t), t = Hs(e.stateNode, t, 2), e = Q(e, t, 2), e !== null && (Ve(e, 2), td(e));
	}
	function Hu(e, t, n) {
		if (e.tag === 3) Vu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Vu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (eu === null || !eu.has(r))) {
					e = ai(n, e), n = Us(2), r = Q(t, n, 2), r !== null && (Ws(n, r, t, e), Ve(r, 2), td(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Uu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Al();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (zl = !0, i.add(n), e = Wu.bind(null, e, t, n), t.then(e, e));
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ml === e && (Pl & n) === n && (Vl === 4 || Vl === 3 && (Pl & 62914560) === Pl && 300 > ve() - Xl ? !(jl & 2) && yu(e, 0) : Wl |= n, Kl === Pl && (Kl = 0)), td(e);
	}
	function Gu(e, t) {
		t === 0 && (t = q()), e = Wr(e, t), e !== null && (Ve(e, t), td(e));
	}
	function Ku(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Gu(e, n);
	}
	function qu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Gu(e, n);
	}
	function Ju(e, t) {
		return me(e, t);
	}
	var Yu = null, Xu = null, Zu = !1, Qu = !1, $u = !1, ed = 0;
	function td(e) {
		e !== Xu && e.next === null && (Xu === null ? Yu = Xu = e : Xu = Xu.next = e), Qu = !0, Zu || (Zu = !0, cd());
	}
	function nd(e, t) {
		if (!$u && Qu) {
			$u = !0;
			do
				for (var n = !1, r = Yu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ae(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, sd(r, a));
					} else a = Pl, a = Le(r, r === Ml ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Re(r, a) || (n = !0, sd(r, a));
					r = r.next;
				}
			while (n);
			$u = !1;
		}
	}
	function rd() {
		id();
	}
	function id() {
		Qu = Zu = !1;
		var e = 0;
		ed !== 0 && Gd() && (e = ed);
		for (var t = ve(), n = null, r = Yu; r !== null;) {
			var i = r.next, a = ad(r, t);
			a === 0 ? (r.next = null, n === null ? Yu = i : n.next = i, i === null && (Xu = n)) : (n = r, (e !== 0 || a & 3) && (Qu = !0)), r = i;
		}
		tu !== 0 && tu !== 5 || nd(e, !1), ed !== 0 && (ed = 0);
	}
	function ad(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ae(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Ml, n = Pl, n = Le(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Fl === 2 || Fl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && he(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Re(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && he(r), qe(n)) {
				case 2:
				case 8:
					n = xe;
					break;
				case 32:
					n = Se;
					break;
				case 268435456:
					n = we;
					break;
				default: n = Se;
			}
			return r = od.bind(null, e), n = me(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && he(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function od(e, t) {
		if (tu !== 0 && tu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (zu() && e.callbackNode !== n) return null;
		var r = Pl;
		return r = Le(e, e === Ml ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (pu(e, r, t), ad(e, ve()), e.callbackNode != null && e.callbackNode === n ? od.bind(null, e) : null);
	}
	function sd(e, t) {
		if (zu()) return null;
		pu(e, t, !0);
	}
	function cd() {
		Yd(function() {
			jl & 6 ? me(be, rd) : id();
		});
	}
	function ld() {
		if (ed === 0) {
			var e = ea;
			e === 0 && (e = Ne, Ne <<= 1, !(Ne & 261888) && (Ne = 256)), ed = e;
		}
		return ed;
	}
	function ud(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Vt("" + e);
	}
	function dd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function fd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = ud((i[Qe] || null).action), o = r.submitter;
			o && (t = (t = o[Qe] || null) ? ud(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new ln("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (ed !== 0) {
								var e = o ? dd(i, o) : new FormData(i);
								hs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? dd(i, o) : new FormData(i), hs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var pd = 0; pd < Fr.length; pd++) {
		var md = Fr[pd];
		Ir(md.toLowerCase(), "on" + (md[0].toUpperCase() + md.slice(1)));
	}
	Ir(Or, "onAnimationEnd"), Ir(Z, "onAnimationIteration"), Ir(kr, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Ar, "onTransitionRun"), Ir(jr, "onTransitionStart"), Ir(Mr, "onTransitionCancel"), Ir(Nr, "onTransitionEnd"), ft("onMouseEnter", ["mouseout", "mouseover"]), ft("onMouseLeave", ["mouseout", "mouseover"]), ft("onPointerEnter", ["pointerout", "pointerover"]), ft("onPointerLeave", ["pointerout", "pointerover"]), dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), dt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var hd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), gd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hd));
	function _d(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Lr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Lr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function vd(e, t) {
		var n = t[et];
		n === void 0 && (n = t[et] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, lt.forEach(function(t) {
				t !== "selectionchange" && (gd.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !X || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Y(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Yt(function() {
			var r = a, i = Wt(n), s = [];
			a: {
				var c = Pr.get(e);
				if (c !== void 0) {
					var l = ln, u = e;
					switch (e) {
						case "keypress": if (rn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Dn;
							break;
						case "focusin":
							u = "focus", l = vn;
							break;
						case "focusout":
							u = "blur", l = vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = vn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = gn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = _n;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = kn;
							break;
						case Or:
						case Z:
						case kr:
							l = yn;
							break;
						case Nr:
							l = An;
							break;
						case "scroll":
						case "scrollend":
							l = dn;
							break;
						case "wheel":
							l = jn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = bn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = On;
							break;
						case "toggle":
						case "beforetoggle": l = Mn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Xt(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Ut && (u = n.relatedTarget || n.fromElement) && (Y(u) || u[$e])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Y(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = gn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = On, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ot(l), h = u == null ? c : ot(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, Y(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ot(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Qn;
					else if (Kn(c)) if ($n) v = cr;
					else {
						v = or;
						var y = ar;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Rt(r.elementType) && (v = Qn) : v = sr;
					if (v &&= v(e, r)) {
						qn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && At(c, "number", c.value);
				}
				switch (y = r ? ot(r) : window, e) {
					case "focusin":
						(Kn(y) || y.contentEditable === "true") && (vr = y, yr = r, br = null);
						break;
					case "focusout":
						br = yr = vr = null;
						break;
					case "mousedown":
						xr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						xr = !1, Sr(s, n, i);
						break;
					case "selectionchange": if (_r) break;
					case "keydown":
					case "keyup": Sr(s, n, i);
				}
				var b;
				if (Pn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Hn ? Bn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Ln && n.locale !== "ko" && (Hn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hn && (b = nn()) : ($t = i, en = "value" in $t ? $t.value : $t.textContent, Hn = !0)), y = Td(r, x), 0 < y.length && (x = new xn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Vn(n), b !== null && (x.data = b)))), (b = In ? Un(e, n) : Wn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new xn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), fd(s, e, r, n, i);
			}
			_d(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Xt(e, n), i != null && r.unshift(wd(e, i, a)), i = Xt(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Xt(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = Xt(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Pt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Pt(e, "" + r);
				break;
			case "className":
				vt(e, "class", r);
				break;
			case "tabIndex":
				vt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				vt(e, n, r);
				break;
			case "style":
				Lt(e, r, o);
				break;
			case "data": if (t !== "object") {
				vt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Vt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Vt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Ht);
				break;
			case "onScroll":
				r != null && vd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && vd("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Vt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				vd("beforetoggle", e), vd("toggle", e), _t(e, "popover", r);
				break;
			case "xlinkActuate":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				yt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				yt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				yt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				yt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				_t(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = zt.get(n) || n, _t(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Lt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Pt(e, r) : (typeof r == "number" || typeof r == "bigint") && Pt(e, "" + r);
				break;
			case "onScroll":
				r != null && vd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && vd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Ht);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ut.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Qe] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : _t(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				vd("error", e), vd("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				vd("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				kt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in vd("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && jt(e, !!r, n, !0) : jt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in vd("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				Nt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				vd("beforetoggle", e), vd("toggle", e), vd("cancel", e), vd("close", e);
				break;
			case "iframe":
			case "object":
				vd("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < hd.length; r++) vd(hd[r], e);
				break;
			case "image":
				vd("error", e), vd("load", e);
				break;
			case "details":
				vd("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": vd("error", e), vd("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (Rt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				Ot(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? jt(e, !!n, n ? [] : "", !1) : jt(e, !!n, t, !0)) : jt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Mt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (Rt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[J] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), it(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[J]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		it(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = L.d;
	L.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = _u();
		return e || t;
	}
	function yf(e) {
		var t = at(e);
		t !== null && t.tag === 5 && t.type === "form" ? _s(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Dt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), ct(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Dt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Dt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Dt(n.imageSizes) + "\"]")) : i += "[href=\"" + Dt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = m({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), ct(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Dt(r) + "\"][href=\"" + Dt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = m({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), ct(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = st(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = m({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					ct(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = st(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = m({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ct(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = st(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = m({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ct(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = ee.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = st(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = st(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = st(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Dt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return m({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), ct(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Dt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Dt(n.href) + "\"]");
				if (r) return t.instance = r, ct(r), r;
				var a = m({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ct(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ct(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ct(a), a) : (r = n, (a = mf.get(o)) && (r = m({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ct(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[J] || a[Ze] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: R,
		_currentValue2: R,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Be(0), this.hiddenUpdates = Be(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Yr(3, null, null, t), e.current = a, a.stateNode = e, t = Xi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ka(a), e;
	}
	function tp(e) {
		return e ? (e = qr, e) : qr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = ja(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Q(e, r, t), n !== null && (fu(n, e, t), Ma(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Wr(e, 67108864);
			t !== null && fu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = uu();
			t = Ke(t);
			var n = Wr(e, t);
			n !== null && fu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 2, up(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 8, up(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = at(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ie(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ae(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									td(a), !(jl & 6) && (Ql = ve() + 500, nd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Wr(a, 2), s !== null && fu(s, a, 2), _u(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Wt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = Y(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (ye()) {
				case be: return 2;
				case xe: return 8;
				case Se:
				case Ce: return 32;
				case we: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = at(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = Y(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Ut = r, n.target.dispatchEvent(r), Ut = null;
			} else return t = at(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = at(n);
				a !== null && (e.splice(t, 3), t -= 3, hs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Qe] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Qe] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, uu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), _u(), t[$e] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Je();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.8") throw Error(i(527, Lp, "19.2.8"));
	L.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: I,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			De = zp.inject(Rp), Oe = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ls, s = Rs, c = zs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[$e] = t.current, xd(e), new Fp(t);
	};
})), _ = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = g();
})))();
function v(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = v(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function y() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = v(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var b = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, x = y, S = (e, t) => (n) => {
	if (t?.variants == null) return x(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = b(t) || b(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return x(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, C = /* @__PURE__ */ l(p(), 1), w = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, T = (e, t) => ({
	classGroupId: e,
	validator: t
}), E = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), D = "-", O = [], k = "arbitrary..", A = (e) => {
	let t = N(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return M(e);
			let n = e.split(D);
			return j(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? w(i, t) : t : i || O;
			}
			return n[e] || O;
		}
	};
}, j = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = j(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(D) : e.slice(t).join(D), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, M = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? k + r : void 0;
})(), N = (e) => {
	let { theme: t, classGroups: n } = e;
	return P(n, t);
}, P = (e, t) => {
	let n = E();
	for (let r in e) {
		let i = e[r];
		F(i, n, r, t);
	}
	return n;
}, F = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		I(i, t, n, r);
	}
}, I = (e, t, n, r) => {
	if (typeof e == "string") {
		L(e, t, n);
		return;
	}
	if (typeof e == "function") {
		R(e, t, n, r);
		return;
	}
	z(e, t, n, r);
}, L = (e, t, n) => {
	let r = e === "" ? t : B(t, e);
	r.classGroupId = n;
}, R = (e, t, n, r) => {
	if (V(e)) {
		F(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(T(n, e));
}, z = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		F(o, B(t, a), n, r);
	}
}, B = (e, t) => {
	let n = e, r = t.split(D), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = E(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, V = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, H = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, U = "!", W = ":", G = [], ee = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), te = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === W) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(U) ? (c = s.slice(0, -1), l = !0) : s.startsWith(U) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return ee(t, l, c, u);
	};
	if (t) {
		let e = t + W, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : ee(G, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ne = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, re = (e) => ({
	cache: H(e.cacheSize),
	parseClassName: te(e),
	sortModifiers: ne(e),
	postfixLookupClassGroupIds: ie(e),
	...A(e)
}), ie = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ae = /\s+/, oe = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ae), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + U : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, se = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = ce(n)) && (i && (i += " "), i += r);
	return i;
}, ce = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = ce(e[r])) && (n && (n += " "), n += t);
	return n;
}, le = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = re(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = oe(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(se(...e));
}, ue = [], de = (e) => {
	let t = (t) => t[e] || ue;
	return t.isThemeGetter = !0, t;
}, fe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, me = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, he = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ge = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _e = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ve = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ye = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, be = (e) => me.test(e), xe = (e) => !!e && !Number.isNaN(Number(e)), Se = (e) => !!e && Number.isInteger(Number(e)), Ce = (e) => e.endsWith("%") && xe(e.slice(0, -1)), we = (e) => he.test(e), Te = () => !0, Ee = (e) => ge.test(e) && !_e.test(e), De = () => !1, Oe = (e) => ve.test(e), ke = (e) => ye.test(e), Ae = (e) => !K(e) && !q(e), je = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Me = (e) => qe(e, Ze, De), K = (e) => fe.test(e), Ne = (e) => qe(e, Qe, Ee), Pe = (e) => qe(e, $e, xe), Fe = (e) => qe(e, tt, Te), Ie = (e) => qe(e, et, De), Le = (e) => qe(e, Ye, De), Re = (e) => qe(e, Xe, ke), ze = (e) => qe(e, nt, Oe), q = (e) => pe.test(e), Be = (e) => Je(e, Qe), Ve = (e) => Je(e, et), He = (e) => Je(e, Ye), Ue = (e) => Je(e, Ze), We = (e) => Je(e, Xe), Ge = (e) => Je(e, nt, !0), Ke = (e) => Je(e, tt, !0), qe = (e, t, n) => {
	let r = fe.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Je = (e, t, n = !1) => {
	let r = pe.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Ye = (e) => e === "position" || e === "percentage", Xe = (e) => e === "image" || e === "url", Ze = (e) => e === "length" || e === "size" || e === "bg-size", Qe = (e) => e === "length", $e = (e) => e === "number", et = (e) => e === "family-name", tt = (e) => e === "number" || e === "weight", nt = (e) => e === "shadow", rt = /*#__PURE__*/ le(() => {
	let e = de("color"), t = de("font"), n = de("text"), r = de("font-weight"), i = de("tracking"), a = de("leading"), o = de("breakpoint"), s = de("container"), c = de("spacing"), l = de("radius"), u = de("shadow"), d = de("inset-shadow"), f = de("text-shadow"), p = de("drop-shadow"), m = de("blur"), h = de("perspective"), g = de("aspect"), _ = de("ease"), v = de("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		q,
		K
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		q,
		K,
		c
	], T = () => [
		be,
		"full",
		"auto",
		...w()
	], E = () => [
		Se,
		"none",
		"subgrid",
		q,
		K
	], D = () => [
		"auto",
		{ span: [
			"full",
			Se,
			q,
			K
		] },
		Se,
		q,
		K
	], O = () => [
		Se,
		"auto",
		q,
		K
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		q,
		K
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		be,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		be,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		be,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		q,
		K
	], L = () => [
		...b(),
		He,
		Le,
		{ position: [q, K] }
	], R = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], z = () => [
		"auto",
		"cover",
		"contain",
		Ue,
		Me,
		{ size: [q, K] }
	], B = () => [
		Ce,
		Be,
		Ne
	], V = () => [
		"",
		"none",
		"full",
		l,
		q,
		K
	], H = () => [
		"",
		xe,
		Be,
		Ne
	], U = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], W = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], G = () => [
		xe,
		Ce,
		He,
		Le
	], ee = () => [
		"",
		"none",
		m,
		q,
		K
	], te = () => [
		"none",
		xe,
		q,
		K
	], ne = () => [
		"none",
		xe,
		q,
		K
	], re = () => [
		xe,
		q,
		K
	], ie = () => [
		be,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [we],
			breakpoint: [we],
			color: [Te],
			container: [we],
			"drop-shadow": [we],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Ae],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [we],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [we],
			shadow: [we],
			spacing: ["px", xe],
			text: [we],
			"text-shadow": [we],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				be,
				K,
				q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				q,
				K
			] }],
			"container-named": [je],
			columns: [{ columns: [
				xe,
				K,
				q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Se,
				"auto",
				q,
				K
			] }],
			basis: [{ basis: [
				be,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				xe,
				be,
				"auto",
				"initial",
				"none",
				K
			] }],
			grow: [{ grow: [
				"",
				xe,
				q,
				K
			] }],
			shrink: [{ shrink: [
				"",
				xe,
				q,
				K
			] }],
			order: [{ order: [
				Se,
				"first",
				"last",
				"none",
				q,
				K
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Be,
				Ne
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Ke,
				Fe
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Ce,
				K
			] }],
			"font-family": [{ font: [
				Ve,
				Ie,
				t
			] }],
			"font-features": [{ "font-features": [K] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				q,
				K
			] }],
			"line-clamp": [{ "line-clamp": [
				xe,
				"none",
				q,
				Pe
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				q,
				K
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				q,
				K
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...U(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				xe,
				"from-font",
				"auto",
				q,
				Ne
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				xe,
				"auto",
				q,
				K
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Se,
				q,
				K
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				q,
				K
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				q,
				K
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: L() }],
			"bg-repeat": [{ bg: R() }],
			"bg-size": [{ bg: z() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Se,
						q,
						K
					],
					radial: [
						"",
						q,
						K
					],
					conic: [
						Se,
						q,
						K
					]
				},
				We,
				Re
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: B() }],
			"gradient-via-pos": [{ via: B() }],
			"gradient-to-pos": [{ to: B() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: V() }],
			"rounded-s": [{ "rounded-s": V() }],
			"rounded-e": [{ "rounded-e": V() }],
			"rounded-t": [{ "rounded-t": V() }],
			"rounded-r": [{ "rounded-r": V() }],
			"rounded-b": [{ "rounded-b": V() }],
			"rounded-l": [{ "rounded-l": V() }],
			"rounded-ss": [{ "rounded-ss": V() }],
			"rounded-se": [{ "rounded-se": V() }],
			"rounded-ee": [{ "rounded-ee": V() }],
			"rounded-es": [{ "rounded-es": V() }],
			"rounded-tl": [{ "rounded-tl": V() }],
			"rounded-tr": [{ "rounded-tr": V() }],
			"rounded-br": [{ "rounded-br": V() }],
			"rounded-bl": [{ "rounded-bl": V() }],
			"border-w": [{ border: H() }],
			"border-w-x": [{ "border-x": H() }],
			"border-w-y": [{ "border-y": H() }],
			"border-w-s": [{ "border-s": H() }],
			"border-w-e": [{ "border-e": H() }],
			"border-w-bs": [{ "border-bs": H() }],
			"border-w-be": [{ "border-be": H() }],
			"border-w-t": [{ "border-t": H() }],
			"border-w-r": [{ "border-r": H() }],
			"border-w-b": [{ "border-b": H() }],
			"border-w-l": [{ "border-l": H() }],
			"divide-x": [{ "divide-x": H() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": H() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...U(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...U(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...U(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				xe,
				q,
				K
			] }],
			"outline-w": [{ outline: [
				"",
				xe,
				Be,
				Ne
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				Ge,
				ze
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Ge,
				ze
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: H() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [xe, Ne] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": H() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Ge,
				ze
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				xe,
				q,
				K
			] }],
			"mix-blend": [{ "mix-blend": [
				...W(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": W() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [xe] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": G() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": G() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": G() }],
			"mask-image-t-to-pos": [{ "mask-t-to": G() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": G() }],
			"mask-image-r-to-pos": [{ "mask-r-to": G() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": G() }],
			"mask-image-b-to-pos": [{ "mask-b-to": G() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": G() }],
			"mask-image-l-to-pos": [{ "mask-l-to": G() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": G() }],
			"mask-image-x-to-pos": [{ "mask-x-to": G() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": G() }],
			"mask-image-y-to-pos": [{ "mask-y-to": G() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [q, K] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": G() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": G() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [xe] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": G() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": G() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: L() }],
			"mask-repeat": [{ mask: R() }],
			"mask-size": [{ mask: z() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				q,
				K
			] }],
			filter: [{ filter: [
				"",
				"none",
				q,
				K
			] }],
			blur: [{ blur: ee() }],
			brightness: [{ brightness: [
				xe,
				q,
				K
			] }],
			contrast: [{ contrast: [
				xe,
				q,
				K
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Ge,
				ze
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				xe,
				q,
				K
			] }],
			"hue-rotate": [{ "hue-rotate": [
				xe,
				q,
				K
			] }],
			invert: [{ invert: [
				"",
				xe,
				q,
				K
			] }],
			saturate: [{ saturate: [
				xe,
				q,
				K
			] }],
			sepia: [{ sepia: [
				"",
				xe,
				q,
				K
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				q,
				K
			] }],
			"backdrop-blur": [{ "backdrop-blur": ee() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				xe,
				q,
				K
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				xe,
				q,
				K
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				xe,
				q,
				K
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				xe,
				q,
				K
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				xe,
				q,
				K
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				xe,
				q,
				K
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				xe,
				q,
				K
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				xe,
				q,
				K
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				q,
				K
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				xe,
				"initial",
				q,
				K
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				q,
				K
			] }],
			delay: [{ delay: [
				xe,
				q,
				K
			] }],
			animate: [{ animate: [
				"none",
				v,
				q,
				K
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				q,
				K
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: te() }],
			"rotate-x": [{ "rotate-x": te() }],
			"rotate-y": [{ "rotate-y": te() }],
			"rotate-z": [{ "rotate-z": te() }],
			scale: [{ scale: ne() }],
			"scale-x": [{ "scale-x": ne() }],
			"scale-y": [{ "scale-y": ne() }],
			"scale-z": [{ "scale-z": ne() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: re() }],
			"skew-x": [{ "skew-x": re() }],
			"skew-y": [{ "skew-y": re() }],
			transform: [{ transform: [
				q,
				K,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ie() }],
			"translate-x": [{ "translate-x": ie() }],
			"translate-y": [{ "translate-y": ie() }],
			"translate-z": [{ "translate-z": ie() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Se,
				q,
				K
			] }],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				q,
				K
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": I() }],
			"scrollbar-track-color": [{ "scrollbar-track": I() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				q,
				K
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				xe,
				Be,
				Ne,
				Pe
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/lib/utils.ts
function J(...e) {
	return rt(y(e));
}
//#endregion
//#region node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react-jsx-runtime.production.js
var it = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), Y = (/* @__PURE__ */ o(((e, t) => {
	t.exports = it();
})))(), at = S("group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function ot({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: J(at({ variant: t }), e),
		...n
	});
}
function st({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "alert-title",
		className: J("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", e),
		...t
	});
}
function ct({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "alert-description",
		className: J("text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/alert.tsx
function lt({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)(ot, {
		"data-ssui-component": "alert",
		"data-testid": "ssui-v2-alert",
		variant: e.props.variant,
		children: [/* @__PURE__ */ (0, Y.jsx)(st, { children: e.props.title }), e.props.description === null ? null : /* @__PURE__ */ (0, Y.jsx)(ct, { children: e.props.description })]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnFirstRender.mjs
function ut(e) {
	let t = C.useRef(!0);
	t.current && (t.current = !1, e());
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function dt() {
	return typeof window < "u";
}
function ft(e) {
	return ht(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function pt(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function mt(e) {
	return ((ht(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ht(e) {
	return dt() ? e instanceof Node || e instanceof pt(e).Node : !1;
}
function gt(e) {
	return dt() ? e instanceof Element || e instanceof pt(e).Element : !1;
}
function _t(e) {
	return dt() ? e instanceof HTMLElement || e instanceof pt(e).HTMLElement : !1;
}
function vt(e) {
	return !dt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof pt(e).ShadowRoot;
}
function yt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = At(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function bt(e) {
	return /^(table|td|th)$/.test(ft(e));
}
function xt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var St = /transform|translate|scale|rotate|perspective|filter/, Ct = /paint|layout|strict|content/, wt = (e) => !!e && e !== "none", Tt;
function Et(e) {
	let t = gt(e) ? At(e) : e;
	return wt(t.transform) || wt(t.translate) || wt(t.scale) || wt(t.rotate) || wt(t.perspective) || !Ot() && (wt(t.backdropFilter) || wt(t.filter)) || St.test(t.willChange || "") || Ct.test(t.contain || "");
}
function Dt(e) {
	let t = Mt(e);
	for (; _t(t) && !kt(t);) {
		if (Et(t)) return t;
		if (xt(t)) return null;
		t = Mt(t);
	}
	return null;
}
function Ot() {
	return Tt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Tt;
}
function kt(e) {
	return /^(html|body|#document)$/.test(ft(e));
}
function At(e) {
	return pt(e).getComputedStyle(e);
}
function jt(e) {
	return gt(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Mt(e) {
	if (ft(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || vt(e) && e.host || mt(e);
	return vt(t) ? t.host : t;
}
function Nt(e) {
	let t = Mt(e);
	return kt(t) ? (e.ownerDocument || e).body : _t(t) && yt(t) ? t : Nt(t);
}
function Pt(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Nt(e), i = r === e.ownerDocument?.body, a = pt(r);
	if (i) {
		let e = Ft(a);
		return t.concat(a, a.visualViewport || [], yt(r) ? r : [], e && n ? Pt(e) : []);
	}
	return t.concat(r, Pt(r, [], n));
}
function Ft(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/addEventListener.mjs
function It(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/shared.mjs
function Lt() {
	return typeof navigator > "u" ? {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	} : {
		userAgent: navigator.userAgent,
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? 0
	};
}
var { userAgent: Rt, platform: zt, maxTouchPoints: Bt } = Lt(), Vt = Rt.toLowerCase(), Ht = zt.toLowerCase(), Ut = /^i(os$|p)/.test(Ht) || Ht === "macintel" && Bt > 1, Wt = "android", Gt = Ht === Wt || Vt.includes(Wt), Kt = !Ut && Ht.startsWith("mac");
Ht.startsWith("win"), !Gt && /^(linux|chrome os)/.test(Ht);
var qt = Kt || Ut, Jt = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!Jt && Vt.includes("firefox"), !Jt && Vt.includes("chrom");
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/screen-reader.mjs
var Yt = qt, Xt = /jsdom|happydom/.test(Vt);
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/owner.mjs
function Zt(e) {
	return e?.ownerDocument || document;
}
var X = typeof document < "u" ? C.useLayoutEffect : () => {}, Qt = {};
function $t(e, t) {
	let n = C.useRef(Qt);
	return n.current === Qt && (n.current = e(t)), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnMount.mjs
var en = [];
function tn(e) {
	C.useEffect(e, en);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useTimeout.mjs
var nn = 0, rn = class e {
	static create() {
		return new e();
	}
	currentId = nn;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = nn, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== nn;
	}
	clear = () => {
		this.currentId !== nn && (clearTimeout(this.currentId), this.currentId = nn);
	};
	disposeEffect = () => this.clear;
};
function an() {
	let e = $t(rn.create).current;
	return tn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useAnimationFrame.mjs
var on = null;
globalThis.requestAnimationFrame;
var sn = new class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = !1;
	tick = (e) => {
		this.isScheduled = !1;
		let t = this.callbacks, n = this.callbacksCount;
		if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, n > 0) for (let n = 0; n < t.length; n += 1) t[n]?.(e);
	};
	request(e) {
		let t = this.nextId;
		return this.nextId += 1, this.callbacks.push(e), this.callbacksCount += 1, this.isScheduled ||= (requestAnimationFrame(this.tick), !0), t;
	}
	cancel(e) {
		let t = e - this.startId;
		t < 0 || t >= this.callbacks.length || (this.callbacks[t] = null, --this.callbacksCount);
	}
}(), cn = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return sn.request(e);
	}
	static cancel(e) {
		return sn.cancel(e);
	}
	currentId = on;
	request(e) {
		this.cancel(), this.currentId = sn.request(() => {
			this.currentId = on, e();
		});
	}
	cancel = () => {
		this.currentId !== on && (sn.cancel(this.currentId), this.currentId = on);
	};
	disposeEffect = () => this.cancel;
};
function ln() {
	let e = $t(cn.create).current;
	return tn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/empty.mjs
function un() {}
var dn = Object.freeze([]), fn = Object.freeze({}), pn = {}, mn = {}, hn = "";
function gn(e) {
	if (typeof document > "u") return !1;
	let t = Zt(e);
	return pt(t).innerWidth - t.documentElement.clientWidth > 0;
}
function _n(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Zt(e), n = t.documentElement, r = t.body, i = yt(n) ? n : r, a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function vn(e) {
	let t = Zt(e), n = t.documentElement, r = t.body, i = yt(n) ? n : r, a = {
		overflowY: i.style.overflowY,
		overflowX: i.style.overflowX
	};
	return Object.assign(i.style, {
		overflowY: "hidden",
		overflowX: "hidden"
	}), () => {
		Object.assign(i.style, a);
	};
}
function yn(e) {
	let t = Zt(e), n = t.documentElement, r = t.body, i = pt(n), a = 0, o = 0, s = !1, c = cn.create();
	if (Jt && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, pn = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, hn = n.style.scrollBehavior, mn = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = yt(n) ? n : r;
		if (s = _n(e), s) {
			n.style.scrollbarGutter = l, v.style.overflowY = "hidden", v.style.overflowX = "hidden";
			return;
		}
		Object.assign(n.style, {
			scrollbarGutter: l,
			overflowY: "hidden",
			overflowX: "hidden"
		}), (u || f) && (n.style.overflowY = "scroll"), (d || p) && (n.style.overflowX = "scroll"), Object.assign(r.style, {
			position: "relative",
			height: g || h ? `calc(100dvh - ${g + h}px)` : "100dvh",
			width: _ || m ? `calc(100vw - ${_ + m}px)` : "100vw",
			boxSizing: "border-box",
			overflow: "hidden",
			scrollBehavior: "unset"
		}), r.scrollTop = a, r.scrollLeft = o, n.setAttribute("data-base-ui-scroll-locked", ""), n.style.scrollBehavior = "unset";
	}
	function u() {
		Object.assign(n.style, pn), Object.assign(r.style, mn), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = hn);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = It(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var bn = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = rn.create();
	timeoutUnlock = rn.create();
	acquire(e) {
		return this.lockCount += 1, this.lockCount === 1 && this.restore === null && this.timeoutLock.start(0, () => this.lock(e)), this.release;
	}
	release = () => {
		--this.lockCount, this.lockCount === 0 && this.restore && this.timeoutUnlock.start(0, this.unlock);
	};
	unlock = () => {
		this.lockCount === 0 && this.restore && (this.restore?.(), this.restore = null);
	};
	lock(e) {
		if (this.lockCount === 0 || this.restore !== null) return;
		let t = Zt(e).documentElement, n = pt(t).getComputedStyle(t).overflowY;
		if (n === "hidden" || n === "clip") {
			this.restore = un;
			return;
		}
		let r = Ut || !gn(e);
		this.restore = r ? vn(e) : yn(e);
	}
}();
function xn(e = !0, t = null) {
	X(() => {
		if (e) return bn.acquire(t);
	}, [e, t]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function Sn(e) {
	e.preventDefault(), e.stopPropagation();
}
function Cn(e) {
	return "nativeEvent" in e;
}
function wn(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Gt && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Tn(e) {
	return Xt ? !1 : !Gt && e.width === 0 && e.height === 0 || Gt && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function En(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function Dn(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var On = "data-base-ui-focusable", kn = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", An = "ArrowLeft", jn = "ArrowRight", Mn = "ArrowUp", Nn = "ArrowDown";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/shadowDom.mjs
function Pn(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function Fn(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && vt(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function In(e) {
	return "composedPath" in e ? e.composedPath()[0] : e.target;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function Ln(e, t) {
	if (!gt(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute("data-trigger-disabled");
	for (let [, e] of t.entries()) if (Fn(e, n)) return !e.hasAttribute("data-trigger-disabled");
	return !1;
}
function Rn(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function zn(e) {
	return e.matches("html,body");
}
function Bn(e) {
	return _t(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function Vn(e) {
	return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${kn}`) != null;
}
function Hn(e) {
	return e ? e.getAttribute("role") === "combobox" && Bn(e) : !1;
}
function Un(e) {
	if (!e || Xt) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function Wn(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Gn(e, t) {
	return t != null && !En(t) ? 0 : typeof e == "function" ? e() : e;
}
function Kn(e, t, n) {
	let r = Gn(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function qn(e) {
	return typeof e == "function" ? e() : e;
}
function Jn(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Yn(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/reason-parts.mjs
var Xn = "none", Zn = "trigger-press", Qn = "trigger-hover", $n = "trigger-focus", er = "outside-press", tr = "item-press", nr = "close-press", rr = "input-change", ir = "focus-out", ar = "escape-key", or = "list-navigation", sr = "keyboard", cr = "cancel-open", lr = "sibling-open", ur = "disabled", dr = "missing", fr = "initial", pr = "imperative-action", mr = "window-resize";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function hr(e, t, n, r) {
	let i = !1, a = !1, o = r ?? fn;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		cancel() {
			i = !0;
		},
		allowPropagation() {
			a = !0;
		},
		get isCanceled() {
			return i;
		},
		get isPropagationAllowed() {
			return a;
		},
		trigger: n,
		...o
	};
}
function gr(e, t, n) {
	let r = n ?? fn;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeCleanups.mjs
function _r(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useMergedRefs.mjs
function vr(e, t, n, r) {
	let i = $t(br).current;
	return xr(i, e, t, n, r) && Cr(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function yr(e) {
	let t = $t(br).current;
	return Sr(t, e) && Cr(t, e), t.callback;
}
function br() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function xr(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function Sr(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function Cr(e, t) {
	if (e.refs = t, t.every((e) => e == null)) {
		e.callback = null;
		return;
	}
	e.callback = (n) => {
		if (e.cleanup &&= (e.cleanup(), null), n != null) {
			let r = Array(t.length).fill(null);
			for (let e = 0; e < t.length; e += 1) {
				let i = t[e];
				if (i != null) switch (typeof i) {
					case "function": {
						let t = i(n);
						typeof t == "function" && (r[e] = t);
						break;
					}
					case "object": i.current = n;
				}
			}
			e.cleanup = () => {
				for (let e = 0; e < t.length; e += 1) {
					let n = t[e];
					if (n != null) switch (typeof n) {
						case "function": {
							let t = r[e];
							typeof t == "function" ? t() : n(null);
							break;
						}
						case "object": n.current = null;
					}
				}
			};
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useValueAsRef.mjs
function wr(e) {
	let t = $t(Tr, e).current;
	return t.next = e, X(t.effect), t;
}
function Tr(e) {
	let t = {
		current: e,
		next: e,
		effect: () => {
			t.current = t.next;
		}
	};
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/safeReact.mjs
var Er = { ...C }, Dr = Er.useInsertionEffect, Or = Dr && Dr !== Er.useLayoutEffect ? Dr : (e) => e();
function Z(e) {
	let t = $t(kr).current;
	return t.next = e, Or(t.effect), t.trampoline;
}
function kr() {
	let e = {
		next: void 0,
		callback: Ar,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function Ar() {}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/visuallyHidden.mjs
var jr = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, Mr = {
	...jr,
	position: "fixed",
	top: 0,
	left: 0
}, Nr = {
	...jr,
	position: "absolute"
}, Pr = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let [n, r] = C.useState();
	X(() => {
		Yt && Jt && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, Y.jsx)("span", {
		...e,
		ref: t,
		style: Mr,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), Fr = [
	"top",
	"right",
	"bottom",
	"left"
], Ir = Math.min, Lr = Math.max, Rr = Math.round, zr = Math.floor, Br = (e) => ({
	x: e,
	y: e
}), Vr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Hr(e, t, n) {
	return Lr(e, Ir(t, n));
}
function Ur(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Wr(e) {
	return e.split("-")[0];
}
function Gr(e) {
	return e.split("-")[1];
}
function Kr(e) {
	return e === "x" ? "y" : "x";
}
function qr(e) {
	return e === "y" ? "height" : "width";
}
function Jr(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Yr(e) {
	return Kr(Jr(e));
}
function Xr(e, t, n) {
	n === void 0 && (n = !1);
	let r = Gr(e), i = Yr(e), a = qr(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ai(o)), [o, ai(o)];
}
function Zr(e) {
	let t = ai(e);
	return [
		Qr(e),
		t,
		Qr(t)
	];
}
function Qr(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var $r = ["left", "right"], ei = ["right", "left"], ti = ["top", "bottom"], ni = ["bottom", "top"];
function ri(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? ei : $r : t ? $r : ei;
		case "left":
		case "right": return t ? ti : ni;
		default: return [];
	}
}
function ii(e, t, n, r) {
	let i = Gr(e), a = ri(Wr(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Qr)))), a;
}
function ai(e) {
	let t = Wr(e);
	return Vr[t] + e.slice(t.length);
}
function oi(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function si(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : oi(e);
}
function ci(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function li(e, t) {
	return t < 0 || t >= e.length;
}
function ui(e, t) {
	return fi(e.current, { disabledIndices: t });
}
function di(e, t) {
	return fi(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function fi(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && pi(e, a, r));
	return a;
}
function pi(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !hi(r) || !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function mi(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function hi(e, t = e ? At(e) : null) {
	return !e || !e.isConnected || !t || mi(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var gi = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function _i(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return vt(n) ? n.host : null;
}
function vi(e) {
	for (let t of Array.from(e.children)) if (ft(t) === "summary") return t;
	return null;
}
function yi(e, t) {
	let n = vi(t);
	return !!n && (e === n || Fn(n, e));
}
function bi(e) {
	let t = e ? ft(e) : "";
	return e != null && e.matches(gi) && (t !== "summary" || e.parentElement != null && ft(e.parentElement) === "details" && vi(e.parentElement) === e) && (t !== "details" || vi(e) == null) && (t !== "input" || e.type !== "hidden");
}
function xi(e) {
	if (!bi(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = _i(t)) {
		let n = t !== e, r = ft(t) === "slot";
		if (t.hasAttribute("inert") || n && ft(t) === "details" && !t.open && !yi(e, t) || t.hasAttribute("hidden") || !r && !Si(t, n)) return !1;
	}
	return !0;
}
function Si(e, t) {
	let n = At(e);
	return t ? n.display !== "none" : hi(e, n);
}
function Ci(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = ft(e);
		if (t === "details" || t === "audio" || t === "video" || _t(e) && e.isContentEditable) return 0;
	}
	return t;
}
function wi(e) {
	if (ft(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function Ti(e, t) {
	let n = wi(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = wi(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = wi(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function Ei(e) {
	if (_t(e) && ft(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return _t(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function Di(e, t) {
	Ei(e).forEach((e) => {
		bi(e) && t.push(e), Di(e, t);
	});
}
function Oi(e, t, n) {
	Ei(e).forEach((e) => {
		_t(e) && e.matches(t) && n.push(e), Oi(e, t, n);
	});
}
function ki(e) {
	return xi(e) && Ci(e) >= 0;
}
function Ai(e) {
	let t = [];
	return Di(e, t), t.filter(xi);
}
function ji(e) {
	let t = Ai(e);
	return t.filter((e) => Ci(e) >= 0 && Ti(e, t));
}
function Mi(e, t) {
	let n = ji(e), r = n.length;
	if (r === 0) return;
	let i = Pn(Zt(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function Ni(e) {
	return Mi(Zt(e).body, 1) || e;
}
function Pi(e) {
	return Mi(Zt(e).body, -1) || e;
}
function Fi(e, t) {
	if (!e) return null;
	let n = ji(Zt(e).body), r = n.length;
	if (r === 0) return null;
	let i = n.indexOf(e);
	return i === -1 ? null : n[(i + t + r) % r];
}
function Ii(e) {
	return Fi(e, 1);
}
function Li(e) {
	return Fi(e, -1);
}
function Ri(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !Fn(n, r);
}
function zi(e) {
	ji(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function Bi(e) {
	let t = [];
	Oi(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Vi(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Vi(e, t.id, n)]);
}
function Hi(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Ui(e) {
	return `data-base-ui-${e}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var Wi = 0;
function Gi(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(Wi);
	function a() {
		i && !i() || e?.focus({ preventScroll: n });
	}
	if (r) return a(), un;
	let o = requestAnimationFrame(a);
	return Wi = o, () => {
		Wi === o && (cancelAnimationFrame(o), Wi = 0);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var Ki = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap()
}, qi = "data-base-ui-inert", Ji = {
	inert: /* @__PURE__ */ new WeakSet(),
	"aria-hidden": /* @__PURE__ */ new WeakSet()
}, Yi = /* @__PURE__ */ new WeakMap(), Xi = 0;
function Zi(e) {
	return Ji[e];
}
function Qi(e) {
	return e ? vt(e) ? e.host : Qi(e.parentNode) : null;
}
var $i = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Qi(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), ea = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, ta = (e, t, n) => {
	let r = [], i = (e) => {
		!e || n.has(e) || Array.from(e.children).forEach((e) => {
			ft(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function na(e, t, n, r, { mark: i = !0 }) {
	let a = null;
	r ? a = "inert" : n && (a = "aria-hidden");
	let o = null, s = null, c = $i(t, e), l = i ? ta(t, ea(c), new Set(c)) : [], u = [], d = [];
	if (a) {
		let e = Ki[a], n = Zi(a);
		s = n, o = e;
		let r = $i(t, Array.from(t.querySelectorAll("[aria-live]"))), i = c.concat(r);
		ta(t, ea(i), new Set(i)).forEach((t) => {
			let r = t.getAttribute(a), i = r !== null && r !== "false", o = (e.get(t) || 0) + 1;
			e.set(t, o), u.push(t), o === 1 && i && n.add(t), i || t.setAttribute(a, a === "inert" ? "" : "true");
		});
	}
	return i && l.forEach((e) => {
		let t = (Yi.get(e) || 0) + 1;
		Yi.set(e, t), d.push(e), t === 1 && e.setAttribute(qi, "");
	}), Xi += 1, () => {
		o && u.forEach((e) => {
			let t = (o.get(e) || 0) - 1;
			o.set(e, t), t || (!s?.has(e) && a && e.removeAttribute(a), s?.delete(e));
		}), i && d.forEach((e) => {
			let t = (Yi.get(e) || 0) - 1;
			Yi.set(e, t), t || e.removeAttribute(qi);
		}), --Xi, Xi || (Ki.inert = /* @__PURE__ */ new WeakMap(), Ki["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Ji.inert = /* @__PURE__ */ new WeakSet(), Ji["aria-hidden"] = /* @__PURE__ */ new WeakSet(), Yi = /* @__PURE__ */ new WeakMap());
	};
}
function ra(e, t = {}) {
	let { ariaHidden: n = !1, inert: r = !1, mark: i = !0 } = t, a = Zt(e[0]).body;
	return na(e, a, n, r, { mark: i });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useId.mjs
var ia = 0;
function aa(e, t = "mui") {
	let [n, r] = C.useState(e), i = e || n;
	return C.useEffect(() => {
		n ?? (ia += 1, r(`${t}-${ia}`));
	}, [n, t]), i;
}
var oa = Er.useId;
function sa(e, t) {
	if (oa !== void 0) {
		let n = oa();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return aa(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/formatErrorMessage.mjs
function ca(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var la = ca("https://base-ui.com/production-error", "Base UI"), ua = 19;
function da(e) {
	return ua >= e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getReactElementRef.mjs
function fa(e) {
	if (!/*#__PURE__*/ C.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (da(19) ? n?.ref : t.ref) ?? null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeObjects.mjs
function pa(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function ma(e, t) {
	let n = {};
	for (let r in e) {
		let i = e[r];
		if (t?.hasOwnProperty(r)) {
			let e = t[r](i);
			e != null && Object.assign(n, e);
			continue;
		}
		i === !0 ? n[`data-${r.toLowerCase()}`] = "" : i && (n[`data-${r.toLowerCase()}`] = i.toString());
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveClassName.mjs
function ha(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveStyle.mjs
function ga(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/merge-props/mergeProps.mjs
var _a = {};
function va(e, t, n, r, i) {
	if (!n && !r && !i && !e) return ba(t);
	let a = ba(e);
	return t && (a = xa(a, t)), n && (a = xa(a, n)), r && (a = xa(a, r)), i && (a = xa(a, i)), a;
}
function ya(e) {
	if (e.length === 0) return _a;
	if (e.length === 1) return ba(e[0]);
	let t = ba(e[0]);
	for (let n = 1; n < e.length; n += 1) t = xa(t, e[n]);
	return t;
}
function ba(e) {
	return Ta(e) ? { ...Ea(e, _a) } : Sa(e);
}
function xa(e, t) {
	return Ta(t) ? Ea(t, e) : Ca(e, t);
}
function Sa(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		wa(e, n) && (t[e] = Oa(n));
	}
	return t;
}
function Ca(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = pa(e.style, r);
				break;
			case "className":
				e[n] = Aa(e.className, r);
				break;
			default: e[n] = wa(n, r) ? Da(e[n], r) : r;
		}
	}
	return e;
}
function wa(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function Ta(e) {
	return typeof e == "function";
}
function Ea(e, t) {
	return Ta(e) ? e(t) : e ?? _a;
}
function Da(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (ja(r)) {
			let i = r;
			ka(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : Oa(t) : e;
}
function Oa(e) {
	return e && ((...t) => {
		let n = t[0];
		return ja(n) && ka(n), e(...t);
	});
}
function ka(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Aa(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function ja(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useRenderElement.mjs
function Q(e, t, n = {}) {
	let r = t.render, i = Ma(t, n);
	return n.enabled === !1 ? null : Fa(e, r, i, n.state ?? fn);
}
function Ma(e, t = {}) {
	let { className: n, style: r, render: i } = e, { state: a = fn, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? ha(n, a) : void 0, d = l ? ga(r, a) : void 0, f = l ? ma(a, c) : fn, p = l && s ? Na(s) : void 0, m = l ? pa(f, p) ?? {} : fn;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? yr([
		m.ref,
		fa(i),
		...o
	]) : vr(m.ref, fa(i), o) : vr(null, null)), l ? (u !== void 0 && (m.className = Aa(m.className, u)), d !== void 0 && (m.style = pa(m.style, d)), m) : fn;
}
function Na(e) {
	return Array.isArray(e) ? ya(e) : va(void 0, e);
}
var Pa = Symbol.for("react.lazy");
function Fa(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = va(n, t.props);
		e.ref = n.ref;
		let i = t;
		return i?.$$typeof === Pa && (i = C.Children.toArray(t)[0]), /*#__PURE__*/ C.cloneElement(i, e);
	}
	if (e && typeof e == "string") return Ia(e, n);
	throw Error(la(8));
}
function Ia(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, C.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, C.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ C.createElement(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/constants.mjs
var La = { style: { transition: "none" } }, Ra = "data-base-ui-click-trigger", za = { fallbackAxisSide: "none" }, Ba = { fallbackAxisSide: "end" }, Va = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, Ha = /* @__PURE__ */ l(h(), 1), Ua = /*#__PURE__*/ C.createContext(null), Wa = () => C.useContext(Ua), Ga = Ui("portal");
function Ka(e = {}) {
	let { ref: t, container: n, componentProps: r = fn, elementProps: i } = e, a = sa(), o = Wa()?.portalNode, [s, c] = C.useState(null), [l, u] = C.useState(null), d = Z((e) => {
		e !== null && u(e);
	}), f = C.useRef(null);
	X(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		if (a == null) return;
		let e = (n && (ht(n) ? n : n.current)) ?? o ?? document.body;
		if (e == null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		f.current !== e && (f.current = e, u(null), c(e));
	}, [
		n,
		o,
		a
	]);
	let p = Q("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[Ga]: ""
		}, i]
	});
	return {
		portalNode: l,
		portalSubtree: s && p ? /*#__PURE__*/ Ha.createPortal(p, s) : null
	};
}
var qa = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, renderGuards: s, ...c } = e, { portalNode: l, portalSubtree: u } = Ka({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), d = C.useRef(null), f = C.useRef(null), p = C.useRef(null), m = C.useRef(null), [h, g] = C.useState(null), _ = C.useRef(!1), v = h?.modal, y = h?.open, b = typeof s == "boolean" ? s : !!h && !h.modal && h.open && !!l;
	C.useEffect(() => {
		if (!l || v) return;
		function e(e) {
			l && e.relatedTarget && Ri(e) && (e.type === "focusin" ? _.current &&= (Bi(l), !1) : (zi(l), _.current = !0));
		}
		return _r(It(l, "focusin", e, !0), It(l, "focusout", e, !0));
	}, [l, v]), X(() => {
		!l || y !== !0 || !_.current || (Bi(l), _.current = !1);
	}, [y, l]);
	let x = C.useMemo(() => ({
		beforeOutsideRef: d,
		afterOutsideRef: f,
		beforeInsideRef: p,
		afterInsideRef: m,
		portalNode: l,
		setFocusManagerState: g
	}), [l]);
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [u, /*#__PURE__*/ (0, Y.jsxs)(Ua.Provider, {
		value: x,
		children: [
			b && l && /*#__PURE__*/ (0, Y.jsx)(Pr, {
				"data-type": "outside",
				ref: d,
				onFocus: (e) => {
					Ri(e, l) ? p.current?.focus() : Pi(h ? h.domReference : null)?.focus();
				}
			}),
			b && l && /*#__PURE__*/ (0, Y.jsx)("span", {
				"aria-owns": l.id,
				style: Va
			}),
			l && /*#__PURE__*/ Ha.createPortal(a, l),
			b && l && /*#__PURE__*/ (0, Y.jsx)(Pr, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					Ri(e, l) ? m.current?.focus() : (Ni(h ? h.domReference : null)?.focus(), h?.closeOnFocusOut && h?.onOpenChange(!1, hr("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function Ja() {
	let e = /* @__PURE__ */ new Map();
	return {
		emit(t, n) {
			e.get(t)?.forEach((e) => e(n));
		},
		on(t, n) {
			e.has(t) || e.set(t, /* @__PURE__ */ new Set()), e.get(t).add(n);
		},
		off(t, n) {
			e.get(t)?.delete(n);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingTreeStore.mjs
var Ya = class {
	nodesRef = { current: [] };
	events = Ja();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, Xa = /*#__PURE__*/ C.createContext(null), Za = /*#__PURE__*/ C.createContext(null), Qa = () => C.useContext(Xa)?.id || null, $a = (e) => {
	let t = C.useContext(Za);
	return e ?? t;
};
function eo(e) {
	let t = sa(), n = $a(e), r = Qa();
	return X(() => {
		if (!t) return;
		let e = {
			id: t,
			parentId: r
		};
		return n?.addNode(e), () => {
			n?.removeNode(e);
		};
	}, [
		n,
		t,
		r
	]), t;
}
function to(e) {
	let { children: t, id: n } = e, r = Qa();
	return /*#__PURE__*/ (0, Y.jsx)(Xa.Provider, {
		value: C.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function no(e) {
	let { children: t, externalTree: n } = e, r = $t(() => n ?? new Ya()).current;
	return /*#__PURE__*/ (0, Y.jsx)(Za.Provider, {
		value: r,
		children: t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveRef.mjs
function ro(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function io(e, t) {
	let n = pt(In(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var ao = 20, oo = [];
function so() {
	oo = oo.filter((e) => e.deref()?.isConnected);
}
function co(e) {
	so(), e && ft(e) !== "body" && (oo.push(new WeakRef(e)), oo.length > ao && (oo = oo.slice(-20)));
}
function lo() {
	return so(), oo[oo.length - 1]?.deref();
}
function uo(e) {
	return e ? ki(e) ? e : ji(e)[0] || e : null;
}
function fo(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = Ai(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return ki(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function po(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, restoreFocus: o = !1, modal: s = !0, closeOnFocusOut: c = !0, openInteractionType: l = "", nextFocusableElement: u, previousFocusableElement: d, beforeContentFocusGuardRef: f, externalTree: p, getInsideElements: m } = e, h = "rootStore" in t ? t.rootStore : t, g = h.useState("open"), _ = h.useState("domReferenceElement"), v = h.useState("floatingElement"), { events: y, dataRef: b } = h.context, x = Z(() => b.current.floatingContext?.nodeId), S = i === !1, w = Hn(_) && S, T = wr(i), E = wr(a), D = wr(l), O = wr(g), k = $a(p), A = Wa(), j = C.useRef(!1), M = C.useRef(!1), N = C.useRef(!1), P = C.useRef(null), F = C.useRef(""), I = C.useRef(""), L = C.useRef(null), R = C.useRef(null), z = vr(L, f, A?.beforeInsideRef), B = vr(R, A?.afterInsideRef), V = an(), H = an(), U = ln(), W = A != null, G = Wn(v), ee = Z((e = G) => e ? ji(e) : []), te = Z(() => m?.().filter((e) => e != null) ?? []);
	C.useEffect(() => {
		if (r || !s) return;
		function e(e) {
			e.key === "Tab" && Fn(G, Pn(Zt(G))) && ee().length === 0 && !w && Sn(e);
		}
		return It(Zt(G), "keydown", e);
	}, [
		r,
		G,
		s,
		w,
		ee
	]), C.useEffect(() => {
		if (r || !g) return;
		let e = Zt(G);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = In(e), n = te(), r = Fn(v, t) || Fn(_, t) || Fn(A?.portalNode, t) || n.some((e) => e === t || Fn(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", t?.closest("[data-base-ui-click-trigger]") && (M.current = !0, H.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return _r(It(e, "pointerdown", n, !0), It(e, "pointerup", t, !0), It(e, "pointercancel", t, !0), It(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		G,
		g,
		A,
		H,
		te
	]), C.useEffect(() => {
		if (r || !c) return;
		let e = Zt(G);
		function t() {
			M.current = !0, H.start(0, () => {
				M.current = !1;
			});
		}
		function n(e) {
			let t = In(e);
			ki(t) && (P.current = t);
		}
		function i(t) {
			let n = t.relatedTarget, r = t.currentTarget, i = In(t);
			s && n == null && i != null && Fn(v, i) && co(i), queueMicrotask(() => {
				let a = x(), c = h.context.triggerElements, l = te(), f = n?.hasAttribute(Ui("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					ro(d),
					ro(u)
				].includes(n), p = !(Fn(_, n) || Fn(v, n) || Fn(n, v) || Fn(A?.portalNode, n) || l.some((e) => e === n || Fn(e, n)) || n != null && c.hasElement(n) || c.hasMatchingElement((e) => Fn(e, n)) || f || k && (Vi(k.nodesRef.current, a).find((e) => Fn(e.context?.elements.floating, n) || Fn(e.context?.elements.domReference, n)) || Hi(k.nodesRef.current, a).find((e) => [e.context?.elements.floating, Wn(e.context?.elements.floating)].includes(n) || e.context?.elements.domReference === n)));
				if (r === _ && G && fo(G), o && r !== _ && !hi(i) && Pn(e) === e.body) {
					if (_t(G) && (G.focus(), o === "popup")) {
						U.request(() => {
							G.focus();
						});
						return;
					}
					let e = ee(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || G;
					_t(n) && n.focus();
				}
				if (b.current.insideReactTree) {
					b.current.insideReactTree = !1;
					return;
				}
				(w || !s) && n && p && !M.current && (w || n !== lo()) && (j.current = !0, h.setOpen(!1, hr(ir, t)));
			});
		}
		function a() {
			N.current || (b.current.insideReactTree = !0, V.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let l = _t(_) ? _ : null;
		if (!(!v && !l)) return _r(l && It(l, "focusout", i), l && It(l, "pointerdown", t), v && It(v, "focusin", n), v && It(v, "focusout", i), v && A && It(v, "focusout", a, !0));
	}, [
		r,
		_,
		v,
		G,
		s,
		k,
		A,
		h,
		c,
		o,
		ee,
		w,
		x,
		b,
		V,
		H,
		U,
		u,
		d,
		te
	]), C.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Ui("portal")}]`) || []), t = (k ? Hi(k.nodesRef.current, x()) : []).find((e) => Hn(e.context?.elements.domReference || null))?.context?.elements.domReference, n = ra([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...te(),
			t,
			ro(d),
			ro(u),
			w ? _ : null
		].filter((e) => e != null), {
			ariaHidden: s || w,
			mark: !1
		}), i = ra([v, ...e].filter((e) => e != null));
		return () => {
			i(), n();
		};
	}, [
		g,
		r,
		_,
		v,
		s,
		A,
		w,
		k,
		x,
		u,
		d,
		te
	]), X(() => {
		if (!g || r || !_t(G)) return;
		let e = Zt(G), t = Pn(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || Fn(G, t)) return;
			let i = null, a = () => (i ??= ee(G), i[0] || G), o;
			o = r === !0 || r === null ? a() : ro(r), o ||= a();
			let s = Fn(G, Pn(e));
			Gi(o, {
				preventScroll: o === G,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = Pn(e);
					return !(t !== o && Fn(G, t));
				}
			});
		});
	}, [
		r,
		g,
		G,
		ee,
		T,
		D,
		O
	]), X(() => {
		if (r || !G) return;
		let e = Zt(G), t = Pn(e), n = D.current == null;
		co(t);
		function i(e) {
			if (e.open || (F.current = io(e.nativeEvent, I.current)), e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave" && (j.current = !0), e.reason === "outside-press") if (e.nested) j.current = !1;
			else if (wn(e.nativeEvent) || Tn(e.nativeEvent)) j.current = !1;
			else {
				let e = !1;
				Zt(G).createElement("div").focus({ get preventScroll() {
					return e = !0, !1;
				} }), e ? j.current = !1 : j.current = !0;
			}
		}
		y.on("openchange", i);
		function a() {
			let e = E.current, r = typeof e == "function" ? e(F.current) : e;
			if (r === void 0 || r === !1) return null;
			r === null && (r = !0);
			let i = _?.isConnected ? _ : null, a = t?.isConnected && ft(t) !== "body" ? t : null, o = n ? a || i : i || a;
			return o ||= lo() || null, typeof r == "boolean" ? o : ro(r) || o || null;
		}
		return () => {
			y.off("openchange", i);
			let t = Pn(e), n = te(), r = Fn(v, t) || n.some((e) => e === t || Fn(e, t)) || k && Vi(k.nodesRef.current, x(), !1).some((e) => Fn(e.context?.elements.floating, t)), o = E.current, s = a();
			queueMicrotask(() => {
				let n = uo(s), i = typeof o != "boolean";
				o && !j.current && _t(n) && (!(!i && n !== t && t !== e.body) || r) && n.focus({ preventScroll: !0 }), j.current = !1;
			});
		};
	}, [
		r,
		v,
		G,
		E,
		D,
		y,
		k,
		_,
		x,
		te
	]), X(() => {
		if (!Jt || g || !v) return;
		let e = Pn(Zt(v));
		!_t(e) || !Bn(e) || Fn(v, e) && e.blur();
	}, [g, v]), X(() => {
		if (!(r || !A)) return A.setFocusManagerState({
			modal: s,
			closeOnFocusOut: c,
			open: g,
			onOpenChange: h.setOpen,
			domReference: _
		}), () => {
			A.setFocusManagerState(null);
		};
	}, [
		r,
		A,
		s,
		g,
		h,
		c,
		_
	]), X(() => {
		if (!(r || !G)) return fo(G), () => {
			queueMicrotask(so);
		};
	}, [r, G]);
	let ne = !r && (!s || !w) && (W || s);
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
		ne && /*#__PURE__*/ (0, Y.jsx)(Pr, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				if (s) {
					let e = ee();
					Gi(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, Ri(e, A.portalNode) ? Ni(_)?.focus() : ro(d ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		ne && /*#__PURE__*/ (0, Y.jsx)(Pr, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				s ? Gi(ee()[0]) : A?.portalNode && (c && (j.current = !0), Ri(e, A.portalNode) ? Pi(_)?.focus() : ro(u ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function mo(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = Zn } = t, l = "rootStore" in e ? e.rootStore : e, u = l.context.dataRef, d = C.useRef(void 0), f = ln(), p = an(), m = C.useMemo(() => {
		function e(e, t, n, r) {
			let i = hr(c, t, n);
			e && r === "touch" && s > 0 ? p.start(s, () => {
				l.setOpen(!0, i);
			}) : l.setOpen(e, i);
		}
		function t(e, t, n) {
			let r = u.current.openEvent, a = l.select("domReferenceElement") !== t;
			return e && a || !e || !i ? !0 : r && o ? !n(r.type) : !1;
		}
		return {
			onPointerDown(e) {
				d.current = e.pointerType;
			},
			onMouseDown(n) {
				let i = d.current, o = n.nativeEvent, s = l.select("open");
				if (n.button !== 0 || r === "click" || En(i, !0) && a) return;
				let c = t(s, n.currentTarget, (e) => e === "click" || e === "mousedown"), u = In(o);
				if (Bn(u)) {
					e(c, o, u, i);
					return;
				}
				let p = n.currentTarget;
				f.request(() => {
					e(c, o, p, i);
				});
			},
			onClick(n) {
				if (r === "mousedown-only") return;
				let i = d.current;
				if (r === "mousedown" && i) {
					d.current = void 0;
					return;
				}
				En(i, !0) && a || e(t(l.select("open"), n.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), n.nativeEvent, n.currentTarget, i);
			},
			onKeyDown() {
				d.current = void 0;
			}
		};
	}, [
		u,
		r,
		a,
		c,
		l,
		o,
		i,
		f,
		p,
		s
	]);
	return C.useMemo(() => n ? { reference: m } : fn, [n, m]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function ho() {
	return !1;
}
function go(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function _o(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = ho, bubbles: s, externalTree: c } = t, l = "rootStore" in e ? e.rootStore : e, u = l.useState("open"), d = l.useState("floatingElement"), { dataRef: f } = l.context, p = $a(c), m = Z(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = Z(() => a), { escapeKey: v, outsidePress: y } = go(s), b = C.useRef(!1), x = C.useRef(!1), S = C.useRef(!1), w = C.useRef(!1), T = C.useRef(""), E = C.useRef(null), D = an(), O = an(), k = Z(() => {
		O.clear(), f.current.insideReactTree = !1;
	}), A = Z((e) => {
		let t = f.current.floatingContext?.nodeId;
		return (p ? Vi(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), j = Z((e) => Rn(e, l.select("floatingElement")) || Rn(e, l.select("domReferenceElement"))), M = Z((e) => {
		o() && l.setOpen(!1, hr(Zn, e.nativeEvent));
	}), N = Z((e) => {
		if (!u || !n || !r || e.key !== "Escape" || w.current || !v && A("__escapeKeyBubbles")) return;
		let t = hr(ar, Cn(e) ? e.nativeEvent : e);
		l.setOpen(!1, t), t.isCanceled || e.preventDefault(), !v && !t.isPropagationAllowed && e.stopPropagation();
	}), P = Z(() => {
		f.current.insideReactTree = !0, O.start(0, k);
	}), F = Z((e) => {
		if (!u || !n || e.button !== 0) return;
		let t = In(e.nativeEvent);
		Fn(l.select("floatingElement"), t) && (b.current || (b.current = !0, x.current = !1));
	}), I = Z((e) => {
		!u || !n || (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	C.useEffect(() => {
		if (!u || !n) return;
		f.current.__escapeKeyBubbles = v, f.current.__outsidePressBubbles = y;
		let e = new rn(), t = new rn();
		function i() {
			e.clear(), w.current = !0;
		}
		function a() {
			e.start(Jt ? 5 : 0, () => {
				w.current = !1;
			});
		}
		function o() {
			S.current = !0, t.start(0, () => {
				S.current = !1;
			});
		}
		function s() {
			b.current = !1, x.current = !1;
		}
		function c() {
			let e = T.current, t = e === "pen" || !e ? "mouse" : e, n = _(), r = typeof n == "function" ? n() : n;
			return typeof r == "string" ? r : r[t];
		}
		function m(e) {
			let t = c();
			return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
		}
		function C(e) {
			let t = f.current.floatingContext?.nodeId, n = p && Vi(p.nodesRef.current, t).some((t) => Rn(e, t.context?.elements.floating));
			return j(e) || n;
		}
		function O(e) {
			if (m(e)) {
				e.type !== "click" && !j(e) && (t.clear(), S.current = !1), k();
				return;
			}
			if (f.current.insideReactTree) {
				k();
				return;
			}
			let n = In(e), r = `[${Ui("inert")}]`, i = gt(n) ? n.getRootNode() : null, a = Array.from((vt(i) ? i : Zt(l.select("floatingElement"))).querySelectorAll(r)), o = l.context.triggerElements;
			if (n && (o.hasElement(n) || o.hasMatchingElement((e) => Fn(e, n)))) return;
			let s = gt(n) ? n : null;
			for (; s && !kt(s);) {
				let e = Mt(s);
				if (kt(e) || !gt(e)) break;
				s = e;
			}
			if (!(a.length && gt(n) && !zn(n) && !Fn(n, l.select("floatingElement")) && a.every((e) => !Fn(s, e)))) {
				if (_t(n) && !("touches" in e)) {
					let t = kt(n), r = At(n), i = /auto|scroll/, a = t || i.test(r.overflowX), o = t || i.test(r.overflowY), s = a && n.clientWidth > 0 && n.scrollWidth > n.clientWidth, c = o && n.clientHeight > 0 && n.scrollHeight > n.clientHeight, l = r.direction === "rtl", u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth), d = s && e.offsetY > n.clientHeight;
					if (u || d) return;
				}
				if (!C(e)) {
					if (c() === "intentional" && S.current) {
						t.clear(), S.current = !1;
						return;
					}
					typeof h == "function" && !h(e) || A("__outsidePressBubbles") || (l.setOpen(!1, hr(er, e)), k());
				}
			}
		}
		function M(e) {
			c() !== "sloppy" || e.pointerType === "touch" || !l.select("open") || !n || j(e) || O(e);
		}
		function P(e) {
			if (c() !== "sloppy" || !l.select("open") || !n || j(e)) return;
			let t = e.touches[0];
			t && (E.current = {
				startTime: Date.now(),
				startX: t.clientX,
				startY: t.clientY,
				dismissOnTouchEnd: !1,
				dismissOnMouseDown: !0
			}, D.start(1e3, () => {
				E.current && (E.current.dismissOnTouchEnd = !1, E.current.dismissOnMouseDown = !1);
			}));
		}
		function F(e, t) {
			let n = In(e);
			if (!n) return;
			let r = It(n, e.type, () => {
				t(e), r();
			});
		}
		function I(e) {
			T.current = "touch", F(e, P);
		}
		function L(e) {
			D.clear(), e.type === "pointerdown" && (T.current = e.pointerType), !(e.type === "mousedown" && E.current && !E.current.dismissOnMouseDown) && F(e, (e) => {
				e.type === "pointerdown" ? M(e) : O(e);
			});
		}
		function R(e) {
			if (!b.current) return;
			let n = x.current;
			if (s(), c() === "intentional") {
				if (e.type === "pointercancel") {
					n && o();
					return;
				}
				if (!C(e)) {
					if (n) {
						o();
						return;
					}
					typeof h == "function" && !h(e) || (t.clear(), S.current = !0, k());
				}
			}
		}
		function z(e) {
			if (c() !== "sloppy" || !E.current || j(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - E.current.startX), r = Math.abs(t.clientY - E.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (E.current.dismissOnTouchEnd = !0), i > 10 && (O(e), D.clear(), E.current = null);
		}
		function B(e) {
			F(e, z);
		}
		function V(e) {
			c() !== "sloppy" || !E.current || j(e) || (E.current.dismissOnTouchEnd && O(e), D.clear(), E.current = null);
		}
		function H(e) {
			F(e, V);
		}
		let U = Zt(d), W = _r(r && _r(It(U, "keydown", N), It(U, "compositionstart", i), It(U, "compositionend", a)), g && _r(It(U, "click", L, !0), It(U, "pointerdown", L, !0), It(U, "pointerup", R, !0), It(U, "pointercancel", R, !0), It(U, "mousedown", L, !0), It(U, "mouseup", R, !0), It(U, "touchstart", I, !0), It(U, "touchmove", B, !0), It(U, "touchend", H, !0)));
		return () => {
			W(), e.clear(), t.clear(), s(), S.current = !1;
		};
	}, [
		f,
		d,
		r,
		g,
		h,
		u,
		n,
		v,
		y,
		N,
		k,
		_,
		A,
		j,
		p,
		l,
		D
	]), C.useEffect(k, [h, k]);
	let L = C.useMemo(() => ({
		onKeyDown: N,
		onPointerDown: M,
		onClick: M
	}), [N, M]), R = C.useMemo(() => ({
		onKeyDown: N,
		onPointerDown: I,
		onMouseDown: I,
		onClickCapture: P,
		onMouseDownCapture(e) {
			P(), F(e);
		},
		onPointerDownCapture(e) {
			P(), F(e);
		},
		onMouseUpCapture: P,
		onTouchEndCapture: P,
		onTouchMoveCapture: P
	}), [
		N,
		P,
		F,
		I
	]);
	return C.useMemo(() => n ? {
		reference: L,
		floating: R,
		trigger: L
	} : {}, [
		n,
		L,
		R
	]);
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function vo(e, t, n) {
	let { reference: r, floating: i } = e, a = Jr(t), o = Yr(t), s = qr(o), c = Wr(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Gr(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function yo(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ur(t, e), p = si(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = ci(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = ci(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var bo = 50, xo = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: yo
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = vo(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < bo && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = vo(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, So = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ur(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Wr(r), _ = Jr(o), v = Wr(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ai(o)] : Zr(o)), x = p !== "none";
			!d && x && b.push(...ii(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Xr(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Jr(t) || T.every((e) => Jr(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Jr(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Co(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function wo(e) {
	return Fr.some((t) => e[t] >= 0);
}
var To = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Ur(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Co(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: wo(e)
					} };
				}
				case "escaped": {
					let e = Co(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: wo(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Eo = /*#__PURE__*/ new Set(["left", "top"]);
async function Do(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Wr(n), s = Gr(n), c = Jr(n) === "y", l = Eo.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ur(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Oo = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Do(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, ko = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Ur(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Jr(i), p = Kr(f), m = u[p], h = u[f], g = (e, t) => Hr(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Ao = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Ur(e, t), u = {
				x: n,
				y: r
			}, d = Jr(i), f = Kr(d), p = u[f], m = u[d], h = Ur(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Eo.has(Wr(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, jo = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Ur(e, t), c = await i.detectOverflow(t, s), l = Wr(n), u = Gr(n), d = Jr(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Ir(p - c[m], g), y = Ir(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Lr(c.left, c.right) : S = p - 2 * Lr(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Mo(e) {
	let t = At(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = _t(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Rr(n) !== a || Rr(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function No(e) {
	return gt(e) ? e : e.contextElement;
}
function Po(e) {
	let t = No(e);
	if (!_t(t)) return Br(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Mo(t), o = (a ? Rr(n.width) : n.width) / r, s = (a ? Rr(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Fo = /*#__PURE__*/ Br(0);
function Io(e) {
	let t = pt(e);
	return !Ot() || !t.visualViewport ? Fo : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Lo(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === pt(e);
}
function Ro(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = No(e), o = Br(1);
	t && (r ? gt(r) && (o = Po(r)) : o = Po(e));
	let s = Lo(a, n, r) ? Io(a) : Br(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = pt(a), t = gt(r) ? pt(r) : r, n = e, i = Ft(n);
		for (; i && t !== n;) {
			let e = Po(i), t = i.getBoundingClientRect(), r = At(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = pt(i), i = Ft(n);
		}
	}
	return ci({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function zo(e, t) {
	let n = jt(e).scrollLeft;
	return t ? t.left + n : Ro(mt(e)).left + n;
}
function Bo(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - zo(e, n),
		y: n.top + t.scrollTop
	};
}
function Vo(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = mt(r), s = t ? xt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Br(1), u = Br(0), d = _t(r);
	if ((d || !a) && ((ft(r) !== "body" || yt(o)) && (c = jt(r)), d)) {
		let e = Ro(r);
		l = Po(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Bo(o, c) : Br(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Ho(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Uo(e) {
	let t = jt(e), n = e.ownerDocument.body, r = Lr(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Lr(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + zo(e), o = -t.scrollTop;
	return At(n).direction === "rtl" && (a += Lr(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Wo = 25;
function Go(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = pt(e), a = mt(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Ot() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (zo(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Wo && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Ko(e, t) {
	let n = Ro(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Po(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function qo(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Go(e, n, t);
	else if (t === "document") r = Uo(mt(e));
	else if (gt(t)) r = Ko(t, n);
	else {
		let n = Io(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return ci(r);
}
function Jo(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Pt(e, [], !1).filter((e) => gt(e) && ft(e) !== "body"), i = null, a = At(e).position === "fixed", o = a ? Mt(e) : e;
	for (; gt(o) && !kt(o);) {
		let e = At(o), t = Et(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Mt(o);
	}
	return t.set(e, r), r;
}
function Yo(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? xt(t) ? [] : Jo(t, this._c) : [].concat(n), r], o = qo(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = qo(t, a[e], i);
		s = Lr(n.top, s), c = Ir(n.right, c), l = Ir(n.bottom, l), u = Lr(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Xo(e) {
	let { width: t, height: n } = Mo(e);
	return {
		width: t,
		height: n
	};
}
function Zo(e, t, n) {
	let r = _t(t), i = mt(t), a = n === "fixed", o = Ro(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Br(0);
	if ((r || !a) && ((ft(t) !== "body" || yt(i)) && (s = jt(t)), r)) {
		let e = Ro(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = zo(i));
	let l = i && !r && !a ? Bo(i, s) : Br(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Qo(e) {
	return At(e).position === "static";
}
function $o(e, t) {
	if (!_t(e) || At(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return mt(e) === n && (n = n.ownerDocument.body), n;
}
function es(e, t) {
	let n = pt(e);
	if (xt(e)) return n;
	if (!_t(e)) {
		let t = Mt(e);
		for (; t && !kt(t);) {
			if (gt(t) && !Qo(t)) return t;
			t = Mt(t);
		}
		return n;
	}
	let r = $o(e, t);
	for (; r && bt(r) && Qo(r);) r = $o(r, t);
	return r && kt(r) && Qo(r) && !Et(r) ? n : r || Dt(e) || n;
}
var ts = async function(e) {
	let t = this.getOffsetParent || es, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Zo(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ns(e) {
	return At(e).direction === "rtl";
}
var rs = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Vo,
	getDocumentElement: mt,
	getClippingRect: Yo,
	getOffsetParent: es,
	getElementRects: ts,
	getClientRects: Ho,
	getDimensions: Xo,
	getScale: Po,
	isElement: gt,
	isRTL: ns
};
function is(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function as(e, t, n) {
	let r = null, i, a = mt(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = zr(d), h = zr(a.clientWidth - (u + f)), g = zr(a.clientHeight - (d + p)), _ = zr(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Lr(0, Ir(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!is(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = pt(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function os(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = No(e), u = i || a ? [...l ? Pt(l) : [], ...t ? Pt(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? as(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ro(e) : null;
	c && g();
	function g() {
		let t = Ro(e);
		h && !is(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ss = Oo, cs = ko, ls = So, us = jo, ds = To, fs = Ao, ps = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...rs,
		...i.platform,
		_c: r
	};
	return xo(e, t, {
		...i,
		platform: a
	});
}, ms = typeof document < "u" ? C.useLayoutEffect : function() {};
function hs(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!hs(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !hs(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function gs(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function _s(e, t) {
	let n = gs(e);
	return Math.round(t * n) / n;
}
function vs(e) {
	let t = C.useRef(e);
	return ms(() => {
		t.current = e;
	}), t;
}
function ys(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = C.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = C.useState(r);
	hs(f, r) || p(r);
	let [m, h] = C.useState(null), [g, _] = C.useState(null), v = C.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = C.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), b = a || m, x = o || g, S = C.useRef(null), w = C.useRef(null), T = C.useRef(u), E = c != null, D = vs(c), O = vs(i), k = vs(l), A = C.useCallback(() => {
		if (!S.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), ps(S.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			j.current && !hs(T.current, t) && (T.current = t, Ha.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		O,
		k
	]);
	ms(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let j = C.useRef(!1);
	ms(() => (j.current = !0, () => {
		j.current = !1;
	}), []), ms(() => {
		if (b && (S.current = b), x && (w.current = x), b && x) {
			if (D.current) return D.current(b, x, A);
			A();
		}
	}, [
		b,
		x,
		A,
		D,
		E
	]);
	let M = C.useMemo(() => ({
		reference: S,
		floating: w,
		setReference: v,
		setFloating: y
	}), [v, y]), N = C.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), P = C.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = _s(N.floating, u.x), r = _s(N.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...gs(N.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		N.floating,
		u.x,
		u.y
	]);
	return C.useMemo(() => ({
		...u,
		update: A,
		refs: M,
		elements: N,
		floatingStyles: P
	}), [
		u,
		A,
		M,
		N,
		P
	]);
}
var bs = (e, t) => {
	let n = ss(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, xs = (e, t) => {
	let n = cs(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ss = (e, t) => ({
	fn: fs(e).fn,
	options: [e, t]
}), Cs = (e, t) => {
	let n = ls(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ws = (e, t) => {
	let n = us(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ts = (e, t) => {
	let n = ds(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/inlineRect.mjs
function Es(e, t, n, r) {
	return {
		left: e,
		top: t,
		right: n,
		bottom: r,
		x: e,
		y: t,
		width: n - e,
		height: r - t
	};
}
function Ds(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.right,
		bottom: e.bottom,
		width: e.width,
		height: e.height
	};
}
function Os(e) {
	let t = [], n, r = Infinity, i = Infinity, a = -Infinity, o = -Infinity;
	for (let s of Array.from(e).sort((e, t) => e.top - t.top)) {
		if (r = Math.min(r, s.left), i = Math.min(i, s.top), a = Math.max(a, s.right), o = Math.max(o, s.bottom), !n || s.top - n.top > n.height / 2) t.push(Ds(s));
		else {
			let e = t[t.length - 1];
			e.left = Math.min(e.left, s.left), e.right = Math.max(e.right, s.right), e.bottom = Math.max(e.bottom, s.bottom), e.width = e.right - e.left, e.height = e.bottom - e.top;
		}
		n = s;
	}
	return {
		lines: t,
		fallback: Es(r, i, a, o)
	};
}
function ks(e, t, n) {
	return e.findIndex((e) => t > e.left - 2 && t < e.right + 2 && n > e.top - 2 && n < e.bottom + 2);
}
function As(e) {
	return Es(e.left, e.top, e.right, e.bottom);
}
function js(e, t, n) {
	let { lines: r } = Os(e.getClientRects());
	if (r.length < 2) return;
	let i = ks(r, t, n);
	return {
		x: t,
		y: n,
		lineIndex: i === -1 ? void 0 : i,
		element: e
	};
}
function Ms(e, t, n) {
	let { lines: r, fallback: i } = Os(e.getClientRects());
	if (r.length < 2) return null;
	let a = n?.x, o = n?.y, s = t[0];
	if (n?.lineIndex != null && r[n.lineIndex]) return As(r[n.lineIndex]);
	if (a != null && o != null) {
		let e = ks(r, a, o);
		if (e !== -1) return As(r[e]);
	}
	if (r.length === 2 && r[0].left > r[1].right && a != null && o != null) return i;
	if (s === "t" || s === "b") {
		let e = r[0], t = r[r.length - 1], n = s === "t" ? e : t;
		return Es(n.left, e.top, n.right, t.bottom);
	}
	let c = s === "l", l = r[0].left, u = r[0].right, d = c ? Infinity : -Infinity, f = r[0], p = r[0];
	for (let e of r) {
		l = Math.min(l, e.left), u = Math.max(u, e.right);
		let t = c ? e.left : e.right;
		c && t < d || !c && t > d ? (d = t, f = e, p = e) : t === d && (p = e);
	}
	return Es(l, f.top, u, p.bottom);
}
function Ns(e) {
	return "contextElement" in e && e.contextElement ? e.contextElement : gt(e) ? e : void 0;
}
function Ps(e, t) {
	function n(t) {
		Fs(e, t.currentTarget, t.clientX, t.clientY);
	}
	function r(e) {
		t || n(e);
	}
	return {
		onFocus() {
			e.current = void 0;
		},
		onMouseEnter: r,
		onMouseMove: r
	};
}
function Fs(e, t, n, r) {
	let i = js(t, n, r);
	return e.current = i, i;
}
function Is(e) {
	return {
		name: "inline",
		async fn(t) {
			let n = t.elements.reference;
			if (typeof n?.getClientRects != "function") return {};
			let r = Ns(n), i = e.current, a = i?.element === n || i?.element === r ? i : void 0, o = Ms(n, t.placement, a);
			if (!o || typeof t.platform.getElementRects != "function") return {};
			let s = await t.platform.getElementRects({
				reference: {
					contextElement: r,
					getBoundingClientRect() {
						return o;
					}
				},
				floating: t.elements.floating,
				strategy: t.strategy
			});
			return t.rects.reference.x === s.reference.x && t.rects.reference.y === s.reference.y && t.rects.reference.width === s.reference.width && t.rects.reference.height === s.reference.height ? {} : { reset: { rects: s } };
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/createSelector.mjs
var $ = (e, t, n, r, i, a, ...o) => {
	if (o.length > 0) throw Error(la(1));
	let s;
	if (e && t && n && r && i && a) s = (o, s, c, l) => a(e(o, s, c, l), t(o, s, c, l), n(o, s, c, l), r(o, s, c, l), i(o, s, c, l), s, c, l);
	else if (e && t && n && r && i) s = (a, o, s, c) => i(e(a, o, s, c), t(a, o, s, c), n(a, o, s, c), r(a, o, s, c), o, s, c);
	else if (e && t && n && r) s = (i, a, o, s) => r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
	else if (e && t && n) s = (r, i, a, o) => n(e(r, i, a, o), t(r, i, a, o), i, a, o);
	else if (e && t) s = (n, r, i, a) => t(e(n, r, i, a), r, i, a);
	else if (e) s = e;
	else throw Error("Missing arguments");
	return s;
}, Ls = /* @__PURE__ */ o(((e) => {
	var t = p();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), Rs = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ls();
})), zs = /* @__PURE__ */ o(((e) => {
	var t = p(), n = Rs();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useSyncExternalStore, o = t.useRef, s = t.useEffect, c = t.useMemo, l = t.useDebugValue;
	e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
		var d = o(null);
		if (d.current === null) {
			var f = {
				hasValue: !1,
				value: null
			};
			d.current = f;
		} else f = d.current;
		d = c(function() {
			function e(e) {
				if (!a) {
					if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
						var t = f.value;
						if (u(t, e)) return s = t;
					}
					return s = e;
				}
				if (t = s, i(o, e)) return t;
				var n = r(e);
				return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
			}
			var a = !1, o, s, c = n === void 0 ? null : n;
			return [function() {
				return e(t());
			}, c === null ? void 0 : function() {
				return e(c());
			}];
		}, [
			t,
			n,
			r,
			u
		]);
		var p = a(e, d[0], d[1]);
		return s(function() {
			f.hasValue = !0, f.value = p;
		}, [p]), l(p), p;
	};
})), Bs = /* @__PURE__ */ o(((e, t) => {
	t.exports = zs();
})), Vs = [], Hs = void 0;
function Us() {
	return Hs;
}
function Ws(e) {
	Vs.push(e);
}
function Gs(e) {
	let t = (t, n) => {
		let r = $t(qs).current, i;
		try {
			Hs = r;
			for (let e of Vs) e.before(r);
			i = e(t, n);
			for (let e of Vs) e.after(r);
			r.didInitialize = !0;
		} finally {
			Hs = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Ks(e) {
	return /*#__PURE__*/ C.forwardRef(Gs(e));
}
function qs() {
	return { didInitialize: !1 };
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/useStore.mjs
var Js = Rs(), Ys = Bs(), Xs = da(19) ? $s : ec;
function Zs(e, t, n, r, i) {
	return Xs(e, t, n, r, i);
}
function Qs(e, t, n, r, i) {
	let a = C.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Js.useSyncExternalStore)(e.subscribe, a, a);
}
Ws({
	before(e) {
		e.syncIndex = 0, e.didInitialize || (e.syncTick = 1, e.syncHooks = [], e.didChangeStore = !0, e.getSnapshot = () => {
			let t = !1;
			for (let n = 0; n < e.syncHooks.length; n += 1) {
				let r = e.syncHooks[n], i = r.selector(r.store.state, r.a1, r.a2, r.a3);
				Object.is(r.value, i) || (t = !0, r.value = i);
			}
			return t && (e.syncTick += 1), e.syncTick;
		});
	},
	after(e) {
		e.syncHooks.length > 0 && (e.didChangeStore && (e.didChangeStore = !1, e.subscribe = (t) => {
			let n = /* @__PURE__ */ new Set();
			for (let t of e.syncHooks) n.add(t.store);
			let r = [];
			for (let e of n) r.push(e.subscribe(t));
			return () => {
				for (let e of r) e();
			};
		}), (0, Js.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function $s(e, t, n, r, i) {
	let a = Us();
	if (!a) return Qs(e, t, n, r, i);
	let o = a.syncIndex;
	a.syncIndex += 1;
	let s;
	return a.didInitialize ? (s = a.syncHooks[o], (s.store !== e || s.selector !== t || !Object.is(s.a1, n) || !Object.is(s.a2, r) || !Object.is(s.a3, i)) && (s.store !== e && (a.didChangeStore = !0), s.store = e, s.selector = t, s.a1 = n, s.a2 = r, s.a3 = i, s.value = t(e.getSnapshot(), n, r, i))) : (s = {
		store: e,
		selector: t,
		a1: n,
		a2: r,
		a3: i,
		value: t(e.getSnapshot(), n, r, i)
	}, a.syncHooks.push(s)), s.value;
}
function ec(e, t, n, r, i) {
	return (0, Ys.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/Store.mjs
var tc = class {
	constructor(e) {
		this.state = e, this.listeners = /* @__PURE__ */ new Set(), this.updateTick = 0;
	}
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	getSnapshot = () => this.state;
	setState(e) {
		if (this.state === e) return;
		this.state = e, this.updateTick += 1;
		let t = this.updateTick;
		for (let n of this.listeners) {
			if (t !== this.updateTick) return;
			n(e);
		}
	}
	update(e) {
		for (let t in e) if (!Object.is(this.state[t], e[t])) {
			this.setState({
				...this.state,
				...e
			});
			return;
		}
	}
	set(e, t) {
		Object.is(this.state[e], t) || this.setState({
			...this.state,
			[e]: t
		});
	}
	notifyAll() {
		let e = { ...this.state };
		this.setState(e);
	}
	use(e, t, n, r) {
		return Zs(this, e, t, n, r);
	}
}, nc = class extends tc {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		C.useDebugValue(e);
		let n = this;
		X(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		X(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		X(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		C.useDebugValue(e);
		let n = this, r = t !== void 0;
		X(() => {
			r && !Object.is(n.state[e], t) && n.setState({
				...n.state,
				[e]: t
			});
		}, [
			n,
			e,
			t,
			r
		]);
	}
	select(e, t, n, r) {
		let i = this.selectors[e];
		return i(this.state, t, n, r);
	}
	useState(e, t, n, r) {
		return C.useDebugValue(e), Zs(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		C.useDebugValue(e);
		let n = Z(t ?? un);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = C.useRef(void 0);
		return t.current === void 0 && (t.current = (t) => {
			this.set(e, t);
		}), t.current;
	}
	observe(e, t) {
		let n;
		n = typeof e == "function" ? e : this.selectors[e];
		let r = n(this.state);
		return t(r, r, this), this.subscribe((e) => {
			let i = n(e);
			if (!Object.is(r, i)) {
				let e = r;
				r = i, t(i, e, this);
			}
		});
	}
}, rc = {
	open: $((e) => e.open),
	transitionStatus: $((e) => e.transitionStatus),
	domReferenceElement: $((e) => e.domReferenceElement),
	referenceElement: $((e) => e.positionReference ?? e.referenceElement),
	floatingElement: $((e) => e.floatingElement),
	floatingId: $((e) => e.floatingId)
}, ic = class extends nc {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: Ja(),
			nested: n,
			triggerElements: i
		}, rc), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && Dn(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
	};
	dispatchOpenChange = (e, t) => {
		this.syncOpenEvent(e, t.event);
		let n = {
			open: e,
			reason: t.reason,
			nativeEvent: t.event,
			nested: this.context.nested,
			triggerElement: t.trigger
		};
		this.context.events.emit("openchange", n);
	};
	setOpen = (e, t) => {
		if (this.syncOnly) {
			this.context.onOpenChange?.(e, t);
			return;
		}
		this.dispatchOpenChange(e, t), this.context.onOpenChange?.(e, t);
	};
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function ac(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = t.context.triggerElements, d = o, f = C.useRef(null);
	r === void 0 && f.current === null && (f.current = new ic({
		open: s,
		transitionStatus: void 0,
		referenceElement: c,
		floatingElement: l,
		triggerElements: u,
		onOpenChange: d,
		floatingId: i,
		syncOnly: !0,
		nested: a
	}));
	let p = r ?? f.current;
	return t.useSyncedValue("floatingId", i), X(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		gt(c) && (e.domReferenceElement = c), p.state.positionReference === p.state.referenceElement && (e.positionReference = c), p.update(e);
	}, [
		s,
		i,
		c,
		l,
		p
	]), p.context.onOpenChange = d, p.context.nested = a, p;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function oc(e, t = !1, n = !1) {
	let [r, i] = C.useState(e && t ? "idle" : void 0), [a, o] = C.useState(e);
	return e && !a && (o(!0), i("starting")), !e && a && r !== "ending" && !n && i("ending"), !e && !a && r === "ending" && i(void 0), X(() => {
		if (!e && a && r !== "ending" && n) {
			let e = cn.request(() => {
				i("ending");
			});
			return () => {
				cn.cancel(e);
			};
		}
	}, [
		e,
		a,
		r,
		n
	]), X(() => {
		if (!e || t) return;
		let n = cn.request(() => {
			i(void 0);
		});
		return () => {
			cn.cancel(n);
		};
	}, [t, e]), X(() => {
		if (!e || !t) return;
		e && a && r !== "idle" && i("starting");
		let n = cn.request(() => {
			i("idle");
		});
		return () => {
			cn.cancel(n);
		};
	}, [
		t,
		e,
		a,
		r
	]), {
		mounted: a,
		setMounted: o,
		transitionStatus: r
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var sc = /*#__PURE__*/ function(e) {
	return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
}({}), cc = { [sc.startingStyle]: "" }, lc = { [sc.endingStyle]: "" }, uc = { transitionStatus(e) {
	return e === "starting" ? cc : e === "ending" ? lc : null;
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
function dc(e, t = !1, n = !0) {
	let r = ln();
	return Z((i, a = null) => {
		r.cancel();
		let o = ro(e);
		if (o == null) return;
		let s = o, c = () => {
			Ha.flushSync(i);
		};
		if (typeof s.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			i();
			return;
		}
		function l() {
			Promise.all(s.getAnimations().map((e) => e.finished)).then(() => {
				a?.aborted || c();
			}).catch(() => {
				if (n) {
					a?.aborted || c();
					return;
				}
				let e = s.getAnimations();
				!a?.aborted && e.length > 0 && e.some((e) => e.pending || e.playState !== "finished") && l();
			});
		}
		if (t) {
			let e = sc.startingStyle;
			if (!s.hasAttribute(e)) {
				r.request(l);
				return;
			}
			let t = new MutationObserver(() => {
				s.hasAttribute(e) || (t.disconnect(), l());
			});
			t.observe(s, {
				attributes: !0,
				attributeFilter: [e]
			}), a?.addEventListener("abort", () => t.disconnect(), { once: !0 });
			return;
		}
		r.request(l);
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function fc(e) {
	let { enabled: t = !0, open: n, ref: r, onComplete: i } = e, a = Z(i), o = dc(r, n, !1);
	C.useEffect(() => {
		if (!t) return;
		let e = new AbortController();
		return o(a, e.signal), () => {
			e.abort();
		};
	}, [
		t,
		n,
		a,
		o
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
var pc = {
	tabIndex: -1,
	[On]: ""
};
function mc(e) {
	return (t) => t !== "touch" || e.current;
}
function hc(e, t, n = !1) {
	let r = sa(), i = Qa() != null, a = C.useRef(null);
	e === void 0 && a.current === null && (a.current = t(r, i));
	let o = e ?? a.current;
	return ac({
		popupStore: o,
		treatPopupAsFloatingElement: n,
		floatingRootContext: o.state.floatingRootContext,
		floatingId: r,
		nested: i,
		onOpenChange: o.setOpen
	}), {
		store: o,
		internalStore: a.current
	};
}
function gc(e, t) {
	let n = C.useRef(null), r = C.useRef(null);
	return C.useCallback((i) => {
		if (e === void 0) return;
		let a = !1;
		if (n.current !== null) {
			let e = n.current, i = r.current, o = t.context.triggerElements.getById(e);
			i && o === i && (t.context.triggerElements.delete(e), a = !0), n.current = null, r.current = null;
		}
		if (i !== null && (n.current = e, r.current = i, t.context.triggerElements.add(e, i), a = !0), a) {
			let e = t.context.triggerElements.size;
			t.select("open") && t.state.triggerCount !== e && t.set("triggerCount", e);
		}
	}, [t, e]);
}
function _c(e, t, n, r = !1) {
	t ? e.preventUnmountingOnClose = !1 : r && (e.preventUnmountingOnClose = !0);
	let i = n?.id ?? null;
	(i || t) && (e.activeTriggerId = i, e.activeTriggerElement = n ?? null);
}
function vc(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function yc(e, t, n, r = {}) {
	let i = n.reason, a = i === Qn, o = t && i === "trigger-focus", s = !t && (i === "trigger-press" || i === "escape-key"), c = vc(n);
	if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
	r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
	let l = () => {
		let i = {
			...r.extraState,
			open: t
		};
		o ? i.instantType = "focus" : s ? i.instantType = "dismiss" : a && (i.instantType = void 0), _c(i, t, n.trigger, c()), e.update(i);
	};
	a ? Ha.flushSync(l) : l();
}
function bc(e, t, n, r) {
	ut(() => {
		t === void 0 && e.state.open === !1 && n && (e.state = {
			...e.state,
			open: !0,
			activeTriggerId: r,
			preventUnmountingOnClose: !1
		});
	});
}
function xc(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = gc(e, n), o = Z((t) => {
		if (a(t), !t) return;
		let i = n.select("open"), o = n.select("activeTriggerId");
		if (o === e) {
			n.update({
				activeTriggerElement: t,
				...i ? r : null
			});
			return;
		}
		o == null && i && n.update({
			activeTriggerId: e,
			activeTriggerElement: t,
			...r
		});
	});
	return X(() => {
		i && n.update({
			activeTriggerElement: t.current,
			...r
		});
	}, [
		i,
		n,
		t,
		...Object.values(r)
	]), {
		registerTrigger: o,
		isMountedByThisTrigger: i
	};
}
function Sc(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = e.useState("open");
	X(() => {
		if (!r) {
			e.state.triggerCount !== 0 && e.set("triggerCount", 0);
			return;
		}
		let t = e.context.triggerElements.size, i = {};
		e.state.triggerCount !== t && (i.triggerCount = t);
		let a = e.select("activeTriggerId"), o = null;
		if (a) {
			let t = e.context.triggerElements.getById(a);
			t ? t !== e.state.activeTriggerElement && (i.activeTriggerElement = t) : o = a;
		}
		if (!o && !a && t === 1) {
			let t = e.context.triggerElements.entries().next();
			if (!t.done) {
				let [e, n] = t.value;
				i.activeTriggerId = e, i.activeTriggerElement = n;
			}
		}
		(i.triggerCount !== void 0 || i.activeTriggerId !== void 0 || i.activeTriggerElement !== void 0) && e.update(i), o && n && queueMicrotask(() => {
			if (e.select("open") && e.select("activeTriggerId") === o && !e.context.triggerElements.getById(o)) {
				let t = hr(Xn);
				e.setOpen(!1, t), t.isCanceled || e.update({
					activeTriggerId: null,
					activeTriggerElement: null
				});
			}
		});
	}, [
		r,
		e,
		e.useState("triggerCount"),
		n
	]);
}
function Cc(e, t, n) {
	let { mounted: r, setMounted: i, transitionStatus: a } = oc(e), o = t.useState("preventUnmountingOnClose"), s = !e && o;
	t.useSyncedValues({
		mounted: r,
		transitionStatus: a,
		preventUnmountingOnClose: s
	});
	let c = Z(() => {
		i(!1), t.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: !1,
			preventUnmountingOnClose: !1
		}), n?.(), t.context.onOpenChangeComplete?.(!1);
	});
	return fc({
		enabled: r && !e && !s,
		open: e,
		ref: t.context.popupRef,
		onComplete() {
			e || c();
		}
	}), {
		forceUnmount: c,
		transitionStatus: a
	};
}
function wc(e, t) {
	e.useSyncedValues(t), X(() => () => {
		e.update({
			activeTriggerProps: fn,
			inactiveTriggerProps: fn,
			popupProps: fn
		});
	}, [e]);
}
function Tc(e, t) {
	X(() => {
		!t && e.state.openMethod !== null && e.set("openMethod", null);
	}, [t, e]), X(() => () => {
		e.state.openMethod !== null && e.set("openMethod", null);
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var Ec = class {
	constructor() {
		this.elementsSet = /* @__PURE__ */ new Set(), this.idMap = /* @__PURE__ */ new Map();
	}
	add(e, t) {
		let n = this.idMap.get(e);
		n !== t && (n !== void 0 && this.elementsSet.delete(n), this.elementsSet.add(t), this.idMap.set(e, t));
	}
	delete(e) {
		let t = this.idMap.get(e);
		t && (this.elementsSet.delete(t), this.idMap.delete(e));
	}
	hasElement(e) {
		return this.elementsSet.has(e);
	}
	hasMatchingElement(e) {
		for (let t of this.elementsSet) if (e(t)) return !0;
		return !1;
	}
	getById(e) {
		return this.idMap.get(e);
	}
	entries() {
		return this.idMap.entries();
	}
	elements() {
		return this.elementsSet.values();
	}
	get size() {
		return this.idMap.size;
	}
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/getEmptyRootContext.mjs
function Dc() {
	return new ic({
		open: !1,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new Ec(),
		floatingId: void 0,
		syncOnly: !1,
		nested: !1,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/store.mjs
function Oc() {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: Dc(),
		floatingId: void 0,
		triggerCount: 0,
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: fn,
		inactiveTriggerProps: fn,
		popupProps: fn
	};
}
function kc(e, t, n = !1) {
	return new ic({
		open: !1,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: e,
		floatingId: t,
		syncOnly: !0,
		nested: n,
		onOpenChange: void 0
	});
}
var Ac = $((e) => e.triggerIdProp ?? e.activeTriggerId), jc = $((e) => e.openProp ?? e.open), Mc = $((e) => (e.popupElement?.id ?? e.floatingId) || void 0);
function Nc(e, t) {
	return t !== void 0 && jc(e) && Ac(e) === t;
}
function Pc(e, t) {
	return Nc(e, t) ? !0 : t !== void 0 && jc(e) && Ac(e) == null && e.triggerCount === 1;
}
var Fc = {
	open: jc,
	mounted: $((e) => e.mounted),
	transitionStatus: $((e) => e.transitionStatus),
	floatingRootContext: $((e) => e.floatingRootContext),
	triggerCount: $((e) => e.triggerCount),
	preventUnmountingOnClose: $((e) => e.preventUnmountingOnClose),
	payload: $((e) => e.payload),
	activeTriggerId: Ac,
	activeTriggerElement: $((e) => e.mounted ? e.activeTriggerElement : null),
	popupId: Mc,
	isTriggerActive: $((e, t) => t !== void 0 && Ac(e) === t),
	isOpenedByTrigger: $((e, t) => Nc(e, t)),
	isMountedByTrigger: $((e, t) => t !== void 0 && Ac(e) === t && e.mounted),
	triggerProps: $((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
	triggerPopupId: $((e, t) => Pc(e, t) ? Mc(e) : void 0),
	popupProps: $((e) => e.popupProps),
	popupElement: $((e) => e.popupElement),
	positionerElement: $((e) => e.positionerElement)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Ic(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = sa(), a = Qa() != null, o = $t(() => new ic({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new Ec(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return X(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = gt(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function Lc(e = {}) {
	let { nodeId: t, externalTree: n } = e, r = Ic(e), i = e.rootContext || r, a = i.useState("referenceElement"), o = i.useState("floatingElement"), s = i.useState("domReferenceElement"), c = i.useState("open"), l = i.useState("floatingId"), [u, d] = C.useState(null), [f, p] = C.useState(void 0), [m, h] = C.useState(void 0), g = C.useRef(null), _ = $a(n), v = C.useMemo(() => ({
		reference: a,
		floating: o,
		domReference: s
	}), [
		a,
		o,
		s
	]), y = ys({
		...e,
		elements: {
			...v,
			...u && { reference: u }
		}
	}), b = gt(f) ? f : null, x = m === void 0 ? i.state.floatingElement : m;
	i.useSyncedValue("referenceElement", f ?? null), i.useSyncedValue("domReferenceElement", f === void 0 ? s : b), i.useSyncedValue("floatingElement", x);
	let S = C.useCallback((e) => {
		let t = gt(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		d(t), y.refs.setReference(t);
	}, [y.refs]), w = C.useCallback((e) => {
		(gt(e) || e === null) && (g.current = e, p(e)), (gt(y.refs.reference.current) || y.refs.reference.current === null || e !== null && !gt(e)) && y.refs.setReference(e);
	}, [y.refs, p]), T = C.useCallback((e) => {
		h(e), y.refs.setFloating(e);
	}, [y.refs]), E = C.useMemo(() => ({
		...y.refs,
		setReference: w,
		setFloating: T,
		setPositionReference: S,
		domReference: g
	}), [
		y.refs,
		w,
		T,
		S
	]), D = C.useMemo(() => ({
		...y.elements,
		domReference: s
	}), [y.elements, s]), O = C.useMemo(() => ({
		...y,
		dataRef: i.context.dataRef,
		open: c,
		onOpenChange: i.setOpen,
		events: i.context.events,
		floatingId: l,
		refs: E,
		elements: D,
		nodeId: t,
		rootStore: i
	}), [
		y,
		E,
		D,
		t,
		i,
		c,
		l
	]);
	return X(() => {
		s && (g.current = s);
	}, [s]), X(() => {
		i.context.dataRef.current.floatingContext = O;
		let e = _?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = O);
	}), C.useMemo(() => ({
		...y,
		context: O,
		refs: E,
		elements: D,
		rootStore: i
	}), [
		y,
		E,
		D,
		O,
		i
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
var Rc = Kt && Jt;
function zc(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, i = "rootStore" in e ? e.rootStore : e, { events: a, dataRef: o } = i.context, s = C.useRef(!1), c = C.useRef(null), l = C.useRef(!0), u = an();
	C.useEffect(() => {
		let e = i.select("domReferenceElement");
		if (!n) return;
		let t = pt(e);
		function r() {
			let e = i.select("domReferenceElement");
			!i.select("open") && _t(e) && e === Pn(Zt(e)) && (s.current = !0);
		}
		function a() {
			l.current = !0;
		}
		function o() {
			l.current = !1;
		}
		return _r(It(t, "blur", r), Rc && It(t, "keydown", a, !0), Rc && It(t, "pointerdown", o, !0));
	}, [i, n]), C.useEffect(() => {
		if (!n) return;
		function e(e) {
			if (e.reason === "trigger-press" || e.reason === "escape-key") {
				let e = i.select("domReferenceElement");
				gt(e) && (c.current = e, s.current = !0);
			}
		}
		return a.on("openchange", e), () => {
			a.off("openchange", e);
		};
	}, [
		a,
		n,
		i
	]);
	let d = C.useMemo(() => {
		function e() {
			s.current = !1, c.current = null;
		}
		return {
			onMouseLeave() {
				e();
			},
			onFocus(t) {
				let n = t.currentTarget;
				if (s.current) {
					if (c.current === n) return;
					e();
				}
				let a = In(t.nativeEvent);
				if (gt(a)) {
					if (Rc && !t.relatedTarget) {
						if (!l.current && !Bn(a)) return;
					} else if (!Un(a)) return;
				}
				let o = Ln(t.relatedTarget, i.context.triggerElements), { nativeEvent: d, currentTarget: f } = t, p = typeof r == "function" ? r() : r;
				if (i.select("open") && o || p === 0 || p === void 0) {
					i.setOpen(!0, hr($n, d, f));
					return;
				}
				u.start(p, () => {
					s.current || i.setOpen(!0, hr($n, d, f));
				});
			},
			onBlur(t) {
				e();
				let n = t.relatedTarget, r = t.nativeEvent, a = gt(n) && n.hasAttribute(Ui("focus-guard")) && n.getAttribute("data-type") === "outside";
				u.start(0, () => {
					let e = i.select("domReferenceElement"), t = Pn(Zt(e));
					!n && t === e || Fn(o.current.floatingContext?.refs.floating.current, t) || Fn(e, t) || a || Ln(n ?? t, i.context.triggerElements) || i.setOpen(!1, hr($n, r));
				});
			}
		};
	}, [
		o,
		r,
		i,
		u
	]);
	return C.useMemo(() => n ? {
		reference: d,
		trigger: d
	} : {}, [n, d]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var Bc = class e {
	constructor() {
		this.pointerType = void 0, this.interactedInside = !1, this.handler = void 0, this.blockMouseMove = !0, this.performedPointerEventsMutation = !1, this.pointerEventsScopeElement = null, this.pointerEventsReferenceElement = null, this.pointerEventsFloatingElement = null, this.restTimeoutPending = !1, this.openChangeTimeout = new rn(), this.restTimeout = new rn(), this.handleCloseOptions = void 0;
	}
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, Vc = /* @__PURE__ */ new WeakMap();
function Hc(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Vc.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Vc.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Uc(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Vc.get(n);
	a && a !== e && Hc(a), Hc(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Vc.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function Wc(e) {
	let t = e.context.dataRef.current, n = $t(() => t.hoverInteractionState ?? Bc.create()).current;
	return t.hoverInteractionState ||= n, tn(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Gc(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = "rootStore" in e ? e.rootStore : e, o = a.useState("open"), s = a.useState("floatingElement"), c = a.useState("domReferenceElement"), { dataRef: l } = a.context, u = $a(), d = Qa(), f = Wc(a), p = an(), m = Z(() => Jn(l.current.openEvent?.type, f.interactedInside)), h = Z(() => Yn(l.current.openEvent?.type)), g = Z(() => {
		Hc(f);
	});
	X(() => {
		o || (f.pointerType = void 0, f.restTimeoutPending = !1, f.interactedInside = !1, g());
	}, [
		o,
		f,
		g
	]), C.useEffect(() => g, [g]), X(() => {
		if (n && o && f.handleCloseOptions?.blockPointerEvents && h() && gt(c) && s) {
			let e = c, t = s, n = Zt(s), r = u?.nodesRef.current.find((e) => e.id === d)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = f.pointerEventsScopeElement === t ? null : f.pointerEventsScopeElement, a = r === t ? null : r, o = f.handleCloseOptions?.getScope?.() ?? i ?? a ?? e.closest("[data-rootownerid]") ?? n.body;
			return Uc(f, {
				scopeElement: o,
				referenceElement: e,
				floatingElement: t
			}), () => {
				g();
			};
		}
	}, [
		n,
		o,
		c,
		s,
		f,
		h,
		u,
		d,
		g
	]), C.useEffect(() => {
		if (!n) return;
		function e() {
			return !!(u && d && Vi(u.nodesRef.current, d).length > 0);
		}
		function t(e) {
			let t = Kn(r, "close", f.pointerType), n = () => {
				a.setOpen(!1, hr(Qn, e)), u?.events.emit("floating.closed", e);
			};
			t ? f.openChangeTimeout.start(t, n) : (f.openChangeTimeout.clear(), n());
		}
		function o(e) {
			let t = In(e);
			if (!Vn(t)) {
				f.interactedInside = !1;
				return;
			}
			f.interactedInside = t?.closest("[aria-haspopup]") != null;
		}
		function c() {
			f.openChangeTimeout.clear(), p.clear(), u?.events.off("floating.closed", v), g();
		}
		function _(n) {
			if (e() && u) {
				u.events.on("floating.closed", v);
				return;
			}
			if (Ln(n.relatedTarget, a.context.triggerElements)) return;
			let r = l.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			if (!(u && r && gt(o) && Vi(u.nodesRef.current, r, !1).some((e) => Fn(e.context?.elements.floating, o)))) {
				if (f.handler) {
					f.handler(n);
					return;
				}
				g(), h() && !m() && t(n);
			}
		}
		function v(t) {
			!u || !d || e() || p.start(0, () => {
				u.events.off("floating.closed", v), a.setOpen(!1, hr(Qn, t)), u.events.emit("floating.closed", t);
			});
		}
		let y = s;
		return _r(y && It(y, "mouseenter", c), y && It(y, "mouseleave", _), y && It(y, "pointerdown", o, !0), () => {
			u?.events.off("floating.closed", v);
		});
	}, [
		n,
		s,
		a,
		l,
		r,
		i,
		h,
		m,
		g,
		f,
		u,
		d,
		p
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
var Kc = { current: null };
function qc(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Kc, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p } = t, m = "rootStore" in e ? e.rootStore : e, { dataRef: h, events: g } = m.context, _ = $a(l), v = Wc(m), y = C.useRef(!1), b = wr(i), x = wr(r), S = wr(o), w = wr(n), T = wr(p), E = wr(f), D = Z(() => Jn(h.current.openEvent?.type, v.interactedInside)), O = Z(() => T.current?.() !== !1), k = Z((e, t, n) => {
		let r = m.context.triggerElements;
		if (r.hasElement(t)) return !e || !Fn(e, t);
		if (!gt(n)) return !1;
		let i = n;
		return r.hasMatchingElement((e) => Fn(e, i)) && (!e || !Fn(e, i));
	}), A = Z(() => {
		v.handler &&= (Zt(m.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), j = Z(() => {
		Hc(v);
	});
	return u && (v.handleCloseOptions = b.current?.__options), C.useEffect(() => A, [A]), C.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === Qn, A(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		A
	]), C.useEffect(() => {
		if (!n) return;
		function e(e, t = !0) {
			let n = Kn(x.current, "close", v.pointerType);
			n ? v.openChangeTimeout.start(n, () => {
				m.setOpen(!1, hr(Qn, e)), _?.events.emit("floating.closed", e);
			}) : t && (v.openChangeTimeout.clear(), m.setOpen(!1, hr(Qn, e)), _?.events.emit("floating.closed", e));
		}
		let t = c.current ?? (u ? m.select("domReferenceElement") : null);
		if (!gt(t)) return;
		function r(e) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !En(v.pointerType)) return;
			let t = qn(S.current), n = Kn(x.current, "open", v.pointerType), r = In(e), i = e.currentTarget ?? null, o = m.select("domReferenceElement"), s = i;
			if (gt(r) && !m.context.triggerElements.hasElement(r)) {
				for (let e of m.context.triggerElements.elements()) if (Fn(e, r)) {
					s = e;
					break;
				}
			}
			gt(i) && gt(o) && !m.context.triggerElements.hasElement(i) && Fn(i, o) && (s = o);
			let c = s != null && k(o, s, r), l = m.select("open"), u = E.current?.() ?? m.select("transitionStatus") === "ending", d = !l && u && y.current, f = !c && gt(s) && gt(o) && Fn(o, s) && d, p = t > 0 && !n, h = c && (l || d) || f, g = !l || c;
			if (h) {
				O() && m.setOpen(!0, hr(Qn, e, s));
				return;
			}
			p || (n ? v.openChangeTimeout.start(n, () => {
				g && O() && m.setOpen(!0, hr(Qn, e, s));
			}) : g && O() && m.setOpen(!0, hr(Qn, e, s)));
		}
		function i(t) {
			if (D()) {
				j();
				return;
			}
			A();
			let n = Zt(m.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let r = h.current.floatingContext ?? d?.();
			if (!Ln(t.relatedTarget, m.context.triggerElements)) {
				if (b.current && r) {
					m.select("open") || v.openChangeTimeout.clear();
					let i = c.current;
					v.handler = b.current({
						...r,
						tree: _,
						x: t.clientX,
						y: t.clientY,
						onClose() {
							j(), A(), w.current && !D() && i === m.select("domReferenceElement") && e(t, !0);
						}
					}), n.addEventListener("mousemove", v.handler), v.handler(t);
					return;
				}
				(v.pointerType !== "touch" || !Fn(m.select("floatingElement"), t.relatedTarget)) && e(t);
			}
		}
		return s ? _r(It(t, "mousemove", r, { once: !0 }), It(t, "mouseenter", r), It(t, "mouseleave", i)) : _r(It(t, "mouseenter", r), It(t, "mouseleave", i));
	}, [
		A,
		j,
		h,
		x,
		m,
		n,
		b,
		v,
		u,
		k,
		D,
		a,
		s,
		S,
		c,
		_,
		w,
		d,
		E,
		O
	]), C.useMemo(() => {
		if (!n) return;
		function e(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove(e) {
				let { nativeEvent: t } = e, n = e.currentTarget, r = m.select("domReferenceElement"), i = m.select("open"), o = k(r, n, e.target);
				if (a && !En(v.pointerType)) return;
				if (i && o && v.handleCloseOptions?.blockPointerEvents) {
					let e = m.select("floatingElement");
					if (e) {
						let t = v.handleCloseOptions?.getScope?.() ?? n.ownerDocument.body;
						Uc(v, {
							scopeElement: t,
							referenceElement: n,
							floatingElement: e
						});
					}
				}
				let s = qn(S.current);
				if (i && !o || s === 0 || !o && v.restTimeoutPending && e.movementX ** 2 + e.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function c() {
					if (v.restTimeoutPending = !1, D()) return;
					let e = m.select("open");
					!v.blockMouseMove && (!e || o) && O() && m.setOpen(!0, hr(Qn, t, n));
				}
				v.pointerType === "touch" ? Ha.flushSync(() => {
					c();
				}) : o && i ? c() : (v.restTimeoutPending = !0, v.restTimeout.start(s, c));
			}
		};
	}, [
		n,
		v,
		D,
		k,
		a,
		m,
		S,
		O
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
var Jc = "Escape";
function Yc(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Xc(e, t) {
	return Yc(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Zc(e, t, n) {
	return Yc(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function Qc(e, t, n) {
	return Yc(t, n ? e === An : e === jn, e === Nn);
}
function $c(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === Jc : Yc(t, n ? e === jn : e === An, e === Mn);
}
function el(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", parentOrientation: _, id: v, resetOnPointerLeave: y = !0, externalTree: b, grid: x } = t, S = x != null, w = "rootStore" in e ? e.rootStore : e, T = w.useState("open"), E = w.useState("floatingElement"), D = w.useState("domReferenceElement"), O = w.context.dataRef, k = Wn(E), A = Hn(D), j = wr(k), M = Qa(), N = $a(b), P = C.useRef(f), F = C.useRef(o ?? -1), I = C.useRef(null), L = C.useRef(!0), R = Z((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), z = C.useRef(!!E), B = C.useRef(T), V = C.useRef(!1), H = C.useRef(!1), U = C.useRef(null), W = wr(h), G = wr(T), ee = wr(o), te = wr(y), ne = ln(), re = ln(), ie = Z(() => {
		function e(e) {
			d ? N?.events.emit("virtualfocus", e) : U.current = Gi(e, {
				sync: V.current,
				preventScroll: !0
			});
		}
		let t = n.current[F.current], r = H.current;
		t && e(t), (V.current ? (e) => e() : (e) => ne.request(e))(() => {
			let i = n.current[F.current] || t;
			i && (t || e(i), ue && (r || !L.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	X(() => {
		O.current.orientation = g;
	}, [O, g]), X(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (H.current = !0, R())) : z.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), X(() => {
		if (a) {
			if (!T) {
				V.current = !1;
				return;
			}
			if (E) if (r == null) {
				if (V.current = !1, ee.current != null) return;
				if (z.current && (F.current = -1, ie()), (!B.current || !z.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
					let e = 0, t = () => {
						n.current[0] == null ? (e < 2 && (e ? (e) => re.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Zc(I.current, g, u) || l ? ui(n) : di(n), I.current = null, R());
					};
					t();
				}
			} else li(n.current, r) || (F.current = r, ie(), H.current = !1);
		}
	}, [
		a,
		T,
		E,
		r,
		ee,
		l,
		n,
		g,
		u,
		R,
		ie,
		re
	]), X(() => {
		if (!a || E || !N || d || !z.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = Pn(Zt(D ?? t ?? null)), r = e.some((e) => e.context && Fn(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), X(() => {
		B.current = T, z.current = !!E;
	}), X(() => {
		T || (I.current = null, P.current = f);
	}, [T, f]);
	let ae = r != null, oe = Z((e) => {
		if (!G.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), se = Z(() => _ ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), ce = Z(() => ui(n, W.current)), le = Z((e) => {
		if (L.current = !1, V.current = !0, e.which === 229 || !G.current && e.currentTarget === j.current) return;
		if (l && $c(e.key, g, u, S)) {
			Xc(e.key, se()) || Sn(e), w.setOpen(!1, hr(or, e.nativeEvent)), _t(D) && (d ? N?.events.emit("virtualfocus", D) : D.focus());
			return;
		}
		let t = F.current, r = ui(n, h), i = di(n, h);
		if (A || (e.key === "Home" && (Sn(e), F.current = r, R(e)), e.key === "End" && (Sn(e), F.current = i, R(e))), x != null) {
			let t = x(e, F.current, n, g, c, u, h, r, i);
			if (t != null && (F.current = t, R(e)), g === "both") return;
		}
		if (Xc(e.key, g)) {
			if (Sn(e), T && !d && Pn(e.currentTarget.ownerDocument) === e.currentTarget) {
				F.current = Zc(e.key, g, u) ? r : i, R(e);
				return;
			}
			Zc(e.key, g, u) ? c ? t >= i ? s && t !== n.current.length ? F.current = -1 : (V.current = !1, F.current = r) : F.current = fi(n.current, {
				startingIndex: t,
				disabledIndices: h
			}) : F.current = Math.min(i, fi(n.current, {
				startingIndex: t,
				disabledIndices: h
			})) : c ? t <= r ? s && t !== -1 ? F.current = n.current.length : (V.current = !1, F.current = i) : F.current = fi(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			}) : F.current = Math.max(r, fi(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			})), li(n.current, F.current) && (F.current = -1), R(e);
		}
	}), ue = C.useMemo(() => ({
		onFocus(e) {
			V.current = !0, oe(e);
		},
		onClick: ({ currentTarget: e }) => e.focus({ preventScroll: !0 }),
		onMouseMove(e) {
			V.current = !0, H.current = !1, p && oe(e);
		},
		onPointerLeave(e) {
			if (!G.current || !L.current || e.pointerType === "touch") return;
			V.current = !0;
			let t = e.relatedTarget;
			if (!(!p || n.current.includes(t)) && te.current && (U.current?.(), U.current = null, F.current = -1, R(e), !d)) {
				let e = j.current, t = Pn(Zt(e));
				e && Fn(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		oe,
		G,
		j,
		p,
		n,
		R,
		te,
		d
	]), de = C.useMemo(() => d && T && ae && { "aria-activedescendant": `${v}-${r}` }, [
		d,
		T,
		ae,
		v,
		r
	]), fe = C.useMemo(() => ({
		"aria-orientation": g === "both" ? void 0 : g,
		...A ? {} : de,
		onKeyDown(e) {
			if (e.key === "Tab" && e.shiftKey && T && !d) {
				let t = In(e.nativeEvent);
				if (t && !Fn(j.current, t)) return;
				Sn(e), w.setOpen(!1, hr(ir, e.nativeEvent)), _t(D) && D.focus();
				return;
			}
			le(e);
		},
		onPointerMove() {
			L.current = !0;
		}
	}), [
		de,
		le,
		j,
		g,
		A,
		w,
		T,
		d,
		D
	]), pe = C.useMemo(() => {
		function e(e) {
			w.setOpen(!0, hr(or, e.nativeEvent, e.currentTarget));
		}
		function t(e) {
			f === "auto" && wn(e.nativeEvent) && (P.current = !d);
		}
		function n(e) {
			P.current = f, f === "auto" && Tn(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(t) {
				let n = w.select("open");
				L.current = !1;
				let r = t.key.startsWith("Arrow"), i = Qc(t.key, se(), u), a = Xc(t.key, g), o = (l ? i : a) || t.key === "Enter" || t.key.trim() === "";
				if (d && n) return le(t);
				if (!(!n && !m && r)) {
					if (o) {
						let e = Xc(t.key, se());
						I.current = l && e ? null : t.key;
					}
					if (l) {
						i && (Sn(t), n ? (F.current = ce(), R(t)) : e(t));
						return;
					}
					a && (ee.current != null && (F.current = ee.current), Sn(t), !n && m ? e(t) : le(t), n && R(t));
				}
			},
			onFocus(e) {
				w.select("open") && !d && (F.current = -1, R(e));
			},
			onPointerDown: n,
			onPointerEnter: n,
			onMouseDown: t,
			onClick: t
		};
	}, [
		le,
		f,
		ce,
		l,
		R,
		w,
		m,
		g,
		se,
		u,
		ee,
		d
	]), me = C.useMemo(() => ({
		...de,
		...pe
	}), [de, pe]);
	return C.useMemo(() => a ? {
		reference: me,
		floating: fe,
		item: ue,
		trigger: pe
	} : {}, [
		a,
		me,
		fe,
		pe,
		ue
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function tl(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = "rootStore" in e ? e.rootStore : e, f = d.useState("open"), p = an(), m = C.useRef(""), h = C.useRef(u ?? i ?? -1), g = C.useRef(null), _ = Z((e) => {
		function t(e) {
			let t = r?.current[e];
			return !t || hi(t);
		}
		function c(e) {
			return t(e) ? o == null || !pi(dn, e, o) : !1;
		}
		function d(e, t, n = 0) {
			if (e.length === 0) return -1;
			let r = (n % e.length + e.length) % e.length, i = t.toLowerCase();
			for (let t = 0; t < e.length; t += 1) {
				let n = (r + t) % e.length;
				if (!(!e[n]?.toLowerCase().startsWith(i) || !c(n))) return n;
			}
			return -1;
		}
		let _ = n.current;
		if (m.current.length > 0 && e.key === " " && (Sn(e), s?.(!0)), m.current.length > 0 && m.current[0] !== " " && d(_, m.current) === -1 && e.key !== " " && s?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (Sn(e), s?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && c(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, s?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = d(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", s?.(!1)) : (a?.(b), g.current = b);
	}), v = Z((e) => {
		let t = e.relatedTarget, n = d.select("domReferenceElement"), r = d.select("floatingElement");
		Fn(n, t) || Fn(r, t) || (p.clear(), m.current = "", h.current = g.current, s?.(!1));
	});
	X(() => {
		!f && u !== null || (p.clear(), g.current = null, m.current !== "" && (m.current = ""));
	}, [
		f,
		u,
		p
	]), X(() => {
		f && m.current === "" && (h.current = u ?? i ?? -1);
	}, [
		f,
		u,
		i
	]);
	let y = C.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return C.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
var nl = .1, rl = nl * nl, il = .5;
function al(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function ol(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return al(e, t, n, r, i, a) && (u = !u), al(e, t, i, a, o, s) && (u = !u), al(e, t, o, s, c, l) && (u = !u), al(e, t, c, l, n, r) && (u = !u), u;
}
function sl(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function cl(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function ll(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new rn(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * rl;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = In(r), g = r.type === "mouseleave", _ = Fn(u, h), v = Fn(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && gt(r.relatedTarget) && Fn(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Vi(s.nodesRef.current, o).length > 0);
			}
			function b() {
				y() || m();
			}
			if (y()) return;
			let x = a.getBoundingClientRect(), S = u.getBoundingClientRect(), C = e > S.right - S.width / 2, w = t > S.bottom - S.height / 2, T = S.width > x.width, E = S.height > x.height, D = (T ? x : S).left, O = (T ? x : S).right, k = (E ? x : S).top, A = (E ? x : S).bottom;
			if (c === "top" && t >= x.bottom - 1 || c === "bottom" && t <= x.top + 1 || c === "left" && e >= x.right - 1 || c === "right" && e <= x.left + 1) {
				b();
				return;
			}
			let j = !1;
			switch (c) {
				case "top":
					j = cl(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = cl(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = cl(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = cl(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !sl(d, f, x)) {
				b();
				return;
			}
			if (!g && p(d, f)) {
				b();
				return;
			}
			let M = !1;
			switch (c) {
				case "top": {
					let n = T ? il / 2 : il * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + il + 1, o = C || T ? S.bottom - il : S.top, s = C ? T ? S.bottom - il : S.top : S.bottom - il;
					M = ol(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? il / 2 : il * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - il, o = C || T ? S.top + il : S.bottom, s = C ? T ? S.top + il : S.bottom : S.top + il;
					M = ol(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? il / 2 : il * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + il + 1, o = w || E ? S.right - il : S.left, s = w ? E ? S.right - il : S.left : S.right - il;
					M = ol(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? il / 2 : il * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - il, o = w || E ? S.left + il : S.right, s = w ? E ? S.left + il : S.right : S.left + il;
					M = ol(d, f, a, r, a, i, o, S.top, s, S.bottom);
					break;
				}
			}
			M ? l || n.start(40, b) : b();
		};
	};
	return r.__options = {
		...e,
		blockPointerEvents: t
	}, r;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/root/useDialogRoot.mjs
function ul(e) {
	let { store: t, actionsRef: n } = e, r = t.useState("open");
	Tc(t, r), Sc(t);
	let { forceUnmount: i } = Cc(r, t), a = C.useCallback(() => {
		t.setOpen(!1, hr(pr));
	}, [t]);
	C.useImperativeHandle(n, () => ({
		unmount: i,
		close: a
	}), [i, a]);
}
function dl({ store: e, parentContext: t, isDrawer: n }) {
	let r = e.useState("open"), i = e.useState("disablePointerDismissal"), a = e.useState("modal"), o = e.useState("popupElement"), s = e.useState("floatingRootContext"), [c, l] = C.useState(0), [u, d] = C.useState(0), f = c === 0, p = _o(s, {
		outsidePressEvent() {
			return e.context.internalBackdropRef.current || e.context.backdropRef.current ? "intentional" : {
				mouse: a === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(t) {
			if (!e.context.outsidePressEnabledRef.current || "button" in t && t.button !== 0 || "touches" in t && t.touches.length !== 1) return !1;
			let n = In(t);
			return f && !i ? a && (e.context.internalBackdropRef.current || e.context.backdropRef.current) ? e.context.internalBackdropRef.current === n || e.context.backdropRef.current === n || Fn(n, o) && !n?.hasAttribute("data-base-ui-portal") : !0 : !1;
		},
		escapeKey: f
	});
	return xn(r && a === !0, o), e.useContextCallback("onNestedDialogOpen", (e, t) => {
		l(e), d(t);
	}), e.useContextCallback("onNestedDialogClose", () => {
		l(0), d(0);
	}), C.useEffect(() => (t?.onNestedDialogOpen && r && t.onNestedDialogOpen(c + 1, u + +!!n), t?.onNestedDialogClose && !r && t.onNestedDialogClose(), () => {
		t?.onNestedDialogClose && r && t.onNestedDialogClose();
	}), [
		n,
		r,
		c,
		u,
		t
	]), wc(e, {
		activeTriggerProps: p.reference ?? fn,
		inactiveTriggerProps: p.trigger ?? fn,
		popupProps: p.floating ?? fn,
		nestedOpenDialogCount: c,
		nestedOpenDrawerCount: u
	}), null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/root/DialogRootContext.mjs
var fl = /*#__PURE__*/ C.createContext(!1), pl = /*#__PURE__*/ C.createContext(void 0);
function ml(e) {
	let t = C.useContext(pl);
	if (e === !1 && t === void 0) throw Error(la(27));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/store/DialogStore.mjs
var hl = {
	...Fc,
	modal: $((e) => e.modal),
	nested: $((e) => e.nested),
	nestedOpenDialogCount: $((e) => e.nestedOpenDialogCount),
	nestedOpenDrawerCount: $((e) => e.nestedOpenDrawerCount),
	disablePointerDismissal: $((e) => e.disablePointerDismissal),
	openMethod: $((e) => e.openMethod),
	descriptionElementId: $((e) => e.descriptionElementId),
	titleElementId: $((e) => e.titleElementId),
	viewportElement: $((e) => e.viewportElement),
	role: $((e) => e.role)
}, gl = class e extends nc {
	constructor(e, t, n = !1) {
		let r = new Ec(), i = _l(e);
		i.floatingRootContext = kc(r, t, n), super(i, {
			popupRef: /*#__PURE__*/ C.createRef(),
			backdropRef: /*#__PURE__*/ C.createRef(),
			internalBackdropRef: /*#__PURE__*/ C.createRef(),
			outsidePressEnabledRef: { current: !0 },
			triggerElements: r,
			onOpenChange: void 0,
			onOpenChangeComplete: void 0
		}, hl);
	}
	setOpen = (e, t) => {
		if (t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(e, t);
		let n = { open: e };
		_c(n, e, t.trigger), this.update(n);
	};
	static useStore(t, n) {
		return hc(t, (t, r) => new e(n, t, r), !0).store;
	}
};
function _l(e = {}) {
	return {
		...Oc(),
		modal: !0,
		disablePointerDismissal: !1,
		popupElement: null,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: !1,
		nestedOpenDialogCount: 0,
		nestedOpenDrawerCount: 0,
		role: "dialog",
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/root/useRenderDialogRoot.mjs
function vl(e, t = "dialog") {
	let { children: n, open: r, defaultOpen: i = !1, onOpenChange: a, onOpenChangeComplete: o, disablePointerDismissal: s = !1, modal: c = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = e, p = t === "drawer", m = t === "alert-dialog", h = m ? !0 : c, g = m || s, _ = m ? "alertdialog" : "dialog", v = ml(!0), y = {
		modal: h,
		disablePointerDismissal: g,
		nested: !!v,
		role: _
	}, b = gl.useStore(u?.store, {
		open: i,
		openProp: r,
		activeTriggerId: f,
		triggerIdProp: d,
		...y
	});
	ut(() => {
		let e = r === void 0 && b.state.open === !1 && i === !0 ? {
			open: !0,
			activeTriggerId: f
		} : null;
		m ? b.update(e ? {
			...y,
			...e
		} : y) : e && b.update(e);
	}), b.useControlledProp("openProp", r), b.useControlledProp("triggerIdProp", d), b.useSyncedValues(y), b.useContextCallback("onOpenChange", a), b.useContextCallback("onOpenChangeComplete", o);
	let x = b.useState("open"), S = b.useState("mounted"), w = b.useState("payload");
	ul({
		store: b,
		actionsRef: l
	});
	let T = x || S, E = C.useMemo(() => ({ store: b }), [b]);
	return /*#__PURE__*/ (0, Y.jsx)(fl.Provider, {
		value: !1,
		children: /*#__PURE__*/ (0, Y.jsxs)(pl.Provider, {
			value: E,
			children: [T && /*#__PURE__*/ (0, Y.jsx)(dl, {
				store: b,
				parentContext: v?.store.context,
				isDrawer: p
			}), typeof n == "function" ? n({ payload: w }) : n]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/alert-dialog/root/AlertDialogRoot.mjs
function yl(e) {
	return vl(e, "alert-dialog");
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popupStateMapping.mjs
var bl = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = sc.startingStyle] = "startingStyle", e[e.endingStyle = sc.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e.side = "data-side", e.align = "data-align", e;
}({}), xl = /*#__PURE__*/ function(e) {
	return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
}({}), Sl = { [xl.popupOpen]: "" }, Cl = {
	[xl.popupOpen]: "",
	[xl.pressed]: ""
}, wl = { [bl.open]: "" }, Tl = { [bl.closed]: "" }, El = { [bl.anchorHidden]: "" }, Dl = { open(e) {
	return e ? Sl : null;
} }, Ol = { open(e) {
	return e ? Cl : null;
} }, kl = {
	open(e) {
		return e ? wl : Tl;
	},
	anchorHidden(e) {
		return e ? El : null;
	}
}, Al = {
	...kl,
	...uc
}, jl = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, forceRender: a = !1, ...o } = e, { store: s } = ml(), c = s.useState("open"), l = s.useState("nested"), u = s.useState("mounted");
	return Q("div", e, {
		state: {
			open: c,
			transitionStatus: s.useState("transitionStatus")
		},
		ref: [s.context.backdropRef, t],
		stateAttributesMapping: Al,
		props: [{
			role: "presentation",
			hidden: !u,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, o],
		enabled: a || !l
	});
}), Ml = /*#__PURE__*/ C.createContext(void 0);
function Nl(e = !1) {
	let t = C.useContext(Ml);
	if (t === void 0 && !e) throw Error(la(16));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Pl(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: C.useMemo(() => {
		let e = { onKeyDown(e) {
			n && t && e.key !== "Tab" && e.preventDefault();
		} };
		return r || (e.tabIndex = i, !a && n && (e.tabIndex = t ? i : -1)), (a && (t || o) || !a && n) && (e["aria-disabled"] = n), a && (!t || s) && (e.disabled = n), e;
	}, [
		r,
		n,
		t,
		o,
		s,
		a,
		i
	]) };
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/use-button/useButton.mjs
function Fl(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = C.useRef(null), s = Nl(!0), c = a ?? s !== void 0, { props: l } = Pl({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = C.useCallback(() => {
		let e = o.current;
		Il(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return X(u, [u]), {
		getButtonProps: C.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return va({
				onClick(e) {
					if (t) {
						e.preventDefault();
						return;
					}
					n?.(e);
				},
				onMouseDown(e) {
					t || r?.(e);
				},
				onKeyDown(e) {
					if (t || (ka(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let r = e.target === e.currentTarget, a = e.currentTarget, s = Il(a), l = !i && Ll(a), u = r && (i ? s : !l), d = e.key === "Enter", f = e.key === " ", p = a.getAttribute("role"), m = p?.startsWith("menuitem") || p === "option" || p === "gridcell";
					if (r && c && f) {
						if (e.defaultPrevented && m) return;
						e.preventDefault(), l || i && s ? (a.click(), e.preventBaseUIHandler()) : u && (n?.(e), e.preventBaseUIHandler());
						return;
					}
					u && (!i && (f || d) && e.preventDefault(), !i && d && n?.(e));
				},
				onKeyUp(e) {
					if (!t) {
						if (ka(e), a?.(e), e.target === e.currentTarget && i && c && Il(e.currentTarget) && e.key === " ") {
							e.preventDefault();
							return;
						}
						e.baseUIHandlerPrevented || e.target === e.currentTarget && !i && !c && e.key === " " && n?.(e);
					}
				},
				onPointerDown(e) {
					if (t) {
						e.preventDefault();
						return;
					}
					s?.(e);
				}
			}, i ? { type: "button" } : { role: "button" }, l, u);
		}, [
			t,
			l,
			c,
			i
		]),
		buttonRef: Z((e) => {
			o.current = e, u();
		})
	};
}
function Il(e) {
	return _t(e) && e.tagName === "BUTTON";
}
function Ll(e) {
	return !!(e?.tagName === "A" && e?.href);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/close/DialogClose.mjs
var Rl = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, ...s } = e, { store: c } = ml(), l = c.useState("open"), { getButtonProps: u, buttonRef: d } = Fl({
		disabled: a,
		native: o
	}), f = { disabled: a };
	function p(e) {
		l && c.setOpen(!1, hr(nr, e.nativeEvent));
	}
	return Q("button", e, {
		state: f,
		ref: [t, d],
		props: [
			{ onClick: p },
			s,
			u
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useBaseUiId.mjs
function zl(e) {
	return sa(e, "base-ui");
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/description/DialogDescription.mjs
var Bl = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, { store: s } = ml(), c = zl(a);
	return s.useSyncedValueWithCleanup("descriptionElementId", c), Q("p", e, {
		ref: t,
		props: [{ id: c }, o]
	});
}), Vl = /*#__PURE__*/ function(e) {
	return e.nestedDialogs = "--nested-dialogs", e;
}({}), Hl = function(e) {
	return e[e.open = bl.open] = "open", e[e.closed = bl.closed] = "closed", e[e.startingStyle = bl.startingStyle] = "startingStyle", e[e.endingStyle = bl.endingStyle] = "endingStyle", e.nested = "data-nested", e.nestedDialogOpen = "data-nested-dialog-open", e;
}({}), Ul = /*#__PURE__*/ C.createContext(void 0);
function Wl() {
	let e = C.useContext(Ul);
	if (e === void 0) throw Error(la(26));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/composite.mjs
var Gl = "ArrowUp", Kl = "ArrowDown", ql = "ArrowLeft", Jl = "ArrowRight", Yl = "Home", Xl = "PageUp", Zl = "PageDown", Ql = /* @__PURE__ */ new Set([ql, Jl]), $l = /* @__PURE__ */ new Set([
	ql,
	Jl,
	Yl,
	"End"
]), eu = /* @__PURE__ */ new Set([Gl, Kl]), tu = /* @__PURE__ */ new Set([
	Gl,
	Kl,
	Yl,
	"End"
]), nu = /* @__PURE__ */ new Set([...Ql, ...eu]), ru = /* @__PURE__ */ new Set([
	...nu,
	Yl,
	"End"
]), iu = "Shift", au = /* @__PURE__ */ new Set([
	iu,
	"Control",
	"Alt",
	"Meta"
]);
function ou(e) {
	return _t(e) && e.tagName === "INPUT";
}
function su(e) {
	return !!(ou(e) && e.selectionStart != null || _t(e) && e.tagName === "TEXTAREA");
}
function cu(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = lu(e, t, "left"), a = uu(e), o = uu(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginRight < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = lu(e, t, "top"), r = uu(e), i = uu(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function lu(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function uu(e) {
	let t = getComputedStyle(e);
	return {
		scrollMarginTop: parseFloat(t.scrollMarginTop) || 0,
		scrollMarginRight: parseFloat(t.scrollMarginRight) || 0,
		scrollMarginBottom: parseFloat(t.scrollMarginBottom) || 0,
		scrollMarginLeft: parseFloat(t.scrollMarginLeft) || 0,
		scrollPaddingTop: parseFloat(t.scrollPaddingTop) || 0,
		scrollPaddingRight: parseFloat(t.scrollPaddingRight) || 0,
		scrollPaddingBottom: parseFloat(t.scrollPaddingBottom) || 0,
		scrollPaddingLeft: parseFloat(t.scrollPaddingLeft) || 0
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/popup/DialogPopup.mjs
var du = {
	...kl,
	...uc,
	nestedDialogOpen(e) {
		return e ? { [Hl.nestedDialogOpen]: "" } : null;
	}
}, fu = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, initialFocus: o, ...s } = e, { store: c } = ml(), l = c.useState("descriptionElementId"), u = c.useState("disablePointerDismissal"), d = c.useState("floatingRootContext"), f = c.useState("popupProps"), p = c.useState("modal"), m = c.useState("mounted"), h = c.useState("nested"), g = c.useState("nestedOpenDialogCount"), _ = c.useState("open"), v = c.useState("openMethod"), y = c.useState("titleElementId"), b = c.useState("transitionStatus"), x = c.useState("role"), S = d.useState("floatingId"), C = s.id ?? S;
	Wl(), fc({
		open: _,
		ref: c.context.popupRef,
		onComplete() {
			_ && c.context.onOpenChangeComplete?.(!0);
		}
	});
	let w = o === void 0 ? mc(c.context.popupRef) : o, T = g > 0, E = c.useStateSetter("popupElement"), D = Q("div", e, {
		state: {
			open: _,
			nested: h,
			transitionStatus: b,
			nestedDialogOpen: T
		},
		props: [
			f,
			{
				id: C,
				"aria-labelledby": y ?? void 0,
				"aria-describedby": l ?? void 0,
				role: x,
				...pc,
				hidden: !m,
				onKeyDown(e) {
					ru.has(e.key) && e.stopPropagation();
				},
				style: { [Vl.nestedDialogs]: g }
			},
			s
		],
		ref: [
			t,
			c.context.popupRef,
			E
		],
		stateAttributesMapping: du
	});
	return /*#__PURE__*/ (0, Y.jsx)(po, {
		context: d,
		openInteractionType: v,
		disabled: !m,
		closeOnFocusOut: !u,
		initialFocus: w,
		returnFocus: a,
		modal: p !== !1,
		restoreFocus: "popup",
		children: D
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/inertValue.mjs
function pu(e) {
	return da(19) ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var mu = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, Y.jsx)("div", {
		ref: t,
		role: "presentation",
		"data-base-ui-inert": "",
		...r,
		style: {
			position: "fixed",
			inset: 0,
			userSelect: "none",
			WebkitUserSelect: "none",
			clipPath: i
		}
	});
}), hu = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = ml(), a = i.useState("mounted"), o = i.useState("modal"), s = i.useState("open");
	return a || n ? /*#__PURE__*/ (0, Y.jsx)(Ul.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsxs)(qa, {
			ref: t,
			...r,
			children: [a && o === !0 && /*#__PURE__*/ (0, Y.jsx)(mu, {
				ref: i.context.internalBackdropRef,
				inert: pu(!s)
			}), e.children]
		})
	}) : null;
}), gu = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, { store: s } = ml(), c = zl(a);
	return s.useSyncedValueWithCleanup("titleElementId", c), Q("h2", e, {
		ref: t,
		props: [{ id: c }, o]
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function _u(e) {
	let t = C.useRef(""), n = C.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: C.useCallback((n) => {
			if (n.detail === 0) {
				e(n, "keyboard");
				return;
			}
			"pointerType" in n ? e(n, n.pointerType) : e(n, t.current), t.current = "";
		}, [e]),
		onPointerDown: n
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useValueChanged.mjs
function vu(e, t) {
	let n = C.useRef(e), r = Z(t);
	X(() => {
		n.current !== e && r(n.current);
	}, [e, r]), X(() => {
		n.current = e;
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function yu(e, t) {
	let { onClick: n, onPointerDown: r } = _u(Z((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Ut ? "touch" : ""));
	}));
	return C.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function bu(e) {
	let [t, n] = C.useState(null), r = yu(e, n);
	return vu(e, (t) => {
		t && !e && n(null);
	}), C.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/button/Button.mjs
var xu = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Fl({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return Q("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), Su = S("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Cu({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(xu, {
		"data-slot": "button",
		className: J(Su({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/platform/overlay-container.tsx
var wu = (0, C.createContext)(null);
function Tu(e) {
	return e instanceof ShadowRoot ? e.host.isConnected : e.isConnected;
}
function Eu(e) {
	if (!Tu(e.container)) throw Error("SSUI_V2_OVERLAY_DISCONNECTED: the overlay container is not connected.");
	if (e.container.getRootNode() !== e.expectedRoot) throw Error("SSUI_V2_OVERLAY_WRONG_ROOT: the overlay container escaped its component root.");
}
function Du(e) {
	(0, C.useLayoutEffect)(() => {
		let t = () => {
			e.querySelectorAll("[data-base-ui-focus-guard][role=\"button\"]:not([aria-label])").forEach((e) => {
				e.setAttribute("aria-label", "Focus boundary");
			});
		}, n = new MutationObserver(t);
		return n.observe(e, {
			attributeFilter: ["role"],
			attributes: !0,
			childList: !0,
			subtree: !0
		}), t(), () => {
			n.disconnect();
		};
	}, [e]);
}
function Ou(e) {
	(0, C.useLayoutEffect)(() => {
		if (!(e instanceof HTMLElement) || e.getAttribute("popover") !== "manual") return;
		if (typeof e.showPopover != "function" || typeof e.hidePopover != "function") throw Error("SSUI_V2_POPOVER_API_MISSING: anchored overlays require the native Popover API.");
		let t = () => {
			let t = e.matches(":popover-open"), n = e.querySelector("[data-open]:not([hidden])") !== null;
			n && !t ? e.showPopover() : !n && t && e.hidePopover();
		}, n = new MutationObserver(t);
		return n.observe(e, {
			attributeFilter: [
				"data-closed",
				"data-open",
				"hidden"
			],
			attributes: !0,
			childList: !0,
			subtree: !0
		}), t(), () => {
			n.disconnect(), e.matches(":popover-open") && e.hidePopover();
		};
	}, [e]);
}
function ku({ children: e, container: t, expectedRoot: n }) {
	let r = (0, C.useMemo)(() => ({
		container: t,
		expectedRoot: n
	}), [t, n]);
	return Eu(r), Du(n), Ou(t), /* @__PURE__ */ (0, Y.jsx)(wu.Provider, {
		value: r,
		children: e
	});
}
function Au() {
	let e = (0, C.useContext)(wu);
	if (!e) throw Error("SSUI_V2_OVERLAY_PROVIDER_MISSING: generated shadcn overlays require an OverlayContainerProvider.");
	return Eu(e), e.container;
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
function ju({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(yl, {
		"data-slot": "alert-dialog",
		...e
	});
}
function Mu({ ...e }) {
	let t = Au();
	return /* @__PURE__ */ (0, Y.jsx)(hu, {
		"data-slot": "alert-dialog-portal",
		...e,
		container: t
	});
}
function Nu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(jl, {
		"data-slot": "alert-dialog-overlay",
		className: J("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", e),
		...t
	});
}
function Pu({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Mu, { children: [/* @__PURE__ */ (0, Y.jsx)(Nu, {}), /* @__PURE__ */ (0, Y.jsx)(fu, {
		"data-slot": "alert-dialog-content",
		"data-size": t,
		className: J("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
		...n
	})] });
}
function Fu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: J("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", e),
		...t
	});
}
function Iu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: J("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function Lu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(gu, {
		"data-slot": "alert-dialog-title",
		className: J("cn-font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", e),
		...t
	});
}
function Ru({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Bl, {
		"data-slot": "alert-dialog-description",
		className: J("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", e),
		...t
	});
}
function zu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Cu, {
		"data-slot": "alert-dialog-action",
		className: J(e),
		...t
	});
}
function Bu({ className: e, variant: t = "outline", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(Rl, {
		"data-slot": "alert-dialog-cancel",
		className: J(e),
		render: /* @__PURE__ */ (0, Y.jsx)(Cu, {
			variant: t,
			size: n
		}),
		...r
	});
}
//#endregion
//#region src/platform/modal-layer.ts
var Vu = 0, Hu = null, Uu = 0, Wu = () => {}, Gu = [
	"a[href]",
	"button",
	"input",
	"select",
	"textarea",
	"[tabindex]"
].join(",");
function Ku(e) {
	if (!e || !e.isConnected || e.hasAttribute("disabled") || e.closest("[inert]")) return null;
	if (e.matches(Gu) && e.tabIndex >= 0) return e;
	let t = e.closest(Gu);
	return t && t.tabIndex >= 0 ? t : null;
}
function qu(e) {
	for (let t of e.composedPath()) if (t instanceof HTMLElement) return Ku(t);
	return null;
}
function Ju(e) {
	if (Vu += 1, Vu === 1) {
		let t = (e) => {
			$u().ownerCount() === 0 && (Hu = qu(e), Uu = Date.now());
		}, n = (e) => {
			$u().ownerCount() === 0 && (e.key === "Enter" || e.key === " ") && (Hu = qu(e), Uu = Date.now());
		};
		e.addEventListener("pointerdown", t, !0), e.addEventListener("keydown", n, !0), Wu = () => {
			e.removeEventListener("pointerdown", t, !0), e.removeEventListener("keydown", n, !0);
		};
	}
	let t = !1;
	return () => {
		t || (t = !0, --Vu, Vu === 0 && (Wu(), Wu = () => {}, Hu = null, Uu = 0));
	};
}
function Yu(e, t, n) {
	n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Xu(e) {
	if (!e) return () => {};
	let t = e.getRootNode(), n = t instanceof ShadowRoot && t.host instanceof HTMLElement ? t.host : e, r = [], i = /* @__PURE__ */ new Set();
	for (; n;) {
		let e = n.parentElement;
		if (e) {
			for (let t of e.children) {
				if (t === n || !(t instanceof HTMLElement) || t.tagName === "SCRIPT" || t.tagName === "STYLE" || i.has(t)) continue;
				i.add(t);
				let e = t.hasAttribute("inert");
				r.push({
					element: t,
					hadAttribute: e,
					value: t.getAttribute("inert")
				}), e || t.setAttribute("inert", "");
			}
			if (e === document.body) break;
			n = e;
			continue;
		}
		let t = n.getRootNode();
		n = t instanceof ShadowRoot && t.host instanceof HTMLElement ? t.host : null;
	}
	return () => {
		for (let e of r) e.hadAttribute ? e.element.setAttribute("inert", e.value ?? "") : e.element.removeAttribute("inert");
	};
}
function Zu() {
	let e = [], t, n = null, r = 0, i = () => {}, a = () => {
		let t = n, i = ++r;
		t && setTimeout(() => {
			setTimeout(() => {
				e.length === 0 && i === r && n === t && (Yu(document.documentElement, "style", t.html), Yu(document.body, "style", t.body), n = null);
			}, 0);
		}, 0);
	}, o = () => {
		let n = e.at(-1), r = n?.owner, a = r !== t;
		a && (i(), i = () => {}, t = r);
		for (let t of e) {
			let e = t.owner === r;
			t.active !== e && (t.active = e, t.listener(e));
		}
		n && a && (i = Xu(n.boundary()));
	};
	return {
		acquire(t, i, s = () => null) {
			e.length === 0 && n === null && (n = {
				body: document.body.getAttribute("style"),
				html: document.documentElement.getAttribute("style")
			}), r += 1;
			let c = e.findIndex((e) => e.owner === t);
			c >= 0 && e.splice(c, 1), e.push({
				active: !1,
				boundary: s,
				listener: i,
				owner: t
			}), o();
			let l = !1;
			return () => {
				if (l) return;
				l = !0;
				let n = e.findIndex((e) => e.owner === t);
				n >= 0 && (e.splice(n, 1), o(), e.length === 0 && a());
			};
		},
		ownerCount() {
			return e.length;
		}
	};
}
var Qu = "__streamlit_shadcn_ui_v2_modal_layer_v1__";
function $u() {
	let e = globalThis;
	return e[Qu] || Object.defineProperty(e, Qu, {
		configurable: !1,
		enumerable: !1,
		value: Zu(),
		writable: !1
	}), e[Qu];
}
function ed(e, t) {
	let n = (0, C.useRef)(Symbol("ssui-v2-modal-owner")), [r, i] = (0, C.useState)(!1);
	return (0, C.useLayoutEffect)(() => Ju(t.current?.ownerDocument ?? document), [t]), (0, C.useLayoutEffect)(() => {
		if (!e) {
			i(!1);
			return;
		}
		return $u().acquire(n.current, i, () => t.current);
	}, [t, e]), e && r;
}
function td(e = document) {
	let t = e.activeElement;
	for (; t instanceof HTMLElement && t.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t instanceof HTMLElement ? t : null;
}
function nd() {
	let e = Ku(td()), t = e?.getRootNode(), n = t instanceof ShadowRoot && t.querySelector("[data-ssui-component='alert-dialog'][data-modal-active='true']") !== null;
	return e && n ? e : (Date.now() - Uu <= 5e3 ? Ku(Hu) : null) ?? e;
}
//#endregion
//#region src/components/streamlit/alert-dialog.tsx
function rd({ envelope: e, setTriggerValue: t }) {
	let { openRequestId: n, resolvedRequestId: r, show: i } = e.props, [a, o] = (0, C.useState)(r), s = (0, C.useRef)(r), c = (0, C.useRef)(0), l = (0, C.useRef)(null), u = (0, C.useRef)(null), d = (0, C.useRef)(null), f = i && n > r && n > a;
	(0, C.useLayoutEffect)(() => {
		r > s.current && (s.current = r);
	}, [r]), (0, C.useLayoutEffect)(() => {
		f && c.current !== n && (c.current = n, l.current = nd());
	}, [n, f]);
	let p = ed(f, d), m = (0, C.useCallback)((e) => {
		s.current >= n || (s.current = n, o(n), t("decision", e));
	}, [n, t]), h = (0, C.useCallback)(() => {
		let e = l.current;
		return !e?.isConnected || e;
	}, []);
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "size-0 overflow-visible",
		"data-modal-active": p ? "true" : "false",
		"data-ssui-component": "alert-dialog",
		"data-testid": "ssui-v2-alert-dialog",
		ref: d,
		children: /* @__PURE__ */ (0, Y.jsx)(ju, {
			onOpenChange: (e) => {
				!e && p && m(!1);
			},
			open: p,
			children: /* @__PURE__ */ (0, Y.jsxs)(Pu, {
				"data-testid": "ssui-v2-alert-dialog-content",
				finalFocus: h,
				initialFocus: u,
				children: [/* @__PURE__ */ (0, Y.jsxs)(Fu, { children: [/* @__PURE__ */ (0, Y.jsx)(Lu, { children: e.props.title }), /* @__PURE__ */ (0, Y.jsx)(Ru, { children: e.props.description })] }), /* @__PURE__ */ (0, Y.jsxs)(Iu, { children: [/* @__PURE__ */ (0, Y.jsx)(Bu, {
					onClick: () => {
						m(!1);
					},
					ref: u,
					children: e.props.cancelLabel
				}), /* @__PURE__ */ (0, Y.jsx)(zu, {
					onClick: () => {
						m(!0);
					},
					children: e.props.confirmLabel
				})] })]
			})
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useControlled.mjs
function id({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = C.useRef(e !== void 0), [a, o] = C.useState(t);
	return [i ? e : a, C.useCallback((e) => {
		i || o(e);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var ad = /*#__PURE__*/ C.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
function od() {
	return C.useContext(ad);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function sd(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = Z(i), o = C.useRef(0), s = $t(ld).current, c = $t(cd).current, [l, u] = C.useState(0), d = C.useRef(l), f = Z((e, t) => {
		c.set(e, t ?? null), d.current += 1, u(d.current);
	}), p = Z((e) => {
		c.delete(e), d.current += 1, u(d.current);
	}), m = C.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return Array.from(c.keys()).filter((e) => e.isConnected).sort(ud).forEach((t, n) => {
			let r = c.get(t) ?? {};
			e.set(t, {
				...r,
				index: n
			});
		}), e;
	}, [c, l]);
	X(() => {
		if (typeof MutationObserver != "function" || m.size === 0) return;
		let e = new MutationObserver((e) => {
			let t = /* @__PURE__ */ new Set(), n = (e) => t.has(e) ? t.delete(e) : t.add(e);
			e.forEach((e) => {
				e.removedNodes.forEach(n), e.addedNodes.forEach(n);
			}), t.size === 0 && (d.current += 1, u(d.current));
		});
		return m.forEach((t, n) => {
			n.parentElement && e.observe(n.parentElement, { childList: !0 });
		}), () => {
			e.disconnect();
		};
	}, [m]), X(() => {
		d.current === l && (n.current.length !== m.size && (n.current.length = m.size), r && r.current.length !== m.size && (r.current.length = m.size), o.current = m.size), a(m);
	}, [
		a,
		m,
		n,
		r,
		l
	]), X(() => () => {
		n.current = [];
	}, [n]), X(() => () => {
		r && (r.current = []);
	}, [r]);
	let h = Z((e) => (s.add(e), () => {
		s.delete(e);
	}));
	X(() => {
		s.forEach((e) => e(m));
	}, [s, m]);
	let g = C.useMemo(() => ({
		register: f,
		unregister: p,
		subscribeMapChange: h,
		elementsRef: n,
		labelsRef: r,
		nextIndexRef: o
	}), [
		f,
		p,
		h,
		n,
		r,
		o
	]);
	return /*#__PURE__*/ (0, Y.jsx)(ad.Provider, {
		value: g,
		children: t
	});
}
function cd() {
	return /* @__PURE__ */ new Map();
}
function ld() {
	return /* @__PURE__ */ new Set();
}
function ud(e, t) {
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var dd = /*#__PURE__*/ C.createContext(void 0);
function fd() {
	return C.useContext(dd)?.direction ?? "ltr";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/root/AccordionRootContext.mjs
var pd = /*#__PURE__*/ C.createContext(void 0);
function md() {
	let e = C.useContext(pd);
	if (e === void 0) throw Error(la(10));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/root/AccordionRoot.mjs
var hd = { value: () => null }, gd = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, hiddenUntilFound: a, keepMounted: o, loopFocus: s, onValueChange: c, multiple: l = !1, orientation: u = "vertical", value: d, defaultValue: f, style: p, ...m } = e, h = fd(), g = C.useMemo(() => {
		if (d === void 0) return f ?? [];
	}, [d, f]), _ = C.useRef([]), [v, y] = id({
		controlled: d,
		default: g,
		name: "Accordion",
		state: "value"
	}), b = Z((e, t, n) => {
		if (!l) {
			let t = v[0] === e ? [] : [e];
			if (c?.(t, n), n.isCanceled) return;
			y(t);
		} else if (t) {
			let t = v.slice();
			if (t.push(e), c?.(t, n), n.isCanceled) return;
			y(t);
		} else {
			let t = v.filter((t) => t !== e);
			if (c?.(t, n), n.isCanceled) return;
			y(t);
		}
	}), x = C.useMemo(() => ({
		value: v,
		disabled: i,
		orientation: u
	}), [
		v,
		i,
		u
	]), S = C.useMemo(() => ({
		disabled: i,
		handleValueChange: b,
		hiddenUntilFound: a ?? !1,
		keepMounted: o ?? !1,
		state: x,
		value: v
	}), [
		i,
		b,
		a,
		o,
		x,
		v
	]), w = Q("div", e, {
		state: x,
		ref: t,
		props: [{ dir: h }, m],
		stateAttributesMapping: hd
	});
	return /*#__PURE__*/ (0, Y.jsx)(pd.Provider, {
		value: S,
		children: /*#__PURE__*/ (0, Y.jsx)(sd, {
			elementsRef: _,
			children: w
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs
function _d(e) {
	let { open: t, defaultOpen: n, onOpenChange: r, disabled: i } = e, [a, o] = id({
		controlled: t,
		default: n,
		name: "Collapsible",
		state: "open"
	}), { mounted: s, setMounted: c, transitionStatus: l } = oc(a, !0, !0), u = zl(), [d, f] = C.useState(), p = d ?? u, m = Z((e) => {
		let t = !a, n = hr(Zn, e.nativeEvent);
		r(t, n), !n.isCanceled && o(t);
	});
	return C.useMemo(() => ({
		disabled: i,
		handleTrigger: m,
		mounted: s,
		open: a,
		panelId: p,
		setMounted: c,
		setOpen: o,
		setPanelIdState: f,
		transitionStatus: l
	}), [
		i,
		m,
		s,
		a,
		p,
		c,
		o,
		f,
		l
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/root/CollapsibleRootContext.mjs
var vd = /*#__PURE__*/ C.createContext(void 0);
function yd() {
	let e = C.useContext(vd);
	if (e === void 0) throw Error(la(15));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
var bd = /*#__PURE__*/ function(e) {
	return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
}({});
function xd(e = {}) {
	let { label: t, metadata: n, textRef: r, indexGuessBehavior: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, elementsRef: l, labelsRef: u, nextIndexRef: d } = od(), f = C.useRef(-1), [p, m] = C.useState(a ?? (i === bd.GuessFromOrder ? () => {
		if (f.current === -1) {
			let e = d.current;
			d.current += 1, f.current = e;
		}
		return f.current;
	} : -1)), h = C.useRef(null), g = C.useCallback((e) => {
		if (h.current = e, p !== -1 && e !== null && (l.current[p] = e, u)) {
			let n = t !== void 0;
			u.current[p] = n ? t : r?.current?.textContent ?? e.textContent;
		}
	}, [
		p,
		l,
		u,
		t,
		r
	]);
	return X(() => {
		if (a != null) return;
		let e = h.current;
		if (e) return o(e, n), () => {
			s(e);
		};
	}, [
		a,
		o,
		s,
		n
	]), X(() => {
		if (a == null) return c((e) => {
			let t = h.current ? e.get(h.current)?.index : null;
			t != null && m(t);
		});
	}, [
		a,
		c,
		m
	]), {
		ref: g,
		index: p
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/item/AccordionItemContext.mjs
var Sd = /*#__PURE__*/ C.createContext(void 0);
function Cd() {
	let e = C.useContext(Sd);
	if (e === void 0) throw Error(la(9));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/panel/CollapsiblePanelDataAttributes.mjs
var wd = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = sc.startingStyle] = "startingStyle", e[e.endingStyle = sc.endingStyle] = "endingStyle", e;
}({}), Td = /*#__PURE__*/ function(e) {
	return e.panelOpen = "data-panel-open", e;
}({}), Ed = { [wd.open]: "" }, Dd = { [wd.closed]: "" }, Od = { open(e) {
	return e ? { [Td.panelOpen]: "" } : null;
} }, kd = { open(e) {
	return e ? Ed : Dd;
} }, Ad = /*#__PURE__*/ function(e) {
	return e.index = "data-index", e.disabled = "data-disabled", e.open = "data-open", e;
}({}), jd = {
	...kd,
	index: (e) => Number.isInteger(e) ? { [Ad.index]: String(e) } : null,
	...uc,
	value: () => null
}, Md = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, onOpenChange: i, render: a, value: o, style: s, ...c } = e, { ref: l, index: u } = xd(), d = vr(t, l), { disabled: f, handleValueChange: p, state: m, value: h } = md(), g = zl(), _ = o ?? g, v = r || f, y = C.useMemo(() => {
		if (!h) return !1;
		for (let e = 0; e < h.length; e += 1) if (h[e] === _) return !0;
		return !1;
	}, [h, _]), b = Z((e, t) => {
		i?.(e, t), !t.isCanceled && p(_, e, t);
	}), x = _d({
		open: y,
		onOpenChange: b,
		disabled: v
	}), S = C.useMemo(() => ({
		open: x.open,
		disabled: x.disabled,
		transitionStatus: x.transitionStatus
	}), [
		x.open,
		x.disabled,
		x.transitionStatus
	]), w = C.useMemo(() => ({
		...x,
		onOpenChange: b,
		state: S
	}), [
		x,
		S,
		b
	]), T = C.useMemo(() => ({
		...m,
		hidden: !y && !x.mounted,
		index: u,
		disabled: v,
		open: y
	}), [
		x.mounted,
		v,
		u,
		y,
		m
	]), E = zl(), [D, O] = C.useState(), k = C.useMemo(() => ({
		open: y,
		state: T,
		setTriggerId: O,
		triggerId: D ?? E
	}), [
		E,
		y,
		T,
		O,
		D
	]), A = Q("div", e, {
		state: T,
		ref: d,
		props: c,
		stateAttributesMapping: jd
	});
	return /*#__PURE__*/ (0, Y.jsx)(vd.Provider, {
		value: w,
		children: /*#__PURE__*/ (0, Y.jsx)(Sd.Provider, {
			value: k,
			children: A
		})
	});
}), Nd = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = Cd();
	return Q("h3", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: jd
	});
}), Pd = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { disabled: n, className: r, id: i, render: a, nativeButton: o = !0, style: s, ...c } = e, { panelId: l, open: u, handleTrigger: d, disabled: f } = yd(), { getButtonProps: p, buttonRef: m } = Fl({
		disabled: n || f,
		focusableWhenDisabled: !0,
		native: o
	}), { state: h, setTriggerId: g, triggerId: _ } = Cd();
	return X(() => (i && g(i), () => {
		g(void 0);
	}), [i, g]), Q("button", e, {
		state: h,
		ref: [t, m],
		props: [
			{
				"aria-controls": u ? l : void 0,
				"aria-expanded": u,
				id: _,
				onClick: d
			},
			c,
			p
		],
		stateAttributesMapping: Od
	});
}), Fd = {
	height: void 0,
	width: void 0
};
function Id(e) {
	let { externalRef: t, hiddenUntilFound: n, id: r, keepMounted: i, mounted: a, onOpenChange: o, open: s, setMounted: c, setOpen: l, transitionStatus: u } = e, d = C.useRef(null), f = C.useRef(null), [p, m] = C.useState(Fd), h = C.useRef(Fd), g = C.useRef(!1), _ = C.useRef(s), v = C.useRef(!1), [y, b] = C.useState(!1), x = C.useRef(null), S = vr(t, d), w = wr({
		mounted: a,
		open: s
	}), T = dc(d, !1, !1), E = !s && !a, D = y ? "idle" : u, O = s && (_.current || v.current), k = !s && a && f.current === "css-animation" && p.height === void 0 && p.width === void 0 ? h.current : p, A = n && E && f.current !== "css-animation", j = Z((e, t = !0) => {
		t && (h.current = e), m(e);
	}), M = Z(() => {
		x.current?.(), x.current = null;
	}), N = Z((e) => {
		M(), x.current = () => {
			x.current = null, e();
		};
	}), P = Z(() => {
		s && a && f.current === "css-animation" && (v.current = !0);
	});
	X(() => {
		!y || u === "starting" || b(!1);
	}, [y, u]), C.useEffect(() => () => {
		P(), M();
	}, [P, M]), X(() => {
		let e = d.current;
		if (!e) return;
		!s && x.current && M();
		let t = Rd(e, O);
		if (f.current = t, s && u === "idle" && _.current && t === "css-animation") {
			h.current = Ld(e);
			return;
		}
		if (s && u === "starting") {
			let n = g.current;
			if (g.current = !1, t === "none") {
				j(Ld(e)), b(!0);
				return;
			}
			if (t === "css-transition") {
				let t = Vd(e);
				if (j(Ld(e)), !n) return t;
				let r = Bd(e, "transition-duration", "0s");
				return N(r), b(!0), t;
			}
			if (t === "css-animation") {
				if (j(Ld(e)), !n) {
					Bd(e, "animation-name", "none")();
					return;
				}
				let t = Bd(e, "animation-name", "none"), r = Bd(e, "animation-duration", "0s");
				t(), N(r), b(!0);
				return;
			}
		}
		if (!s && a && (u === "idle" || u === "starting")) {
			if (_.current = !1, v.current = !1, t === "none") {
				j(Fd, !1), c(!1);
				return;
			}
			j(Ld(e));
			return;
		}
		if (u !== "ending") return;
		if (t === "none") {
			c(!1);
			return;
		}
		let n = Ld(e);
		if (!((n.height ?? 0) > 0 || (n.width ?? 0) > 0)) {
			c(!1);
			return;
		}
		j(n), t === "css-animation" && Bd(e, "animation-name", "none")();
	}, [
		a,
		s,
		M,
		j,
		c,
		N,
		O,
		u
	]), fc({
		enabled: s && a && D === "idle",
		open: !0,
		ref: d,
		onComplete() {
			s && j(Fd, !1);
		}
	}), C.useEffect(() => {
		if (s || !a || D !== "ending" || !d.current) return;
		let e = new AbortController(), t = -1;
		function n() {
			w.current.open || (c(!1), j(Fd, !1));
		}
		return t = cn.request(() => {
			e.signal.aborted || T(n, e.signal);
		}), () => {
			cn.cancel(t), e.abort();
		};
	}, [
		w,
		a,
		s,
		D,
		T,
		j,
		c
	]), X(() => {
		let e = d.current;
		!e || !n || !E || e.setAttribute("hidden", "until-found");
	}, [E, n]), C.useEffect(function() {
		let e = d.current;
		if (!e) return;
		function t(e) {
			let t = hr(Xn, e);
			o(!0, t), !t.isCanceled && (g.current = !0, l(!0));
		}
		return It(e, "beforematch", t);
	}, [o, l]);
	let F = i || n || a || s;
	return {
		height: k.height,
		props: {
			...A ? { [wd.startingStyle]: "" } : void 0,
			hidden: E,
			id: r
		},
		ref: S,
		shouldPreventOpenAnimation: O,
		shouldRender: F,
		transitionStatus: D,
		width: k.width
	};
}
function Ld(e) {
	return {
		height: e.scrollHeight,
		width: e.scrollWidth
	};
}
function Rd(e, t = !1) {
	let n = pt(e).getComputedStyle(e), r = (n.animationName.split(",").map((e) => e.trim()).some((e) => e !== "" && e !== "none") || t) && zd(n.animationDuration), i = zd(n.transitionDuration);
	return r && i || i ? "css-transition" : r ? "css-animation" : "none";
}
function zd(e) {
	return e.split(",").map((e) => e.trim()).some((e) => e !== "" && Number.parseFloat(e) > 0);
}
function Bd(e, t, n) {
	let r = e.style.getPropertyValue(t), i = e.style.getPropertyPriority(t);
	return e.style.setProperty(t, n), () => {
		if (r === "") {
			e.style.removeProperty(t);
			return;
		}
		e.style.setProperty(t, r, i);
	};
}
function Vd(e) {
	let t = {
		"justify-content": e.style.justifyContent,
		"align-items": e.style.alignItems,
		"align-content": e.style.alignContent,
		"justify-items": e.style.justifyItems
	};
	Object.keys(t).forEach((t) => {
		e.style.setProperty(t, "initial", "important");
	});
	function n() {
		Object.entries(t).forEach(([t, n]) => {
			if (n === "") {
				e.style.removeProperty(t);
				return;
			}
			e.style.setProperty(t, n);
		});
	}
	let r = cn.request(n);
	return () => {
		cn.cancel(r), n();
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/panel/AccordionPanelCssVars.mjs
var Hd = /*#__PURE__*/ function(e) {
	return e.accordionPanelHeight = "--accordion-panel-height", e.accordionPanelWidth = "--accordion-panel-width", e;
}({}), Ud = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, hiddenUntilFound: r, keepMounted: i, id: a, render: o, style: s, ...c } = e, { hiddenUntilFound: l, keepMounted: u } = md(), { mounted: d, onOpenChange: f, open: p, panelId: m, setMounted: h, setOpen: g, setPanelIdState: _, transitionStatus: v } = yd(), y = r ?? l, b = i ?? u;
	X(() => {
		if (a) return _(a), () => {
			_(void 0);
		};
	}, [a, _]);
	let { height: x, props: S, ref: C, shouldPreventOpenAnimation: w, shouldRender: T, transitionStatus: E, width: D } = Id({
		externalRef: t,
		hiddenUntilFound: y,
		id: a ?? m,
		keepMounted: b,
		mounted: d,
		onOpenChange: f,
		open: p,
		setMounted: h,
		setOpen: g,
		transitionStatus: v
	}), { state: O, triggerId: k } = Cd(), A = {
		...O,
		transitionStatus: E
	}, j = ga(s, A), M = Q("div", {
		...e,
		style: void 0
	}, {
		state: A,
		ref: C,
		props: [
			S,
			{
				"aria-labelledby": k,
				role: "region",
				style: {
					[Hd.accordionPanelHeight]: x === void 0 ? "auto" : `${x}px`,
					[Hd.accordionPanelWidth]: D === void 0 ? "auto" : `${D}px`
				}
			},
			c,
			j ? { style: j } : void 0,
			w ? { style: { animationName: "none" } } : void 0
		],
		stateAttributesMapping: jd
	});
	return T ? M : null;
}), Wd = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Gd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Kd = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), qd = (e) => {
	let t = Kd(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Jd = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Yd = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Xd = (0, C.createContext)({}), Zd = () => (0, C.useContext)(Xd), Qd = (0, C.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = Zd() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, C.createElement)("svg", {
		ref: c,
		...Jd,
		width: t ?? l ?? Jd.width,
		height: t ?? l ?? Jd.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: Wd("lucide", p, i),
		...!a && !Yd(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, C.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), $d = (e, t) => {
	let n = (0, C.forwardRef)(({ className: n, ...r }, i) => (0, C.createElement)(Qd, {
		ref: i,
		iconNode: t,
		className: Wd(`lucide-${Gd(qd(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = qd(e), n;
}, ef = $d("bold", [["path", {
	d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	key: "mg9rjx"
}]]), tf = $d("calendar", [
	["path", {
		d: "M8 2v3",
		key: "1ioesn"
	}],
	["path", {
		d: "M16 2v3",
		key: "otl347"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}]
]), nf = $d("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), rf = $d("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), af = $d("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), of = $d("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), sf = $d("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), cf = $d("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), lf = $d("italic", [
	["line", {
		x1: "19",
		x2: "10",
		y1: "4",
		y2: "4",
		key: "15jd3p"
	}],
	["line", {
		x1: "14",
		x2: "5",
		y1: "20",
		y2: "20",
		key: "bu0au3"
	}],
	["line", {
		x1: "15",
		x2: "9",
		y1: "4",
		y2: "20",
		key: "uljnxc"
	}]
]), uf = $d("underline", [["path", {
	d: "M6 4v6a6 6 0 0 0 12 0V4",
	key: "9kb039"
}], ["line", {
	x1: "4",
	x2: "20",
	y1: "20",
	y2: "20",
	key: "nun2al"
}]]);
//#endregion
//#region src/components/ui/accordion.tsx
function df({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(gd, {
		"data-slot": "accordion",
		className: J("flex w-full flex-col", e),
		...t
	});
}
function ff({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Md, {
		"data-slot": "accordion-item",
		className: J("not-last:border-b", e),
		...t
	});
}
function pf({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Nd, {
		className: "flex",
		children: /* @__PURE__ */ (0, Y.jsxs)(Pd, {
			"data-slot": "accordion-trigger",
			className: J("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", e),
			...n,
			children: [
				t,
				/* @__PURE__ */ (0, Y.jsx)(rf, { className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
				/* @__PURE__ */ (0, Y.jsx)(sf, { className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
			]
		})
	});
}
function mf({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ud, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
		...n,
		children: /* @__PURE__ */ (0, Y.jsx)("div", {
			className: J("h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", e),
			children: t
		})
	});
}
//#endregion
//#region src/protocol/reconciliation.ts
function hf(e, t) {
	if (e.kind !== t.kind) throw Error("SSUI_V2_STATE_KIND_MISMATCH");
	return t.serverRevision > e.serverRevision ? {
		acknowledgeServerReset: !0,
		state: t
	} : t.serverRevision < e.serverRevision || t.clientRevision < e.clientRevision ? {
		acknowledgeServerReset: !1,
		state: e
	} : {
		acknowledgeServerReset: !1,
		state: t
	};
}
function gf(e, t) {
	return Object.is(e, t) ? !0 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((e, n) => Object.is(e, t[n])) : !1;
}
function _f(e, t) {
	let [n, r] = (0, C.useState)(e), i = (0, C.useRef)(n), a = (0, C.useRef)(e.serverRevision);
	return (0, C.useEffect)(() => {
		let n = hf(i.current, e);
		i.current = n.state, r(n.state), n.acknowledgeServerReset && e.serverRevision > a.current && (a.current = e.serverRevision, t("state", e));
	}, [
		e.clientRevision,
		e.kind,
		e.serverRevision,
		e.value,
		t
	]), {
		commit: (0, C.useCallback)((e) => {
			if (gf(i.current.value, e)) return;
			let n = {
				...i.current,
				value: e,
				clientRevision: i.current.clientRevision + 1
			};
			i.current = n, r(n), t("state", n);
		}, [t]),
		state: n
	};
}
function vf(e, t) {
	let { commit: n, state: r } = _f(e, t), [i, a] = (0, C.useState)(r.value);
	return (0, C.useEffect)(() => {
		a(r.value);
	}, [r.value]), {
		commit: n,
		commitDraft: () => {
			n(i);
		},
		draft: i,
		setDraft: a,
		state: r
	};
}
//#endregion
//#region src/components/streamlit/accordion.tsx
function yf({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsx)(df, {
		"aria-label": e.props.label,
		className: "rounded-lg border px-3",
		"data-ssui-component": "accordion",
		"data-testid": "ssui-v2-accordion",
		disabled: e.props.disabled,
		multiple: e.props.multiple,
		onValueChange: n,
		value: r.value,
		children: e.props.items.map((e) => /* @__PURE__ */ (0, Y.jsxs)(ff, {
			disabled: e.disabled,
			value: e.value,
			children: [/* @__PURE__ */ (0, Y.jsx)(pf, { children: e.label }), /* @__PURE__ */ (0, Y.jsx)(mf, { children: e.content })]
		}, e.value))
	});
}
//#endregion
//#region src/components/ui/aspect-ratio.tsx
function bf({ ratio: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "aspect-ratio",
		style: { "--ratio": e },
		className: J("relative aspect-(--ratio)", t),
		...n
	});
}
//#endregion
//#region src/components/streamlit/aspect-ratio.tsx
function xf({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(bf, {
		className: "overflow-hidden rounded-lg bg-muted",
		"data-ssui-component": "aspect_ratio",
		"data-testid": "ssui-v2-aspect-ratio",
		ratio: e.props.ratio,
		children: /* @__PURE__ */ (0, Y.jsx)("img", {
			alt: e.props.alt,
			className: "size-full object-cover",
			loading: "lazy",
			src: e.props.src
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/root/AvatarRootContext.mjs
var Sf = /*#__PURE__*/ C.createContext(void 0);
function Cf() {
	let e = C.useContext(Sf);
	if (e === void 0) throw Error(la(13));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/root/stateAttributesMapping.mjs
var wf = { imageLoadingStatus: () => null }, Tf = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, style: i, ...a } = e, [o, s] = C.useState("idle"), c = { imageLoadingStatus: o }, l = C.useMemo(() => ({
		imageLoadingStatus: o,
		setImageLoadingStatus: s
	}), [o, s]), u = Q("span", e, {
		state: c,
		ref: t,
		props: a,
		stateAttributesMapping: wf
	});
	return /*#__PURE__*/ (0, Y.jsx)(Sf.Provider, {
		value: l,
		children: u
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/image/useImageLoadingStatus.mjs
function Ef(e, { referrerPolicy: t, crossOrigin: n, sizes: r, srcSet: i }) {
	let [a, o] = C.useState("idle");
	return X(() => {
		if (!e && !i) return o("error"), un;
		let a = !0, s = new window.Image(), c = (e) => () => {
			a && o(e);
		};
		return o("loading"), s.onload = c("loaded"), s.onerror = c("error"), t && (s.referrerPolicy = t), s.crossOrigin = n ?? null, r && (s.sizes = r), i && (s.srcset = i), e && (s.src = e), s.complete && o(s.naturalWidth > 0 ? "loaded" : "error"), () => {
			a = !1;
		};
	}, [
		e,
		i,
		r,
		n,
		t
	]), a;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/image/AvatarImage.mjs
var Df = {
	...wf,
	...uc
}, Of = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, onLoadingStatusChange: i, style: a, ...o } = e, { setImageLoadingStatus: s } = Cf(), c = Ef(o.src, o), l = c === "loaded", { mounted: u, transitionStatus: d, setMounted: f } = oc(l), p = C.useRef(null), m = Z((e) => {
		i?.(e), s(e);
	});
	X(() => {
		c !== "idle" && m(c);
	}, [c, m]), X(() => () => s("idle"), [s]), fc({
		open: l,
		ref: p,
		onComplete() {
			l || f(!1);
		}
	});
	let h = Q("img", e, {
		state: {
			imageLoadingStatus: c,
			transitionStatus: d
		},
		ref: [t, p],
		props: o,
		stateAttributesMapping: Df,
		enabled: u
	});
	return u ? h : null;
}), kf = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, delay: i, style: a, ...o } = e, { imageLoadingStatus: s } = Cf(), [c, l] = C.useState(i === void 0), u = an();
	return C.useEffect(() => (i === void 0 ? l(!0) : u.start(i, () => l(!0)), u.clear), [u, i]), Q("span", e, {
		state: { imageLoadingStatus: s },
		ref: t,
		props: o,
		stateAttributesMapping: wf,
		enabled: s !== "loaded" && (i === void 0 || c)
	});
});
//#endregion
//#region src/components/ui/avatar.tsx
function Af({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Tf, {
		"data-slot": "avatar",
		"data-size": t,
		className: J("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", e),
		...n
	});
}
function jf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Of, {
		"data-slot": "avatar-image",
		className: J("aspect-square size-full rounded-full object-cover", e),
		...t
	});
}
function Mf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(kf, {
		"data-slot": "avatar-fallback",
		className: J("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/avatar.tsx
function Nf({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "avatar",
		"data-testid": "ssui-v2-avatar",
		children: /* @__PURE__ */ (0, Y.jsxs)(Af, {
			size: e.props.size,
			children: [e.props.src === null ? null : /* @__PURE__ */ (0, Y.jsx)(jf, {
				alt: e.props.alt,
				src: e.props.src
			}), /* @__PURE__ */ (0, Y.jsx)(Mf, { children: e.props.fallback })]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/use-render/useRender.mjs
function Pf(e) {
	return Q(e.defaultTagName ?? "div", e, e);
}
//#endregion
//#region src/components/ui/badge.tsx
var Ff = S("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function If({ className: e, variant: t = "default", render: n, ...r }) {
	return Pf({
		defaultTagName: "span",
		props: va({ className: J(Ff({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
//#endregion
//#region src/components/streamlit/badge.tsx
function Lf({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-wrap items-center gap-2 p-px",
		"data-ssui-component": "badge",
		"data-testid": "ssui-v2-badge",
		role: "list",
		children: e.props.badges.map((e, t) => /* @__PURE__ */ (0, Y.jsx)(If, {
			role: "listitem",
			variant: e.variant,
			children: e.text
		}, `${e.text}-${t}`))
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function Rf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: J(e),
		...t
	});
}
function zf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("ol", {
		"data-slot": "breadcrumb-list",
		className: J("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", e),
		...t
	});
}
function Bf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "breadcrumb-item",
		className: J("inline-flex items-center gap-1", e),
		...t
	});
}
function Vf({ className: e, render: t, ...n }) {
	return Pf({
		defaultTagName: "a",
		props: va({ className: J("transition-colors hover:text-foreground", e) }, n),
		render: t,
		state: { slot: "breadcrumb-link" }
	});
}
function Hf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: J("font-normal text-foreground", e),
		...t
	});
}
function Uf({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: J("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ (0, Y.jsx)(of, { className: "cn-rtl-flip" })
	});
}
//#endregion
//#region src/components/streamlit/breadcrumb.tsx
function Wf({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Rf, {
		"aria-label": e.props.label,
		"data-ssui-component": "breadcrumb",
		"data-testid": "ssui-v2-breadcrumb",
		children: /* @__PURE__ */ (0, Y.jsx)(zf, { children: e.props.items.map((n, r) => /* @__PURE__ */ (0, Y.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(Bf, { children: n.current ? /* @__PURE__ */ (0, Y.jsx)(Hf, { children: n.text }) : /* @__PURE__ */ (0, Y.jsx)(Vf, {
			href: "#",
			onClick: (e) => {
				e.preventDefault(), t("action", {
					text: n.text,
					href: n.href,
					index: r
				});
			},
			children: n.text
		}) }), r < e.props.items.length - 1 ? /* @__PURE__ */ (0, Y.jsx)(Uf, {}) : null] }, `${n.text}-${r}`)) })
	});
}
//#endregion
//#region src/components/streamlit/button.tsx
function Gf({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: J("p-px", e.props.stretch ? "flex w-full" : "inline-flex"),
		"data-ssui-component": "button",
		"data-testid": "ssui-v2-button",
		children: /* @__PURE__ */ (0, Y.jsx)(Cu, {
			disabled: e.props.disabled,
			onClick: () => {
				t("click", !0);
			},
			size: e.props.size,
			variant: e.props.variant,
			className: e.props.stretch ? "w-full" : void 0,
			children: e.props.text
		})
	});
}
//#endregion
//#region src/components/ui/card.tsx
function Kf({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: J("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function qf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-header",
		className: J("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", e),
		...t
	});
}
function Jf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-title",
		className: J("cn-font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function Yf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-description",
		className: J("text-sm text-muted-foreground", e),
		...t
	});
}
function Xf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-action",
		className: J("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
		...t
	});
}
function Zf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-content",
		className: J("px-(--card-spacing)", e),
		...t
	});
}
function Qf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-footer",
		className: J("flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/card.tsx
function $f({ envelope: e }) {
	let { props: t } = e, n = t.title !== null || t.description !== null;
	return /* @__PURE__ */ (0, Y.jsxs)(Kf, {
		"data-ssui-component": "card",
		"data-testid": "ssui-v2-card",
		size: t.size,
		children: [
			n ? /* @__PURE__ */ (0, Y.jsxs)(qf, { children: [t.title === null ? null : /* @__PURE__ */ (0, Y.jsx)(Jf, { children: t.title }), t.description === null ? null : /* @__PURE__ */ (0, Y.jsx)(Yf, { children: t.description })] }) : null,
			t.content === null ? null : /* @__PURE__ */ (0, Y.jsx)(Zf, { children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "text-sm",
				children: t.content
			}) }),
			t.footer === null ? null : /* @__PURE__ */ (0, Y.jsx)(Qf, { children: t.footer })
		]
	});
}
function ep({ envelope: e }) {
	let { props: t } = e, n = t.variant === "dashboard";
	return /* @__PURE__ */ (0, Y.jsxs)(Kf, {
		className: n ? "@container/card" : void 0,
		"data-ssui-component": "metric_card",
		"data-testid": "ssui-v2-metric-card",
		size: t.size,
		children: [
			/* @__PURE__ */ (0, Y.jsxs)(qf, { children: [
				/* @__PURE__ */ (0, Y.jsx)(Yf, { children: t.label }),
				/* @__PURE__ */ (0, Y.jsx)(Jf, {
					className: n ? "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" : "text-2xl font-semibold tracking-tight",
					children: t.value
				}),
				n && t.delta !== null ? /* @__PURE__ */ (0, Y.jsx)(Xf, { children: /* @__PURE__ */ (0, Y.jsx)(If, {
					variant: "outline",
					children: t.delta
				}) }) : null
			] }),
			t.description === null ? null : n ? /* @__PURE__ */ (0, Y.jsx)(Qf, {
				className: "flex-col items-start gap-1.5 text-sm",
				children: /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "text-muted-foreground",
					children: t.description
				})
			}) : /* @__PURE__ */ (0, Y.jsx)(Zf, { children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: t.description
			}) }),
			!n && t.delta !== null ? /* @__PURE__ */ (0, Y.jsx)(Qf, { children: /* @__PURE__ */ (0, Y.jsx)(If, {
				variant: "secondary",
				children: t.delta
			}) }) : null
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function tp(e) {
	if (!e) return null;
	for (let t of e.elements) {
		let e = t.tagName;
		if (e === "BUTTON" || e === "INPUT") {
			let e = t;
			if (e.type === "submit") return e;
		}
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootDataAttributes.mjs
var np = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.indeterminate = "data-indeterminate", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), rp = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), ip = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valid: null,
	valueMissing: !1
}, ap = {
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, op = {
	disabled: !1,
	...ap
}, sp = { valid(e) {
	return e === null ? null : e ? { [rp.valid]: "" } : { [rp.invalid]: "" };
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/utils/useStateAttributesMapping.mjs
function cp(e) {
	return C.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [np.checked]: "" } : { [np.unchecked]: "" };
		},
		...sp
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var lp = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: ip,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: un,
	disabled: void 0,
	touched: ap.touched,
	setTouched: un,
	dirty: ap.dirty,
	setDirty: un,
	filled: ap.filled,
	setFilled: un,
	focused: ap.focused,
	setFocused: un,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => !1,
	state: op,
	markedDirtyRef: { current: !1 },
	registerFieldControl: un,
	validation: {
		getValidationProps: (e, t = fn) => t,
		inputRef: { current: null },
		registerInput: un,
		commit: async () => {},
		change: un
	}
}, up = /*#__PURE__*/ C.createContext(lp);
function dp(e = !0) {
	let t = C.useContext(up);
	if (t.setValidityData === un && !e) throw Error(la(28));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function fp(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = dp(), s = C.useRef(null);
	s.current ||= Symbol(), X(() => {
		let c = s.current;
		if (!(!c || !i)) return o(c, {
			controlRef: e,
			getValue: r,
			id: t,
			name: a,
			value: n
		}), () => {
			o(c, void 0);
		};
	}, [
		e,
		i,
		r,
		t,
		a,
		o,
		n
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/field/item/FieldItemContext.mjs
var pp = /*#__PURE__*/ C.createContext({ disabled: !1 });
function mp() {
	return C.useContext(pp);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var hp = /*#__PURE__*/ C.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: un,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: !1 }
});
function gp() {
	return C.useContext(hp);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var _p = /*#__PURE__*/ C.createContext({
	controlId: void 0,
	registerControlId: un,
	labelId: void 0,
	setLabelId: un,
	messageIds: [],
	setMessageIds: un,
	getDescriptionProps: (e) => e
});
function vp() {
	return C.useContext(_p);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function yp(e, t, n, r = !0, i) {
	let [a, o] = C.useState(), s = zl(i ? `${i}-label` : void 0), c = e ?? t ?? a;
	return X(() => {
		let i = e || t || !r ? void 0 : bp(n.current, s);
		a !== i && o(i);
	}), c;
}
function bp(e, t) {
	let n = xp(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function xp(e) {
	if (!e) return;
	let t = e.parentElement;
	if (t && t.tagName === "LABEL") return t;
	let n = e.id;
	if (n) {
		let t = e.nextElementSibling;
		if (t && t.htmlFor === n) return t;
	}
	let r = e.labels;
	return r && r[0];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs
var Sp = /*#__PURE__*/ C.createContext(void 0);
function Cp(e = !0) {
	let t = C.useContext(Sp);
	if (t === void 0 && !e) throw Error(la(3));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
var wp = /*#__PURE__*/ C.createContext(void 0);
function Tp() {
	let e = C.useContext(wp);
	if (e === void 0) throw Error(la(14));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRoot.mjs
var Ep = "data-parent", Dp = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: y = !1, style: b, ...x } = e, { clearErrors: S } = gp(), { disabled: w, name: T, setDirty: E, setFilled: D, setFocused: O, setTouched: k, state: A, validationMode: j, validityData: M, validation: N } = dp(), P = mp(), { labelId: F, controlId: I, registerControlId: L, getDescriptionProps: R } = vp(), z = Cp(), B = z?.parent, V = B && z.allValues, H = w || P.disabled || z?.disabled || o, U = T ?? d, W = v ?? U, G = zl(), ee = zl(), te = I;
	V ? te = p ? ee : `${B.id}-${W}` : c && (te = c);
	let ne = {};
	V && (p ? ne = z.parent.getParentProps() : W && (ne = z.parent.getChildProps(W)));
	let { checked: re = n, indeterminate: ie = l, onCheckedChange: ae, ...oe } = ne, se = z?.value, ce = z?.setValue, le = z?.defaultValue, ue = C.useRef(null), de = $t(() => Symbol("checkbox-control")), fe = C.useRef(!1), { getButtonProps: pe, buttonRef: me } = Fl({
		disabled: H,
		native: y
	}), he = z?.validation ?? N, [ge, _e] = id({
		controlled: W && se && !p ? se.includes(W) : re,
		default: W && le && !p ? le.includes(W) : i,
		name: "Checkbox",
		state: "checked"
	}), ve = V ? !!re : ge, ye = V && ie || l;
	X(() => {
		L !== un && (fe.current = !0, L(de.current, te));
	}, [
		te,
		L,
		de
	]), C.useEffect(() => {
		let e = de.current;
		return () => {
			!fe.current || L === un || (fe.current = !1, L(e, void 0));
		};
	}, [L, de]), fp(ue, G, ge, void 0, !z && !H, d);
	let be = C.useRef(null), xe = vr(u, be, he.inputRef, he.registerInput), Se = yp(a, F, be, !y, te ?? void 0);
	X(() => {
		be.current && (be.current.indeterminate = ye, ge && D(!0));
	}, [
		ge,
		ye,
		D
	]), vu(ge, () => {
		z || (S(U), D(ge), E(ge !== M.initialValue), he.change(ge));
	});
	let Ce = va({
		checked: ge,
		disabled: H,
		form: s,
		name: p ? void 0 : U,
		id: y ? void 0 : te ?? void 0,
		required: g,
		ref: xe,
		style: U ? Nr : Mr,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			if (m) {
				e.preventDefault();
				return;
			}
			let t = e.currentTarget.checked, n = hr(Xn, e.nativeEvent);
			if (f?.(t, n), !n.isCanceled && (ae?.(t, n), !n.isCanceled && (_e(t), W && se && ce && !p && !V))) {
				let e = t ? [...se, W] : se.filter((e) => e !== W);
				ce(e, n);
			}
		},
		onFocus() {
			ue.current?.focus();
		}
	}, v === void 0 ? fn : { value: (z ? ge && v : v) || "" }, R, (e) => he.getValidationProps(H, e));
	C.useEffect(() => {
		if (!B || !W) return;
		let e = B.disabledStatesRef.current;
		return e.set(W, H), () => {
			e.delete(W);
		};
	}, [
		B,
		H,
		W
	]);
	let we = C.useMemo(() => ({
		...A,
		checked: ve,
		disabled: H,
		readOnly: m,
		required: g,
		indeterminate: ye
	}), [
		A,
		ve,
		H,
		m,
		g,
		ye
	]), Te = cp(we), Ee = Q("span", e, {
		state: we,
		ref: [
			me,
			ue,
			t,
			z?.registerControlRef
		],
		props: [
			{
				id: y ? te ?? void 0 : G,
				role: "checkbox",
				"aria-checked": ye ? "mixed" : ve,
				"aria-readonly": m || void 0,
				"aria-required": g || void 0,
				"aria-labelledby": Se,
				[Ep]: p ? "" : void 0,
				onFocus() {
					H || O(!0);
				},
				onBlur() {
					let e = be.current;
					e && (k(!0), O(!1), j === "onBlur" && he.commit(z ? se : e.checked));
				},
				onKeyDown(e) {
					if (e.key !== "Enter" || (e.preventBaseUIHandler(), e.defaultPrevented)) return;
					let t = be.current?.form ?? null, n = e.currentTarget, r = e.nativeEvent, i = e.preventDefault, a = r.preventDefault, o = !1;
					e.preventDefault = () => {
						o = !0, i.call(e);
					}, r.preventDefault = () => {
						o = !0, a.call(r);
					}, a.call(r), pt(n).queueMicrotask(() => {
						e.preventDefault = i, r.preventDefault = a, o || tp(t)?.click();
					});
				},
				onClick(e) {
					if (m || H) return;
					e.preventDefault();
					let t = be.current;
					t && t.dispatchEvent(new (pt(t)).PointerEvent("click", {
						bubbles: !0,
						shiftKey: e.shiftKey,
						ctrlKey: e.ctrlKey,
						altKey: e.altKey,
						metaKey: e.metaKey
					}));
				}
			},
			x,
			oe,
			pe,
			R,
			(e) => he.getValidationProps(H, e)
		],
		stateAttributesMapping: Te
	});
	return /*#__PURE__*/ (0, Y.jsxs)(wp.Provider, {
		value: we,
		children: [
			Ee,
			!ge && !z && U && !p && _ !== void 0 && /*#__PURE__*/ (0, Y.jsx)("input", {
				type: "hidden",
				form: s,
				name: U,
				value: _,
				disabled: H
			}),
			/*#__PURE__*/ (0, Y.jsx)("input", {
				...Ce,
				suppressHydrationWarning: !0
			})
		]
	});
}), Op = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = Tp(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = oc(c), f = C.useRef(null), p = {
		...s,
		transitionStatus: u
	};
	fc({
		open: c,
		ref: f,
		onComplete() {
			c || d(!1);
		}
	});
	let m = {
		...cp(s),
		...uc,
		...sp
	}, h = a || l, g = Q("span", e, {
		ref: [t, f],
		state: p,
		stateAttributesMapping: m,
		props: o
	});
	return h ? g : null;
});
//#endregion
//#region src/components/ui/checkbox.tsx
function kp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Dp, {
		"data-slot": "checkbox",
		className: J("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Op, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, Y.jsx)(nf, {})
		})
	});
}
//#endregion
//#region src/components/streamlit/checkbox.tsx
function Ap({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex min-h-8 items-center gap-2.5 p-px",
		"data-ssui-component": "checkbox",
		"data-testid": "ssui-v2-checkbox",
		children: [/* @__PURE__ */ (0, Y.jsx)(kp, {
			checked: i.value,
			disabled: e.props.disabled,
			id: n,
			onCheckedChange: (e) => {
				r(e);
			}
		}), /* @__PURE__ */ (0, Y.jsx)("label", {
			className: "cursor-default text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/root/stateAttributesMapping.mjs
var jp = {
	...kd,
	...uc
}, Mp = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, defaultOpen: i = !1, disabled: a = !1, onOpenChange: o, open: s, style: c, ...l } = e, u = Z(o), d = _d({
		open: s,
		defaultOpen: i,
		onOpenChange: u,
		disabled: a
	}), f = C.useMemo(() => ({
		open: d.open,
		disabled: d.disabled,
		transitionStatus: d.transitionStatus
	}), [
		d.open,
		d.disabled,
		d.transitionStatus
	]), p = C.useMemo(() => ({
		...d,
		onOpenChange: u,
		state: f
	}), [
		d,
		u,
		f
	]), m = Q("div", e, {
		state: f,
		ref: t,
		props: l,
		stateAttributesMapping: jp
	});
	return /*#__PURE__*/ (0, Y.jsx)(vd.Provider, {
		value: p,
		children: m
	});
}), Np = {
	...Od,
	...uc
}, Pp = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { panelId: n, open: r, handleTrigger: i, state: a, disabled: o } = yd(), { className: s, disabled: c = o, render: l, nativeButton: u = !0, style: d, ...f } = e, { getButtonProps: p, buttonRef: m } = Fl({
		disabled: c,
		focusableWhenDisabled: !0,
		native: u
	});
	return Q("button", e, {
		state: a,
		ref: [t, m],
		props: [
			{
				"aria-controls": r ? n : void 0,
				"aria-expanded": r,
				onClick: i
			},
			f,
			p
		],
		stateAttributesMapping: Np
	});
}), Fp = /*#__PURE__*/ function(e) {
	return e.collapsiblePanelHeight = "--collapsible-panel-height", e.collapsiblePanelWidth = "--collapsible-panel-width", e;
}({}), Ip = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, hiddenUntilFound: r, keepMounted: i, render: a, id: o, style: s, ...c } = e, { mounted: l, onOpenChange: u, open: d, panelId: f, setMounted: p, setPanelIdState: m, setOpen: h, state: g, transitionStatus: _ } = yd(), v = r ?? !1, y = i ?? !1;
	X(() => {
		if (o) return m(o), () => {
			m(void 0);
		};
	}, [o, m]);
	let { height: b, props: x, ref: S, shouldPreventOpenAnimation: C, shouldRender: w, transitionStatus: T, width: E } = Id({
		externalRef: t,
		hiddenUntilFound: v,
		id: f,
		keepMounted: y,
		mounted: l,
		onOpenChange: u,
		open: d,
		setMounted: p,
		setOpen: h,
		transitionStatus: _
	}), D = {
		...g,
		transitionStatus: T
	}, O = ga(s, D), k = Q("div", {
		...e,
		style: void 0
	}, {
		state: D,
		ref: S,
		props: [
			x,
			{ style: {
				[Fp.collapsiblePanelHeight]: b === void 0 ? "auto" : `${b}px`,
				[Fp.collapsiblePanelWidth]: E === void 0 ? "auto" : `${E}px`
			} },
			c,
			O ? { style: O } : void 0,
			C ? { style: { animationName: "none" } } : void 0
		],
		stateAttributesMapping: jp
	});
	return w ? k : null;
});
//#endregion
//#region src/components/ui/collapsible.tsx
function Lp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Mp, {
		"data-slot": "collapsible",
		...e
	});
}
function Rp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Pp, {
		"data-slot": "collapsible-trigger",
		...e
	});
}
function zp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ip, {
		"data-slot": "collapsible-content",
		...e
	});
}
//#endregion
//#region src/components/streamlit/collapsible.tsx
function Bp({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)(Lp, {
		"data-ssui-component": "collapsible",
		"data-testid": "ssui-v2-collapsible",
		disabled: e.props.disabled,
		onOpenChange: n,
		open: r.value,
		children: [/* @__PURE__ */ (0, Y.jsxs)(Rp, {
			className: "group flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
			children: [e.props.title, /* @__PURE__ */ (0, Y.jsx)(rf, {
				"aria-hidden": "true",
				className: "size-4 transition-transform group-aria-expanded:rotate-180"
			})]
		}), /* @__PURE__ */ (0, Y.jsxs)(zp, {
			className: "space-y-1 px-3 pt-2 text-sm",
			children: [e.props.firstItem === null ? null : /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "font-medium",
				children: e.props.firstItem
			}), e.props.items.map((e, t) => /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "border-t py-1.5 text-muted-foreground",
				children: e
			}, `${e}-${t}`))]
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
var Vp = /*#__PURE__*/ C.createContext(void 0);
function Hp(e) {
	let t = C.useContext(Vp);
	if (t === void 0 && !e) throw Error(la(33));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var Up = /*#__PURE__*/ C.createContext(void 0);
function Wp(e) {
	let t = C.useContext(Up);
	if (t === void 0 && !e) throw Error(la(36));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/context-menu/root/ContextMenuRootContext.mjs
var Gp = /*#__PURE__*/ C.createContext(void 0);
function Kp(e = !0) {
	let t = C.useContext(Gp);
	if (t === void 0 && !e) throw Error(la(25));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function qp(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, { events: l } = a.useState("floatingTreeRoot"), u = a.useState("open"), d = Kp(!0), f = d !== void 0;
	return C.useMemo(() => ({
		id: r,
		role: "menuitem",
		tabIndex: u && n ? 0 : -1,
		onKeyDown(e) {
			e.key === " " && o?.current && e.preventDefault();
		},
		onMouseMove(e) {
			i && l.emit("itemhover", {
				nodeId: i,
				target: e.currentTarget
			});
		},
		onClick(e) {
			t && l.emit("close", {
				domEvent: e,
				reason: tr
			});
		},
		onMouseUp(e) {
			if (d) {
				let t = d.initialCursorPointRef.current;
				if (d.initialCursorPointRef.current = null, f && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || f && !Kt && e.button === 2) return;
			}
			s.current && a.context.allowMouseUpTriggerRef.current && (!f || e.button === 2) && (!c || c.type === "regular-item") && s.current.click();
		}
	}), [
		t,
		n,
		r,
		l,
		i,
		u,
		a,
		o,
		s,
		d,
		f,
		c
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItem.mjs
var Jp = { type: "regular-item" };
function Yp(e) {
	let { closeOnClick: t, disabled: n = !1, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = a.useState("disabled"), d = n || u, f = C.useRef(null), { getButtonProps: p, buttonRef: m } = Fl({
		disabled: d,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), h = qp({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: f,
		itemMetadata: c
	}), g = C.useCallback((e) => va(h, { onMouseEnter() {
		c.type === "submenu-trigger" && c.setActive();
	} }, e, p), [
		h,
		p,
		c
	]), _ = vr(f, m);
	return C.useMemo(() => ({
		getItemProps: g,
		itemRef: _
	}), [g, _]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
var Xp = /*#__PURE__*/ C.createContext(void 0);
function Zp() {
	let e = C.useContext(Xp);
	if (e === void 0) throw Error(la(31));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Qp = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = C.useState(void 0), c = Q("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, Y.jsx)(Xp.Provider, {
		value: s,
		children: c
	});
}), $p = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = zl(a), c = Zp();
	return X(() => (c(s), () => {
		c(void 0);
	}), [c, s]), Q("div", e, {
		ref: t,
		props: {
			id: s,
			role: "presentation",
			...o
		}
	});
}), em = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, d = xd({ label: a }), f = Hp(!0), p = zl(i), { store: m } = Wp(), h = m.useState("isActive", d.index), g = m.useState("itemProps"), { getItemProps: _, itemRef: v } = Yp({
		closeOnClick: c,
		disabled: s,
		highlighted: h,
		id: p,
		store: m,
		nativeButton: o,
		nodeId: f?.context.nodeId,
		itemMetadata: Jp
	});
	return Q("div", e, {
		state: {
			disabled: s,
			highlighted: h
		},
		props: [
			g,
			u,
			_
		],
		ref: [
			v,
			t,
			d.ref
		]
	});
}), tm = /*#__PURE__*/ C.createContext(void 0);
function nm(e) {
	let t = C.useContext(tm);
	if (t === void 0 && !e) throw Error(la(69));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function rm(e) {
	return e === "starting" ? La : fn;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var im = {
	...kl,
	...uc
}, am = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s } = Wp(), { side: c, align: l } = Hp(), u = nm(!0) != null, d = s.useState("open"), f = s.useState("transitionStatus"), p = s.useState("popupProps"), m = s.useState("mounted"), h = s.useState("instantType"), g = s.useState("activeTriggerElement"), _ = s.useState("parent"), v = s.useState("lastOpenChangeReason"), y = s.useState("rootId"), b = s.useState("floatingRootContext"), x = s.useState("floatingTreeRoot"), S = s.useState("closeDelay"), w = s.useState("activeTriggerElement"), T = s.useState("hoverEnabled"), E = s.useState("disabled"), D = s.useState("openMethod"), O = _.type === "context-menu";
	fc({
		open: d,
		ref: s.context.popupRef,
		onComplete() {
			d && s.context.onOpenChangeComplete?.(!0);
		}
	}), C.useEffect(() => {
		function e(e) {
			s.setOpen(!1, hr(e.reason, e.domEvent));
		}
		return x.events.on("close", e), () => {
			x.events.off("close", e);
		};
	}, [x.events, s]), Gc(b, {
		enabled: T && !E && !O && _.type !== "menubar",
		closeDelay: S
	});
	let k = C.useCallback((e) => {
		s.set("popupElement", e);
	}, [s]), A = Q("div", e, {
		state: {
			transitionStatus: f,
			side: c,
			align: l,
			open: d,
			nested: _.type === "menu",
			instant: h
		},
		ref: [
			t,
			s.context.popupRef,
			k
		],
		stateAttributesMapping: im,
		props: [
			p,
			{ onKeyDown(e) {
				u && ru.has(e.key) && e.stopPropagation();
			} },
			rm(f),
			o,
			{ "data-rootownerid": y }
		]
	}), j = _.type === void 0 || O;
	return (g || _.type === "menubar" && v !== "outside-press") && (j = !0), /*#__PURE__*/ (0, Y.jsx)(po, {
		context: b,
		openInteractionType: D,
		modal: O,
		disabled: !m,
		returnFocus: a === void 0 ? j : a,
		initialFocus: _.type !== "menu",
		restoreFocus: !0,
		externalTree: _.type === "menubar" ? void 0 : x,
		previousFocusableElement: w,
		nextFocusableElement: _.type === void 0 ? s.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: _.type === void 0 ? s.context.beforeContentFocusGuardRef : void 0,
		children: A
	});
}), om = /*#__PURE__*/ C.createContext(void 0);
function sm() {
	let e = C.useContext(om);
	if (e === void 0) throw Error(la(32));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var cm = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = Wp();
	return i.useState("mounted") || n ? /*#__PURE__*/ (0, Y.jsx)(om.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(qa, {
			ref: t,
			...r
		})
	}) : null;
}), lm = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0, offsetParent: d = "real" } = Ur(e, t) || {};
		if (l == null) return {};
		let f = si(u), p = {
			x: n,
			y: r
		}, m = Yr(i), h = qr(m), g = await o.getDimensions(l), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = a.reference[h] + a.reference[m] - p[m] - a.floating[h], S = p[m] - a.reference[m], C = d === "real" ? await o.getOffsetParent?.(l) : s.floating, w = s.floating[b] || a.floating[h];
		(!w || !await o.isElement?.(C)) && (w = s.floating[b] || a.floating[h]);
		let T = x / 2 - S / 2, E = w / 2 - g[h] / 2 - 1, D = Math.min(f[v], E), O = Math.min(f[y], E), k = D, A = w - g[h] - O, j = w / 2 - g[h] / 2 + T, M = Hr(k, j, A), N = !c.arrow && Gr(i) != null && j !== M && a.reference[h] / 2 - (j < k ? D : O) - g[h] / 2 < 0, P = N ? j < k ? j - k : j - A : 0;
		return {
			[m]: p[m] + P,
			data: {
				[m]: M,
				centerOffset: j - M - P,
				...N && { alignmentOffset: P }
			},
			reset: N
		};
	}
}), um = (e, t) => ({
	...lm(e),
	options: [e, t]
}), dm = Ts().fn, fm = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0;
		return { data: { referenceHidden: (await dm(e)).data?.referenceHidden || a } };
	}
}, pm = {
	sideX: "left",
	sideY: "top"
}, mm = {
	name: "adaptiveOrigin",
	async fn(e) {
		let { x: t, y: n, rects: { floating: r }, elements: { floating: i }, platform: a, strategy: o, placement: s } = e, c = pt(i), l = c.getComputedStyle(i);
		if (l.transitionDuration === "0s" || l.transitionDuration === "") return {
			x: t,
			y: n,
			data: pm
		};
		let u = await a.getOffsetParent?.(i), d = {
			width: 0,
			height: 0
		};
		if (o === "fixed" && c?.visualViewport) d = {
			width: c.visualViewport.width,
			height: c.visualViewport.height
		};
		else if (u === c) {
			let e = Zt(i);
			d = {
				width: e.documentElement.clientWidth,
				height: e.documentElement.clientHeight
			};
		} else await a.isElement?.(u) && (d = await a.getDimensions(u));
		let f = Wr(s), p = t, m = n;
		f === "left" && (p = d.width - (t + r.width)), f === "top" && (m = d.height - (n + r.height));
		let h = f === "left" ? "right" : pm.sideX, g = f === "top" ? "bottom" : pm.sideY;
		return {
			x: p,
			y: m,
			data: {
				sideX: h,
				sideY: g
			}
		};
	}
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchorPositioning.mjs
function hm(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function gm(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: hm(t, Wr(i), n),
		align: Gr(i) || "center",
		anchor: {
			width: r.reference.width,
			height: r.reference.height
		},
		positioner: {
			width: r.floating.width,
			height: r.floating.height
		}
	};
}
function _m(e) {
	let { anchor: t, positionMethod: n = "absolute", side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, collisionBoundary: s, collisionPadding: c = 5, sticky: l = !1, arrowPadding: u = 5, disableAnchorTracking: d = !1, inline: f, keepMounted: p = !1, floatingRootContext: m, mounted: h, collisionAvoidance: g, shiftCrossAxis: _ = !1, nodeId: v, adaptiveOrigin: y, lazyFlip: b = !1, externalTree: x } = e, [S, w] = C.useState(null);
	!h && S !== null && w(null);
	let T = g.side || "flip", E = g.align || "flip", D = g.fallbackAxisSide || "end", O = typeof t == "function" ? t : void 0, k = Z(O), A = O ? k : t, j = wr(t), M = wr(h), N = fd() === "rtl", P = S || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": N ? "left" : "right",
		"inline-start": N ? "right" : "left"
	}[r], F = a === "center" ? P : `${P}-${a}`, I = c, L = +(r === "bottom"), R = +(r === "top"), z = +(r === "right"), B = +(r === "left");
	typeof I == "number" ? I = {
		top: I + L,
		right: I + B,
		bottom: I + R,
		left: I + z
	} : I &&= {
		top: (I.top || 0) + L,
		right: (I.right || 0) + B,
		bottom: (I.bottom || 0) + R,
		left: (I.left || 0) + z
	};
	let V = {
		boundary: s === "clipping-ancestors" ? "clippingAncestors" : s,
		padding: I
	}, H = C.useRef(null), U = wr(i), W = wr(o), G = typeof i == "function" ? 0 : i, ee = typeof o == "function" ? 0 : o, te = [];
	f && te.push(f), te.push(bs((e) => {
		let t = gm(e, r, N), n = typeof U.current == "function" ? U.current(t) : U.current, i = typeof W.current == "function" ? W.current(t) : W.current;
		return {
			mainAxis: n,
			crossAxis: i,
			alignmentAxis: i
		};
	}, [
		G,
		ee,
		N,
		r
	]));
	let ne = E === "none" && T !== "shift", re = !ne && (l || _ || T === "shift"), ie = T === "none" ? null : Cs({
		...V,
		padding: {
			top: I.top + 1,
			right: I.right + 1,
			bottom: I.bottom + 1,
			left: I.left + 1
		},
		mainAxis: !_ && T === "flip",
		crossAxis: E === "flip" && "alignment",
		fallbackAxisSideDirection: D
	}), ae = ne ? null : xs((e) => {
		let t = Zt(e.elements.floating).documentElement;
		return {
			...V,
			rootBoundary: _ ? {
				x: 0,
				y: 0,
				width: t.clientWidth,
				height: t.clientHeight
			} : void 0,
			mainAxis: E !== "none",
			crossAxis: re,
			limiter: l || _ ? void 0 : Ss((e) => {
				if (!H.current) return {};
				let { width: t, height: n } = H.current.getBoundingClientRect(), r = Jr(Wr(e.placement)), i = r === "y" ? t : n, a = r === "y" ? I.left + I.right : I.top + I.bottom;
				return { offset: i / 2 + a / 2 };
			})
		};
	}, [
		V,
		l,
		_,
		I,
		E
	]);
	T === "shift" || E === "shift" || a === "center" ? te.push(ae, ie) : te.push(ie, ae), te.push(ws({
		...V,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty("--available-width", `${t}px`), i.setProperty("--available-height", `${n}px`);
			let a = pt(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty("--anchor-width", `${u}px`), i.setProperty("--anchor-height", `${d}px`);
		}
	}), um((e) => ({
		element: H.current || Zt(e.elements.floating).createElement("div"),
		padding: u,
		offsetParent: "floating"
	}), [u]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: t, middlewareData: n, placement: a, rects: o, y: s } = e, c = Wr(a), l = Jr(c), u = H.current, d = n.arrow?.x || 0, f = n.arrow?.y || 0, p = u?.clientWidth || 0, m = u?.clientHeight || 0, h = d + p / 2, g = f + m / 2, _ = Math.abs(n.shift?.y || 0), v = o.reference.height / 2, y = typeof i == "function" ? i(gm(e, r, N)) : i, b = _ > y, x = {
				top: `${h}px calc(100% + ${y}px)`,
				bottom: `${h}px ${-y}px`,
				left: `calc(100% + ${y}px) ${g}px`,
				right: `${-y}px ${g}px`
			}[c], S = `${h}px ${o.reference.y + v - s}px`;
			return t.floating.style.setProperty("--transform-origin", re && l === "y" && b ? S : x), {};
		}
	}, fm, y), X(() => {
		!h && m && m.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [h, m]);
	let oe = C.useMemo(() => ({
		elementResize: !d && typeof ResizeObserver < "u",
		layoutShift: !d && typeof IntersectionObserver < "u"
	}), [d]), { refs: se, elements: ce, x: le, y: ue, middlewareData: de, update: fe, placement: pe, context: me, isPositioned: he, floatingStyles: ge } = Lc({
		rootContext: m,
		open: p ? h : void 0,
		placement: F,
		middleware: te,
		strategy: n,
		whileElementsMounted: p ? void 0 : (...e) => os(...e, oe),
		nodeId: v,
		externalTree: x
	}), { sideX: _e, sideY: ve } = de.adaptiveOrigin || pm, ye = he ? n : "fixed", be = C.useMemo(() => {
		let e = y ? {
			position: ye,
			[_e]: le,
			[ve]: ue
		} : {
			position: ye,
			...ge
		};
		return he || (e.opacity = 0), e;
	}, [
		y,
		ye,
		_e,
		le,
		ve,
		ue,
		ge,
		he
	]), xe = C.useRef(null);
	X(() => {
		if (!h) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (vm(t) ? t.current : t) || null;
		n !== xe.current && (se.setPositionReference(n), xe.current = n);
	}, [
		h,
		se,
		A,
		j
	]), C.useEffect(() => {
		if (!h) return;
		let e = j.current;
		typeof e != "function" && vm(e) && e.current !== xe.current && (se.setPositionReference(e.current), xe.current = e.current);
	}, [
		h,
		se,
		A,
		j
	]), C.useEffect(() => {
		if (p && h && ce.reference && ce.floating) return os(ce.reference, ce.floating, fe, oe);
	}, [
		p,
		h,
		ce,
		fe,
		oe
	]);
	let Se = Wr(pe), Ce = hm(r, Se, N), we = Gr(pe) || "center", Te = !!de.hide?.referenceHidden;
	X(() => {
		b && h && he && w(Se);
	}, [
		b,
		h,
		he,
		Se
	]);
	let Ee = C.useMemo(() => ({
		position: "absolute",
		top: de.arrow?.y,
		left: de.arrow?.x
	}), [de.arrow]), De = de.arrow?.centerOffset !== 0;
	return C.useMemo(() => ({
		positionerStyles: be,
		arrowStyles: Ee,
		arrowRef: H,
		arrowUncentered: De,
		side: Ce,
		align: we,
		physicalSide: Se,
		anchorHidden: Te,
		refs: se,
		context: me,
		isPositioned: he,
		update: fe
	}), [
		be,
		Ee,
		H,
		De,
		Ce,
		we,
		Se,
		Te,
		se,
		me,
		he,
		fe
	]);
}
function vm(e) {
	return e != null && "current" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/usePositioner.mjs
function ym(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), Q("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			rm(r),
			i
		],
		stateAttributesMapping: kl
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var bm = 20;
function xm(e, t, n, r) {
	let [i, a] = C.useState(!1);
	X(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Zt(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - bm);
	}, [
		e,
		t,
		n
	]), xn(e && (!t || i), r);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Sm = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = za, style: g, ..._ } = e, { store: v } = Wp(), y = sm(), b = Kp(!0), x = v.useState("parent"), S = v.useState("floatingRootContext"), w = v.useState("floatingTreeRoot"), T = v.useState("mounted"), E = v.useState("open"), D = v.useState("modal"), O = v.useState("openMethod"), k = v.useState("activeTriggerElement"), A = v.useState("transitionStatus"), j = v.useState("positionerElement"), M = v.useState("instantType"), N = v.useState("hasViewport"), P = v.useState("lastOpenChangeReason"), F = v.useState("floatingNodeId"), I = v.useState("floatingParentNodeId"), L = S.useState("domReferenceElement"), R = C.useRef(null), z = dc(j, !1, !1), B = n, V = c, H = l, U = s, W = h;
	x.type === "context-menu" && (B = n ?? x.context?.anchor, U ??= "start", !o && U !== "center" && (H = e.alignOffset ?? 2, V = e.sideOffset ?? -5));
	let G = o, ee = U;
	x.type === "menu" ? (G ??= "inline-end", ee ??= "start", W = e.collisionAvoidance ?? Ba) : x.type === "menubar" && (G ??= x.context.orientation === "vertical" ? "inline-end" : "bottom", ee ??= "start");
	let te = x.type === "context-menu", ne = _m({
		anchor: B,
		floatingRootContext: S,
		positionMethod: b ? "fixed" : r,
		mounted: T,
		side: G,
		sideOffset: V,
		align: ee,
		alignOffset: H,
		arrowPadding: te ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: F,
		keepMounted: y,
		disableAnchorTracking: m,
		collisionAvoidance: W,
		shiftCrossAxis: te && !("side" in W && W.side === "flip"),
		externalTree: w,
		adaptiveOrigin: N ? mm : void 0
	});
	C.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === F && v.set("hoverEnabled", !1), e.nodeId !== F && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, hr(lr)));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [
		v,
		w.events,
		F
	]), C.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, hr(t));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [w.events, v]);
	let re = an();
	C.useEffect(() => {
		E || re.clear();
	}, [E, re]), C.useEffect(() => {
		function e(e) {
			if (!(!E || e.nodeId !== v.select("floatingParentNodeId"))) if (e.target && k && k !== e.target) {
				let e = v.select("closeDelay");
				e > 0 ? re.isStarted() || re.start(e, () => {
					v.setOpen(!1, hr(lr));
				}) : v.setOpen(!1, hr(lr));
			} else re.clear();
		}
		return w.events.on("itemhover", e), () => {
			w.events.off("itemhover", e);
		};
	}, [
		w.events,
		E,
		k,
		v,
		re
	]), C.useEffect(() => {
		let e = {
			open: E,
			nodeId: F,
			parentNodeId: I,
			reason: v.select("lastOpenChangeReason")
		};
		w.events.emit("menuopenchange", e);
	}, [
		w.events,
		E,
		v,
		F,
		I
	]), X(() => {
		let e = L, t = R.current;
		if (e && (R.current = e), t && e && e !== t) {
			v.set("instantType", void 0);
			let e = new AbortController();
			return z(() => {
				v.set("instantType", "trigger-change");
			}, e.signal), () => {
				e.abort();
			};
		}
	}, [
		L,
		z,
		v
	]);
	let ie = {
		open: E,
		side: ne.side,
		align: ne.align,
		anchorHidden: ne.anchorHidden,
		nested: x.type === "menu",
		instant: M
	}, ae = x.type === "menubar" && x.context.modal;
	xm(E && (ae || D && P !== "trigger-hover"), O === "touch", j, k);
	let oe = ym(e, ie, {
		styles: ne.positionerStyles,
		transitionStatus: A,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !T,
		inert: !E
	}), se = T && x.type !== "menu" && (x.type !== "menubar" && D && P !== "trigger-hover" || x.type === "menubar" && x.context.modal), ce = null;
	return x.type === "menubar" ? ce = x.context.contentElement : x.type === void 0 && (ce = k), /*#__PURE__*/ (0, Y.jsxs)(Vp.Provider, {
		value: ne,
		children: [se && /*#__PURE__*/ (0, Y.jsx)(mu, {
			ref: x.type === "context-menu" || x.type === "nested-context-menu" ? x.context.internalBackdropRef : null,
			inert: pu(!E),
			cutout: ce
		}), /*#__PURE__*/ (0, Y.jsx)(to, {
			id: F,
			children: /*#__PURE__*/ (0, Y.jsx)(sd, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				children: oe
			})
		})]
	});
}), Cm = /*#__PURE__*/ C.createContext(null);
function wm(e) {
	let t = C.useContext(Cm);
	if (t === null && !e) throw Error(la(5));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/store/MenuStore.mjs
var Tm = {
	...Fc,
	disabled: $((e) => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled),
	modal: $((e) => (e.parent.type === void 0 || e.parent.type === "context-menu") && (e.modal ?? !0)),
	openMethod: $((e) => e.openMethod),
	allowMouseEnter: $((e) => e.allowMouseEnter),
	highlightItemOnHover: $((e) => e.highlightItemOnHover),
	stickIfOpen: $((e) => e.stickIfOpen),
	parent: $((e) => e.parent),
	rootId: $((e) => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type === void 0 ? e.rootId : e.parent.context.rootId),
	activeIndex: $((e) => e.activeIndex),
	isActive: $((e, t) => e.activeIndex === t),
	hoverEnabled: $((e) => e.hoverEnabled),
	instantType: $((e) => e.instantType),
	lastOpenChangeReason: $((e) => e.openChangeReason),
	floatingTreeRoot: $((e) => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot),
	floatingNodeId: $((e) => e.floatingNodeId),
	floatingParentNodeId: $((e) => e.floatingParentNodeId),
	itemProps: $((e) => e.itemProps),
	closeDelay: $((e) => e.closeDelay),
	hasViewport: $((e) => e.hasViewport),
	keyboardEventRelay: $((e) => {
		if (e.keyboardEventRelay) return e.keyboardEventRelay;
		if (e.parent.type === "menu") return e.parent.store.select("keyboardEventRelay");
	})
}, Em = class e extends nc {
	constructor(e) {
		super({
			...Dm(),
			...e
		}, {
			positionerRef: /*#__PURE__*/ C.createRef(),
			popupRef: /*#__PURE__*/ C.createRef(),
			typingRef: { current: !1 },
			itemDomElements: { current: [] },
			itemLabels: { current: [] },
			allowMouseUpTriggerRef: { current: !1 },
			triggerFocusTargetRef: /*#__PURE__*/ C.createRef(),
			beforeContentFocusGuardRef: /*#__PURE__*/ C.createRef(),
			onOpenChangeComplete: void 0,
			triggerElements: new Ec()
		}, Tm), this.unsubscribeParentListener = this.observe("parent", (e) => {
			if (this.unsubscribeParentListener?.(), e.type === "menu") {
				let t = e.store.select("rootId"), n = e.store.select("floatingTreeRoot"), r = e.store.select("keyboardEventRelay");
				this.unsubscribeParentListener = e.store.subscribe(() => {
					let i = e.store.select("rootId"), a = e.store.select("floatingTreeRoot"), o = e.store.select("keyboardEventRelay");
					(t !== i || n !== a || r !== o) && (t = i, n = a, r = o, this.notifyAll());
				}), this.context.allowMouseUpTriggerRef = e.store.context.allowMouseUpTriggerRef;
				return;
			}
			e.type !== void 0 && (this.context.allowMouseUpTriggerRef = e.context.allowMouseUpTriggerRef), this.unsubscribeParentListener = null;
		});
	}
	setOpen(e, t) {
		this.state.floatingRootContext.context.events.emit("setOpen", {
			open: e,
			eventDetails: t
		});
	}
	static useStore(t, n) {
		let r = $t(() => new e(n)).current;
		return t ?? r;
	}
	unsubscribeParentListener = null;
};
function Dm() {
	return {
		...Oc(),
		disabled: !1,
		modal: !0,
		openMethod: null,
		allowMouseEnter: !1,
		highlightItemOnHover: !0,
		stickIfOpen: !0,
		parent: { type: void 0 },
		rootId: void 0,
		activeIndex: null,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new Ya(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: fn,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		hasViewport: !1
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var Om = /*#__PURE__*/ C.createContext(void 0);
function km() {
	return C.useContext(Om);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var Am = Gs(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, defaultOpen: a = !1, disabled: o = !1, modal: s, loopFocus: c = !0, orientation: l = "vertical", actionsRef: u, closeParentOnEsc: d = !1, handle: f, triggerId: p, defaultTriggerId: m = null, highlightItemOnHover: h = !0 } = e, g = Kp(!0), _ = Wp(!0), v = wm(!0), y = km(), b = C.useMemo(() => y && _ ? {
		type: "menu",
		store: _.store
	} : v ? {
		type: "menubar",
		context: v
	} : g && !_ ? {
		type: "context-menu",
		context: g
	} : { type: void 0 }, [
		g,
		_,
		v,
		y
	]), x = Em.useStore(f?.store, {
		open: a,
		openProp: n,
		activeTriggerId: m,
		triggerIdProp: p,
		parent: b
	});
	bc(x, n, a, m), x.useControlledProp("openProp", n), x.useControlledProp("triggerIdProp", p), x.useContextCallback("onOpenChangeComplete", i);
	let S = sa(), w = sa(), T = x.useState("floatingTreeRoot"), E = eo(T), D = Qa(), O = x.useState("open"), k = x.useState("activeTriggerElement"), A = x.useState("positionerElement"), j = x.useState("hoverEnabled"), M = x.useState("disabled"), N = x.useState("lastOpenChangeReason"), P = x.useState("parent"), F = x.useState("activeIndex"), I = x.useState("payload"), L = x.useState("floatingParentNodeId"), R = C.useRef(null), z = C.useRef(P.type !== "context-menu"), B = an(), V = C.useRef(!0), H = an(), U = L != null, { openMethod: W, triggerProps: G } = bu(O);
	x.useSyncedValues({
		disabled: o,
		highlightItemOnHover: h,
		modal: P.type === void 0 ? s : void 0,
		openMethod: W,
		rootId: S
	}), Sc(x);
	let { forceUnmount: ee } = Cc(O, x, () => {
		x.update({
			allowMouseEnter: !1,
			stickIfOpen: !0
		});
	});
	X(() => {
		g && !_ ? x.update({
			parent: {
				type: "context-menu",
				context: g
			},
			floatingNodeId: E,
			floatingParentNodeId: D
		}) : _ && x.update({
			floatingNodeId: E,
			floatingParentNodeId: D
		});
	}, [
		g,
		_,
		E,
		D,
		x
	]), C.useEffect(() => {
		if (O || (R.current = null), P.type === "context-menu") {
			if (!O) {
				B.clear(), z.current = !1;
				return;
			}
			B.start(500, () => {
				z.current = !0;
			});
		}
	}, [
		B,
		O,
		P.type
	]), X(() => {
		!O && !j && x.set("hoverEnabled", !0);
	}, [
		O,
		j,
		x
	]);
	let te = Z((e, t) => {
		let n = t.reason;
		if (O === e && t.trigger === k && N === n) return;
		let i = vc(t);
		if (!e && t.trigger == null && (t.trigger = k ?? void 0), r?.(e, t), t.isCanceled) return;
		x.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && a?.type === "click" && a.pointerType === "touch" && !V.current) return;
		e && n === "trigger-focus" ? (V.current = !1, H.start(300, () => {
			V.current = !0;
		})) : (V.current = !0, H.clear());
		let o = (n === "trigger-press" || n === "item-press") && a.detail === 0 && a?.isTrusted, s = !e && (n === "escape-key" || n == null), c = {
			open: e,
			openChangeReason: n
		};
		R.current = t.event ?? null, _c(c, e, t.trigger, i()), x.update(c), P.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? x.set("instantType", "group") : o || s ? x.set("instantType", o ? "click" : "dismiss") : x.set("instantType", void 0);
	}), ne = ac({
		popupStore: x,
		floatingId: w,
		nested: D != null,
		onOpenChange: te
	}), re = ne.context.events;
	C.useEffect(() => {
		let e = ({ open: e, eventDetails: t }) => te(e, t);
		return re.on("setOpen", e), () => {
			re?.off("setOpen", e);
		};
	}, [re, te]);
	let ie = C.useCallback(() => {
		x.setOpen(!1, hr(pr));
	}, [x]);
	C.useImperativeHandle(u, () => ({
		unmount: ee,
		close: ie
	}), [ee, ie]);
	let ae;
	P.type === "context-menu" && (ae = P.context), C.useImperativeHandle(ae?.positionerRef, () => A, [A]), C.useImperativeHandle(ae?.actionsRef, () => ({ setOpen: te }), [te]);
	let oe = _o(ne, {
		enabled: !M,
		bubbles: { escapeKey: d && P.type === "menu" },
		outsidePress() {
			return P.type !== "context-menu" || R.current?.type === "contextmenu" || z.current;
		},
		externalTree: U ? T : void 0
	}), se = fd(), ce = C.useCallback((e) => {
		x.select("activeIndex") !== e && x.set("activeIndex", e);
	}, [x]), le = el(ne, {
		enabled: !M,
		listRef: x.context.itemDomElements,
		activeIndex: F,
		nested: P.type !== void 0,
		loopFocus: c,
		orientation: l,
		parentOrientation: P.type === "menubar" ? P.context.orientation : void 0,
		rtl: se === "rtl",
		disabledIndices: dn,
		onNavigate: ce,
		openOnArrowKeyDown: P.type !== "context-menu",
		externalTree: U ? T : void 0,
		focusItemOnHover: h
	}), ue = C.useCallback((e) => {
		x.context.typingRef.current = e;
	}, [x]), de = tl(ne, {
		enabled: !M,
		listRef: x.context.itemLabels,
		elementsRef: x.context.itemDomElements,
		activeIndex: F,
		resetMs: 500,
		onMatch: (e) => {
			O && e !== F && x.set("activeIndex", e);
		},
		onTyping: ue
	});
	wc(x, {
		floatingRootContext: ne,
		activeTriggerProps: C.useMemo(() => {
			let e = va(de.reference, le.reference, oe.reference, { onMouseMove() {
				x.set("allowMouseEnter", !0);
			} }, G);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = O, e;
		}, [
			x,
			de.reference,
			le.reference,
			oe.reference,
			G,
			O
		]),
		inactiveTriggerProps: C.useMemo(() => {
			let e = va(le.trigger, oe.trigger, G);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			le.trigger,
			oe.trigger,
			G
		]),
		popupProps: C.useMemo(() => va(pc, {
			id: w,
			role: "menu",
			"aria-labelledby": k?.id,
			onMouseMove() {
				x.set("allowMouseEnter", !0), P.type === "menu" && x.set("hoverEnabled", !1);
			},
			onClick() {
				x.select("hoverEnabled") && x.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = x.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, de.floating, le.floating, oe.floating), [
			k,
			w,
			P.type,
			x,
			de.floating,
			le.floating,
			oe.floating
		]),
		itemProps: le.item ?? fn
	});
	let fe = C.useMemo(() => ({
		store: x,
		parent: b
	}), [x, b]), pe = /*#__PURE__*/ (0, Y.jsx)(Up.Provider, {
		value: fe,
		children: typeof t == "function" ? t({ payload: I }) : t
	});
	return P.type === void 0 || P.type === "context-menu" ? /*#__PURE__*/ (0, Y.jsx)(no, {
		externalTree: T,
		children: pe
	}) : pe;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function jm(e) {
	let t = e.getBoundingClientRect(), n = pt(e);
	if (Xt) return t;
	let r = n.getComputedStyle(e, "::before"), i = n.getComputedStyle(e, "::after");
	if (r.content === "none" && i.content === "none") return t;
	let a = parseFloat(r.width) || 0, o = parseFloat(r.height) || 0, s = parseFloat(i.width) || 0, c = parseFloat(i.height) || 0, l = Math.max(t.width, a, s), u = Math.max(t.height, o, c), d = l - t.width, f = u - t.height;
	return {
		left: t.left - d / 2,
		right: t.right + d / 2,
		top: t.top - f / 2,
		bottom: t.bottom + f / 2
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function Mm(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Nl(), { ref: i, index: a } = xd(e), o = n === a, s = C.useRef(null), c = vr(i, s);
	return {
		compositeProps: {
			tabIndex: o ? 0 : -1,
			onFocus() {
				r(a);
			},
			onMouseMove() {
				let e = s.current;
				if (!t || !e) return;
				let n = e.hasAttribute("disabled") || e.ariaDisabled === "true";
				!o && !n && e.focus();
			}
		},
		compositeRef: c,
		index: a
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/item/CompositeItem.mjs
function Nm(e) {
	let { render: t, className: n, style: r, state: i = fn, props: a = dn, refs: o = dn, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = Mm({ metadata: s });
	return Q(l, e, {
		state: i,
		ref: [...o, f],
		props: [
			d,
			...a,
			u
		],
		stateAttributesMapping: c
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/utils/findRootOwnerId.mjs
function Pm(e) {
	if (_t(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid") ?? void 0;
	if (!kt(e)) return Pm(Mt(e));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function Fm(e, t) {
	let n = C.useRef(null);
	function r(t) {
		Ha.flushSync(() => {
			e.setOpen(!1, hr(ir, t.nativeEvent, t.currentTarget));
		}), Li(n.current)?.focus();
	}
	function i(n) {
		let r = e.select("positionerElement");
		if (r && Ri(n, r)) e.context.beforeContentFocusGuardRef.current?.focus();
		else {
			Ha.flushSync(() => {
				e.setOpen(!1, hr(ir, n.nativeEvent, n.currentTarget));
			});
			let i = Ii(e.context.triggerFocusTargetRef.current || t.current);
			for (; i !== null && Fn(r, i);) {
				let e = i;
				if (i = Ni(i), i === e) break;
			}
			i?.focus();
		}
	}
	return {
		preFocusGuardRef: n,
		handlePreFocusGuardFocus: r,
		handleFocusTargetFocus: i
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function Im(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = C.useRef(!1);
	return C.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Zt(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : fn, [
		t,
		n,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var Lm = 2, Rm = Ks(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = Wp(!0), h = d?.store ?? m?.store;
	if (!h) throw Error(la(85));
	let g = zl(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = C.useRef(null), S = Bm(), w = Nl(!0), T = $a(), E = C.useMemo(() => T ?? new Ya(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = xc(g, x, h, {
		payload: f,
		closeDelay: u,
		parent: S,
		floatingTreeRoot: E,
		floatingNodeId: eo(E),
		floatingParentNodeId: Qa(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = S.type === "menubar", A = h.useState("disabled"), j = a || A || k && S.context.disabled, { getButtonProps: M, buttonRef: N } = Fl({
		disabled: j,
		native: o
	});
	C.useEffect(() => {
		!y && S.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		y,
		S.type
	]);
	let P = C.useRef(null), F = an(), I = Z((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		if (Fn(P.current, t) || Fn(h.select("positionerElement"), t) || t === P.current || t != null && Pm(t) === h.select("rootId")) return;
		let n = jm(P.current);
		e.clientX >= n.left - Lm && e.clientX <= n.right + Lm && e.clientY >= n.top - Lm && e.clientY <= n.bottom + Lm || E.events.emit("close", {
			domEvent: e,
			reason: cr
		});
	});
	C.useEffect(() => {
		y && h.select("lastOpenChangeReason") === "trigger-hover" && Zt(P.current).addEventListener("mouseup", I, { once: !0 });
	}, [
		y,
		I,
		h
	]);
	let L = k && S.context.hasSubmenuOpen, R = qc(v, {
		enabled: (c ?? L) && !j && S.type !== "context-menu" && (!k || L && !O),
		handleClose: ll({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: S.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: x,
		externalTree: E,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = zm(y, h.select("lastOpenChangeReason")), B = mo(v, {
		enabled: !j && S.type !== "context-menu",
		event: y && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: S.type === void 0 && z
	}), V = zc(v, { enabled: !j && L }), H = Im({
		open: y,
		enabled: k,
		mouseDownAction: "open"
	}), U = C.useMemo(() => va(V.reference, B.reference), [V.reference, B.reference]), W = h.useState("triggerProps", O), { preFocusGuardRef: G, handlePreFocusGuardFocus: ee, handleFocusTargetFocus: te } = Fm(h, x), ne = {
		disabled: j,
		open: y
	}, re = [
		P,
		t,
		N,
		D,
		x
	], ie = [
		U,
		R ?? fn,
		W,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), Zt(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		k ? { role: "menuitem" } : {},
		H,
		p,
		M
	], ae = Q("button", e, {
		enabled: !k,
		stateAttributesMapping: Ol,
		state: ne,
		ref: re,
		props: ie
	});
	return k ? /*#__PURE__*/ (0, Y.jsx)(Nm, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: ne,
		refs: re,
		props: ie,
		stateAttributesMapping: Ol
	}) : y ? /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
		/*#__PURE__*/ (0, Y.jsx)(Pr, {
			ref: G,
			onFocus: ee
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: ae }, g),
		/*#__PURE__*/ (0, Y.jsx)(Pr, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: te
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: ae }, g);
});
function zm(e, t) {
	let n = an(), [r, i] = C.useState(!1);
	return X(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function Bm() {
	let e = Kp(!0), t = Wp(!0), n = wm(!0);
	return C.useMemo(() => n ? {
		type: "menubar",
		context: n
	} : e && !t ? {
		type: "context-menu",
		context: e
	} : { type: void 0 }, [
		e,
		t,
		n
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/usePreviousValue.mjs
function Vm(e) {
	let [t, n] = C.useState({
		current: e,
		previous: null
	});
	return e !== t.current && n({
		current: e,
		previous: t.current
	}), t.previous;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/separator/Separator.mjs
var Hm = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return Q("div", e, {
		state: { orientation: i },
		ref: t,
		props: [{
			role: "separator",
			"aria-orientation": i
		}, o]
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/isElementDisabled.mjs
function Um(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function Wm({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Am, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function Gm({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Rm, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function Km({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = Au();
	return /* @__PURE__ */ (0, Y.jsx)(cm, {
		container: o,
		children: /* @__PURE__ */ (0, Y.jsx)(Sm, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsx)(am, {
				"data-slot": "dropdown-menu-content",
				className: J("cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function qm({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Qp, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function Jm({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)($p, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: J("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function Ym({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(em, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: J("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
//#endregion
//#region src/components/streamlit/dropdown-menu.tsx
function Xm({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "dropdown-menu",
		"data-testid": "ssui-v2-dropdown-menu",
		children: /* @__PURE__ */ (0, Y.jsxs)(Wm, {
			disabled: e.props.disabled,
			modal: !1,
			children: [/* @__PURE__ */ (0, Y.jsxs)(Gm, {
				render: /* @__PURE__ */ (0, Y.jsx)(Cu, { variant: "outline" }),
				children: [e.props.label, /* @__PURE__ */ (0, Y.jsx)(rf, {
					"aria-hidden": "true",
					"data-icon": "inline-end"
				})]
			}), /* @__PURE__ */ (0, Y.jsx)(Km, {
				"aria-label": e.props.menuLabel ?? e.props.label,
				"data-testid": "ssui-v2-dropdown-menu-content",
				children: /* @__PURE__ */ (0, Y.jsxs)(qm, { children: [e.props.menuLabel ? /* @__PURE__ */ (0, Y.jsx)(Jm, { children: e.props.menuLabel }) : null, e.props.items.length > 0 ? e.props.items.map((e) => /* @__PURE__ */ (0, Y.jsx)(Ym, {
					disabled: e.disabled,
					onClick: () => {
						t("action", e.value);
					},
					variant: e.variant,
					children: e.label
				}, e.value)) : /* @__PURE__ */ (0, Y.jsx)(Ym, {
					disabled: !0,
					children: "No actions"
				})] })
			})]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/tzName/index.js
function Zm(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/tzOffset/index.js
var Qm = {}, $m = {};
function eh(e, t) {
	try {
		let n = (Qm[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in $m ? $m[n] : nh(n, n.split(":"));
	} catch {
		if (e in $m) return $m[e];
		let t = e?.match(th);
		return t ? nh(e, t.slice(1)) : NaN;
	}
}
var th = /([+-]\d\d):?(\d\d)?/;
function nh(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return $m[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/date/mini.js
var rh = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(eh(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), sh(this, e)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -eh(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), ah(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, ih = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!ih.test(e)) return;
	let t = e.replace(ih, "$1UTC");
	rh.prototype[t] && (e.startsWith("get") ? rh.prototype[e] = function() {
		return this.internal[t]();
	} : (rh.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), oh(this), +this;
	}, rh.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), ah(this), +this;
	}));
});
function ah(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-eh(e.timeZone, e) * 60));
}
function oh(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), sh(e);
}
function sh(e, t) {
	let n = Array.isArray(t) ? ch(t) : +e.internal, r = eh(e.timeZone, e), i = r > 0 ? Math.floor(r) : Math.ceil(r), a = /* @__PURE__ */ new Date(+e);
	a.setUTCHours(a.getUTCHours() - 1);
	let o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+a)).getTimezoneOffset(), c = o - s, l = o;
	if (c && o !== i && Date.prototype.getHours.apply(e) !== (Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours())) {
		let t = /* @__PURE__ */ new Date(+e), n = o - i;
		n && t.setUTCMinutes(t.getUTCMinutes() + n);
		let r = eh(e.timeZone, t);
		(r > 0 ? Math.floor(r) : Math.ceil(r)) === i && (l = s);
	}
	let u = l - i;
	u && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + u);
	let d = /* @__PURE__ */ new Date(+e);
	d.setUTCSeconds(0);
	let f = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, p = Math.round(-(eh(e.timeZone, e) * 60)) % 60;
	(p || f) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + f);
	let m = eh(e.timeZone, e), h = m > 0 ? Math.floor(m) : Math.ceil(m), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, _ = h !== i, v = g - u, y = h - i, b = n - h * 60 * 1e3, x = y > 0 && lh(e) - n === y * 60 * 1e3 && lh(e, b) !== n;
	if (_ && v && !x) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
		let t = eh(e.timeZone, e), n = h - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && v < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n);
	}
	ah(e);
	let S = (t ? n : n + p * 1e3) - +e.internal;
	S && Math.abs(S) < 18e5 && (Date.prototype.setTime.call(e, +e + S), ah(e));
}
function ch(e) {
	return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function lh(e, t) {
	let n = new Date(t ?? +e);
	return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-eh(e.timeZone, n) * 60)), +n;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/date/index.js
var uh = class e extends rh {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), r = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + r;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, r] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, r] = this.tzComponents();
		return `${e} GMT${t}${n}${r} (${Zm(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, dh = 365.2425, fh = 6048e5, ph = 864e5, mh = 86400;
mh * 7, mh * dh / 12 * 3;
var hh = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constructFrom.js
function gh(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && hh in e ? e[hh](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/toDate.js
function _h(e, t) {
	return gh(t || e, e);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addDays.js
function vh(e, t, n) {
	let r = _h(e, n?.in);
	return isNaN(t) ? gh(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addMonths.js
function yh(e, t, n) {
	let r = _h(e, n?.in);
	if (isNaN(t)) return gh(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = gh(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/defaultOptions.js
var bh = {};
function xh() {
	return bh;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeek.js
function Sh(e, t) {
	let n = xh(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = _h(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfISOWeek.js
function Ch(e, t) {
	return Sh(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getISOWeekYear.js
function wh(e, t) {
	let n = _h(e, t?.in), r = n.getFullYear(), i = gh(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Ch(i), o = gh(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Ch(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Th(e) {
	let t = _h(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeDates.js
function Eh(e, ...t) {
	let n = gh.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfDay.js
function Dh(e, t) {
	let n = _h(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/differenceInCalendarDays.js
function Oh(e, t, n) {
	let [r, i] = Eh(n?.in, e, t), a = Dh(r), o = Dh(i), s = +a - Th(a), c = +o - Th(o);
	return Math.round((s - c) / ph);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfISOWeekYear.js
function kh(e, t) {
	let n = wh(e, t), r = gh(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Ch(r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addWeeks.js
function Ah(e, t, n) {
	return vh(e, t * 7, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addYears.js
function jh(e, t, n) {
	return yh(e, t * 12, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/max.js
function Mh(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = gh.bind(null, e));
		let t = _h(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), gh(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/min.js
function Nh(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = gh.bind(null, e));
		let t = _h(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), gh(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameDay.js
function Ph(e, t, n) {
	let [r, i] = Eh(n?.in, e, t);
	return +Dh(r) == +Dh(i);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isDate.js
function Fh(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isValid.js
function Ih(e) {
	return !(!Fh(e) && typeof e != "number" || isNaN(+_h(e)));
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/differenceInCalendarMonths.js
function Lh(e, t, n) {
	let [r, i] = Eh(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfMonth.js
function Rh(e, t) {
	let n = _h(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeInterval.js
function zh(e, t) {
	let [n, r] = Eh(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachMonthOfInterval.js
function Bh(e, t) {
	let { start: n, end: r } = zh(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(gh(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfMonth.js
function Vh(e, t) {
	let n = _h(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfYear.js
function Hh(e, t) {
	let n = _h(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfYear.js
function Uh(e, t) {
	let n = _h(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachYearOfInterval.js
function Wh(e, t) {
	let { start: n, end: r } = zh(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(gh(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfWeek.js
function Gh(e, t) {
	let n = xh(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = _h(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfISOWeek.js
function Kh(e, t) {
	return Gh(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var qh = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Jh = (e, t, n) => {
	let r, i = qh[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Yh(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var Xh = {
	date: Yh({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Yh({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Yh({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Zh = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Qh = (e, t, n, r) => Zh[e];
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function $h(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var eg = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: $h({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: $h({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: $h({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: $h({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: $h({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function tg(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? rg(s, (e) => e.test(o)) : ng(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function ng(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function rg(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function ig(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/en-US.js
var ag = {
	code: "en-US",
	formatDistance: Jh,
	formatLong: Xh,
	formatRelative: Qh,
	localize: eg,
	match: {
		ordinalNumber: ig({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: tg({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: tg({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: tg({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: tg({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: tg({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getDayOfYear.js
function og(e, t) {
	let n = _h(e, t?.in);
	return Oh(n, Uh(n)) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getISOWeek.js
function sg(e, t) {
	let n = _h(e, t?.in), r = Ch(n) - +kh(n);
	return Math.round(r / fh) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getWeekYear.js
function cg(e, t) {
	let n = _h(e, t?.in), r = n.getFullYear(), i = xh(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = gh(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = Sh(o, t), c = gh(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = Sh(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeekYear.js
function lg(e, t) {
	let n = xh(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = cg(e, t), a = gh(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), Sh(a, t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getWeek.js
function ug(e, t) {
	let n = _h(e, t?.in), r = Sh(n, t) - +lg(n, t);
	return Math.round(r / fh) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/addLeadingZeros.js
function dg(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/format/lightFormatters.js
var fg = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return dg(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : dg(n + 1, 2);
	},
	d(e, t) {
		return dg(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return dg(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return dg(e.getHours(), t.length);
	},
	m(e, t) {
		return dg(e.getMinutes(), t.length);
	},
	s(e, t) {
		return dg(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return dg(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, pg = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, mg = {
	G: function(e, t, n) {
		let r = +(e.getFullYear() > 0);
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return fg.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = cg(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? dg(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : dg(a, t.length);
	},
	R: function(e, t) {
		return dg(wh(e), t.length);
	},
	u: function(e, t) {
		return dg(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return dg(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return dg(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return fg.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return dg(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = ug(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : dg(i, t.length);
	},
	I: function(e, t, n) {
		let r = sg(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : dg(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : fg.d(e, t);
	},
	D: function(e, t, n) {
		let r = og(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : dg(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return dg(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return dg(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return dg(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? pg.noon : r === 0 ? pg.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? pg.evening : r >= 12 ? pg.afternoon : r >= 4 ? pg.morning : pg.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return fg.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : fg.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : dg(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : dg(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : fg.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : fg.s(e, t);
	},
	S: function(e, t) {
		return fg.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return gg(r);
			case "XXXX":
			case "XX": return _g(r);
			default: return _g(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return gg(r);
			case "xxxx":
			case "xx": return _g(r);
			default: return _g(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + hg(r, ":");
			default: return "GMT" + _g(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + hg(r, ":");
			default: return "GMT" + _g(r, ":");
		}
	},
	t: function(e, t, n) {
		return dg(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return dg(+e, t.length);
	}
};
function hg(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + dg(a, 2);
}
function gg(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + dg(Math.abs(e) / 60, 2) : _g(e, t);
}
function _g(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = dg(Math.trunc(r / 60), 2), a = dg(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/format/longFormatters.js
var vg = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, yg = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, bg = {
	p: yg,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return vg(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default: a = t.dateTime({ width: "full" });
		}
		return a.replace("{{date}}", vg(r, t)).replace("{{time}}", yg(i, t));
	}
}, xg = /^D+$/, Sg = /^Y+$/, Cg = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function wg(e) {
	return xg.test(e);
}
function Tg(e) {
	return Sg.test(e);
}
function Eg(e, t, n) {
	let r = Dg(e, t, n);
	if (console.warn(r), Cg.includes(e)) throw RangeError(r);
}
function Dg(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/format.js
var Og = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, kg = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ag = /^'([^]*?)'?$/, jg = /''/g, Mg = /[a-zA-Z]/;
function Ng(e, t, n) {
	let r = xh(), i = n?.locale ?? r.locale ?? ag, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = _h(e, n?.in);
	if (!Ih(s)) throw RangeError("Invalid time value");
	let c = t.match(kg).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = bg[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Og).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: Pg(e)
		};
		if (mg[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Mg)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && Tg(a) || !n?.useAdditionalDayOfYearTokens && wg(a)) && Eg(a, t, String(e));
		let o = mg[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function Pg(e) {
	let t = e.match(Ag);
	return t ? t[1].replace(jg, "'") : e;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getDaysInMonth.js
function Fg(e, t) {
	let n = _h(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = gh(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getMonth.js
function Ig(e, t) {
	return _h(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getYear.js
function Lg(e, t) {
	return _h(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isAfter.js
function Rg(e, t) {
	return +_h(e) > +_h(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isBefore.js
function zg(e, t) {
	return +_h(e) < +_h(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameMonth.js
function Bg(e, t, n) {
	let [r, i] = Eh(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameYear.js
function Vg(e, t, n) {
	let [r, i] = Eh(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/setMonth.js
function Hg(e, t, n) {
	let r = _h(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = gh(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Fg(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/setYear.js
function Ug(e, t, n) {
	let r = _h(e, n?.in);
	return isNaN(+r) ? gh(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var Wg = 5, Gg = 4;
function Kg(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, 34);
	return t.getMonth(e) === t.getMonth(a) ? Wg : Gg;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function qg(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function Jg(e, t) {
	let n = qg(e, t), r = Kg(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/locale/en-US.js
var Yg = {
	...ag,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ng(e, t, {
				locale: ag,
				...n
			});
			let a = i(e, "PPPP");
			return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ng(e, n, {
				locale: ag,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ng(e, t, {
				locale: ag,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ng(e, n, {
				locale: ag,
				...t
			}), r(e, "cccc");
		}
	}
}, Xg = class e {
	constructor(e, t) {
		this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? uh.tz(this.options.timeZone) : new (this.options.Date ?? Date)(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new uh(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : vh(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : yh(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : Ah(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : jh(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Oh(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : Lh(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Bh(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Wh(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Jg(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : Kh(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Rh(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : Gh(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : Hh(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Ng(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : sg(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Ig(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : Lg(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : ug(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Rg(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : zg(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Fh(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Ph(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : Bg(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Vg(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Mh(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Nh(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : Hg(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : Ug(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : qg(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Dh(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : Ch(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Vh(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : Sh(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : Uh(e), this.options = {
			locale: Yg,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: r, numerals: i } = this.options, a = n?.code;
		if (a && e.yearFirstLocales.has(a)) try {
			return new Intl.DateTimeFormat(a, {
				month: "long",
				year: "numeric",
				timeZone: r,
				numberingSystem: i
			}).format(t);
		} catch {}
		let o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, o);
	}
};
Xg.yearFirstLocales = /* @__PURE__ */ new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
var Zg = new Xg(), Qg = class {
	constructor(e, t, n = Zg) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, $g = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, e_ = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function t_(e) {
	return C.createElement("span", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Chevron.js
function n_(e) {
	let { size: t = 24, orientation: n = "left", className: r, style: i } = e;
	return C.createElement("svg", {
		className: r,
		style: i,
		width: t,
		height: t,
		viewBox: "0 0 24 24"
	}, n === "up" && C.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), n === "down" && C.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), n === "left" && C.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), n === "right" && C.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Day.js
function r_(e) {
	let { day: t, modifiers: n, ...r } = e;
	return C.createElement("td", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/DayButton.js
function i_(e) {
	let { day: t, modifiers: n, ...r } = e, i = C.useRef(null);
	return C.useEffect(() => {
		n.focused && i.current?.focus();
	}, [n.focused]), C.createElement("button", {
		ref: i,
		...r
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/UI.js
var a_;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(a_ ||= {});
var o_;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(o_ ||= {});
var s_;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(s_ ||= {});
var c_;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(c_ ||= {});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useDayPicker.js
var l_ = (0, C.createContext)(void 0);
function u_() {
	let e = (0, C.useContext)(l_);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function d_(e) {
	let { options: t, className: n, ...r } = e, { classNames: i, components: a, styles: o } = u_(), s = [i[a_.Dropdown], n].join(" "), c = t?.find(({ value: e }) => e === r.value);
	return C.createElement("span", {
		"data-disabled": r.disabled,
		className: i[a_.DropdownRoot],
		style: o?.[a_.DropdownRoot]
	}, C.createElement(a.Select, {
		className: s,
		...r
	}, t?.map(({ value: e, label: t, disabled: n }) => C.createElement(a.Option, {
		key: e,
		value: e,
		disabled: n
	}, t))), C.createElement("span", {
		className: i[a_.CaptionLabel],
		style: o?.[a_.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, C.createElement(a.Chevron, {
		orientation: "down",
		size: 18,
		className: i[a_.Chevron],
		style: o?.[a_.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function f_(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Footer.js
function p_(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Month.js
function m_(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return C.createElement("div", { ...r }, e.children);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function h_(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return C.createElement("div", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function g_(e) {
	return C.createElement("table", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Months.js
function __(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function v_(e) {
	let { components: t } = u_();
	return C.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Nav.js
function y_(e) {
	let { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: i, ...a } = e, { components: o, classNames: s, styles: c, labels: { labelPrevious: l, labelNext: u } } = u_(), d = (0, C.useCallback)((e) => {
		i && n?.(e);
	}, [i, n]), f = (0, C.useCallback)((e) => {
		r && t?.(e);
	}, [r, t]);
	return C.createElement("nav", { ...a }, C.createElement(o.PreviousMonthButton, {
		type: "button",
		className: s[a_.PreviousMonthButton],
		style: c?.[a_.PreviousMonthButton],
		tabIndex: r ? void 0 : -1,
		"aria-disabled": !r || void 0,
		"aria-label": l(r),
		onClick: f
	}, C.createElement(o.Chevron, {
		disabled: !r || void 0,
		className: s[a_.Chevron],
		style: c?.[a_.Chevron],
		orientation: "left"
	})), C.createElement(o.NextMonthButton, {
		type: "button",
		className: s[a_.NextMonthButton],
		style: c?.[a_.NextMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": !i || void 0,
		"aria-label": u(i),
		onClick: d
	}, C.createElement(o.Chevron, {
		disabled: !i || void 0,
		orientation: "right",
		className: s[a_.Chevron],
		style: c?.[a_.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function b_(e) {
	return C.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Option.js
function x_(e) {
	return C.createElement("option", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function S_(e) {
	return C.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Root.js
function C_(e) {
	let { rootRef: t, ...n } = e;
	return C.createElement("div", {
		...n,
		ref: t
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Select.js
function w_(e) {
	return C.createElement("select", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Week.js
function T_(e) {
	let { week: t, ...n } = e;
	return C.createElement("tr", { ...n });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weekday.js
function E_(e) {
	return C.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weekdays.js
function D_(e) {
	return C.createElement("thead", { "aria-hidden": !0 }, C.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function O_(e) {
	let { week: t, ...n } = e;
	return C.createElement("th", { ...n });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function k_(e) {
	return C.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weeks.js
function A_(e) {
	return C.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function j_(e) {
	let { components: t } = u_();
	return C.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/custom-components.js
var M_ = /* @__PURE__ */ s({
	CaptionLabel: () => t_,
	Chevron: () => n_,
	Day: () => r_,
	DayButton: () => i_,
	Dropdown: () => d_,
	DropdownNav: () => f_,
	Footer: () => p_,
	Month: () => m_,
	MonthCaption: () => h_,
	MonthGrid: () => g_,
	Months: () => __,
	MonthsDropdown: () => v_,
	Nav: () => y_,
	NextMonthButton: () => b_,
	Option: () => x_,
	PreviousMonthButton: () => S_,
	Root: () => C_,
	Select: () => w_,
	Week: () => T_,
	WeekNumber: () => O_,
	WeekNumberHeader: () => k_,
	Weekday: () => E_,
	Weekdays: () => D_,
	Weeks: () => A_,
	YearsDropdown: () => j_
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function N_(e, t, n = !1, r = Zg) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= +!!n && o(a, t) >= +!!n) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function P_(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function F_(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function I_(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function L_(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function R_(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function z_(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function B_(e, t, n = Zg) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (z_(t, n)) return t.some((t) => i(e, t));
		if (F_(t)) return N_(t, e, !1, n);
		if (R_(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (P_(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return I_(t) ? a(e, t.after) > 0 : L_(t) ? a(t.before, e) > 0 : typeof t == "function" && t(e);
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function V_(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[o_.focused]: [],
		[o_.outside]: [],
		[o_.disabled]: [],
		[o_.hidden]: [],
		[o_.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && B_(e, a, i)), S = !!(o && B_(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && B_(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[o_.focused]: !1,
			[o_.disabled]: !1,
			[o_.hidden]: !1,
			[o_.outside]: !1,
			[o_.today]: !1
		}, n = {};
		for (let n in y) t[n] = y[n].some((t) => t === e);
		for (let t in b) n[t] = b[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function H_(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[o_[r]] ? e.push(t[o_[r]]) : t[s_[r]] && e.push(t[s_[r]]), e), [t[a_.Day]]);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function U_(e) {
	return {
		...M_,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function W_(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function G_() {
	let e = {};
	for (let t in a_) e[a_[t]] = `rdp-${a_[t]}`;
	for (let t in o_) e[o_[t]] = `rdp-${o_[t]}`;
	for (let t in s_) e[s_[t]] = `rdp-${s_[t]}`;
	for (let t in c_) e[c_[t]] = `rdp-${c_[t]}`;
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function K_(e, t, n) {
	return (n ?? new Xg(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function q_(e, t, n) {
	return (n ?? new Xg(t)).format(e, "d");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function J_(e, t = Zg) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function Y_(e, t, n) {
	return (n ?? new Xg(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function X_(e, t = Zg) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function Z_() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function Q_(e, t = Zg) {
	return t.format(e, "yyyy");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/index.js
var $_ = /* @__PURE__ */ s({
	formatCaption: () => K_,
	formatDay: () => q_,
	formatMonthDropdown: () => J_,
	formatWeekNumber: () => X_,
	formatWeekNumberHeader: () => Z_,
	formatWeekdayName: () => Y_,
	formatYearDropdown: () => Q_
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function ev(e) {
	return {
		...$_,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function tv(e, t, n, r) {
	let i = (r ?? new Xg(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function nv(e, t, n) {
	return (n ?? new Xg(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function rv(e, t, n, r) {
	let i = (r ?? new Xg(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function iv(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function av() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var ov = "Go to the Next Month";
function sv(e, t) {
	return ov;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function cv(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function lv(e, t, n) {
	return (n ?? new Xg(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function uv(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function dv(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function fv(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/index.js
var pv = /* @__PURE__ */ s({
	labelDayButton: () => tv,
	labelGrid: () => nv,
	labelGridcell: () => rv,
	labelMonthDropdown: () => iv,
	labelNav: () => av,
	labelNext: () => sv,
	labelPrevious: () => cv,
	labelWeekNumber: () => uv,
	labelWeekNumberHeader: () => dv,
	labelWeekday: () => lv,
	labelYearDropdown: () => fv
}), mv = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function hv(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...pv,
		...e ?? {},
		labelDayButton: mv(tv, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: mv(iv, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: mv(sv, e?.labelNext, n.labelNext),
		labelPrevious: mv(cv, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: mv(uv, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: mv(fv, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: mv(nv, e?.labelGrid, n.labelGrid),
		labelGridcell: mv(rv, e?.labelGridcell, n.labelGridcell),
		labelNav: mv(av, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: mv(dv, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: mv(lv, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function gv(e, t, n, r, i) {
	let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
	return c({
		start: o(e),
		end: s(e)
	}).map((e) => {
		let o = r.formatMonthDropdown(e, i);
		return {
			value: l(e),
			label: o,
			disabled: t && e < a(t) || n && e > a(n) || !1
		};
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function _v(e, t = {}, n = {}) {
	let r = { ...t?.[a_.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function vv(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function yv(e, t, n, r, i = !1) {
	if (!e || !t) return;
	let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r, l = s({
		start: a(e),
		end: o(t)
	});
	return i && l.reverse(), l.map((e) => {
		let t = n.formatYearDropdown(e, r);
		return {
			value: c(e),
			label: t,
			disabled: !1
		};
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/noonDateLib.js
function bv(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new uh(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(uh.tz(e)),
		newDate: (t, n, r) => new uh(t, n, r, 12, 0, 0, e),
		startOfDay: (e) => a(e),
		startOfWeek: (e, t) => {
			let n = a(e), r = t?.weekStartsOn ?? i, o = (n.getDay() - r + 7) % 7;
			return n.setDate(n.getDate() - o), n;
		},
		startOfISOWeek: (e) => {
			let t = a(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = a(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = a(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = a(e), r = (((t?.weekStartsOn ?? i) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + r), n;
		},
		endOfISOWeek: (e) => {
			let t = a(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = a(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = a(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new uh(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new uh(o, e)), o.setMonth(o.getMonth() + 1, 1);
			return i;
		},
		addDays: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = a(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = a(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new uh(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new uh(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => ug(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => sg(o(e)),
		differenceInCalendarDays: (e, t) => Oh(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => Lh(o(e), o(t))
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useAnimation.js
var xv = (e) => e instanceof HTMLElement ? e : null, Sv = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Cv = (e) => xv(e.querySelector("[data-animated-month]")), wv = (e) => xv(e.querySelector("[data-animated-caption]")), Tv = (e) => xv(e.querySelector("[data-animated-weeks]")), Ev = (e) => xv(e.querySelector("[data-animated-nav]")), Dv = (e) => xv(e.querySelector("[data-animated-weekdays]"));
function Ov(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = (0, C.useRef)(null), s = (0, C.useRef)(r), c = (0, C.useRef)(!1);
	(0, C.useLayoutEffect)(() => {
		let l = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || l.length === 0 || r.length !== l.length) return;
		let u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[c_.caption_after_enter] : n[c_.caption_before_enter], p = d ? n[c_.weeks_after_enter] : n[c_.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Sv(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Cv(e);
			t && e.contains(t) && e.removeChild(t);
			let n = wv(e);
			n && n.classList.remove(f);
			let r = Tv(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, c.current || u || i) return;
		let g = m instanceof HTMLElement ? Sv(m) : [], _ = Sv(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g?.every((e) => e instanceof HTMLElement)) {
			c.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Ev(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = wv(i);
				s && s.classList.add(f);
				let l = Tv(i);
				l && l.classList.add(p);
				let u = () => {
					c.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), l && l.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = Dv(o);
				m && (m.style.opacity = "0");
				let h = wv(o);
				h && (h.classList.add(d ? n[c_.caption_before_exit] : n[c_.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Tv(o);
				_ && _.classList.add(d ? n[c_.weeks_before_exit] : n[c_.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function kv(e, t, n, r) {
	let i = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: m, endOfWeek: h, isAfter: g, startOfBroadcastWeek: _, startOfISOWeek: v, startOfWeek: y } = r, b = c ? _(i, r) : o ? v(i) : y(i), x = c ? f(a) : o ? p(m(a)) : h(m(a)), S = t && (c ? f(t) : o ? p(t) : h(t)), C = u(S && g(x, S) ? S : x, b), w = d(a, i) + 1, T = [];
	for (let e = 0; e <= C; e++) {
		let t = l(b, e);
		T.push(t);
	}
	let E = (c ? 35 : 42) * w;
	if (s && T.length < E) {
		let e = E - T.length;
		for (let t = 0; t < e; t++) {
			let e = l(T[T.length - 1], 1);
			T.push(e);
		}
	}
	return T;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDays.js
function Av(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function jv(e, t, n, r) {
	let { numberOfMonths: i = 1 } = n, a = [];
	for (let n = 0; n < i; n++) {
		let i = r.addMonths(e, n);
		if (t && i > t) break;
		a.push(i);
	}
	return a;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function Mv(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function Nv(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new $g(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new Qg(t, m, r);
			return a ? a.days.push(o) : e.push(new e_(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function Pv(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, today: u } = t, d = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : !n && d && (n = i(c(e.today ?? u(), -100))), r ? r = s(r) : !r && d && (r = l(e.today ?? u())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function Fv(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function Iv(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function Lv(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function Rv(e, t) {
	let [n, r] = (0, C.useState)(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useCalendar.js
function zv(e, t) {
	let [n, r] = Pv(e, t), { startOfMonth: i, endOfMonth: a } = t, o = Mv(e, n, r, t), [s, c] = Rv(o, e.month ? o : void 0);
	(0, C.useEffect)(() => {
		let i = Mv(e, n, r, t);
		c(i);
	}, [e.timeZone]);
	let { months: l, weeks: u, days: d, previousMonth: f, nextMonth: p } = (0, C.useMemo)(() => {
		let i = jv(s, r, { numberOfMonths: e.numberOfMonths }, t), o = Nv(i, kv(i, e.endMonth ? a(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: o,
			weeks: Lv(o),
			days: Av(o),
			previousMonth: Iv(s, n, e, t),
			nextMonth: Fv(s, r, e, t)
		};
	}, [
		t,
		s.getTime(),
		r?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: m, onMonthChange: h } = e, g = (e) => u.some((t) => t.days.some((t) => t.isEqualTo(e))), _ = (e) => {
		if (m) return;
		let t = i(e);
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), c(t), h?.(t);
	};
	return {
		months: l,
		weeks: u,
		days: d,
		navStart: n,
		navEnd: r,
		previousMonth: f,
		nextMonth: p,
		goToMonth: _,
		goToDay: (e) => {
			g(e) || _(e.date);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var Bv;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Bv ||= {});
function Vv(e) {
	return !e[o_.disabled] && !e[o_.hidden] && !e[o_.outside];
}
function Hv(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		Vv(e) && (e[o_.focused] && a < Bv.FocusedModifier ? (i = o, a = Bv.FocusedModifier) : r?.isEqualTo(o) && a < Bv.LastFocused ? (i = o, a = Bv.LastFocused) : n(o.date) && a < Bv.Selected ? (i = o, a = Bv.Selected) : e[o_.today] && a < Bv.Today && (i = o, a = Bv.Today));
	}
	return i ||= e.find((e) => Vv(t(e))), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function Uv(e, t, n, r, i, a, o) {
	let { ISOWeek: s, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfWeek: h, max: g, min: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = o, x = {
		day: l,
		week: d,
		month: u,
		year: f,
		startOfWeek: (e) => c ? v(e, o) : s ? y(e) : b(e),
		endOfWeek: (e) => c ? p(e) : s ? m(e) : h(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && r ? x = g([r, x]) : t === "after" && i && (x = _([i, x])), x;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function Wv(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = Uv(e, t, n.date, r, i, a, o), l = !!(a.disabled && B_(c, a.disabled, o)), u = !!(a.hidden && B_(c, a.hidden, o)), d = new Qg(c, c, o);
	return !l && !u ? d : Wv(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useFocus.js
function Gv(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = (0, C.useState)(), c = Hv(t.days, n, r || (() => !1), o), [l, u] = (0, C.useState)(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = Wv(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function Kv(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Rv(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = [...s ?? []];
			if (l(e)) {
				if (s?.length === u || r && s?.length === 1) return;
				a = s?.filter((t) => !c(t, e));
			} else a = s?.length === d ? [e] : [...a, e];
			return i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: l
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/addToRange.js
function qv(e, t, n = 0, r = 0, i = !1, a = Zg) {
	let { from: o, to: s } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a, d;
	if (!o && !s) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (o && !s) d = c(o, e) ? n === 0 ? {
		from: o,
		to: e
	} : i ? {
		from: o,
		to: void 0
	} : void 0 : u(e, o) ? {
		from: e,
		to: o
	} : {
		from: o,
		to: e
	};
	else if (o && s) if (c(o, e) && c(s, e)) d = i ? {
		from: o,
		to: s
	} : void 0;
	else if (c(o, e)) d = {
		from: o,
		to: n > 0 ? void 0 : e
	};
	else if (c(s, e)) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (u(e, o)) d = {
		from: e,
		to: s
	};
	else if (l(e, o)) d = {
		from: o,
		to: e
	};
	else if (l(e, s)) d = {
		from: o,
		to: e
	};
	else throw Error("Invalid range");
	if (d?.from && d?.to) {
		let t = a.differenceInCalendarDays(d.to, d.from);
		(r > 0 && t > r || n > 1 && t < n) && (d = {
			from: e,
			to: void 0
		});
	}
	return d;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function Jv(e, t, n = Zg) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function Yv(e, t, n = Zg) {
	return N_(e, t.from, !1, n) || N_(e, t.to, !1, n) || N_(t, e.from, !1, n) || N_(t, e.to, !1, n);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function Xv(e, t, n = Zg) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? N_(e, t, !1, n) : z_(t, n) ? t.some((t) => N_(e, t, !1, n)) : F_(t) ? t.from && t.to ? Yv(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : R_(t) ? Jv(e, t.dayOfWeek, n) : P_(t) ? n.isAfter(t.before, t.after) ? Yv(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : B_(e.from, t, n) || B_(e.to, t, n) : I_(t) || L_(t) ? B_(e.from, t, n) || B_(e.to, t, n) : !1)) return !0;
	let i = r.filter((e) => typeof e == "function");
	if (i.length) {
		let t = e.from, r = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= r; e++) {
			if (i.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/selection/useRange.js
function Zv(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = Rv(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : qv(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && Xv({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && N_(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function Qv(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Rv(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = e;
			return !r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: (e) => s ? c(s, e) : !1
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useSelection.js
function $v(e, t) {
	let n = Qv(e, t), r = Kv(e, t), i = Zv(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function ey(e, t) {
	return e instanceof uh && e.timeZone === t ? e : new uh(e, t);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function ty(e, t, n) {
	if (!n) return ey(e, t);
	let r = ey(e, t), i = new uh(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function ny(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? ty(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? ty(e, t, n) : e) : F_(e) ? {
		...e,
		from: e.from ? ey(e.from, t) : e.from,
		to: e.to ? ey(e.to, t) : e.to
	} : P_(e) ? {
		before: ty(e.before, t, n),
		after: ty(e.after, t, n)
	} : I_(e) ? { after: ty(e.after, t, n) } : L_(e) ? { before: ty(e.before, t, n) } : e;
}
function ry(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => ny(e, t, n)) : ny(e, t, n));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/DayPicker.js
function iy(e) {
	let t = e, n = t.timeZone;
	if (n && (t = {
		...e,
		timeZone: n
	}, t.today && (t.today = ey(t.today, n)), t.month && (t.month = ey(t.month, n)), t.defaultMonth && (t.defaultMonth = ey(t.defaultMonth, n)), t.startMonth && (t.startMonth = ey(t.startMonth, n)), t.endMonth && (t.endMonth = ey(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = ey(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((e) => ey(e, n)) : t.mode === "range" && t.selected && (t.selected = {
		from: t.selected.from ? ey(t.selected.from, n) : t.selected.from,
		to: t.selected.to ? ey(t.selected.to, n) : t.selected.to
	}), t.disabled !== void 0 && (t.disabled = ry(t.disabled, n)), t.hidden !== void 0 && (t.hidden = ry(t.hidden, n)), t.modifiers)) {
		let e = {};
		Object.keys(t.modifiers).forEach((r) => {
			e[r] = ry(t.modifiers?.[r], n);
		}), t.modifiers = e;
	}
	let { components: r, formatters: i, labels: a, dateLib: o, locale: s, classNames: c } = (0, C.useMemo)(() => {
		let e = {
			...Yg,
			...t.locale
		}, n = t.broadcastCalendar ? 1 : t.weekStartsOn, r = t.noonSafe && t.timeZone ? bv(t.timeZone, {
			weekStartsOn: n,
			locale: e
		}) : void 0, i = t.dateLib && r ? {
			...r,
			...t.dateLib
		} : t.dateLib ?? r, a = new Xg({
			locale: e,
			weekStartsOn: n,
			firstWeekContainsDate: t.firstWeekContainsDate,
			useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
			timeZone: t.timeZone,
			numerals: t.numerals
		}, i);
		return {
			dateLib: a,
			components: U_(t.components),
			formatters: ev(t.formatters),
			labels: hv(t.labels, a.options),
			locale: e,
			classNames: {
				...G_(),
				...t.classNames
			}
		};
	}, [
		t.locale,
		t.broadcastCalendar,
		t.weekStartsOn,
		t.firstWeekContainsDate,
		t.useAdditionalWeekYearTokens,
		t.useAdditionalDayOfYearTokens,
		t.timeZone,
		t.numerals,
		t.dateLib,
		t.noonSafe,
		t.components,
		t.formatters,
		t.labels,
		t.classNames
	]);
	t.today || (t = {
		...t,
		today: o.today()
	});
	let { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: p, onDayClick: m, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: _, onDayMouseLeave: v, onNextClick: y, onPrevClick: b, showWeekNumber: x, styles: S } = t, { formatCaption: w, formatDay: T, formatMonthDropdown: E, formatWeekNumber: D, formatWeekNumberHeader: O, formatWeekdayName: k, formatYearDropdown: A } = i, j = zv(t, o), { days: M, months: N, navStart: P, navEnd: F, previousMonth: I, nextMonth: L, goToMonth: R } = j, z = V_(M, t, P, F, o), { isSelected: B, select: V, selected: H } = $v(t, o) ?? {}, { blur: U, focused: W, isFocusTarget: G, moveFocus: ee, setFocused: te } = Gv(t, j, z, B ?? (() => !1), o), { labelDayButton: ne, labelGridcell: re, labelGrid: ie, labelMonthDropdown: ae, labelNav: oe, labelPrevious: se, labelNext: ce, labelWeekday: le, labelWeekNumber: ue, labelWeekNumberHeader: de, labelYearDropdown: fe } = a, pe = (0, C.useMemo)(() => vv(o, t.ISOWeek, t.broadcastCalendar, t.today), [
		o,
		t.ISOWeek,
		t.broadcastCalendar,
		t.today
	]), me = u !== void 0 || m !== void 0, he = (0, C.useCallback)(() => {
		I && (R(I), b?.(I));
	}, [
		I,
		R,
		b
	]), ge = (0, C.useCallback)(() => {
		L && (R(L), y?.(L));
	}, [
		R,
		L,
		y
	]), _e = (0, C.useCallback)((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), te(e), !t.disabled && (V?.(e.date, t, n), m?.(e.date, t, n));
	}, [
		V,
		m,
		te
	]), ve = (0, C.useCallback)((e, t) => (n) => {
		te(e), h?.(e.date, t, n);
	}, [h, te]), ye = (0, C.useCallback)((e, t) => (n) => {
		U(), p?.(e.date, t, n);
	}, [U, p]), be = (0, C.useCallback)((e, n) => (r) => {
		let i = {
			ArrowLeft: [r.shiftKey ? "month" : "day", t.dir === "rtl" ? "after" : "before"],
			ArrowRight: [r.shiftKey ? "month" : "day", t.dir === "rtl" ? "before" : "after"],
			ArrowDown: [r.shiftKey ? "year" : "week", "after"],
			ArrowUp: [r.shiftKey ? "year" : "week", "before"],
			PageUp: [r.shiftKey ? "year" : "month", "before"],
			PageDown: [r.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (i[r.key]) {
			r.preventDefault(), r.stopPropagation();
			let [e, t] = i[r.key];
			ee(e, t);
		}
		g?.(e.date, n, r);
	}, [
		ee,
		g,
		t.dir
	]), xe = (0, C.useCallback)((e, t) => (n) => {
		_?.(e.date, t, n);
	}, [_]), Se = (0, C.useCallback)((e, t) => (n) => {
		v?.(e.date, t, n);
	}, [v]), Ce = (0, C.useCallback)((e, t) => (n) => {
		let r = Number(n.target.value), i = o.setMonth(o.startOfMonth(e), r);
		R(o.addMonths(i, -t));
	}, [o, R]), we = (0, C.useCallback)((e, t) => (n) => {
		let r = Number(n.target.value), i = o.setYear(o.startOfMonth(e), r);
		R(o.addMonths(i, -t));
	}, [o, R]), { className: Te, style: Ee } = (0, C.useMemo)(() => ({
		className: [c[a_.Root], t.className].filter(Boolean).join(" "),
		style: {
			...S?.[a_.Root],
			...t.style
		}
	}), [
		c,
		t.className,
		t.style,
		S
	]), De = W_(t), Oe = (e) => {
		let t = S?.[a_.Dropdown], n = S?.[e];
		if (!(!t && !n)) return {
			...t,
			...n
		};
	}, ke = (0, C.useRef)(null);
	Ov(ke, !!t.animate, {
		classNames: c,
		months: N,
		focused: W,
		dateLib: o
	});
	let Ae = {
		dayPickerProps: t,
		selected: H,
		select: V,
		isSelected: B,
		months: N,
		nextMonth: L,
		previousMonth: I,
		goToMonth: R,
		getModifiers: z,
		components: r,
		classNames: c,
		styles: S,
		labels: a,
		formatters: i
	};
	return C.createElement(l_.Provider, { value: Ae }, C.createElement(r.Root, {
		rootRef: t.animate ? ke : void 0,
		className: Te,
		style: Ee,
		dir: t.dir,
		id: t.id,
		lang: t.lang ?? s.code,
		nonce: t.nonce,
		title: t.title,
		role: t.role,
		"aria-label": t["aria-label"],
		"aria-labelledby": t["aria-labelledby"],
		...De
	}, C.createElement(r.Months, {
		className: c[a_.Months],
		style: S?.[a_.Months]
	}, !t.hideNavigation && !d && C.createElement(r.Nav, {
		"data-animated-nav": t.animate ? "true" : void 0,
		className: c[a_.Nav],
		style: S?.[a_.Nav],
		"aria-label": oe(),
		onPreviousClick: he,
		onNextClick: ge,
		previousMonth: I,
		nextMonth: L
	}), N.map((e, n) => {
		let a = t.reverseMonths ? N.length - 1 - n : n;
		return C.createElement(r.Month, {
			"data-animated-month": t.animate ? "true" : void 0,
			className: c[a_.Month],
			style: S?.[a_.Month],
			key: n,
			displayIndex: n,
			calendarMonth: e
		}, d === "around" && !t.hideNavigation && n === 0 && C.createElement(r.PreviousMonthButton, {
			type: "button",
			className: c[a_.PreviousMonthButton],
			style: S?.[a_.PreviousMonthButton],
			tabIndex: I ? void 0 : -1,
			"aria-disabled": !I || void 0,
			"aria-label": se(I),
			onClick: he,
			"data-animated-button": t.animate ? "true" : void 0
		}, C.createElement(r.Chevron, {
			disabled: !I || void 0,
			className: c[a_.Chevron],
			style: S?.[a_.Chevron],
			orientation: t.dir === "rtl" ? "right" : "left"
		})), C.createElement(r.MonthCaption, {
			"data-animated-caption": t.animate ? "true" : void 0,
			className: c[a_.MonthCaption],
			style: S?.[a_.MonthCaption],
			calendarMonth: e,
			displayIndex: n
		}, l?.startsWith("dropdown") ? C.createElement(r.DropdownNav, {
			className: c[a_.Dropdowns],
			style: S?.[a_.Dropdowns]
		}, (() => {
			let n = l === "dropdown" || l === "dropdown-months" ? C.createElement(r.MonthsDropdown, {
				key: "month",
				className: c[a_.MonthsDropdown],
				"aria-label": ae(),
				disabled: !!t.disableNavigation,
				onChange: Ce(e.date, a),
				options: gv(e.date, P, F, i, o),
				style: Oe(a_.MonthsDropdown),
				value: o.getMonth(e.date)
			}) : C.createElement("span", { key: "month" }, E(e.date, o)), s = l === "dropdown" || l === "dropdown-years" ? C.createElement(r.YearsDropdown, {
				key: "year",
				className: c[a_.YearsDropdown],
				"aria-label": fe(o.options),
				disabled: !!t.disableNavigation,
				onChange: we(e.date, a),
				options: yv(P, F, i, o, !!t.reverseYears),
				style: Oe(a_.YearsDropdown),
				value: o.getYear(e.date)
			}) : C.createElement("span", { key: "year" }, A(e.date, o));
			return o.getMonthYearOrder() === "year-first" ? [s, n] : [n, s];
		})(), C.createElement("span", {
			role: "status",
			"aria-live": "polite",
			style: {
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal"
			}
		}, w(e.date, o.options, o))) : C.createElement(r.CaptionLabel, {
			className: c[a_.CaptionLabel],
			style: S?.[a_.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, w(e.date, o.options, o))), d === "around" && !t.hideNavigation && n === f - 1 && C.createElement(r.NextMonthButton, {
			type: "button",
			className: c[a_.NextMonthButton],
			style: S?.[a_.NextMonthButton],
			tabIndex: L ? void 0 : -1,
			"aria-disabled": !L || void 0,
			"aria-label": ce(L),
			onClick: ge,
			"data-animated-button": t.animate ? "true" : void 0
		}, C.createElement(r.Chevron, {
			disabled: !L || void 0,
			className: c[a_.Chevron],
			style: S?.[a_.Chevron],
			orientation: t.dir === "rtl" ? "left" : "right"
		})), n === f - 1 && d === "after" && !t.hideNavigation && C.createElement(r.Nav, {
			"data-animated-nav": t.animate ? "true" : void 0,
			className: c[a_.Nav],
			style: S?.[a_.Nav],
			"aria-label": oe(),
			onPreviousClick: he,
			onNextClick: ge,
			previousMonth: I,
			nextMonth: L
		}), C.createElement(r.MonthGrid, {
			role: "grid",
			"aria-multiselectable": u === "multiple" || u === "range",
			"aria-label": ie(e.date, o.options, o) || void 0,
			className: c[a_.MonthGrid],
			style: S?.[a_.MonthGrid]
		}, !t.hideWeekdays && C.createElement(r.Weekdays, {
			"data-animated-weekdays": t.animate ? "true" : void 0,
			className: c[a_.Weekdays],
			style: S?.[a_.Weekdays]
		}, x && C.createElement(r.WeekNumberHeader, {
			"aria-label": de(o.options),
			className: c[a_.WeekNumberHeader],
			style: S?.[a_.WeekNumberHeader],
			scope: "col"
		}, O()), pe.map((e) => C.createElement(r.Weekday, {
			"aria-label": le(e, o.options, o),
			className: c[a_.Weekday],
			key: String(e),
			style: S?.[a_.Weekday],
			scope: "col"
		}, k(e, o.options, o)))), C.createElement(r.Weeks, {
			"data-animated-weeks": t.animate ? "true" : void 0,
			className: c[a_.Weeks],
			style: S?.[a_.Weeks]
		}, e.weeks.map((e) => C.createElement(r.Week, {
			className: c[a_.Week],
			key: e.weekNumber,
			style: S?.[a_.Week],
			week: e
		}, x && C.createElement(r.WeekNumber, {
			week: e,
			style: S?.[a_.WeekNumber],
			"aria-label": ue(e.weekNumber, { locale: s }),
			className: c[a_.WeekNumber],
			scope: "row",
			role: "rowheader"
		}, D(e.weekNumber, o)), e.days.map((e) => {
			let { date: n } = e, i = z(e);
			if (i[o_.focused] = !i.hidden && !!W?.isEqualTo(e), i[s_.selected] = B?.(n) || i.selected, F_(H)) {
				let { from: e, to: t } = H;
				i[s_.range_start] = !!(e && t && o.isSameDay(n, e)), i[s_.range_end] = !!(e && t && o.isSameDay(n, t)), i[s_.range_middle] = N_(H, n, !0, o);
			}
			let a = _v(i, S, t.modifiersStyles), s = H_(i, c, t.modifiersClassNames), l = !me && !i.hidden ? re(n, i, o.options, o) : void 0;
			return C.createElement(r.Day, {
				key: `${e.isoDate}_${e.displayMonthId}`,
				day: e,
				modifiers: i,
				className: s.join(" "),
				style: a,
				role: "gridcell",
				"aria-selected": i.selected || void 0,
				"aria-label": l,
				"data-day": e.isoDate,
				"data-month": e.outside ? e.dateMonthId : void 0,
				"data-selected": i.selected || void 0,
				"data-disabled": i.disabled || void 0,
				"data-hidden": i.hidden || void 0,
				"data-outside": e.outside || void 0,
				"data-focused": i.focused || void 0,
				"data-today": i.today || void 0
			}, !i.hidden && me ? C.createElement(r.DayButton, {
				className: c[a_.DayButton],
				style: S?.[a_.DayButton],
				type: "button",
				day: e,
				modifiers: i,
				disabled: !i.focused && i.disabled || void 0,
				"aria-disabled": i.focused && i.disabled || void 0,
				tabIndex: G(e) ? 0 : -1,
				"aria-label": ne(n, i, o.options, o),
				onClick: _e(e, i),
				onBlur: ye(e, i),
				onFocus: ve(e, i),
				onKeyDown: be(e, i),
				onMouseEnter: xe(e, i),
				onMouseLeave: Se(e, i)
			}, T(n, o.options, o)) : !i.hidden && T(e.date, o.options, o));
		}))))));
	})), t.footer && C.createElement(r.Footer, {
		className: c[a_.Footer],
		style: S?.[a_.Footer],
		role: "status",
		"aria-live": "polite"
	}, t.footer)));
}
//#endregion
//#region src/components/ui/calendar.tsx
function ay({ className: e, classNames: t, showOutsideDays: n = !0, captionLayout: r = "label", buttonVariant: i = "ghost", locale: a, formatters: o, components: s, ...c }) {
	let l = G_();
	return /* @__PURE__ */ (0, Y.jsx)(iy, {
		showOutsideDays: n,
		className: J("group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, e),
		captionLayout: r,
		locale: a,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString(a?.code, { month: "short" }),
			...o
		},
		classNames: {
			root: J("w-fit", l.root),
			months: J("relative flex flex-col gap-4 md:flex-row", l.months),
			month: J("flex w-full flex-col gap-4", l.month),
			nav: J("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", l.nav),
			button_previous: J(Su({ variant: i }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", l.button_previous),
			button_next: J(Su({ variant: i }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", l.button_next),
			month_caption: J("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", l.month_caption),
			dropdowns: J("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", l.dropdowns),
			dropdown_root: J("cn-calendar-dropdown-root relative rounded-(--cell-radius)", l.dropdown_root),
			dropdown: J("absolute inset-0 bg-popover opacity-0", l.dropdown),
			caption_label: J("font-medium select-none", r === "label" ? "cn-calendar-caption text-sm" : "cn-calendar-caption-label flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", l.caption_label),
			month_grid: J("w-full border-collapse", l.month_grid),
			weekdays: J("flex", l.weekdays),
			weekday: J("flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none", l.weekday),
			week: J("mt-2 flex w-full", l.week),
			week_number_header: J("w-(--cell-size) select-none", l.week_number_header),
			week_number: J("text-[0.8rem] text-muted-foreground select-none", l.week_number),
			day: J("group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", c.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)", l.day),
			range_start: J("relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted", l.range_start),
			range_middle: J("rounded-none", l.range_middle),
			range_end: J("relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted", l.range_end),
			today: J("rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none", l.today),
			outside: J("text-muted-foreground aria-selected:text-muted-foreground", l.outside),
			disabled: J("text-muted-foreground opacity-50", l.disabled),
			hidden: J("invisible", l.hidden),
			...t
		},
		components: {
			Root: ({ className: e, rootRef: t, ...n }) => /* @__PURE__ */ (0, Y.jsx)("div", {
				"data-slot": "calendar",
				ref: t,
				className: J(e),
				...n
			}),
			Chevron: ({ className: e, orientation: t, ...n }) => t === "left" ? /* @__PURE__ */ (0, Y.jsx)(af, { className: J("cn-rtl-flip size-4", e) }) : t === "right" ? /* @__PURE__ */ (0, Y.jsx)(of, { className: J("cn-rtl-flip size-4", e) }) : /* @__PURE__ */ (0, Y.jsx)(rf, { className: J("size-4", e) }),
			DayButton: ({ ...e }) => /* @__PURE__ */ (0, Y.jsx)(oy, {
				locale: a,
				...e
			}),
			WeekNumber: ({ children: e, ...t }) => /* @__PURE__ */ (0, Y.jsx)("td", {
				...t,
				children: /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "flex size-(--cell-size) items-center justify-center text-center",
					children: e
				})
			}),
			...s
		},
		...c
	});
}
function oy({ className: e, day: t, modifiers: n, locale: r, ...i }) {
	let a = G_(), o = C.useRef(null);
	return C.useEffect(() => {
		n.focused && o.current?.focus();
	}, [n.focused]), /* @__PURE__ */ (0, Y.jsx)(Cu, {
		variant: "ghost",
		size: "icon",
		"data-day": t.date.toLocaleDateString(r?.code),
		"data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
		"data-range-start": n.range_start,
		"data-range-end": n.range_end,
		"data-range-middle": n.range_middle,
		className: J("relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70", a.day, e),
		...i
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/root/PopoverRootContext.mjs
var sy = /*#__PURE__*/ C.createContext(void 0);
function cy(e) {
	let t = C.useContext(sy);
	if (t === void 0 && !e) throw Error(la(47));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/store/PopoverStore.mjs
function ly() {
	return {
		...Oc(),
		disabled: !1,
		modal: !1,
		focusManagerModal: !1,
		instantType: void 0,
		openMethod: null,
		openChangeReason: null,
		titleElementId: void 0,
		descriptionElementId: void 0,
		stickIfOpen: !0,
		nested: !1,
		openOnHover: !1,
		closeDelay: 0,
		hasViewport: !1
	};
}
var uy = {
	...Fc,
	disabled: $((e) => e.disabled),
	instantType: $((e) => e.instantType),
	openMethod: $((e) => e.openMethod),
	openChangeReason: $((e) => e.openChangeReason),
	modal: $((e) => e.modal),
	focusManagerModal: $((e) => e.focusManagerModal),
	stickIfOpen: $((e) => e.stickIfOpen),
	titleElementId: $((e) => e.titleElementId),
	descriptionElementId: $((e) => e.descriptionElementId),
	openOnHover: $((e) => e.openOnHover),
	closeDelay: $((e) => e.closeDelay),
	hasViewport: $((e) => e.hasViewport)
}, dy = class e extends nc {
	constructor(e, t, n = !1) {
		let r = {
			...ly(),
			...e
		}, i = new Ec();
		r.open && e?.mounted === void 0 && (r.mounted = !0), r.floatingRootContext = kc(i, t, n), super(r, {
			popupRef: /*#__PURE__*/ C.createRef(),
			backdropRef: /*#__PURE__*/ C.createRef(),
			internalBackdropRef: /*#__PURE__*/ C.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerFocusTargetRef: /*#__PURE__*/ C.createRef(),
			beforeContentFocusGuardRef: /*#__PURE__*/ C.createRef(),
			stickIfOpenTimeout: new rn(),
			triggerElements: i
		}, uy);
	}
	setOpen = (e, t) => {
		let n = t.reason === Qn, r = t.reason === "trigger-press" && t.event.detail === 0, i = !e && (t.reason === "escape-key" || t.reason == null), a = vc(t), o = this.select("activeTriggerId");
		if (!e && t.reason === "close-press" && t.trigger == null && o != null && (t.trigger = this.context.triggerElements.getById(o) ?? this.select("activeTriggerElement") ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(e, t);
		let s = () => {
			let n = {
				open: e,
				openChangeReason: t.reason
			};
			_c(n, e, t.trigger, a()), this.update(n);
		};
		n ? (this.set("stickIfOpen", !0), this.context.stickIfOpenTimeout.start(500, () => {
			this.set("stickIfOpen", !1);
		}), Ha.flushSync(s)) : s(), r || i ? this.set("instantType", r ? "click" : "dismiss") : t.reason === "focus-out" ? this.set("instantType", "focus") : this.set("instantType", void 0);
	};
	static useStore(t, n) {
		let { store: r, internalStore: i } = hc(t, (t, r) => new e(n, t, r));
		return C.useEffect(() => i?.disposeEffect(), [i]), r;
	}
	disposeEffect = () => this.context.stickIfOpenTimeout.disposeEffect();
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/root/PopoverRoot.mjs
function fy({ props: e }) {
	let { children: t, open: n, defaultOpen: r = !1, onOpenChange: i, onOpenChangeComplete: a, modal: o = !1, handle: s, triggerId: c, defaultTriggerId: l = null } = e, u = dy.useStore(s?.store, {
		modal: o,
		open: r,
		openProp: n,
		activeTriggerId: l,
		triggerIdProp: c
	});
	bc(u, n, r, l), u.useControlledProp("openProp", n), u.useControlledProp("triggerIdProp", c);
	let d = u.useState("open"), f = u.useState("mounted"), p = u.useState("payload"), m = Qa() != null;
	u.useContextCallback("onOpenChange", i), u.useContextCallback("onOpenChangeComplete", a), Tc(u, d), Sc(u);
	let { forceUnmount: h } = Cc(d, u, () => {
		u.update({
			stickIfOpen: !0,
			openChangeReason: null
		});
	});
	u.useSyncedValues({
		modal: o,
		nested: m
	}), C.useEffect(() => {
		d || u.context.stickIfOpenTimeout.clear();
	}, [u, d]);
	let g = C.useCallback(() => {
		u.setOpen(!1, hr(pr));
	}, [u]);
	C.useImperativeHandle(e.actionsRef, () => ({
		unmount: h,
		close: g
	}), [h, g]);
	let _ = d || f, v = C.useMemo(() => ({ store: u }), [u]);
	return /*#__PURE__*/ (0, Y.jsxs)(sy.Provider, {
		value: v,
		children: [_ && /*#__PURE__*/ (0, Y.jsx)(my, {
			store: u,
			modal: o
		}), typeof t == "function" ? t({ payload: p }) : t]
	});
}
function py(e) {
	return cy(!0) ? /*#__PURE__*/ (0, Y.jsx)(fy, { props: e }) : /*#__PURE__*/ (0, Y.jsx)(no, { children: /*#__PURE__*/ (0, Y.jsx)(fy, { props: e }) });
}
function my({ store: e, modal: t }) {
	let n = _o(e.useState("floatingRootContext"), { outsidePressEvent: {
		mouse: t === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} });
	return wc(e, {
		activeTriggerProps: n.reference ?? fn,
		inactiveTriggerProps: n.trigger ?? fn,
		popupProps: C.useMemo(() => va(pc, n.floating), [n.floating])
	}), null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/trigger/PopoverTrigger.mjs
var hy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, handle: s, payload: c, openOnHover: l = !1, delay: u = 300, closeDelay: d = 0, id: f, ...p } = e, m = cy(!0), h = s?.store ?? m?.store;
	if (!h) throw Error(la(74));
	let g = zl(f), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = C.useRef(null), { registerTrigger: S, isMountedByThisTrigger: w } = xc(g, x, h, {
		payload: c,
		disabled: a,
		openOnHover: l,
		closeDelay: d
	}), T = h.useState("openChangeReason"), E = h.useState("stickIfOpen"), D = h.useState("openMethod"), O = h.useState("focusManagerModal"), k = qc(v, {
		enabled: !a && v != null && l && (D !== "touch" || T !== "trigger-press"),
		mouseOnly: !0,
		move: !1,
		handleClose: ll(),
		restMs: u,
		delay: { close: d },
		triggerElementRef: x,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), A = mo(v, {
		enabled: v != null,
		stickIfOpen: E
	}), j = yu(() => h.select("open"), (e) => {
		h.set("openMethod", e);
	}), M = h.useState("triggerProps", w), { getButtonProps: N, buttonRef: P } = Fl({
		disabled: a,
		native: o
	}), F = { open(e) {
		return e && T === "trigger-press" ? Ol.open(e) : Dl.open(e);
	} }, { preFocusGuardRef: I, handlePreFocusGuardFocus: L, handleFocusTargetFocus: R } = Fm(h, x), z = Q("button", e, {
		state: {
			disabled: a,
			open: y
		},
		ref: [
			P,
			t,
			S,
			x
		],
		props: [
			A.reference,
			k,
			M,
			j,
			{
				[Ra]: "",
				id: g,
				"aria-haspopup": "dialog",
				"aria-expanded": y,
				"aria-controls": b
			},
			p,
			N
		],
		stateAttributesMapping: F
	});
	return w && !O ? /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
		/*#__PURE__*/ (0, Y.jsx)(Pr, {
			ref: I,
			onFocus: L
		}),
		/*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: z }, g),
		/*#__PURE__*/ (0, Y.jsx)(Pr, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: R
		})
	] }) : /*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: z }, g);
}), gy = /*#__PURE__*/ C.createContext(void 0);
function _y() {
	let e = C.useContext(gy);
	if (e === void 0) throw Error(la(45));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/portal/PopoverPortal.mjs
var vy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = cy();
	return i.useState("mounted") || n ? /*#__PURE__*/ (0, Y.jsx)(gy.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(qa, {
			ref: t,
			...r
		})
	}) : null;
}), yy = /*#__PURE__*/ C.createContext(void 0);
function by() {
	let e = C.useContext(yy);
	if (!e) throw Error(la(46));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/positioner/PopoverPositioner.mjs
var xy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, anchor: a, positionMethod: o = "absolute", side: s = "bottom", align: c = "center", sideOffset: l = 0, alignOffset: u = 0, collisionBoundary: d = "clipping-ancestors", collisionPadding: f = 5, arrowPadding: p = 5, sticky: m = !1, disableAnchorTracking: h = !1, collisionAvoidance: g = Ba, ..._ } = e, { store: v } = cy(), y = _y(), b = eo(), x = v.useState("floatingRootContext"), S = v.useState("mounted"), w = v.useState("open"), T = v.useState("openChangeReason"), E = v.useState("activeTriggerElement"), D = v.useState("modal"), O = v.useState("openMethod"), k = v.useState("positionerElement"), A = v.useState("instantType"), j = v.useState("transitionStatus"), M = v.useState("hasViewport"), N = C.useRef(null), P = dc(k, !1, !1), F = _m({
		anchor: a,
		floatingRootContext: x,
		positionMethod: o,
		mounted: S,
		side: s,
		sideOffset: l,
		align: c,
		alignOffset: u,
		arrowPadding: p,
		collisionBoundary: d,
		collisionPadding: f,
		sticky: m,
		disableAnchorTracking: h,
		keepMounted: y,
		nodeId: b,
		collisionAvoidance: g,
		adaptiveOrigin: M ? mm : void 0
	}), I = x.useState("domReferenceElement");
	X(() => {
		let e = I, t = N.current;
		if (e && (N.current = e), t && e && e !== t) {
			v.set("instantType", void 0);
			let e = new AbortController();
			return P(() => {
				v.set("instantType", "trigger-change");
			}, e.signal), () => {
				e.abort();
			};
		}
	}, [
		I,
		P,
		v
	]), xm(w && D === !0 && T !== "trigger-hover", O === "touch", k, E);
	let L = C.useCallback((e) => {
		v.set("positionerElement", e);
	}, [v]), R = ym(e, {
		open: w,
		side: F.side,
		align: F.align,
		anchorHidden: F.anchorHidden,
		instant: A
	}, {
		styles: F.positionerStyles,
		transitionStatus: j,
		props: _,
		refs: [t, L],
		hidden: !S,
		inert: !w
	});
	return /*#__PURE__*/ (0, Y.jsxs)(yy.Provider, {
		value: F,
		children: [S && D === !0 && T !== "trigger-hover" && /*#__PURE__*/ (0, Y.jsx)(mu, {
			ref: v.context.internalBackdropRef,
			inert: pu(!w),
			cutout: E
		}), /*#__PURE__*/ (0, Y.jsx)(to, {
			id: b,
			children: R
		})]
	});
}), Sy = /*#__PURE__*/ C.createContext(void 0);
function Cy() {
	let [e, t] = C.useState(0), n = Z(() => (t((e) => e + 1), () => {
		t((e) => Math.max(0, e - 1));
	}));
	return {
		context: C.useMemo(() => ({ register: n }), [n]),
		hasClosePart: e > 0
	};
}
function wy(e) {
	let { value: t, children: n } = e;
	return /*#__PURE__*/ (0, Y.jsx)(Sy.Provider, {
		value: t,
		children: n
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/popover/popup/PopoverPopup.mjs
var Ty = {
	...kl,
	...uc
}, Ey = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, initialFocus: a, finalFocus: o, ...s } = e, { store: c } = cy(), l = by(), u = nm(!0) != null, { context: d, hasClosePart: f } = Cy(), p = c.useState("open"), m = c.useState("openMethod"), h = c.useState("instantType"), g = c.useState("transitionStatus"), _ = c.useState("popupProps"), v = c.useState("titleElementId"), y = c.useState("descriptionElementId"), b = c.useState("modal"), x = c.useState("mounted"), S = c.useState("openChangeReason"), w = c.useState("activeTriggerElement"), T = c.useState("floatingRootContext"), E = T.useState("floatingId"), D = c.useState("disabled"), O = c.useState("openOnHover"), k = c.useState("closeDelay"), A = s.id ?? E;
	fc({
		open: p,
		ref: c.context.popupRef,
		onComplete() {
			p && c.context.onOpenChangeComplete?.(!0);
		}
	}), Gc(T, {
		enabled: O && !D,
		closeDelay: k
	});
	let j = a === void 0 ? mc(c.context.popupRef) : a, M = b !== !1 && f;
	c.useSyncedValue("focusManagerModal", M);
	let N = C.useCallback((e) => {
		c.set("popupElement", e);
	}, [c]), P = Q("div", e, {
		state: {
			open: p,
			side: l.side,
			align: l.align,
			instant: h,
			transitionStatus: g
		},
		ref: [
			t,
			c.context.popupRef,
			N
		],
		props: [
			_,
			{
				id: A,
				role: "dialog",
				...pc,
				"aria-labelledby": v,
				"aria-describedby": y,
				onKeyDown(e) {
					u && ru.has(e.key) && e.stopPropagation();
				}
			},
			rm(g),
			s
		],
		stateAttributesMapping: Ty
	});
	return /*#__PURE__*/ (0, Y.jsx)(po, {
		context: T,
		openInteractionType: m,
		modal: M,
		disabled: !x || S === "trigger-hover",
		initialFocus: j,
		returnFocus: o,
		restoreFocus: "popup",
		previousFocusableElement: _t(w) ? w : void 0,
		nextFocusableElement: c.context.triggerFocusTargetRef,
		beforeContentFocusGuardRef: c.context.beforeContentFocusGuardRef,
		children: /*#__PURE__*/ (0, Y.jsx)(wy, {
			value: d,
			children: P
		})
	});
}), Dy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = cy(), s = zl(a.id);
	return o.useSyncedValueWithCleanup("titleElementId", s), Q("h2", e, {
		ref: t,
		props: [{ id: s }, a]
	});
}), Oy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = cy(), s = zl(a.id);
	return o.useSyncedValueWithCleanup("descriptionElementId", s), Q("p", e, {
		ref: t,
		props: [{ id: s }, a]
	});
});
//#endregion
//#region src/components/ui/popover.tsx
function ky({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(py, {
		"data-slot": "popover",
		...e
	});
}
function Ay({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(hy, {
		"data-slot": "popover-trigger",
		...e
	});
}
function jy({ className: e, align: t = "center", alignOffset: n = 0, side: r = "bottom", sideOffset: i = 4, ...a }) {
	let o = Au();
	return /* @__PURE__ */ (0, Y.jsx)(vy, {
		container: o,
		children: /* @__PURE__ */ (0, Y.jsx)(xy, {
			align: t,
			alignOffset: n,
			side: r,
			sideOffset: i,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsx)(Ey, {
				"data-slot": "popover-content",
				className: J("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...a
			})
		})
	});
}
function My({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "popover-header",
		className: J("flex flex-col gap-0.5 text-sm", e),
		...t
	});
}
function Ny({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Dy, {
		"data-slot": "popover-title",
		className: J("font-medium", e),
		...t
	});
}
function Py({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Oy, {
		"data-slot": "popover-description",
		className: J("text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/lib/date.ts
function Fy(e) {
	if (e === null) return;
	let t = Number(e.slice(0, 4)), n = Number(e.slice(5, 7)), r = Number(e.slice(8, 10)), i = /* @__PURE__ */ new Date(0);
	return i.setHours(12, 0, 0, 0), i.setFullYear(t, n - 1, r), i;
}
function Iy(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
//#endregion
//#region src/components/streamlit/date-picker.tsx
function Ly(e) {
	if (Array.isArray(e)) return {
		from: Fy(e[0]),
		to: Fy(e[1])
	};
}
function Ry(e, t) {
	return e === null ? t : Array.isArray(e) ? e.join(" – ") : e;
}
function zy({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = _f(e.state, t), [a, o] = (0, C.useState)(!1), [s, c] = (0, C.useState)(Ly(i.value));
	(0, C.useEffect)(() => {
		c(Ly(i.value));
	}, [i.value]);
	let l = Fy(e.props.minDate), u = Fy(e.props.maxDate), d = [];
	l !== void 0 && d.push({ before: l }), u !== void 0 && d.push({ after: u });
	let f = e.props.disabled ? !0 : d.length > 0 ? d : void 0, p = typeof i.value == "string" ? Fy(i.value) : void 0, m = p ?? s?.from ?? l ?? u ?? /* @__PURE__ */ new Date(), h = (e) => {
		r(e), o(!1);
	};
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "date-picker",
		"data-testid": "ssui-v2-date-picker",
		children: [e.props.label === null ? null : /* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsxs)(ky, {
			modal: !1,
			onOpenChange: (e) => {
				c(Ly(i.value)), o(e);
			},
			open: a,
			children: [/* @__PURE__ */ (0, Y.jsxs)(Ay, {
				"aria-label": e.props.label === null ? "Date picker" : void 0,
				"aria-labelledby": e.props.label === null ? void 0 : n,
				disabled: e.props.disabled,
				render: /* @__PURE__ */ (0, Y.jsx)(Cu, {
					className: "justify-start",
					variant: "outline"
				}),
				children: [/* @__PURE__ */ (0, Y.jsx)(tf, { "aria-hidden": "true" }), /* @__PURE__ */ (0, Y.jsx)("span", {
					className: i.value === null ? "text-muted-foreground" : void 0,
					children: Ry(i.value, e.props.placeholder)
				})]
			}), /* @__PURE__ */ (0, Y.jsxs)(jy, {
				"aria-label": e.props.label ?? "Date picker",
				align: "start",
				className: "w-auto gap-0 p-0",
				"data-testid": "ssui-v2-date-picker-content",
				children: [e.props.mode === "single" ? /* @__PURE__ */ (0, Y.jsx)(ay, {
					defaultMonth: m,
					disabled: f,
					endMonth: u,
					mode: "single",
					onSelect: (e) => {
						h(e === void 0 ? null : Iy(e));
					},
					selected: p,
					startMonth: l
				}) : /* @__PURE__ */ (0, Y.jsx)(ay, {
					defaultMonth: m,
					disabled: f,
					endMonth: u,
					mode: "range",
					onSelect: (e) => {
						c(e);
					},
					selected: s,
					startMonth: l
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex justify-end gap-1 border-t p-2",
					children: [
						e.props.mode === "range" ? /* @__PURE__ */ (0, Y.jsx)(Cu, {
							onClick: () => {
								o(!1);
							},
							size: "sm",
							variant: "ghost",
							children: "Cancel"
						}) : null,
						/* @__PURE__ */ (0, Y.jsx)(Cu, {
							onClick: () => {
								h(null);
							},
							size: "sm",
							variant: "ghost",
							children: "Clear"
						}),
						e.props.mode === "range" ? /* @__PURE__ */ (0, Y.jsx)(Cu, {
							disabled: s?.from === void 0 || s.to === void 0,
							onClick: () => {
								s?.from !== void 0 && s.to !== void 0 && h([Iy(s.from), Iy(s.to)]);
							},
							size: "sm",
							children: "Apply"
						}) : null
					]
				})]
			})]
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/fieldset/root/FieldsetRootContext.mjs
var By = /*#__PURE__*/ C.createContext(void 0);
function Vy(e = !1) {
	let t = C.useContext(By);
	if (!t && !e) throw Error(la(86));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Hy(e = {}) {
	let { id: t, implicit: n = !1, controlRef: r } = e, { controlId: i, registerControlId: a } = vp(), o = zl(t), s = n ? i : void 0, c = $t(() => Symbol("labelable-control")), l = C.useRef(!1), u = C.useRef(t != null), d = Z(() => {
		!l.current || a === un || (l.current = !1, a(c.current, void 0));
	});
	return X(() => {
		if (a === un) return;
		let e;
		if (n) {
			let n = r?.current;
			e = gt(n) && n.closest("label") != null ? t ?? null : s ?? o;
		} else if (t != null) u.current = !0, e = t;
		else if (u.current) e = o;
		else {
			d();
			return;
		}
		if (e === void 0) {
			d();
			return;
		}
		l.current = !0, a(c.current, e);
	}, [
		t,
		r,
		s,
		a,
		n,
		o,
		c,
		d
	]), C.useEffect(() => d, [d]), i ?? o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useRegisteredLabelId.mjs
function Uy(e, t) {
	let n = zl(e);
	return X(() => (t(n), () => {
		t(void 0);
	}), [n, t]), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/field/control/FieldControl.mjs
var Wy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFocused: y, setFilled: b, validationMode: x, validation: S } = dp(), { clearErrors: w } = gp(), T = h || s, E = m ?? a, D = {
		...p,
		disabled: T
	}, { labelId: O } = vp(), k = Hy({ id: i });
	X(() => {
		let e = o != null;
		S.inputRef.current?.value || e && o !== "" ? b(!0) : e && o === "" && b(!1);
	}, [
		S.inputRef,
		b,
		o
	]);
	let A = C.useRef(null);
	X(() => {
		u && A.current === Pn(Zt(A.current)) && y(!0);
	}, [u, y]);
	let [j] = id({
		controlled: o,
		default: l,
		name: "FieldControl",
		state: "value"
	}), M = o !== void 0, N = M ? j : void 0, P = Z(() => S.inputRef.current?.value);
	return fp(S.inputRef, k, N, P, !T, a), Q("input", e, {
		ref: [t, A],
		state: D,
		props: [
			{
				id: k,
				disabled: T,
				name: E,
				ref: S.inputRef,
				"aria-labelledby": O,
				autoFocus: u,
				...M ? { value: N } : { defaultValue: l },
				onChange(e) {
					let t = e.currentTarget.value;
					c?.(t, hr(Xn, e.nativeEvent)), _(t !== v.initialValue), b(t !== ""), e.nativeEvent.defaultPrevented || (w(E), S.change(t));
				},
				onFocus() {
					y(!0);
				},
				onBlur(e) {
					g(!0), y(!1), x === "onBlur" && S.commit(e.currentTarget.value);
				},
				onKeyDown(e) {
					e.currentTarget.tagName === "INPUT" && e.key === "Enter" && (g(!0), S.commit(e.currentTarget.value));
				}
			},
			f,
			(e) => S.getValidationProps(T, e)
		],
		stateAttributesMapping: sp
	});
}), Gy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(Wy, {
		ref: t,
		...e
	});
});
//#endregion
//#region src/components/ui/input.tsx
function Ky({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Gy, {
		type: t,
		"data-slot": "input",
		className: J("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
//#endregion
//#region src/components/streamlit/input.tsx
function qy({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commitDraft: r, draft: i, setDraft: a } = vf(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "input",
		"data-testid": "ssui-v2-input",
		children: [/* @__PURE__ */ (0, Y.jsx)("label", {
			className: "text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(Ky, {
			disabled: e.props.disabled,
			id: n,
			maxLength: e.props.maxLength ?? void 0,
			onBlur: r,
			onChange: (e) => {
				a(e.currentTarget.value);
			},
			onKeyDown: (e) => {
				e.key === "Enter" && r();
			},
			placeholder: e.props.placeholder,
			type: e.props.type,
			value: i
		})]
	});
}
//#endregion
//#region src/components/streamlit/link-button.tsx
function Jy({ envelope: e }) {
	let t = {
		"data-ssui-component": "link_button",
		"data-testid": "ssui-v2-link-button"
	}, n = e.props.stretch ? "flex w-full p-px" : "inline-flex p-px";
	return e.props.disabled ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: n,
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Cu, {
			disabled: !0,
			size: e.props.size,
			variant: e.props.variant,
			className: e.props.stretch ? "w-full" : void 0,
			children: e.props.text
		})
	}) : /* @__PURE__ */ (0, Y.jsx)("div", {
		className: n,
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)("a", {
			className: J(Su({
				size: e.props.size,
				variant: e.props.variant
			}), e.props.stretch && "w-full"),
			href: e.props.url,
			rel: e.props.target === "_blank" ? "noopener noreferrer" : void 0,
			target: e.props.target,
			children: e.props.text
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/stringifyLocale.mjs
function Yy(e) {
	return Array.isArray(e) ? e.map((e) => Yy(e)).join(",") : e == null ? "" : String(e);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/formatNumber.mjs
var Xy = /* @__PURE__ */ new Map();
function Zy(e, t) {
	let n = JSON.stringify({
		locale: Yy(e),
		options: t
	}), r = Xy.get(n);
	if (r) return r;
	let i = new Intl.NumberFormat(e, t);
	return Xy.set(n, i), i;
}
function Qy(e, t, n) {
	return e == null ? "" : Zy(t, n).format(e);
}
function $y(e, t, n) {
	return e == null ? "" : n ? Qy(e, t, n) : Qy(e / 100, t, { style: "percent" });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootContext.mjs
var eb = /*#__PURE__*/ C.createContext(void 0);
function tb() {
	let e = C.useContext(eb);
	if (e === void 0) throw Error(la(51));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootDataAttributes.mjs
var nb = /*#__PURE__*/ function(e) {
	return e.complete = "data-complete", e.indeterminate = "data-indeterminate", e.progressing = "data-progressing", e;
}({}), rb = { status(e) {
	return e === "progressing" ? { [nb.progressing]: "" } : e === "complete" ? { [nb.complete]: "" } : e === "indeterminate" ? { [nb.indeterminate]: "" } : null;
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRoot.mjs
function ib(e, t) {
	return t == null ? "indeterminate progress" : e || `${t}%`;
}
var ab = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { format: n, getAriaValueText: r = ib, locale: i, max: a = 100, min: o = 0, value: s, render: c, className: l, children: u, style: d, ...f } = e, [p, m] = C.useState(), h = wr(n), g = "indeterminate";
	Number.isFinite(s) && (g = s === a ? "complete" : "progressing");
	let _ = $y(s, i, h.current), v = C.useMemo(() => ({ status: g }), [g]), y = {
		"aria-labelledby": p,
		"aria-valuemax": a,
		"aria-valuemin": o,
		"aria-valuenow": s ?? void 0,
		"aria-valuetext": r(_, s),
		role: "progressbar",
		children: /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [u, /*#__PURE__*/ (0, Y.jsx)("span", {
			role: "presentation",
			style: Mr,
			children: "x"
		})] })
	}, b = C.useMemo(() => ({
		formattedValue: _,
		max: a,
		min: o,
		setLabelId: m,
		state: v,
		status: g,
		value: s
	}), [
		_,
		a,
		o,
		m,
		v,
		g,
		s
	]), x = Q("div", e, {
		state: v,
		ref: t,
		props: [y, f],
		stateAttributesMapping: rb
	});
	return /*#__PURE__*/ (0, Y.jsx)(eb.Provider, {
		value: b,
		children: x
	});
}), ob = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = tb();
	return Q("div", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: rb
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/valueToPercent.mjs
function sb(e, t, n) {
	return (e - t) * 100 / (n - t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/indicator/ProgressIndicator.mjs
var cb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { max: o, min: s, value: c, state: l } = tb(), u = Number.isFinite(c) && c !== null ? sb(c, s, o) : null;
	return Q("div", e, {
		state: l,
		ref: t,
		props: [{ style: u == null ? {} : {
			insetInlineStart: 0,
			height: "inherit",
			width: `${u}%`
		} }, a],
		stateAttributesMapping: rb
	});
}), lb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, style: a, ...o } = e, { value: s, formattedValue: c, state: l } = tb();
	return Q("span", e, {
		state: l,
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: typeof i == "function" ? i(s == null ? "indeterminate" : c, s) : s == null ? null : c
		}, o],
		stateAttributesMapping: rb
	});
}), ub = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, { setLabelId: s, state: c } = tb();
	return Q("span", e, {
		state: c,
		ref: t,
		props: [{
			id: Uy(a, s),
			role: "presentation"
		}, o],
		stateAttributesMapping: rb
	});
});
//#endregion
//#region src/components/ui/progress.tsx
function db({ className: e, children: t, value: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(ab, {
		value: n,
		"data-slot": "progress",
		className: J("flex flex-wrap gap-3", e),
		...r,
		children: [t, /* @__PURE__ */ (0, Y.jsx)(fb, { children: /* @__PURE__ */ (0, Y.jsx)(pb, {}) })]
	});
}
function fb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(ob, {
		className: J("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", e),
		"data-slot": "progress-track",
		...t
	});
}
function pb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(cb, {
		"data-slot": "progress-indicator",
		className: J("h-full bg-primary transition-all", e),
		...t
	});
}
function mb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(ub, {
		className: J("text-sm font-medium", e),
		"data-slot": "progress-label",
		...t
	});
}
function hb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(lb, {
		className: J("ml-auto text-sm text-muted-foreground tabular-nums", e),
		"data-slot": "progress-value",
		...t
	});
}
//#endregion
//#region src/components/streamlit/progress.tsx
function gb({ envelope: e }) {
	let t = e.props.label ?? "Progress";
	return /* @__PURE__ */ (0, Y.jsxs)(db, {
		"aria-label": t,
		"data-ssui-component": "progress",
		"data-testid": "ssui-v2-progress",
		value: e.props.value,
		children: [e.props.label === null ? null : /* @__PURE__ */ (0, Y.jsx)(mb, { children: e.props.label }), e.props.showValue ? /* @__PURE__ */ (0, Y.jsx)(hb, { children: (e, t) => `${Math.round(t ?? 0)}%` }) : null]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio/root/RadioRootDataAttributes.mjs
var _b = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), vb = {
	checked(e) {
		return e ? { [_b.checked]: "" } : { [_b.unchecked]: "" };
	},
	...uc,
	...sp
}, yb = "data-composite-item-active", bb = /*#__PURE__*/ C.createContext(void 0);
function xb() {
	return C.useContext(bb);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/serializeValue.mjs
function Sb(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio/root/RadioRootContext.mjs
var Cb = /*#__PURE__*/ C.createContext(void 0);
function wb() {
	let e = C.useContext(Cb);
	if (e === void 0) throw Error(la(52));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio/root/RadioRoot.mjs
var Tb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, readOnly: a = !1, required: o = !1, "aria-labelledby": s, value: c, inputRef: l, nativeButton: u = !1, id: d, style: f, ...p } = e, m = xb(), { disabled: h, readOnly: g, required: _, form: v, checkedValue: y, touched: b = !1, validation: x, name: S } = m ?? {}, w = m?.setCheckedValue ?? un, T = m?.setTouched ?? un, E = m?.registerControlRef ?? un, D = m?.registerInputRef ?? un, { setTouched: O, setFilled: k, state: A, disabled: j } = dp(), M = mp(), { labelId: N, getDescriptionProps: P } = vp(), F = j || M.disabled || h || i, I = g || a, L = _ || o, R = v, z = m ? y === c : c === "", B = C.useRef(null), V = C.useRef(null), H = Z((e) => {
		e && E(e, F);
	}), U = vr(l, V, D);
	X(() => {
		V.current?.checked && k(!0);
	}, [k]), X(() => {
		if (V.current) {
			if (F && z) {
				D(null);
				return;
			}
			B.current && E(B.current, F), D(V.current);
		}
	}, [
		z,
		F,
		E,
		D
	]);
	let W = zl(), G = Hy({
		id: d,
		implicit: !1,
		controlRef: B
	}), ee = u ? void 0 : G, te = yp(s, N, V, !u, ee), ne = {
		role: "radio",
		"aria-checked": z,
		"aria-required": L || void 0,
		"aria-readonly": I || void 0,
		"aria-labelledby": te,
		[yb]: z ? "" : void 0,
		id: u ? G : W,
		onKeyDown(e) {
			e.key === "Enter" && e.preventDefault();
		},
		onClick(e) {
			if (e.defaultPrevented || F || I) return;
			e.preventDefault();
			let t = V.current;
			t && t.dispatchEvent(new (pt(t)).PointerEvent("click", {
				bubbles: !0,
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				metaKey: e.metaKey
			}));
		},
		onFocus(e) {
			e.defaultPrevented || F || I || !b || (V.current?.click(), T(!1));
		}
	}, { getButtonProps: re, buttonRef: ie } = Fl({
		disabled: F,
		native: u,
		composite: !1
	}), ae = {
		type: "radio",
		ref: U,
		form: R,
		id: ee,
		name: S,
		tabIndex: -1,
		style: S ? Nr : Mr,
		"aria-hidden": !0,
		...c === void 0 ? fn : { value: Sb(c) },
		disabled: F,
		checked: z,
		required: L,
		readOnly: I,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented || F || I || c === void 0) return;
			let t = hr(Xn, e.nativeEvent);
			w(c, t), !t.isCanceled && O(!0);
		},
		onFocus() {
			B.current?.focus();
		}
	}, oe = C.useMemo(() => ({
		...A,
		required: L,
		disabled: F,
		readOnly: I,
		checked: z
	}), [
		A,
		F,
		I,
		z,
		L
	]), se = oe, ce = m !== void 0, le = [
		t,
		B,
		ie,
		H
	], ue = [
		ne,
		p,
		re,
		P,
		x ? (e) => x.getValidationProps(F, e) : fn
	], de = Q("span", e, {
		enabled: !ce,
		state: oe,
		ref: le,
		props: ue,
		stateAttributesMapping: vb
	});
	return /*#__PURE__*/ (0, Y.jsxs)(Cb.Provider, {
		value: se,
		children: [ce ? /*#__PURE__*/ (0, Y.jsx)(Nm, {
			tag: "span",
			render: n,
			className: r,
			style: f,
			state: oe,
			refs: le,
			props: ue,
			stateAttributesMapping: vb
		}) : de, /*#__PURE__*/ (0, Y.jsx)("input", {
			...ae,
			suppressHydrationWarning: !0
		})]
	});
}), Eb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = wb(), c = s.checked, { mounted: l, transitionStatus: u, setMounted: d } = oc(c), f = {
		...s,
		transitionStatus: u
	}, p = C.useRef(null), m = a || l, h = Q("span", e, {
		ref: [t, p],
		state: f,
		props: o,
		stateAttributesMapping: vb
	});
	return fc({
		open: c,
		ref: p,
		onComplete() {
			c || d(!1);
		}
	}), m ? h : null;
}), Db = [];
function Ob(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u = !1, disabledIndices: d, modifierKeys: f = Db } = e, [p, m] = C.useState(0), h = r != null, g = C.useRef(null), _ = vr(g, c), v = C.useRef([]), y = C.useRef(!1), b = o ?? p, x = Z((e, t = !1) => {
		if ((s ?? m)(e), t) {
			let t = v.current[e];
			cu(g.current, t, a, n);
		}
	}), S = Z((e) => {
		if (e.size === 0 || y.current) return;
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? t.indexOf(r) : -1;
		if (i !== -1) x(i);
		else if (pi(t, b, d)) {
			let e = fi(t, { disabledIndices: d });
			li(t, e) || x(e);
		}
		cu(g.current, r, a, n);
	});
	X(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (pi(e, b, d)) {
			let t = fi(e, { disabledIndices: d });
			li(e, t) || x(t);
		}
	}, [
		d,
		o,
		b,
		v,
		x
	]);
	let w = Z((e, t, n) => i ? i(e, t, n, v) : n), T = Z((e) => {
		let o = l ? ru : nu;
		if (!o.has(e.key) || kb(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? ql : Jl, p = {
			horizontal: c,
			vertical: Kl,
			both: c
		}[n], m = s ? Jl : ql, _ = {
			horizontal: m,
			vertical: Gl,
			both: m
		}[n], y = In(e.nativeEvent);
		if (y != null && su(y) && !Um(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value ?? "";
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== p && t > 0) return;
		}
		let S = b, C = ui(v, d), T = di(v, d);
		r != null && (S = r({
			disabledIndices: d,
			elementsRef: v,
			event: e,
			highlightedIndex: b,
			loopFocus: t,
			maxIndex: T,
			minIndex: C,
			onLoop: w,
			orientation: n,
			rtl: s
		}));
		let E = {
			horizontal: [c],
			vertical: [Kl],
			both: [c, Kl]
		}[n], D = {
			horizontal: [m],
			vertical: [Gl],
			both: [m, Gl]
		}[n], O = h ? o : {
			horizontal: l ? $l : Ql,
			vertical: l ? tu : eu,
			both: o
		}[n];
		l && (e.key === "Home" ? S = C : e.key === "End" && (S = T)), S === b && (E.includes(e.key) || D.includes(e.key)) && (t && S === T && E.includes(e.key) ? (S = C, i && (S = i(e, b, S, v))) : t && S === C && D.includes(e.key) ? (S = T, i && (S = i(e, b, S, v))) : S = fi(v.current, {
			startingIndex: S,
			decrement: D.includes(e.key),
			disabledIndices: d
		})), S !== b && !li(v.current, S) && (u && e.stopPropagation(), O.has(e.key) && e.preventDefault(), x(S, !0), queueMicrotask(() => {
			v.current[S]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = In(e.nativeEvent);
				!t || n == null || !su(n) || n.setSelectionRange(0, n.value.length ?? 0);
			},
			onKeyDown: T
		},
		highlightedIndex: b,
		onHighlightedIndexChange: x,
		elementsRef: v,
		disabledIndices: d,
		onMapChange: S,
		relayKeyboardEvent: T
	};
}
function kb(e, t) {
	for (let n of au.values()) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function Ab(e) {
	let { render: t, className: n, style: r, refs: i = dn, props: a = dn, state: o = fn, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: x = "div", ...S } = e, { props: w, highlightedIndex: T, onHighlightedIndexChange: E, elementsRef: D, onMapChange: O, relayKeyboardEvent: k } = Ob({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: fd(),
		disabledIndices: v,
		modifierKeys: y
	}), A = Q(x, e, {
		state: o,
		ref: i,
		props: [
			w,
			...a,
			S
		],
		stateAttributesMapping: s
	}), j = C.useMemo(() => ({
		highlightedIndex: T,
		onHighlightedIndexChange: E,
		highlightItemOnHover: b,
		relayKeyboardEvent: k
	}), [
		T,
		E,
		b,
		k
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Ml.Provider, {
		value: j,
		children: /*#__PURE__*/ (0, Y.jsx)(sd, {
			elementsRef: D,
			onMapChange: (e) => {
				h?.(e), O(e);
			},
			children: A
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio-group/RadioGroup.mjs
var jb = [iu], Mb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i, readOnly: a, required: o, onValueChange: s, value: c, defaultValue: l, form: u, name: d, inputRef: f, id: p, style: m, ...h } = e, { setTouched: g, setFocused: _, validationMode: v, name: y, disabled: b, state: x, validation: S, setDirty: w, setFilled: T, validityData: E } = dp(), { labelId: D } = vp(), { clearErrors: O } = gp(), k = Vy(!0), A = b || i, j = y ?? d, M = zl(p), [N, P] = id({
		controlled: c,
		default: l,
		name: "RadioGroup",
		state: "value"
	}), [F, I] = C.useState(!1), L = Z((e, t) => {
		s?.(e, t), !t.isCanceled && P(e);
	}), R = C.useRef(null), z = C.useRef(null), B = C.useRef(null);
	function V(e) {
		let t;
		return f && (typeof f == "function" ? t = f(e) : f.current = e), z.current = e, S.inputRef.current = e, t;
	}
	let H = Z((e, t = !1) => {
		if (e) {
			if (t) {
				R.current === e && (R.current = null);
				return;
			}
			R.current ??= e;
		}
	}), U = Z((e) => {
		if (!e || e.disabled) return;
		B.current ||= e;
		let t = z.current;
		if (e.checked || t == null || t.disabled) return V(e);
	}), W = Z(() => {
		let e = z.current;
		return !e || e.disabled || !e.checked ? null : N ?? null;
	});
	fp(R, M, N ?? null, W, !A, d), vu(N, () => {
		O(j), w(N !== E.initialValue), T(N != null), S.change(N);
		let e = B.current;
		N == null && e && !e.disabled && V(e);
	});
	let G = h["aria-labelledby"] ?? D ?? k?.legendId, ee = {
		...x,
		disabled: A ?? !1,
		required: o ?? !1,
		readOnly: a ?? !1
	}, te = C.useMemo(() => ({
		...x,
		checkedValue: N,
		disabled: A,
		form: u,
		validation: S,
		name: j,
		readOnly: a,
		registerControlRef: H,
		registerInputRef: U,
		required: o,
		setCheckedValue: L,
		setTouched: I,
		touched: F
	}), [
		N,
		A,
		u,
		S,
		x,
		j,
		a,
		H,
		U,
		o,
		L,
		I,
		F
	]), ne = {
		id: p,
		role: "radiogroup",
		"aria-required": o || void 0,
		"aria-disabled": A || void 0,
		"aria-readonly": a || void 0,
		"aria-labelledby": G,
		onFocus() {
			_(!0);
		},
		onBlur(e) {
			Fn(e.currentTarget, e.relatedTarget) || (g(!0), _(!1), v === "onBlur" && S.commit(N));
		},
		onKeyDownCapture(e) {
			e.key.startsWith("Arrow") && (I(!0), _(!0));
		}
	};
	return /*#__PURE__*/ (0, Y.jsx)(bb.Provider, {
		value: te,
		children: /*#__PURE__*/ (0, Y.jsx)(Ab, {
			render: n,
			className: r,
			style: m,
			state: ee,
			props: [
				ne,
				h,
				(e) => S.getValidationProps(A ?? !1, e)
			],
			refs: [t],
			stateAttributesMapping: sp,
			enableHomeAndEndKeys: !1,
			modifierKeys: jb
		})
	});
});
//#endregion
//#region src/components/ui/radio-group.tsx
function Nb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Mb, {
		"data-slot": "radio-group",
		className: J("grid w-full gap-2", e),
		...t
	});
}
function Pb({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Tb, {
		"data-slot": "radio-group-item",
		className: J("group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Eb, {
			"data-slot": "radio-group-indicator",
			className: "flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, Y.jsx)("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
		})
	});
}
//#endregion
//#region src/components/streamlit/radio-group.tsx
function Fb({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), r = (0, C.useId)(), { commit: i, state: a } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("fieldset", {
		className: "grid min-w-0 gap-2 p-px",
		"data-ssui-component": "radio_group",
		"data-testid": "ssui-v2-radio-group",
		children: [/* @__PURE__ */ (0, Y.jsx)("legend", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(Nb, {
			"aria-labelledby": n,
			disabled: e.props.disabled,
			onValueChange: i,
			value: a.value,
			children: e.props.options.map((e, t) => {
				let n = `${r}-${t}`;
				return /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, Y.jsx)(Pb, {
						disabled: e.disabled,
						id: n,
						value: e.value
					}), /* @__PURE__ */ (0, Y.jsx)("label", {
						className: "text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
						htmlFor: n,
						children: e.label
					})]
				}, e.value);
			})
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var Ib = /*#__PURE__*/ C.createContext(null), Lb = /*#__PURE__*/ C.createContext(null);
function Rb() {
	let e = C.useContext(Ib);
	if (e === null) throw Error(la(60));
	return e;
}
function zb() {
	let e = C.useContext(Lb);
	if (e === null) throw Error(la(61));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/itemEquality.mjs
var Bb = (e, t) => Object.is(e, t);
function Vb(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function Hb(e, t, n) {
	return !e || e.length === 0 ? !1 : e.some((e) => e !== void 0 && Vb(t, e, n));
}
function Ub(e, t, n) {
	return !e || e.length === 0 ? -1 : e.findIndex((e) => e !== void 0 && Vb(e, t, n));
}
function Wb(e, t, n) {
	return e.filter((e) => !Vb(t, e, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function Gb(e) {
	return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function Kb(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (Gb(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function qb(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return Sb(e);
}
function Jb(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Sb(e.value) : Sb(e);
}
function Yb(e, t, n) {
	function r() {
		return qb(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return t[e] ?? r();
	if (Array.isArray(t)) {
		let n = t, i = Gb(n) ? n.flatMap((e) => e.items) : n;
		if (typeof e != "object" || !e) {
			let t = i.find((t) => t.value === e);
			return t && t.label != null ? t.label : r();
		}
		if ("value" in e) {
			let t = i.find((t) => t && t.value === e.value);
			if (t && t.label != null) return t.label;
		}
	}
	return r();
}
function Xb(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: Yb(r, t, n) }, i)), e), []);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/store.mjs
var Zb = {
	id: $((e) => e.id),
	labelId: $((e) => e.labelId),
	modal: $((e) => e.modal),
	multiple: $((e) => e.multiple),
	items: $((e) => e.items),
	itemToStringLabel: $((e) => e.itemToStringLabel),
	itemToStringValue: $((e) => e.itemToStringValue),
	isItemEqualToValue: $((e) => e.isItemEqualToValue),
	value: $((e) => e.value),
	hasSelectedValue: $((e) => {
		let { value: t, multiple: n, itemToStringValue: r } = e;
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : Jb(t, r) !== "";
	}),
	hasNullItemLabel: $((e, t) => t ? Kb(e.items) : !1),
	open: $((e) => e.open),
	mounted: $((e) => e.mounted),
	forceMount: $((e) => e.forceMount),
	transitionStatus: $((e) => e.transitionStatus),
	openMethod: $((e) => e.openMethod),
	activeIndex: $((e) => e.activeIndex),
	selectedIndex: $((e) => e.selectedIndex),
	isActive: $((e, t) => e.activeIndex === t),
	isSelected: $((e, t) => {
		let n = e.isItemEqualToValue, r = e.value;
		return e.multiple ? Array.isArray(r) && r.some((e) => Vb(t, e, n)) : Vb(t, r, n);
	}),
	isSelectedByFocus: $((e, t) => e.selectedIndex === t),
	popupProps: $((e) => e.popupProps),
	triggerProps: $((e) => e.triggerProps),
	triggerElement: $((e) => e.triggerElement),
	positionerElement: $((e) => e.positionerElement),
	listElement: $((e) => e.listElement),
	popupSide: $((e) => e.popupSide),
	scrollUpArrowVisible: $((e) => e.scrollUpArrowVisible),
	scrollDownArrowVisible: $((e) => e.scrollDownArrowVisible),
	hasScrollArrows: $((e) => e.hasScrollArrows)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/areArraysEqual.mjs
function Qb(e, t, n = (e, t) => e === t) {
	return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/clamp.mjs
function $b(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function ex(e, t) {
	return Math.max(0, e - t);
}
function tx(e, t) {
	if (t <= 0) return 0;
	let n = $b(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRoot.mjs
function nx(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = Bb, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = gp(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = dp(), I = Hy({ id: t }), L = N || d, R = M ?? c, [z, B] = id({
		controlled: n,
		default: y ? r ?? dn : r,
		name: "Select",
		state: "value"
	}), [V, H] = id({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), U = C.useRef([]), W = C.useRef([]), G = C.useRef(null), ee = C.useRef(null), te = C.useRef(0), ne = C.useRef(null), re = C.useRef([]), ie = C.useRef(!1), ae = C.useRef(null), oe = C.useRef(null), se = C.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), ce = C.useRef(!1), { mounted: le, setMounted: ue, transitionStatus: de } = oc(V), { openMethod: fe, triggerProps: pe } = bu(V), me = $t(() => new tc({
		id: I,
		labelId: void 0,
		modal: m,
		multiple: y,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		value: z,
		open: V,
		mounted: le,
		transitionStatus: de,
		items: v,
		forceMount: !1,
		openMethod: null,
		activeIndex: null,
		selectedIndex: null,
		popupProps: {},
		triggerProps: {},
		triggerElement: null,
		positionerElement: null,
		listElement: null,
		popupSide: null,
		scrollUpArrowVisible: !1,
		scrollDownArrowVisible: !1,
		hasScrollArrows: !1
	})).current, he = Zs(me, Zb.activeIndex), ge = Zs(me, Zb.selectedIndex), _e = Zs(me, Zb.triggerElement), ve = Zs(me, Zb.positionerElement), ye = Vm(fe), be = fe ?? ye ?? null, xe = C.useMemo(() => y ? "" : Jb(z, x), [
		y,
		z,
		x
	]), Se = C.useMemo(() => y && Array.isArray(z) ? z.map((e) => Jb(e, x)) : Jb(z, x), [
		y,
		z,
		x
	]);
	fp(wr(me.state.triggerElement), I, z, Z(() => Se), !L, c);
	let Ce = C.useRef(z), we = y ? Array.isArray(z) && z.length > 0 : z != null && Jb(z, x) !== "";
	X(() => {
		z !== Ce.current && me.set("forceMount", !0);
	}, [me, z]), X(() => {
		j(we);
	}, [we, j]), X(function() {
		let e = re.current, t;
		if (y) {
			let n = Array.isArray(z) ? z : [];
			if (n.length === 0) t = null;
			else {
				let r = n[n.length - 1], i = Ub(e, r, S);
				t = i === -1 ? null : i;
			}
		} else {
			let n = Ub(e, z, S);
			t = n === -1 ? null : n;
		}
		t === null && (oe.current = null), !V && me.set("selectedIndex", t);
	}, [
		we,
		y,
		V,
		z,
		re,
		S,
		me,
		oe
	]);
	function Te(e) {
		let t = A.initialValue;
		return Array.isArray(e) && Array.isArray(t) ? !Qb(e, t, (e, t) => Vb(e, t, S)) : e !== t;
	}
	vu(z, () => {
		E(R), D(Te(z)), P.change(z);
	});
	let Ee = Z((e, t) => {
		s?.(e, t), !t.isCanceled && (H(e), !e && (t.reason === "focus-out" || t.reason === "outside-press") && (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	}), De = Z(() => {
		ue(!1), me.update({
			activeIndex: null,
			openMethod: null
		}), _?.(!1);
	});
	fc({
		enabled: !h,
		open: V,
		ref: G,
		onComplete() {
			V || De();
		}
	}), C.useImperativeHandle(h, () => ({ unmount: De }), [De]);
	let Oe = Z((e, t) => {
		i?.(e, t), !t.isCanceled && B(e);
	}), ke = Z(() => {
		let e = me.state.listElement || G.current;
		if (!e) return;
		let t = ex(e.scrollHeight, e.clientHeight), n = tx(e.scrollTop, t), r = n > 0, i = n < t;
		me.state.scrollUpArrowVisible !== r && me.set("scrollUpArrowVisible", r), me.state.scrollDownArrowVisible !== i && me.set("scrollDownArrowVisible", i);
	}), Ae = Ic({
		open: V,
		onOpenChange: Ee,
		elements: {
			reference: _e,
			floating: ve
		}
	}), je = mo(Ae, {
		enabled: !f && !L,
		event: "mousedown"
	}), Me = _o(Ae), K = el(Ae, {
		enabled: !f && !L,
		listRef: U,
		activeIndex: he,
		selectedIndex: ge,
		disabledIndices: dn,
		onNavigate(e) {
			e === null && !V || me.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), Ne = tl(Ae, {
		enabled: !f && !L && (V || !y),
		listRef: W,
		activeIndex: he,
		selectedIndex: ge,
		disabledIndices: (e) => Um(U.current[e]),
		onMatch(e) {
			V ? me.set("activeIndex", e) : Oe(re.current[e], hr("none"));
		},
		onTyping(e) {
			ie.current = e;
		}
	}), Pe = C.useMemo(() => {
		let e = va(Ne.reference, K.reference, Me.reference, je.reference, pe);
		return I && (e.id = I), e;
	}, [
		je.reference,
		Ne.reference,
		K.reference,
		Me.reference,
		pe,
		I
	]), Fe = C.useMemo(() => va(pc, Ne.floating, K.floating, Me.floating), [
		Ne.floating,
		K.floating,
		Me.floating
	]), Ie = K.item ?? fn;
	ut(() => {
		me.update({
			popupProps: Fe,
			triggerProps: Pe
		});
	}), X(() => {
		me.update({
			id: I,
			modal: m,
			multiple: y,
			value: z,
			open: V,
			mounted: le,
			transitionStatus: de,
			popupProps: Fe,
			triggerProps: Pe,
			items: v,
			itemToStringLabel: b,
			itemToStringValue: x,
			isItemEqualToValue: S,
			openMethod: be
		});
	}, [
		me,
		I,
		m,
		y,
		z,
		V,
		le,
		de,
		Fe,
		Pe,
		v,
		b,
		x,
		S,
		be
	]);
	let Le = C.useMemo(() => ({
		store: me,
		name: R,
		required: p,
		disabled: L,
		readOnly: f,
		multiple: y,
		highlightItemOnHover: w,
		setValue: Oe,
		setOpen: Ee,
		listRef: U,
		popupRef: G,
		scrollHandlerRef: ee,
		handleScrollArrowVisibility: ke,
		scrollArrowsMountedCountRef: te,
		itemProps: Ie,
		valueRef: ne,
		valuesRef: re,
		labelsRef: W,
		typingRef: ie,
		selectionRef: se,
		firstItemTextRef: ae,
		selectedItemTextRef: oe,
		validation: P,
		onOpenChangeComplete: _,
		alignItemWithTriggerActiveRef: ce,
		initialValueRef: Ce
	}), [
		me,
		R,
		p,
		L,
		f,
		y,
		w,
		Oe,
		Ee,
		Ie,
		P,
		_,
		ke
	]), Re = vr(g, P.inputRef), ze = y && Array.isArray(z) && z.length > 0, q = y ? void 0 : R, Be = C.useMemo(() => !y || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = Jb(e, x);
		return /*#__PURE__*/ (0, Y.jsx)("input", {
			type: "hidden",
			form: l,
			name: R,
			value: t,
			disabled: L
		}, t);
	}), [
		y,
		z,
		l,
		R,
		x,
		L
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Ib.Provider, {
		value: Le,
		children: /*#__PURE__*/ (0, Y.jsxs)(Lb.Provider, {
			value: Ae,
			children: [
				T,
				/*#__PURE__*/ (0, Y.jsx)("input", {
					...P.getValidationProps(L, {
						onFocus() {
							me.state.triggerElement?.focus({ focusVisible: !0 });
						},
						onChange(e) {
							if (e.nativeEvent.defaultPrevented || L || f) return;
							let t = e.currentTarget.value, n = hr(Xn, e.nativeEvent);
							function r() {
								if (y) return;
								let e = t.toLowerCase(), r = re.current.findIndex((t) => Jb(t, x).toLowerCase() === e || qb(t, b).toLowerCase() === e);
								r === -1 && (r = re.current.findIndex((t, n) => {
									let r = W.current[n];
									return r != null && r.toLowerCase() === e;
								}));
								let i = r === -1 ? void 0 : re.current[r];
								i != null && Oe(i, n);
							}
							me.set("forceMount", !0), queueMicrotask(r);
						}
					}),
					id: I && q == null ? `${I}-hidden-input` : void 0,
					form: l,
					name: q,
					autoComplete: u,
					value: xe,
					disabled: L,
					required: p && !ze,
					readOnly: f,
					ref: Re,
					style: R ? Nr : Mr,
					tabIndex: -1,
					"aria-hidden": !0,
					suppressHydrationWarning: !0
				}),
				Be
			]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function rx(e) {
	return e == null ? void 0 : `${e}-label`;
}
function ix(e, t) {
	return e ?? t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/trigger/SelectTrigger.mjs
var ax = 2, ox = 400, sx = {
	...Ol,
	...sp,
	popupSide: (e) => e ? { "data-popup-side": e } : null,
	value: () => null
}, cx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, setFocused: u, validationMode: d, state: f, disabled: p } = dp(), { labelId: m } = vp(), { store: h, setOpen: g, selectionRef: _, validation: v, readOnly: y, required: b, alignItemWithTriggerActiveRef: x, disabled: S } = Rb(), w = p || S || a, T = Zs(h, Zb.open), E = Zs(h, Zb.mounted), D = Zs(h, Zb.value), O = Zs(h, Zb.triggerProps), k = Zs(h, Zb.positionerElement), A = Zs(h, Zb.listElement), j = Zs(h, Zb.popupSide), M = Zs(h, Zb.id), N = Zs(h, Zb.labelId), P = Zs(h, Zb.hasSelectedValue), F = E && k ? j : null, I = i ?? M, L = ix(m, N);
	Hy({ id: I });
	let R = wr(k), z = C.useRef(null), { getButtonProps: B, buttonRef: V } = Fl({
		disabled: w,
		native: o
	}), H = Z((e) => {
		h.set("triggerElement", e);
	}), U = an(), W = an(), G = an();
	C.useEffect(() => {
		if (T) return G.start(ox, () => {
			_.current.allowUnselectedMouseUp = !0, _.current.allowSelectedMouseUp = !0;
		}), () => {
			G.clear();
		};
		_.current = {
			allowSelectedMouseUp: !1,
			allowUnselectedMouseUp: !1,
			dragY: 0
		}, W.clear();
	}, [
		T,
		_,
		W,
		G
	]);
	let ee = va(O, {
		id: I,
		role: "combobox",
		"aria-expanded": T ? "true" : "false",
		"aria-haspopup": "listbox",
		"aria-controls": T ? A?.id ?? Wn(k)?.id : void 0,
		"aria-labelledby": L,
		"aria-readonly": y || void 0,
		"aria-required": b || void 0,
		tabIndex: w ? -1 : 0,
		onFocus(e) {
			u(!0), T && x.current && g(!1, hr(Xn, e.nativeEvent)), U.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			Fn(k, e.relatedTarget) || (l(!0), u(!1), d === "onBlur" && v.commit(D));
		},
		onMouseDown(e) {
			if (T) return;
			let t = Zt(e.currentTarget);
			function n(e) {
				if (!z.current) return;
				let t = e.target;
				if (Fn(z.current, t) || Fn(R.current, t)) return;
				let n = jm(z.current);
				e.clientX >= n.left - ax && e.clientX <= n.right + ax && e.clientY >= n.top - ax && e.clientY <= n.bottom + ax || g(!1, hr(cr, e));
			}
			W.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, B), te = v.getValidationProps(w, ee);
	te.role = "combobox";
	let ne = {
		...f,
		open: T,
		disabled: w,
		value: D,
		readOnly: y,
		popupSide: F,
		placeholder: !P
	};
	return Q("button", e, {
		ref: [
			t,
			z,
			V,
			H
		],
		state: ne,
		stateAttributesMapping: sx,
		props: te
	});
}), lx = { value: () => null }, ux = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, { store: c, valueRef: l } = Rb(), u = Zs(c, Zb.value), d = Zs(c, Zb.items), f = Zs(c, Zb.itemToStringLabel), p = Zs(c, Zb.hasSelectedValue), m = !p && a != null && i == null, h = Zs(c, Zb.hasNullItemLabel, m), g = {
		value: u,
		placeholder: !p
	}, _ = null;
	return _ = typeof i == "function" ? i(u) : i ?? (!p && a != null && !h ? a : Array.isArray(u) ? Xb(u, d, f) : Yb(u, d, f)), Q("span", e, {
		state: g,
		ref: [t, l],
		props: [{ children: _ }, s],
		stateAttributesMapping: lx
	});
}), dx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = Rb();
	return Q("span", e, {
		state: { open: Zs(o, Zb.open) },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: Dl
	});
}), fx = /*#__PURE__*/ C.createContext(void 0), px = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { store: n } = Rb(), r = Zs(n, Zb.mounted), i = Zs(n, Zb.forceMount);
	return r || i ? /*#__PURE__*/ (0, Y.jsx)(fx.Provider, {
		value: !0,
		children: /*#__PURE__*/ (0, Y.jsx)(qa, {
			ref: t,
			...e
		})
	}) : null;
}), mx = /*#__PURE__*/ C.createContext(void 0);
function hx() {
	let e = C.useContext(mx);
	if (!e) throw Error(la(59));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/utils.mjs
function gx(e, t) {
	e && Object.assign(e.style, t);
}
var _x = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, vx = { position: "fixed" }, yx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o = "bottom", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = za, style: _, ...v } = e, { store: y, listRef: b, labelsRef: x, alignItemWithTriggerActiveRef: S, selectedItemTextRef: w, valuesRef: T, initialValueRef: E, popupRef: D, setValue: O } = Rb(), k = zb(), A = Zs(y, Zb.open), j = Zs(y, Zb.mounted), M = Zs(y, Zb.modal), N = Zs(y, Zb.value), P = Zs(y, Zb.openMethod), F = Zs(y, Zb.positionerElement), I = Zs(y, Zb.triggerElement), L = Zs(y, Zb.isItemEqualToValue), R = Zs(y, Zb.transitionStatus), z = C.useRef(null), B = C.useRef(null), [V, H] = C.useState(h), U = j && V && P !== "touch";
	!j && V !== h && H(h), X(() => {
		j || (Zb.scrollUpArrowVisible(y.state) && y.set("scrollUpArrowVisible", !1), Zb.scrollDownArrowVisible(y.state) && y.set("scrollDownArrowVisible", !1));
	}, [y, j]), C.useImperativeHandle(S, () => U), xm((U || M) && A, P === "touch", F, I);
	let W = _m({
		anchor: n,
		floatingRootContext: k,
		positionMethod: r,
		mounted: j,
		side: o,
		sideOffset: c,
		align: s,
		alignOffset: l,
		arrowPadding: f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		disableAnchorTracking: m ?? U,
		collisionAvoidance: g,
		keepMounted: !0
	}), G = U ? "none" : W.side, ee = U ? vx : W.positionerStyles, te = {
		open: A,
		side: G,
		align: W.align,
		anchorHidden: W.anchorHidden
	};
	X(() => {
		y.set("popupSide", W.side);
	}, [y, W.side]);
	let ne = ym(e, te, {
		styles: ee,
		transitionStatus: R,
		props: v,
		refs: [t, Z((e) => {
			y.set("positionerElement", e);
		})],
		hidden: !j,
		inert: !A
	}), re = C.useRef(0), ie = Z((e) => {
		if (e.size === 0 && re.current === 0 || T.current.length === 0) return;
		let t = re.current;
		if (re.current = e.size, e.size === t) return;
		let n = hr(Xn);
		if (t !== 0 && !y.state.multiple && N !== null && Ub(T.current, N, L) === -1) {
			let e = E.current, t = e != null && Ub(T.current, e, L) !== -1 ? e : null;
			O(t, n), t === null && (y.set("selectedIndex", null), w.current = null);
		}
		if (t !== 0 && y.state.multiple && Array.isArray(N)) {
			let e = (e) => Ub(T.current, e, L) !== -1, t = N.filter((t) => e(t));
			(t.length !== N.length || t.some((e) => !Hb(N, e, L))) && (O(t, n), t.length === 0 && (y.set("selectedIndex", null), w.current = null));
		}
		if (A && U) {
			y.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			gx(F, e), gx(D.current, e);
		}
	}), ae = C.useMemo(() => ({
		...W,
		side: G,
		alignItemWithTriggerActive: U,
		setControlledAlignItemWithTrigger: H,
		scrollUpArrowRef: z,
		scrollDownArrowRef: B
	}), [
		W,
		G,
		U,
		H
	]);
	return /*#__PURE__*/ (0, Y.jsx)(sd, {
		elementsRef: b,
		labelsRef: x,
		onMapChange: ie,
		children: /*#__PURE__*/ (0, Y.jsxs)(mx.Provider, {
			value: ae,
			children: [j && M && /*#__PURE__*/ (0, Y.jsx)(mu, {
				inert: pu(!A),
				cutout: I
			}), ne]
		})
	});
}), bx = "base-ui-disable-scrollbar", xx = {
	className: bx,
	getElement(e) {
		return /*#__PURE__*/ (0, Y.jsx)("style", {
			nonce: e,
			href: bx,
			precedence: "base-ui:low",
			children: `.${bx}{scrollbar-width:none}.${bx}::-webkit-scrollbar{display:none}`
		});
	}
}, Sx = /*#__PURE__*/ C.createContext(void 0), Cx = { disableStyleElements: !1 };
function wx() {
	return C.useContext(Sx) ?? Cx;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/SelectPopup.mjs
var Tx = {
	...kl,
	...uc
}, Ex = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s, popupRef: c, onOpenChangeComplete: l, setOpen: u, valueRef: d, firstItemTextRef: f, selectedItemTextRef: p, multiple: m, handleScrollArrowVisibility: h, scrollHandlerRef: g, listRef: _, highlightItemOnHover: v } = Rb(), { side: y, align: b, alignItemWithTriggerActive: x, isPositioned: S, setControlledAlignItemWithTrigger: w } = hx(), T = nm(!0) != null, E = zb(), D = fd(), { nonce: O, disableStyleElements: k } = wx(), A = Zs(s, Zb.id), j = Zs(s, Zb.open), M = Zs(s, Zb.openMethod), N = Zs(s, Zb.mounted), P = Zs(s, Zb.popupProps), F = Zs(s, Zb.transitionStatus), I = Zs(s, Zb.triggerElement), L = Zs(s, Zb.positionerElement), R = Zs(s, Zb.listElement), z = C.useRef(!1), B = C.useRef(!1), V = C.useRef({}), H = ln(), U = Z((e) => {
		if (!L || !c.current || !B.current) return;
		if (z.current || !x) {
			h();
			return;
		}
		let t = L.style.top === "0px", n = L.style.bottom === "0px";
		if (!t && !n) {
			h();
			return;
		}
		let r = kx(L), i = Ax(L.getBoundingClientRect().height, "y", r), a = Zt(L), o = pt(L), s = o.getComputedStyle(L), l = parseFloat(s.marginTop), u = parseFloat(s.marginBottom), d = Dx(o.getComputedStyle(c.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, m = Ox(e), g = 0, _ = null, v = !1, y = !1, b = (e) => {
			L.style.height = `${e}px`;
		}, S = (t, n) => {
			let r = $b(t, 0, f - i);
			r > 0 && b(i + r), e.scrollTop = n, f - (i + r) <= 1 && (z.current = !0), h();
		}, C = t ? m - p : p, w = Math.min(i + C, f);
		if (g = w, C <= 1) {
			S(C, t ? m : 0);
			return;
		}
		if (f - w > 1 ? t ? y = !0 : _ = 0 : (v = !0, n && p < m && (_ = p - (C - (i + C - f)))), g = Math.ceil(g), g !== 0 && b(g), y || _ != null) {
			let t = Ox(e), n = y ? t : $b(_, 0, t);
			Math.abs(e.scrollTop - n) > 1 && (e.scrollTop = n);
		}
		(v || g >= f - 1) && (z.current = !0), h();
	});
	C.useImperativeHandle(g, () => U, [U]), fc({
		open: j,
		ref: c,
		onComplete() {
			j && l?.(!0);
		}
	});
	let W = {
		open: j,
		transitionStatus: F,
		side: y,
		align: b
	};
	X(() => {
		!L || !c.current || Object.keys(V.current).length || (V.current = {
			top: L.style.top || "0",
			left: L.style.left || "0",
			right: L.style.right,
			height: L.style.height,
			bottom: L.style.bottom,
			minHeight: L.style.minHeight,
			maxHeight: L.style.maxHeight,
			marginTop: L.style.marginTop,
			marginBottom: L.style.marginBottom
		});
	}, [c, L]), X(() => {
		j || x || (B.current = !1, z.current = !1, gx(L, V.current));
	}, [
		j,
		x,
		L,
		c
	]), X(() => {
		let e = c.current;
		if (!j || !I || !L || !e || x && !S || s.state.transitionStatus === "ending") return;
		if (!x) {
			B.current = !0, H.request(h), e.style.removeProperty("--transform-origin");
			return;
		}
		let t = Nx(e);
		e.style.removeProperty("--transform-origin");
		try {
			let t = p.current;
			t?.isConnected || (t = !Zb.hasSelectedValue(s.state) && f.current?.isConnected ? f.current : null);
			let n = d.current, r = pt(L), i = r.getComputedStyle(L), a = r.getComputedStyle(e), o = Zt(I), c = kx(I), l = jx(I.getBoundingClientRect(), c), u = jx(L.getBoundingClientRect(), c), m = l.height, g = R || e, y = g.scrollHeight, b = parseFloat(a.borderBottomWidth), x = parseFloat(i.marginTop) || 10, S = parseFloat(i.marginBottom) || 10, C = parseFloat(i.minHeight) || 100, T = Dx(a), E = o.documentElement.clientHeight - x - S, O = o.documentElement.clientWidth, k = E - l.bottom + m, A, j = D === "rtl" ? l.right - u.width : l.left, M = 0;
			if (t && n) {
				let e = jx(n.getBoundingClientRect(), c);
				A = jx(t.getBoundingClientRect(), c), j = u.left + (D === "rtl" ? e.right - A.right : e.left - A.left);
				let r = e.top - l.top + e.height / 2;
				M = A.top - u.top + A.height / 2 - r;
			}
			let N = k + M + S + b, P = Math.min(E, N), F = E - x - S, H = N - P, U = O - 5;
			L.style.left = `${$b(j, 5, U - u.width)}px`, L.style.height = `${P}px`, L.style.maxHeight = "none", L.style.marginTop = `${x}px`, L.style.marginBottom = `${S}px`, e.style.height = "100%";
			let W = Ox(g), G = H >= W - 1;
			G && (P = Math.min(E, u.height) - (H - W));
			let ee = l.top < 20 || l.bottom > E - 20 || Math.ceil(P) + 1 < Math.min(y, C), te = (r.visualViewport?.scale ?? 1) !== 1 && Jt;
			if (ee || te) {
				B.current = !0, gx(L, V.current), w(!1);
				return;
			}
			let ne = Math.max(C, P);
			if (G) {
				let e = Math.max(0, E - N);
				L.style.top = u.height >= F ? "0" : `${e}px`, L.style.height = `${P}px`, g.scrollTop = Ox(g);
			} else L.style.bottom = "0", g.scrollTop = H;
			if (A) {
				let t = u.top, n = u.height, r = A.top + A.height / 2, i = $b(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty("--transform-origin", `50% ${i}%`);
			}
			(ne === E || P >= T) && (z.current = !0), h(), v && s.state.selectedIndex === null && s.state.activeIndex === null && _.current[0] != null && s.set("activeIndex", 0), B.current = !0;
		} finally {
			t();
		}
	}, [
		s,
		j,
		L,
		I,
		d,
		f,
		p,
		c,
		h,
		x,
		w,
		H,
		R,
		_,
		v,
		D,
		S
	]), C.useEffect(() => {
		if (!x || !L || !j) return;
		let e = pt(L);
		function t(e) {
			u(!1, hr(mr, e));
		}
		return It(e, "resize", t);
	}, [
		u,
		x,
		L,
		j
	]);
	let G = {
		...R ? {
			role: "presentation",
			"aria-orientation": void 0
		} : {
			role: "listbox",
			"aria-multiselectable": m || void 0,
			id: `${A}-list`
		},
		onKeyDown(e) {
			T && ru.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			R || U(e.currentTarget);
		},
		...x && { style: R ? { height: "100%" } : _x }
	}, ee = Q("div", e, {
		ref: [t, c],
		state: W,
		stateAttributesMapping: Tx,
		props: [
			P,
			G,
			rm(F),
			{ className: !R && x ? xx.className : void 0 },
			o
		]
	});
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [!k && xx.getElement(O), /*#__PURE__*/ (0, Y.jsx)(po, {
		context: E,
		modal: !1,
		disabled: !N,
		openInteractionType: M,
		returnFocus: a,
		restoreFocus: !0,
		children: ee
	})] });
});
function Dx(e) {
	let t = e.maxHeight || "";
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function Ox(e) {
	return ex(e.scrollHeight, e.clientHeight);
}
function kx(e) {
	return rs.getScale(e);
}
function Ax(e, t, n) {
	return e / n[t];
}
function jx(e, t) {
	return ci({
		x: Ax(e.x, "x", t),
		y: Ax(e.y, "y", t),
		width: Ax(e.width, "x", t),
		height: Ax(e.height, "y", t)
	});
}
var Mx = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function Nx(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Mx) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Mx) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/list/SelectList.mjs
var Px = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o, scrollHandlerRef: s } = Rb(), { alignItemWithTriggerActive: c } = hx(), l = Zs(o, Zb.hasScrollArrows), u = Zs(o, Zb.openMethod), d = Zs(o, Zb.multiple), f = {
		id: `${Zs(o, Zb.id)}-list`,
		role: "listbox",
		"aria-multiselectable": d || void 0,
		onScroll(e) {
			s.current?.(e.currentTarget);
		},
		...c && { style: _x },
		className: l && u !== "touch" ? xx.className : void 0
	};
	return Q("div", e, {
		ref: [t, Z((e) => {
			o.set("listElement", e);
		})],
		props: [f, a]
	});
}), Fx = /*#__PURE__*/ C.createContext(void 0);
function Ix() {
	let e = C.useContext(Fx);
	if (!e) throw Error(la(57));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/item/SelectItem.mjs
var Lx = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = C.useRef(null), d = xd({
		label: o,
		textRef: u,
		indexGuessBehavior: bd.GuessFromOrder
	}), { store: f, itemProps: p, setOpen: m, setValue: h, selectionRef: g, typingRef: _, valuesRef: v, multiple: y, selectedItemTextRef: b, disabled: x, readOnly: S } = Rb(), w = Zs(f, Zb.isActive, d.index), T = Zs(f, Zb.open), E = Zs(f, Zb.isSelected, a), D = Zs(f, Zb.isSelectedByFocus, d.index), O = Zs(f, Zb.isItemEqualToValue), k = d.index, A = k !== -1, j = C.useRef(null);
	X(() => {
		if (!A) return;
		let e = v.current;
		return e[k] = a, () => {
			delete e[k];
		};
	}, [
		A,
		k,
		a,
		v
	]), X(() => {
		if (!A) return;
		let e = f.state.value, t = e;
		y && Array.isArray(e) && (t = e.length > 0 ? e[e.length - 1] : void 0), t !== void 0 && Vb(a, t, O) && (f.set("selectedIndex", k), u.current && (b.current = u.current));
	}, [
		A,
		k,
		y,
		O,
		f,
		a,
		b
	]);
	let M = C.useRef(null), N = C.useRef("mouse"), P = C.useRef(!1), { getButtonProps: F, buttonRef: I } = Fl({
		disabled: s,
		focusableWhenDisabled: !0,
		native: c,
		composite: !0
	}), L = {
		disabled: s,
		selected: E,
		highlighted: w
	};
	function R(e) {
		if (x || S) return;
		let t = f.state.value;
		if (y) {
			let n = Array.isArray(t) ? t : [], r = E ? Wb(n, a, O) : [...n, a];
			h(r, hr(tr, e));
		} else h(a, hr(tr, e)), m(!1, hr(tr, e));
	}
	function z() {
		g.current.dragY = 0;
	}
	let B = {
		role: "option",
		"aria-selected": E,
		tabIndex: T && w ? 0 : -1,
		onKeyDown(e) {
			M.current = e.key, f.set("activeIndex", k), e.key === " " && _.current && e.preventDefault();
		},
		onClick(e) {
			let t = e.type === "click" && N.current !== "touch", n = e.nativeEvent.pointerType, r = t && wn(e.nativeEvent) && (n !== void 0 || w), i = t && !r && !P.current;
			P.current = !1, (e.type !== "keydown" || M.current !== null) && (s || e.type === "keydown" && M.current === " " && _.current || i || (M.current = null, R(e.nativeEvent)));
		},
		onPointerEnter(e) {
			N.current = e.pointerType;
		},
		onPointerMove(e) {
			if (e.pointerType === "mouse" && e.buttons === 1) {
				let t = g.current;
				t.dragY += e.movementY, t.dragY ** 2 >= 64 && (t.allowUnselectedMouseUp = !0);
			}
		},
		onPointerDown(e) {
			N.current = e.pointerType, P.current = !0, z();
		},
		onMouseUp() {
			if (z(), s || N.current === "touch" || P.current) return;
			let e = !g.current.allowSelectedMouseUp && E, t = !g.current.allowUnselectedMouseUp && !E;
			e || t || (P.current = !0, j.current?.click(), P.current = !1);
		}
	}, V = Q("div", e, {
		ref: [
			I,
			t,
			d.ref,
			j
		],
		state: L,
		props: [
			p,
			B,
			l,
			F
		]
	}), H = C.useMemo(() => ({
		selected: E,
		index: k,
		textRef: u,
		selectedByFocus: D,
		hasRegistered: A
	}), [
		E,
		k,
		u,
		D,
		A
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Fx.Provider, {
		value: H,
		children: V
	});
})), Rx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let n = e.keepMounted ?? !1, { selected: r } = Ix();
	return n || r ? /*#__PURE__*/ (0, Y.jsx)(zx, {
		...e,
		ref: t
	}) : null;
}), zx = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef((e, t) => {
	let { render: n, className: r, style: i, keepMounted: a, ...o } = e, { selected: s } = Ix(), c = C.useRef(null), { transitionStatus: l, setMounted: u } = oc(s), d = Q("span", e, {
		ref: [t, c],
		state: {
			selected: s,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, o],
		stateAttributesMapping: uc
	});
	return fc({
		open: s,
		ref: c,
		onComplete() {
			s || u(!1);
		}
	}), d;
})), Bx = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i, hasRegistered: a } = Ix(), { firstItemTextRef: o, selectedItemTextRef: s } = Rb(), { render: c, className: l, style: u, ...d } = e;
	return Q("div", e, {
		ref: [
			C.useCallback((e) => {
				e && (a && n === 0 && (o.current = e), a && i && (s.current = e));
			}, [
				o,
				s,
				n,
				i,
				a
			]),
			t,
			r
		],
		props: d
	});
})), Vx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o = !1, ...s } = e, c = a === "up", { store: l, popupRef: u, listRef: d, handleScrollArrowVisibility: f, scrollArrowsMountedCountRef: p } = Rb(), { side: m, scrollDownArrowRef: h, scrollUpArrowRef: g } = hx(), _ = Zs(l, c ? Zb.scrollUpArrowVisible : Zb.scrollDownArrowVisible), v = Zs(l, Zb.openMethod), y = _ && v !== "touch", b = an(), x = c ? g : h, { mounted: S, transitionStatus: C, setMounted: w } = oc(y);
	X(() => (p.current += 1, l.state.hasScrollArrows || l.set("hasScrollArrows", !0), () => {
		p.current = Math.max(0, p.current - 1), p.current === 0 && l.state.hasScrollArrows && l.set("hasScrollArrows", !1);
	}), [l, p]), fc({
		open: y,
		ref: x,
		onComplete() {
			y || w(!1);
		}
	});
	let T = Q("div", e, {
		ref: [t, x],
		state: {
			direction: a,
			visible: y,
			side: m,
			transitionStatus: C
		},
		props: [{
			"aria-hidden": !0,
			children: c ? "▲" : "▼",
			style: { position: "absolute" },
			onMouseMove(e) {
				if (e.movementX === 0 && e.movementY === 0 || b.isStarted()) return;
				l.set("activeIndex", null);
				function t() {
					let e = l.state.listElement ?? u.current;
					if (!e) return;
					l.set("activeIndex", null), f();
					let n = ex(e.scrollHeight, e.clientHeight), r = tx(e.scrollTop, n), i = r === (c ? 0 : n), a = d.current;
					if (r !== e.scrollTop && (e.scrollTop = r), a.length === 0 && l.set(c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !i), i) {
						b.clear();
						return;
					}
					if (a.length > 0) {
						let t = x.current?.offsetHeight || 0;
						e.scrollTop = Hx(a, c, r, e.clientHeight, t, n);
					}
					b.start(40, t);
				}
				b.start(40, t);
			},
			onMouseLeave() {
				b.clear();
			}
		}, s],
		stateAttributesMapping: uc
	});
	return S || o ? T : null;
});
function Hx(e, t, n, r, i, a) {
	if (t) {
		let t = 0, r = n + i - 1;
		for (let n = 0; n < e.length; n += 1) {
			let i = e[n];
			if (i && i.offsetTop >= r) {
				t = n;
				break;
			}
		}
		let o = Math.max(0, t - 1), s = e[o];
		return o < t && s ? tx(s.offsetTop - i, a) : 0;
	}
	let o = e.length - 1, s = n + r - i + 1;
	for (let t = 0; t < e.length; t += 1) {
		let n = e[t];
		if (n && n.offsetTop + n.offsetHeight > s) {
			o = Math.max(0, t - 1);
			break;
		}
	}
	let c = Math.min(e.length - 1, o + 1), l = e[c];
	return c > o && l ? tx(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var Ux = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(Vx, {
		...e,
		ref: t,
		direction: "down"
	});
}), Wx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(Vx, {
		...e,
		ref: t,
		direction: "up"
	});
}), Gx = nx;
function Kx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(ux, {
		"data-slot": "select-value",
		className: J("flex flex-1 text-left", e),
		...t
	});
}
function qx({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(cx, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: J("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, Y.jsx)(dx, { render: /* @__PURE__ */ (0, Y.jsx)(rf, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function Jx({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = Au();
	return /* @__PURE__ */ (0, Y.jsx)(px, {
		container: c,
		children: /* @__PURE__ */ (0, Y.jsx)(yx, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsxs)(Ex, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: J("cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, Y.jsx)(Xx, {}),
					/* @__PURE__ */ (0, Y.jsx)(Px, { children: t }),
					/* @__PURE__ */ (0, Y.jsx)(Zx, {})
				]
			})
		})
	});
}
function Yx({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Lx, {
		"data-slot": "select-item",
		className: J("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, Y.jsx)(Bx, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, Y.jsx)(Rx, {
			render: /* @__PURE__ */ (0, Y.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, Y.jsx)(nf, { className: "pointer-events-none" })
		})]
	});
}
function Xx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Wx, {
		"data-slot": "select-scroll-up-button",
		className: J("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(sf, {})
	});
}
function Zx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ux, {
		"data-slot": "select-scroll-down-button",
		className: J("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(rf, {})
	});
}
//#endregion
//#region src/components/streamlit/select.tsx
function Qx({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = _f(e.state, t), a = e.props.disabled || e.props.options.length === 0;
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "select",
		"data-testid": "ssui-v2-select",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsxs)(Gx, {
			disabled: a,
			items: e.props.options,
			modal: !1,
			onValueChange: (e) => {
				r(typeof e == "string" ? e : null);
			},
			value: i.value,
			children: [/* @__PURE__ */ (0, Y.jsx)(qx, {
				"aria-labelledby": n,
				className: "w-full",
				"data-testid": "ssui-v2-select-trigger",
				children: /* @__PURE__ */ (0, Y.jsx)(Kx, { placeholder: e.props.options.length === 0 ? "No options" : e.props.placeholder })
			}), /* @__PURE__ */ (0, Y.jsx)(Jx, {
				align: "start",
				alignItemWithTrigger: !1,
				"data-testid": "ssui-v2-select-content",
				children: e.props.options.map((e) => /* @__PURE__ */ (0, Y.jsx)(Yx, {
					disabled: e.disabled,
					value: e.value,
					children: e.label
				}, e.value))
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/separator.tsx
function $x({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Hm, {
		"data-slot": "separator",
		orientation: t,
		className: J("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
//#endregion
//#region src/components/streamlit/separator.tsx
function eS({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: e.props.orientation === "vertical" ? "flex h-8 justify-center" : "py-2",
		"data-ssui-component": "separator",
		"data-testid": "ssui-v2-separator",
		children: /* @__PURE__ */ (0, Y.jsx)($x, { orientation: e.props.orientation })
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/asc.mjs
function tS(e, t) {
	return e - t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/replaceArrayItemAtIndex.mjs
function nS(e, t, n) {
	let r = e.slice();
	return r[t] = n, r.sort(tS);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getSliderValue.mjs
function rS(e, t, n, r, i, a) {
	let o = e;
	return o = $b(o, n, r), i && (o = nS(a, t, $b(o, a[t - 1] ?? -Infinity, a[t + 1] ?? Infinity))), o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/validateMinimumDistance.mjs
function iS(e, t, n) {
	if (!Array.isArray(e)) return !0;
	let r = e.reduce((e, t, n, r) => (n === r.length - 1 || e.push(Math.abs(t - r[n + 1])), e), []);
	return Math.min(...r) >= t * n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/root/stateAttributesMapping.mjs
var aS = {
	activeThumbIndex: () => null,
	max: () => null,
	min: () => null,
	minStepsBetweenValues: () => null,
	step: () => null,
	values: () => null,
	...sp
}, oS = /*#__PURE__*/ C.createContext(void 0);
function sS() {
	let e = C.useContext(oS);
	if (e === void 0) throw Error(la(62));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/root/SliderRoot.mjs
function cS(e) {
	return "key" in e ? sr : rr;
}
function lS(e, t) {
	return typeof e == "number" && typeof t == "number" ? e === t : Array.isArray(e) && Array.isArray(t) ? Qb(e, t) : !1;
}
var uS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { "aria-labelledby": n, className: r, defaultValue: i, disabled: a = !1, id: o, format: s, largeStep: c = 10, locale: l, render: u, max: d = 100, min: f = 0, minStepsBetweenValues: p = 0, form: m, name: h, onValueChange: g, onValueCommitted: _, orientation: v = "horizontal", step: y = 1, thumbCollisionBehavior: b = "push", thumbAlignment: x = "center", value: S, style: w, ...T } = e, E = zl(o), D = rx(E), O = Z(g), k = Z(_), { clearErrors: A } = gp(), { state: j, disabled: M, name: N, setTouched: P, setDirty: F, validityData: I, validation: L } = dp(), { labelId: R } = vp(), [z, B] = C.useState(), V = n ?? ix(R, z), H = M || a, U = N ?? h, [W, G] = id({
		controlled: S,
		default: i ?? f,
		name: "Slider"
	}), ee = C.useRef(null), te = C.useRef(null), ne = C.useRef([]), re = C.useRef(null), ie = C.useRef(null), ae = C.useRef(-1), oe = C.useRef(null), se = C.useRef("none"), ce = wr(s), [le, ue] = C.useState(-1), [de, fe] = C.useState(-1), [pe, me] = C.useState(!1), [he, ge] = C.useState(() => /* @__PURE__ */ new Map()), [_e, ve] = C.useState([void 0, void 0]), ye = Z((e) => {
		ue(e), e !== -1 && fe(e);
	});
	fp(L.inputRef, E, W, void 0, !H, h), vu(W, () => {
		A(U), L.change(W);
		let e = I.initialValue, t;
		t = Array.isArray(W) && Array.isArray(e) ? !Qb(W, e) : W !== e, F(t);
	});
	let be = Z((e) => {
		e && (te.current = e);
	}), xe = Array.isArray(W), Se = C.useMemo(() => xe ? W.slice().sort(tS) : [$b(W, f, d)], [
		d,
		f,
		xe,
		W
	]), Ce = Z((e, t) => {
		if (Number.isNaN(e) || lS(e, W)) return !1;
		let n = t ?? hr("none", void 0, void 0, { activeThumbIndex: -1 }), r = n.event, i = new (r.constructor ?? Event)(r.type, r);
		return Object.defineProperty(i, "target", {
			writable: !0,
			value: {
				value: e,
				name: U
			}
		}), n.event = i, O(e, n), !n.isCanceled && (se.current = n.reason, G(e), !0);
	}), we = Z((e, t, n) => {
		let r = rS(e, t, f, d, xe, Se);
		if (iS(r, y, p)) {
			let e = cS(n), i = Ce(r, hr(e, n.nativeEvent, void 0, { activeThumbIndex: t }));
			P(!0), i && k(r, gr(e, n.nativeEvent));
		}
	});
	X(() => {
		let e = Pn(Zt(ee.current));
		H && Fn(ee.current, e) && e.blur();
	}, [H]), H && le !== -1 && ye(-1);
	let Te = C.useMemo(() => ({
		...j,
		activeThumbIndex: le,
		disabled: H,
		dragging: pe,
		orientation: v,
		max: d,
		min: f,
		minStepsBetweenValues: p,
		step: y,
		values: Se
	}), [
		j,
		le,
		H,
		pe,
		d,
		f,
		p,
		v,
		y,
		Se
	]), Ee = C.useMemo(() => ({
		active: le,
		controlRef: te,
		disabled: H,
		dragging: pe,
		validation: L,
		formatOptionsRef: ce,
		handleInputChange: we,
		indicatorPosition: _e,
		inset: x !== "center",
		labelId: V,
		rootLabelId: D,
		largeStep: c,
		lastUsedThumbIndex: de,
		lastChangeReasonRef: se,
		form: m,
		locale: l,
		max: d,
		min: f,
		minStepsBetweenValues: p,
		name: U,
		onValueCommitted: k,
		orientation: v,
		pressedInputRef: re,
		pressedThumbCenterOffsetRef: ie,
		pressedThumbIndexRef: ae,
		pressedValuesRef: oe,
		registerFieldControlRef: be,
		renderBeforeHydration: x === "edge",
		setActive: ye,
		setDragging: me,
		setIndicatorPosition: ve,
		setLabelId: B,
		setValue: Ce,
		state: Te,
		step: y,
		thumbCollisionBehavior: b,
		thumbMap: he,
		thumbRefs: ne,
		values: Se
	}), [
		le,
		te,
		V,
		D,
		H,
		pe,
		L,
		ce,
		we,
		_e,
		c,
		de,
		se,
		m,
		l,
		d,
		f,
		p,
		U,
		k,
		v,
		re,
		ie,
		ae,
		oe,
		be,
		ye,
		me,
		ve,
		B,
		Ce,
		Te,
		y,
		b,
		x,
		he,
		ne,
		Se
	]), De = Q("div", e, {
		state: Te,
		ref: [t, ee],
		props: [
			{
				"aria-labelledby": V,
				id: E,
				role: "group"
			},
			T,
			(e) => L.getValidationProps(H, e)
		],
		stateAttributesMapping: aS
	});
	return /*#__PURE__*/ (0, Y.jsx)(oS.Provider, {
		value: Ee,
		children: /*#__PURE__*/ (0, Y.jsx)(sd, {
			elementsRef: ne,
			onMapChange: ge,
			children: De
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getMidpoint.mjs
function dS(e) {
	let t = e.getBoundingClientRect();
	return {
		x: (t.left + t.right) / 2,
		y: (t.top + t.bottom) / 2
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/roundValueToStep.mjs
function fS(e) {
	if (e === 0) return 0;
	if (Math.abs(e) < 1) {
		let t = e.toExponential().split("e-"), n = t[0].split(".")[1];
		return (n ? n.length : 0) + parseInt(t[1], 10);
	}
	let t = e.toString().split(".")[1];
	return t ? t.length : 0;
}
function pS(e, t, n) {
	let r = Math.round((e - n) / t) * t + n;
	return Number(r.toFixed(Math.max(fS(t), fS(n))));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getPushedThumbValues.mjs
function mS({ values: e, index: t, nextValue: n, min: r, max: i, step: a, minStepsBetweenValues: o, initialValues: s }) {
	if (e.length === 0) return [];
	let c = e.slice(), l = a * o, u = c.length - 1, d = s ?? e;
	c[t] = $b(n, r + t * l, i - (u - t) * l);
	for (let e = t + 1; e <= u; e += 1) {
		let t = c[e - 1] + l, n = i - (u - e) * l, r = d[e] ?? c[e], a = Math.max(c[e], t);
		r < a && (a = Math.max(r, t)), c[e] = $b(a, t, n);
	}
	for (let e = t - 1; e >= 0; --e) {
		let t = c[e + 1] - l, n = r + e * l, i = d[e] ?? c[e], a = Math.min(c[e], t);
		i > a && (a = Math.min(i, t)), c[e] = $b(a, n, t);
	}
	for (let e = 0; e <= u; e += 1) c[e] = Number(c[e].toFixed(12));
	return c;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/resolveThumbCollision.mjs
function hS({ behavior: e, values: t, currentValues: n, initialValues: r, pressedIndex: i, nextValue: a, min: o, max: s, step: c, minStepsBetweenValues: l }) {
	let u = n ?? t, d = r ?? t;
	if (!(u.length > 1)) return {
		value: a,
		thumbIndex: 0,
		didSwap: !1
	};
	let f = c * l;
	switch (e) {
		case "swap": {
			let e = u[i], t = 1e-7, n = u.slice(), r = n[i - 1], p = n[i + 1], m = $b(a, r == null ? o : r + f, p == null ? s : p - f), h = Number(m.toFixed(12));
			n[i] = h;
			let g = a > e, _ = a < e, v = g && p != null && a >= p - t, y = _ && r != null && a <= r + t;
			if (!v && !y) return {
				value: n,
				thumbIndex: i,
				didSwap: !1
			};
			let b = v ? i + 1 : i - 1, x = n.map((e, t) => t === i ? h : d[t] ?? u[t]), S = a;
			S = v ? Math.max(a, n[b]) : Math.min(a, n[b]);
			let C = mS({
				values: n,
				index: b,
				nextValue: S,
				min: o,
				max: s,
				step: c,
				minStepsBetweenValues: l,
				initialValues: x
			}), w = v ? b - 1 : b + 1;
			if (w >= 0 && w < C.length) {
				let e = C[w - 1], t = C[w + 1], n = e == null ? o : e + f;
				n = Math.max(n, o + w * f);
				let r = t == null ? s : t - f;
				r = Math.min(r, s - (C.length - 1 - w) * f);
				let i = $b(h, n, r);
				C[w] = Number(i.toFixed(12));
			}
			return {
				value: C,
				thumbIndex: b,
				didSwap: !0
			};
		}
		case "push": return {
			value: mS({
				values: u,
				index: i,
				nextValue: a,
				min: o,
				max: s,
				step: c,
				minStepsBetweenValues: l
			}),
			thumbIndex: i,
			didSwap: !1
		};
		default: {
			let e = u.slice(), t = e[i - 1], n = e[i + 1], r = $b(a, t == null ? o : t + f, n == null ? s : n - f);
			return e[i] = Number(r.toFixed(12)), {
				value: e,
				thumbIndex: i,
				didSwap: !1
			};
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/control/SliderControl.mjs
var gS = 2;
function _S(e, t) {
	if (!e) return {
		start: 0,
		end: 0
	};
	function n(e) {
		let t = e == null ? 0 : parseFloat(e);
		return Number.isNaN(t) ? 0 : t;
	}
	let r = t ? "Top" : "InlineStart", i = t ? "Bottom" : "InlineEnd";
	return {
		start: n(e[`border${r}Width`]) + n(e[`padding${r}`]),
		end: n(e[`border${i}Width`]) + n(e[`padding${i}`])
	};
}
function vS(e, t) {
	if (t.current != null && e.changedTouches) {
		let n = e;
		for (let e = 0; e < n.changedTouches.length; e += 1) {
			let r = n.changedTouches[e];
			if (r.identifier === t.current) return {
				x: r.clientX,
				y: r.clientY
			};
		}
		return null;
	}
	return {
		x: e.clientX,
		y: e.clientY
	};
}
var yS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { disabled: o, dragging: s, inset: c, lastChangeReasonRef: l, max: u, min: d, minStepsBetweenValues: f, onValueCommitted: p, orientation: m, pressedInputRef: h, pressedThumbCenterOffsetRef: g, pressedThumbIndexRef: _, pressedValuesRef: v, registerFieldControlRef: y, renderBeforeHydration: b, setActive: x, setDragging: S, setValue: w, state: T, step: E, thumbCollisionBehavior: D, thumbRefs: O, values: k } = sS(), A = fd(), j = k.length > 1, M = m === "vertical", N = C.useRef(null), P = C.useRef(null), F = Z((e) => {
		e && P.current == null && (P.current = pt(e).getComputedStyle(e));
	}), I = C.useRef(null), L = C.useRef(0), R = C.useRef(0), z = C.useRef(null), B = wr(k);
	function V(e) {
		_.current !== e && (_.current = e);
		let t = O.current[e];
		if (!t) {
			g.current = null, h.current = null;
			return;
		}
		h.current = t.querySelector("input[type=\"range\"]");
	}
	function H() {
		_.current = -1, g.current = null, h.current = null;
	}
	function U(e) {
		return gt(e) ? O.current.some((t) => !gt(t) || !Fn(t, e) ? !1 : t.querySelector("input[type=\"range\"]")?.disabled === !0) : !1;
	}
	function W(e) {
		let t = N.current, n = _.current;
		if (!t || !j && (n < 0 || n >= k.length)) return null;
		let { width: r, height: i, bottom: a, left: o, right: s } = t.getBoundingClientRect(), c = _S(P.current, M), l = R.current, p = (M ? i : r) - c.start - c.end - l * 2, m = g.current ?? 0, h = e.x - m, y = e.y - m, b = $b(((M ? a - y - c.end : (A === "rtl" ? s - h : h - o) - c.start) - l) / p, 0, 1), x = (u - d) * b + d;
		return x = pS(x, E, d), x = $b(x, d, u), j ? n < 0 ? null : hS({
			behavior: D,
			values: k,
			currentValues: B.current ?? k,
			initialValues: v.current,
			pressedIndex: n,
			nextValue: x,
			min: d,
			max: u,
			step: E,
			minStepsBetweenValues: f
		}) : {
			value: x,
			thumbIndex: n,
			didSwap: !1
		};
	}
	function G(e) {
		v.current = j ? k.slice() : null, z.current = null, B.current = k;
		let t = _.current, n = t;
		if (t > -1 && t < k.length) {
			if (k[t] === u) {
				let e = t;
				for (; e > 0 && k[e - 1] === u;) --e;
				n = e;
			}
		} else {
			let t = M ? "y" : "x", r;
			n = -1;
			for (let i = 0; i < O.current.length; i += 1) {
				let a = O.current[i];
				if (gt(a) && !a.querySelector("input[type=\"range\"]")?.disabled) {
					let o = dS(a), s = Math.abs(e[t] - o[t]);
					(r === void 0 || s <= r) && (n = i, r = s);
				}
			}
		}
		if (n > -1 && n !== t && V(n), c) {
			let e = O.current[n];
			if (gt(e)) {
				let t = e.getBoundingClientRect();
				R.current = t[M ? "height" : "width"] / 2;
			}
		}
	}
	function ee(e) {
		let t = O.current?.[e]?.querySelector("input[type=\"range\"]");
		t && t.focus({
			preventScroll: !0,
			focusVisible: !1
		});
	}
	function te(e, t, n) {
		let r = w(e.value, hr(t, n, void 0, { activeThumbIndex: e.thumbIndex }));
		return r && (z.current = e.value, B.current = Array.isArray(e.value) ? e.value : [e.value], e.didSwap && V(e.thumbIndex)), r;
	}
	let ne = Z((e) => {
		let t = vS(e, I);
		if (t == null) return;
		if (L.current += 1, e.type === "pointermove" && e.buttons === 0) {
			re(e);
			return;
		}
		let n = W(t);
		n != null && iS(n.value, E, f) && (!s && L.current > gS && S(!0), te(n, "drag", e) && n.didSwap && ee(n.thumbIndex));
	}), re = Z((e) => {
		if (x(-1), S(!1), h.current = null, g.current = null, z.current != null) {
			let t = l.current;
			p(z.current, gr(t, e));
		}
		"pointerType" in e && N.current?.hasPointerCapture(e.pointerId) && N.current?.releasePointerCapture(e.pointerId), _.current = -1, I.current = null, v.current = null, z.current = null, ae();
	}), ie = Z((e) => {
		if (o) return;
		if (U(In(e))) {
			H();
			return;
		}
		let t = e.changedTouches[0];
		t != null && (I.current = t.identifier);
		let n = vS(e, I);
		if (n != null) {
			G(n);
			let t = W(n);
			if (t == null) return;
			ee(t.thumbIndex), te(t, "track-press", e) && t.didSwap && ee(t.thumbIndex);
		}
		L.current = 0;
		let r = Zt(N.current);
		r.addEventListener("touchmove", ne, { passive: !0 }), r.addEventListener("touchend", re, { passive: !0 });
	}), ae = Z(() => {
		let e = Zt(N.current);
		e.removeEventListener("pointermove", ne), e.removeEventListener("pointerup", re), e.removeEventListener("touchmove", ne), e.removeEventListener("touchend", re), v.current = null, z.current = null;
	}), oe = ln();
	return C.useEffect(() => {
		let e = N.current;
		if (!e) return () => ae();
		let t = It(e, "touchstart", ie, { passive: !0 });
		return () => {
			t(), oe.cancel(), ae();
		};
	}, [
		ae,
		ie,
		N,
		oe
	]), C.useEffect(() => {
		o && ae();
	}, [o, ae]), Q("div", e, {
		state: T,
		ref: [
			t,
			y,
			N,
			F
		],
		props: [{
			"data-base-ui-slider-control": b ? "" : void 0,
			onPointerDown(e) {
				let t = N.current, n = In(e.nativeEvent);
				if (!t || o || e.defaultPrevented || !gt(n) || e.button !== 0) return;
				if (U(n)) {
					H();
					return;
				}
				let r = vS(e, I);
				if (r != null) {
					G(r);
					let n = W(r);
					if (n == null) return;
					Fn(O.current[n.thumbIndex], Pn(Zt(t))) ? e.preventDefault() : oe.request(() => {
						ee(n.thumbIndex);
					}), S(!0), g.current == null && te(n, "track-press", e.nativeEvent) && n.didSwap && ee(n.thumbIndex);
				}
				e.nativeEvent.pointerId && t.setPointerCapture(e.nativeEvent.pointerId), L.current = 0;
				let i = Zt(N.current);
				i.addEventListener("pointermove", ne, { passive: !0 }), i.addEventListener("pointerup", re, { once: !0 });
			}
		}, a],
		stateAttributesMapping: aS
	});
}), bS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = sS();
	return Q("div", e, {
		state: o,
		ref: t,
		props: [{ style: { position: "relative" } }, a],
		stateAttributesMapping: aS
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useIsHydrating.mjs
function xS() {
	return un;
}
function SS() {
	return !1;
}
function CS() {
	return !0;
}
function wS() {
	return (0, Js.useSyncExternalStore)(xS, SS, CS);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/thumb/SliderThumbDataAttributes.mjs
var TS = /*#__PURE__*/ function(e) {
	return e.index = "data-index", e.dragging = "data-dragging", e.orientation = "data-orientation", e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.focused = "data-focused", e;
}({}), ES = /* @__PURE__ */ new Set([
	...ru,
	Xl,
	Zl
]);
function DS(e, t, n, r) {
	if (!(t < 0)) return e.length === 2 ? t === 0 ? `${Qy(e[t], r, n)} start range` : `${Qy(e[t], r, n)} end range` : n ? Qy(e[t], r, n) : void 0;
}
function OS(e, t, n, r, i) {
	let a = n === 1 ? e + t : e - t;
	return $b(Number(a.toFixed(Math.max(fS(e), fS(t), fS(r)))), r, i);
}
var kS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, children: r, className: i, "aria-describedby": a, "aria-label": o, "aria-labelledby": s, "aria-valuetext": c, disabled: l = !1, getAriaLabel: u, getAriaValueText: d, id: f, index: p, inputRef: m, onBlur: h, onFocus: g, onKeyDown: _, tabIndex: v, style: y, ...b } = e, { nonce: x } = wx(), S = zl(f), { active: w, lastUsedThumbIndex: T, controlRef: E, disabled: D, validation: O, formatOptionsRef: k, handleInputChange: A, inset: j, labelId: M, largeStep: N, locale: P, max: F, min: I, minStepsBetweenValues: L, form: R, name: z, orientation: B, pressedInputRef: V, pressedThumbCenterOffsetRef: H, pressedThumbIndexRef: U, renderBeforeHydration: W, setActive: G, setIndicatorPosition: ee, state: te, step: ne, values: re } = sS(), ie = fd(), ae = l || D, oe = re.length > 1, se = B === "vertical", ce = ie === "rtl", { setTouched: le, setFocused: ue, validationMode: de } = dp(), fe = C.useRef(null), pe = C.useRef(null), me = C.useRef(!1), he = zl(), ge = Hy(), _e = oe ? he : ge, { ref: ve, index: ye } = xd({ metadata: C.useMemo(() => ({ inputId: _e }), [_e]) }), be = oe ? p ?? ye : 0, xe = be === re.length - 1, Se = re[be], Ce = sb(Se, I, F), [we, Te] = C.useState(), Ee = wS(), De = T >= 0 && T < re.length ? T : -1, Oe = Z(() => {
		let e = E.current, t = fe.current;
		if (!e || !t) return;
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = se ? "height" : "width", a = r[i] - n[i], o = (n[i] / 2 + a * Ce / 100) / r[i] * 100, s = Number.isFinite(o) ? o : void 0;
		Te(s), be === 0 ? ee((e) => [s, e[1]]) : xe && ee((e) => [e[0], s]);
	});
	X(() => {
		j && queueMicrotask(Oe);
	}, [Oe, j]), X(() => {
		j && Oe();
	}, [
		Oe,
		j,
		Ce
	]), X(() => {
		if (!j) return;
		let e = E.current, t = fe.current;
		if (!e || !t) return;
		let n = pt(e).ResizeObserver;
		if (typeof n != "function") return;
		let r = new n(Oe);
		return r.observe(e), r.observe(t), () => {
			r.disconnect();
		};
	}, [
		E,
		Oe,
		j
	]);
	let ke = se ? "bottom" : "insetInlineStart", Ae = se ? "left" : "top", je;
	oe ? w === be ? je = 2 : De === be && (je = 1) : w === be && (je = 1);
	let Me;
	Me = j ? {
		"--position": `${we ?? 0}%`,
		visibility: W && Ee || we === void 0 ? "hidden" : void 0,
		position: "absolute",
		[ke]: "var(--position)",
		[Ae]: "50%",
		translate: `${(se || !ce ? -1 : 1) * 50}% ${(se ? 1 : -1) * 50}%`,
		zIndex: je
	} : Number.isFinite(Ce) ? {
		position: "absolute",
		[ke]: `${Ce}%`,
		[Ae]: "50%",
		translate: `${(se || !ce ? -1 : 1) * 50}% ${(se ? 1 : -1) * 50}%`,
		zIndex: je
	} : Mr;
	let K;
	B === "vertical" && (K = ce ? "vertical-rl" : "vertical-lr");
	let Ne = typeof u == "function" ? u(be) : o, Pe = va({
		"aria-label": Ne,
		"aria-labelledby": s ?? (Ne == null ? M : void 0),
		"aria-describedby": a,
		"aria-orientation": B,
		"aria-valuenow": Se,
		"aria-valuetext": typeof d == "function" ? d(Qy(Se, P, k.current ?? void 0), Se, be) : c ?? DS(re, be, k.current ?? void 0, P),
		disabled: ae,
		form: R,
		id: _e,
		max: F,
		min: I,
		name: z,
		onChange(e) {
			A(e.currentTarget.valueAsNumber, be, e);
		},
		onFocus(e) {
			let t = me.current;
			me.current = !1, G(be), ue(!0), t && e.stopPropagation();
		},
		onBlur(e) {
			if (me.current) {
				e.stopPropagation();
				return;
			}
			fe.current && (G(-1), le(!0), ue(!1), de === "onBlur" && O.commit(rS(Se, be, I, F, oe, re)));
		},
		onKeyDown(e) {
			if (e.defaultPrevented || !ES.has(e.key)) return;
			ru.has(e.key) && e.stopPropagation();
			let t = null, n = pS(Se, ne, I);
			switch (e.key) {
				case Gl:
					t = OS(n, e.shiftKey ? N : ne, 1, I, F);
					break;
				case Jl:
					t = OS(n, e.shiftKey ? N : ne, ce ? -1 : 1, I, F);
					break;
				case Kl:
					t = OS(n, e.shiftKey ? N : ne, -1, I, F);
					break;
				case ql:
					t = OS(n, e.shiftKey ? N : ne, ce ? 1 : -1, I, F);
					break;
				case Xl:
					t = OS(n, N, 1, I, F);
					break;
				case Zl:
					t = OS(n, N, -1, I, F);
					break;
				case "End":
					t = F, oe && (t = Number.isFinite(re[be + 1]) ? re[be + 1] - ne * L : F);
					break;
				case Yl: t = I, oe && (t = Number.isFinite(re[be - 1]) ? re[be - 1] + ne * L : I);
			}
			if (t !== null) {
				let n = e.currentTarget;
				Un(n) || (me.current = !0, n.blur(), n.focus({
					preventScroll: !0,
					focusVisible: !0
				})), A(t, be, e), e.preventDefault();
			}
		},
		step: ne,
		style: {
			...Mr,
			width: "100%",
			height: "100%",
			writingMode: K
		},
		tabIndex: v ?? void 0,
		type: "range",
		value: Se ?? ""
	}, (e) => O.getValidationProps(ae, e), { onKeyDown: _ }), Fe = vr(pe, O.inputRef, m);
	return Q("div", e, {
		state: te,
		ref: [
			t,
			ve,
			fe
		],
		props: [{
			[TS.index]: be,
			children: /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
				r,
				/*#__PURE__*/ (0, Y.jsx)("input", {
					ref: Fe,
					...Pe,
					suppressHydrationWarning: !0
				}),
				j && Ee && W && xe && /*#__PURE__*/ (0, Y.jsx)("script", {
					nonce: x,
					dangerouslySetInnerHTML: { __html: "!function(){const t=document.currentScript?.parentElement;if(!t)return;const e=t.closest(\"[data-base-ui-slider-control]\");if(!e)return;const r=e.querySelector(\"[data-base-ui-slider-indicator]\"),i=e.getBoundingClientRect(),n=\"vertical\"===e.getAttribute(\"data-orientation\")?\"height\":\"width\",o=e.querySelectorAll('input[type=\"range\"]'),l=o.length>1,s=o.length-1;let a=null,u=null;for(let t=0;t<o.length;t+=1){const e=o[t],y=parseFloat(e.getAttribute(\"value\")??\"\");if(Number.isNaN(y))return;const c=e.parentElement;if(!c)return;const p=parseFloat(e.getAttribute(\"max\")??\"100\"),g=parseFloat(e.getAttribute(\"min\")??\"0\"),b=c?.getBoundingClientRect(),d=i[n]-b[n],m=100*(y-g)/(p-g),v=(b[n]/2+d*m/100)/i[n]*100;c.style.setProperty(\"--position\",`${v}%`),Number.isFinite(v)&&(c.style.removeProperty(\"visibility\"),r&&(0===t?(a=v,r.style.setProperty(\"--start-position\",`${v}%`),l||r.style.removeProperty(\"visibility\")):t===s&&(u=v-(a??0),r.style.setProperty(\"--end-position\",`${v}%`),r.style.setProperty(\"--relative-size\",`${u}%`),r.style.removeProperty(\"visibility\"))))}}();" },
					suppressHydrationWarning: !0
				})
			] }),
			id: S,
			onBlur: h,
			onFocus: g,
			onPointerDown(e) {
				if (!ae) {
					if (U.current = be, fe.current != null) {
						let t = B === "horizontal" ? "x" : "y", n = dS(fe.current), r = (B === "horizontal" ? e.clientX : e.clientY) - n[t];
						H.current = r;
					}
					pe.current != null && V.current !== pe.current && (V.current = pe.current);
				}
			},
			style: Me,
			suppressHydrationWarning: W || void 0
		}, b],
		stateAttributesMapping: aS
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/indicator/SliderIndicator.mjs
function AS(e, t, n, r, i, a) {
	let o = n === void 0 || t && r === void 0 ? "hidden" : void 0, s = e ? "bottom" : "insetInlineStart", c = e ? "height" : "width", l = {
		visibility: i && a ? "hidden" : o,
		position: e ? "absolute" : "relative",
		[e ? "width" : "height"]: "inherit"
	};
	return l["--start-position"] = `${n ?? 0}%`, t ? (l["--relative-size"] = `${(r ?? 0) - (n ?? 0)}%`, l[s] = "var(--start-position)", l[c] = "var(--relative-size)", l) : (l[s] = 0, l[c] = "var(--start-position)", l);
}
function jS(e, t, n, r) {
	let i = e ? "bottom" : "insetInlineStart", a = e ? "height" : "width", o = {
		position: e ? "absolute" : "relative",
		[e ? "width" : "height"]: "inherit"
	};
	if (!t) return o[i] = 0, o[a] = `${n}%`, o;
	let s = r - n;
	return o[i] = `${n}%`, o[a] = `${s}%`, o;
}
var MS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { indicatorPosition: o, inset: s, max: c, min: l, orientation: u, renderBeforeHydration: d, state: f, values: p } = sS(), m = wS(), h = u === "vertical", g = p.length > 1, _ = s ? AS(h, g, o[0], o[1], d, m) : jS(h, g, sb(p[0], l, c), sb(p[p.length - 1], l, c));
	return Q("div", e, {
		state: f,
		ref: t,
		props: [{
			"data-base-ui-slider-indicator": d ? "" : void 0,
			style: _,
			suppressHydrationWarning: d || void 0
		}, a],
		stateAttributesMapping: aS
	});
});
//#endregion
//#region src/components/ui/slider.tsx
function NS({ className: e, defaultValue: t, value: n, min: r = 0, max: i = 100, ...a }) {
	let o = Array.isArray(n) ? n : Array.isArray(t) ? t : [r, i];
	return /* @__PURE__ */ (0, Y.jsx)(uS, {
		className: J("data-horizontal:w-full data-vertical:h-full", e),
		"data-slot": "slider",
		defaultValue: t,
		value: n,
		min: r,
		max: i,
		thumbAlignment: "edge",
		...a,
		children: /* @__PURE__ */ (0, Y.jsxs)(yS, {
			className: "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
			children: [/* @__PURE__ */ (0, Y.jsx)(bS, {
				"data-slot": "slider-track",
				className: "relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1",
				children: /* @__PURE__ */ (0, Y.jsx)(MS, {
					"data-slot": "slider-range",
					className: "bg-primary select-none data-horizontal:h-full data-vertical:w-full"
				})
			}), Array.from({ length: o.length }, (e, t) => /* @__PURE__ */ (0, Y.jsx)(kS, {
				"data-slot": "slider-thumb",
				className: "relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
			}, t))]
		})
	});
}
//#endregion
//#region src/components/streamlit/slider.tsx
function PS(e) {
	return typeof e == "number" ? [e] : [...e];
}
function FS({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, draft: i, setDraft: a } = vf(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-2 p-px",
		"data-ssui-component": "slider",
		"data-testid": "ssui-v2-slider",
		children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "flex items-center justify-between gap-3 text-sm",
			id: n,
			children: [/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "font-medium",
				children: e.props.label
			}), /* @__PURE__ */ (0, Y.jsx)("output", {
				className: "tabular-nums text-muted-foreground",
				children: i.join(" – ")
			})]
		}), /* @__PURE__ */ (0, Y.jsx)(NS, {
			"aria-labelledby": n,
			disabled: e.props.disabled,
			max: e.props.max,
			min: e.props.min,
			onValueChange: (e) => {
				a(PS(e));
			},
			onValueCommitted: (e) => {
				r(PS(e));
			},
			step: e.props.step,
			value: i
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs
var IS = /*#__PURE__*/ C.createContext(void 0);
function LS() {
	let e = C.useContext(IS);
	if (e === void 0) throw Error(la(63));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/switch/root/SwitchRootDataAttributes.mjs
var RS = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), zS = {
	...sp,
	checked(e) {
		return e ? { [RS.checked]: "" } : { [RS.unchecked]: "" };
	}
}, BS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i, "aria-labelledby": a, form: o, id: s, inputRef: c, name: l, nativeButton: u = !1, onCheckedChange: d, readOnly: f = !1, required: p = !1, disabled: m = !1, render: h, uncheckedValue: g, value: _, style: v, ...y } = e, { clearErrors: b } = gp(), { state: x, setTouched: S, setDirty: w, validityData: T, setFilled: E, setFocused: D, validationMode: O, disabled: k, name: A, validation: j } = dp(), { labelId: M } = vp(), N = k || m, P = A ?? l, F = C.useRef(null), I = vr(F, c, j.inputRef), L = C.useRef(null), R = zl(), z = Hy({
		id: s,
		implicit: !1,
		controlRef: L
	}), B = u ? void 0 : z, [V, H] = id({
		controlled: n,
		default: !!i,
		name: "Switch",
		state: "checked"
	});
	fp(L, R, V, void 0, !N, l), X(() => {
		F.current && E(F.current.checked);
	}, [F, E]), vu(V, () => {
		b(P), w(V !== T.initialValue), E(V), j.change(V);
	});
	let { getButtonProps: U, buttonRef: W } = Fl({
		disabled: N,
		native: u
	}), G = yp(a, M, F, !u, B), ee = {
		id: u ? z : R,
		role: "switch",
		"aria-checked": V,
		"aria-readonly": f || void 0,
		"aria-required": p || void 0,
		"aria-labelledby": G,
		onFocus() {
			N || D(!0);
		},
		onBlur() {
			let e = F.current;
			!e || N || (S(!0), D(!1), O === "onBlur" && j.commit(e.checked));
		},
		onClick(e) {
			if (f || N) return;
			e.preventDefault();
			let t = F.current;
			t && t.dispatchEvent(new (pt(t)).PointerEvent("click", {
				bubbles: !0,
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				metaKey: e.metaKey
			}));
		}
	}, te = va({
		checked: V,
		disabled: N,
		form: o,
		id: B,
		name: P,
		required: p,
		style: P ? Nr : Mr,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		ref: I,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			if (f) {
				e.preventDefault();
				return;
			}
			let t = e.currentTarget.checked, n = hr(Xn, e.nativeEvent);
			d?.(t, n), !n.isCanceled && H(t);
		},
		onFocus() {
			L.current?.focus();
		}
	}, (e) => j.getValidationProps(N, e), _ === void 0 ? fn : { value: _ }), ne = C.useMemo(() => ({
		...x,
		checked: V,
		disabled: N,
		readOnly: f,
		required: p
	}), [
		x,
		V,
		N,
		f,
		p
	]), re = Q("span", e, {
		state: ne,
		ref: [
			t,
			L,
			W
		],
		props: [
			ee,
			y,
			U,
			(e) => j.getValidationProps(N, e)
		],
		stateAttributesMapping: zS
	});
	return /*#__PURE__*/ (0, Y.jsxs)(IS.Provider, {
		value: ne,
		children: [
			re,
			!V && P && g !== void 0 && /*#__PURE__*/ (0, Y.jsx)("input", {
				type: "hidden",
				form: o,
				name: P,
				value: g,
				disabled: N
			}),
			/*#__PURE__*/ (0, Y.jsx)("input", {
				...te,
				suppressHydrationWarning: !0
			})
		]
	});
}), VS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e;
	return Q("span", e, {
		state: LS(),
		ref: t,
		stateAttributesMapping: zS,
		props: a
	});
});
//#endregion
//#region src/components/ui/switch.tsx
function HS({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(BS, {
		"data-slot": "switch",
		"data-size": t,
		className: J("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", e),
		...n,
		children: /* @__PURE__ */ (0, Y.jsx)(VS, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
//#endregion
//#region src/components/streamlit/switch.tsx
function US({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex items-center gap-2 p-px",
		"data-ssui-component": "switch",
		"data-testid": "ssui-v2-switch",
		children: [/* @__PURE__ */ (0, Y.jsx)(HS, {
			checked: i.value,
			disabled: e.props.disabled,
			id: n,
			onCheckedChange: r
		}), /* @__PURE__ */ (0, Y.jsx)("label", {
			className: "text-sm font-medium",
			htmlFor: n,
			children: e.props.label
		})]
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function WS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("textarea", {
		"data-slot": "textarea",
		className: J("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/textarea.tsx
function GS({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commitDraft: r, draft: i, setDraft: a } = vf(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "textarea",
		"data-testid": "ssui-v2-textarea",
		children: [/* @__PURE__ */ (0, Y.jsx)("label", {
			className: "text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(WS, {
			disabled: e.props.disabled,
			id: n,
			maxLength: e.props.maxLength ?? void 0,
			onBlur: r,
			onChange: (e) => {
				a(e.currentTarget.value);
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.ctrlKey || e.metaKey) && r();
			},
			placeholder: e.props.placeholder,
			rows: e.props.rows,
			value: i
		})]
	});
}
//#endregion
//#region src/components/streamlit/elements.tsx
var KS = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-4",
	lg: "gap-6",
	xl: "gap-8"
}, qS = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch"
}, JS = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
}, YS = {
	body: "text-sm text-foreground",
	muted: "text-sm text-muted-foreground",
	label: "text-sm font-medium text-foreground",
	caption: "text-xs text-muted-foreground"
};
function XS(e) {
	let t = "font-semibold tracking-tight text-foreground";
	switch (e.props.level) {
		case 2: return /* @__PURE__ */ (0, Y.jsx)("h2", {
			className: J(t, "text-xl"),
			children: e.props.text
		});
		case 3: return /* @__PURE__ */ (0, Y.jsx)("h3", {
			className: J(t, "text-lg"),
			children: e.props.text
		});
		case 4: return /* @__PURE__ */ (0, Y.jsx)("h4", {
			className: J(t, "text-base"),
			children: e.props.text
		});
	}
}
function ZS(e, t, n) {
	let r = ((n, r) => {
		t(e.id, n, r);
	}), i = ((t, r) => {
		n(e.id, t, r);
	});
	switch (e.envelope.kind) {
		case "select": return /* @__PURE__ */ (0, Y.jsx)(Qx, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "checkbox": return /* @__PURE__ */ (0, Y.jsx)(Ap, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "button": return /* @__PURE__ */ (0, Y.jsx)(Gf, {
			envelope: e.envelope,
			setTriggerValue: i
		});
		case "badge": return /* @__PURE__ */ (0, Y.jsx)(Lf, { envelope: e.envelope });
		case "progress": return /* @__PURE__ */ (0, Y.jsx)(gb, { envelope: e.envelope });
		case "separator": return /* @__PURE__ */ (0, Y.jsx)(eS, { envelope: e.envelope });
		case "aspect_ratio": return /* @__PURE__ */ (0, Y.jsx)(xf, { envelope: e.envelope });
		case "link_button": return /* @__PURE__ */ (0, Y.jsx)(Jy, { envelope: e.envelope });
		case "input": return /* @__PURE__ */ (0, Y.jsx)(qy, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "textarea": return /* @__PURE__ */ (0, Y.jsx)(GS, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "radio_group": return /* @__PURE__ */ (0, Y.jsx)(Fb, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "slider": return /* @__PURE__ */ (0, Y.jsx)(FS, {
			envelope: e.envelope,
			setStateValue: r
		});
		case "switch": return /* @__PURE__ */ (0, Y.jsx)(US, {
			envelope: e.envelope,
			setStateValue: r
		});
	}
}
function QS(e, t, n) {
	let r = e.children.map((e) => /* @__PURE__ */ (0, Y.jsx)(C.Fragment, { children: QS(e, t, n) }, e.id));
	switch (e.type) {
		case "leaf": return ZS(e, t, n);
		case "text": return /* @__PURE__ */ (0, Y.jsx)("p", {
			className: YS[e.props.variant],
			children: e.props.text
		});
		case "heading": return XS(e);
		case "code": return /* @__PURE__ */ (0, Y.jsx)("code", {
			className: "block overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground",
			"data-language": e.props.language,
			children: e.props.text
		});
		case "stack": return /* @__PURE__ */ (0, Y.jsx)("div", {
			className: J("flex w-full min-w-0", e.props.direction === "vertical" ? "flex-col" : "flex-row", KS[e.props.gap], qS[e.props.align], JS[e.props.justify], e.props.wrap && "flex-wrap"),
			children: r
		});
		case "grid": {
			let t = { gridTemplateColumns: e.props.minColumnWidth === null ? `repeat(${e.props.columns}, minmax(0, 1fr))` : `repeat(auto-fit, minmax(min(100%, ${e.props.minColumnWidth}px), 1fr))` };
			return /* @__PURE__ */ (0, Y.jsx)("div", {
				className: J("grid w-full min-w-0", KS[e.props.gap]),
				style: t,
				children: r
			});
		}
		case "card": return /* @__PURE__ */ (0, Y.jsx)(Kf, {
			size: e.props.size,
			children: r
		});
		case "card_header": return /* @__PURE__ */ (0, Y.jsx)(qf, { children: r });
		case "card_content": return /* @__PURE__ */ (0, Y.jsx)(Zf, { children: r });
		case "card_footer": return /* @__PURE__ */ (0, Y.jsx)(Qf, { children: r });
	}
}
var $S = (0, C.memo)(function({ enqueueEvent: e, nodes: t, setNodeState: n }) {
	return t.map((t) => /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "min-w-0",
		"data-ssui-element-id": t.id,
		children: QS(t, n, e)
	}, t.id));
});
function eC({ envelope: e, setStateValue: t, setTriggerValue: n }) {
	let { commit: r, state: i } = _f(e.state, t), a = (0, C.useRef)(i.value), o = (0, C.useRef)(i.value.sequence), s = (0, C.useRef)([]), c = (0, C.useRef)(!1);
	(0, C.useEffect)(() => {
		a.current = i.value, o.current = Math.max(o.current, i.value.sequence);
	}, [i.value]);
	let l = (0, C.useCallback)((e, t, n) => {
		if (t !== "state" || typeof n != "object" || !n) return;
		let i = a.current, s = i.sequence + 1, c = {
			...n,
			changeSequence: s
		}, l = {
			nodes: {
				...i.nodes,
				[e]: c
			},
			sequence: s
		};
		a.current = l, o.current = Math.max(o.current, s), r(l);
	}, [r]), u = (0, C.useCallback)((e, t, r) => {
		o.current += 1, s.current.push({
			nodeId: e,
			type: t,
			payload: r,
			sequence: o.current
		}), !c.current && (c.current = !0, queueMicrotask(() => {
			c.current = !1;
			let e = s.current.splice(0);
			e.length > 0 && n("events", e);
		}));
	}, [n]);
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "@container/elements grid min-w-0 gap-4 p-px",
		"data-ssui-component": "elements",
		"data-testid": "ssui-v2-elements",
		children: /* @__PURE__ */ (0, Y.jsx)($S, {
			enqueueEvent: u,
			nodes: e.props.nodes,
			setNodeState: l
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/preview-card/root/PreviewCardContext.mjs
var tC = /*#__PURE__*/ C.createContext(void 0);
function nC(e) {
	let t = C.useContext(tC);
	if (t === void 0 && !e) throw Error(la(50));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/preview-card/store/PreviewCardStore.mjs
var rC = {
	...Fc,
	instantType: $((e) => e.instantType),
	hasViewport: $((e) => e.hasViewport)
}, iC = class e extends nc {
	constructor(e, t, n = !1) {
		let r = new Ec(), i = {
			...aC(),
			...e
		};
		i.floatingRootContext = kc(r, t, n), super(i, {
			popupRef: /*#__PURE__*/ C.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerElements: r,
			closeDelayRef: { current: 300 },
			inlineRectCoordsRef: { current: void 0 }
		}, rC);
	}
	setOpen = (e, t) => {
		let { inlineRectCoordsRef: n } = this.context;
		yc(this, e, t, { onBeforeDispatch() {
			let r = t.event;
			e && t.reason === "trigger-hover" && t.trigger && "clientX" in r && "clientY" in r && n.current?.element !== t.trigger && Fs(n, t.trigger, r.clientX, r.clientY);
		} });
	};
	static useStore(t, n) {
		return hc(t, (t, r) => new e(n, t, r)).store;
	}
};
function aC() {
	return {
		...Oc(),
		instantType: void 0,
		hasViewport: !1
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/preview-card/root/PreviewCardRoot.mjs
function oC(e) {
	let { open: t, defaultOpen: n = !1, onOpenChange: r, onOpenChangeComplete: i, actionsRef: a, handle: o, triggerId: s, defaultTriggerId: c = null, children: l } = e, u = iC.useStore(o?.store, {
		open: n,
		openProp: t,
		activeTriggerId: c,
		triggerIdProp: s
	});
	bc(u, t, n, c), u.useControlledProp("openProp", t), u.useControlledProp("triggerIdProp", s), u.useContextCallback("onOpenChange", r), u.useContextCallback("onOpenChangeComplete", i);
	let d = u.useState("open"), f = u.useState("activeTriggerId"), p = u.useState("mounted"), m = u.useState("payload");
	Sc(u, { closeOnActiveTriggerUnmount: !0 });
	let { forceUnmount: h } = Cc(d, u, () => {
		u.context.inlineRectCoordsRef.current = void 0;
	});
	X(() => {
		d && (f ?? u.set("payload", void 0));
	}, [
		u,
		f,
		d
	]);
	let g = C.useCallback(() => {
		u.setOpen(!1, hr(pr));
	}, [u]);
	C.useImperativeHandle(a, () => ({
		unmount: h,
		close: g
	}), [h, g]);
	let _ = d || p;
	return /*#__PURE__*/ (0, Y.jsxs)(tC.Provider, {
		value: u,
		children: [_ && /*#__PURE__*/ (0, Y.jsx)(sC, { store: u }), typeof l == "function" ? l({ payload: m }) : l]
	});
}
function sC({ store: e }) {
	let t = _o(e.useState("floatingRootContext"));
	return wc(e, {
		activeTriggerProps: t.reference ?? fn,
		inactiveTriggerProps: t.trigger ?? fn,
		popupProps: C.useMemo(() => va(pc, t.floating), [t.floating])
	}), null;
}
var cC = Gs(function(e) {
	return nC(!0) ? /*#__PURE__*/ (0, Y.jsx)(oC, { ...e }) : /*#__PURE__*/ (0, Y.jsx)(no, { children: /*#__PURE__*/ (0, Y.jsx)(oC, { ...e }) });
}), lC = /*#__PURE__*/ C.createContext(void 0);
function uC() {
	let e = C.useContext(lC);
	if (e === void 0) throw Error(la(48));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
var dC = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: a, style: o, ...s } = e, { portalNode: c, portalSubtree: l } = Ka({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [l, c && /*#__PURE__*/ Ha.createPortal(n, c)] });
}), fC = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return nC().useState("mounted") || n ? /*#__PURE__*/ (0, Y.jsx)(lC.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(dC, {
			ref: t,
			...r
		})
	}) : null;
}), pC = Ks(function(e, t) {
	let { render: n, className: r, delay: i, closeDelay: a, id: o, payload: s, handle: c, style: l, ...u } = e, d = nC(!0), f = c?.store ?? d;
	if (!f) throw Error(la(89));
	let p = zl(o), m = f.useState("isTriggerActive", p), h = f.useState("isOpenedByTrigger", p), g = f.useState("floatingRootContext"), _ = f.context.inlineRectCoordsRef, v = C.useRef(null), y = i ?? 600, b = a ?? 300, { registerTrigger: x, isMountedByThisTrigger: S } = xc(p, v, f, { payload: s });
	X(() => {
		S && (f.context.closeDelayRef.current = b);
	}, [
		f,
		S,
		b
	]);
	let w = qc(g, {
		mouseOnly: !0,
		move: !1,
		handleClose: ll(),
		delay: () => ({
			open: y,
			close: b
		}),
		triggerElementRef: v,
		isActiveTrigger: m,
		isClosing: () => f.select("transitionStatus") === "ending"
	}), T = zc(g, { delay: y }), E = { open: h }, D = f.useState("triggerProps", S), O = Ps(_, h);
	return Q("a", e, {
		state: E,
		ref: [
			t,
			x,
			v
		],
		props: [
			w,
			T.reference,
			D,
			O,
			{ id: p },
			u
		],
		stateAttributesMapping: Dl
	});
}), mC = /*#__PURE__*/ C.createContext(void 0);
function hC() {
	let e = C.useContext(mC);
	if (e === void 0) throw Error(la(49));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/preview-card/positioner/PreviewCardPositioner.mjs
var gC = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "bottom", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Ba, style: g, ..._ } = e, v = nC(), y = uC(), b = eo(), x = v.useState("open"), S = v.useState("mounted"), C = v.useState("floatingRootContext"), w = v.useState("instantType"), T = v.useState("transitionStatus"), E = v.useState("hasViewport"), D = v.context.inlineRectCoordsRef, O = _m({
		anchor: i,
		floatingRootContext: C,
		positionMethod: a,
		mounted: S,
		side: o,
		sideOffset: c,
		align: s,
		alignOffset: l,
		arrowPadding: f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		disableAnchorTracking: m,
		keepMounted: y,
		nodeId: b,
		collisionAvoidance: h,
		adaptiveOrigin: E ? mm : void 0,
		inline: Is(D)
	}), k = O.update;
	X(() => {
		x && S && k();
	}, [
		x,
		S,
		k
	]);
	let A = ym(e, {
		open: x,
		side: O.side,
		align: O.align,
		anchorHidden: O.anchorHidden,
		instant: w
	}, {
		styles: O.positionerStyles,
		transitionStatus: T,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !S,
		inert: !x
	});
	return /*#__PURE__*/ (0, Y.jsx)(mC.Provider, {
		value: O,
		children: /*#__PURE__*/ (0, Y.jsx)(to, {
			id: b,
			children: A
		})
	});
}), _C = {
	...kl,
	...uc
}, vC = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, style: i, ...a } = e, o = nC(), { side: s, align: c } = hC(), l = o.useState("open"), u = o.useState("instantType"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("floatingRootContext");
	return fc({
		open: l,
		ref: o.context.popupRef,
		onComplete() {
			l && o.context.onOpenChangeComplete?.(!0);
		}
	}), Gc(p, { closeDelay: Z(() => o.context.closeDelayRef.current) }), Q("div", e, {
		state: {
			open: l,
			side: s,
			align: c,
			instant: u,
			transitionStatus: d
		},
		ref: [
			t,
			o.context.popupRef,
			o.useStateSetter("popupElement")
		],
		props: [
			f,
			rm(d),
			a
		],
		stateAttributesMapping: _C
	});
});
//#endregion
//#region src/components/ui/hover-card.tsx
function yC({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(cC, {
		"data-slot": "hover-card",
		...e
	});
}
function bC({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(pC, {
		"data-slot": "hover-card-trigger",
		...e
	});
}
function xC({ className: e, side: t = "bottom", sideOffset: n = 4, align: r = "center", alignOffset: i = 4, ...a }) {
	let o = Au();
	return /* @__PURE__ */ (0, Y.jsx)(fC, {
		"data-slot": "hover-card-portal",
		container: o,
		children: /* @__PURE__ */ (0, Y.jsx)(gC, {
			align: r,
			alignOffset: i,
			side: t,
			sideOffset: n,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsx)(vC, {
				"data-slot": "hover-card-content",
				className: J("z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...a
			})
		})
	});
}
//#endregion
//#region src/components/streamlit/hover-card.tsx
function SC({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "hover-card",
		"data-testid": "ssui-v2-hover-card",
		children: /* @__PURE__ */ (0, Y.jsxs)(yC, { children: [/* @__PURE__ */ (0, Y.jsx)(bC, {
			closeDelay: 100,
			delay: 200,
			render: /* @__PURE__ */ (0, Y.jsx)(Cu, {
				disabled: e.props.disabled,
				variant: "ghost"
			}),
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(xC, {
			align: "start",
			"data-testid": "ssui-v2-hover-card-content",
			children: /* @__PURE__ */ (0, Y.jsx)("p", { children: e.props.content })
		})] })
	});
}
//#endregion
//#region src/components/streamlit/calendar.tsx
function CC({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t), i = Fy(e.props.minDate), a = Fy(e.props.maxDate), o = Fy(r.value), [s, c] = (0, C.useState)(o ?? i ?? a ?? /* @__PURE__ */ new Date());
	(0, C.useEffect)(() => {
		o !== void 0 && c(o);
	}, [r.value]);
	let l = [];
	i !== void 0 && l.push({ before: i }), a !== void 0 && l.push({ after: a });
	let u = e.props.disabled ? !0 : l.length > 0 ? l : void 0;
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"aria-label": e.props.label,
		className: "w-fit overflow-hidden rounded-lg border",
		"data-ssui-component": "calendar",
		"data-testid": "ssui-v2-calendar",
		role: "group",
		children: /* @__PURE__ */ (0, Y.jsx)(ay, {
			disabled: u,
			endMonth: a,
			mode: "single",
			month: s,
			onMonthChange: c,
			onSelect: (e) => {
				n(e === void 0 ? null : Iy(e));
			},
			selected: o,
			startMonth: i
		})
	});
}
//#endregion
//#region node_modules/.pnpm/input-otp@1.4.2_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/input-otp/dist/index.mjs
var wC = Object.defineProperty, TC = Object.defineProperties, EC = Object.getOwnPropertyDescriptors, DC = Object.getOwnPropertySymbols, OC = Object.prototype.hasOwnProperty, kC = Object.prototype.propertyIsEnumerable, AC = (e, t, n) => t in e ? wC(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, jC = (e, t) => {
	for (var n in t ||= {}) OC.call(t, n) && AC(e, n, t[n]);
	if (DC) for (var n of DC(t)) kC.call(t, n) && AC(e, n, t[n]);
	return e;
}, MC = (e, t) => TC(e, EC(t)), NC = (e, t) => {
	var n = {};
	for (var r in e) OC.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && DC) for (var r of DC(e)) t.indexOf(r) < 0 && kC.call(e, r) && (n[r] = e[r]);
	return n;
};
function PC(e) {
	return [
		setTimeout(e, 0),
		setTimeout(e, 10),
		setTimeout(e, 50)
	];
}
function FC(e) {
	let t = C.useRef();
	return C.useEffect(() => {
		t.current = e;
	}), t.current;
}
var IC = 18, LC = 40, RC = `${LC}px`, zC = [
	"[data-lastpass-icon-root]",
	"com-1password-button",
	"[data-dashlanecreated]",
	"[style$=\"2147483647 !important;\"]"
].join(",");
function BC({ containerRef: e, inputRef: t, pushPasswordManagerStrategy: n, isFocused: r }) {
	let [i, a] = C.useState(!1), [o, s] = C.useState(!1), [c, l] = C.useState(!1), u = C.useMemo(() => n !== "none" && (n === "increase-width" || n === "experimental-no-flickering") && i && o, [
		i,
		o,
		n
	]), d = C.useCallback(() => {
		let r = e.current, i = t.current;
		if (!r || !i || c || n === "none") return;
		let o = r, s = o.getBoundingClientRect().left + o.offsetWidth, u = o.getBoundingClientRect().top + o.offsetHeight / 2, d = s - IC, f = u;
		document.querySelectorAll(zC).length === 0 && document.elementFromPoint(d, f) === r || (a(!0), l(!0));
	}, [
		e,
		t,
		c,
		n
	]);
	return C.useEffect(() => {
		let t = e.current;
		if (!t || n === "none") return;
		function r() {
			let e = window.innerWidth - t.getBoundingClientRect().right;
			s(e >= LC);
		}
		r();
		let i = setInterval(r, 1e3);
		return () => {
			clearInterval(i);
		};
	}, [e, n]), C.useEffect(() => {
		let e = r || document.activeElement === t.current;
		if (n === "none" || !e) return;
		let i = setTimeout(d, 0), a = setTimeout(d, 2e3), o = setTimeout(d, 5e3), s = setTimeout(() => {
			l(!0);
		}, 6e3);
		return () => {
			clearTimeout(i), clearTimeout(a), clearTimeout(o), clearTimeout(s);
		};
	}, [
		t,
		r,
		n,
		d
	]), {
		hasPWMBadge: i,
		willPushPWMBadge: u,
		PWM_BADGE_SPACE_WIDTH: RC
	};
}
var VC = C.createContext({}), HC = C.forwardRef((e, t) => {
	var n = e, { value: r, onChange: i, maxLength: a, textAlign: o = "left", pattern: s, placeholder: c, inputMode: l = "numeric", onComplete: u, pushPasswordManagerStrategy: d = "increase-width", pasteTransformer: f, containerClassName: p, noScriptCSSFallback: m = WC, render: h, children: g } = n, _ = NC(n, [
		"value",
		"onChange",
		"maxLength",
		"textAlign",
		"pattern",
		"placeholder",
		"inputMode",
		"onComplete",
		"pushPasswordManagerStrategy",
		"pasteTransformer",
		"containerClassName",
		"noScriptCSSFallback",
		"render",
		"children"
	]), v;
	let [y, b] = C.useState(typeof _.defaultValue == "string" ? _.defaultValue : ""), x = r ?? y, S = FC(x), w = C.useCallback((e) => {
		i?.(e), b(e);
	}, [i]), T = C.useMemo(() => s ? typeof s == "string" ? new RegExp(s) : s : null, [s]), E = C.useRef(null), D = C.useRef(null), O = C.useRef({
		value: x,
		onChange: w,
		isIOS: typeof window < "u" && ((v = window == null ? void 0 : window.CSS)?.supports)?.call(v, "-webkit-touch-callout", "none")
	}), k = C.useRef({ prev: [
		E.current?.selectionStart,
		E.current?.selectionEnd,
		E.current?.selectionDirection
	] });
	C.useImperativeHandle(t, () => E.current, []), C.useEffect(() => {
		let e = E.current, t = D.current;
		if (!e || !t) return;
		O.current.value !== e.value && O.current.onChange(e.value), k.current.prev = [
			e.selectionStart,
			e.selectionEnd,
			e.selectionDirection
		];
		function n() {
			if (document.activeElement !== e) {
				F(null), L(null);
				return;
			}
			let t = e.selectionStart, n = e.selectionEnd, r = e.selectionDirection, i = e.maxLength, a = e.value, o = k.current.prev, s = -1, c = -1, l;
			if (a.length !== 0 && t !== null && n !== null) {
				let e = t === n, r = t === a.length && a.length < i;
				if (e && !r) {
					let e = t;
					if (e === 0) s = 0, c = 1, l = "forward";
					else if (e === i) s = e - 1, c = e, l = "backward";
					else if (i > 1 && a.length > 1) {
						let t = 0;
						if (o[0] !== null && o[1] !== null) {
							l = e < o[1] ? "backward" : "forward";
							let n = o[0] === o[1] && o[0] < i;
							l === "backward" && !n && (t = -1);
						}
						s = t + e, c = t + e + 1;
					}
				}
				s !== -1 && c !== -1 && s !== c && E.current.setSelectionRange(s, c, l);
			}
			let u = s === -1 ? t : s, d = c === -1 ? n : c, f = l ?? r;
			F(u), L(d), k.current.prev = [
				u,
				d,
				f
			];
		}
		if (document.addEventListener("selectionchange", n, { capture: !0 }), n(), document.activeElement === e && N(!0), !document.getElementById("input-otp-style")) {
			let e = document.createElement("style");
			if (e.id = "input-otp-style", document.head.appendChild(e), e.sheet) {
				let t = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
				UC(e.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), UC(e.sheet, `[data-input-otp]:autofill { ${t} }`), UC(e.sheet, `[data-input-otp]:-webkit-autofill { ${t} }`), UC(e.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), UC(e.sheet, "[data-input-otp] + * { pointer-events: all !important; }");
			}
		}
		let r = () => {
			t && t.style.setProperty("--root-height", `${e.clientHeight}px`);
		};
		r();
		let i = new ResizeObserver(r);
		return i.observe(e), () => {
			document.removeEventListener("selectionchange", n, { capture: !0 }), i.disconnect();
		};
	}, []);
	let [A, j] = C.useState(!1), [M, N] = C.useState(!1), [P, F] = C.useState(null), [I, L] = C.useState(null);
	C.useEffect(() => {
		PC(() => {
			var e;
			(e = E.current) == null || e.dispatchEvent(new Event("input"));
			let t = E.current?.selectionStart, n = E.current?.selectionEnd, r = E.current?.selectionDirection;
			t !== null && n !== null && (F(t), L(n), k.current.prev = [
				t,
				n,
				r
			]);
		});
	}, [x, M]), C.useEffect(() => {
		S !== void 0 && x !== S && S.length < a && x.length === a && u?.(x);
	}, [
		a,
		u,
		S,
		x
	]);
	let R = BC({
		containerRef: D,
		inputRef: E,
		pushPasswordManagerStrategy: d,
		isFocused: M
	}), z = C.useCallback((e) => {
		let t = e.currentTarget.value.slice(0, a);
		if (t.length > 0 && T && !T.test(t)) {
			e.preventDefault();
			return;
		}
		typeof S == "string" && t.length < S.length && document.dispatchEvent(new Event("selectionchange")), w(t);
	}, [
		a,
		w,
		S,
		T
	]), B = C.useCallback(() => {
		var e;
		if (E.current) {
			let t = Math.min(E.current.value.length, a - 1), n = E.current.value.length;
			(e = E.current) == null || e.setSelectionRange(t, n), F(t), L(n);
		}
		N(!0);
	}, [a]), V = C.useCallback((e) => {
		let t = E.current;
		if (!f && (!O.current.isIOS || !e.clipboardData || !t)) return;
		let n = e.clipboardData.getData("text/plain"), r = f ? f(n) : n;
		e.preventDefault();
		let i = E.current?.selectionStart, o = E.current?.selectionEnd, s = (i === o ? x.slice(0, i) + r + x.slice(i) : x.slice(0, i) + r + x.slice(o)).slice(0, a);
		if (s.length > 0 && T && !T.test(s)) return;
		t.value = s, w(s);
		let c = Math.min(s.length, a - 1), l = s.length;
		t.setSelectionRange(c, l), F(c), L(l);
	}, [
		a,
		w,
		T,
		x
	]), H = C.useMemo(() => ({
		position: "relative",
		cursor: _.disabled ? "default" : "text",
		userSelect: "none",
		WebkitUserSelect: "none",
		pointerEvents: "none"
	}), [_.disabled]), U = C.useMemo(() => ({
		position: "absolute",
		inset: 0,
		width: R.willPushPWMBadge ? `calc(100% + ${R.PWM_BADGE_SPACE_WIDTH})` : "100%",
		clipPath: R.willPushPWMBadge ? `inset(0 ${R.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0,
		height: "100%",
		display: "flex",
		textAlign: o,
		opacity: "1",
		color: "transparent",
		pointerEvents: "all",
		background: "transparent",
		caretColor: "transparent",
		border: "0 solid transparent",
		outline: "0 solid transparent",
		boxShadow: "none",
		lineHeight: "1",
		letterSpacing: "-.5em",
		fontSize: "var(--root-height)",
		fontFamily: "monospace",
		fontVariantNumeric: "tabular-nums"
	}), [
		R.PWM_BADGE_SPACE_WIDTH,
		R.willPushPWMBadge,
		o
	]), W = C.useMemo(() => C.createElement("input", MC(jC({ autoComplete: _.autoComplete || "one-time-code" }, _), {
		"data-input-otp": !0,
		"data-input-otp-placeholder-shown": x.length === 0 || void 0,
		"data-input-otp-mss": P,
		"data-input-otp-mse": I,
		inputMode: l,
		pattern: T?.source,
		"aria-placeholder": c,
		style: U,
		maxLength: a,
		value: x,
		ref: E,
		onPaste: (e) => {
			var t;
			V(e), (t = _.onPaste) == null || t.call(_, e);
		},
		onChange: z,
		onMouseOver: (e) => {
			var t;
			j(!0), (t = _.onMouseOver) == null || t.call(_, e);
		},
		onMouseLeave: (e) => {
			var t;
			j(!1), (t = _.onMouseLeave) == null || t.call(_, e);
		},
		onFocus: (e) => {
			var t;
			B(), (t = _.onFocus) == null || t.call(_, e);
		},
		onBlur: (e) => {
			var t;
			N(!1), (t = _.onBlur) == null || t.call(_, e);
		}
	})), [
		z,
		B,
		V,
		l,
		U,
		a,
		I,
		P,
		_,
		T?.source,
		x
	]), G = C.useMemo(() => ({
		slots: Array.from({ length: a }).map((e, t) => {
			let n = M && P !== null && I !== null && (P === I && t === P || t >= P && t < I), r = x[t] === void 0 ? null : x[t];
			return {
				char: r,
				placeholderChar: x[0] === void 0 ? c?.[t] ?? null : null,
				isActive: n,
				hasFakeCaret: n && r === null
			};
		}),
		isFocused: M,
		isHovering: !_.disabled && A
	}), [
		M,
		A,
		a,
		I,
		P,
		_.disabled,
		x
	]), ee = C.useMemo(() => h ? h(G) : C.createElement(VC.Provider, { value: G }, g), [
		g,
		G,
		h
	]);
	return C.createElement(C.Fragment, null, m !== null && C.createElement("noscript", null, C.createElement("style", null, m)), C.createElement("div", {
		ref: D,
		"data-input-otp-container": !0,
		style: H,
		className: p
	}, ee, C.createElement("div", { style: {
		position: "absolute",
		inset: 0,
		pointerEvents: "none"
	} }, W)));
});
HC.displayName = "Input";
function UC(e, t) {
	try {
		e.insertRule(t);
	} catch {
		console.error("input-otp could not insert CSS rule:", t);
	}
}
var WC = "\n[data-input-otp] {\n  --nojs-bg: white !important;\n  --nojs-fg: black !important;\n\n  background-color: var(--nojs-bg) !important;\n  color: var(--nojs-fg) !important;\n  caret-color: var(--nojs-fg) !important;\n  letter-spacing: .25em !important;\n  text-align: center !important;\n  border: 1px solid var(--nojs-fg) !important;\n  border-radius: 4px !important;\n  width: 100% !important;\n}\n@media (prefers-color-scheme: dark) {\n  [data-input-otp] {\n    --nojs-bg: black !important;\n    --nojs-fg: white !important;\n  }\n}";
//#endregion
//#region src/components/ui/input-otp.tsx
function GC({ className: e, containerClassName: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(HC, {
		"data-slot": "input-otp",
		containerClassName: J("cn-input-otp flex items-center has-disabled:opacity-50", t),
		spellCheck: !1,
		className: J("disabled:cursor-not-allowed", e),
		...n
	});
}
function KC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "input-otp-group",
		className: J("flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40", e),
		...t
	});
}
function qC({ index: e, className: t, ...n }) {
	let { char: r, hasFakeCaret: i, isActive: a } = C.useContext(VC)?.slots[e] ?? {};
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		"data-slot": "input-otp-slot",
		"data-active": a,
		className: J("relative flex size-8 items-center justify-center border-y border-r border-input text-sm transition-all outline-none first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40", t),
		...n,
		children: [r, i && /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, Y.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
}
//#endregion
//#region src/components/streamlit/input-otp.tsx
function JC({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, commitDraft: i, draft: a, setDraft: o } = vf(e.state, t), s = e.props.pattern === "digits" ? "^[0-9]*$" : "^[a-zA-Z0-9]*$";
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "input_otp",
		"data-testid": "ssui-v2-input-otp",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(GC, {
			"aria-labelledby": n,
			disabled: e.props.disabled,
			maxLength: e.props.maxLength,
			onBlur: i,
			onChange: o,
			onComplete: (e) => {
				o(e), r(e);
			},
			pattern: s,
			value: a,
			children: /* @__PURE__ */ (0, Y.jsx)(KC, { children: Array.from({ length: e.props.maxLength }, (e, t) => /* @__PURE__ */ (0, Y.jsx)(qC, { index: t }, t)) })
		})]
	});
}
//#endregion
//#region src/components/ui/pagination.tsx
function YC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: J("mx-auto flex w-full justify-center", e),
		...t
	});
}
function XC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("ul", {
		"data-slot": "pagination-content",
		className: J("flex items-center gap-0.5", e),
		...t
	});
}
function ZC({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "pagination-item",
		...e
	});
}
function QC({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("span", {
		"aria-hidden": !0,
		"data-slot": "pagination-ellipsis",
		className: J("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: [/* @__PURE__ */ (0, Y.jsx)(cf, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
			className: "sr-only",
			children: "More pages"
		})]
	});
}
//#endregion
//#region src/components/streamlit/pagination.tsx
function $C(e, t) {
	return Array.from({ length: Math.max(t - e + 1, 0) }, (t, n) => e + n);
}
function ew(e, t, n) {
	if (t <= n * 2 + 5) return $C(1, t);
	let r = Math.max(e - n, 1), i = Math.min(e + n, t), a = r > 2, o = i < t - 1;
	return !a && o ? [
		...$C(1, n * 2 + 3),
		"ellipsis-right",
		t
	] : a && !o ? [
		1,
		"ellipsis-left",
		...$C(t - (n * 2 + 2), t)
	] : [
		1,
		"ellipsis-left",
		...$C(r, i),
		"ellipsis-right",
		t
	];
}
function tw({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t), i = ew(r.value, e.props.totalPages, e.props.siblingCount);
	return /* @__PURE__ */ (0, Y.jsx)(YC, {
		"aria-label": e.props.label,
		"data-ssui-component": "pagination",
		"data-testid": "ssui-v2-pagination",
		children: /* @__PURE__ */ (0, Y.jsxs)(XC, { children: [
			/* @__PURE__ */ (0, Y.jsx)(ZC, { children: /* @__PURE__ */ (0, Y.jsxs)(Cu, {
				"aria-label": "Go to previous page",
				disabled: e.props.disabled || r.value === 1,
				onClick: () => {
					n(r.value - 1);
				},
				size: "default",
				variant: "ghost",
				children: [/* @__PURE__ */ (0, Y.jsx)(af, { "aria-hidden": "true" }), /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "hidden sm:inline",
					children: "Previous"
				})]
			}) }),
			i.map((t) => /* @__PURE__ */ (0, Y.jsx)(ZC, { children: typeof t == "number" ? /* @__PURE__ */ (0, Y.jsx)(Cu, {
				"aria-current": t === r.value ? "page" : void 0,
				"aria-label": `Go to page ${t}`,
				disabled: e.props.disabled,
				onClick: () => {
					n(t);
				},
				size: "icon",
				variant: t === r.value ? "outline" : "ghost",
				children: t
			}) : /* @__PURE__ */ (0, Y.jsx)(QC, {}) }, t)),
			/* @__PURE__ */ (0, Y.jsx)(ZC, { children: /* @__PURE__ */ (0, Y.jsxs)(Cu, {
				"aria-label": "Go to next page",
				disabled: e.props.disabled || r.value === e.props.totalPages,
				onClick: () => {
					n(r.value + 1);
				},
				size: "default",
				variant: "ghost",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "hidden sm:inline",
					children: "Next"
				}), /* @__PURE__ */ (0, Y.jsx)(of, { "aria-hidden": "true" })]
			}) })
		] })
	});
}
//#endregion
//#region src/components/streamlit/popover.tsx
function nw({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "popover",
		"data-testid": "ssui-v2-popover",
		children: /* @__PURE__ */ (0, Y.jsxs)(ky, {
			modal: !1,
			children: [/* @__PURE__ */ (0, Y.jsx)(Ay, {
				disabled: e.props.disabled,
				render: /* @__PURE__ */ (0, Y.jsx)(Cu, { variant: "outline" }),
				children: e.props.label
			}), /* @__PURE__ */ (0, Y.jsx)(jy, {
				align: "start",
				"data-testid": "ssui-v2-popover-content",
				children: /* @__PURE__ */ (0, Y.jsxs)(My, { children: [/* @__PURE__ */ (0, Y.jsx)(Ny, { children: e.props.label }), /* @__PURE__ */ (0, Y.jsx)(Py, { children: e.props.content ?? "No additional content." })] })
			})]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootContext.mjs
var rw = /*#__PURE__*/ C.createContext(void 0);
function iw() {
	let e = C.useContext(rw);
	if (e === void 0) throw Error(la(53));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootCssVars.mjs
var aw = /*#__PURE__*/ function(e) {
	return e.scrollAreaCornerHeight = "--scroll-area-corner-height", e.scrollAreaCornerWidth = "--scroll-area-corner-width", e;
}({});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/utils/getOffset.mjs
function ow(e, t, n) {
	if (!e) return 0;
	let r = getComputedStyle(e), i = n === "x" ? "Inline" : "Block";
	return n === "x" && t === "margin" ? parseFloat(r[`${t}InlineStart`]) * 2 : parseFloat(r[`${t}${i}Start`]) + parseFloat(r[`${t}${i}End`]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.mjs
var sw = /*#__PURE__*/ function(e) {
	return e.orientation = "data-orientation", e.hovering = "data-hovering", e.scrolling = "data-scrolling", e.hasOverflowX = "data-has-overflow-x", e.hasOverflowY = "data-has-overflow-y", e.overflowXStart = "data-overflow-x-start", e.overflowXEnd = "data-overflow-x-end", e.overflowYStart = "data-overflow-y-start", e.overflowYEnd = "data-overflow-y-end", e;
}({}), cw = /*#__PURE__*/ function(e) {
	return e.scrolling = "data-scrolling", e.hasOverflowX = "data-has-overflow-x", e.hasOverflowY = "data-has-overflow-y", e.overflowXStart = "data-overflow-x-start", e.overflowXEnd = "data-overflow-x-end", e.overflowYStart = "data-overflow-y-start", e.overflowYEnd = "data-overflow-y-end", e;
}({}), lw = {
	hasOverflowX: (e) => e ? { [cw.hasOverflowX]: "" } : null,
	hasOverflowY: (e) => e ? { [cw.hasOverflowY]: "" } : null,
	overflowXStart: (e) => e ? { [cw.overflowXStart]: "" } : null,
	overflowXEnd: (e) => e ? { [cw.overflowXEnd]: "" } : null,
	overflowYStart: (e) => e ? { [cw.overflowYStart]: "" } : null,
	overflowYEnd: (e) => e ? { [cw.overflowYEnd]: "" } : null,
	cornerHidden: () => null
}, uw = {
	x: 0,
	y: 0
}, dw = {
	width: 0,
	height: 0
}, fw = {
	xStart: !1,
	xEnd: !1,
	yStart: !1,
	yEnd: !1
}, pw = {
	x: !0,
	y: !0,
	corner: !0
}, mw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, overflowEdgeThreshold: i, style: a, ...o } = e, { xStart: s, xEnd: c, yStart: l, yEnd: u } = hw(i), d = zl(), f = an(), p = an(), { nonce: m, disableStyleElements: h } = wx(), [g, _] = C.useState(!1), [v, y] = C.useState(!1), [b, x] = C.useState(!1), [S, w] = C.useState(!1), [T, E] = C.useState(!1), [D, O] = C.useState(dw), [k, A] = C.useState(dw), [j, M] = C.useState(fw), [N, P] = C.useState(pw), F = C.useRef(null), I = C.useRef(null), L = C.useRef(null), R = C.useRef(null), z = C.useRef(null), B = C.useRef(null), V = C.useRef(null), H = C.useRef(!1), U = C.useRef(0), W = C.useRef(0), G = C.useRef(0), ee = C.useRef(0), te = C.useRef("vertical"), ne = C.useRef(uw), re = Z((e) => {
		let t = e.x - ne.current.x, n = e.y - ne.current.y;
		ne.current = e, n !== 0 && (x(!0), f.start(500, () => {
			x(!1);
		})), t !== 0 && (y(!0), p.start(500, () => {
			y(!1);
		}));
	}), ie = Z((e) => {
		e.button === 0 && (H.current = !0, U.current = e.clientY, W.current = e.clientX, te.current = e.currentTarget.getAttribute(sw.orientation), I.current && (G.current = I.current.scrollTop, ee.current = I.current.scrollLeft), z.current && te.current === "vertical" && z.current.setPointerCapture(e.pointerId), B.current && te.current === "horizontal" && B.current.setPointerCapture(e.pointerId));
	}), ae = Z((e) => {
		if (!H.current) return;
		let t = e.clientY - U.current, n = e.clientX - W.current;
		if (I.current) {
			let r = I.current.scrollHeight, i = I.current.clientHeight, a = I.current.scrollWidth, o = I.current.clientWidth;
			if (z.current && L.current && te.current === "vertical") {
				let n = ow(L.current, "padding", "y"), a = ow(z.current, "margin", "y"), o = z.current.offsetHeight, s = t / (L.current.offsetHeight - o - n - a);
				I.current.scrollTop = G.current + s * (r - i), e.preventDefault(), x(!0), f.start(500, () => {
					x(!1);
				});
			}
			if (B.current && R.current && te.current === "horizontal") {
				let t = ow(R.current, "padding", "x"), r = ow(B.current, "margin", "x"), i = B.current.offsetWidth, s = n / (R.current.offsetWidth - i - t - r);
				I.current.scrollLeft = ee.current + s * (a - o), e.preventDefault(), y(!0), p.start(500, () => {
					y(!1);
				});
			}
		}
	}), oe = Z((e) => {
		H.current = !1, z.current && te.current === "vertical" && z.current.hasPointerCapture(e.pointerId) && z.current.releasePointerCapture(e.pointerId), B.current && te.current === "horizontal" && B.current.hasPointerCapture(e.pointerId) && B.current.releasePointerCapture(e.pointerId);
	});
	function se(e) {
		w(e.pointerType === "touch");
	}
	function ce(e) {
		if (se(e), e.pointerType !== "touch") {
			let t = Fn(F.current, e.target);
			_(t);
		}
	}
	let le = C.useMemo(() => ({
		scrolling: v || b,
		hasOverflowX: !N.x,
		hasOverflowY: !N.y,
		overflowXStart: j.xStart,
		overflowXEnd: j.xEnd,
		overflowYStart: j.yStart,
		overflowYEnd: j.yEnd,
		cornerHidden: N.corner
	}), [
		v,
		b,
		N.x,
		N.y,
		N.corner,
		j
	]), ue = {
		role: "presentation",
		onPointerEnter: ce,
		onPointerMove: ce,
		onPointerDown: se,
		onPointerLeave() {
			_(!1);
		},
		style: {
			position: "relative",
			[aw.scrollAreaCornerHeight]: `${D.height}px`,
			[aw.scrollAreaCornerWidth]: `${D.width}px`
		}
	}, de = Q("div", e, {
		state: le,
		ref: [t, F],
		props: [ue, o],
		stateAttributesMapping: lw
	}), fe = C.useMemo(() => ({
		handlePointerDown: ie,
		handlePointerMove: ae,
		handlePointerUp: oe,
		handleScroll: re,
		cornerSize: D,
		setCornerSize: O,
		thumbSize: k,
		setThumbSize: A,
		hasMeasuredScrollbar: T,
		setHasMeasuredScrollbar: E,
		touchModality: S,
		cornerRef: V,
		scrollingX: v,
		setScrollingX: y,
		scrollingY: b,
		setScrollingY: x,
		hovering: g,
		setHovering: _,
		viewportRef: I,
		rootRef: F,
		scrollbarYRef: L,
		scrollbarXRef: R,
		thumbYRef: z,
		thumbXRef: B,
		rootId: d,
		hiddenState: N,
		setHiddenState: P,
		overflowEdges: j,
		setOverflowEdges: M,
		viewportState: le,
		overflowEdgeThreshold: {
			xStart: s,
			xEnd: c,
			yStart: l,
			yEnd: u
		}
	}), [
		ie,
		ae,
		oe,
		re,
		D,
		k,
		T,
		S,
		v,
		y,
		b,
		x,
		g,
		_,
		d,
		N,
		j,
		le,
		s,
		c,
		l,
		u
	]);
	return /*#__PURE__*/ (0, Y.jsxs)(rw.Provider, {
		value: fe,
		children: [!h && xx.getElement(m), de]
	});
});
function hw(e) {
	if (typeof e == "number") {
		let t = Math.max(0, e);
		return {
			xStart: t,
			xEnd: t,
			yStart: t,
			yEnd: t
		};
	}
	return {
		xStart: Math.max(0, e?.xStart || 0),
		xEnd: Math.max(0, e?.xEnd || 0),
		yStart: Math.max(0, e?.yStart || 0),
		yEnd: Math.max(0, e?.yEnd || 0)
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewportContext.mjs
var gw = /*#__PURE__*/ C.createContext(void 0), _w = /*#__PURE__*/ function(e) {
	return e.scrollAreaOverflowXStart = "--scroll-area-overflow-x-start", e.scrollAreaOverflowXEnd = "--scroll-area-overflow-x-end", e.scrollAreaOverflowYStart = "--scroll-area-overflow-y-start", e.scrollAreaOverflowYEnd = "--scroll-area-overflow-y-end", e;
}({}), vw = !1;
function yw() {
	vw || Jt || (typeof CSS < "u" && "registerProperty" in CSS && [
		_w.scrollAreaOverflowXStart,
		_w.scrollAreaOverflowXEnd,
		_w.scrollAreaOverflowYStart,
		_w.scrollAreaOverflowYEnd
	].forEach((e) => {
		try {
			CSS.registerProperty({
				name: e,
				syntax: "<length>",
				inherits: !1,
				initialValue: "0px"
			});
		} catch {}
	}), vw = !0);
}
var bw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { viewportRef: o, scrollbarYRef: s, scrollbarXRef: c, thumbYRef: l, thumbXRef: u, cornerRef: d, cornerSize: f, setCornerSize: p, setThumbSize: m, rootId: h, setHiddenState: g, hiddenState: _, setHasMeasuredScrollbar: v, handleScroll: y, setHovering: b, setOverflowEdges: x, overflowEdges: S, overflowEdgeThreshold: w, scrollingX: T, scrollingY: E } = iw(), D = fd(), O = C.useRef(!0), k = C.useRef([
		NaN,
		NaN,
		NaN,
		NaN
	]), A = an(), j = an(), M = Z(() => {
		let e = o.current, t = s.current, n = c.current, r = l.current, i = u.current, a = d.current;
		if (!e) return;
		let h = e.scrollHeight, _ = e.scrollWidth, y = e.clientHeight, b = e.clientWidth, S = e.scrollTop, C = e.scrollLeft, T = k.current, E = Number.isNaN(T[0]);
		if (T[0] = y, T[1] = h, T[2] = b, T[3] = _, E && v(!0), h === 0 || _ === 0) return;
		let O = xw(e), A = O.y, j = O.x, M = b / _, N = y / h, P = Math.max(0, _ - b), F = Math.max(0, h - y), I = 0, L = 0;
		if (!j) {
			let e = 0;
			e = $b(D === "rtl" ? -C : C, 0, P), I = tx(e, P), L = P - I;
		}
		let R = A ? 0 : $b(S, 0, F), z = A ? 0 : tx(R, F), B = A ? 0 : F - z, V = j ? 0 : b, H = A ? 0 : y, U = 0, W = 0;
		!j && !A && (U = t?.offsetWidth || 0, W = n?.offsetHeight || 0);
		let G = f.width === 0 && f.height === 0, ee = G ? U : 0, te = G ? W : 0, ne = ow(n, "padding", "x"), re = ow(t, "padding", "y"), ie = ow(i, "margin", "x"), ae = ow(r, "margin", "y"), oe = V - ne - ie, se = H - re - ae, ce = n ? Math.min(n.offsetWidth - ee, oe) : oe, le = t ? Math.min(t.offsetHeight - te, se) : se, ue = Math.max(16, ce * M), de = Math.max(16, le * N);
		if (m((e) => e.height === de && e.width === ue ? e : {
			width: ue,
			height: de
		}), t && r) {
			let e = t.offsetHeight - de - re - ae, n = h - y, i = n === 0 ? 0 : S / n, a = Math.min(e, Math.max(0, i * e));
			r.style.transform = `translate3d(0,${a}px,0)`;
		}
		if (n && i) {
			let e = n.offsetWidth - ue - ne - ie, t = _ - b, r = t === 0 ? 0 : C / t, a = D === "rtl" ? $b(r * e, -e, 0) : $b(r * e, 0, e);
			i.style.transform = `translate3d(${a}px,0,0)`;
		}
		let fe = [
			[_w.scrollAreaOverflowXStart, I],
			[_w.scrollAreaOverflowXEnd, L],
			[_w.scrollAreaOverflowYStart, z],
			[_w.scrollAreaOverflowYEnd, B]
		];
		for (let [t, n] of fe) e.style.setProperty(t, `${n}px`);
		a && (j || A ? p({
			width: 0,
			height: 0
		}) : !j && !A && p({
			width: U,
			height: W
		})), g((e) => Sw(e, O));
		let pe = {
			xStart: !j && I > w.xStart,
			xEnd: !j && L > w.xEnd,
			yStart: !A && z > w.yStart,
			yEnd: !A && B > w.yEnd
		};
		x((e) => e.xStart === pe.xStart && e.xEnd === pe.xEnd && e.yStart === pe.yStart && e.yEnd === pe.yEnd ? e : pe);
	});
	X(() => {
		o.current && yw();
	}, [o]), X(() => {
		queueMicrotask(M);
	}, [
		M,
		_,
		D,
		w.xStart,
		w.xEnd,
		w.yStart,
		w.yEnd
	]), X(() => {
		o.current?.matches(":hover") && b(!0);
	}, [o, b]), X(() => {
		let e = o.current;
		if (typeof ResizeObserver > "u" || !e) return;
		let t = !1, n = new ResizeObserver(() => {
			if (!t) {
				t = !0;
				let n = k.current;
				if (n[0] === e.clientHeight && n[1] === e.scrollHeight && n[2] === e.clientWidth && n[3] === e.scrollWidth) return;
			}
			M();
		});
		return n.observe(e), j.start(0, () => {
			let t = e.getAnimations({ subtree: !0 });
			t.length !== 0 && Promise.allSettled(t.map((e) => e.finished)).then(M).catch(() => {});
		}), () => {
			n.disconnect(), j.clear();
		};
	}, [
		M,
		o,
		j
	]);
	function N() {
		O.current = !1;
	}
	let P = {
		role: "presentation",
		...h && { "data-id": `${h}-viewport` },
		tabIndex: _.x && _.y ? -1 : 0,
		className: xx.className,
		style: { overflow: "scroll" },
		onScroll() {
			o.current && (M(), O.current || y({
				x: o.current.scrollLeft,
				y: o.current.scrollTop
			}), A.start(100, () => {
				O.current = !0;
			}));
		},
		onWheel: N,
		onTouchMove: N,
		onPointerMove: N,
		onPointerEnter: N,
		onKeyDown: N
	}, F = C.useMemo(() => ({
		scrolling: T || E,
		hasOverflowX: !_.x,
		hasOverflowY: !_.y,
		overflowXStart: S.xStart,
		overflowXEnd: S.xEnd,
		overflowYStart: S.yStart,
		overflowYEnd: S.yEnd,
		cornerHidden: _.corner
	}), [
		T,
		E,
		_.x,
		_.y,
		_.corner,
		S
	]), I = Q("div", e, {
		ref: [t, o],
		state: F,
		props: [P, a],
		stateAttributesMapping: lw
	}), L = C.useMemo(() => ({ computeThumbPosition: M }), [M]);
	return /*#__PURE__*/ (0, Y.jsx)(gw.Provider, {
		value: L,
		children: I
	});
});
function xw(e) {
	let t = e.clientHeight >= e.scrollHeight, n = e.clientWidth >= e.scrollWidth;
	return {
		y: t,
		x: n,
		corner: t || n
	};
}
function Sw(e, t) {
	return e.y === t.y && e.x === t.x && e.corner === t.corner ? e : t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarContext.mjs
var Cw = /*#__PURE__*/ C.createContext(void 0);
function ww() {
	let e = C.useContext(Cw);
	if (e === void 0) throw Error(la(54));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.mjs
var Tw = /*#__PURE__*/ function(e) {
	return e.scrollAreaThumbHeight = "--scroll-area-thumb-height", e.scrollAreaThumbWidth = "--scroll-area-thumb-width", e;
}({}), Ew = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, orientation: i = "vertical", keepMounted: a = !1, style: o, ...s } = e, { hovering: c, scrollingX: l, scrollingY: u, hiddenState: d, overflowEdges: f, scrollbarYRef: p, scrollbarXRef: m, viewportRef: h, thumbYRef: g, thumbXRef: _, handlePointerDown: v, handlePointerUp: y, handleScroll: b, rootId: x, thumbSize: S, hasMeasuredScrollbar: w } = iw(), T = {
		hovering: c,
		scrolling: {
			horizontal: l,
			vertical: u
		}[i],
		orientation: i,
		hasOverflowX: !d.x,
		hasOverflowY: !d.y,
		overflowXStart: f.xStart,
		overflowXEnd: f.xEnd,
		overflowYStart: f.yStart,
		overflowYEnd: f.yEnd,
		cornerHidden: d.corner
	}, E = fd(), D = !w && !a, O = i === "vertical" ? d.y : d.x, k = a || !O;
	C.useEffect(() => {
		if (!k) return;
		let e = h.current, t = i === "vertical" ? p.current : m.current;
		if (!t) return;
		function n(n) {
			if (!e || !t || n.ctrlKey) return;
			let r = i === "horizontal", a = r ? "scrollLeft" : "scrollTop", o = r ? n.deltaX : n.deltaY;
			if (o === 0) return;
			let s = r ? e.scrollWidth - e.clientWidth : e.scrollHeight - e.clientHeight, c = r && E === "rtl" ? -s : 0, l = r && E === "rtl" ? 0 : s, u = e[a];
			u <= c && o < 0 || u >= l && o > 0 || (n.preventDefault(), e[a] = Math.min(l, Math.max(c, u + o)), b({
				x: e.scrollLeft,
				y: e.scrollTop
			}));
		}
		return It(t, "wheel", n, { passive: !1 });
	}, [
		E,
		b,
		i,
		m,
		p,
		k,
		h
	]);
	let A = {
		...x && { "data-id": `${x}-scrollbar` },
		onPointerDown(e) {
			if (e.button !== 0) return;
			let t = In(e.nativeEvent), n = i === "vertical" ? g.current : _.current;
			if (!(n && Fn(n, t)) && h.current) {
				if (g.current && p.current && i === "vertical") {
					let t = ow(g.current, "margin", "y"), n = ow(p.current, "padding", "y"), r = g.current.offsetHeight, i = p.current.getBoundingClientRect(), a = e.clientY - i.top - r / 2 - n + t / 2, o = h.current.scrollHeight, s = h.current.clientHeight, c = a / (p.current.offsetHeight - r - n - t) * (o - s);
					h.current.scrollTop = c;
				}
				if (_.current && m.current && i === "horizontal") {
					let t = ow(_.current, "margin", "x"), n = ow(m.current, "padding", "x"), r = _.current.offsetWidth, i = m.current.getBoundingClientRect(), a = e.clientX - i.left - r / 2 - n + t / 2, o = h.current.scrollWidth, s = h.current.clientWidth, c = a / (m.current.offsetWidth - r - n - t), l;
					E === "rtl" ? (l = (1 - c) * (o - s), h.current.scrollLeft <= 0 && (l = -l)) : l = c * (o - s), h.current.scrollLeft = l;
				}
				b({
					x: h.current.scrollLeft,
					y: h.current.scrollTop
				}), v(e);
			}
		},
		onPointerUp: y,
		onPointerCancel: y,
		style: {
			position: "absolute",
			touchAction: "none",
			WebkitUserSelect: "none",
			userSelect: "none",
			visibility: D ? "hidden" : void 0,
			...i === "vertical" && {
				top: 0,
				bottom: `var(${aw.scrollAreaCornerHeight})`,
				insetInlineEnd: 0,
				[Tw.scrollAreaThumbHeight]: `${S.height}px`
			},
			...i === "horizontal" && {
				insetInlineStart: 0,
				insetInlineEnd: `var(${aw.scrollAreaCornerWidth})`,
				bottom: 0,
				[Tw.scrollAreaThumbWidth]: `${S.width}px`
			}
		}
	}, j = Q("div", e, {
		ref: [t, i === "vertical" ? p : m],
		state: T,
		props: [A, s],
		stateAttributesMapping: lw
	}), M = C.useMemo(() => ({ orientation: i }), [i]);
	return k ? /*#__PURE__*/ (0, Y.jsx)(Cw.Provider, {
		value: M,
		children: j
	}) : null;
}), Dw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { thumbYRef: o, thumbXRef: s, handlePointerDown: c, handlePointerMove: l, handlePointerUp: u, setScrollingX: d, setScrollingY: f, scrollingX: p, scrollingY: m, hasMeasuredScrollbar: h } = iw(), { orientation: g } = ww(), _ = {
		scrolling: g === "horizontal" ? p : m,
		orientation: g
	};
	function v(e) {
		g === "vertical" && f(!1), g === "horizontal" && d(!1), u(e);
	}
	return Q("div", e, {
		ref: [t, g === "vertical" ? o : s],
		state: _,
		props: [{
			onPointerDown: c,
			onPointerMove: l,
			onPointerUp: v,
			onPointerCancel: v,
			style: {
				visibility: h ? void 0 : "hidden",
				...g === "vertical" && { height: `var(${Tw.scrollAreaThumbHeight})` },
				...g === "horizontal" && { width: `var(${Tw.scrollAreaThumbWidth})` }
			}
		}, a]
	});
}), Ow = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { cornerRef: o, cornerSize: s, hiddenState: c } = iw(), l = Q("div", e, {
		ref: [t, o],
		props: [{ style: {
			position: "absolute",
			bottom: 0,
			insetInlineEnd: 0,
			width: s.width,
			height: s.height
		} }, a]
	});
	return c.corner ? null : l;
});
//#endregion
//#region src/components/ui/scroll-area.tsx
function kw({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(mw, {
		"data-slot": "scroll-area",
		className: J("relative", e),
		...n,
		children: [
			/* @__PURE__ */ (0, Y.jsx)(bw, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Aw, {}),
			/* @__PURE__ */ (0, Y.jsx)(Ow, {})
		]
	});
}
function Aw({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ew, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": t,
		orientation: t,
		className: J("flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent", e),
		...n,
		children: /* @__PURE__ */ (0, Y.jsx)(Dw, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
//#endregion
//#region src/components/streamlit/scroll-area.tsx
function jw({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "min-w-0",
		"data-ssui-component": "scroll_area",
		"data-testid": "ssui-v2-scroll-area",
		children: [e.props.title === null ? null : /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "mb-2 text-sm font-medium",
			children: e.props.title
		}), /* @__PURE__ */ (0, Y.jsx)(kw, {
			className: "rounded-lg border",
			style: { height: e.props.height },
			children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "divide-y p-3 text-sm",
				children: e.props.items.map((e, t) => /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "py-2 first:pt-0 last:pb-0",
					children: e
				}, `${e}-${t}`))
			})
		})]
	});
}
//#endregion
//#region src/components/ui/skeleton.tsx
function Mw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "skeleton",
		className: J("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/skeleton.tsx
function Nw({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Mw, {
		"aria-hidden": "true",
		className: e.props.shape === "circle" ? "rounded-full" : void 0,
		"data-ssui-component": "skeleton",
		"data-testid": "ssui-v2-skeleton",
		style: {
			width: e.props.width,
			height: e.props.height
		}
	});
}
//#endregion
//#region src/components/ui/table.tsx
function Pw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, Y.jsx)("table", {
			"data-slot": "table",
			className: J("w-full caption-bottom text-sm", e),
			...t
		})
	});
}
function Fw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("thead", {
		"data-slot": "table-header",
		className: J("[&_tr]:border-b", e),
		...t
	});
}
function Iw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("tbody", {
		"data-slot": "table-body",
		className: J("[&_tr:last-child]:border-0", e),
		...t
	});
}
function Lw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("tr", {
		"data-slot": "table-row",
		className: J("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", e),
		...t
	});
}
function Rw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("th", {
		"data-slot": "table-head",
		className: J("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function zw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("td", {
		"data-slot": "table-cell",
		className: J("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function Bw({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("caption", {
		"data-slot": "table-caption",
		className: J("mt-4 text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/table.tsx
var Vw = {
	left: "text-left",
	center: "text-center",
	right: "text-right"
};
function Hw({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "overflow-auto rounded-lg border",
		"data-ssui-component": "table",
		"data-testid": "ssui-v2-table",
		style: { maxHeight: e.props.maxHeight === null ? void 0 : e.props.maxHeight },
		children: /* @__PURE__ */ (0, Y.jsxs)(Pw, { children: [
			e.props.caption === null ? null : /* @__PURE__ */ (0, Y.jsx)(Bw, { children: e.props.caption }),
			/* @__PURE__ */ (0, Y.jsx)(Fw, { children: /* @__PURE__ */ (0, Y.jsx)(Lw, { children: e.props.columns.map((e) => /* @__PURE__ */ (0, Y.jsx)(Rw, {
				className: Vw[e.align],
				scope: "col",
				children: e.label
			}, e.key)) }) }),
			/* @__PURE__ */ (0, Y.jsx)(Iw, { children: e.props.rows.map((t, n) => /* @__PURE__ */ (0, Y.jsx)(Lw, { children: e.props.columns.map((e, r) => /* @__PURE__ */ (0, Y.jsx)(zw, {
				className: Vw[e.align],
				children: t[r] === null ? "" : String(t[r])
			}, `${n}-${e.key}`)) }, n)) })
		] })
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
var Uw = /*#__PURE__*/ C.createContext(void 0);
function Ww() {
	let e = C.useContext(Uw);
	if (e === void 0) throw Error(la(64));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var Gw = /*#__PURE__*/ function(e) {
	return e.activationDirection = "data-activation-direction", e.orientation = "data-orientation", e;
}({}), Kw = { tabActivationDirection: (e) => ({ [Gw.activationDirection]: e }) }, qw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = C.useRef([]), [f, p] = C.useState(() => /* @__PURE__ */ new Map()), [m, h] = id({
		controlled: s,
		default: r,
		name: "Tabs",
		state: "value"
	}), g = s !== void 0, [_, v] = C.useState(() => /* @__PURE__ */ new Map()), y = C.useRef(void 0), b = C.useCallback((e) => {
		if (e === void 0) return null;
		for (let [t, n] of _.entries()) if (n != null && e === (n.value ?? n.index)) return t;
		return null;
	}, [_]), [x, S] = C.useState(() => ({
		previousValue: m,
		tabActivationDirection: "none"
	})), { previousValue: w, tabActivationDirection: T } = x, E = T, D = !1;
	w !== m && (E = Jw(w, m, a, _), D = w != null && m != null && b(m) == null);
	let O = D ? w : m, k = w !== O || T !== E;
	X(() => {
		k && S({
			previousValue: O,
			tabActivationDirection: E
		});
	}, [
		O,
		k,
		E
	]);
	let A = Z((e, t) => {
		t.activationDirection = Jw(m, e, a, _), i?.(e, t), !t.isCanceled && h(e);
	}), j = Z((e, t) => {
		i?.(e, hr(t, void 0, void 0, { activationDirection: "none" }));
	}), M = Z((e, t) => {
		p((n) => {
			if (n.get(e) === t) return n;
			let r = new Map(n);
			return r.set(e, t), r;
		});
	}), N = Z((e, t) => {
		p((n) => {
			if (!n.has(e) || n.get(e) !== t) return n;
			let r = new Map(n);
			return r.delete(e), r;
		});
	}), P = C.useCallback((e) => f.get(e), [f]), F = C.useCallback((e) => {
		for (let t of _.values()) if (e === t?.value) return t?.id;
	}, [_]), I = C.useMemo(() => ({
		getTabElementBySelectedValue: b,
		getTabIdByPanelValue: F,
		getTabPanelIdByValue: P,
		onValueChange: A,
		orientation: a,
		registerMountedTabPanel: M,
		setTabMap: v,
		unregisterMountedTabPanel: N,
		tabActivationDirection: E,
		value: m
	}), [
		b,
		F,
		P,
		A,
		a,
		M,
		v,
		N,
		E,
		m
	]), L = C.useMemo(() => {
		for (let e of _.values()) if (e != null && e.value === m) return e;
	}, [_, m]), R = C.useMemo(() => {
		for (let e of _.values()) if (e != null && !e.disabled) return e.value;
	}, [_]), z = C.useRef(!u), B = C.useRef(r), V = C.useRef(u), H = C.useRef(!1);
	X(() => {
		if (g) return;
		function e(e, t) {
			h(e), S((t) => t.previousValue === e && t.tabActivationDirection === "none" ? t : {
				previousValue: e,
				tabActivationDirection: "none"
			}), j(e, t), z.current = !1;
		}
		if (_.size === 0) {
			H.current && m !== null && !y.current?.isConnected && e(null, dr);
			return;
		}
		H.current = !0, y.current = _.keys().next().value;
		let t = L?.disabled, n = L == null && m !== null;
		if (!t && m === B.current && (V.current = !1), V.current && t && m === B.current) return;
		let r = z.current;
		if (t || n) {
			let n = R ?? null;
			if (m === n) {
				z.current = !1;
				return;
			}
			let i = dr;
			r ? i = fr : t && (i = ur), e(n, i);
			return;
		}
		r && L != null && (j(m, fr), z.current = !1);
	}, [
		R,
		g,
		j,
		L,
		h,
		_,
		m
	]);
	let U = Q("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: E
		},
		ref: t,
		props: l,
		stateAttributesMapping: Kw
	});
	return /*#__PURE__*/ (0, Y.jsx)(Uw.Provider, {
		value: I,
		children: /*#__PURE__*/ (0, Y.jsx)(sd, {
			elementsRef: d,
			children: U
		})
	});
});
function Jw(e, t, n, r) {
	if (e == null || t == null) return "none";
	let i = null, a = null;
	for (let [n, o] of r.entries()) {
		if (o == null) continue;
		let r = o.value ?? o.index;
		if (e === r && (i = n), t === r && (a = n), i != null && a != null) break;
	}
	if (i == null || a == null) return i !== a && (typeof e == "number" || typeof e == "string") && typeof e == typeof t ? n === "horizontal" ? t > e ? "right" : "left" : t > e ? "down" : "up" : "none";
	let o = i.getBoundingClientRect(), s = a.getBoundingClientRect();
	if (n === "horizontal") {
		if (s.left < o.left) return "left";
		if (s.left > o.left) return "right";
	} else {
		if (s.top < o.top) return "up";
		if (s.top > o.top) return "down";
	}
	return "none";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
var Yw = /*#__PURE__*/ C.createContext(void 0);
function Xw() {
	let e = C.useContext(Yw);
	if (e === void 0) throw Error(la(65));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
var Zw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, orientation: f, tabActivationDirection: p } = Ww(), { activateOnFocus: m, highlightedTabIndex: h, onTabActivation: g, registerTabResizeObserverElement: _, setHighlightedTabIndex: v, tabsListElement: y } = Xw(), b = zl(o), { compositeProps: x, compositeRef: S, index: w } = Mm({ metadata: C.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), T = a === u, E = C.useRef(!1), D = C.useRef(null);
	X(() => {
		let e = D.current;
		if (e) return _(e);
	}, [_]), X(() => {
		if (E.current) {
			E.current = !1;
			return;
		}
		if (!(T && w > -1 && h !== w)) return;
		let e = y;
		if (e != null) {
			let t = Pn(Zt(e));
			if (t && Fn(e, t)) return;
		}
		r || v(w);
	}, [
		T,
		w,
		h,
		v,
		r,
		y
	]);
	let { getButtonProps: O, buttonRef: k } = Fl({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), A = d(a), j = C.useRef(!1), M = C.useRef(!1);
	function N(e) {
		T || r || g(a, hr(Xn, e.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function P(e) {
		T || (w > -1 && !r && v(w), !r && m && (!j.current || j.current && M.current) && g(a, hr(Xn, e.nativeEvent, void 0, { activationDirection: "none" })));
	}
	function F(e) {
		if (T || r) return;
		j.current = !0;
		function t() {
			j.current = !1, M.current = !1;
		}
		(!e.button || e.button === 0) && (M.current = !0, Zt(e.currentTarget).addEventListener("pointerup", t, { once: !0 }));
	}
	return Q("button", e, {
		state: {
			disabled: r,
			active: T,
			orientation: f,
			tabActivationDirection: p
		},
		ref: [
			t,
			k,
			S,
			D
		],
		props: [
			x,
			{
				role: "tab",
				"aria-controls": A,
				"aria-selected": T,
				id: b,
				onClick: N,
				onFocus: P,
				onPointerDown: F,
				[yb]: T ? "" : void 0,
				onKeyDownCapture() {
					E.current = !0;
				}
			},
			l,
			O
		],
		stateAttributesMapping: Kw
	});
}), Qw = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { onValueChange: c, orientation: l, value: u, setTabMap: d, tabActivationDirection: f } = Ww(), [p, m] = C.useState(0), [h, g] = C.useState(null), _ = C.useRef(/* @__PURE__ */ new Set()), v = C.useRef(/* @__PURE__ */ new Set()), y = C.useRef(null);
	X(() => {
		if (typeof ResizeObserver > "u") return;
		let e = new ResizeObserver(() => {
			_.current.forEach((e) => {
				e();
			});
		});
		return y.current = e, h && e.observe(h), v.current.forEach((t) => {
			e.observe(t);
		}), () => {
			e.disconnect(), y.current = null;
		};
	}, [h]);
	let b = Z((e) => (_.current.add(e), () => {
		_.current.delete(e);
	})), x = Z((e) => (v.current.add(e), y.current?.observe(e), () => {
		v.current.delete(e), y.current?.unobserve(e);
	})), S = Z((e, t) => {
		e !== u && c(e, t);
	}), w = {
		orientation: l,
		tabActivationDirection: f
	}, T = {
		"aria-orientation": l === "vertical" ? "vertical" : void 0,
		role: "tablist"
	}, E = C.useMemo(() => ({
		activateOnFocus: n,
		highlightedTabIndex: p,
		registerIndicatorUpdateListener: b,
		registerTabResizeObserverElement: x,
		onTabActivation: S,
		setHighlightedTabIndex: m,
		tabsListElement: h
	}), [
		n,
		p,
		b,
		x,
		S,
		m,
		h
	]);
	return /*#__PURE__*/ (0, Y.jsx)(Yw.Provider, {
		value: E,
		children: /*#__PURE__*/ (0, Y.jsx)(Ab, {
			render: a,
			className: r,
			style: o,
			state: w,
			refs: [t, g],
			props: [T, s],
			stateAttributesMapping: Kw,
			highlightedIndex: p,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: l,
			onHighlightedIndexChange: m,
			onMapChange: d,
			disabledIndices: dn
		})
	});
});
//#endregion
//#region src/components/ui/tabs.tsx
function $w({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(qw, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: J("group/tabs flex gap-2 data-horizontal:flex-col", e),
		...n
	});
}
var eT = S("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function tT({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Qw, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: J(eT({ variant: t }), e),
		...n
	});
}
function nT({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Zw, {
		"data-slot": "tabs-trigger",
		className: J("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/tabs.tsx
function rT({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "tabs",
		"data-testid": "ssui-v2-tabs",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "sr-only",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)($w, {
			"aria-labelledby": n,
			onValueChange: (e) => {
				typeof e == "string" && r(e);
			},
			orientation: e.props.orientation,
			value: i.value,
			children: /* @__PURE__ */ (0, Y.jsx)(tT, {
				"aria-label": e.props.label,
				variant: e.props.variant,
				children: e.props.options.map((t) => /* @__PURE__ */ (0, Y.jsx)(nT, {
					disabled: e.props.disabled || t.disabled,
					value: t.value,
					children: t.label
				}, t.value))
			})
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle-group/ToggleGroupContext.mjs
var iT = /*#__PURE__*/ C.createContext(void 0);
function aT(e = !0) {
	let t = C.useContext(iT);
	if (t === void 0 && !e) throw Error(la(7));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle/Toggle.mjs
var oT = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, defaultPressed: r = !1, disabled: i = !1, form: a, onPressedChange: o, pressed: s, render: c, type: l, value: u, nativeButton: d = !0, style: f, ...p } = e, m = zl(u || void 0), h = aT(), g = h?.value ?? [], _ = h ? void 0 : r, v = (i || h?.disabled) ?? !1, [y, b] = id({
		controlled: h ? m !== void 0 && g.indexOf(m) > -1 : s,
		default: _,
		name: "Toggle",
		state: "pressed"
	}), { getButtonProps: x, buttonRef: S } = Fl({
		disabled: v,
		native: d
	}), w = {
		disabled: v,
		pressed: y
	}, T = [S, t], E = [
		{
			"aria-pressed": y,
			onClick(e) {
				let t = !y, n = hr(Xn, e.nativeEvent);
				o?.(t, n), !n.isCanceled && (m && h?.setGroupValue?.(m, t, n), !n.isCanceled && b(t));
			}
		},
		p,
		x
	], D = Q("button", e, {
		enabled: !h,
		state: w,
		ref: T,
		props: E
	}), O = C.useMemo(() => ({
		disabled: v,
		focusableWhenDisabled: !1
	}), [v]);
	return h ? /*#__PURE__*/ (0, Y.jsx)(Nm, {
		tag: "button",
		render: c,
		className: n,
		style: f,
		metadata: O,
		state: w,
		refs: T,
		props: E
	}) : D;
}), sT = /*#__PURE__*/ C.createContext(void 0);
function cT(e) {
	let t = C.useContext(sT);
	if (t === void 0 && !e) throw Error(la(68));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle-group/ToggleGroupDataAttributes.mjs
var lT = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.orientation = "data-orientation", e.multiple = "data-multiple", e;
}({}), uT = { multiple(e) {
	return e ? { [lT.multiple]: "" } : null;
} }, dT = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { defaultValue: n, disabled: r = !1, loopFocus: i = !0, onValueChange: a, orientation: o = "horizontal", multiple: s = !1, value: c, className: l, render: u, style: d, ...f } = e, p = nm(!0), m = cT(!0), h = C.useMemo(() => c !== void 0 || n !== void 0, [c, n]), g = (p?.disabled ?? !1) || (m?.disabled ?? !1) || r, [_, v] = id({
		controlled: c,
		default: c === void 0 ? n ?? dn : void 0,
		name: "ToggleGroup",
		state: "value"
	}), y = Z((e, t, n) => {
		let r;
		s ? (r = _.slice(), t ? r.push(e) : r.splice(_.indexOf(e), 1)) : r = t ? [e] : [], a?.(r, n), !n.isCanceled && v(r);
	}), b = {
		disabled: g,
		multiple: s,
		orientation: o
	}, x = C.useMemo(() => ({
		disabled: g,
		orientation: o,
		setGroupValue: y,
		value: _,
		isValueInitialized: h
	}), [
		g,
		o,
		y,
		_,
		h
	]), S = { role: "group" }, w = Q("div", e, {
		enabled: !!p,
		state: b,
		ref: t,
		props: [S, f],
		stateAttributesMapping: uT
	});
	return /*#__PURE__*/ (0, Y.jsx)(iT.Provider, {
		value: x,
		children: p ? w : /*#__PURE__*/ (0, Y.jsx)(Ab, {
			render: u,
			className: l,
			style: d,
			state: b,
			refs: [t],
			props: [S, f],
			stateAttributesMapping: uT,
			loopFocus: i,
			enableHomeAndEndKeys: !0,
			orientation: o
		})
	});
}), fT = S("group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-muted"
		},
		size: {
			default: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function pT({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(oT, {
		"data-slot": "toggle",
		className: J(fT({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/components/ui/toggle-group.tsx
var mT = C.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function hT({ className: e, variant: t, size: n, spacing: r = 2, orientation: i = "horizontal", children: a, ...o }) {
	return /* @__PURE__ */ (0, Y.jsx)(dT, {
		"data-slot": "toggle-group",
		"data-variant": t,
		"data-size": n,
		"data-spacing": r,
		"data-orientation": i,
		style: { "--gap": r },
		className: J("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch", e),
		...o,
		children: /* @__PURE__ */ (0, Y.jsx)(mT.Provider, {
			value: {
				variant: t,
				size: n,
				spacing: r,
				orientation: i
			},
			children: a
		})
	});
}
function gT({ className: e, children: t, variant: n = "default", size: r = "default", ...i }) {
	let a = C.useContext(mT);
	return /* @__PURE__ */ (0, Y.jsx)(oT, {
		"data-slot": "toggle-group-item",
		"data-variant": a.variant || n,
		"data-size": a.size || r,
		"data-spacing": a.spacing,
		className: J("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", fT({
			variant: a.variant || n,
			size: a.size || r
		}), e),
		...i,
		children: t
	});
}
//#endregion
//#region src/components/streamlit/toggle-group.tsx
function _T({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t);
	return /* @__PURE__ */ (0, Y.jsx)(hT, {
		"aria-label": e.props.label,
		"data-ssui-component": "toggle_group",
		"data-testid": "ssui-v2-toggle-group",
		disabled: e.props.disabled,
		multiple: e.props.multiple,
		onValueChange: n,
		orientation: e.props.orientation,
		size: e.props.size,
		value: r.value,
		variant: e.props.variant,
		children: e.props.options.map((e) => /* @__PURE__ */ (0, Y.jsx)(gT, {
			"aria-label": e.label,
			disabled: e.disabled,
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components/streamlit/toggle.tsx
var vT = {
	bold: ef,
	italic: lf,
	underline: uf
};
function yT({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = _f(e.state, t), i = e.props.icon === null ? null : vT[e.props.icon];
	return /* @__PURE__ */ (0, Y.jsxs)(pT, {
		"aria-label": e.props.label,
		"data-ssui-component": "toggle",
		"data-testid": "ssui-v2-toggle",
		disabled: e.props.disabled,
		onPressedChange: n,
		pressed: r.value,
		size: e.props.size,
		variant: e.props.variant,
		children: [i === null ? null : /* @__PURE__ */ (0, Y.jsx)(i, { "aria-hidden": "true" }), e.props.label]
	});
}
//#endregion
//#region src/app.tsx
function bT({ envelope: e, setStateValue: t, setTriggerValue: n }) {
	switch (e.kind) {
		case "elements": return /* @__PURE__ */ (0, Y.jsx)(eC, {
			envelope: e,
			setStateValue: t,
			setTriggerValue: n
		});
		case "select": return /* @__PURE__ */ (0, Y.jsx)(Qx, {
			envelope: e,
			setStateValue: t
		});
		case "dropdown_menu": return /* @__PURE__ */ (0, Y.jsx)(Xm, {
			envelope: e,
			setTriggerValue: n
		});
		case "checkbox": return /* @__PURE__ */ (0, Y.jsx)(Ap, {
			envelope: e,
			setStateValue: t
		});
		case "button": return /* @__PURE__ */ (0, Y.jsx)(Gf, {
			envelope: e,
			setTriggerValue: n
		});
		case "alert": return /* @__PURE__ */ (0, Y.jsx)(lt, { envelope: e });
		case "alert_dialog": return /* @__PURE__ */ (0, Y.jsx)(rd, {
			envelope: e,
			setTriggerValue: n
		});
		case "avatar": return /* @__PURE__ */ (0, Y.jsx)(Nf, { envelope: e });
		case "badge": return /* @__PURE__ */ (0, Y.jsx)(Lf, { envelope: e });
		case "breadcrumb": return /* @__PURE__ */ (0, Y.jsx)(Wf, {
			envelope: e,
			setTriggerValue: n
		});
		case "card": return /* @__PURE__ */ (0, Y.jsx)($f, { envelope: e });
		case "metric_card": return /* @__PURE__ */ (0, Y.jsx)(ep, { envelope: e });
		case "aspect_ratio": return /* @__PURE__ */ (0, Y.jsx)(xf, { envelope: e });
		case "progress": return /* @__PURE__ */ (0, Y.jsx)(gb, { envelope: e });
		case "separator": return /* @__PURE__ */ (0, Y.jsx)(eS, { envelope: e });
		case "skeleton": return /* @__PURE__ */ (0, Y.jsx)(Nw, { envelope: e });
		case "table": return /* @__PURE__ */ (0, Y.jsx)(Hw, { envelope: e });
		case "link_button": return /* @__PURE__ */ (0, Y.jsx)(Jy, { envelope: e });
		case "input": return /* @__PURE__ */ (0, Y.jsx)(qy, {
			envelope: e,
			setStateValue: t
		});
		case "textarea": return /* @__PURE__ */ (0, Y.jsx)(GS, {
			envelope: e,
			setStateValue: t
		});
		case "accordion": return /* @__PURE__ */ (0, Y.jsx)(yf, {
			envelope: e,
			setStateValue: t
		});
		case "collapsible": return /* @__PURE__ */ (0, Y.jsx)(Bp, {
			envelope: e,
			setStateValue: t
		});
		case "input_otp": return /* @__PURE__ */ (0, Y.jsx)(JC, {
			envelope: e,
			setStateValue: t
		});
		case "pagination": return /* @__PURE__ */ (0, Y.jsx)(tw, {
			envelope: e,
			setStateValue: t
		});
		case "radio_group": return /* @__PURE__ */ (0, Y.jsx)(Fb, {
			envelope: e,
			setStateValue: t
		});
		case "scroll_area": return /* @__PURE__ */ (0, Y.jsx)(jw, { envelope: e });
		case "slider": return /* @__PURE__ */ (0, Y.jsx)(FS, {
			envelope: e,
			setStateValue: t
		});
		case "switch": return /* @__PURE__ */ (0, Y.jsx)(US, {
			envelope: e,
			setStateValue: t
		});
		case "tabs": return /* @__PURE__ */ (0, Y.jsx)(rT, {
			envelope: e,
			setStateValue: t
		});
		case "toggle": return /* @__PURE__ */ (0, Y.jsx)(yT, {
			envelope: e,
			setStateValue: t
		});
		case "toggle_group": return /* @__PURE__ */ (0, Y.jsx)(_T, {
			envelope: e,
			setStateValue: t
		});
		case "calendar": return /* @__PURE__ */ (0, Y.jsx)(CC, {
			envelope: e,
			setStateValue: t
		});
		case "popover": return /* @__PURE__ */ (0, Y.jsx)(nw, { envelope: e });
		case "hover_card": return /* @__PURE__ */ (0, Y.jsx)(SC, { envelope: e });
		case "date_picker": return /* @__PURE__ */ (0, Y.jsx)(zy, {
			envelope: e,
			setStateValue: t
		});
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/csp-provider/CSPProvider.mjs
function xT(e) {
	let { children: t, nonce: n, disableStyleElements: r } = e, i = C.useMemo(() => ({
		nonce: n,
		disableStyleElements: r
	}), [n, r]);
	return /*#__PURE__*/ (0, Y.jsx)(Sx.Provider, {
		value: i,
		children: t
	});
}
//#endregion
//#region src/platform/error-boundary.tsx
var ST = 3, CT = /* @__PURE__ */ new Map();
function wT(e, t) {
	let n = e.message.split(":")[0]?.slice(0, 64), r = n && /^SSUI_V2_[A-Z0-9_]+$/.test(n) ? n : "SSUI_V2_RENDER_ERROR", i = CT.get(r) ?? 0;
	i >= ST || (CT.set(r, i + 1), console.error("SSUI_V2_RENDER_ERROR", {
		code: r,
		componentStack: t.componentStack?.slice(0, 2048)
	}));
}
var TT = class extends C.Component {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		wT(e, t);
	}
	componentDidUpdate(e) {
		e.resetKey !== this.props.resetKey && this.state.error && this.setState({ error: null });
	}
	render() {
		return this.state.error ? /* @__PURE__ */ (0, Y.jsx)("div", {
			"data-ssui-v2-error": !0,
			role: "alert",
			children: "Component unavailable (SSUI_V2_RENDER_ERROR)."
		}) : this.props.children;
	}
};
//#endregion
//#region src/platform/component-shell.tsx
function ET({ children: e, overlayRoot: t, parentElement: n, resetKey: r }) {
	return /* @__PURE__ */ (0, Y.jsx)(TT, {
		resetKey: r,
		children: /* @__PURE__ */ (0, Y.jsx)(xT, {
			disableStyleElements: !0,
			children: /* @__PURE__ */ (0, Y.jsx)(ku, {
				container: t,
				expectedRoot: n,
				children: e
			})
		})
	});
}
//#endregion
//#region src/platform/theme.ts
function DT(e) {
	let t = Number.parseFloat(e);
	return Number.isFinite(t) ? e.includes("%") ? t / 100 * 255 : t : null;
}
function OT(e) {
	let t = e.match(/rgba?\(\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)/), n = e.trim().match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i), r = null;
	if (t) r = [
		DT(t[1] ?? ""),
		DT(t[2] ?? ""),
		DT(t[3] ?? "")
	];
	else if (n) {
		let e = n[1] ?? "", t = e.length === 3 || e.length === 4 ? [...e].map((e) => e + e).join("") : e;
		r = [
			Number.parseInt(t.slice(0, 2), 16),
			Number.parseInt(t.slice(2, 4), 16),
			Number.parseInt(t.slice(4, 6), 16)
		];
	}
	if (!r) return null;
	let [i, a, o] = r;
	if (i === null || a === null || o === null) return null;
	let s = (e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * s(i) + .7152 * s(a) + .0722 * s(o);
}
function kT(e) {
	return e instanceof ShadowRoot ? e.host : e;
}
var AT = /* @__PURE__ */ new WeakMap(), jT = /* @__PURE__ */ new WeakMap();
function MT(e, t, n) {
	n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function NT(e) {
	let t = getComputedStyle(e), n = OT(t.getPropertyValue("--st-background-color").trim() || t.backgroundColor), r = n === null ? "light" : n < .18 ? "dark" : "light";
	e.dataset.ssuiV2Host = "", e.dataset.theme = r, e.style.colorScheme = r, e.dir = document.documentElement.dir || "ltr", e.lang = document.documentElement.lang || "en";
}
function PT(e) {
	let t = kT(e);
	AT.has(t) || AT.set(t, {
		colorScheme: t.style.getPropertyValue("color-scheme"),
		colorSchemePriority: t.style.getPropertyPriority("color-scheme"),
		dataSsuiV2Host: t.getAttribute("data-ssui-v2-host"),
		dataTheme: t.getAttribute("data-theme"),
		dir: t.getAttribute("dir"),
		lang: t.getAttribute("lang")
	}), NT(t);
	let n = jT.get(t);
	n !== void 0 && cancelAnimationFrame(n), jT.set(t, requestAnimationFrame(() => {
		jT.delete(t), AT.has(t) && t.isConnected && NT(t);
	}));
}
function FT(e) {
	let t = kT(e), n = jT.get(t);
	n !== void 0 && (cancelAnimationFrame(n), jT.delete(t));
	let r = AT.get(t);
	r && (MT(t, "data-ssui-v2-host", r.dataSsuiV2Host), MT(t, "data-theme", r.dataTheme), MT(t, "dir", r.dir), MT(t, "lang", r.lang), r.colorScheme ? t.style.setProperty("color-scheme", r.colorScheme, r.colorSchemePriority) : t.style.removeProperty("color-scheme"), AT.delete(t));
}
function IT(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function LT(e) {
	return typeof e == "string" && new TextEncoder().encode(e).byteLength <= 16384;
}
function RT(e) {
	return e === null || LT(e);
}
function zT(e) {
	if (!LT(e)) return !1;
	if (e.startsWith("/") || e.startsWith("#") || e.startsWith("?")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:" || t.protocol === "mailto:";
	} catch {
		return !1;
	}
}
function BT(e) {
	if (!LT(e)) return !1;
	if (e.startsWith("data:image/") || e.startsWith("/")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:";
	} catch {
		return !1;
	}
}
function VT(e) {
	return e === null || BT(e);
}
function HT(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function UT(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= 1e4 || typeof e == "string" && /^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$/.test(e);
}
function WT(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function GT(e, t) {
	return IT(e) && e.kind === t && WT(e.clientRevision) && WT(e.serverRevision);
}
function KT(e, t, n) {
	return !GT(e, t) || !n(e.value) ? null : {
		kind: t,
		value: e.value,
		clientRevision: e.clientRevision,
		serverRevision: e.serverRevision
	};
}
function qT(e) {
	let t = e.props, n = e.state;
	if (!IT(t) || !GT(n, "select") || !(n.value === null || LT(n.value)) || !LT(t.label) || !LT(t.placeholder) || typeof t.disabled != "boolean" || !Array.isArray(t.options) || t.options.length > 1e4) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.options) {
		if (!IT(e) || !LT(e.label) || !LT(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || i.has(e.value)) return null;
		i.add(e.value), r.push({
			label: e.label,
			value: e.value,
			...e.disabled === void 0 ? {} : { disabled: e.disabled }
		});
	}
	return n.value !== null && !i.has(n.value) ? null : {
		protocolVersion: 1,
		kind: "select",
		state: {
			kind: "select",
			value: n.value,
			clientRevision: n.clientRevision,
			serverRevision: n.serverRevision
		},
		props: {
			disabled: t.disabled,
			label: t.label,
			options: r,
			placeholder: t.placeholder
		}
	};
}
function JT(e) {
	let t = e.props;
	if (!IT(t) || !LT(t.label) || !(t.menuLabel === null || LT(t.menuLabel)) || typeof t.disabled != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!IT(e) || !LT(e.label) || !LT(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || e.variant !== void 0 && e.variant !== "default" && e.variant !== "destructive" || r.has(e.value)) return null;
		r.add(e.value), n.push({
			label: e.label,
			value: e.value,
			...e.disabled === void 0 ? {} : { disabled: e.disabled },
			...e.variant === void 0 ? {} : { variant: e.variant }
		});
	}
	return {
		protocolVersion: 1,
		kind: "dropdown_menu",
		props: {
			disabled: t.disabled,
			items: n,
			label: t.label,
			menuLabel: t.menuLabel
		}
	};
}
function YT(e) {
	let t = e.props, n = e.state;
	return !IT(t) || !GT(n, "checkbox") || typeof n.value != "boolean" || !LT(t.label) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "checkbox",
		state: {
			kind: "checkbox",
			value: n.value,
			clientRevision: n.clientRevision,
			serverRevision: n.serverRevision
		},
		props: {
			disabled: t.disabled,
			label: t.label
		}
	};
}
var XT = /* @__PURE__ */ new Set([
	"default",
	"destructive",
	"outline",
	"secondary",
	"ghost",
	"link"
]), ZT = /* @__PURE__ */ new Set([
	"default",
	"xs",
	"sm",
	"lg",
	"icon",
	"icon-xs",
	"icon-sm",
	"icon-lg"
]);
function QT(e) {
	let t = e.props;
	return !IT(t) || !LT(t.text) || typeof t.disabled != "boolean" || typeof t.variant != "string" || !XT.has(t.variant) || typeof t.size != "string" || !ZT.has(t.size) || t.stretch !== void 0 && typeof t.stretch != "boolean" ? null : {
		protocolVersion: 1,
		kind: "button",
		props: {
			disabled: t.disabled,
			text: t.text,
			variant: t.variant,
			size: t.size,
			...typeof t.stretch == "boolean" ? { stretch: t.stretch } : {}
		}
	};
}
var $T = /* @__PURE__ */ new Set(["default", "destructive"]), eE = /* @__PURE__ */ new Set([
	"sm",
	"default",
	"lg"
]), tE = /* @__PURE__ */ new Set([
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link"
]);
function nE(e) {
	let t = e.props;
	return !IT(t) || !LT(t.title) || !RT(t.description) || typeof t.variant != "string" || !$T.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "alert",
		props: {
			title: t.title,
			description: t.description,
			variant: t.variant
		}
	};
}
function rE(e) {
	let t = e.props;
	return !IT(t) || !VT(t.src) || !LT(t.fallback) || !LT(t.alt) || typeof t.size != "string" || !eE.has(t.size) ? null : {
		protocolVersion: 1,
		kind: "avatar",
		props: {
			src: t.src,
			fallback: t.fallback,
			alt: t.alt,
			size: t.size
		}
	};
}
function iE(e) {
	let t = e.props;
	if (!IT(t) || !Array.isArray(t.badges) || t.badges.length > 1e4) return null;
	let n = [];
	for (let e of t.badges) {
		if (!IT(e) || !LT(e.text) || typeof e.variant != "string" || !tE.has(e.variant)) return null;
		n.push({
			text: e.text,
			variant: e.variant
		});
	}
	return {
		protocolVersion: 1,
		kind: "badge",
		props: { badges: n }
	};
}
function aE(e) {
	let t = e.props;
	if (!IT(t) || !LT(t.label) || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = 0;
	for (let e of t.items) {
		if (!IT(e) || !LT(e.text) || !RT(e.href) || typeof e.current != "boolean") return null;
		r += +!!e.current, n.push({
			text: e.text,
			href: e.href,
			current: e.current
		});
	}
	return r > 1 ? null : {
		protocolVersion: 1,
		kind: "breadcrumb",
		props: {
			label: t.label,
			items: n
		}
	};
}
function oE(e) {
	return !IT(e) || !RT(e.title) || !RT(e.content) || !RT(e.description) || !RT(e.footer) || e.size !== "default" && e.size !== "sm" ? null : {
		title: e.title,
		content: e.content,
		description: e.description,
		footer: e.footer,
		size: e.size
	};
}
function sE(e) {
	let t = oE(e.props);
	return t ? {
		protocolVersion: 1,
		kind: "card",
		props: t
	} : null;
}
function cE(e) {
	let t = e.props, n = IT(t) && t.variant === void 0 ? "default" : IT(t) ? t.variant : void 0;
	return !IT(t) || !LT(t.label) || !LT(t.value) || !RT(t.description) || !RT(t.delta) || n !== "default" && n !== "dashboard" || t.size !== "default" && t.size !== "sm" ? null : {
		protocolVersion: 1,
		kind: "metric_card",
		props: {
			label: t.label,
			value: t.value,
			description: t.description,
			delta: t.delta,
			variant: n,
			size: t.size
		}
	};
}
function lE(e) {
	let t = e.props;
	return !IT(t) || !BT(t.src) || !LT(t.alt) || !HT(t.ratio) || t.ratio <= 0 || t.ratio > 100 ? null : {
		protocolVersion: 1,
		kind: "aspect_ratio",
		props: {
			src: t.src,
			alt: t.alt,
			ratio: t.ratio
		}
	};
}
function uE(e) {
	let t = e.props;
	return !IT(t) || !HT(t.value) || t.value < 0 || t.value > 100 || !RT(t.label) || typeof t.showValue != "boolean" ? null : {
		protocolVersion: 1,
		kind: "progress",
		props: {
			value: t.value,
			label: t.label,
			showValue: t.showValue
		}
	};
}
function dE(e) {
	let t = e.props;
	return !IT(t) || t.orientation !== "horizontal" && t.orientation !== "vertical" ? null : {
		protocolVersion: 1,
		kind: "separator",
		props: { orientation: t.orientation }
	};
}
function fE(e) {
	let t = e.props;
	return !IT(t) || t.shape !== "rectangle" && t.shape !== "circle" || !UT(t.width) || !UT(t.height) ? null : {
		protocolVersion: 1,
		kind: "skeleton",
		props: {
			shape: t.shape,
			width: t.width,
			height: t.height
		}
	};
}
function pE(e) {
	return e === null || typeof e == "string" || typeof e == "boolean" || HT(e);
}
function mE(e) {
	let t = e.props;
	if (!IT(t) || !Array.isArray(t.columns) || !Array.isArray(t.rows) || t.columns.length > 1e4 || t.rows.length > 1e4 || !RT(t.caption) || !(t.maxHeight === null || Number.isSafeInteger(t.maxHeight) && t.maxHeight >= 80 && t.maxHeight <= 1e4)) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.columns) {
		if (!IT(e) || !LT(e.key) || !LT(e.label) || e.align !== "left" && e.align !== "center" && e.align !== "right" || r.has(e.key)) return null;
		r.add(e.key), n.push({
			key: e.key,
			label: e.label,
			align: e.align
		});
	}
	let i = [];
	for (let e of t.rows) {
		if (!Array.isArray(e) || e.length !== n.length || e.some((e) => !pE(e))) return null;
		i.push([...e]);
	}
	return {
		protocolVersion: 1,
		kind: "table",
		props: {
			columns: n,
			rows: i,
			caption: t.caption,
			maxHeight: t.maxHeight
		}
	};
}
function hE(e) {
	let t = e.props;
	return !IT(t) || !LT(t.text) || !zT(t.url) || typeof t.variant != "string" || !XT.has(t.variant) || typeof t.size != "string" || !ZT.has(t.size) || typeof t.disabled != "boolean" || t.target !== "_blank" && t.target !== "_self" || t.stretch !== void 0 && typeof t.stretch != "boolean" ? null : {
		protocolVersion: 1,
		kind: "link_button",
		props: {
			text: t.text,
			url: t.url,
			variant: t.variant,
			size: t.size,
			disabled: t.disabled,
			target: t.target,
			...typeof t.stretch == "boolean" ? { stretch: t.stretch } : {}
		}
	};
}
var gE = /* @__PURE__ */ new Set([
	"text",
	"email",
	"password",
	"search",
	"tel",
	"url"
]);
function _E(e) {
	return e === null || Number.isSafeInteger(e) && e >= 1 && e <= 16384;
}
function vE(e) {
	if (!Array.isArray(e) || e.length > 1e4) return null;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (!IT(r) || !LT(r.label) || !LT(r.value) || typeof r.disabled != "boolean" || n.has(r.value)) return null;
		n.add(r.value), t.push({
			label: r.label,
			value: r.value,
			disabled: r.disabled
		});
	}
	return t;
}
function yE(e) {
	return Array.isArray(e) && e.length <= 1e4 && e.every((e) => LT(e));
}
function bE(e) {
	return new Set(e).size === e.length;
}
function xE(e) {
	if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e)) return !1;
	let t = Number(e.slice(0, 4)), n = Number(e.slice(5, 7)), r = Number(e.slice(8, 10)), i = /* @__PURE__ */ new Date(0);
	return i.setUTCHours(0, 0, 0, 0), i.setUTCFullYear(t, n - 1, r), i.getUTCFullYear() === t && i.getUTCMonth() === n - 1 && i.getUTCDate() === r;
}
function SE(e) {
	return e === null || xE(e);
}
function CE(e) {
	let t = e.props, n = KT(e.state, "input", LT);
	return !n || !IT(t) || !LT(t.label) || !LT(t.placeholder) || typeof t.type != "string" || !gE.has(t.type) || typeof t.disabled != "boolean" || !_E(t.maxLength) || t.maxLength !== null && n.value.length > t.maxLength ? null : {
		protocolVersion: 1,
		kind: "input",
		state: n,
		props: {
			label: t.label,
			placeholder: t.placeholder,
			type: t.type,
			disabled: t.disabled,
			maxLength: t.maxLength
		}
	};
}
function wE(e) {
	let t = e.props, n = KT(e.state, "textarea", LT);
	return !n || !IT(t) || !LT(t.label) || !LT(t.placeholder) || typeof t.disabled != "boolean" || !Number.isSafeInteger(t.rows) || t.rows < 2 || t.rows > 20 || !_E(t.maxLength) || t.maxLength !== null && n.value.length > t.maxLength ? null : {
		protocolVersion: 1,
		kind: "textarea",
		state: n,
		props: {
			label: t.label,
			placeholder: t.placeholder,
			disabled: t.disabled,
			rows: t.rows,
			maxLength: t.maxLength
		}
	};
}
function TE(e) {
	let t = e.props, n = KT(e.state, "accordion", yE);
	if (!n || !IT(t) || !LT(t.label) || typeof t.disabled != "boolean" || typeof t.multiple != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4 || !bE(n.value) || !t.multiple && n.value.length > 1) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!IT(e) || !LT(e.label) || !LT(e.content) || !LT(e.value) || typeof e.disabled != "boolean" || i.has(e.value)) return null;
		i.add(e.value), r.push({
			label: e.label,
			content: e.content,
			value: e.value,
			disabled: e.disabled
		});
	}
	return n.value.some((e) => !i.has(e)) ? null : {
		protocolVersion: 1,
		kind: "accordion",
		state: n,
		props: {
			label: t.label,
			disabled: t.disabled,
			multiple: t.multiple,
			items: r
		}
	};
}
function EE(e) {
	let t = e.props, n = KT(e.state, "collapsible", (e) => typeof e == "boolean");
	return !n || !IT(t) || !LT(t.title) || !RT(t.firstItem) || !yE(t.items) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "collapsible",
		state: n,
		props: {
			title: t.title,
			firstItem: t.firstItem,
			items: [...t.items],
			disabled: t.disabled
		}
	};
}
function DE(e) {
	let t = e.props, n = KT(e.state, "input_otp", LT);
	return !n || !IT(t) || !LT(t.label) || !Number.isSafeInteger(t.maxLength) || t.maxLength < 1 || t.maxLength > 12 || t.pattern !== "digits" && t.pattern !== "alphanumeric" || typeof t.disabled != "boolean" || n.value.length > t.maxLength || (t.pattern === "digits" ? !/^\d*$/.test(n.value) : !/^[a-z0-9]*$/i.test(n.value)) ? null : {
		protocolVersion: 1,
		kind: "input_otp",
		state: n,
		props: {
			label: t.label,
			maxLength: t.maxLength,
			pattern: t.pattern,
			disabled: t.disabled
		}
	};
}
function OE(e) {
	let t = e.props, n = KT(e.state, "pagination", (e) => Number.isSafeInteger(e));
	return !n || !IT(t) || !LT(t.label) || !Number.isSafeInteger(t.totalPages) || t.totalPages < 1 || t.totalPages > 1e4 || !Number.isSafeInteger(t.siblingCount) || t.siblingCount < 0 || t.siblingCount > 10 || typeof t.disabled != "boolean" || n.value < 1 || n.value > t.totalPages ? null : {
		protocolVersion: 1,
		kind: "pagination",
		state: n,
		props: {
			label: t.label,
			totalPages: t.totalPages,
			siblingCount: t.siblingCount,
			disabled: t.disabled
		}
	};
}
function kE(e) {
	let t = e.props, n = KT(e.state, "radio_group", RT);
	if (!n || !IT(t) || !LT(t.label) || typeof t.disabled != "boolean") return null;
	let r = vE(t.options);
	return !r || n.value !== null && !r.some((e) => e.value === n.value) ? null : {
		protocolVersion: 1,
		kind: "radio_group",
		state: n,
		props: {
			label: t.label,
			options: r,
			disabled: t.disabled
		}
	};
}
function AE(e) {
	let t = e.props;
	return !IT(t) || !RT(t.title) || !yE(t.items) || !Number.isSafeInteger(t.height) || t.height < 80 || t.height > 1e4 ? null : {
		protocolVersion: 1,
		kind: "scroll_area",
		props: {
			title: t.title,
			items: [...t.items],
			height: t.height
		}
	};
}
function jE(e) {
	let t = e.props, n = KT(e.state, "slider", (e) => Array.isArray(e) && e.every((e) => HT(e)));
	if (!n || !IT(t) || !LT(t.label) || !HT(t.min) || !HT(t.max) || t.max <= t.min || !HT(t.step) || t.step <= 0 || t.step > t.max - t.min || typeof t.disabled != "boolean" || n.value.length !== 1 && n.value.length !== 2) return null;
	let r = t.min, i = t.max;
	return n.value.some((e) => e < r || e > i) || n.value.length === 2 && n.value[0] > n.value[1] ? null : {
		protocolVersion: 1,
		kind: "slider",
		state: n,
		props: {
			label: t.label,
			min: r,
			max: i,
			step: t.step,
			disabled: t.disabled
		}
	};
}
function ME(e) {
	let t = e.props, n = KT(e.state, "switch", (e) => typeof e == "boolean");
	return !n || !IT(t) || !LT(t.label) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "switch",
		state: n,
		props: {
			label: t.label,
			disabled: t.disabled
		}
	};
}
function NE(e) {
	let t = e.props, n = KT(e.state, "tabs", LT);
	if (!n || !IT(t) || !LT(t.label) || t.orientation !== "horizontal" && t.orientation !== "vertical" || t.variant !== "default" && t.variant !== "line" || typeof t.disabled != "boolean") return null;
	let r = vE(t.options);
	return !r || r.length === 0 || !r.some((e) => e.value === n.value) ? null : {
		protocolVersion: 1,
		kind: "tabs",
		state: n,
		props: {
			label: t.label,
			options: r,
			orientation: t.orientation,
			variant: t.variant,
			disabled: t.disabled
		}
	};
}
function PE(e) {
	let t = e.props, n = KT(e.state, "toggle", (e) => typeof e == "boolean");
	return !n || !IT(t) || !LT(t.label) || t.icon !== null && t.icon !== "bold" && t.icon !== "italic" && t.icon !== "underline" || t.variant !== "default" && t.variant !== "outline" || t.size !== "default" && t.size !== "sm" && t.size !== "lg" || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "toggle",
		state: n,
		props: {
			label: t.label,
			icon: t.icon,
			variant: t.variant,
			size: t.size,
			disabled: t.disabled
		}
	};
}
function FE(e) {
	let t = e.props, n = KT(e.state, "toggle_group", yE);
	if (!n || !IT(t) || !LT(t.label) || typeof t.multiple != "boolean" || t.orientation !== "horizontal" && t.orientation !== "vertical" || t.variant !== "default" && t.variant !== "outline" || t.size !== "default" && t.size !== "sm" && t.size !== "lg" || typeof t.disabled != "boolean" || !bE(n.value) || !t.multiple && n.value.length > 1) return null;
	let r = vE(t.options);
	return !r || r.length === 0 || n.value.some((e) => !r.some((t) => t.value === e)) ? null : {
		protocolVersion: 1,
		kind: "toggle_group",
		state: n,
		props: {
			label: t.label,
			options: r,
			multiple: t.multiple,
			orientation: t.orientation,
			variant: t.variant,
			size: t.size,
			disabled: t.disabled
		}
	};
}
function IE(e) {
	let t = e.props, n = KT(e.state, "calendar", SE);
	return !n || !IT(t) || !LT(t.label) || !SE(t.minDate) || !SE(t.maxDate) || typeof t.disabled != "boolean" || t.minDate !== null && t.maxDate !== null && t.minDate > t.maxDate || n.value !== null && (t.minDate !== null && n.value < t.minDate || t.maxDate !== null && n.value > t.maxDate) ? null : {
		protocolVersion: 1,
		kind: "calendar",
		state: n,
		props: {
			label: t.label,
			minDate: t.minDate,
			maxDate: t.maxDate,
			disabled: t.disabled
		}
	};
}
function LE(e) {
	let t = e.props;
	return !IT(t) || !LT(t.label) || !RT(t.content) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "popover",
		props: {
			label: t.label,
			content: t.content,
			disabled: t.disabled
		}
	};
}
function RE(e) {
	let t = e.props;
	return !IT(t) || !LT(t.label) || !LT(t.content) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "hover_card",
		props: {
			label: t.label,
			content: t.content,
			disabled: t.disabled
		}
	};
}
function zE(e) {
	let t = e.props;
	return !IT(t) || typeof t.show != "boolean" || !WT(t.openRequestId) || !WT(t.resolvedRequestId) || t.resolvedRequestId > t.openRequestId || !LT(t.title) || !LT(t.description) || !LT(t.confirmLabel) || !LT(t.cancelLabel) ? null : {
		protocolVersion: 1,
		kind: "alert_dialog",
		props: {
			show: t.show,
			openRequestId: t.openRequestId,
			resolvedRequestId: t.resolvedRequestId,
			title: t.title,
			description: t.description,
			confirmLabel: t.confirmLabel,
			cancelLabel: t.cancelLabel
		}
	};
}
function BE(e) {
	return e === null || xE(e) || Array.isArray(e) && e.length === 2 && xE(e[0]) && xE(e[1]);
}
function VE(e, t, n) {
	return (t === null || e >= t) && (n === null || e <= n);
}
function HE(e) {
	let t = e.props, n = KT(e.state, "date_picker", BE);
	if (!n || !IT(t) || !RT(t.label) || t.mode !== "single" && t.mode !== "range" || !LT(t.placeholder) || !SE(t.minDate) || !SE(t.maxDate) || typeof t.disabled != "boolean" || t.minDate !== null && t.maxDate !== null && t.minDate > t.maxDate || t.mode === "single" && Array.isArray(n.value) || t.mode === "range" && n.value !== null && !Array.isArray(n.value)) return null;
	let r = t.minDate, i = t.maxDate, a = n.value === null ? [] : typeof n.value == "string" ? [n.value] : [...n.value];
	return a.some((e) => !VE(e, r, i)) || a.length === 2 && a[0] > a[1] ? null : {
		protocolVersion: 1,
		kind: "date_picker",
		state: n,
		props: {
			label: t.label,
			mode: t.mode,
			placeholder: t.placeholder,
			minDate: r,
			maxDate: i,
			disabled: t.disabled
		}
	};
}
var UE = /* @__PURE__ */ new Set([
	"none",
	"xs",
	"sm",
	"md",
	"lg",
	"xl"
]), WE = /* @__PURE__ */ new Set([
	"select",
	"checkbox",
	"input",
	"textarea",
	"radio_group",
	"slider",
	"switch"
]), GE = /* @__PURE__ */ new Set([
	...WE,
	"button",
	"badge",
	"progress",
	"separator",
	"aspect_ratio",
	"link_button"
]);
function KE(e) {
	return typeof e == "string" && /^[A-Za-z0-9][A-Za-z0-9_.\/-]{0,511}$/.test(e);
}
function qE(e) {
	return GE.has(e.kind);
}
function JE(e) {
	switch (e.kind) {
		case "select":
		case "checkbox":
		case "input":
		case "textarea":
		case "radio_group":
		case "slider":
		case "switch": return e.state;
		default: return null;
	}
}
function YE(e, t, n, r) {
	if (n > 32 || t.count >= 1e3 || !IT(e) || !KE(e.id) || t.seenIds.has(e.id) || typeof e.type != "string" || !IT(e.props) || !Array.isArray(e.children) || e.children.length > 1e3) return null;
	t.count += 1, t.seenIds.add(e.id);
	let i = e.id, a = e.type, o = e.props;
	if (a === "text") return e.children.length !== 0 || !LT(o.text) || o.variant !== "body" && o.variant !== "muted" && o.variant !== "label" && o.variant !== "caption" ? null : {
		id: i,
		type: a,
		props: {
			text: o.text,
			variant: o.variant
		},
		children: [],
		envelope: null
	};
	if (a === "heading") return e.children.length !== 0 || !LT(o.text) || o.level !== 2 && o.level !== 3 && o.level !== 4 ? null : {
		id: i,
		type: a,
		props: {
			text: o.text,
			level: o.level
		},
		children: [],
		envelope: null
	};
	if (a === "code") return e.children.length !== 0 || !LT(o.text) || !LT(o.language) ? null : {
		id: i,
		type: a,
		props: {
			text: o.text,
			language: o.language
		},
		children: [],
		envelope: null
	};
	if (GE.has(a)) {
		if (e.children.length !== 0) return null;
		let n = {
			protocolVersion: 1,
			kind: a,
			props: o
		}, r = null;
		if (WE.has(a)) {
			let e = t.rawStates[i];
			if (!IT(e) || e.kind !== a || !WT(e.clientRevision) || !WT(e.serverRevision) || !WT(e.changeSequence)) return null;
			r = e.changeSequence, n.state = {
				kind: e.kind,
				value: e.value,
				clientRevision: e.clientRevision,
				serverRevision: e.serverRevision
			};
		}
		let s = ZE(n);
		if (!s || s.kind === "elements" || !qE(s)) return null;
		let c = JE(s);
		return c !== null && (t.normalizedStates[i] = {
			kind: c.kind,
			value: c.value,
			clientRevision: c.clientRevision,
			serverRevision: c.serverRevision,
			changeSequence: r
		}), {
			id: i,
			type: "leaf",
			props: {},
			children: [],
			envelope: s
		};
	}
	let s = [];
	for (let r of e.children) {
		let e = YE(r, t, n + 1, a);
		if (!e) return null;
		s.push(e);
	}
	if (a === "stack") return o.direction !== "vertical" && o.direction !== "horizontal" || typeof o.gap != "string" || !UE.has(o.gap) || o.align !== "start" && o.align !== "center" && o.align !== "end" && o.align !== "stretch" || o.justify !== "start" && o.justify !== "center" && o.justify !== "end" && o.justify !== "between" || typeof o.wrap != "boolean" ? null : {
		id: i,
		type: a,
		props: {
			direction: o.direction,
			gap: o.gap,
			align: o.align,
			justify: o.justify,
			wrap: o.wrap
		},
		children: s,
		envelope: null
	};
	if (a === "grid") return !Number.isSafeInteger(o.columns) || o.columns < 1 || o.columns > 6 || typeof o.gap != "string" || !UE.has(o.gap) || !(o.minColumnWidth === null || Number.isSafeInteger(o.minColumnWidth) && o.minColumnWidth >= 160 && o.minColumnWidth <= 1200) ? null : {
		id: i,
		type: a,
		props: {
			columns: o.columns,
			gap: o.gap,
			minColumnWidth: o.minColumnWidth
		},
		children: s,
		envelope: null
	};
	if (a === "card") {
		let e = s.map((e) => e.type);
		return o.size !== "default" && o.size !== "sm" || s.some((e) => e.type !== "card_header" && e.type !== "card_content" && e.type !== "card_footer") || new Set(e).size !== e.length ? null : {
			id: i,
			type: a,
			props: { size: o.size },
			children: s,
			envelope: null
		};
	}
	return a === "card_header" || a === "card_content" || a === "card_footer" ? r !== "card" || Object.keys(o).length !== 0 ? null : {
		id: i,
		type: a,
		props: {},
		children: s,
		envelope: null
	} : null;
}
function XE(e) {
	let t = e.props, n = e.state;
	if (!IT(t) || !Array.isArray(t.nodes) || t.nodes.length > 1e3 || !GT(n, "elements") || !IT(n.value) || !IT(n.value.nodes) || !WT(n.value.sequence)) return null;
	let r = n.value, i = {
		count: 0,
		normalizedStates: {},
		rawStates: r.nodes,
		seenIds: /* @__PURE__ */ new Set()
	}, a = [];
	for (let e of t.nodes) {
		let t = YE(e, i, 1, null);
		if (!t) return null;
		a.push(t);
	}
	return Object.keys(i.normalizedStates).length !== Object.keys(i.rawStates).length || Object.values(i.normalizedStates).some((e) => e.changeSequence > r.sequence) ? null : {
		protocolVersion: 1,
		kind: "elements",
		state: {
			kind: "elements",
			value: {
				nodes: i.normalizedStates,
				sequence: r.sequence
			},
			clientRevision: n.clientRevision,
			serverRevision: n.serverRevision
		},
		props: { nodes: a }
	};
}
function ZE(e) {
	switch (e.kind) {
		case "elements": return XE(e);
		case "select": return qT(e);
		case "dropdown_menu": return JT(e);
		case "checkbox": return YT(e);
		case "button": return QT(e);
		case "alert": return nE(e);
		case "alert_dialog": return zE(e);
		case "avatar": return rE(e);
		case "badge": return iE(e);
		case "breadcrumb": return aE(e);
		case "card": return sE(e);
		case "metric_card": return cE(e);
		case "aspect_ratio": return lE(e);
		case "progress": return uE(e);
		case "separator": return dE(e);
		case "skeleton": return fE(e);
		case "table": return mE(e);
		case "link_button": return hE(e);
		case "input": return CE(e);
		case "textarea": return wE(e);
		case "accordion": return TE(e);
		case "collapsible": return EE(e);
		case "input_otp": return DE(e);
		case "pagination": return OE(e);
		case "radio_group": return kE(e);
		case "scroll_area": return AE(e);
		case "slider": return jE(e);
		case "switch": return ME(e);
		case "tabs": return NE(e);
		case "toggle": return PE(e);
		case "toggle_group": return FE(e);
		case "calendar": return IE(e);
		case "popover": return LE(e);
		case "hover_card": return RE(e);
		case "date_picker": return HE(e);
		default: return null;
	}
}
function QE(e) {
	let t = IT(e) && typeof e.kind == "string" ? e.kind : "unknown", n = IT(e) && (typeof e.protocolVersion == "string" || typeof e.protocolVersion == "number") ? String(e.protocolVersion) : "unknown", r = Infinity;
	try {
		r = new TextEncoder().encode(JSON.stringify(e)).byteLength;
	} catch {}
	if (r > 2097152 || !IT(e) || e.protocolVersion !== 1) return {
		ok: !1,
		failure: {
			code: r > 2097152 ? "SSUI_V2_ENVELOPE_TOO_LARGE" : "SSUI_V2_PROTOCOL_VERSION",
			kind: t,
			protocolVersion: n
		}
	};
	let i = ZE(e);
	return i ? {
		ok: !0,
		envelope: i
	} : {
		ok: !1,
		failure: {
			code: "SSUI_V2_MALFORMED_ENVELOPE",
			kind: t,
			protocolVersion: n
		}
	};
}
//#endregion
//#region src/entry.tsx
var $E = /* @__PURE__ */ new WeakMap();
function eD(e, t, n) {
	let r = e.querySelector(t);
	if (!(r instanceof HTMLElement)) throw Error(`${n}: required component root is missing.`);
	return r;
}
function tD(e, t) {
	let n = eD(e, "[data-ssui-v2-app-root]", "SSUI_V2_APP_ROOT_MISSING"), r = eD(e, "[data-ssui-v2-overlay-root]", "SSUI_V2_OVERLAY_ROOT_MISSING");
	if (n.getRootNode() !== e || r.getRootNode() !== e) throw Error("SSUI_V2_ROOT_OWNERSHIP: component roots escaped parentElement.");
	let i = `ssui-${t.replace(/[^a-zA-Z0-9_-]/g, "-")}-`;
	return {
		appRoot: n,
		overlayRoot: r,
		reactRoot: (0, _.createRoot)(n, { identifierPrefix: i })
	};
}
function nD({ failure: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		"data-ssui-v2-error": !0,
		role: "alert",
		children: [
			"Component unavailable (",
			e.code,
			"; kind=",
			e.kind,
			"; protocol=",
			e.protocolVersion,
			")."
		]
	});
}
var rD = (e) => {
	let { parentElement: t } = e, n = $E.get(t);
	n || (n = tD(t, e.key), $E.set(t, n)), PT(t);
	let r = QE(e.data), i = r.ok ? `${r.envelope.kind}:${r.envelope.protocolVersion}` : `${r.failure.code}:${r.failure.kind}:${r.failure.protocolVersion}`;
	return n.reactRoot.render(/* @__PURE__ */ (0, Y.jsx)(ET, {
		overlayRoot: n.overlayRoot,
		parentElement: t,
		resetKey: i,
		children: r.ok ? /* @__PURE__ */ (0, Y.jsx)(bT, {
			envelope: r.envelope,
			setStateValue: e.setStateValue,
			setTriggerValue: e.setTriggerValue
		}) : /* @__PURE__ */ (0, Y.jsx)(nD, { failure: r.failure })
	})), () => {
		let e = $E.get(t);
		e && (e.reactRoot.unmount(), e.overlayRoot.replaceChildren(), FT(t), $E.delete(t));
	};
};
//#endregion
export { rD as default };
