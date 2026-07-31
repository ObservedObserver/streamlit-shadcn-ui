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
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Hd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Hd(t), e = Ud(t, e);
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
		var t = W.current, n = Ud(t, e.type);
		t !== n && (U(G, e), U(W, n));
	}
	function ae(e) {
		G.current === e && (H(W), H(G)), te.current === e && (H(te), $f._currentValue = R);
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
		return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e;
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
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ff(e); e !== null;) {
					if (n = e[Ze]) return n;
					e = ff(e);
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
	function X(e) {
		return pe.call(ht, e) ? !0 : pe.call(mt, e) ? !1 : pt.test(e) ? ht[e] = !0 : (mt[e] = !0, !1);
	}
	function gt(e, t, n) {
		if (X(t)) if (n === null) e.removeAttribute(t);
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
	function _t(e, t, n) {
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
	function Z(e, t, n, r) {
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
	function vt(e) {
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
	function yt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function bt(e, t, n) {
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
	function xt(e) {
		if (!e._valueTracker) {
			var t = yt(e) ? "checked" : "value";
			e._valueTracker = bt(e, t, "" + e[t]);
		}
	}
	function St(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = yt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Ct(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var wt = /[\n"\\]/g;
	function Tt(e) {
		return e.replace(wt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Et(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + vt(t)) : e.value !== "" + vt(t) && (e.value = "" + vt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ot(e, o, vt(n)) : Ot(e, o, vt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + vt(s) : e.removeAttribute("name");
	}
	function Dt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				xt(e);
				return;
			}
			n = n == null ? "" : "" + vt(n), t = t == null ? n : "" + vt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), xt(e);
	}
	function Ot(e, t, n) {
		t === "number" && Ct(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function kt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + vt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function At(e, t, n) {
		if (t != null && (t = "" + vt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + vt(n);
	}
	function jt(e, t, n, r) {
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
		n = vt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), xt(e);
	}
	function Mt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Nt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Pt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Nt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Ft(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Pt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Pt(e, o, t[o]);
	}
	function It(e) {
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
	var Lt = /* @__PURE__ */ new Map([
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
	]), Rt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function zt(e) {
		return Rt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Bt() {}
	var Vt = null;
	function Ht(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Ut = null, Wt = null;
	function Gt(e) {
		var t = at(e);
		if (t && (e = t.stateNode)) {
			var n = e[Qe] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Et(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Tt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Qe] || null;
								if (!a) throw Error(i(90));
								Et(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && St(r);
					}
					break a;
				case "textarea":
					At(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && kt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Kt = !1;
	function qt(e, t, n) {
		if (Kt) return e(t, n);
		Kt = !0;
		try {
			return e(t);
		} finally {
			if (Kt = !1, (Ut !== null || Wt !== null) && (yu(), Ut && (t = Ut, e = Wt, Wt = Ut = null, Gt(t), e))) for (t = 0; t < e.length; t++) Gt(e[t]);
		}
	}
	function Jt(e, t) {
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
	var Yt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Xt = !1;
	if (Yt) try {
		var Zt = {};
		Object.defineProperty(Zt, "passive", { get: function() {
			Xt = !0;
		} }), window.addEventListener("test", Zt, Zt), window.removeEventListener("test", Zt, Zt);
	} catch {
		Xt = !1;
	}
	var Qt = null, $t = null, en = null;
	function tn() {
		if (en) return en;
		var e, t = $t, n = t.length, r, i = "value" in Qt ? Qt.value : Qt.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return en = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function nn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function rn() {
		return !0;
	}
	function an() {
		return !1;
	}
	function on(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? rn : an, this.isPropagationStopped = an, this;
		}
		return m(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = rn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = rn);
			},
			persist: function() {},
			isPersistent: rn
		}), t;
	}
	var sn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, cn = on(sn), ln = m({}, sn, {
		view: 0,
		detail: 0
	}), un = on(ln), dn, fn, pn, mn = m({}, ln, {
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
		getModifierState: Tn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== pn && (pn && e.type === "mousemove" ? (dn = e.screenX - pn.screenX, fn = e.screenY - pn.screenY) : fn = dn = 0, pn = e), dn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : fn;
		}
	}), hn = on(mn), gn = on(m({}, mn, { dataTransfer: 0 })), _n = on(m({}, ln, { relatedTarget: 0 })), vn = on(m({}, sn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), yn = on(m({}, sn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), bn = on(m({}, sn, { data: 0 })), xn = {
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
	}, Sn = {
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
	}, Cn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function wn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Cn[e]) ? !!t[e] : !1;
	}
	function Tn() {
		return wn;
	}
	var En = on(m({}, ln, {
		key: function(e) {
			if (e.key) {
				var t = xn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = nn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Tn,
		charCode: function(e) {
			return e.type === "keypress" ? nn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? nn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Dn = on(m({}, mn, {
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
	})), On = on(m({}, ln, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Tn
	})), kn = on(m({}, sn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), An = on(m({}, mn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), jn = on(m({}, sn, {
		newState: 0,
		oldState: 0
	})), Mn = [
		9,
		13,
		27,
		32
	], Nn = Yt && "CompositionEvent" in window, Pn = null;
	Yt && "documentMode" in document && (Pn = document.documentMode);
	var Fn = Yt && "TextEvent" in window && !Pn, In = Yt && (!Nn || Pn && 8 < Pn && 11 >= Pn), Ln = " ", Rn = !1;
	function zn(e, t) {
		switch (e) {
			case "keyup": return Mn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Bn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Vn = !1;
	function Hn(e, t) {
		switch (e) {
			case "compositionend": return Bn(t);
			case "keypress": return t.which === 32 ? (Rn = !0, Ln) : null;
			case "textInput": return e = t.data, e === Ln && Rn ? null : e;
			default: return null;
		}
	}
	function Un(e, t) {
		if (Vn) return e === "compositionend" || !Nn && zn(e, t) ? (e = tn(), en = $t = Qt = null, Vn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return In && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Wn = {
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
	function Gn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Wn[e.type] : t === "textarea";
	}
	function Kn(e, t, n, r) {
		Ut ? Wt ? Wt.push(r) : Wt = [r] : Ut = r, t = Ed(t, "onChange"), 0 < t.length && (n = new cn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var qn = null, Jn = null;
	function Yn(e) {
		vd(e, 0);
	}
	function Xn(e) {
		if (St(ot(e))) return e;
	}
	function Zn(e, t) {
		if (e === "change") return t;
	}
	var Qn = !1;
	if (Yt) {
		var $n;
		if (Yt) {
			var er = "oninput" in document;
			if (!er) {
				var tr = document.createElement("div");
				tr.setAttribute("oninput", "return;"), er = typeof tr.oninput == "function";
			}
			$n = er;
		} else $n = !1;
		Qn = $n && (!document.documentMode || 9 < document.documentMode);
	}
	function nr() {
		qn && (qn.detachEvent("onpropertychange", rr), Jn = qn = null);
	}
	function rr(e) {
		if (e.propertyName === "value" && Xn(Jn)) {
			var t = [];
			Kn(t, Jn, e, Ht(e)), qt(Yn, t);
		}
	}
	function ir(e, t, n) {
		e === "focusin" ? (nr(), qn = t, Jn = n, qn.attachEvent("onpropertychange", rr)) : e === "focusout" && nr();
	}
	function ar(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xn(Jn);
	}
	function or(e, t) {
		if (e === "click") return Xn(t);
	}
	function sr(e, t) {
		if (e === "input" || e === "change") return Xn(t);
	}
	function cr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var lr = typeof Object.is == "function" ? Object.is : cr;
	function ur(e, t) {
		if (lr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!pe.call(t, i) || !lr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function dr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function fr(e, t) {
		var n = dr(e);
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
			n = dr(n);
		}
	}
	function pr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? pr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function mr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ct(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ct(e.document);
		}
		return t;
	}
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var gr = Yt && "documentMode" in document && 11 >= document.documentMode, _r = null, vr = null, yr = null, br = !1;
	function xr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		br || _r == null || _r !== Ct(r) || (r = _r, "selectionStart" in r && hr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), yr && ur(yr, r) || (yr = r, r = Ed(vr, "onSelect"), 0 < r.length && (t = new cn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = _r)));
	}
	function Sr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Cr = {
		animationend: Sr("Animation", "AnimationEnd"),
		animationiteration: Sr("Animation", "AnimationIteration"),
		animationstart: Sr("Animation", "AnimationStart"),
		transitionrun: Sr("Transition", "TransitionRun"),
		transitionstart: Sr("Transition", "TransitionStart"),
		transitioncancel: Sr("Transition", "TransitionCancel"),
		transitionend: Sr("Transition", "TransitionEnd")
	}, wr = {}, Tr = {};
	Yt && (Tr = document.createElement("div").style, "AnimationEvent" in window || (delete Cr.animationend.animation, delete Cr.animationiteration.animation, delete Cr.animationstart.animation), "TransitionEvent" in window || delete Cr.transitionend.transition);
	function Er(e) {
		if (wr[e]) return wr[e];
		if (!Cr[e]) return e;
		var t = Cr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Tr) return wr[e] = t[n];
		return e;
	}
	var Dr = Er("animationend"), Or = Er("animationiteration"), kr = Er("animationstart"), Ar = Er("transitionrun"), jr = Er("transitionstart"), Mr = Er("transitioncancel"), Nr = Er("transitionend"), Pr = /* @__PURE__ */ new Map(), Fr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
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
		if (50 < uu) throw uu = 0, du = null, Error(i(185));
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
		else if (typeof e == "string") s = Wf(e, n, W.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
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
				yd("cancel", t), yd("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				yd("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) yd(gd[n], t);
				break;
			case "source":
				yd("error", t);
				break;
			case "img":
			case "image":
			case "link":
				yd("error", t), yd("load", t);
				break;
			case "details":
				yd("toggle", t);
				break;
			case "input":
				yd("invalid", t), Dt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				yd("invalid", t);
				break;
			case "textarea": yd("invalid", t), jt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (yd("beforetoggle", t), yd("toggle", t)), r.onScroll != null && yd("scroll", t), r.onScrollEnd != null && yd("scrollend", t), r.onClick != null && (t.onclick = Bt), t = !0) : t = !1, t || Ei(e, !0);
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
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Wd(e.type, e.memoizedProps)), n = !n), n && xi && Ei(e), Oi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = df(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = df(e);
		} else t === 27 ? (t = xi, Qd(e.type) ? (e = uf, uf = null, xi = e) : xi = t) : xi = bi ? lf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ai() {
		xi = bi = null, Si = !1;
	}
	function ji() {
		var e = Ci;
		return e !== null && (Xl === null ? Xl = e : Xl.push.apply(Xl, e), Ci = null), e;
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
					lr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === te.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [$f] : e.push($f));
			}
			a = a.return;
		}
		e !== null && zi(t, e, n, r), t.flags |= 262144;
	}
	function Vi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!lr(e.context._currentValue, e.memoizedValue)) return !0;
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
			$i = 0, ea = ud(), ta = {
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
		$l = ve(), typeof t == "object" && t && typeof t.then == "function" && na(e, t), aa !== null && aa(e, t);
	};
	var oa = V(null);
	function sa() {
		var e = oa.current;
		return e === null ? Pl.pooledCache : e;
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
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Bt, Bt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ya(e), e;
			default:
				if (typeof t.status == "string") t.then(Bt, Bt);
				else {
					if (e = Pl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
	function Ma(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Nl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Kr(e), Gr(e, null, n), t;
		}
		return Hr(e, r, t, n), Kr(e);
	}
	function Na(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	function Pa(e, t) {
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
	var Fa = !1;
	function Ia() {
		if (Fa) {
			var e = ta;
			if (e !== null) throw e;
		}
	}
	function La(e, t, n, r) {
		Fa = !1;
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
				if (p ? (Il & f) === f : (r & f) === f) {
					f !== 0 && f === ea && (Fa = !0), u !== null && (u = u.next = {
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Wl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ra(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function za(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ra(n[e], t);
	}
	var Ba = V(null), Va = V(0);
	function Ha(e, t) {
		e = Hl, U(Va, e), U(Ba, t), Hl = e | t.baseLanes;
	}
	function Ua() {
		U(Va, Hl), U(Ba, Ba.current);
	}
	function Wa() {
		Hl = Va.current, H(Ba), H(Va);
	}
	var Ga = V(null), Ka = null;
	function qa(e) {
		var t = e.alternate;
		U(Qa, Qa.current & 1), U(Ga, e), Ka === null && (t === null || Ba.current !== null || t.memoizedState !== null) && (Ka = e);
	}
	function Ja(e) {
		U(Qa, Qa.current), U(Ga, e), Ka === null && (Ka = e);
	}
	function Ya(e) {
		e.tag === 22 ? (U(Qa, Qa.current), U(Ga, e), Ka === null && (Ka = e)) : Xa(e);
	}
	function Xa() {
		U(Qa, Qa.current), U(Ga, Ga.current);
	}
	function Za(e) {
		H(Ga), Ka === e && (Ka = null), H(Qa);
	}
	var Qa = V(0);
	function $a(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || of(n) || sf(n))) return t;
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
	var eo = 0, to = null, no = null, ro = null, io = !1, ao = !1, oo = !1, so = 0, co = 0, lo = null, uo = 0;
	function fo() {
		throw Error(i(321));
	}
	function po(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!lr(e[n], t[n])) return !1;
		return !0;
	}
	function mo(e, t, n, r, i, a) {
		return eo = a, to = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, I.H = e === null || e.memoizedState === null ? js : Ms, oo = !1, a = n(r, i), oo = !1, ao && (a = go(t, n, r, i)), ho(e), a;
	}
	function ho(e) {
		I.H = As;
		var t = no !== null && no.next !== null;
		if (eo = 0, ro = no = to = null, io = !1, co = 0, lo = null, t) throw Error(i(300));
		e === null || Ys || (e = e.dependencies, e !== null && Vi(e) && (Ys = !0));
	}
	function go(e, t, n, r) {
		to = e;
		var a = 0;
		do {
			if (ao && (lo = null), co = 0, ao = !1, 25 <= a) throw Error(i(301));
			if (a += 1, ro = no = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			I.H = Ns, o = t(n, r);
		} while (ao);
		return o;
	}
	function _o() {
		var e = I.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? wo(t) : t, e = e.useState()[0], (no === null ? null : no.memoizedState) !== e && (to.flags |= 1024), t;
	}
	function vo() {
		var e = so !== 0;
		return so = 0, e;
	}
	function yo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function bo(e) {
		if (io) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			io = !1;
		}
		eo = 0, ro = no = to = null, ao = !1, co = so = 0, lo = null;
	}
	function xo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ro === null ? to.memoizedState = ro = e : ro = ro.next = e, ro;
	}
	function So() {
		if (no === null) {
			var e = to.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = no.next;
		var t = ro === null ? to.memoizedState : ro.next;
		if (t !== null) ro = t, no = e;
		else {
			if (e === null) throw to.alternate === null ? Error(i(467)) : Error(i(310));
			no = e, e = {
				memoizedState: no.memoizedState,
				baseState: no.baseState,
				baseQueue: no.baseQueue,
				queue: no.queue,
				next: null
			}, ro === null ? to.memoizedState = ro = e : ro = ro.next = e;
		}
		return ro;
	}
	function Co() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function wo(e) {
		var t = co;
		return co += 1, lo === null && (lo = []), e = ha(lo, e, t), t = to, (ro === null ? t.memoizedState : ro.next) === null && (t = t.alternate, I.H = t === null || t.memoizedState === null ? js : Ms), e;
	}
	function To(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return wo(e);
			if (e.$$typeof === C) return Ui(e);
		}
		throw Error(i(438, String(e)));
	}
	function Eo(e) {
		var t = null, n = to.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = to.alternate;
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
		}, n === null && (n = Co(), to.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Do(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Oo(e) {
		return ko(So(), no, e);
	}
	function ko(e, t, n) {
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
				if (f === u.lane ? (eo & f) === f : (Il & f) === f) {
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
					else if ((eo & p) === p) {
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
					}, l === null ? (c = l = f, s = o) : l = l.next = f, to.lanes |= p, Wl |= p;
					f = u.action, oo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, to.lanes |= f, Wl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !lr(o, e.memoizedState) && (Ys = !0, d && (n = ta, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ao(e) {
		var t = So(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			lr(o, t.memoizedState) || (Ys = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function jo(e, t, n) {
		var r = to, a = So(), o = Si;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !lr((no || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ys = !0), a = a.queue, ns(Po.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || ro !== null && ro.memoizedState.tag & 1) {
			if (r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, a, n, t), null), Pl === null) throw Error(i(349));
			o || eo & 127 || Mo(r, t, n);
		}
		return n;
	}
	function Mo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = to.updateQueue, t === null ? (t = Co(), to.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function No(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Fo(t) && Io(e);
	}
	function Po(e, t, n) {
		return n(function() {
			Fo(t) && Io(e);
		});
	}
	function Fo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !lr(e, n);
		} catch {
			return !0;
		}
	}
	function Io(e) {
		var t = Wr(e, 2);
		t !== null && mu(t, e, 2);
	}
	function Lo(e) {
		var t = xo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), oo) {
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
			lastRenderedReducer: Do,
			lastRenderedState: e
		}, t;
	}
	function Ro(e, t, n, r) {
		return e.baseState = n, ko(e, no, typeof r == "function" ? r : Do);
	}
	function zo(e, t, n, r, a) {
		if (Ds(e)) throw Error(i(485));
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
			I.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Bo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Bo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = I.T, o = {};
			I.T = o;
			try {
				var s = n(i, r), c = I.S;
				c !== null && c(o, s), Vo(e, t, s);
			} catch (n) {
				Uo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), I.T = a;
			}
		} else try {
			a = n(i, r), Vo(e, t, a);
		} catch (n) {
			Uo(e, t, n);
		}
	}
	function Vo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ho(e, t, n);
		}, function(n) {
			return Uo(e, t, n);
		}) : Ho(e, t, n);
	}
	function Ho(e, t, n) {
		t.status = "fulfilled", t.value = n, Wo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Bo(e, n)));
	}
	function Uo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Wo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Wo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Go(e, t) {
		return t;
	}
	function Ko(e, t) {
		if (Si) {
			var n = Pl.formState;
			if (n !== null) {
				a: {
					var r = to;
					if (Si) {
						if (xi) {
							b: {
								for (var i = xi, a = wi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = lf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								xi = lf(i.nextSibling), r = i.data === "F!";
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
		return n = xo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Go,
			lastRenderedState: t
		}, n.queue = r, n = ws.bind(null, to, r), r.dispatch = n, r = Lo(!1), a = Es.bind(null, to, !1, r.queue), r = xo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = zo.bind(null, to, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function qo(e) {
		return Jo(So(), no, e);
	}
	function Jo(e, t, n) {
		if (t = ko(e, t, Go)[0], e = Oo(Do)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = wo(t);
		} catch (e) {
			throw e === ua ? fa : e;
		}
		else r = t;
		t = So();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (to.flags |= 2048, Zo(9, { destroy: void 0 }, Yo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Yo(e, t) {
		e.action = t;
	}
	function Xo(e) {
		var t = So(), n = no;
		if (n !== null) return Jo(t, n, e);
		So(), t = t.memoizedState, n = So();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Zo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = to.updateQueue, t === null && (t = Co(), to.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Qo() {
		return So().memoizedState;
	}
	function $o(e, t, n, r) {
		var i = xo();
		to.flags |= e, i.memoizedState = Zo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function es(e, t, n, r) {
		var i = So();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		no !== null && r !== null && po(r, no.memoizedState.deps) ? i.memoizedState = Zo(t, a, n, r) : (to.flags |= e, i.memoizedState = Zo(1 | t, a, n, r));
	}
	function ts(e, t) {
		$o(8390656, 8, e, t);
	}
	function ns(e, t) {
		es(2048, 8, e, t);
	}
	function rs(e) {
		to.flags |= 4;
		var t = to.updateQueue;
		if (t === null) t = Co(), to.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function is(e) {
		var t = So().memoizedState;
		return rs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Nl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function as(e, t) {
		return es(4, 2, e, t);
	}
	function os(e, t) {
		return es(4, 4, e, t);
	}
	function ss(e, t) {
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
	function cs(e, t, n) {
		n = n == null ? null : n.concat([e]), es(4, 4, ss.bind(null, t, e), n);
	}
	function ls() {}
	function us(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ds(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && po(t, r[1])) return r[0];
		if (r = e(), oo) {
			ke(!0);
			try {
				e();
			} finally {
				ke(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function fs(e, t, n) {
		return n === void 0 || eo & 1073741824 && !(Il & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = pu(), to.lanes |= e, Wl |= e, n);
	}
	function ps(e, t, n, r) {
		return lr(n, t) ? n : Ba.current === null ? !(eo & 42) || eo & 1073741824 && !(Il & 261930) ? (Ys = !0, e.memoizedState = n) : (e = pu(), to.lanes |= e, Wl |= e, t) : (e = fs(e, n, r), lr(e, t) || (Ys = !0), e);
	}
	function ms(e, t, n, r, i) {
		var a = L.p;
		L.p = a !== 0 && 8 > a ? a : 8;
		var o = I.T, s = {};
		I.T = s, Es(e, !1, t, n);
		try {
			var c = i(), l = I.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ts(e, t, ia(c, r), fu(e)) : Ts(e, t, r, fu(e));
		} catch (n) {
			Ts(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, fu());
		} finally {
			L.p = a, o !== null && s.types !== null && (o.types = s.types), I.T = o;
		}
	}
	function hs() {}
	function gs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = _s(e).queue;
		ms(e, a, t, R, n === null ? hs : function() {
			return vs(e), n(r);
		});
	}
	function _s(e) {
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
				lastRenderedReducer: Do,
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
				lastRenderedReducer: Do,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function vs(e) {
		var t = _s(e);
		t.next === null && (t = e.alternate.memoizedState), Ts(e, t.next.queue, {}, fu());
	}
	function ys() {
		return Ui($f);
	}
	function bs() {
		return So().memoizedState;
	}
	function xs() {
		return So().memoizedState;
	}
	function Ss(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = fu();
					e = ja(n);
					var r = Ma(t, e, n);
					r !== null && (mu(r, t, n), Na(r, t, n)), t = { cache: Xi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Cs(e, t, n) {
		var r = fu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e) ? Os(t, n) : (n = Ur(e, t, n, r), n !== null && (mu(n, e, r), ks(n, t, r)));
	}
	function ws(e, t, n) {
		Ts(e, t, n, fu());
	}
	function Ts(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ds(e)) Os(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, lr(s, o)) return Hr(e, t, i, 0), Pl === null && Vr(), !1;
			} catch {}
			if (n = Ur(e, t, i, r), n !== null) return mu(n, e, r), ks(n, t, r), !0;
		}
		return !1;
	}
	function Es(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e)) {
			if (t) throw Error(i(479));
		} else t = Ur(e, n, r, 2), t !== null && mu(t, e, 2);
	}
	function Ds(e) {
		var t = e.alternate;
		return e === to || t !== null && t === to;
	}
	function Os(e, t) {
		ao = io = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ks(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	var As = {
		readContext: Ui,
		use: To,
		useCallback: fo,
		useContext: fo,
		useEffect: fo,
		useImperativeHandle: fo,
		useLayoutEffect: fo,
		useInsertionEffect: fo,
		useMemo: fo,
		useReducer: fo,
		useRef: fo,
		useState: fo,
		useDebugValue: fo,
		useDeferredValue: fo,
		useTransition: fo,
		useSyncExternalStore: fo,
		useId: fo,
		useHostTransitionStatus: fo,
		useFormState: fo,
		useActionState: fo,
		useOptimistic: fo,
		useMemoCache: fo,
		useCacheRefresh: fo
	};
	As.useEffectEvent = fo;
	var js = {
		readContext: Ui,
		use: To,
		useCallback: function(e, t) {
			return xo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ui,
		useEffect: ts,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), $o(4194308, 4, ss.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return $o(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			$o(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = xo();
			t = t === void 0 ? null : t;
			var r = e();
			if (oo) {
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
			var r = xo();
			if (n !== void 0) {
				var i = n(t);
				if (oo) {
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
			}, r.queue = e, e = e.dispatch = Cs.bind(null, to, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = xo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Lo(e);
			var t = e.queue, n = ws.bind(null, to, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return fs(xo(), e, t);
		},
		useTransition: function() {
			var e = Lo(!1);
			return e = ms.bind(null, to, e.queue, !0, !1), xo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = to, a = xo();
			if (Si) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Pl === null) throw Error(i(349));
				Il & 127 || Mo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ts(Po.bind(null, r, o, e), [e]), r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = xo(), t = Pl.identifierPrefix;
			if (Si) {
				var n = mi, r = pi;
				n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = so++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ys,
		useFormState: Ko,
		useActionState: Ko,
		useOptimistic: function(e) {
			var t = xo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Es.bind(null, to, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Eo,
		useCacheRefresh: function() {
			return xo().memoizedState = Ss.bind(null, to);
		},
		useEffectEvent: function(e) {
			var t = xo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Nl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ms = {
		readContext: Ui,
		use: To,
		useCallback: us,
		useContext: Ui,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Oo,
		useRef: Qo,
		useState: function() {
			return Oo(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return ps(So(), no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Oo(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: qo,
		useActionState: qo,
		useOptimistic: function(e, t) {
			return Ro(So(), no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ms.useEffectEvent = is;
	var Ns = {
		readContext: Ui,
		use: To,
		useCallback: us,
		useContext: Ui,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Ao,
		useRef: Qo,
		useState: function() {
			return Ao(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			var n = So();
			return no === null ? fs(n, e, t) : ps(n, no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ao(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: function(e, t) {
			var n = So();
			return no === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ro(n, no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ns.useEffectEvent = is;
	function Ps(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : m({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Fs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = fu(), i = ja(r);
			i.payload = t, n != null && (i.callback = n), t = Ma(e, i, r), t !== null && (mu(t, e, r), Na(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = fu(), i = ja(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ma(e, i, r), t !== null && (mu(t, e, r), Na(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = fu(), r = ja(n);
			r.tag = 2, t != null && (r.callback = t), t = Ma(e, r, n), t !== null && (mu(t, e, n), Na(t, e, n));
		}
	};
	function Is(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !ur(n, r) || !ur(i, a) : !0;
	}
	function Ls(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Fs.enqueueReplaceState(t, t.state, null);
	}
	function Rs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = m({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function zs(e) {
		Lr(e);
	}
	function Bs(e) {
		console.error(e);
	}
	function Vs(e) {
		Lr(e);
	}
	function Hs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Us(e, t, n) {
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
	function Ws(e, t, n) {
		return n = ja(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Hs(e, t);
		}, n;
	}
	function Gs(e) {
		return e = ja(e), e.tag = 3, e;
	}
	function Ks(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Us(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Us(t, n, r), typeof i != "function" && (nu === null ? nu = /* @__PURE__ */ new Set([this]) : nu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Bi(t, n, a, !0), n = Ga.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ka === null ? Eu() : n.alternate === null && Ul === 0 && (Ul = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Eu(), !1;
		}
		if (Si) return t = Ga.current, t === null ? (r !== Ti && (t = Error(i(423), { cause: r }), Mi(ai(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ai(r, n), a = Ws(e.stateNode, r, a), Pa(e, a), Ul !== 4 && (Ul = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ti && (e = Error(i(422), { cause: r }), Mi(ai(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ai(o, n), Yl === null ? Yl = [o] : Yl.push(o), Ul !== 4 && (Ul = 2), t === null) return !0;
		r = ai(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ws(n.stateNode, r, e), Pa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (nu === null || !nu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Gs(a), Ks(a, e, n, r), Pa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Js = Error(i(461)), Ys = !1;
	function Xs(e, t, n, r) {
		t.child = e === null ? Da(t, null, n, r) : Ea(t, e.child, n, r);
	}
	function Zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Hi(t), r = mo(e, t, n, o, a, i), s = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Si && s && _i(t), t.flags |= 1, Xs(e, t, r, i), t.child);
	}
	function Qs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Xr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, $s(e, t, a, r, i)) : (e = $r(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Sc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? ur : n, n(o, r) && e.ref === t.ref) return xc(e, t, i);
		}
		return t.flags |= 1, e = Zr(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function $s(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (ur(a, r) && e.ref === t.ref) if (Ys = !1, t.pendingProps = r = a, Sc(e, i)) e.flags & 131072 && (Ys = !0);
			else return t.lanes = e.lanes, xc(e, t, i);
		}
		return sc(e, t, n, r, i);
	}
	function ec(e, t, n, r) {
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
				return nc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ca(t, a === null ? null : a.cachePool), a === null ? Ua() : Ha(t, a), Ya(t);
			else return r = t.lanes = 536870912, nc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ca(t, null), Ua(), Xa(t)) : (ca(t, a.cachePool), Ha(t, a), Xa(t), t.memoizedState = null);
		return Xs(e, t, i, n), t.child;
	}
	function tc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function nc(e, t, n, r, i) {
		var a = sa();
		return a = a === null ? null : {
			parent: Yi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ca(t, null), Ua(), Ya(t), e !== null && Bi(e, t, r, !0), t.childLanes = i, null;
	}
	function rc(e, t) {
		return t = gc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ic(e, t, n) {
		return Ea(t, e.child, null, n), e = rc(t, t.pendingProps), e.flags |= 2, Za(t), t.memoizedState = null, e;
	}
	function ac(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Si) {
				if (r.mode === "hidden") return e = rc(t, r), t.lanes = 536870912, tc(null, e);
				if (Ja(t), (e = xi) ? (e = af(e, wi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
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
			return rc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Ja(t), a) if (t.flags & 256) t.flags &= -257, t = ic(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Ys || Bi(e, t, n, !1), a = (n & e.childLanes) !== 0, Ys || a) {
				if (r = Pl, r !== null && (s = Ge(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Wr(e, s), mu(r, e, s), Js;
				Eu(), t = ic(e, t, n);
			} else e = o.treeContext, xi = lf(s.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = rc(t, r), t.flags |= 4096;
			return t;
		}
		return e = Zr(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function oc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function sc(e, t, n, r, i) {
		return Hi(t), n = mo(e, t, n, r, void 0, i), r = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Si && r && _i(t), t.flags |= 1, Xs(e, t, n, i), t.child);
	}
	function cc(e, t, n, r, i, a) {
		return Hi(t), t.updateQueue = null, n = go(t, r, n, i), ho(e), r = vo(), e !== null && !Ys ? (yo(e, t, a), xc(e, t, a)) : (Si && r && _i(t), t.flags |= 1, Xs(e, t, n, a), t.child);
	}
	function lc(e, t, n, r, i) {
		if (Hi(t), t.stateNode === null) {
			var a = qr, o = n.contextType;
			typeof o == "object" && o && (a = Ui(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Fs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ka(t), o = n.contextType, a.context = typeof o == "object" && o ? Ui(o) : qr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ps(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Fs.enqueueReplaceState(a, a.state, null), La(t, r, a, i), Ia(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Rs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = qr, typeof u == "object" && u && (o = Ui(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ls(t, a, r, o), Oa = !1;
			var f = t.memoizedState;
			a.state = f, La(t, r, a, i), Ia(), l = t.memoizedState, s || f !== l || Oa ? (typeof d == "function" && (Ps(t, n, d, r), l = t.memoizedState), (c = Oa || Is(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Aa(e, t), o = t.memoizedProps, u = Rs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = qr, typeof l == "object" && l && (c = Ui(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ls(t, a, r, c), Oa = !1, f = t.memoizedState, a.state = f, La(t, r, a, i), Ia();
			var p = t.memoizedState;
			o !== d || f !== p || Oa || e !== null && e.dependencies !== null && Vi(e.dependencies) ? (typeof s == "function" && (Ps(t, n, s, r), p = t.memoizedState), (u = Oa || Is(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Vi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, oc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ea(t, e.child, null, i), t.child = Ea(t, null, n, i)) : Xs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = xc(e, t, i), e;
	}
	function uc(e, t, n, r) {
		return Ai(), t.flags |= 256, Xs(e, t, n, r), t.child;
	}
	var dc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function fc(e) {
		return {
			baseLanes: e,
			cachePool: la()
		};
	}
	function pc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ql), e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(Qa.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Si) {
				if (a ? qa(t) : Xa(t), (e = xi) ? (e = af(e, wi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: fi === null ? null : {
						id: pi,
						overflow: mi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ni(e), n.return = t, t.child = n, bi = t, xi = null)) : e = null, e === null) throw Ei(t);
				return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Xa(t), a = t.mode, c = gc({
				mode: "hidden",
				children: c
			}, a), r = ei(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(null, r)) : (qa(t), hc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (qa(t), t.flags &= -257, t = _c(e, t, n)) : t.memoizedState === null ? (Xa(t), c = r.fallback, a = t.mode, r = gc({
				mode: "visible",
				children: r.children
			}, a), c = ei(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ea(t, e.child, null, n), r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, t = tc(null, r)) : (Xa(t), t.child = e.child, t.flags |= 128, t = null);
			else if (qa(t), sf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Mi({
					value: r,
					source: null,
					stack: null
				}), t = _c(e, t, n);
			} else if (Ys || Bi(e, t, n, !1), s = (n & e.childLanes) !== 0, Ys || s) {
				if (s = Pl, s !== null && (r = Ge(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Wr(e, r), mu(s, e, r), Js;
				of(c) || Eu(), t = _c(e, t, n);
			} else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, xi = lf(c.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = hc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Xa(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = Zr(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ei(c, a, n, null), c.flags |= 2) : c = Zr(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, tc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = fc(n) : (a = c.cachePool, a === null ? a = la() : (l = Yi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(e.child, r)) : (qa(t), n = e.child, e = n.sibling, n = Zr(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function hc(e, t) {
		return t = gc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function gc(e, t) {
		return e = Yr(22, e, null, t), e.lanes = 0, e;
	}
	function _c(e, t, n) {
		return Ea(t, e.child, null, n), e = hc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function vc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ri(e.return, t, n);
	}
	function yc(e, t, n, r, i, a) {
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
	function bc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Qa.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, U(Qa, o), Xs(e, t, r, n), r = Si ? li : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && vc(e, n, t);
			else if (e.tag === 19) vc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && $a(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), yc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && $a(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				yc(t, !0, n, null, a, r);
				break;
			case "together":
				yc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function xc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Wl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Bi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Zr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Zr(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Sc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Vi(e)));
	}
	function Cc(e, t, n) {
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
				if (t.memoizedState !== null) return t.flags |= 128, Ja(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (qa(t), e = xc(e, t, n), e === null ? null : e.sibling) : mc(e, t, n) : (qa(t), t.flags |= 128, null);
				qa(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Bi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return bc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), U(Qa, Qa.current), r) break;
				return null;
			case 22: return t.lanes = 0, ec(e, t, n, t.pendingProps);
			case 24: Ii(t, Yi, e.memoizedState.cache);
		}
		return xc(e, t, n);
	}
	function wc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Ys = !0;
		else {
			if (!Sc(e, n) && !(t.flags & 128)) return Ys = !1, Cc(e, t, n);
			Ys = !!(e.flags & 131072);
		}
		else Ys = !1, Si && t.flags & 1048576 && gi(t, li, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ga(t.elementType), t.type = e, typeof e == "function") Xr(e) ? (r = Rs(e, r), t.tag = 1, t = lc(null, t, e, r, n)) : (t.tag = 0, t = sc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Zs(null, t, e, r, n);
								break a;
							}
							if (a === D) {
								t.tag = 14, t = Qs(null, t, e, r, n);
								break a;
							}
						}
						throw t = P(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return sc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Rs(r, t.pendingProps), lc(e, t, r, a, n);
			case 3:
				a: {
					if (ne(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Aa(e, t), La(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ii(t, Yi, r), r !== o.cache && zi(t, [Yi], n, !0), Ia(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = uc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = ai(Error(i(424)), t), Mi(a), t = uc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (xi = lf(e.firstChild), bi = t, Si = !0, Ci = null, wi = !0, n = Da(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ai(), r === a) {
							t = xc(e, t, n);
							break a;
						}
						Xs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return oc(e, t), e === null ? (n = Af(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Si || (n = t.type, e = t.pendingProps, r = Vd(ee.current).createElement(n), r[Ze] = t, r[Qe] = e, Fd(r, n, e), ct(r), t.stateNode = r) : t.memoizedState = Af(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ie(t), e === null && Si && (r = t.stateNode = pf(t.type, t.pendingProps, ee.current), bi = t, wi = !0, a = xi, Qd(t.type) ? (uf = a, xi = lf(r.firstChild)) : xi = a), Xs(e, t, t.pendingProps.children, n), oc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Si && ((a = r = xi) && (r = nf(r, t.type, t.pendingProps, wi), r === null ? a = !1 : (t.stateNode = r, bi = t, xi = lf(r.firstChild), wi = !1, a = !0)), a || Ei(t)), ie(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(a, o) ? r = null : s !== null && Wd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = mo(e, t, _o, null, null, n), $f._currentValue = a), oc(e, t), Xs(e, t, r, n), t.child;
			case 6: return e === null && Si && ((e = n = xi) && (n = rf(n, t.pendingProps, wi), n === null ? e = !1 : (t.stateNode = n, bi = t, xi = null, e = !0)), e || Ei(t)), null;
			case 13: return mc(e, t, n);
			case 4: return ne(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ea(t, null, r, n) : Xs(e, t, r, n), t.child;
			case 11: return Zs(e, t, t.type, t.pendingProps, n);
			case 7: return Xs(e, t, t.pendingProps, n), t.child;
			case 8: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ii(t, t.type, r.value), Xs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Hi(t), a = Ui(a), r = r(a), t.flags |= 1, Xs(e, t, r, n), t.child;
			case 14: return Qs(e, t, t.type, t.pendingProps, n);
			case 15: return $s(e, t, t.type, t.pendingProps, n);
			case 19: return bc(e, t, n);
			case 31: return ac(e, t, n);
			case 22: return ec(e, t, n, t.pendingProps);
			case 24: return Hi(t), r = Ui(Yi), e === null ? (a = sa(), a === null && (a = Pl, o = Xi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ka(t), Ii(t, Yi, a)) : ((e.lanes & n) !== 0 && (Aa(e, t), La(t, null, null, n), Ia()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ii(t, Yi, r), r !== a.cache && zi(t, [Yi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ii(t, Yi, r))), Xs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Tc(e) {
		e.flags |= 4;
	}
	function Ec(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Cu()) e.flags |= 8192;
			else throw _a = pa, da;
		} else e.flags &= -16777217;
	}
	function Dc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Gf(t)) if (Cu()) e.flags |= 8192;
		else throw _a = pa, da;
	}
	function Oc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : q(), e.lanes |= t, Jl |= t);
	}
	function kc(e, t) {
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
	function Ac(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function jc(e, t, n) {
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
			case 14: return Ac(t), null;
			case 1: return Ac(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Li(Yi), re(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ki(t) ? Tc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ji())), Ac(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Tc(t), o === null ? (Ac(t), Ec(t, a, null, r, n)) : (Ac(t), Dc(t, o))) : o ? o === e.memoizedState ? (Ac(t), t.flags &= -16777217) : (Tc(t), Ac(t), Dc(t, o)) : (e = e.memoizedProps, e !== r && Tc(t), Ac(t), Ec(t, a, e, r, n)), null;
			case 27:
				if (ae(t), n = ee.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					e = W.current, ki(t) ? Di(t, e) : (e = pf(a, r, n), t.stateNode = e, Tc(t));
				}
				return Ac(t), null;
			case 5:
				if (ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					if (o = W.current, ki(t)) Di(t, o);
					else {
						var s = Vd(ee.current);
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
						a: switch (Fd(o, a, r), a) {
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
						r && Tc(t);
					}
				}
				return Ac(t), Ec(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ee.current, ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ze] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ei(t, !0);
					} else e = Vd(e).createTextNode(r), e[Ze] = t, t.stateNode = e;
				}
				return Ac(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), e = !1;
					} else n = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Za(t), t) : (Za(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ac(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ki(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ze] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), a = !1;
					} else a = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Za(t), t) : (Za(t), null);
				}
				return Za(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Oc(t, t.updateQueue), Ac(t), null);
			case 4: return re(), e === null && Sd(t.stateNode.containerInfo), Ac(t), null;
			case 10: return Li(t.type), Ac(t), null;
			case 19:
				if (H(Qa), r = t.memoizedState, r === null) return Ac(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) kc(r, !1);
				else {
					if (Ul !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = $a(e), o !== null) {
							for (t.flags |= 128, kc(r, !1), e = o.updateQueue, t.updateQueue = e, Oc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Qr(n, e), n = n.sibling;
							return U(Qa, Qa.current & 1 | 2), Si && hi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && ve() > eu && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = $a(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Oc(t, e), kc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Si) return Ac(t), null;
					} else 2 * ve() - r.renderingStartTime > eu && n !== 536870912 && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ac(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ve(), e.sibling = null, n = Qa.current, U(Qa, a ? n & 1 | 2 : n & 1), Si && hi(t, r.treeForkCount), e);
			case 22:
			case 23: return Za(t), Wa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ac(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ac(t), n = t.updateQueue, n !== null && Oc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && H(oa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Li(Yi), Ac(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e, t) {
		switch (vi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Li(Yi), re(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Za(t), t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Za(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ai();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return H(Qa), null;
			case 4: return re(), null;
			case 10: return Li(t.type), null;
			case 22:
			case 23: return Za(t), Wa(), e !== null && H(oa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Li(Yi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Nc(e, t) {
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
				t.memoizedState !== null && Za(t);
				break;
			case 13:
				Za(t);
				break;
			case 19:
				H(Qa);
				break;
			case 10:
				Li(t.type);
				break;
			case 22:
			case 23:
				Za(t), Wa(), e !== null && H(oa);
				break;
			case 24: Li(Yi);
		}
	}
	function Pc(e, t) {
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
			Uu(t, t.return, e);
		}
	}
	function Fc(e, t, n) {
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
								Uu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Ic(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				za(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function Lc(e, t, n) {
		n.props = Rs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Rc(e, t) {
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
			Uu(e, t, n);
		}
	}
	function zc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Uu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Uu(e, t, n);
		}
		else n.current = null;
	}
	function Bc(e) {
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
			Uu(e, e.return, t);
		}
	}
	function Vc(e, t, n) {
		try {
			var r = e.stateNode;
			Id(r, e.type, n, t), r[Qe] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Hc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qd(e.type) || e.tag === 4;
	}
	function Uc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Hc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Qd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Wc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Bt));
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Wc(e, t, n), e = e.sibling; e !== null;) Wc(e, t, n), e = e.sibling;
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[Ze] = e, t[Qe] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var qc = !1, Jc = !1, Yc = !1, Xc = typeof WeakSet == "function" ? WeakSet : Set, Zc = null;
	function Qc(e, t) {
		if (e = e.containerInfo, zd = cp, e = mr(e), hr(e)) {
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
		for (Bd = {
			focusedElem: e,
			selectionRange: n
		}, cp = !1, Zc = t; Zc !== null;) if (t = Zc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Zc = e;
		else for (; Zc !== null;) {
			switch (t = Zc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Rs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Uu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) tf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								tf(e);
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
				e.return = t.return, Zc = e;
				break;
			}
			Zc = t.return;
		}
	}
	function $c(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ml(e, n), r & 4 && Pc(5, n);
				break;
			case 1:
				if (ml(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = Rs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Ic(n), r & 512 && Rc(n, n.return);
				break;
			case 3:
				if (ml(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						za(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Kc(n);
			case 26:
			case 5:
				ml(e, n), t === null && r & 4 && Bc(n), r & 512 && Rc(n, n.return);
				break;
			case 12:
				ml(e, n);
				break;
			case 31:
				ml(e, n), r & 4 && al(e, n);
				break;
			case 13:
				ml(e, n), r & 4 && ol(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), cf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || qc, !r) {
					t = t !== null && t.memoizedState !== null || Jc, i = qc;
					var a = Jc;
					qc = r, (Jc = t) && !a ? gl(e, n, !!(n.subtreeFlags & 8772)) : ml(e, n), qc = i, Jc = a;
				}
				break;
			case 30: break;
			default: ml(e, n);
		}
	}
	function el(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, el(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && it(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var tl = null, nl = !1;
	function rl(e, t, n) {
		for (n = n.child; n !== null;) il(e, t, n), n = n.sibling;
	}
	function il(e, t, n) {
		if (Oe && typeof Oe.onCommitFiberUnmount == "function") try {
			Oe.onCommitFiberUnmount(De, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Jc || zc(n, t), rl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Jc || zc(n, t);
				var r = tl, i = nl;
				Qd(n.type) && (tl = n.stateNode, nl = !1), rl(e, t, n), mf(n.stateNode), tl = r, nl = i;
				break;
			case 5: Jc || zc(n, t);
			case 6:
				if (r = tl, i = nl, tl = null, rl(e, t, n), tl = r, nl = i, tl !== null) if (nl) try {
					(tl.nodeType === 9 ? tl.body : tl.nodeName === "HTML" ? tl.ownerDocument.body : tl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					tl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				tl !== null && (nl ? (e = tl, $d(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Pp(e)) : $d(tl, n.stateNode));
				break;
			case 4:
				r = tl, i = nl, tl = n.stateNode.containerInfo, nl = !0, rl(e, t, n), tl = r, nl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Fc(2, n, t), Jc || Fc(4, n, t), rl(e, t, n);
				break;
			case 1:
				Jc || (zc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Lc(n, t, r)), rl(e, t, n);
				break;
			case 21:
				rl(e, t, n);
				break;
			case 22:
				Jc = (r = Jc) || n.memoizedState !== null, rl(e, t, n), Jc = r;
				break;
			default: rl(e, t, n);
		}
	}
	function al(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Pp(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Pp(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function sl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Xc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function cl(e, t) {
		var n = sl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ll(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Qd(c.type)) {
							tl = c.stateNode, nl = !1;
							break a;
						}
						break;
					case 5:
						tl = c.stateNode, nl = !1;
						break a;
					case 3:
					case 4:
						tl = c.stateNode.containerInfo, nl = !0;
						break a;
				}
				c = c.return;
			}
			if (tl === null) throw Error(i(160));
			il(o, s, a), tl = null, nl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) dl(t, e), t = t.sibling;
	}
	var ul = null;
	function dl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ll(t, e), fl(e), r & 4 && (Fc(3, e, e.return), Pc(3, e), Fc(5, e, e.return));
				break;
			case 1:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 64 && qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = ul;
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[J] || o[Ze] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Fd(o, r, n), o[Ze] = e, ct(o), r = o;
									break a;
								case "link":
									var s = Hf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Hf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Ze] = e, ct(o), r = o;
						}
						e.stateNode = r;
					} else Uf(a, e.type, e.stateNode);
					else e.stateNode = Lf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Vc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Uf(a, e.type, e.stateNode) : Lf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), n !== null && r & 4 && Vc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Mt(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Yc = !0);
				break;
			case 6:
				if (ll(t, e), fl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Vf = null, a = ul, ul = _f(t.containerInfo), ll(t, e), ul = a, fl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Pp(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Yc && (Yc = !1, pl(e));
				break;
			case 4:
				r = ul, ul = _f(e.stateNode.containerInfo), ll(t, e), fl(e), ul = r;
				break;
			case 12:
				ll(t, e), fl(e);
				break;
			case 31:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 13:
				ll(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Ql = ve()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = qc, d = Jc;
				if (qc = u || a, Jc = d || l, ll(t, e), Jc = d, qc = u, fl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || qc || Jc || hl(e)), n = null, t = e;;) {
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
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? ef(m, !0) : ef(l.stateNode, !1);
							} catch (e) {
								Uu(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, cl(e, n))));
				break;
			case 19:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ll(t, e), fl(e);
		}
	}
	function fl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Hc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Gc(e, Uc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Mt(o, ""), n.flags &= -33), Gc(e, Uc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Wc(e, Uc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Uu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function pl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			pl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function ml(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) $c(e, t.alternate, t), t = t.sibling;
	}
	function hl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Fc(4, t, t.return), hl(t);
					break;
				case 1:
					zc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Lc(t, t.return, n), hl(t);
					break;
				case 27: mf(t.stateNode);
				case 26:
				case 5:
					zc(t, t.return), hl(t);
					break;
				case 22:
					t.memoizedState === null && hl(t);
					break;
				case 30:
					hl(t);
					break;
				default: hl(t);
			}
			e = e.sibling;
		}
	}
	function gl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					gl(i, a, n), Pc(4, a);
					break;
				case 1:
					if (gl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ra(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Ic(a), Rc(a, a.return);
					break;
				case 27: Kc(a);
				case 26:
				case 5:
					gl(i, a, n), n && r === null && o & 4 && Bc(a), Rc(a, a.return);
					break;
				case 12:
					gl(i, a, n);
					break;
				case 31:
					gl(i, a, n), n && o & 4 && al(i, a);
					break;
				case 13:
					gl(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 22:
					a.memoizedState === null && gl(i, a, n), Rc(a, a.return);
					break;
				case 30: break;
				default: gl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function _l(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Zi(n));
	}
	function vl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e));
	}
	function yl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) bl(e, t, n, r), t = t.sibling;
	}
	function bl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, t, n, r), i & 2048 && Pc(9, t);
				break;
			case 1:
				yl(e, t, n, r);
				break;
			case 3:
				yl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e)));
				break;
			case 12:
				if (i & 2048) {
					yl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else yl(e, t, n, r);
				break;
			case 31:
				yl(e, t, n, r);
				break;
			case 13:
				yl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? yl(e, t, n, r) : (a._visibility |= 2, xl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? yl(e, t, n, r) : Sl(e, t), i & 2048 && _l(o, t);
				break;
			case 24:
				yl(e, t, n, r), i & 2048 && vl(t.alternate, t);
				break;
			default: yl(e, t, n, r);
		}
	}
	function xl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					xl(a, o, s, c, i), Pc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, xl(a, o, s, c, i)) : u._visibility & 2 ? xl(a, o, s, c, i) : Sl(a, o), i && l & 2048 && _l(o.alternate, o);
					break;
				case 24:
					xl(a, o, s, c, i), i && l & 2048 && vl(o.alternate, o);
					break;
				default: xl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Sl(n, r), i & 2048 && _l(r.alternate, r);
					break;
				case 24:
					Sl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				default: Sl(n, r);
			}
			t = t.sibling;
		}
	}
	var Cl = 8192;
	function wl(e, t, n) {
		if (e.subtreeFlags & Cl) for (e = e.child; e !== null;) Tl(e, t, n), e = e.sibling;
	}
	function Tl(e, t, n) {
		switch (e.tag) {
			case 26:
				wl(e, t, n), e.flags & Cl && e.memoizedState !== null && Kf(n, ul, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				wl(e, t, n);
				break;
			case 3:
			case 4:
				var r = ul;
				ul = _f(e.stateNode.containerInfo), wl(e, t, n), ul = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Cl, Cl = 16777216, wl(e, t, n), Cl = r) : wl(e, t, n));
				break;
			default: wl(e, t, n);
		}
	}
	function El(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ol(e), e = e.sibling;
	}
	function Ol(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e), e.flags & 2048 && Fc(9, e, e.return);
				break;
			case 3:
				Dl(e);
				break;
			case 12:
				Dl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, kl(e)) : Dl(e);
				break;
			default: Dl(e);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, t, t.return), kl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, kl(t));
					break;
				default: kl(t);
			}
			e = e.sibling;
		}
	}
	function Al(e, t) {
		for (; Zc !== null;) {
			var n = Zc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, n, t);
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
			if (r = n.child, r !== null) r.return = n, Zc = r;
			else a: for (n = e; Zc !== null;) {
				r = Zc;
				var i = r.sibling, a = r.return;
				if (el(r), r === n) {
					Zc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Zc = i;
					break a;
				}
				Zc = a;
			}
		}
	}
	var jl = {
		getCacheForType: function(e) {
			var t = Ui(Yi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ui(Yi).controller.signal;
		}
	}, Ml = typeof WeakMap == "function" ? WeakMap : Map, Nl = 0, Pl = null, Fl = null, Il = 0, Ll = 0, Rl = null, zl = !1, Bl = !1, Vl = !1, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = null, Xl = null, Zl = !1, Ql = 0, $l = 0, eu = Infinity, tu = null, nu = null, ru = 0, iu = null, au = null, ou = 0, su = 0, cu = null, lu = null, uu = 0, du = null;
	function fu() {
		return Nl & 2 && Il !== 0 ? Il & -Il : I.T === null ? Je() : ud();
	}
	function pu() {
		if (ql === 0) if (!(Il & 536870912) || Si) {
			var e = Pe;
			Pe <<= 1, !(Pe & 3932160) && (Pe = 262144), ql = e;
		} else ql = 536870912;
		return e = Ga.current, e !== null && (e.flags |= 32), ql;
	}
	function mu(e, t, n) {
		(e === Pl && (Ll === 2 || Ll === 9) || e.cancelPendingCommit !== null) && (xu(e, 0), vu(e, Il, ql, !1)), Ve(e, n), (!(Nl & 2) || e !== Pl) && (e === Pl && (!(Nl & 2) && (Gl |= n), Ul === 4 && vu(e, Il, ql, !1)), nd(e));
	}
	function hu(e, t, n) {
		if (Nl & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Re(e, t), a = r ? ku(e, t) : Du(e, t, !0), o = r;
		do {
			if (a === 0) {
				Bl && !r && vu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !_u(n)) {
				a = Du(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Yl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (xu(c, s).flags |= 256), s = Du(c, s, !1), s !== 2) {
							if (Vl && !l) {
								c.errorRecoveryDisabledLanes |= o, Gl |= o, a = 4;
								break a;
							}
							o = Xl, Xl = a, o !== null && (Xl === null ? Xl = o : Xl.push.apply(Xl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				xu(e, 0), vu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						vu(r, t, ql, !zl);
						break a;
					case 2:
						Xl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = Ql + 300 - ve(), 10 < a)) {
					if (vu(r, t, ql, !zl), Le(r, 0, !0) !== 0) break a;
					ou = t, r.timeoutHandle = qd(gu.bind(null, r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, "Throttled", -0, 0), a);
					break a;
				}
				gu(r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, null, -0, 0);
			}
			break;
		} while (1);
		nd(e);
	}
	function gu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Bt
			}, Tl(t, a, d);
			var m = (a & 62914560) === a ? Ql - ve() : (a & 4194048) === a ? $l - ve() : 0;
			if (m = Jf(d, m), m !== null) {
				ou = a, e.cancelPendingCommit = m(Iu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), vu(e, a, o, !l);
				return;
			}
		}
		Iu(e, t, a, n, r, i, o, s, c);
	}
	function _u(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!lr(a(), i)) return !1;
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
	function vu(e, t, n, r) {
		t &= ~Kl, t &= ~Gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ae(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Ue(e, n, t);
	}
	function yu() {
		return Nl & 6 ? !0 : (rd(0, !1), !1);
	}
	function bu() {
		if (Fl !== null) {
			if (Ll === 0) var e = Fl.return;
			else e = Fl, Fi = Pi = null, bo(e), ba = null, xa = 0, e = Fl;
			for (; e !== null;) Nc(e.alternate, e), e = e.return;
			Fl = null;
		}
	}
	function xu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ou = 0, bu(), Pl = e, Fl = n = Zr(e.current, null), Il = t, Ll = 0, Rl = null, zl = !1, Bl = Re(e, t), Vl = !1, Jl = ql = Kl = Gl = Wl = Ul = 0, Xl = Yl = null, Zl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ae(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Hl = t, Vr(), n;
	}
	function Su(e, t) {
		to = null, I.H = As, t === ua || t === fa ? (t = va(), Ll = 3) : t === da ? (t = va(), Ll = 4) : Ll = t === Js ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Rl = t, Fl === null && (Ul = 1, Hs(e, ai(t, e.current)));
	}
	function Cu() {
		var e = Ga.current;
		return e === null ? !0 : (Il & 4194048) === Il ? Ka === null : (Il & 62914560) === Il || Il & 536870912 ? e === Ka : !1;
	}
	function wu() {
		var e = I.H;
		return I.H = As, e === null ? As : e;
	}
	function Tu() {
		var e = I.A;
		return I.A = jl, e;
	}
	function Eu() {
		Ul = 4, zl || (Il & 4194048) !== Il && Ga.current !== null || (Bl = !0), !(Wl & 134217727) && !(Gl & 134217727) || Pl === null || vu(Pl, Il, ql, !1);
	}
	function Du(e, t, n) {
		var r = Nl;
		Nl |= 2;
		var i = wu(), a = Tu();
		(Pl !== e || Il !== t) && (tu = null, xu(e, t)), t = !1;
		var o = Ul;
		a: do
			try {
				if (Ll !== 0 && Fl !== null) {
					var s = Fl, c = Rl;
					switch (Ll) {
						case 8:
							bu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ga.current === null && (t = !0);
							var l = Ll;
							if (Ll = 0, Rl = null, Nu(e, s, c, l), n && Bl) {
								o = 0;
								break a;
							}
							break;
						default: l = Ll, Ll = 0, Rl = null, Nu(e, s, c, l);
					}
				}
				Ou(), o = Ul;
				break;
			} catch (t) {
				Su(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Fi = Pi = null, Nl = r, I.H = i, I.A = a, Fl === null && (Pl = null, Il = 0, Vr()), o;
	}
	function Ou() {
		for (; Fl !== null;) ju(Fl);
	}
	function ku(e, t) {
		var n = Nl;
		Nl |= 2;
		var r = wu(), a = Tu();
		Pl !== e || Il !== t ? (tu = null, eu = ve() + 500, xu(e, t)) : Bl = Re(e, t);
		a: do
			try {
				if (Ll !== 0 && Fl !== null) {
					t = Fl;
					var o = Rl;
					b: switch (Ll) {
						case 1:
							Ll = 0, Rl = null, Nu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ma(o)) {
								Ll = 0, Rl = null, Mu(t);
								break;
							}
							t = function() {
								Ll !== 2 && Ll !== 9 || Pl !== e || (Ll = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Ll = 7;
							break a;
						case 4:
							Ll = 5;
							break a;
						case 7:
							ma(o) ? (Ll = 0, Rl = null, Mu(t)) : (Ll = 0, Rl = null, Nu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Fl.tag) {
								case 26: s = Fl.memoizedState;
								case 5:
								case 27:
									var c = Fl;
									if (s ? Gf(s) : c.stateNode.complete) {
										Ll = 0, Rl = null;
										var l = c.sibling;
										if (l !== null) Fl = l;
										else {
											var u = c.return;
											u === null ? Fl = null : (Fl = u, Pu(u));
										}
										break b;
									}
							}
							Ll = 0, Rl = null, Nu(e, t, o, 5);
							break;
						case 6:
							Ll = 0, Rl = null, Nu(e, t, o, 6);
							break;
						case 8:
							bu(), Ul = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Au();
				break;
			} catch (t) {
				Su(e, t);
			}
		while (1);
		return Fi = Pi = null, I.H = r, I.A = a, Nl = n, Fl === null ? (Pl = null, Il = 0, Vr(), Ul) : 0;
	}
	function Au() {
		for (; Fl !== null && !ge();) ju(Fl);
	}
	function ju(e) {
		var t = wc(e.alternate, e, Hl);
		e.memoizedProps = e.pendingProps, t === null ? Pu(e) : Fl = t;
	}
	function Mu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = cc(n, t, t.pendingProps, t.type, void 0, Il);
				break;
			case 11:
				t = cc(n, t, t.pendingProps, t.type.render, t.ref, Il);
				break;
			case 5: bo(t);
			default: Nc(n, t), t = Fl = Qr(t, Hl), t = wc(n, t, Hl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Pu(e) : Fl = t;
	}
	function Nu(e, t, n, r) {
		Fi = Pi = null, bo(t), ba = null, xa = 0;
		var i = t.return;
		try {
			if (qs(e, i, t, n, Il)) {
				Ul = 1, Hs(e, ai(n, e.current)), Fl = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Fl = i, t;
			Ul = 1, Hs(e, ai(n, e.current)), Fl = null;
			return;
		}
		t.flags & 32768 ? (Si || r === 1 ? e = !0 : Bl || Il & 536870912 ? e = !1 : (zl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ga.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Fu(t, e)) : Pu(t);
	}
	function Pu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Fu(t, zl);
				return;
			}
			e = t.return;
			var n = jc(t.alternate, t, Hl);
			if (n !== null) {
				Fl = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Fl = t;
				return;
			}
			Fl = t = e;
		} while (t !== null);
		Ul === 0 && (Ul = 5);
	}
	function Fu(e, t) {
		do {
			var n = Mc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Fl = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Fl = e;
				return;
			}
			Fl = e = n;
		} while (e !== null);
		Ul = 6, Fl = null;
	}
	function Iu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (ru !== 0);
		if (Nl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Br, He(e, n, o, s, c, l), e === Pl && (Fl = Pl = null, Il = 0), au = t, iu = e, ou = n, su = o, cu = a, lu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(Se, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = I.T, I.T = null, a = L.p, L.p = 2, s = Nl, Nl |= 4;
				try {
					Qc(e, t, n);
				} finally {
					Nl = s, L.p = a, I.T = r;
				}
			}
			ru = 1, Lu(), Q(), Ru();
		}
	}
	function Lu() {
		if (ru === 1) {
			ru = 0;
			var e = iu, t = au, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					dl(t, e);
					var a = Bd, o = mr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && pr(s.ownerDocument.documentElement, s)) {
						if (c !== null && hr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = fr(s, h), v = fr(s, g);
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
					cp = !!zd, Bd = zd = null;
				} finally {
					Nl = i, L.p = r, I.T = n;
				}
			}
			e.current = t, ru = 2;
		}
	}
	function Q() {
		if (ru === 2) {
			ru = 0;
			var e = iu, t = au, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					$c(e, t.alternate, t);
				} finally {
					Nl = i, L.p = r, I.T = n;
				}
			}
			ru = 3;
		}
	}
	function Ru() {
		if (ru === 4 || ru === 3) {
			ru = 0, _e();
			var e = iu, t = au, n = ou, r = lu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? ru = 5 : (ru = 0, au = iu = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (nu = null), qe(n), t = t.stateNode, Oe && typeof Oe.onCommitFiberRoot == "function") try {
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
			ou & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === du ? uu++ : (uu = 0, du = e) : uu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Zi(t)));
	}
	function Bu() {
		return Lu(), Q(), Ru(), Vu();
	}
	function Vu() {
		if (ru !== 5) return !1;
		var e = iu, t = su;
		su = 0;
		var n = qe(ou), r = I.T, a = L.p;
		try {
			L.p = 32 > n ? 32 : n, I.T = null, n = cu, cu = null;
			var o = iu, s = ou;
			if (ru = 0, au = iu = null, ou = 0, Nl & 6) throw Error(i(331));
			var c = Nl;
			if (Nl |= 4, Ol(o.current), bl(o, o.current, s, n), Nl = c, rd(0, !1), Oe && typeof Oe.onPostCommitFiberRoot == "function") try {
				Oe.onPostCommitFiberRoot(De, o);
			} catch {}
			return !0;
		} finally {
			L.p = a, I.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = ai(n, t), t = Ws(e.stateNode, t, 2), e = Ma(e, t, 2), e !== null && (Ve(e, 2), nd(e));
	}
	function Uu(e, t, n) {
		if (e.tag === 3) Hu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Hu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (nu === null || !nu.has(r))) {
					e = ai(n, e), n = Gs(2), r = Ma(t, n, 2), r !== null && (Ks(n, r, t, e), Ve(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ml();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Vl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pl === e && (Il & n) === n && (Ul === 4 || Ul === 3 && (Il & 62914560) === Il && 300 > ve() - Ql ? !(Nl & 2) && xu(e, 0) : Kl |= n, Jl === Il && (Jl = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = q()), e = Wr(e, t), e !== null && (Ve(e, t), nd(e));
	}
	function qu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ku(e, n);
	}
	function Ju(e, t) {
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
		r !== null && r.delete(t), Ku(e, n);
	}
	function Yu(e, t) {
		return me(e, t);
	}
	var Xu = null, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0;
	function nd(e) {
		e !== Zu && e.next === null && (Zu === null ? Xu = Zu = e : Zu = Zu.next = e), $u = !0, Qu || (Qu = !0, ld());
	}
	function rd(e, t) {
		if (!ed && $u) {
			ed = !0;
			do
				for (var n = !1, r = Xu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ae(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Il, a = Le(r, r === Pl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Re(r, a) || (n = !0, cd(r, a));
					r = r.next;
				}
			while (n);
			ed = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		$u = Qu = !1;
		var e = 0;
		td !== 0 && Kd() && (e = td);
		for (var t = ve(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		ru !== 0 && ru !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ae(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Pl, n = Il, n = Le(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Ll === 2 || Ll === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && he(r), e.callbackNode = null, e.callbackPriority = 0;
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
			return r = sd.bind(null, e), n = me(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && he(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (ru !== 0 && ru !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Il;
		return r = Le(e, e === Pl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (hu(e, r, t), od(e, ve()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		hu(e, t, !0);
	}
	function ld() {
		Xd(function() {
			Nl & 6 ? me(be, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ea;
			e === 0 && (e = Ne, Ne <<= 1, !(Ne & 261888) && (Ne = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[Qe] || null).action), o = r.submitter;
			o && (t = (t = o[Qe] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new cn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								gs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), gs(n, {
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
	for (var md = 0; md < Fr.length; md++) {
		var hd = Fr[md];
		Ir(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Ir(Dr, "onAnimationEnd"), Ir(Or, "onAnimationIteration"), Ir(kr, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Ar, "onTransitionRun"), Ir(jr, "onTransitionStart"), Ir(Mr, "onTransitionCancel"), Ir(Nr, "onTransitionEnd"), ft("onMouseEnter", ["mouseout", "mouseover"]), ft("onMouseLeave", ["mouseout", "mouseover"]), ft("onPointerEnter", ["pointerout", "pointerover"]), ft("onPointerLeave", ["pointerout", "pointerover"]), dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), dt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
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
	function yd(e, t) {
		var n = t[et];
		n === void 0 && (n = t[et] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, lt.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (hp(t)) {
			case 2:
				var i = lp;
				break;
			case 8:
				i = up;
				break;
			default: i = dp;
		}
		n = i.bind(null, t, n, e), i = void 0, !Xt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
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
		qt(function() {
			var r = a, i = Ht(n), s = [];
			a: {
				var c = Pr.get(e);
				if (c !== void 0) {
					var l = cn, u = e;
					switch (e) {
						case "keypress": if (nn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = En;
							break;
						case "focusin":
							u = "focus", l = _n;
							break;
						case "focusout":
							u = "blur", l = _n;
							break;
						case "beforeblur":
						case "afterblur":
							l = _n;
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
							l = hn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = gn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = On;
							break;
						case Dr:
						case Or:
						case kr:
							l = vn;
							break;
						case Nr:
							l = kn;
							break;
						case "scroll":
						case "scrollend":
							l = un;
							break;
						case "wheel":
							l = An;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = yn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Dn;
							break;
						case "toggle":
						case "beforetoggle": l = jn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Jt(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Vt && (u = n.relatedTarget || n.fromElement) && (Y(u) || u[$e])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Y(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = hn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Dn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ot(l), h = u == null ? c : ot(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, Y(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ot(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Zn;
					else if (Gn(c)) if (Qn) v = sr;
					else {
						v = ar;
						var y = ir;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && It(r.elementType) && (v = Zn) : v = or;
					if (v &&= v(e, r)) {
						Kn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ot(c, "number", c.value);
				}
				switch (y = r ? ot(r) : window, e) {
					case "focusin":
						(Gn(y) || y.contentEditable === "true") && (_r = y, vr = r, yr = null);
						break;
					case "focusout":
						yr = vr = _r = null;
						break;
					case "mousedown":
						br = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						br = !1, xr(s, n, i);
						break;
					case "selectionchange": if (gr) break;
					case "keydown":
					case "keyup": xr(s, n, i);
				}
				var b;
				if (Nn) b: {
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
				else Vn ? zn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (In && n.locale !== "ko" && (Vn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Vn && (b = tn()) : (Qt = i, $t = "value" in Qt ? Qt.value : Qt.textContent, Vn = !0)), y = Ed(r, x), 0 < y.length && (x = new bn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Bn(n), b !== null && (x.data = b)))), (b = Fn ? Hn(e, n) : Un(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new bn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Jt(e, n), i != null && r.unshift(Td(e, i, a)), i = Jt(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Jt(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = Jt(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Mt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Mt(e, "" + r);
				break;
			case "className":
				_t(e, "class", r);
				break;
			case "tabIndex":
				_t(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				_t(e, n, r);
				break;
			case "style":
				Ft(e, r, o);
				break;
			case "data": if (t !== "object") {
				_t(e, "data", r);
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
				r = zt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Nd(e, t, "name", a.name, a, null), Nd(e, t, "formEncType", a.formEncType, a, null), Nd(e, t, "formMethod", a.formMethod, a, null), Nd(e, t, "formTarget", a.formTarget, a, null)) : (Nd(e, t, "encType", a.encType, a, null), Nd(e, t, "method", a.method, a, null), Nd(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = zt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Bt);
				break;
			case "onScroll":
				r != null && yd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && yd("scrollend", e);
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
				n = zt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				yd("beforetoggle", e), yd("toggle", e), gt(e, "popover", r);
				break;
			case "xlinkActuate":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Z(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Z(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Z(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Z(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				gt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Lt.get(n) || n, gt(e, n, r));
		}
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Ft(e, r, o);
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
				typeof r == "string" ? Mt(e, r) : (typeof r == "number" || typeof r == "bigint") && Mt(e, "" + r);
				break;
			case "onScroll":
				r != null && yd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && yd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Bt);
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
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : gt(e, n, r);
			}
		}
	}
	function Fd(e, t, n) {
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
				yd("error", e), yd("load", e);
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
						default: Nd(e, t, o, s, n, null);
					}
				}
				a && Nd(e, t, "srcSet", n.srcSet, n, null), r && Nd(e, t, "src", n.src, n, null);
				return;
			case "input":
				yd("invalid", e);
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
						default: Nd(e, t, r, d, n, null);
					}
				}
				Dt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in yd("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Nd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && kt(e, !!r, n, !0) : kt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in yd("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: Nd(e, t, s, c, n, null);
				}
				jt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Nd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				yd("beforetoggle", e), yd("toggle", e), yd("cancel", e), yd("close", e);
				break;
			case "iframe":
			case "object":
				yd("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) yd(gd[r], e);
				break;
			case "image":
				yd("error", e), yd("load", e);
				break;
			case "details":
				yd("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": yd("error", e), yd("load", e);
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
					default: Nd(e, t, u, r, n, null);
				}
				return;
			default: if (It(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Pd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Nd(e, t, c, r, n, null));
	}
	function Id(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || Nd(e, t, m, null, r, f);
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
						default: m !== f && Nd(e, t, p, m, r, f);
					}
				}
				Et(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Nd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Nd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? kt(e, !!n, n ? [] : "", !1) : kt(e, !!n, t, !0)) : kt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Nd(e, t, c, null, r, a);
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
					default: a !== o && Nd(e, t, s, a, r, o);
				}
				At(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Nd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Nd(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Nd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Nd(e, t, u, p, r, m);
				}
				return;
			default: if (It(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Pd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Pd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Nd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Nd(e, t, f, p, r, m);
	}
	function Ld(e) {
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
	function Rd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Ld(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Ld(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var zd = null, Bd = null;
	function Vd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Hd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Ud(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Wd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Gd = null;
	function Kd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Gd && (Gd = e, !0) : (Gd = null, !1);
	}
	var qd = typeof setTimeout == "function" ? setTimeout : void 0, Jd = typeof clearTimeout == "function" ? clearTimeout : void 0, Yd = typeof Promise == "function" ? Promise : void 0, Xd = typeof queueMicrotask == "function" ? queueMicrotask : Yd === void 0 ? qd : function(e) {
		return Yd.resolve(null).then(e).catch(Zd);
	};
	function Zd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Qd(e) {
		return e === "head";
	}
	function $d(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Pp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") mf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, mf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[J] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && mf(e.ownerDocument.body);
			n = i;
		} while (n);
		Pp(t);
	}
	function ef(e, t) {
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
	function tf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					tf(n), it(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function nf(e, t, n, r) {
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
			if (e = lf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function rf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function of(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cf(e, t) {
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
	function lf(e) {
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
	var uf = null;
	function df(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function ff(e) {
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
	function pf(e, t, n) {
		switch (t = Vd(n), e) {
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
	function mf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		it(e);
	}
	var hf = /* @__PURE__ */ new Map(), gf = /* @__PURE__ */ new Set();
	function _f(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var vf = L.d;
	L.d = {
		f: yf,
		r: bf,
		D: Cf,
		C: wf,
		L: Tf,
		m: Ef,
		X: Of,
		S: Df,
		M: kf
	};
	function yf() {
		var e = vf.f(), t = yu();
		return e || t;
	}
	function bf(e) {
		var t = at(e);
		t !== null && t.tag === 5 && t.type === "form" ? vs(t) : vf.r(e);
	}
	var xf = typeof document > "u" ? null : document;
	function Sf(e, t, n) {
		var r = xf;
		if (r && typeof t == "string" && t) {
			var i = Tt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), gf.has(i) || (gf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), ct(t), r.head.appendChild(t)));
		}
	}
	function Cf(e) {
		vf.D(e), Sf("dns-prefetch", e, null);
	}
	function wf(e, t) {
		vf.C(e, t), Sf("preconnect", e, t);
	}
	function Tf(e, t, n) {
		vf.L(e, t, n);
		var r = xf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Tt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Tt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Tt(n.imageSizes) + "\"]")) : i += "[href=\"" + Tt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = jf(e);
					break;
				case "script": a = Ff(e);
			}
			hf.has(a) || (e = m({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), hf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Mf(a)) || t === "script" && r.querySelector(If(a)) || (t = r.createElement("link"), Fd(t, "link", e), ct(t), r.head.appendChild(t)));
		}
	}
	function Ef(e, t) {
		vf.m(e, t);
		var n = xf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Tt(r) + "\"][href=\"" + Tt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Ff(e);
			}
			if (!hf.has(a) && (e = m({
				rel: "modulepreload",
				href: e
			}, t), hf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(If(a))) return;
				}
				r = n.createElement("link"), Fd(r, "link", e), ct(r), n.head.appendChild(r);
			}
		}
	}
	function Df(e, t, n) {
		vf.S(e, t, n);
		var r = xf;
		if (r && e) {
			var i = st(r).hoistableStyles, a = jf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Mf(a))) s.loading = 5;
				else {
					e = m({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = hf.get(a)) && zf(e, n);
					var c = o = r.createElement("link");
					ct(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Rf(o, t, r);
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
	function Of(e, t) {
		vf.X(e, t);
		var n = xf;
		if (n && e) {
			var r = st(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = m({
				src: e,
				async: !0
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), ct(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t) {
		vf.M(e, t);
		var n = xf;
		if (n && e) {
			var r = st(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = m({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), ct(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Af(e, t, n, r) {
		var a = (a = ee.current) ? _f(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = jf(n.href), n = st(a).hoistableStyles, r = n.get(t), r || (r = {
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
					e = jf(n.href);
					var o = st(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Mf(e))) && !o._p && (s.instance = o, s.state.loading = 5), hf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, hf.set(e, n), o || Pf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ff(n), n = st(a).hoistableScripts, r = n.get(t), r || (r = {
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
	function jf(e) {
		return "href=\"" + Tt(e) + "\"";
	}
	function Mf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Nf(e) {
		return m({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Pf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), ct(t), e.head.appendChild(t));
	}
	function Ff(e) {
		return "[src=\"" + Tt(e) + "\"]";
	}
	function If(e) {
		return "script[async]" + e;
	}
	function Lf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Tt(n.href) + "\"]");
				if (r) return t.instance = r, ct(r), r;
				var a = m({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ct(r), Fd(r, "style", a), Rf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = jf(n.href);
				var o = e.querySelector(Mf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ct(o), o;
				r = Nf(n), (a = hf.get(a)) && zf(r, a), o = (e.ownerDocument || e).createElement("link"), ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Rf(o, n.precedence, e), t.instance = o;
			case "script": return o = Ff(n.src), (a = e.querySelector(If(o))) ? (t.instance = a, ct(a), a) : (r = n, (a = hf.get(o)) && (r = m({}, n), Bf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ct(a), Fd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Rf(r, n.precedence, e));
		return t.instance;
	}
	function Rf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Bf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Vf = null;
	function Hf(e, t, n) {
		if (Vf === null) {
			var r = /* @__PURE__ */ new Map(), i = Vf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Vf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
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
	function Uf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Wf(e, t, n) {
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
	function Gf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Kf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = jf(r.href), a = t.querySelector(Mf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Yf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Nf(r), (i = hf.get(i)) && zf(r, i), a = a.createElement("link"), ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Fd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Yf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var qf = 0;
	function Jf(e, t) {
		return e.stylesheets && e.count === 0 && Zf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && qf === 0 && (qf = 62500 * Rd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > qf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Yf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Zf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Xf = null;
	function Zf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Xf = /* @__PURE__ */ new Map(), t.forEach(Qf, e), Xf = null, Yf.call(e));
	}
	function Qf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Xf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Xf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Yf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var $f = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: R,
		_currentValue2: R,
		_threadCount: 0
	};
	function ep(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Be(0), this.hiddenUpdates = Be(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function tp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ep(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Yr(3, null, null, t), e.current = a, a.stateNode = e, t = Xi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ka(a), e;
	}
	function np(e) {
		return e ? (e = qr, e) : qr;
	}
	function rp(e, t, n, r, i, a) {
		i = np(i), r.context === null ? r.context = i : r.pendingContext = i, r = ja(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ma(e, r, t), n !== null && (mu(n, e, t), Na(n, e, t));
	}
	function ip(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ap(e, t) {
		ip(e, t), (e = e.alternate) && ip(e, t);
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Wr(e, 67108864);
			t !== null && mu(t, e, 67108864), ap(e, 67108864);
		}
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = fu();
			t = Ke(t);
			var n = Wr(e, t);
			n !== null && mu(n, e, t), ap(e, t);
		}
	}
	var cp = !0;
	function lp(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 2, dp(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function up(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 8, dp(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function dp(e, t, n, r) {
		if (cp) {
			var i = fp(r);
			if (i === null) wd(e, t, r, pp, n), wp(e, r);
			else if (Ep(i, e, t, n, r)) r.stopPropagation();
			else if (wp(e, r), t & 4 && -1 < Cp.indexOf(e)) {
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
									nd(a), !(Nl & 6) && (eu = ve() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Wr(a, 2), s !== null && mu(s, a, 2), yu(), ap(a, 2);
					}
					if (a = fp(r), a === null && wd(e, t, r, pp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function fp(e) {
		return e = Ht(e), mp(e);
	}
	var pp = null;
	function mp(e) {
		if (pp = null, e = Y(e), e !== null) {
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
		return pp = e, null;
	}
	function hp(e) {
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
	var gp = !1, _p = null, vp = null, yp = null, bp = /* @__PURE__ */ new Map(), xp = /* @__PURE__ */ new Map(), Sp = [], Cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function wp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				_p = null;
				break;
			case "dragenter":
			case "dragleave":
				vp = null;
				break;
			case "mouseover":
			case "mouseout":
				yp = null;
				break;
			case "pointerover":
			case "pointerout":
				bp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": xp.delete(t.pointerId);
		}
	}
	function Tp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = at(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ep(e, t, n, r, i) {
		switch (t) {
			case "focusin": return _p = Tp(_p, e, t, n, r, i), !0;
			case "dragenter": return vp = Tp(vp, e, t, n, r, i), !0;
			case "mouseover": return yp = Tp(yp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return bp.set(a, Tp(bp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, xp.set(a, Tp(xp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Dp(e) {
		var t = Y(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							sp(n);
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
	function Op(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = fp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Vt = r, n.target.dispatchEvent(r), Vt = null;
			} else return t = at(n), t !== null && op(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function kp(e, t, n) {
		Op(e) && n.delete(t);
	}
	function Ap() {
		gp = !1, _p !== null && Op(_p) && (_p = null), vp !== null && Op(vp) && (vp = null), yp !== null && Op(yp) && (yp = null), bp.forEach(kp), xp.forEach(kp);
	}
	function jp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, gp || (gp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Ap)));
	}
	var Mp = null;
	function Np(e) {
		Mp !== e && (Mp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Mp === e && (Mp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (mp(r || n) === null) continue;
					break;
				}
				var a = at(n);
				a !== null && (e.splice(t, 3), t -= 3, gs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Pp(e) {
		function t(t) {
			return jp(t, e);
		}
		_p !== null && jp(_p, e), vp !== null && jp(vp, e), yp !== null && jp(yp, e), bp.forEach(t), xp.forEach(t);
		for (var n = 0; n < Sp.length; n++) {
			var r = Sp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Sp.length && (n = Sp[0], n.blockedOn === null);) Dp(n), n.blockedOn === null && Sp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Qe] || null;
			if (typeof a == "function") o || Np(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Qe] || null) s = o.formAction;
					else if (mp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Np(n);
			}
		}
	}
	function Fp() {
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
	function Ip(e) {
		this._internalRoot = e;
	}
	Lp.prototype.render = Ip.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		rp(n, fu(), e, t, null, null);
	}, Lp.prototype.unmount = Ip.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			rp(e.current, 2, null, e, null, null), yu(), t[$e] = null;
		}
	};
	function Lp(e) {
		this._internalRoot = e;
	}
	Lp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Je();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Sp.length && t !== 0 && t < Sp[n].priority; n++);
			Sp.splice(n, 0, e), n === 0 && Dp(e);
		}
	};
	var Rp = n.version;
	if (Rp !== "19.2.8") throw Error(i(527, Rp, "19.2.8"));
	L.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var zp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: I,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Bp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Bp.isDisabled && Bp.supportsFiber) try {
			De = Bp.inject(zp), Oe = Bp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = zs, s = Bs, c = Vs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tp(e, 1, !1, null, null, n, r, null, o, s, c, Fp), e[$e] = t.current, Sd(e), new Ip(t);
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
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useControlled.mjs
function ut({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = C.useRef(e !== void 0), [a, o] = C.useState(t);
	return [i ? e : a, C.useCallback((e) => {
		i || o(e);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/safeReact.mjs
var dt = { ...C }, ft = {};
function pt(e, t) {
	let n = C.useRef(ft);
	return n.current === ft && (n.current = e(t)), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useStableCallback.mjs
var mt = dt.useInsertionEffect, ht = mt && mt !== dt.useLayoutEffect ? mt : (e) => e();
function X(e) {
	let t = pt(gt).current;
	return t.next = e, ht(t.effect), t.trampoline;
}
function gt() {
	let e = {
		next: void 0,
		callback: _t,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function _t() {}
var Z = typeof document < "u" ? C.useLayoutEffect : () => {}, vt = /*#__PURE__*/ C.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
function yt() {
	return C.useContext(vt);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function bt(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = X(i), o = C.useRef(0), s = pt(St).current, c = pt(xt).current, [l, u] = C.useState(0), d = C.useRef(l), f = X((e, t) => {
		c.set(e, t ?? null), d.current += 1, u(d.current);
	}), p = X((e) => {
		c.delete(e), d.current += 1, u(d.current);
	}), m = C.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return Array.from(c.keys()).filter((e) => e.isConnected).sort(Ct).forEach((t, n) => {
			let r = c.get(t) ?? {};
			e.set(t, {
				...r,
				index: n
			});
		}), e;
	}, [c, l]);
	Z(() => {
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
	}, [m]), Z(() => {
		d.current === l && (n.current.length !== m.size && (n.current.length = m.size), r && r.current.length !== m.size && (r.current.length = m.size), o.current = m.size), a(m);
	}, [
		a,
		m,
		n,
		r,
		l
	]), Z(() => () => {
		n.current = [];
	}, [n]), Z(() => () => {
		r && (r.current = []);
	}, [r]);
	let h = X((e) => (s.add(e), () => {
		s.delete(e);
	}));
	Z(() => {
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
	return /*#__PURE__*/ (0, Y.jsx)(vt.Provider, {
		value: g,
		children: t
	});
}
function xt() {
	return /* @__PURE__ */ new Map();
}
function St() {
	return /* @__PURE__ */ new Set();
}
function Ct(e, t) {
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var wt = /*#__PURE__*/ C.createContext(void 0);
function Tt() {
	return C.useContext(wt)?.direction ?? "ltr";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/formatErrorMessage.mjs
function Et(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var Dt = Et("https://base-ui.com/production-error", "Base UI"), Ot = /*#__PURE__*/ C.createContext(void 0);
function kt() {
	let e = C.useContext(Ot);
	if (e === void 0) throw Error(Dt(10));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useMergedRefs.mjs
function At(e, t, n, r) {
	let i = pt(Mt).current;
	return Nt(i, e, t, n, r) && Ft(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function jt(e) {
	let t = pt(Mt).current;
	return Pt(t, e) && Ft(t, e), t.callback;
}
function Mt() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function Nt(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function Pt(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function Ft(e, t) {
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
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/reactVersion.mjs
var It = 19;
function Lt(e) {
	return It >= e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getReactElementRef.mjs
function Rt(e) {
	if (!/*#__PURE__*/ C.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (Lt(19) ? n?.ref : t.ref) ?? null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeObjects.mjs
function zt(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/empty.mjs
function Bt() {}
var Vt = Object.freeze([]), Ht = Object.freeze({});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function Ut(e, t) {
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
function Wt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveStyle.mjs
function Gt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/merge-props/mergeProps.mjs
var Kt = {};
function qt(e, t, n, r, i) {
	if (!n && !r && !i && !e) return Yt(t);
	let a = Yt(e);
	return t && (a = Xt(a, t)), n && (a = Xt(a, n)), r && (a = Xt(a, r)), i && (a = Xt(a, i)), a;
}
function Jt(e) {
	if (e.length === 0) return Kt;
	if (e.length === 1) return Yt(e[0]);
	let t = Yt(e[0]);
	for (let n = 1; n < e.length; n += 1) t = Xt(t, e[n]);
	return t;
}
function Yt(e) {
	return en(e) ? { ...tn(e, Kt) } : Zt(e);
}
function Xt(e, t) {
	return en(t) ? tn(t, e) : Qt(e, t);
}
function Zt(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		$t(e, n) && (t[e] = rn(n));
	}
	return t;
}
function Qt(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = zt(e.style, r);
				break;
			case "className":
				e[n] = on(e.className, r);
				break;
			default: e[n] = $t(n, r) ? nn(e[n], r) : r;
		}
	}
	return e;
}
function $t(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function en(e) {
	return typeof e == "function";
}
function tn(e, t) {
	return en(e) ? e(t) : e ?? Kt;
}
function nn(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (sn(r)) {
			let i = r;
			an(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : rn(t) : e;
}
function rn(e) {
	return e && ((...t) => {
		let n = t[0];
		return sn(n) && an(n), e(...t);
	});
}
function an(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function on(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function sn(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useRenderElement.mjs
function cn(e, t, n = {}) {
	let r = t.render, i = ln(t, n);
	return n.enabled === !1 ? null : fn(e, r, i, n.state ?? Ht);
}
function ln(e, t = {}) {
	let { className: n, style: r, render: i } = e, { state: a = Ht, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? Wt(n, a) : void 0, d = l ? Gt(r, a) : void 0, f = l ? Ut(a, c) : Ht, p = l && s ? un(s) : void 0, m = l ? zt(f, p) ?? {} : Ht;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? jt([
		m.ref,
		Rt(i),
		...o
	]) : At(m.ref, Rt(i), o) : At(null, null)), l ? (u !== void 0 && (m.className = on(m.className, u)), d !== void 0 && (m.style = zt(m.style, d)), m) : Ht;
}
function un(e) {
	return Array.isArray(e) ? Jt(e) : qt(void 0, e);
}
var dn = Symbol.for("react.lazy");
function fn(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = qt(n, t.props);
		e.ref = n.ref;
		let i = t;
		return i?.$$typeof === dn && (i = C.Children.toArray(t)[0]), /*#__PURE__*/ C.cloneElement(i, e);
	}
	if (e && typeof e == "string") return pn(e, n);
	throw Error(Dt(8));
}
function pn(e, t) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/root/AccordionRoot.mjs
var mn = { value: () => null }, hn = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, hiddenUntilFound: a, keepMounted: o, loopFocus: s, onValueChange: c, multiple: l = !1, orientation: u = "vertical", value: d, defaultValue: f, style: p, ...m } = e, h = Tt(), g = C.useMemo(() => {
		if (d === void 0) return f ?? [];
	}, [d, f]), _ = C.useRef([]), [v, y] = ut({
		controlled: d,
		default: g,
		name: "Accordion",
		state: "value"
	}), b = X((e, t, n) => {
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
	]), w = cn("div", e, {
		state: x,
		ref: t,
		props: [{ dir: h }, m],
		stateAttributesMapping: mn
	});
	return /*#__PURE__*/ (0, Y.jsx)(Ot.Provider, {
		value: S,
		children: /*#__PURE__*/ (0, Y.jsx)(bt, {
			elementsRef: _,
			children: w
		})
	});
}), gn = 0;
function _n(e, t = "mui") {
	let [n, r] = C.useState(e), i = e || n;
	return C.useEffect(() => {
		n ?? (gn += 1, r(`${t}-${gn}`));
	}, [n, t]), i;
}
var vn = dt.useId;
function yn(e, t) {
	if (vn !== void 0) {
		let n = vn();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return _n(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useBaseUiId.mjs
function bn(e) {
	return yn(e, "base-ui");
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/reason-parts.mjs
var xn = "none", Sn = "trigger-press", Cn = "trigger-hover", wn = "trigger-focus", Tn = "outside-press", En = "item-press", Dn = "input-change", On = "focus-out", kn = "escape-key", An = "list-navigation", jn = "keyboard", Mn = "cancel-open", Nn = "sibling-open", Pn = "disabled", Fn = "missing", In = "initial", Ln = "imperative-action", Rn = "window-resize";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function zn(e, t, n, r) {
	let i = !1, a = !1, o = r ?? Ht;
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
function Bn(e, t, n) {
	let r = n ?? Ht;
	return {
		reason: e,
		event: t ?? new Event("base-ui"),
		...r
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnMount.mjs
var Vn = [];
function Hn(e) {
	C.useEffect(e, Vn);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useAnimationFrame.mjs
var Un = null;
globalThis.requestAnimationFrame;
var Wn = new class {
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
}(), Gn = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return Wn.request(e);
	}
	static cancel(e) {
		return Wn.cancel(e);
	}
	currentId = Un;
	request(e) {
		this.cancel(), this.currentId = Wn.request(() => {
			this.currentId = Un, e();
		});
	}
	cancel = () => {
		this.currentId !== Un && (Wn.cancel(this.currentId), this.currentId = Un);
	};
	disposeEffect = () => this.cancel;
};
function Kn() {
	let e = pt(Gn.create).current;
	return Hn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function qn(e, t = !1, n = !1) {
	let [r, i] = C.useState(e && t ? "idle" : void 0), [a, o] = C.useState(e);
	return e && !a && (o(!0), i("starting")), !e && a && r !== "ending" && !n && i("ending"), !e && !a && r === "ending" && i(void 0), Z(() => {
		if (!e && a && r !== "ending" && n) {
			let e = Gn.request(() => {
				i("ending");
			});
			return () => {
				Gn.cancel(e);
			};
		}
	}, [
		e,
		a,
		r,
		n
	]), Z(() => {
		if (!e || t) return;
		let n = Gn.request(() => {
			i(void 0);
		});
		return () => {
			Gn.cancel(n);
		};
	}, [t, e]), Z(() => {
		if (!e || !t) return;
		e && a && r !== "idle" && i("starting");
		let n = Gn.request(() => {
			i("idle");
		});
		return () => {
			Gn.cancel(n);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/root/useCollapsibleRoot.mjs
function Jn(e) {
	let { open: t, defaultOpen: n, onOpenChange: r, disabled: i } = e, [a, o] = ut({
		controlled: t,
		default: n,
		name: "Collapsible",
		state: "open"
	}), { mounted: s, setMounted: c, transitionStatus: l } = qn(a, !0, !0), u = bn(), [d, f] = C.useState(), p = d ?? u, m = X((e) => {
		let t = !a, n = zn(Sn, e.nativeEvent);
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
var Yn = /*#__PURE__*/ C.createContext(void 0);
function Xn() {
	let e = C.useContext(Yn);
	if (e === void 0) throw Error(Dt(15));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
var Zn = /*#__PURE__*/ function(e) {
	return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
}({});
function Qn(e = {}) {
	let { label: t, metadata: n, textRef: r, indexGuessBehavior: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, elementsRef: l, labelsRef: u, nextIndexRef: d } = yt(), f = C.useRef(-1), [p, m] = C.useState(a ?? (i === Zn.GuessFromOrder ? () => {
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
	return Z(() => {
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
	]), Z(() => {
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
var $n = /*#__PURE__*/ C.createContext(void 0);
function er() {
	let e = C.useContext($n);
	if (e === void 0) throw Error(Dt(9));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var tr = /*#__PURE__*/ function(e) {
	return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
}({}), nr = { [tr.startingStyle]: "" }, rr = { [tr.endingStyle]: "" }, ir = { transitionStatus(e) {
	return e === "starting" ? nr : e === "ending" ? rr : null;
} }, ar = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = tr.startingStyle] = "startingStyle", e[e.endingStyle = tr.endingStyle] = "endingStyle", e;
}({}), or = /*#__PURE__*/ function(e) {
	return e.panelOpen = "data-panel-open", e;
}({}), sr = { [ar.open]: "" }, cr = { [ar.closed]: "" }, lr = { open(e) {
	return e ? { [or.panelOpen]: "" } : null;
} }, ur = { open(e) {
	return e ? sr : cr;
} }, dr = /*#__PURE__*/ function(e) {
	return e.index = "data-index", e.disabled = "data-disabled", e.open = "data-open", e;
}({}), fr = {
	...ur,
	index: (e) => Number.isInteger(e) ? { [dr.index]: String(e) } : null,
	...ir,
	value: () => null
}, pr = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, onOpenChange: i, render: a, value: o, style: s, ...c } = e, { ref: l, index: u } = Qn(), d = At(t, l), { disabled: f, handleValueChange: p, state: m, value: h } = kt(), g = bn(), _ = o ?? g, v = r || f, y = C.useMemo(() => {
		if (!h) return !1;
		for (let e = 0; e < h.length; e += 1) if (h[e] === _) return !0;
		return !1;
	}, [h, _]), b = X((e, t) => {
		i?.(e, t), !t.isCanceled && p(_, e, t);
	}), x = Jn({
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
	]), E = bn(), [D, O] = C.useState(), k = C.useMemo(() => ({
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
	]), A = cn("div", e, {
		state: T,
		ref: d,
		props: c,
		stateAttributesMapping: fr
	});
	return /*#__PURE__*/ (0, Y.jsx)(Yn.Provider, {
		value: w,
		children: /*#__PURE__*/ (0, Y.jsx)($n.Provider, {
			value: k,
			children: A
		})
	});
}), mr = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = er();
	return cn("h3", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: fr
	});
});
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hr() {
	return typeof window < "u";
}
function gr(e) {
	return yr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function _r(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function vr(e) {
	return ((yr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function yr(e) {
	return hr() ? e instanceof Node || e instanceof _r(e).Node : !1;
}
function br(e) {
	return hr() ? e instanceof Element || e instanceof _r(e).Element : !1;
}
function xr(e) {
	return hr() ? e instanceof HTMLElement || e instanceof _r(e).HTMLElement : !1;
}
function Sr(e) {
	return !hr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof _r(e).ShadowRoot;
}
function Cr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Pr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function wr(e) {
	return /^(table|td|th)$/.test(gr(e));
}
function Tr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Er = /transform|translate|scale|rotate|perspective|filter/, Dr = /paint|layout|strict|content/, Or = (e) => !!e && e !== "none", kr;
function Ar(e) {
	let t = br(e) ? Pr(e) : e;
	return Or(t.transform) || Or(t.translate) || Or(t.scale) || Or(t.rotate) || Or(t.perspective) || !Mr() && (Or(t.backdropFilter) || Or(t.filter)) || Er.test(t.willChange || "") || Dr.test(t.contain || "");
}
function jr(e) {
	let t = Ir(e);
	for (; xr(t) && !Nr(t);) {
		if (Ar(t)) return t;
		if (Tr(t)) return null;
		t = Ir(t);
	}
	return null;
}
function Mr() {
	return kr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), kr;
}
function Nr(e) {
	return /^(html|body|#document)$/.test(gr(e));
}
function Pr(e) {
	return _r(e).getComputedStyle(e);
}
function Fr(e) {
	return br(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ir(e) {
	if (gr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Sr(e) && e.host || vr(e);
	return Sr(t) ? t.host : t;
}
function Lr(e) {
	let t = Ir(e);
	return Nr(t) ? (e.ownerDocument || e).body : xr(t) && Cr(t) ? t : Lr(t);
}
function Rr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Lr(e), i = r === e.ownerDocument?.body, a = _r(r);
	if (i) {
		let e = zr(a);
		return t.concat(a, a.visualViewport || [], Cr(r) ? r : [], e && n ? Rr(e) : []);
	}
	return t.concat(r, Rr(r, [], n));
}
function zr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
var Br = /*#__PURE__*/ C.createContext(void 0);
function Vr(e = !1) {
	let t = C.useContext(Br);
	if (t === void 0 && !e) throw Error(Dt(16));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Hr(e) {
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
function Ur(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = C.useRef(null), s = Vr(!0), c = a ?? s !== void 0, { props: l } = Hr({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = C.useCallback(() => {
		let e = o.current;
		Wr(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return Z(u, [u]), {
		getButtonProps: C.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return qt({
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
					if (t || (an(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let r = e.target === e.currentTarget, a = e.currentTarget, s = Wr(a), l = !i && Gr(a), u = r && (i ? s : !l), d = e.key === "Enter", f = e.key === " ", p = a.getAttribute("role"), m = p?.startsWith("menuitem") || p === "option" || p === "gridcell";
					if (r && c && f) {
						if (e.defaultPrevented && m) return;
						e.preventDefault(), l || i && s ? (a.click(), e.preventBaseUIHandler()) : u && (n?.(e), e.preventBaseUIHandler());
						return;
					}
					u && (!i && (f || d) && e.preventDefault(), !i && d && n?.(e));
				},
				onKeyUp(e) {
					if (!t) {
						if (an(e), a?.(e), e.target === e.currentTarget && i && c && Wr(e.currentTarget) && e.key === " ") {
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
		buttonRef: X((e) => {
			o.current = e, u();
		})
	};
}
function Wr(e) {
	return xr(e) && e.tagName === "BUTTON";
}
function Gr(e) {
	return !!(e?.tagName === "A" && e?.href);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/trigger/AccordionTrigger.mjs
var Kr = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { disabled: n, className: r, id: i, render: a, nativeButton: o = !0, style: s, ...c } = e, { panelId: l, open: u, handleTrigger: d, disabled: f } = Xn(), { getButtonProps: p, buttonRef: m } = Ur({
		disabled: n || f,
		focusableWhenDisabled: !0,
		native: o
	}), { state: h, setTriggerId: g, triggerId: _ } = er();
	return Z(() => (i && g(i), () => {
		g(void 0);
	}), [i, g]), cn("button", e, {
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
		stateAttributesMapping: lr
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/addEventListener.mjs
function qr(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useValueAsRef.mjs
function Jr(e) {
	let t = pt(Yr, e).current;
	return t.next = e, Z(t.effect), t;
}
function Yr(e) {
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
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/owner.mjs
function Xr(e) {
	return e?.ownerDocument || document;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveRef.mjs
function Zr(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
var Qr = /* @__PURE__ */ l(h(), 1);
function $r(e, t = !1, n = !0) {
	let r = Kn();
	return X((i, a = null) => {
		r.cancel();
		let o = Zr(e);
		if (o == null) return;
		let s = o, c = () => {
			Qr.flushSync(i);
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
			let e = tr.startingStyle;
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
function ei(e) {
	let { enabled: t = !0, open: n, ref: r, onComplete: i } = e, a = X(i), o = $r(r, n, !1);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/collapsible/panel/useCollapsiblePanel.mjs
var ti = {
	height: void 0,
	width: void 0
};
function ni(e) {
	let { externalRef: t, hiddenUntilFound: n, id: r, keepMounted: i, mounted: a, onOpenChange: o, open: s, setMounted: c, setOpen: l, transitionStatus: u } = e, d = C.useRef(null), f = C.useRef(null), [p, m] = C.useState(ti), h = C.useRef(ti), g = C.useRef(!1), _ = C.useRef(s), v = C.useRef(!1), [y, b] = C.useState(!1), x = C.useRef(null), S = At(t, d), w = Jr({
		mounted: a,
		open: s
	}), T = $r(d, !1, !1), E = !s && !a, D = y ? "idle" : u, O = s && (_.current || v.current), k = !s && a && f.current === "css-animation" && p.height === void 0 && p.width === void 0 ? h.current : p, A = n && E && f.current !== "css-animation", j = X((e, t = !0) => {
		t && (h.current = e), m(e);
	}), M = X(() => {
		x.current?.(), x.current = null;
	}), N = X((e) => {
		M(), x.current = () => {
			x.current = null, e();
		};
	}), P = X(() => {
		s && a && f.current === "css-animation" && (v.current = !0);
	});
	Z(() => {
		!y || u === "starting" || b(!1);
	}, [y, u]), C.useEffect(() => () => {
		P(), M();
	}, [P, M]), Z(() => {
		let e = d.current;
		if (!e) return;
		!s && x.current && M();
		let t = ii(e, O);
		if (f.current = t, s && u === "idle" && _.current && t === "css-animation") {
			h.current = ri(e);
			return;
		}
		if (s && u === "starting") {
			let n = g.current;
			if (g.current = !1, t === "none") {
				j(ri(e)), b(!0);
				return;
			}
			if (t === "css-transition") {
				let t = si(e);
				if (j(ri(e)), !n) return t;
				let r = oi(e, "transition-duration", "0s");
				return N(r), b(!0), t;
			}
			if (t === "css-animation") {
				if (j(ri(e)), !n) {
					oi(e, "animation-name", "none")();
					return;
				}
				let t = oi(e, "animation-name", "none"), r = oi(e, "animation-duration", "0s");
				t(), N(r), b(!0);
				return;
			}
		}
		if (!s && a && (u === "idle" || u === "starting")) {
			if (_.current = !1, v.current = !1, t === "none") {
				j(ti, !1), c(!1);
				return;
			}
			j(ri(e));
			return;
		}
		if (u !== "ending") return;
		if (t === "none") {
			c(!1);
			return;
		}
		let n = ri(e);
		if (!((n.height ?? 0) > 0 || (n.width ?? 0) > 0)) {
			c(!1);
			return;
		}
		j(n), t === "css-animation" && oi(e, "animation-name", "none")();
	}, [
		a,
		s,
		M,
		j,
		c,
		N,
		O,
		u
	]), ei({
		enabled: s && a && D === "idle",
		open: !0,
		ref: d,
		onComplete() {
			s && j(ti, !1);
		}
	}), C.useEffect(() => {
		if (s || !a || D !== "ending" || !d.current) return;
		let e = new AbortController(), t = -1;
		function n() {
			w.current.open || (c(!1), j(ti, !1));
		}
		return t = Gn.request(() => {
			e.signal.aborted || T(n, e.signal);
		}), () => {
			Gn.cancel(t), e.abort();
		};
	}, [
		w,
		a,
		s,
		D,
		T,
		j,
		c
	]), Z(() => {
		let e = d.current;
		!e || !n || !E || e.setAttribute("hidden", "until-found");
	}, [E, n]), C.useEffect(function() {
		let e = d.current;
		if (!e) return;
		function t(e) {
			let t = zn(xn, e);
			o(!0, t), !t.isCanceled && (g.current = !0, l(!0));
		}
		return qr(e, "beforematch", t);
	}, [o, l]);
	let F = i || n || a || s;
	return {
		height: k.height,
		props: {
			...A ? { [ar.startingStyle]: "" } : void 0,
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
function ri(e) {
	return {
		height: e.scrollHeight,
		width: e.scrollWidth
	};
}
function ii(e, t = !1) {
	let n = _r(e).getComputedStyle(e), r = (n.animationName.split(",").map((e) => e.trim()).some((e) => e !== "" && e !== "none") || t) && ai(n.animationDuration), i = ai(n.transitionDuration);
	return r && i || i ? "css-transition" : r ? "css-animation" : "none";
}
function ai(e) {
	return e.split(",").map((e) => e.trim()).some((e) => e !== "" && Number.parseFloat(e) > 0);
}
function oi(e, t, n) {
	let r = e.style.getPropertyValue(t), i = e.style.getPropertyPriority(t);
	return e.style.setProperty(t, n), () => {
		if (r === "") {
			e.style.removeProperty(t);
			return;
		}
		e.style.setProperty(t, r, i);
	};
}
function si(e) {
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
	let r = Gn.request(n);
	return () => {
		Gn.cancel(r), n();
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/accordion/panel/AccordionPanelCssVars.mjs
var ci = /*#__PURE__*/ function(e) {
	return e.accordionPanelHeight = "--accordion-panel-height", e.accordionPanelWidth = "--accordion-panel-width", e;
}({}), li = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, hiddenUntilFound: r, keepMounted: i, id: a, render: o, style: s, ...c } = e, { hiddenUntilFound: l, keepMounted: u } = kt(), { mounted: d, onOpenChange: f, open: p, panelId: m, setMounted: h, setOpen: g, setPanelIdState: _, transitionStatus: v } = Xn(), y = r ?? l, b = i ?? u;
	Z(() => {
		if (a) return _(a), () => {
			_(void 0);
		};
	}, [a, _]);
	let { height: x, props: S, ref: C, shouldPreventOpenAnimation: w, shouldRender: T, transitionStatus: E, width: D } = ni({
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
	}), { state: O, triggerId: k } = er(), A = {
		...O,
		transitionStatus: E
	}, j = Gt(s, A), M = cn("div", {
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
					[ci.accordionPanelHeight]: x === void 0 ? "auto" : `${x}px`,
					[ci.accordionPanelWidth]: D === void 0 ? "auto" : `${D}px`
				}
			},
			c,
			j ? { style: j } : void 0,
			w ? { style: { animationName: "none" } } : void 0
		],
		stateAttributesMapping: fr
	});
	return T ? M : null;
}), ui = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), di = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), fi = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), pi = (e) => {
	let t = fi(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, mi = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, hi = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, gi = (0, C.createContext)({}), _i = () => (0, C.useContext)(gi), vi = (0, C.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = _i() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, C.createElement)("svg", {
		ref: c,
		...mi,
		width: t ?? l ?? mi.width,
		height: t ?? l ?? mi.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: ui("lucide", p, i),
		...!a && !hi(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, C.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), yi = (e, t) => {
	let n = (0, C.forwardRef)(({ className: n, ...r }, i) => (0, C.createElement)(vi, {
		ref: i,
		iconNode: t,
		className: ui(`lucide-${di(pi(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = pi(e), n;
}, bi = yi("bold", [["path", {
	d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	key: "mg9rjx"
}]]), xi = yi("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Si = yi("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), Ci = yi("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), wi = yi("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), Ti = yi("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), Ei = yi("ellipsis", [
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
]), Di = yi("italic", [
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
]), Oi = yi("underline", [["path", {
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
function ki({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(hn, {
		"data-slot": "accordion",
		className: J("flex w-full flex-col", e),
		...t
	});
}
function Ai({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(pr, {
		"data-slot": "accordion-item",
		className: J("not-last:border-b", e),
		...t
	});
}
function ji({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(mr, {
		className: "flex",
		children: /* @__PURE__ */ (0, Y.jsxs)(Kr, {
			"data-slot": "accordion-trigger",
			className: J("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", e),
			...n,
			children: [
				t,
				/* @__PURE__ */ (0, Y.jsx)(Si, { className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" }),
				/* @__PURE__ */ (0, Y.jsx)(Ti, { className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" })
			]
		})
	});
}
function Mi({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(li, {
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
function Ni(e, t) {
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
function Pi(e, t) {
	return Object.is(e, t) ? !0 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((e, n) => Object.is(e, t[n])) : !1;
}
function Fi(e, t) {
	let [n, r] = (0, C.useState)(e), i = (0, C.useRef)(n), a = (0, C.useRef)(e.serverRevision);
	return (0, C.useEffect)(() => {
		let n = Ni(i.current, e);
		i.current = n.state, r(n.state), n.acknowledgeServerReset && e.serverRevision > a.current && (a.current = e.serverRevision, t("state", e));
	}, [
		e.clientRevision,
		e.kind,
		e.serverRevision,
		e.value,
		t
	]), {
		commit: (e) => {
			if (Pi(i.current.value, e)) return;
			let n = {
				...i.current,
				value: e,
				clientRevision: i.current.clientRevision + 1
			};
			i.current = n, r(n), t("state", n);
		},
		state: n
	};
}
function Ii(e, t) {
	let { commit: n, state: r } = Fi(e, t), [i, a] = (0, C.useState)(r.value);
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
function Li({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsx)(ki, {
		"aria-label": e.props.label,
		className: "rounded-lg border px-3",
		"data-ssui-component": "accordion",
		"data-testid": "ssui-v2-accordion",
		disabled: e.props.disabled,
		multiple: e.props.multiple,
		onValueChange: n,
		value: r.value,
		children: e.props.items.map((e) => /* @__PURE__ */ (0, Y.jsxs)(Ai, {
			disabled: e.disabled,
			value: e.value,
			children: [/* @__PURE__ */ (0, Y.jsx)(ji, { children: e.label }), /* @__PURE__ */ (0, Y.jsx)(Mi, { children: e.content })]
		}, e.value))
	});
}
//#endregion
//#region src/components/ui/aspect-ratio.tsx
function Ri({ ratio: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "aspect-ratio",
		style: { "--ratio": e },
		className: J("relative aspect-(--ratio)", t),
		...n
	});
}
//#endregion
//#region src/components/streamlit/aspect-ratio.tsx
function zi({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ri, {
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
var Bi = /*#__PURE__*/ C.createContext(void 0);
function Vi() {
	let e = C.useContext(Bi);
	if (e === void 0) throw Error(Dt(13));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/root/stateAttributesMapping.mjs
var Hi = { imageLoadingStatus: () => null }, Ui = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, style: i, ...a } = e, [o, s] = C.useState("idle"), c = { imageLoadingStatus: o }, l = C.useMemo(() => ({
		imageLoadingStatus: o,
		setImageLoadingStatus: s
	}), [o, s]), u = cn("span", e, {
		state: c,
		ref: t,
		props: a,
		stateAttributesMapping: Hi
	});
	return /*#__PURE__*/ (0, Y.jsx)(Bi.Provider, {
		value: l,
		children: u
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/image/useImageLoadingStatus.mjs
function Wi(e, { referrerPolicy: t, crossOrigin: n, sizes: r, srcSet: i }) {
	let [a, o] = C.useState("idle");
	return Z(() => {
		if (!e && !i) return o("error"), Bt;
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
var Gi = {
	...Hi,
	...ir
}, Ki = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, onLoadingStatusChange: i, style: a, ...o } = e, { setImageLoadingStatus: s } = Vi(), c = Wi(o.src, o), l = c === "loaded", { mounted: u, transitionStatus: d, setMounted: f } = qn(l), p = C.useRef(null), m = X((e) => {
		i?.(e), s(e);
	});
	Z(() => {
		c !== "idle" && m(c);
	}, [c, m]), Z(() => () => s("idle"), [s]), ei({
		open: l,
		ref: p,
		onComplete() {
			l || f(!1);
		}
	});
	let h = cn("img", e, {
		state: {
			imageLoadingStatus: c,
			transitionStatus: d
		},
		ref: [t, p],
		props: o,
		stateAttributesMapping: Gi,
		enabled: u
	});
	return u ? h : null;
}), qi = 0, Ji = class e {
	static create() {
		return new e();
	}
	currentId = qi;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = qi, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== qi;
	}
	clear = () => {
		this.currentId !== qi && (clearTimeout(this.currentId), this.currentId = qi);
	};
	disposeEffect = () => this.clear;
};
function Yi() {
	let e = pt(Ji.create).current;
	return Hn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/fallback/AvatarFallback.mjs
var Xi = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, delay: i, style: a, ...o } = e, { imageLoadingStatus: s } = Vi(), [c, l] = C.useState(i === void 0), u = Yi();
	return C.useEffect(() => (i === void 0 ? l(!0) : u.start(i, () => l(!0)), u.clear), [u, i]), cn("span", e, {
		state: { imageLoadingStatus: s },
		ref: t,
		props: o,
		stateAttributesMapping: Hi,
		enabled: s !== "loaded" && (i === void 0 || c)
	});
});
//#endregion
//#region src/components/ui/avatar.tsx
function Zi({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ui, {
		"data-slot": "avatar",
		"data-size": t,
		className: J("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", e),
		...n
	});
}
function Qi({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Ki, {
		"data-slot": "avatar-image",
		className: J("aspect-square size-full rounded-full object-cover", e),
		...t
	});
}
function $i({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Xi, {
		"data-slot": "avatar-fallback",
		className: J("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/avatar.tsx
function ea({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "avatar",
		"data-testid": "ssui-v2-avatar",
		children: /* @__PURE__ */ (0, Y.jsxs)(Zi, {
			size: e.props.size,
			children: [e.props.src === null ? null : /* @__PURE__ */ (0, Y.jsx)(Qi, {
				alt: e.props.alt,
				src: e.props.src
			}), /* @__PURE__ */ (0, Y.jsx)($i, { children: e.props.fallback })]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/use-render/useRender.mjs
function ta(e) {
	return cn(e.defaultTagName ?? "div", e, e);
}
//#endregion
//#region src/components/ui/badge.tsx
var na = S("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function ra({ className: e, variant: t = "default", render: n, ...r }) {
	return ta({
		defaultTagName: "span",
		props: qt({ className: J(na({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
//#endregion
//#region src/components/streamlit/badge.tsx
function ia({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-wrap items-center gap-2 p-px",
		"data-ssui-component": "badge",
		"data-testid": "ssui-v2-badge",
		role: "list",
		children: e.props.badges.map((e, t) => /* @__PURE__ */ (0, Y.jsx)(ra, {
			role: "listitem",
			variant: e.variant,
			children: e.text
		}, `${e.text}-${t}`))
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function aa({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: J(e),
		...t
	});
}
function oa({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("ol", {
		"data-slot": "breadcrumb-list",
		className: J("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", e),
		...t
	});
}
function sa({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "breadcrumb-item",
		className: J("inline-flex items-center gap-1", e),
		...t
	});
}
function ca({ className: e, render: t, ...n }) {
	return ta({
		defaultTagName: "a",
		props: qt({ className: J("transition-colors hover:text-foreground", e) }, n),
		render: t,
		state: { slot: "breadcrumb-link" }
	});
}
function la({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: J("font-normal text-foreground", e),
		...t
	});
}
function ua({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: J("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ (0, Y.jsx)(wi, { className: "cn-rtl-flip" })
	});
}
//#endregion
//#region src/components/streamlit/breadcrumb.tsx
function da({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)(aa, {
		"aria-label": e.props.label,
		"data-ssui-component": "breadcrumb",
		"data-testid": "ssui-v2-breadcrumb",
		children: /* @__PURE__ */ (0, Y.jsx)(oa, { children: e.props.items.map((n, r) => /* @__PURE__ */ (0, Y.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(sa, { children: n.current ? /* @__PURE__ */ (0, Y.jsx)(la, { children: n.text }) : /* @__PURE__ */ (0, Y.jsx)(ca, {
			href: "#",
			onClick: (e) => {
				e.preventDefault(), t("action", {
					text: n.text,
					href: n.href,
					index: r
				});
			},
			children: n.text
		}) }), r < e.props.items.length - 1 ? /* @__PURE__ */ (0, Y.jsx)(ua, {}) : null] }, `${n.text}-${r}`)) })
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/button/Button.mjs
var fa = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Ur({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return cn("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), pa = S("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function ma({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(fa, {
		"data-slot": "button",
		className: J(pa({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/components/streamlit/button.tsx
function ha({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "button",
		"data-testid": "ssui-v2-button",
		children: /* @__PURE__ */ (0, Y.jsx)(ma, {
			disabled: e.props.disabled,
			onClick: () => {
				t("click", !0);
			},
			variant: e.props.variant,
			children: e.props.text
		})
	});
}
//#endregion
//#region src/components/ui/card.tsx
function ga({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: J("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function _a({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-header",
		className: J("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", e),
		...t
	});
}
function va({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-title",
		className: J("cn-font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function ya({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-description",
		className: J("text-sm text-muted-foreground", e),
		...t
	});
}
function ba({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "card-content",
		className: J("px-(--card-spacing)", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/card.tsx
function xa({ component: e, metric: t, props: n }) {
	let r = n.title !== null || n.description !== null;
	return /* @__PURE__ */ (0, Y.jsxs)(ga, {
		"data-ssui-component": e,
		"data-testid": `ssui-v2-${e.replace("_", "-")}`,
		size: n.size,
		children: [r ? /* @__PURE__ */ (0, Y.jsxs)(_a, { children: [n.title === null ? null : /* @__PURE__ */ (0, Y.jsx)(va, { children: n.title }), n.description === null ? null : /* @__PURE__ */ (0, Y.jsx)(ya, { children: n.description })] }) : null, n.content === null ? null : /* @__PURE__ */ (0, Y.jsx)(ba, { children: t ? /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "text-2xl font-semibold tracking-tight",
			children: n.content
		}) : /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "text-sm",
			children: n.content
		}) })]
	});
}
function Sa({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(xa, {
		component: "card",
		metric: !1,
		props: e.props
	});
}
function Ca({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(xa, {
		component: "metric_card",
		metric: !0,
		props: e.props
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/visuallyHidden.mjs
var wa = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, Ta = {
	...wa,
	position: "fixed",
	top: 0,
	left: 0
}, Ea = {
	...wa,
	position: "absolute"
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function Da(e) {
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
var Oa = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.indeterminate = "data-indeterminate", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), ka = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), Aa = {
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
}, ja = {
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, Ma = {
	disabled: !1,
	...ja
}, Na = { valid(e) {
	return e === null ? null : e ? { [ka.valid]: "" } : { [ka.invalid]: "" };
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/utils/useStateAttributesMapping.mjs
function Pa(e) {
	return C.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [Oa.checked]: "" } : { [Oa.unchecked]: "" };
		},
		...Na
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var Fa = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: Aa,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: Bt,
	disabled: void 0,
	touched: ja.touched,
	setTouched: Bt,
	dirty: ja.dirty,
	setDirty: Bt,
	filled: ja.filled,
	setFilled: Bt,
	focused: ja.focused,
	setFocused: Bt,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => !1,
	state: Ma,
	markedDirtyRef: { current: !1 },
	registerFieldControl: Bt,
	validation: {
		getValidationProps: (e, t = Ht) => t,
		inputRef: { current: null },
		registerInput: Bt,
		commit: async () => {},
		change: Bt
	}
}, Ia = /*#__PURE__*/ C.createContext(Fa);
function La(e = !0) {
	let t = C.useContext(Ia);
	if (t.setValidityData === Bt && !e) throw Error(Dt(28));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function Ra(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = La(), s = C.useRef(null);
	s.current ||= Symbol(), Z(() => {
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
var za = /*#__PURE__*/ C.createContext({ disabled: !1 });
function Ba() {
	return C.useContext(za);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var Va = /*#__PURE__*/ C.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: Bt,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: !1 }
});
function Ha() {
	return C.useContext(Va);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var Ua = /*#__PURE__*/ C.createContext({
	controlId: void 0,
	registerControlId: Bt,
	labelId: void 0,
	setLabelId: Bt,
	messageIds: [],
	setMessageIds: Bt,
	getDescriptionProps: (e) => e
});
function Wa() {
	return C.useContext(Ua);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function Ga(e, t, n, r = !0, i) {
	let [a, o] = C.useState(), s = bn(i ? `${i}-label` : void 0), c = e ?? t ?? a;
	return Z(() => {
		let i = e || t || !r ? void 0 : Ka(n.current, s);
		a !== i && o(i);
	}), c;
}
function Ka(e, t) {
	let n = qa(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function qa(e) {
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
var Ja = /*#__PURE__*/ C.createContext(void 0);
function Ya(e = !0) {
	let t = C.useContext(Ja);
	if (t === void 0 && !e) throw Error(Dt(3));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
var Xa = /*#__PURE__*/ C.createContext(void 0);
function Za() {
	let e = C.useContext(Xa);
	if (e === void 0) throw Error(Dt(14));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useValueChanged.mjs
function Qa(e, t) {
	let n = C.useRef(e), r = X(t);
	Z(() => {
		n.current !== e && r(n.current);
	}, [e, r]), Z(() => {
		n.current = e;
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRoot.mjs
var $a = "data-parent", eo = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: y = !1, style: b, ...x } = e, { clearErrors: S } = Ha(), { disabled: w, name: T, setDirty: E, setFilled: D, setFocused: O, setTouched: k, state: A, validationMode: j, validityData: M, validation: N } = La(), P = Ba(), { labelId: F, controlId: I, registerControlId: L, getDescriptionProps: R } = Wa(), z = Ya(), B = z?.parent, V = B && z.allValues, H = w || P.disabled || z?.disabled || o, U = T ?? d, W = v ?? U, G = bn(), ee = bn(), te = I;
	V ? te = p ? ee : `${B.id}-${W}` : c && (te = c);
	let ne = {};
	V && (p ? ne = z.parent.getParentProps() : W && (ne = z.parent.getChildProps(W)));
	let { checked: re = n, indeterminate: ie = l, onCheckedChange: ae, ...oe } = ne, se = z?.value, ce = z?.setValue, le = z?.defaultValue, ue = C.useRef(null), de = pt(() => Symbol("checkbox-control")), fe = C.useRef(!1), { getButtonProps: pe, buttonRef: me } = Ur({
		disabled: H,
		native: y
	}), he = z?.validation ?? N, [ge, _e] = ut({
		controlled: W && se && !p ? se.includes(W) : re,
		default: W && le && !p ? le.includes(W) : i,
		name: "Checkbox",
		state: "checked"
	}), ve = V ? !!re : ge, ye = V && ie || l;
	Z(() => {
		L !== Bt && (fe.current = !0, L(de.current, te));
	}, [
		te,
		L,
		de
	]), C.useEffect(() => {
		let e = de.current;
		return () => {
			!fe.current || L === Bt || (fe.current = !1, L(e, void 0));
		};
	}, [L, de]), Ra(ue, G, ge, void 0, !z && !H, d);
	let be = C.useRef(null), xe = At(u, be, he.inputRef, he.registerInput), Se = Ga(a, F, be, !y, te ?? void 0);
	Z(() => {
		be.current && (be.current.indeterminate = ye, ge && D(!0));
	}, [
		ge,
		ye,
		D
	]), Qa(ge, () => {
		z || (S(U), D(ge), E(ge !== M.initialValue), he.change(ge));
	});
	let Ce = qt({
		checked: ge,
		disabled: H,
		form: s,
		name: p ? void 0 : U,
		id: y ? void 0 : te ?? void 0,
		required: g,
		ref: xe,
		style: U ? Ea : Ta,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			if (m) {
				e.preventDefault();
				return;
			}
			let t = e.currentTarget.checked, n = zn(xn, e.nativeEvent);
			if (f?.(t, n), !n.isCanceled && (ae?.(t, n), !n.isCanceled && (_e(t), W && se && ce && !p && !V))) {
				let e = t ? [...se, W] : se.filter((e) => e !== W);
				ce(e, n);
			}
		},
		onFocus() {
			ue.current?.focus();
		}
	}, v === void 0 ? Ht : { value: (z ? ge && v : v) || "" }, R, (e) => he.getValidationProps(H, e));
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
	]), Te = Pa(we), Ee = cn("span", e, {
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
				[$a]: p ? "" : void 0,
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
					}, a.call(r), _r(n).queueMicrotask(() => {
						e.preventDefault = i, r.preventDefault = a, o || Da(t)?.click();
					});
				},
				onClick(e) {
					if (m || H) return;
					e.preventDefault();
					let t = be.current;
					t && t.dispatchEvent(new (_r(t)).PointerEvent("click", {
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
	return /*#__PURE__*/ (0, Y.jsxs)(Xa.Provider, {
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
}), to = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = Za(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = qn(c), f = C.useRef(null), p = {
		...s,
		transitionStatus: u
	};
	ei({
		open: c,
		ref: f,
		onComplete() {
			c || d(!1);
		}
	});
	let m = {
		...Pa(s),
		...ir,
		...Na
	}, h = a || l, g = cn("span", e, {
		ref: [t, f],
		state: p,
		stateAttributesMapping: m,
		props: o
	});
	return h ? g : null;
});
//#endregion
//#region src/components/ui/checkbox.tsx
function no({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(eo, {
		"data-slot": "checkbox",
		className: J("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(to, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, Y.jsx)(xi, {})
		})
	});
}
//#endregion
//#region src/components/streamlit/checkbox.tsx
function ro({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex min-h-8 items-center gap-2.5 p-px",
		"data-ssui-component": "checkbox",
		"data-testid": "ssui-v2-checkbox",
		children: [/* @__PURE__ */ (0, Y.jsx)(no, {
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
var io = {
	...ur,
	...ir
}, ao = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, defaultOpen: i = !1, disabled: a = !1, onOpenChange: o, open: s, style: c, ...l } = e, u = X(o), d = Jn({
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
	]), m = cn("div", e, {
		state: f,
		ref: t,
		props: l,
		stateAttributesMapping: io
	});
	return /*#__PURE__*/ (0, Y.jsx)(Yn.Provider, {
		value: p,
		children: m
	});
}), oo = {
	...lr,
	...ir
}, so = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { panelId: n, open: r, handleTrigger: i, state: a, disabled: o } = Xn(), { className: s, disabled: c = o, render: l, nativeButton: u = !0, style: d, ...f } = e, { getButtonProps: p, buttonRef: m } = Ur({
		disabled: c,
		focusableWhenDisabled: !0,
		native: u
	});
	return cn("button", e, {
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
		stateAttributesMapping: oo
	});
}), co = /*#__PURE__*/ function(e) {
	return e.collapsiblePanelHeight = "--collapsible-panel-height", e.collapsiblePanelWidth = "--collapsible-panel-width", e;
}({}), lo = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, hiddenUntilFound: r, keepMounted: i, render: a, id: o, style: s, ...c } = e, { mounted: l, onOpenChange: u, open: d, panelId: f, setMounted: p, setPanelIdState: m, setOpen: h, state: g, transitionStatus: _ } = Xn(), v = r ?? !1, y = i ?? !1;
	Z(() => {
		if (o) return m(o), () => {
			m(void 0);
		};
	}, [o, m]);
	let { height: b, props: x, ref: S, shouldPreventOpenAnimation: C, shouldRender: w, transitionStatus: T, width: E } = ni({
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
	}, O = Gt(s, D), k = cn("div", {
		...e,
		style: void 0
	}, {
		state: D,
		ref: S,
		props: [
			x,
			{ style: {
				[co.collapsiblePanelHeight]: b === void 0 ? "auto" : `${b}px`,
				[co.collapsiblePanelWidth]: E === void 0 ? "auto" : `${E}px`
			} },
			c,
			O ? { style: O } : void 0,
			C ? { style: { animationName: "none" } } : void 0
		],
		stateAttributesMapping: io
	});
	return w ? k : null;
});
//#endregion
//#region src/components/ui/collapsible.tsx
function uo({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(ao, {
		"data-slot": "collapsible",
		...e
	});
}
function fo({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(so, {
		"data-slot": "collapsible-trigger",
		...e
	});
}
function po({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(lo, {
		"data-slot": "collapsible-content",
		...e
	});
}
//#endregion
//#region src/components/streamlit/collapsible.tsx
function mo({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)(uo, {
		"data-ssui-component": "collapsible",
		"data-testid": "ssui-v2-collapsible",
		disabled: e.props.disabled,
		onOpenChange: n,
		open: r.value,
		children: [/* @__PURE__ */ (0, Y.jsxs)(fo, {
			className: "group flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
			children: [e.props.title, /* @__PURE__ */ (0, Y.jsx)(Si, {
				"aria-hidden": "true",
				className: "size-4 transition-transform group-aria-expanded:rotate-180"
			})]
		}), /* @__PURE__ */ (0, Y.jsxs)(po, {
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
var ho = /*#__PURE__*/ C.createContext(void 0);
function go(e) {
	let t = C.useContext(ho);
	if (t === void 0 && !e) throw Error(Dt(33));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var _o = /*#__PURE__*/ C.createContext(void 0);
function vo(e) {
	let t = C.useContext(_o);
	if (t === void 0 && !e) throw Error(Dt(36));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popupStateMapping.mjs
var yo = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = tr.startingStyle] = "startingStyle", e[e.endingStyle = tr.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e.side = "data-side", e.align = "data-align", e;
}({}), bo = /*#__PURE__*/ function(e) {
	return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
}({}), xo = { [bo.popupOpen]: "" }, So = {
	[bo.popupOpen]: "",
	[bo.pressed]: ""
}, Co = { [yo.open]: "" }, wo = { [yo.closed]: "" }, To = { [yo.anchorHidden]: "" }, Eo = { open(e) {
	return e ? xo : null;
} }, Do = { open(e) {
	return e ? So : null;
} }, Oo = {
	open(e) {
		return e ? Co : wo;
	},
	anchorHidden(e) {
		return e ? To : null;
	}
}, ko = /*#__PURE__*/ C.createContext(void 0);
function Ao(e = !0) {
	let t = C.useContext(ko);
	if (t === void 0 && !e) throw Error(Dt(25));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/shared.mjs
function jo() {
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
var { userAgent: Mo, platform: No, maxTouchPoints: Po } = jo(), Fo = Mo.toLowerCase(), Io = No.toLowerCase(), Lo = /^i(os$|p)/.test(Io) || Io === "macintel" && Po > 1, Ro = "android", zo = Io === Ro || Fo.includes(Ro), Bo = !Lo && Io.startsWith("mac");
Io.startsWith("win"), !zo && /^(linux|chrome os)/.test(Io);
var Vo = Bo || Lo, Ho = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!Ho && Fo.includes("firefox"), !Ho && Fo.includes("chrom");
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/screen-reader.mjs
var Uo = Vo, Wo = /jsdom|happydom/.test(Fo);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Go(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, { events: l } = a.useState("floatingTreeRoot"), u = a.useState("open"), d = Ao(!0), f = d !== void 0;
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
				reason: En
			});
		},
		onMouseUp(e) {
			if (d) {
				let t = d.initialCursorPointRef.current;
				if (d.initialCursorPointRef.current = null, f && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || f && !Bo && e.button === 2) return;
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
var Ko = { type: "regular-item" };
function qo(e) {
	let { closeOnClick: t, disabled: n = !1, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = a.useState("disabled"), d = n || u, f = C.useRef(null), { getButtonProps: p, buttonRef: m } = Ur({
		disabled: d,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), h = Go({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: f,
		itemMetadata: c
	}), g = C.useCallback((e) => qt(h, { onMouseEnter() {
		c.type === "submenu-trigger" && c.setActive();
	} }, e, p), [
		h,
		p,
		c
	]), _ = At(f, m);
	return C.useMemo(() => ({
		getItemProps: g,
		itemRef: _
	}), [g, _]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
var Jo = /*#__PURE__*/ C.createContext(void 0);
function Yo() {
	let e = C.useContext(Jo);
	if (e === void 0) throw Error(Dt(31));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Xo = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = C.useState(void 0), c = cn("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, Y.jsx)(Jo.Provider, {
		value: s,
		children: c
	});
}), Zo = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = bn(a), c = Yo();
	return Z(() => (c(s), () => {
		c(void 0);
	}), [c, s]), cn("div", e, {
		ref: t,
		props: {
			id: s,
			role: "presentation",
			...o
		}
	});
}), Qo = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, d = Qn({ label: a }), f = go(!0), p = bn(i), { store: m } = vo(), h = m.useState("isActive", d.index), g = m.useState("itemProps"), { getItemProps: _, itemRef: v } = qo({
		closeOnClick: c,
		disabled: s,
		highlighted: h,
		id: p,
		store: m,
		nativeButton: o,
		nodeId: f?.context.nodeId,
		itemMetadata: Ko
	});
	return cn("div", e, {
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
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function $o(e) {
	e.preventDefault(), e.stopPropagation();
}
function es(e) {
	return "nativeEvent" in e;
}
function ts(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : zo && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function ns(e) {
	return Wo ? !1 : !zo && e.width === 0 && e.height === 0 || zo && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function rs(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function is(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var as = "data-base-ui-focusable", os = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", ss = "ArrowLeft", cs = "ArrowRight", ls = "ArrowUp", us = "ArrowDown";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/shadowDom.mjs
function ds(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function fs(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && Sr(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function ps(e) {
	return "composedPath" in e ? e.composedPath()[0] : e.target;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function ms(e, t) {
	if (!br(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute("data-trigger-disabled");
	for (let [, e] of t.entries()) if (fs(e, n)) return !e.hasAttribute("data-trigger-disabled");
	return !1;
}
function hs(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function gs(e) {
	return e.matches("html,body");
}
function _s(e) {
	return xr(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function vs(e) {
	return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${os}`) != null;
}
function ys(e) {
	return e ? e.getAttribute("role") === "combobox" && _s(e) : !1;
}
function bs(e) {
	if (!e || Wo) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function xs(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function Ss(e, t) {
	return t != null && !rs(t) ? 0 : typeof e == "function" ? e() : e;
}
function Cs(e, t, n) {
	let r = Ss(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function ws(e) {
	return typeof e == "function" ? e() : e;
}
function Ts(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Es(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeCleanups.mjs
function Ds(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/FocusGuard.mjs
var Os = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let [n, r] = C.useState();
	Z(() => {
		Uo && Ho && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, Y.jsx)("span", {
		...e,
		ref: t,
		style: Ta,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), ks = [
	"top",
	"right",
	"bottom",
	"left"
], As = Math.min, js = Math.max, Ms = Math.round, Ns = Math.floor, Ps = (e) => ({
	x: e,
	y: e
}), Fs = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Is(e, t, n) {
	return js(e, As(t, n));
}
function Ls(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Rs(e) {
	return e.split("-")[0];
}
function zs(e) {
	return e.split("-")[1];
}
function Bs(e) {
	return e === "x" ? "y" : "x";
}
function Vs(e) {
	return e === "y" ? "height" : "width";
}
function Hs(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Us(e) {
	return Bs(Hs(e));
}
function Ws(e, t, n) {
	n === void 0 && (n = !1);
	let r = zs(e), i = Us(e), a = Vs(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = $s(o)), [o, $s(o)];
}
function Gs(e) {
	let t = $s(e);
	return [
		Ks(e),
		t,
		Ks(t)
	];
}
function Ks(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var qs = ["left", "right"], Js = ["right", "left"], Ys = ["top", "bottom"], Xs = ["bottom", "top"];
function Zs(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Js : qs : t ? qs : Js;
		case "left":
		case "right": return t ? Ys : Xs;
		default: return [];
	}
}
function Qs(e, t, n, r) {
	let i = zs(e), a = Zs(Rs(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Ks)))), a;
}
function $s(e) {
	let t = Rs(e);
	return Fs[t] + e.slice(t.length);
}
function ec(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function tc(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ec(e);
}
function nc(e) {
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
function rc(e, t) {
	return t < 0 || t >= e.length;
}
function ic(e, t) {
	return oc(e.current, { disabledIndices: t });
}
function ac(e, t) {
	return oc(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function oc(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && sc(e, a, r));
	return a;
}
function sc(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !lc(r) || !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function cc(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function lc(e, t = e ? Pr(e) : null) {
	return !e || !e.isConnected || !t || cc(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var uc = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function dc(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return Sr(n) ? n.host : null;
}
function fc(e) {
	for (let t of Array.from(e.children)) if (gr(t) === "summary") return t;
	return null;
}
function pc(e, t) {
	let n = fc(t);
	return !!n && (e === n || fs(n, e));
}
function mc(e) {
	let t = e ? gr(e) : "";
	return e != null && e.matches(uc) && (t !== "summary" || e.parentElement != null && gr(e.parentElement) === "details" && fc(e.parentElement) === e) && (t !== "details" || fc(e) == null) && (t !== "input" || e.type !== "hidden");
}
function hc(e) {
	if (!mc(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = dc(t)) {
		let n = t !== e, r = gr(t) === "slot";
		if (t.hasAttribute("inert") || n && gr(t) === "details" && !t.open && !pc(e, t) || t.hasAttribute("hidden") || !r && !gc(t, n)) return !1;
	}
	return !0;
}
function gc(e, t) {
	let n = Pr(e);
	return t ? n.display !== "none" : lc(e, n);
}
function _c(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = gr(e);
		if (t === "details" || t === "audio" || t === "video" || xr(e) && e.isContentEditable) return 0;
	}
	return t;
}
function vc(e) {
	if (gr(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function yc(e, t) {
	let n = vc(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = vc(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = vc(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function bc(e) {
	if (xr(e) && gr(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return xr(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function xc(e, t) {
	bc(e).forEach((e) => {
		mc(e) && t.push(e), xc(e, t);
	});
}
function Sc(e, t, n) {
	bc(e).forEach((e) => {
		xr(e) && e.matches(t) && n.push(e), Sc(e, t, n);
	});
}
function Cc(e) {
	return hc(e) && _c(e) >= 0;
}
function wc(e) {
	let t = [];
	return xc(e, t), t.filter(hc);
}
function Tc(e) {
	let t = wc(e);
	return t.filter((e) => _c(e) >= 0 && yc(e, t));
}
function Ec(e, t) {
	let n = Tc(e), r = n.length;
	if (r === 0) return;
	let i = ds(Xr(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function Dc(e) {
	return Ec(Xr(e).body, 1) || e;
}
function Oc(e) {
	return Ec(Xr(e).body, -1) || e;
}
function kc(e, t) {
	if (!e) return null;
	let n = Tc(Xr(e).body), r = n.length;
	if (r === 0) return null;
	let i = n.indexOf(e);
	return i === -1 ? null : n[(i + t + r) % r];
}
function Ac(e) {
	return kc(e, 1);
}
function jc(e) {
	return kc(e, -1);
}
function Mc(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !fs(n, r);
}
function Nc(e) {
	Tc(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function Pc(e) {
	let t = [];
	Sc(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Fc(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Fc(e, t.id, n)]);
}
function Ic(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Lc(e) {
	return `data-base-ui-${e}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var Rc = 0;
function zc(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(Rc);
	function a() {
		i && !i() || e?.focus({ preventScroll: n });
	}
	if (r) return a(), Bt;
	let o = requestAnimationFrame(a);
	return Rc = o, () => {
		Rc === o && (cancelAnimationFrame(o), Rc = 0);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var Bc = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap()
}, Vc = "data-base-ui-inert", Hc = {
	inert: /* @__PURE__ */ new WeakSet(),
	"aria-hidden": /* @__PURE__ */ new WeakSet()
}, Uc = /* @__PURE__ */ new WeakMap(), Wc = 0;
function Gc(e) {
	return Hc[e];
}
function Kc(e) {
	return e ? Sr(e) ? e.host : Kc(e.parentNode) : null;
}
var qc = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Kc(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), Jc = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, Yc = (e, t, n) => {
	let r = [], i = (e) => {
		!e || n.has(e) || Array.from(e.children).forEach((e) => {
			gr(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function Xc(e, t, n, r, { mark: i = !0 }) {
	let a = null;
	r ? a = "inert" : n && (a = "aria-hidden");
	let o = null, s = null, c = qc(t, e), l = i ? Yc(t, Jc(c), new Set(c)) : [], u = [], d = [];
	if (a) {
		let e = Bc[a], n = Gc(a);
		s = n, o = e;
		let r = qc(t, Array.from(t.querySelectorAll("[aria-live]"))), i = c.concat(r);
		Yc(t, Jc(i), new Set(i)).forEach((t) => {
			let r = t.getAttribute(a), i = r !== null && r !== "false", o = (e.get(t) || 0) + 1;
			e.set(t, o), u.push(t), o === 1 && i && n.add(t), i || t.setAttribute(a, a === "inert" ? "" : "true");
		});
	}
	return i && l.forEach((e) => {
		let t = (Uc.get(e) || 0) + 1;
		Uc.set(e, t), d.push(e), t === 1 && e.setAttribute(Vc, "");
	}), Wc += 1, () => {
		o && u.forEach((e) => {
			let t = (o.get(e) || 0) - 1;
			o.set(e, t), t || (!s?.has(e) && a && e.removeAttribute(a), s?.delete(e));
		}), i && d.forEach((e) => {
			let t = (Uc.get(e) || 0) - 1;
			Uc.set(e, t), t || e.removeAttribute(Vc);
		}), --Wc, Wc || (Bc.inert = /* @__PURE__ */ new WeakMap(), Bc["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Hc.inert = /* @__PURE__ */ new WeakSet(), Hc["aria-hidden"] = /* @__PURE__ */ new WeakSet(), Uc = /* @__PURE__ */ new WeakMap());
	};
}
function Zc(e, t = {}) {
	let { ariaHidden: n = !1, inert: r = !1, mark: i = !0 } = t, a = Xr(e[0]).body;
	return Xc(e, a, n, r, { mark: i });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/constants.mjs
var Qc = { style: { transition: "none" } }, $c = { fallbackAxisSide: "none" }, el = { fallbackAxisSide: "end" }, tl = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, nl = /*#__PURE__*/ C.createContext(null), rl = () => C.useContext(nl), il = Lc("portal");
function al(e = {}) {
	let { ref: t, container: n, componentProps: r = Ht, elementProps: i } = e, a = yn(), o = rl()?.portalNode, [s, c] = C.useState(null), [l, u] = C.useState(null), d = X((e) => {
		e !== null && u(e);
	}), f = C.useRef(null);
	Z(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		if (a == null) return;
		let e = (n && (yr(n) ? n : n.current)) ?? o ?? document.body;
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
	let p = cn("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[il]: ""
		}, i]
	});
	return {
		portalNode: l,
		portalSubtree: s && p ? /*#__PURE__*/ Qr.createPortal(p, s) : null
	};
}
var ol = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, renderGuards: s, ...c } = e, { portalNode: l, portalSubtree: u } = al({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), d = C.useRef(null), f = C.useRef(null), p = C.useRef(null), m = C.useRef(null), [h, g] = C.useState(null), _ = C.useRef(!1), v = h?.modal, y = h?.open, b = typeof s == "boolean" ? s : !!h && !h.modal && h.open && !!l;
	C.useEffect(() => {
		if (!l || v) return;
		function e(e) {
			l && e.relatedTarget && Mc(e) && (e.type === "focusin" ? _.current &&= (Pc(l), !1) : (Nc(l), _.current = !0));
		}
		return Ds(qr(l, "focusin", e, !0), qr(l, "focusout", e, !0));
	}, [l, v]), Z(() => {
		!l || y !== !0 || !_.current || (Pc(l), _.current = !1);
	}, [y, l]);
	let x = C.useMemo(() => ({
		beforeOutsideRef: d,
		afterOutsideRef: f,
		beforeInsideRef: p,
		afterInsideRef: m,
		portalNode: l,
		setFocusManagerState: g
	}), [l]);
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [u, /*#__PURE__*/ (0, Y.jsxs)(nl.Provider, {
		value: x,
		children: [
			b && l && /*#__PURE__*/ (0, Y.jsx)(Os, {
				"data-type": "outside",
				ref: d,
				onFocus: (e) => {
					Mc(e, l) ? p.current?.focus() : Oc(h ? h.domReference : null)?.focus();
				}
			}),
			b && l && /*#__PURE__*/ (0, Y.jsx)("span", {
				"aria-owns": l.id,
				style: tl
			}),
			l && /*#__PURE__*/ Qr.createPortal(a, l),
			b && l && /*#__PURE__*/ (0, Y.jsx)(Os, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					Mc(e, l) ? m.current?.focus() : (Dc(h ? h.domReference : null)?.focus(), h?.closeOnFocusOut && h?.onOpenChange(!1, zn("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function sl() {
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
var cl = class {
	nodesRef = { current: [] };
	events = sl();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, ll = /*#__PURE__*/ C.createContext(null), ul = /*#__PURE__*/ C.createContext(null), dl = () => C.useContext(ll)?.id || null, fl = (e) => {
	let t = C.useContext(ul);
	return e ?? t;
};
function pl(e) {
	let t = yn(), n = fl(e), r = dl();
	return Z(() => {
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
function ml(e) {
	let { children: t, id: n } = e, r = dl();
	return /*#__PURE__*/ (0, Y.jsx)(ll.Provider, {
		value: C.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function hl(e) {
	let { children: t, externalTree: n } = e, r = pt(() => n ?? new cl()).current;
	return /*#__PURE__*/ (0, Y.jsx)(ul.Provider, {
		value: r,
		children: t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function gl(e, t) {
	let n = _r(ps(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var _l = 20, vl = [];
function yl() {
	vl = vl.filter((e) => e.deref()?.isConnected);
}
function bl(e) {
	yl(), e && gr(e) !== "body" && (vl.push(new WeakRef(e)), vl.length > _l && (vl = vl.slice(-20)));
}
function xl() {
	return yl(), vl[vl.length - 1]?.deref();
}
function Sl(e) {
	return e ? Cc(e) ? e : Tc(e)[0] || e : null;
}
function Cl(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = wc(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return Cc(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function wl(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, restoreFocus: o = !1, modal: s = !0, closeOnFocusOut: c = !0, openInteractionType: l = "", nextFocusableElement: u, previousFocusableElement: d, beforeContentFocusGuardRef: f, externalTree: p, getInsideElements: m } = e, h = "rootStore" in t ? t.rootStore : t, g = h.useState("open"), _ = h.useState("domReferenceElement"), v = h.useState("floatingElement"), { events: y, dataRef: b } = h.context, x = X(() => b.current.floatingContext?.nodeId), S = i === !1, w = ys(_) && S, T = Jr(i), E = Jr(a), D = Jr(l), O = Jr(g), k = fl(p), A = rl(), j = C.useRef(!1), M = C.useRef(!1), N = C.useRef(!1), P = C.useRef(null), F = C.useRef(""), I = C.useRef(""), L = C.useRef(null), R = C.useRef(null), z = At(L, f, A?.beforeInsideRef), B = At(R, A?.afterInsideRef), V = Yi(), H = Yi(), U = Kn(), W = A != null, G = xs(v), ee = X((e = G) => e ? Tc(e) : []), te = X(() => m?.().filter((e) => e != null) ?? []);
	C.useEffect(() => {
		if (r || !s) return;
		function e(e) {
			e.key === "Tab" && fs(G, ds(Xr(G))) && ee().length === 0 && !w && $o(e);
		}
		return qr(Xr(G), "keydown", e);
	}, [
		r,
		G,
		s,
		w,
		ee
	]), C.useEffect(() => {
		if (r || !g) return;
		let e = Xr(G);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = ps(e), n = te(), r = fs(v, t) || fs(_, t) || fs(A?.portalNode, t) || n.some((e) => e === t || fs(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", t?.closest("[data-base-ui-click-trigger]") && (M.current = !0, H.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return Ds(qr(e, "pointerdown", n, !0), qr(e, "pointerup", t, !0), qr(e, "pointercancel", t, !0), qr(e, "keydown", i, !0), t);
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
		let e = Xr(G);
		function t() {
			M.current = !0, H.start(0, () => {
				M.current = !1;
			});
		}
		function n(e) {
			let t = ps(e);
			Cc(t) && (P.current = t);
		}
		function i(t) {
			let n = t.relatedTarget, r = t.currentTarget, i = ps(t);
			s && n == null && i != null && fs(v, i) && bl(i), queueMicrotask(() => {
				let a = x(), c = h.context.triggerElements, l = te(), f = n?.hasAttribute(Lc("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					Zr(d),
					Zr(u)
				].includes(n), p = !(fs(_, n) || fs(v, n) || fs(n, v) || fs(A?.portalNode, n) || l.some((e) => e === n || fs(e, n)) || n != null && c.hasElement(n) || c.hasMatchingElement((e) => fs(e, n)) || f || k && (Fc(k.nodesRef.current, a).find((e) => fs(e.context?.elements.floating, n) || fs(e.context?.elements.domReference, n)) || Ic(k.nodesRef.current, a).find((e) => [e.context?.elements.floating, xs(e.context?.elements.floating)].includes(n) || e.context?.elements.domReference === n)));
				if (r === _ && G && Cl(G), o && r !== _ && !lc(i) && ds(e) === e.body) {
					if (xr(G) && (G.focus(), o === "popup")) {
						U.request(() => {
							G.focus();
						});
						return;
					}
					let e = ee(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || G;
					xr(n) && n.focus();
				}
				if (b.current.insideReactTree) {
					b.current.insideReactTree = !1;
					return;
				}
				(w || !s) && n && p && !M.current && (w || n !== xl()) && (j.current = !0, h.setOpen(!1, zn(On, t)));
			});
		}
		function a() {
			N.current || (b.current.insideReactTree = !0, V.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let l = xr(_) ? _ : null;
		if (!(!v && !l)) return Ds(l && qr(l, "focusout", i), l && qr(l, "pointerdown", t), v && qr(v, "focusin", n), v && qr(v, "focusout", i), v && A && qr(v, "focusout", a, !0));
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
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Lc("portal")}]`) || []), t = (k ? Ic(k.nodesRef.current, x()) : []).find((e) => ys(e.context?.elements.domReference || null))?.context?.elements.domReference, n = Zc([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...te(),
			t,
			Zr(d),
			Zr(u),
			w ? _ : null
		].filter((e) => e != null), {
			ariaHidden: s || w,
			mark: !1
		}), i = Zc([v, ...e].filter((e) => e != null));
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
	]), Z(() => {
		if (!g || r || !xr(G)) return;
		let e = Xr(G), t = ds(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || fs(G, t)) return;
			let i = null, a = () => (i ??= ee(G), i[0] || G), o;
			o = r === !0 || r === null ? a() : Zr(r), o ||= a();
			let s = fs(G, ds(e));
			zc(o, {
				preventScroll: o === G,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = ds(e);
					return !(t !== o && fs(G, t));
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
	]), Z(() => {
		if (r || !G) return;
		let e = Xr(G), t = ds(e), n = D.current == null;
		bl(t);
		function i(e) {
			if (e.open || (F.current = gl(e.nativeEvent, I.current)), e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave" && (j.current = !0), e.reason === "outside-press") if (e.nested) j.current = !1;
			else if (ts(e.nativeEvent) || ns(e.nativeEvent)) j.current = !1;
			else {
				let e = !1;
				Xr(G).createElement("div").focus({ get preventScroll() {
					return e = !0, !1;
				} }), e ? j.current = !1 : j.current = !0;
			}
		}
		y.on("openchange", i);
		function a() {
			let e = E.current, r = typeof e == "function" ? e(F.current) : e;
			if (r === void 0 || r === !1) return null;
			r === null && (r = !0);
			let i = _?.isConnected ? _ : null, a = t?.isConnected && gr(t) !== "body" ? t : null, o = n ? a || i : i || a;
			return o ||= xl() || null, typeof r == "boolean" ? o : Zr(r) || o || null;
		}
		return () => {
			y.off("openchange", i);
			let t = ds(e), n = te(), r = fs(v, t) || n.some((e) => e === t || fs(e, t)) || k && Fc(k.nodesRef.current, x(), !1).some((e) => fs(e.context?.elements.floating, t)), o = E.current, s = a();
			queueMicrotask(() => {
				let n = Sl(s), i = typeof o != "boolean";
				o && !j.current && xr(n) && (!(!i && n !== t && t !== e.body) || r) && n.focus({ preventScroll: !0 }), j.current = !1;
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
	]), Z(() => {
		if (!Ho || g || !v) return;
		let e = ds(Xr(v));
		!xr(e) || !_s(e) || fs(v, e) && e.blur();
	}, [g, v]), Z(() => {
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
	]), Z(() => {
		if (!(r || !G)) return Cl(G), () => {
			queueMicrotask(yl);
		};
	}, [r, G]);
	let ne = !r && (!s || !w) && (W || s);
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
		ne && /*#__PURE__*/ (0, Y.jsx)(Os, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				if (s) {
					let e = ee();
					zc(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, Mc(e, A.portalNode) ? Dc(_)?.focus() : Zr(d ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		ne && /*#__PURE__*/ (0, Y.jsx)(Os, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				s ? zc(ee()[0]) : A?.portalNode && (c && (j.current = !0), Mc(e, A.portalNode) ? Oc(_)?.focus() : Zr(u ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function Tl(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = Sn } = t, l = "rootStore" in e ? e.rootStore : e, u = l.context.dataRef, d = C.useRef(void 0), f = Kn(), p = Yi(), m = C.useMemo(() => {
		function e(e, t, n, r) {
			let i = zn(c, t, n);
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
				if (n.button !== 0 || r === "click" || rs(i, !0) && a) return;
				let c = t(s, n.currentTarget, (e) => e === "click" || e === "mousedown"), u = ps(o);
				if (_s(u)) {
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
				rs(i, !0) && a || e(t(l.select("open"), n.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), n.nativeEvent, n.currentTarget, i);
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
	return C.useMemo(() => n ? { reference: m } : Ht, [n, m]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function El() {
	return !1;
}
function Dl(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Ol(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = El, bubbles: s, externalTree: c } = t, l = "rootStore" in e ? e.rootStore : e, u = l.useState("open"), d = l.useState("floatingElement"), { dataRef: f } = l.context, p = fl(c), m = X(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = X(() => a), { escapeKey: v, outsidePress: y } = Dl(s), b = C.useRef(!1), x = C.useRef(!1), S = C.useRef(!1), w = C.useRef(!1), T = C.useRef(""), E = C.useRef(null), D = Yi(), O = Yi(), k = X(() => {
		O.clear(), f.current.insideReactTree = !1;
	}), A = X((e) => {
		let t = f.current.floatingContext?.nodeId;
		return (p ? Fc(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), j = X((e) => hs(e, l.select("floatingElement")) || hs(e, l.select("domReferenceElement"))), M = X((e) => {
		o() && l.setOpen(!1, zn(Sn, e.nativeEvent));
	}), N = X((e) => {
		if (!u || !n || !r || e.key !== "Escape" || w.current || !v && A("__escapeKeyBubbles")) return;
		let t = zn(kn, es(e) ? e.nativeEvent : e);
		l.setOpen(!1, t), t.isCanceled || e.preventDefault(), !v && !t.isPropagationAllowed && e.stopPropagation();
	}), P = X(() => {
		f.current.insideReactTree = !0, O.start(0, k);
	}), F = X((e) => {
		if (!u || !n || e.button !== 0) return;
		let t = ps(e.nativeEvent);
		fs(l.select("floatingElement"), t) && (b.current || (b.current = !0, x.current = !1));
	}), I = X((e) => {
		!u || !n || (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	C.useEffect(() => {
		if (!u || !n) return;
		f.current.__escapeKeyBubbles = v, f.current.__outsidePressBubbles = y;
		let e = new Ji(), t = new Ji();
		function i() {
			e.clear(), w.current = !0;
		}
		function a() {
			e.start(Ho ? 5 : 0, () => {
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
			let t = f.current.floatingContext?.nodeId, n = p && Fc(p.nodesRef.current, t).some((t) => hs(e, t.context?.elements.floating));
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
			let n = ps(e), r = `[${Lc("inert")}]`, i = br(n) ? n.getRootNode() : null, a = Array.from((Sr(i) ? i : Xr(l.select("floatingElement"))).querySelectorAll(r)), o = l.context.triggerElements;
			if (n && (o.hasElement(n) || o.hasMatchingElement((e) => fs(e, n)))) return;
			let s = br(n) ? n : null;
			for (; s && !Nr(s);) {
				let e = Ir(s);
				if (Nr(e) || !br(e)) break;
				s = e;
			}
			if (!(a.length && br(n) && !gs(n) && !fs(n, l.select("floatingElement")) && a.every((e) => !fs(s, e)))) {
				if (xr(n) && !("touches" in e)) {
					let t = Nr(n), r = Pr(n), i = /auto|scroll/, a = t || i.test(r.overflowX), o = t || i.test(r.overflowY), s = a && n.clientWidth > 0 && n.scrollWidth > n.clientWidth, c = o && n.clientHeight > 0 && n.scrollHeight > n.clientHeight, l = r.direction === "rtl", u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth), d = s && e.offsetY > n.clientHeight;
					if (u || d) return;
				}
				if (!C(e)) {
					if (c() === "intentional" && S.current) {
						t.clear(), S.current = !1;
						return;
					}
					typeof h == "function" && !h(e) || A("__outsidePressBubbles") || (l.setOpen(!1, zn(Tn, e)), k());
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
			let n = ps(e);
			if (!n) return;
			let r = qr(n, e.type, () => {
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
		let U = Xr(d), W = Ds(r && Ds(qr(U, "keydown", N), qr(U, "compositionstart", i), qr(U, "compositionend", a)), g && Ds(qr(U, "click", L, !0), qr(U, "pointerdown", L, !0), qr(U, "pointerup", R, !0), qr(U, "pointercancel", R, !0), qr(U, "mousedown", L, !0), qr(U, "mouseup", R, !0), qr(U, "touchstart", I, !0), qr(U, "touchmove", B, !0), qr(U, "touchend", H, !0)));
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
function kl(e, t, n) {
	let { reference: r, floating: i } = e, a = Hs(t), o = Us(t), s = Vs(o), c = Rs(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = zs(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Al(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ls(t, e), p = tc(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = nc(await i.getClippingRect({
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
	}, y = nc(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var jl = 50, Ml = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Al
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = kl(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < jl && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = kl(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Nl = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ls(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Rs(r), _ = Hs(o), v = Rs(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [$s(o)] : Gs(o)), x = p !== "none";
			!d && x && b.push(...Qs(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ws(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Hs(t) || T.every((e) => Hs(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = Hs(e.placement);
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
function Pl(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Fl(e) {
	return ks.some((t) => e[t] >= 0);
}
var Il = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Ls(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Pl(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Fl(e)
					} };
				}
				case "escaped": {
					let e = Pl(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Fl(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ll = /*#__PURE__*/ new Set(["left", "top"]);
async function Rl(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Rs(n), s = zs(n), c = Hs(n) === "y", l = Ll.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ls(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var zl = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Rl(t, e);
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
}, Bl = function(e) {
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
			} }, ...l } = Ls(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Hs(i), p = Bs(f), m = u[p], h = u[f], g = (e, t) => Is(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Vl = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Ls(e, t), u = {
				x: n,
				y: r
			}, d = Hs(i), f = Bs(d), p = u[f], m = u[d], h = Ls(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Ll.has(Rs(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Hl = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Ls(e, t), c = await i.detectOverflow(t, s), l = Rs(n), u = zs(n), d = Hs(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = As(p - c[m], g), y = As(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * js(c.left, c.right) : S = p - 2 * js(c.top, c.bottom)), await o({
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
function Ul(e) {
	let t = Pr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = xr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Ms(n) !== a || Ms(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Wl(e) {
	return br(e) ? e : e.contextElement;
}
function Gl(e) {
	let t = Wl(e);
	if (!xr(t)) return Ps(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ul(t), o = (a ? Ms(n.width) : n.width) / r, s = (a ? Ms(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Kl = /*#__PURE__*/ Ps(0);
function ql(e) {
	let t = _r(e);
	return !Mr() || !t.visualViewport ? Kl : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Jl(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === _r(e);
}
function Yl(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Wl(e), o = Ps(1);
	t && (r ? br(r) && (o = Gl(r)) : o = Gl(e));
	let s = Jl(a, n, r) ? ql(a) : Ps(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = _r(a), t = br(r) ? _r(r) : r, n = e, i = zr(n);
		for (; i && t !== n;) {
			let e = Gl(i), t = i.getBoundingClientRect(), r = Pr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = _r(i), i = zr(n);
		}
	}
	return nc({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Xl(e, t) {
	let n = Fr(e).scrollLeft;
	return t ? t.left + n : Yl(vr(e)).left + n;
}
function Zl(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Xl(e, n),
		y: n.top + t.scrollTop
	};
}
function Ql(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = vr(r), s = t ? Tr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Ps(1), u = Ps(0), d = xr(r);
	if ((d || !a) && ((gr(r) !== "body" || Cr(o)) && (c = Fr(r)), d)) {
		let e = Yl(r);
		l = Gl(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Zl(o, c) : Ps(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function $l(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function eu(e) {
	let t = Fr(e), n = e.ownerDocument.body, r = js(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = js(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Xl(e), o = -t.scrollTop;
	return Pr(n).direction === "rtl" && (a += js(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var tu = 25;
function nu(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = _r(e), a = vr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Mr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Xl(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= tu && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ru(e, t) {
	let n = Yl(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Gl(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function iu(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = nu(e, n, t);
	else if (t === "document") r = eu(vr(e));
	else if (br(t)) r = ru(t, n);
	else {
		let n = ql(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return nc(r);
}
function au(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Rr(e, [], !1).filter((e) => br(e) && gr(e) !== "body"), i = null, a = Pr(e).position === "fixed", o = a ? Ir(e) : e;
	for (; br(o) && !Nr(o);) {
		let e = Pr(o), t = Ar(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Ir(o);
	}
	return t.set(e, r), r;
}
function ou(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Tr(t) ? [] : au(t, this._c) : [].concat(n), r], o = iu(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = iu(t, a[e], i);
		s = js(n.top, s), c = As(n.right, c), l = As(n.bottom, l), u = js(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function su(e) {
	let { width: t, height: n } = Ul(e);
	return {
		width: t,
		height: n
	};
}
function cu(e, t, n) {
	let r = xr(t), i = vr(t), a = n === "fixed", o = Yl(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Ps(0);
	if ((r || !a) && ((gr(t) !== "body" || Cr(i)) && (s = Fr(t)), r)) {
		let e = Yl(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Xl(i));
	let l = i && !r && !a ? Zl(i, s) : Ps(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function lu(e) {
	return Pr(e).position === "static";
}
function uu(e, t) {
	if (!xr(e) || Pr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return vr(e) === n && (n = n.ownerDocument.body), n;
}
function du(e, t) {
	let n = _r(e);
	if (Tr(e)) return n;
	if (!xr(e)) {
		let t = Ir(e);
		for (; t && !Nr(t);) {
			if (br(t) && !lu(t)) return t;
			t = Ir(t);
		}
		return n;
	}
	let r = uu(e, t);
	for (; r && wr(r) && lu(r);) r = uu(r, t);
	return r && Nr(r) && lu(r) && !Ar(r) ? n : r || jr(e) || n;
}
var fu = async function(e) {
	let t = this.getOffsetParent || du, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: cu(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function pu(e) {
	return Pr(e).direction === "rtl";
}
var mu = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Ql,
	getDocumentElement: vr,
	getClippingRect: ou,
	getOffsetParent: du,
	getElementRects: fu,
	getClientRects: $l,
	getDimensions: su,
	getScale: Gl,
	isElement: br,
	isRTL: pu
};
function hu(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function gu(e, t, n) {
	let r = null, i, a = vr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ns(d), h = Ns(a.clientWidth - (u + f)), g = Ns(a.clientHeight - (d + p)), _ = Ns(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: js(0, As(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!hu(l, e.getBoundingClientRect())) return s();
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
	let c = _r(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function _u(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Wl(e), u = i || a ? [...l ? Rr(l) : [], ...t ? Rr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? gu(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Yl(e) : null;
	c && g();
	function g() {
		let t = Yl(e);
		h && !hu(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var vu = zl, yu = Bl, bu = Nl, xu = Hl, Su = Il, Cu = Vl, wu = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...mu,
		...i.platform,
		_c: r
	};
	return Ml(e, t, {
		...i,
		platform: a
	});
}, Tu = typeof document < "u" ? C.useLayoutEffect : function() {};
function Eu(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Eu(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Eu(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Du(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ou(e, t) {
	let n = Du(e);
	return Math.round(t * n) / n;
}
function ku(e) {
	let t = C.useRef(e);
	return Tu(() => {
		t.current = e;
	}), t;
}
function Au(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = C.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = C.useState(r);
	Eu(f, r) || p(r);
	let [m, h] = C.useState(null), [g, _] = C.useState(null), v = C.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = C.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), b = a || m, x = o || g, S = C.useRef(null), w = C.useRef(null), T = C.useRef(u), E = c != null, D = ku(c), O = ku(i), k = ku(l), A = C.useCallback(() => {
		if (!S.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), wu(S.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			j.current && !Eu(T.current, t) && (T.current = t, Qr.flushSync(() => {
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
	Tu(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let j = C.useRef(!1);
	Tu(() => (j.current = !0, () => {
		j.current = !1;
	}), []), Tu(() => {
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
		let t = Ou(N.floating, u.x), r = Ou(N.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Du(N.floating) >= 1.5 && { willChange: "transform" }
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
var ju = (e, t) => {
	let n = vu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Mu = (e, t) => {
	let n = yu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Nu = (e, t) => ({
	fn: Cu(e).fn,
	options: [e, t]
}), Pu = (e, t) => {
	let n = bu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Fu = (e, t) => {
	let n = xu(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Iu = (e, t) => {
	let n = Su(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnFirstRender.mjs
function Lu(e) {
	let t = C.useRef(!0);
	t.current && (t.current = !1, e());
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/createSelector.mjs
var Q = (e, t, n, r, i, a, ...o) => {
	if (o.length > 0) throw Error(Dt(1));
	let s;
	if (e && t && n && r && i && a) s = (o, s, c, l) => a(e(o, s, c, l), t(o, s, c, l), n(o, s, c, l), r(o, s, c, l), i(o, s, c, l), s, c, l);
	else if (e && t && n && r && i) s = (a, o, s, c) => i(e(a, o, s, c), t(a, o, s, c), n(a, o, s, c), r(a, o, s, c), o, s, c);
	else if (e && t && n && r) s = (i, a, o, s) => r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
	else if (e && t && n) s = (r, i, a, o) => n(e(r, i, a, o), t(r, i, a, o), i, a, o);
	else if (e && t) s = (n, r, i, a) => t(e(n, r, i, a), r, i, a);
	else if (e) s = e;
	else throw Error("Missing arguments");
	return s;
}, Ru = /* @__PURE__ */ o(((e) => {
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
})), zu = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ru();
})), Bu = /* @__PURE__ */ o(((e) => {
	var t = p(), n = zu();
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
})), Vu = /* @__PURE__ */ o(((e, t) => {
	t.exports = Bu();
})), Hu = [], Uu = void 0;
function Wu() {
	return Uu;
}
function Gu(e) {
	Hu.push(e);
}
function Ku(e) {
	let t = (t, n) => {
		let r = pt(Ju).current, i;
		try {
			Uu = r;
			for (let e of Hu) e.before(r);
			i = e(t, n);
			for (let e of Hu) e.after(r);
			r.didInitialize = !0;
		} finally {
			Uu = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function qu(e) {
	return /*#__PURE__*/ C.forwardRef(Ku(e));
}
function Ju() {
	return { didInitialize: !1 };
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/useStore.mjs
var Yu = zu(), Xu = Vu(), Zu = Lt(19) ? ed : td;
function Qu(e, t, n, r, i) {
	return Zu(e, t, n, r, i);
}
function $u(e, t, n, r, i) {
	let a = C.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Yu.useSyncExternalStore)(e.subscribe, a, a);
}
Gu({
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
		}), (0, Yu.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function ed(e, t, n, r, i) {
	let a = Wu();
	if (!a) return $u(e, t, n, r, i);
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
function td(e, t, n, r, i) {
	return (0, Xu.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/Store.mjs
var nd = class {
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
		return Qu(this, e, t, n, r);
	}
}, rd = class extends nd {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		C.useDebugValue(e);
		let n = this;
		Z(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		Z(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		Z(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		C.useDebugValue(e);
		let n = this, r = t !== void 0;
		Z(() => {
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
		return C.useDebugValue(e), Qu(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		C.useDebugValue(e);
		let n = X(t ?? Bt);
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
}, id = {
	open: Q((e) => e.open),
	transitionStatus: Q((e) => e.transitionStatus),
	domReferenceElement: Q((e) => e.domReferenceElement),
	referenceElement: Q((e) => e.positionReference ?? e.referenceElement),
	floatingElement: Q((e) => e.floatingElement),
	floatingId: Q((e) => e.floatingId)
}, ad = class extends rd {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: sl(),
			nested: n,
			triggerElements: i
		}, id), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && is(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function od(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = t.context.triggerElements, d = o, f = C.useRef(null);
	r === void 0 && f.current === null && (f.current = new ad({
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
	return t.useSyncedValue("floatingId", i), Z(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		br(c) && (e.domReferenceElement = c), p.state.positionReference === p.state.referenceElement && (e.positionReference = c), p.update(e);
	}, [
		s,
		i,
		c,
		l,
		p
	]), p.context.onOpenChange = d, p.context.nested = a, p;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
var sd = {
	tabIndex: -1,
	[as]: ""
};
function cd(e, t) {
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
function ld(e, t, n, r = !1) {
	t ? e.preventUnmountingOnClose = !1 : r && (e.preventUnmountingOnClose = !0);
	let i = n?.id ?? null;
	(i || t) && (e.activeTriggerId = i, e.activeTriggerElement = n ?? null);
}
function ud(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function dd(e, t, n, r) {
	Lu(() => {
		t === void 0 && e.state.open === !1 && n && (e.state = {
			...e.state,
			open: !0,
			activeTriggerId: r,
			preventUnmountingOnClose: !1
		});
	});
}
function fd(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = cd(e, n), o = X((t) => {
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
	return Z(() => {
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
function pd(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = e.useState("open");
	Z(() => {
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
				let t = zn(xn);
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
function md(e, t, n) {
	let { mounted: r, setMounted: i, transitionStatus: a } = qn(e), o = t.useState("preventUnmountingOnClose"), s = !e && o;
	t.useSyncedValues({
		mounted: r,
		transitionStatus: a,
		preventUnmountingOnClose: s
	});
	let c = X(() => {
		i(!1), t.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: !1,
			preventUnmountingOnClose: !1
		}), n?.(), t.context.onOpenChangeComplete?.(!1);
	});
	return ei({
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
function hd(e, t) {
	e.useSyncedValues(t), Z(() => () => {
		e.update({
			activeTriggerProps: Ht,
			inactiveTriggerProps: Ht,
			popupProps: Ht
		});
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var gd = class {
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
function _d() {
	return new ad({
		open: !1,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new gd(),
		floatingId: void 0,
		syncOnly: !1,
		nested: !1,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/store.mjs
function vd() {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: _d(),
		floatingId: void 0,
		triggerCount: 0,
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: Ht,
		inactiveTriggerProps: Ht,
		popupProps: Ht
	};
}
var yd = Q((e) => e.triggerIdProp ?? e.activeTriggerId), bd = Q((e) => e.openProp ?? e.open), xd = Q((e) => (e.popupElement?.id ?? e.floatingId) || void 0);
function Sd(e, t) {
	return t !== void 0 && bd(e) && yd(e) === t;
}
function Cd(e, t) {
	return Sd(e, t) ? !0 : t !== void 0 && bd(e) && yd(e) == null && e.triggerCount === 1;
}
var wd = {
	open: bd,
	mounted: Q((e) => e.mounted),
	transitionStatus: Q((e) => e.transitionStatus),
	floatingRootContext: Q((e) => e.floatingRootContext),
	triggerCount: Q((e) => e.triggerCount),
	preventUnmountingOnClose: Q((e) => e.preventUnmountingOnClose),
	payload: Q((e) => e.payload),
	activeTriggerId: yd,
	activeTriggerElement: Q((e) => e.mounted ? e.activeTriggerElement : null),
	popupId: xd,
	isTriggerActive: Q((e, t) => t !== void 0 && yd(e) === t),
	isOpenedByTrigger: Q((e, t) => Sd(e, t)),
	isMountedByTrigger: Q((e, t) => t !== void 0 && yd(e) === t && e.mounted),
	triggerProps: Q((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
	triggerPopupId: Q((e, t) => Cd(e, t) ? xd(e) : void 0),
	popupProps: Q((e) => e.popupProps),
	popupElement: Q((e) => e.popupElement),
	positionerElement: Q((e) => e.positionerElement)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function Td(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = yn(), a = dl() != null, o = pt(() => new ad({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new gd(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return Z(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = br(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
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
function Ed(e = {}) {
	let { nodeId: t, externalTree: n } = e, r = Td(e), i = e.rootContext || r, a = i.useState("referenceElement"), o = i.useState("floatingElement"), s = i.useState("domReferenceElement"), c = i.useState("open"), l = i.useState("floatingId"), [u, d] = C.useState(null), [f, p] = C.useState(void 0), [m, h] = C.useState(void 0), g = C.useRef(null), _ = fl(n), v = C.useMemo(() => ({
		reference: a,
		floating: o,
		domReference: s
	}), [
		a,
		o,
		s
	]), y = Au({
		...e,
		elements: {
			...v,
			...u && { reference: u }
		}
	}), b = br(f) ? f : null, x = m === void 0 ? i.state.floatingElement : m;
	i.useSyncedValue("referenceElement", f ?? null), i.useSyncedValue("domReferenceElement", f === void 0 ? s : b), i.useSyncedValue("floatingElement", x);
	let S = C.useCallback((e) => {
		let t = br(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		d(t), y.refs.setReference(t);
	}, [y.refs]), w = C.useCallback((e) => {
		(br(e) || e === null) && (g.current = e, p(e)), (br(y.refs.reference.current) || y.refs.reference.current === null || e !== null && !br(e)) && y.refs.setReference(e);
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
	return Z(() => {
		s && (g.current = s);
	}, [s]), Z(() => {
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
var Dd = Bo && Ho;
function Od(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, i = "rootStore" in e ? e.rootStore : e, { events: a, dataRef: o } = i.context, s = C.useRef(!1), c = C.useRef(null), l = C.useRef(!0), u = Yi();
	C.useEffect(() => {
		let e = i.select("domReferenceElement");
		if (!n) return;
		let t = _r(e);
		function r() {
			let e = i.select("domReferenceElement");
			!i.select("open") && xr(e) && e === ds(Xr(e)) && (s.current = !0);
		}
		function a() {
			l.current = !0;
		}
		function o() {
			l.current = !1;
		}
		return Ds(qr(t, "blur", r), Dd && qr(t, "keydown", a, !0), Dd && qr(t, "pointerdown", o, !0));
	}, [i, n]), C.useEffect(() => {
		if (!n) return;
		function e(e) {
			if (e.reason === "trigger-press" || e.reason === "escape-key") {
				let e = i.select("domReferenceElement");
				br(e) && (c.current = e, s.current = !0);
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
				let a = ps(t.nativeEvent);
				if (br(a)) {
					if (Dd && !t.relatedTarget) {
						if (!l.current && !_s(a)) return;
					} else if (!bs(a)) return;
				}
				let o = ms(t.relatedTarget, i.context.triggerElements), { nativeEvent: d, currentTarget: f } = t, p = typeof r == "function" ? r() : r;
				if (i.select("open") && o || p === 0 || p === void 0) {
					i.setOpen(!0, zn(wn, d, f));
					return;
				}
				u.start(p, () => {
					s.current || i.setOpen(!0, zn(wn, d, f));
				});
			},
			onBlur(t) {
				e();
				let n = t.relatedTarget, r = t.nativeEvent, a = br(n) && n.hasAttribute(Lc("focus-guard")) && n.getAttribute("data-type") === "outside";
				u.start(0, () => {
					let e = i.select("domReferenceElement"), t = ds(Xr(e));
					!n && t === e || fs(o.current.floatingContext?.refs.floating.current, t) || fs(e, t) || a || ms(n ?? t, i.context.triggerElements) || i.setOpen(!1, zn(wn, r));
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
var kd = class e {
	constructor() {
		this.pointerType = void 0, this.interactedInside = !1, this.handler = void 0, this.blockMouseMove = !0, this.performedPointerEventsMutation = !1, this.pointerEventsScopeElement = null, this.pointerEventsReferenceElement = null, this.pointerEventsFloatingElement = null, this.restTimeoutPending = !1, this.openChangeTimeout = new Ji(), this.restTimeout = new Ji(), this.handleCloseOptions = void 0;
	}
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, Ad = /* @__PURE__ */ new WeakMap();
function jd(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Ad.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Ad.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Md(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Ad.get(n);
	a && a !== e && jd(a), jd(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Ad.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function Nd(e) {
	let t = e.context.dataRef.current, n = pt(() => t.hoverInteractionState ?? kd.create()).current;
	return t.hoverInteractionState ||= n, Hn(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Pd(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = "rootStore" in e ? e.rootStore : e, o = a.useState("open"), s = a.useState("floatingElement"), c = a.useState("domReferenceElement"), { dataRef: l } = a.context, u = fl(), d = dl(), f = Nd(a), p = Yi(), m = X(() => Ts(l.current.openEvent?.type, f.interactedInside)), h = X(() => Es(l.current.openEvent?.type)), g = X(() => {
		jd(f);
	});
	Z(() => {
		o || (f.pointerType = void 0, f.restTimeoutPending = !1, f.interactedInside = !1, g());
	}, [
		o,
		f,
		g
	]), C.useEffect(() => g, [g]), Z(() => {
		if (n && o && f.handleCloseOptions?.blockPointerEvents && h() && br(c) && s) {
			let e = c, t = s, n = Xr(s), r = u?.nodesRef.current.find((e) => e.id === d)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = f.pointerEventsScopeElement === t ? null : f.pointerEventsScopeElement, a = r === t ? null : r, o = f.handleCloseOptions?.getScope?.() ?? i ?? a ?? e.closest("[data-rootownerid]") ?? n.body;
			return Md(f, {
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
			return !!(u && d && Fc(u.nodesRef.current, d).length > 0);
		}
		function t(e) {
			let t = Cs(r, "close", f.pointerType), n = () => {
				a.setOpen(!1, zn(Cn, e)), u?.events.emit("floating.closed", e);
			};
			t ? f.openChangeTimeout.start(t, n) : (f.openChangeTimeout.clear(), n());
		}
		function o(e) {
			let t = ps(e);
			if (!vs(t)) {
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
			if (ms(n.relatedTarget, a.context.triggerElements)) return;
			let r = l.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			if (!(u && r && br(o) && Fc(u.nodesRef.current, r, !1).some((e) => fs(e.context?.elements.floating, o)))) {
				if (f.handler) {
					f.handler(n);
					return;
				}
				g(), h() && !m() && t(n);
			}
		}
		function v(t) {
			!u || !d || e() || p.start(0, () => {
				u.events.off("floating.closed", v), a.setOpen(!1, zn(Cn, t)), u.events.emit("floating.closed", t);
			});
		}
		let y = s;
		return Ds(y && qr(y, "mouseenter", c), y && qr(y, "mouseleave", _), y && qr(y, "pointerdown", o, !0), () => {
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
var Fd = { current: null };
function Id(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Fd, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p } = t, m = "rootStore" in e ? e.rootStore : e, { dataRef: h, events: g } = m.context, _ = fl(l), v = Nd(m), y = C.useRef(!1), b = Jr(i), x = Jr(r), S = Jr(o), w = Jr(n), T = Jr(p), E = Jr(f), D = X(() => Ts(h.current.openEvent?.type, v.interactedInside)), O = X(() => T.current?.() !== !1), k = X((e, t, n) => {
		let r = m.context.triggerElements;
		if (r.hasElement(t)) return !e || !fs(e, t);
		if (!br(n)) return !1;
		let i = n;
		return r.hasMatchingElement((e) => fs(e, i)) && (!e || !fs(e, i));
	}), A = X(() => {
		v.handler &&= (Xr(m.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), j = X(() => {
		jd(v);
	});
	return u && (v.handleCloseOptions = b.current?.__options), C.useEffect(() => A, [A]), C.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === Cn, A(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
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
			let n = Cs(x.current, "close", v.pointerType);
			n ? v.openChangeTimeout.start(n, () => {
				m.setOpen(!1, zn(Cn, e)), _?.events.emit("floating.closed", e);
			}) : t && (v.openChangeTimeout.clear(), m.setOpen(!1, zn(Cn, e)), _?.events.emit("floating.closed", e));
		}
		let t = c.current ?? (u ? m.select("domReferenceElement") : null);
		if (!br(t)) return;
		function r(e) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !rs(v.pointerType)) return;
			let t = ws(S.current), n = Cs(x.current, "open", v.pointerType), r = ps(e), i = e.currentTarget ?? null, o = m.select("domReferenceElement"), s = i;
			if (br(r) && !m.context.triggerElements.hasElement(r)) {
				for (let e of m.context.triggerElements.elements()) if (fs(e, r)) {
					s = e;
					break;
				}
			}
			br(i) && br(o) && !m.context.triggerElements.hasElement(i) && fs(i, o) && (s = o);
			let c = s != null && k(o, s, r), l = m.select("open"), u = E.current?.() ?? m.select("transitionStatus") === "ending", d = !l && u && y.current, f = !c && br(s) && br(o) && fs(o, s) && d, p = t > 0 && !n, h = c && (l || d) || f, g = !l || c;
			if (h) {
				O() && m.setOpen(!0, zn(Cn, e, s));
				return;
			}
			p || (n ? v.openChangeTimeout.start(n, () => {
				g && O() && m.setOpen(!0, zn(Cn, e, s));
			}) : g && O() && m.setOpen(!0, zn(Cn, e, s)));
		}
		function i(t) {
			if (D()) {
				j();
				return;
			}
			A();
			let n = Xr(m.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let r = h.current.floatingContext ?? d?.();
			if (!ms(t.relatedTarget, m.context.triggerElements)) {
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
				(v.pointerType !== "touch" || !fs(m.select("floatingElement"), t.relatedTarget)) && e(t);
			}
		}
		return s ? Ds(qr(t, "mousemove", r, { once: !0 }), qr(t, "mouseenter", r), qr(t, "mouseleave", i)) : Ds(qr(t, "mouseenter", r), qr(t, "mouseleave", i));
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
				if (a && !rs(v.pointerType)) return;
				if (i && o && v.handleCloseOptions?.blockPointerEvents) {
					let e = m.select("floatingElement");
					if (e) {
						let t = v.handleCloseOptions?.getScope?.() ?? n.ownerDocument.body;
						Md(v, {
							scopeElement: t,
							referenceElement: n,
							floatingElement: e
						});
					}
				}
				let s = ws(S.current);
				if (i && !o || s === 0 || !o && v.restTimeoutPending && e.movementX ** 2 + e.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function c() {
					if (v.restTimeoutPending = !1, D()) return;
					let e = m.select("open");
					!v.blockMouseMove && (!e || o) && O() && m.setOpen(!0, zn(Cn, t, n));
				}
				v.pointerType === "touch" ? Qr.flushSync(() => {
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
var Ld = "Escape";
function Rd(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function zd(e, t) {
	return Rd(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Bd(e, t, n) {
	return Rd(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function Vd(e, t, n) {
	return Rd(t, n ? e === ss : e === cs, e === us);
}
function Hd(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === Ld : Rd(t, n ? e === cs : e === ss, e === ls);
}
function Ud(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", parentOrientation: _, id: v, resetOnPointerLeave: y = !0, externalTree: b, grid: x } = t, S = x != null, w = "rootStore" in e ? e.rootStore : e, T = w.useState("open"), E = w.useState("floatingElement"), D = w.useState("domReferenceElement"), O = w.context.dataRef, k = xs(E), A = ys(D), j = Jr(k), M = dl(), N = fl(b), P = C.useRef(f), F = C.useRef(o ?? -1), I = C.useRef(null), L = C.useRef(!0), R = X((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), z = C.useRef(!!E), B = C.useRef(T), V = C.useRef(!1), H = C.useRef(!1), U = C.useRef(null), W = Jr(h), G = Jr(T), ee = Jr(o), te = Jr(y), ne = Kn(), re = Kn(), ie = X(() => {
		function e(e) {
			d ? N?.events.emit("virtualfocus", e) : U.current = zc(e, {
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
	Z(() => {
		O.current.orientation = g;
	}, [O, g]), Z(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (H.current = !0, R())) : z.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), Z(() => {
		if (a) {
			if (!T) {
				V.current = !1;
				return;
			}
			if (E) if (r == null) {
				if (V.current = !1, ee.current != null) return;
				if (z.current && (F.current = -1, ie()), (!B.current || !z.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
					let e = 0, t = () => {
						n.current[0] == null ? (e < 2 && (e ? (e) => re.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Bd(I.current, g, u) || l ? ic(n) : ac(n), I.current = null, R());
					};
					t();
				}
			} else rc(n.current, r) || (F.current = r, ie(), H.current = !1);
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
	]), Z(() => {
		if (!a || E || !N || d || !z.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = ds(Xr(D ?? t ?? null)), r = e.some((e) => e.context && fs(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), Z(() => {
		B.current = T, z.current = !!E;
	}), Z(() => {
		T || (I.current = null, P.current = f);
	}, [T, f]);
	let ae = r != null, oe = X((e) => {
		if (!G.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), se = X(() => _ ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), ce = X(() => ic(n, W.current)), le = X((e) => {
		if (L.current = !1, V.current = !0, e.which === 229 || !G.current && e.currentTarget === j.current) return;
		if (l && Hd(e.key, g, u, S)) {
			zd(e.key, se()) || $o(e), w.setOpen(!1, zn(An, e.nativeEvent)), xr(D) && (d ? N?.events.emit("virtualfocus", D) : D.focus());
			return;
		}
		let t = F.current, r = ic(n, h), i = ac(n, h);
		if (A || (e.key === "Home" && ($o(e), F.current = r, R(e)), e.key === "End" && ($o(e), F.current = i, R(e))), x != null) {
			let t = x(e, F.current, n, g, c, u, h, r, i);
			if (t != null && (F.current = t, R(e)), g === "both") return;
		}
		if (zd(e.key, g)) {
			if ($o(e), T && !d && ds(e.currentTarget.ownerDocument) === e.currentTarget) {
				F.current = Bd(e.key, g, u) ? r : i, R(e);
				return;
			}
			Bd(e.key, g, u) ? c ? t >= i ? s && t !== n.current.length ? F.current = -1 : (V.current = !1, F.current = r) : F.current = oc(n.current, {
				startingIndex: t,
				disabledIndices: h
			}) : F.current = Math.min(i, oc(n.current, {
				startingIndex: t,
				disabledIndices: h
			})) : c ? t <= r ? s && t !== -1 ? F.current = n.current.length : (V.current = !1, F.current = i) : F.current = oc(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			}) : F.current = Math.max(r, oc(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			})), rc(n.current, F.current) && (F.current = -1), R(e);
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
				let e = j.current, t = ds(Xr(e));
				e && fs(e, t) && e.focus({ preventScroll: !0 });
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
				let t = ps(e.nativeEvent);
				if (t && !fs(j.current, t)) return;
				$o(e), w.setOpen(!1, zn(On, e.nativeEvent)), xr(D) && D.focus();
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
			w.setOpen(!0, zn(An, e.nativeEvent, e.currentTarget));
		}
		function t(e) {
			f === "auto" && ts(e.nativeEvent) && (P.current = !d);
		}
		function n(e) {
			P.current = f, f === "auto" && ns(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(t) {
				let n = w.select("open");
				L.current = !1;
				let r = t.key.startsWith("Arrow"), i = Vd(t.key, se(), u), a = zd(t.key, g), o = (l ? i : a) || t.key === "Enter" || t.key.trim() === "";
				if (d && n) return le(t);
				if (!(!n && !m && r)) {
					if (o) {
						let e = zd(t.key, se());
						I.current = l && e ? null : t.key;
					}
					if (l) {
						i && ($o(t), n ? (F.current = ce(), R(t)) : e(t));
						return;
					}
					a && (ee.current != null && (F.current = ee.current), $o(t), !n && m ? e(t) : le(t), n && R(t));
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
function Wd(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = "rootStore" in e ? e.rootStore : e, f = d.useState("open"), p = Yi(), m = C.useRef(""), h = C.useRef(u ?? i ?? -1), g = C.useRef(null), _ = X((e) => {
		function t(e) {
			let t = r?.current[e];
			return !t || lc(t);
		}
		function c(e) {
			return t(e) ? o == null || !sc(Vt, e, o) : !1;
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
		if (m.current.length > 0 && e.key === " " && ($o(e), s?.(!0)), m.current.length > 0 && m.current[0] !== " " && d(_, m.current) === -1 && e.key !== " " && s?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && ($o(e), s?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && c(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, s?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = d(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", s?.(!1)) : (a?.(b), g.current = b);
	}), v = X((e) => {
		let t = e.relatedTarget, n = d.select("domReferenceElement"), r = d.select("floatingElement");
		fs(n, t) || fs(r, t) || (p.clear(), m.current = "", h.current = g.current, s?.(!1));
	});
	Z(() => {
		!f && u !== null || (p.clear(), g.current = null, m.current !== "" && (m.current = ""));
	}, [
		f,
		u,
		p
	]), Z(() => {
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
var Gd = .1, Kd = Gd * Gd, qd = .5;
function Jd(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function Yd(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return Jd(e, t, n, r, i, a) && (u = !u), Jd(e, t, i, a, o, s) && (u = !u), Jd(e, t, o, s, c, l) && (u = !u), Jd(e, t, c, l, n, r) && (u = !u), u;
}
function Xd(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function Zd(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function Qd(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new Ji(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Kd;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = ps(r), g = r.type === "mouseleave", _ = fs(u, h), v = fs(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && br(r.relatedTarget) && fs(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Fc(s.nodesRef.current, o).length > 0);
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
					j = Zd(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = Zd(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = Zd(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = Zd(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !Xd(d, f, x)) {
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
					let n = T ? qd / 2 : qd * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + qd + 1, o = C || T ? S.bottom - qd : S.top, s = C ? T ? S.bottom - qd : S.top : S.bottom - qd;
					M = Yd(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? qd / 2 : qd * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - qd, o = C || T ? S.top + qd : S.bottom, s = C ? T ? S.top + qd : S.bottom : S.top + qd;
					M = Yd(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? qd / 2 : qd * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + qd + 1, o = w || E ? S.right - qd : S.left, s = w ? E ? S.right - qd : S.left : S.right - qd;
					M = Yd(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? qd / 2 : qd * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - qd, o = w || E ? S.left + qd : S.right, s = w ? E ? S.left + qd : S.right : S.left + qd;
					M = Yd(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
var $d = /*#__PURE__*/ C.createContext(void 0);
function ef(e) {
	let t = C.useContext($d);
	if (t === void 0 && !e) throw Error(Dt(69));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/composite.mjs
var tf = "ArrowUp", nf = "ArrowDown", rf = "ArrowLeft", af = "ArrowRight", of = "Home", sf = "PageUp", cf = "PageDown", lf = /* @__PURE__ */ new Set([rf, af]), uf = /* @__PURE__ */ new Set([
	rf,
	af,
	of,
	"End"
]), df = /* @__PURE__ */ new Set([tf, nf]), ff = /* @__PURE__ */ new Set([
	tf,
	nf,
	of,
	"End"
]), pf = /* @__PURE__ */ new Set([...lf, ...df]), mf = /* @__PURE__ */ new Set([
	...pf,
	of,
	"End"
]), hf = "Shift", gf = /* @__PURE__ */ new Set([
	hf,
	"Control",
	"Alt",
	"Meta"
]);
function _f(e) {
	return xr(e) && e.tagName === "INPUT";
}
function vf(e) {
	return !!(_f(e) && e.selectionStart != null || xr(e) && e.tagName === "TEXTAREA");
}
function yf(e, t, n, r) {
	if (!e || !t || !t.scrollTo) return;
	let i = e.scrollLeft, a = e.scrollTop, o = e.clientWidth < e.scrollWidth, s = e.clientHeight < e.scrollHeight;
	if (o && r !== "vertical") {
		let r = bf(e, t, "left"), a = xf(e), o = xf(t);
		n === "ltr" && (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight ? i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight : r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft && (i = r - o.scrollMarginLeft - a.scrollPaddingLeft)), n === "rtl" && (r - o.scrollMarginRight < e.scrollLeft + a.scrollPaddingLeft ? i = r - o.scrollMarginLeft - a.scrollPaddingLeft : r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight && (i = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight));
	}
	if (s && r !== "horizontal") {
		let n = bf(e, t, "top"), r = xf(e), i = xf(t);
		n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop ? a = n - i.scrollMarginTop - r.scrollPaddingTop : n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom && (a = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom);
	}
	e.scrollTo({
		left: i,
		top: a,
		behavior: "auto"
	});
}
function bf(e, t, n) {
	let r = n === "left" ? "offsetLeft" : "offsetTop", i = 0;
	for (; t.offsetParent && (i += t[r], t.offsetParent !== e);) t = t.offsetParent;
	return i;
}
function xf(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function Sf(e) {
	return e === "starting" ? Qc : Ht;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var Cf = {
	...Oo,
	...ir
}, wf = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s } = vo(), { side: c, align: l } = go(), u = ef(!0) != null, d = s.useState("open"), f = s.useState("transitionStatus"), p = s.useState("popupProps"), m = s.useState("mounted"), h = s.useState("instantType"), g = s.useState("activeTriggerElement"), _ = s.useState("parent"), v = s.useState("lastOpenChangeReason"), y = s.useState("rootId"), b = s.useState("floatingRootContext"), x = s.useState("floatingTreeRoot"), S = s.useState("closeDelay"), w = s.useState("activeTriggerElement"), T = s.useState("hoverEnabled"), E = s.useState("disabled"), D = s.useState("openMethod"), O = _.type === "context-menu";
	ei({
		open: d,
		ref: s.context.popupRef,
		onComplete() {
			d && s.context.onOpenChangeComplete?.(!0);
		}
	}), C.useEffect(() => {
		function e(e) {
			s.setOpen(!1, zn(e.reason, e.domEvent));
		}
		return x.events.on("close", e), () => {
			x.events.off("close", e);
		};
	}, [x.events, s]), Pd(b, {
		enabled: T && !E && !O && _.type !== "menubar",
		closeDelay: S
	});
	let k = C.useCallback((e) => {
		s.set("popupElement", e);
	}, [s]), A = cn("div", e, {
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
		stateAttributesMapping: Cf,
		props: [
			p,
			{ onKeyDown(e) {
				u && mf.has(e.key) && e.stopPropagation();
			} },
			Sf(f),
			o,
			{ "data-rootownerid": y }
		]
	}), j = _.type === void 0 || O;
	return (g || _.type === "menubar" && v !== "outside-press") && (j = !0), /*#__PURE__*/ (0, Y.jsx)(wl, {
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
}), Tf = /*#__PURE__*/ C.createContext(void 0);
function Ef() {
	let e = C.useContext(Tf);
	if (e === void 0) throw Error(Dt(32));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var Df = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = vo();
	return i.useState("mounted") || n ? /*#__PURE__*/ (0, Y.jsx)(Tf.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Y.jsx)(ol, {
			ref: t,
			...r
		})
	}) : null;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/inertValue.mjs
function Of(e) {
	return Lt(19) ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var kf = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0, offsetParent: d = "real" } = Ls(e, t) || {};
		if (l == null) return {};
		let f = tc(u), p = {
			x: n,
			y: r
		}, m = Us(i), h = Vs(m), g = await o.getDimensions(l), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = a.reference[h] + a.reference[m] - p[m] - a.floating[h], S = p[m] - a.reference[m], C = d === "real" ? await o.getOffsetParent?.(l) : s.floating, w = s.floating[b] || a.floating[h];
		(!w || !await o.isElement?.(C)) && (w = s.floating[b] || a.floating[h]);
		let T = x / 2 - S / 2, E = w / 2 - g[h] / 2 - 1, D = Math.min(f[v], E), O = Math.min(f[y], E), k = D, A = w - g[h] - O, j = w / 2 - g[h] / 2 + T, M = Is(k, j, A), N = !c.arrow && zs(i) != null && j !== M && a.reference[h] / 2 - (j < k ? D : O) - g[h] / 2 < 0, P = N ? j < k ? j - k : j - A : 0;
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
}), Af = (e, t) => ({
	...kf(e),
	options: [e, t]
}), jf = Iu().fn, Mf = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0;
		return { data: { referenceHidden: (await jf(e)).data?.referenceHidden || a } };
	}
}, Nf = {
	sideX: "left",
	sideY: "top"
}, Pf = {
	name: "adaptiveOrigin",
	async fn(e) {
		let { x: t, y: n, rects: { floating: r }, elements: { floating: i }, platform: a, strategy: o, placement: s } = e, c = _r(i), l = c.getComputedStyle(i);
		if (l.transitionDuration === "0s" || l.transitionDuration === "") return {
			x: t,
			y: n,
			data: Nf
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
			let e = Xr(i);
			d = {
				width: e.documentElement.clientWidth,
				height: e.documentElement.clientHeight
			};
		} else await a.isElement?.(u) && (d = await a.getDimensions(u));
		let f = Rs(s), p = t, m = n;
		f === "left" && (p = d.width - (t + r.width)), f === "top" && (m = d.height - (n + r.height));
		let h = f === "left" ? "right" : Nf.sideX, g = f === "top" ? "bottom" : Nf.sideY;
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
function Ff(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function If(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: Ff(t, Rs(i), n),
		align: zs(i) || "center",
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
function Lf(e) {
	let { anchor: t, positionMethod: n = "absolute", side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, collisionBoundary: s, collisionPadding: c = 5, sticky: l = !1, arrowPadding: u = 5, disableAnchorTracking: d = !1, inline: f, keepMounted: p = !1, floatingRootContext: m, mounted: h, collisionAvoidance: g, shiftCrossAxis: _ = !1, nodeId: v, adaptiveOrigin: y, lazyFlip: b = !1, externalTree: x } = e, [S, w] = C.useState(null);
	!h && S !== null && w(null);
	let T = g.side || "flip", E = g.align || "flip", D = g.fallbackAxisSide || "end", O = typeof t == "function" ? t : void 0, k = X(O), A = O ? k : t, j = Jr(t), M = Jr(h), N = Tt() === "rtl", P = S || {
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
	}, H = C.useRef(null), U = Jr(i), W = Jr(o), G = typeof i == "function" ? 0 : i, ee = typeof o == "function" ? 0 : o, te = [];
	f && te.push(f), te.push(ju((e) => {
		let t = If(e, r, N), n = typeof U.current == "function" ? U.current(t) : U.current, i = typeof W.current == "function" ? W.current(t) : W.current;
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
	let ne = E === "none" && T !== "shift", re = !ne && (l || _ || T === "shift"), ie = T === "none" ? null : Pu({
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
	}), ae = ne ? null : Mu((e) => {
		let t = Xr(e.elements.floating).documentElement;
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
			limiter: l || _ ? void 0 : Nu((e) => {
				if (!H.current) return {};
				let { width: t, height: n } = H.current.getBoundingClientRect(), r = Hs(Rs(e.placement)), i = r === "y" ? t : n, a = r === "y" ? I.left + I.right : I.top + I.bottom;
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
	T === "shift" || E === "shift" || a === "center" ? te.push(ae, ie) : te.push(ie, ae), te.push(Fu({
		...V,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty("--available-width", `${t}px`), i.setProperty("--available-height", `${n}px`);
			let a = _r(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty("--anchor-width", `${u}px`), i.setProperty("--anchor-height", `${d}px`);
		}
	}), Af((e) => ({
		element: H.current || Xr(e.elements.floating).createElement("div"),
		padding: u,
		offsetParent: "floating"
	}), [u]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: t, middlewareData: n, placement: a, rects: o, y: s } = e, c = Rs(a), l = Hs(c), u = H.current, d = n.arrow?.x || 0, f = n.arrow?.y || 0, p = u?.clientWidth || 0, m = u?.clientHeight || 0, h = d + p / 2, g = f + m / 2, _ = Math.abs(n.shift?.y || 0), v = o.reference.height / 2, y = typeof i == "function" ? i(If(e, r, N)) : i, b = _ > y, x = {
				top: `${h}px calc(100% + ${y}px)`,
				bottom: `${h}px ${-y}px`,
				left: `calc(100% + ${y}px) ${g}px`,
				right: `${-y}px ${g}px`
			}[c], S = `${h}px ${o.reference.y + v - s}px`;
			return t.floating.style.setProperty("--transform-origin", re && l === "y" && b ? S : x), {};
		}
	}, Mf, y), Z(() => {
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
	}), [d]), { refs: se, elements: ce, x: le, y: ue, middlewareData: de, update: fe, placement: pe, context: me, isPositioned: he, floatingStyles: ge } = Ed({
		rootContext: m,
		open: p ? h : void 0,
		placement: F,
		middleware: te,
		strategy: n,
		whileElementsMounted: p ? void 0 : (...e) => _u(...e, oe),
		nodeId: v,
		externalTree: x
	}), { sideX: _e, sideY: ve } = de.adaptiveOrigin || Nf, ye = he ? n : "fixed", be = C.useMemo(() => {
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
	Z(() => {
		if (!h) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (Rf(t) ? t.current : t) || null;
		n !== xe.current && (se.setPositionReference(n), xe.current = n);
	}, [
		h,
		se,
		A,
		j
	]), C.useEffect(() => {
		if (!h) return;
		let e = j.current;
		typeof e != "function" && Rf(e) && e.current !== xe.current && (se.setPositionReference(e.current), xe.current = e.current);
	}, [
		h,
		se,
		A,
		j
	]), C.useEffect(() => {
		if (p && h && ce.reference && ce.floating) return _u(ce.reference, ce.floating, fe, oe);
	}, [
		p,
		h,
		ce,
		fe,
		oe
	]);
	let Se = Rs(pe), Ce = Ff(r, Se, N), we = zs(pe) || "center", Te = !!de.hide?.referenceHidden;
	Z(() => {
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
function Rf(e) {
	return e != null && "current" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var zf = /*#__PURE__*/ C.forwardRef(function(e, t) {
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
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/usePositioner.mjs
function Bf(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), cn("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			Sf(r),
			i
		],
		stateAttributesMapping: Oo
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useScrollLock.mjs
var Vf = {}, Hf = {}, Uf = "";
function Wf(e) {
	if (typeof document > "u") return !1;
	let t = Xr(e);
	return _r(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Gf(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Xr(e), n = t.documentElement, r = t.body, i = Cr(n) ? n : r, a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Kf(e) {
	let t = Xr(e), n = t.documentElement, r = t.body, i = Cr(n) ? n : r, a = {
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
function qf(e) {
	let t = Xr(e), n = t.documentElement, r = t.body, i = _r(n), a = 0, o = 0, s = !1, c = Gn.create();
	if (Ho && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, Vf = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, Uf = n.style.scrollBehavior, Hf = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = Cr(n) ? n : r;
		if (s = Gf(e), s) {
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
		Object.assign(n.style, Vf), Object.assign(r.style, Hf), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Uf);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = qr(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var Jf = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = Ji.create();
	timeoutUnlock = Ji.create();
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
		let t = Xr(e).documentElement, n = _r(t).getComputedStyle(t).overflowY;
		if (n === "hidden" || n === "clip") {
			this.restore = Bt;
			return;
		}
		let r = Lo || !Wf(e);
		this.restore = r ? Kf(e) : qf(e);
	}
}();
function Yf(e = !0, t = null) {
	Z(() => {
		if (e) return Jf.acquire(t);
	}, [e, t]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Xf = 20;
function Zf(e, t, n, r) {
	let [i, a] = C.useState(!1);
	Z(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Xr(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Xf);
	}, [
		e,
		t,
		n
	]), Yf(e && (!t || i), r);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Qf = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = $c, style: g, ..._ } = e, { store: v } = vo(), y = Ef(), b = Ao(!0), x = v.useState("parent"), S = v.useState("floatingRootContext"), w = v.useState("floatingTreeRoot"), T = v.useState("mounted"), E = v.useState("open"), D = v.useState("modal"), O = v.useState("openMethod"), k = v.useState("activeTriggerElement"), A = v.useState("transitionStatus"), j = v.useState("positionerElement"), M = v.useState("instantType"), N = v.useState("hasViewport"), P = v.useState("lastOpenChangeReason"), F = v.useState("floatingNodeId"), I = v.useState("floatingParentNodeId"), L = S.useState("domReferenceElement"), R = C.useRef(null), z = $r(j, !1, !1), B = n, V = c, H = l, U = s, W = h;
	x.type === "context-menu" && (B = n ?? x.context?.anchor, U ??= "start", !o && U !== "center" && (H = e.alignOffset ?? 2, V = e.sideOffset ?? -5));
	let G = o, ee = U;
	x.type === "menu" ? (G ??= "inline-end", ee ??= "start", W = e.collisionAvoidance ?? el) : x.type === "menubar" && (G ??= x.context.orientation === "vertical" ? "inline-end" : "bottom", ee ??= "start");
	let te = x.type === "context-menu", ne = Lf({
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
		adaptiveOrigin: N ? Pf : void 0
	});
	C.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === F && v.set("hoverEnabled", !1), e.nodeId !== F && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, zn(Nn)));
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
			v.setOpen(!1, zn(t));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [w.events, v]);
	let re = Yi();
	C.useEffect(() => {
		E || re.clear();
	}, [E, re]), C.useEffect(() => {
		function e(e) {
			if (!(!E || e.nodeId !== v.select("floatingParentNodeId"))) if (e.target && k && k !== e.target) {
				let e = v.select("closeDelay");
				e > 0 ? re.isStarted() || re.start(e, () => {
					v.setOpen(!1, zn(Nn));
				}) : v.setOpen(!1, zn(Nn));
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
	]), Z(() => {
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
	Zf(E && (ae || D && P !== "trigger-hover"), O === "touch", j, k);
	let oe = Bf(e, ie, {
		styles: ne.positionerStyles,
		transitionStatus: A,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !T,
		inert: !E
	}), se = T && x.type !== "menu" && (x.type !== "menubar" && D && P !== "trigger-hover" || x.type === "menubar" && x.context.modal), ce = null;
	return x.type === "menubar" ? ce = x.context.contentElement : x.type === void 0 && (ce = k), /*#__PURE__*/ (0, Y.jsxs)(ho.Provider, {
		value: ne,
		children: [se && /*#__PURE__*/ (0, Y.jsx)(zf, {
			ref: x.type === "context-menu" || x.type === "nested-context-menu" ? x.context.internalBackdropRef : null,
			inert: Of(!E),
			cutout: ce
		}), /*#__PURE__*/ (0, Y.jsx)(ml, {
			id: F,
			children: /*#__PURE__*/ (0, Y.jsx)(bt, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				children: oe
			})
		})]
	});
}), $f = /*#__PURE__*/ C.createContext(null);
function ep(e) {
	let t = C.useContext($f);
	if (t === null && !e) throw Error(Dt(5));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function tp(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function np(e, t) {
	let { onClick: n, onPointerDown: r } = tp(X((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Lo ? "touch" : ""));
	}));
	return C.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function rp(e) {
	let [t, n] = C.useState(null), r = np(e, n);
	return Qa(e, (t) => {
		t && !e && n(null);
	}), C.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/store/MenuStore.mjs
var ip = {
	...wd,
	disabled: Q((e) => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled),
	modal: Q((e) => (e.parent.type === void 0 || e.parent.type === "context-menu") && (e.modal ?? !0)),
	openMethod: Q((e) => e.openMethod),
	allowMouseEnter: Q((e) => e.allowMouseEnter),
	highlightItemOnHover: Q((e) => e.highlightItemOnHover),
	stickIfOpen: Q((e) => e.stickIfOpen),
	parent: Q((e) => e.parent),
	rootId: Q((e) => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type === void 0 ? e.rootId : e.parent.context.rootId),
	activeIndex: Q((e) => e.activeIndex),
	isActive: Q((e, t) => e.activeIndex === t),
	hoverEnabled: Q((e) => e.hoverEnabled),
	instantType: Q((e) => e.instantType),
	lastOpenChangeReason: Q((e) => e.openChangeReason),
	floatingTreeRoot: Q((e) => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot),
	floatingNodeId: Q((e) => e.floatingNodeId),
	floatingParentNodeId: Q((e) => e.floatingParentNodeId),
	itemProps: Q((e) => e.itemProps),
	closeDelay: Q((e) => e.closeDelay),
	hasViewport: Q((e) => e.hasViewport),
	keyboardEventRelay: Q((e) => {
		if (e.keyboardEventRelay) return e.keyboardEventRelay;
		if (e.parent.type === "menu") return e.parent.store.select("keyboardEventRelay");
	})
}, ap = class e extends rd {
	constructor(e) {
		super({
			...op(),
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
			triggerElements: new gd()
		}, ip), this.unsubscribeParentListener = this.observe("parent", (e) => {
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
		let r = pt(() => new e(n)).current;
		return t ?? r;
	}
	unsubscribeParentListener = null;
};
function op() {
	return {
		...vd(),
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
		floatingTreeRoot: new cl(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: Ht,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		hasViewport: !1
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var sp = /*#__PURE__*/ C.createContext(void 0);
function cp() {
	return C.useContext(sp);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var lp = Ku(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, defaultOpen: a = !1, disabled: o = !1, modal: s, loopFocus: c = !0, orientation: l = "vertical", actionsRef: u, closeParentOnEsc: d = !1, handle: f, triggerId: p, defaultTriggerId: m = null, highlightItemOnHover: h = !0 } = e, g = Ao(!0), _ = vo(!0), v = ep(!0), y = cp(), b = C.useMemo(() => y && _ ? {
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
	]), x = ap.useStore(f?.store, {
		open: a,
		openProp: n,
		activeTriggerId: m,
		triggerIdProp: p,
		parent: b
	});
	dd(x, n, a, m), x.useControlledProp("openProp", n), x.useControlledProp("triggerIdProp", p), x.useContextCallback("onOpenChangeComplete", i);
	let S = yn(), w = yn(), T = x.useState("floatingTreeRoot"), E = pl(T), D = dl(), O = x.useState("open"), k = x.useState("activeTriggerElement"), A = x.useState("positionerElement"), j = x.useState("hoverEnabled"), M = x.useState("disabled"), N = x.useState("lastOpenChangeReason"), P = x.useState("parent"), F = x.useState("activeIndex"), I = x.useState("payload"), L = x.useState("floatingParentNodeId"), R = C.useRef(null), z = C.useRef(P.type !== "context-menu"), B = Yi(), V = C.useRef(!0), H = Yi(), U = L != null, { openMethod: W, triggerProps: G } = rp(O);
	x.useSyncedValues({
		disabled: o,
		highlightItemOnHover: h,
		modal: P.type === void 0 ? s : void 0,
		openMethod: W,
		rootId: S
	}), pd(x);
	let { forceUnmount: ee } = md(O, x, () => {
		x.update({
			allowMouseEnter: !1,
			stickIfOpen: !0
		});
	});
	Z(() => {
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
	]), Z(() => {
		!O && !j && x.set("hoverEnabled", !0);
	}, [
		O,
		j,
		x
	]);
	let te = X((e, t) => {
		let n = t.reason;
		if (O === e && t.trigger === k && N === n) return;
		let i = ud(t);
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
		R.current = t.event ?? null, ld(c, e, t.trigger, i()), x.update(c), P.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? x.set("instantType", "group") : o || s ? x.set("instantType", o ? "click" : "dismiss") : x.set("instantType", void 0);
	}), ne = od({
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
		x.setOpen(!1, zn(Ln));
	}, [x]);
	C.useImperativeHandle(u, () => ({
		unmount: ee,
		close: ie
	}), [ee, ie]);
	let ae;
	P.type === "context-menu" && (ae = P.context), C.useImperativeHandle(ae?.positionerRef, () => A, [A]), C.useImperativeHandle(ae?.actionsRef, () => ({ setOpen: te }), [te]);
	let oe = Ol(ne, {
		enabled: !M,
		bubbles: { escapeKey: d && P.type === "menu" },
		outsidePress() {
			return P.type !== "context-menu" || R.current?.type === "contextmenu" || z.current;
		},
		externalTree: U ? T : void 0
	}), se = Tt(), ce = C.useCallback((e) => {
		x.select("activeIndex") !== e && x.set("activeIndex", e);
	}, [x]), le = Ud(ne, {
		enabled: !M,
		listRef: x.context.itemDomElements,
		activeIndex: F,
		nested: P.type !== void 0,
		loopFocus: c,
		orientation: l,
		parentOrientation: P.type === "menubar" ? P.context.orientation : void 0,
		rtl: se === "rtl",
		disabledIndices: Vt,
		onNavigate: ce,
		openOnArrowKeyDown: P.type !== "context-menu",
		externalTree: U ? T : void 0,
		focusItemOnHover: h
	}), ue = C.useCallback((e) => {
		x.context.typingRef.current = e;
	}, [x]), de = Wd(ne, {
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
	hd(x, {
		floatingRootContext: ne,
		activeTriggerProps: C.useMemo(() => {
			let e = qt(de.reference, le.reference, oe.reference, { onMouseMove() {
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
			let e = qt(le.trigger, oe.trigger, G);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			le.trigger,
			oe.trigger,
			G
		]),
		popupProps: C.useMemo(() => qt(sd, {
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
		itemProps: le.item ?? Ht
	});
	let fe = C.useMemo(() => ({
		store: x,
		parent: b
	}), [x, b]), pe = /*#__PURE__*/ (0, Y.jsx)(_o.Provider, {
		value: fe,
		children: typeof t == "function" ? t({ payload: I }) : t
	});
	return P.type === void 0 || P.type === "context-menu" ? /*#__PURE__*/ (0, Y.jsx)(hl, {
		externalTree: T,
		children: pe
	}) : pe;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function up(e) {
	let t = e.getBoundingClientRect(), n = _r(e);
	if (Wo) return t;
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
function dp(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Vr(), { ref: i, index: a } = Qn(e), o = n === a, s = C.useRef(null), c = At(i, s);
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
function fp(e) {
	let { render: t, className: n, style: r, state: i = Ht, props: a = Vt, refs: o = Vt, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = dp({ metadata: s });
	return cn(l, e, {
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
function pp(e) {
	if (xr(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid") ?? void 0;
	if (!Nr(e)) return pp(Ir(e));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function mp(e, t) {
	let n = C.useRef(null);
	function r(t) {
		Qr.flushSync(() => {
			e.setOpen(!1, zn(On, t.nativeEvent, t.currentTarget));
		}), jc(n.current)?.focus();
	}
	function i(n) {
		let r = e.select("positionerElement");
		if (r && Mc(n, r)) e.context.beforeContentFocusGuardRef.current?.focus();
		else {
			Qr.flushSync(() => {
				e.setOpen(!1, zn(On, n.nativeEvent, n.currentTarget));
			});
			let i = Ac(e.context.triggerFocusTargetRef.current || t.current);
			for (; i !== null && fs(r, i);) {
				let e = i;
				if (i = Dc(i), i === e) break;
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
function hp(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = C.useRef(!1);
	return C.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Xr(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : Ht, [
		t,
		n,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var gp = 2, _p = qu(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = vo(!0), h = d?.store ?? m?.store;
	if (!h) throw Error(Dt(85));
	let g = bn(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = C.useRef(null), S = yp(), w = Vr(!0), T = fl(), E = C.useMemo(() => T ?? new cl(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = fd(g, x, h, {
		payload: f,
		closeDelay: u,
		parent: S,
		floatingTreeRoot: E,
		floatingNodeId: pl(E),
		floatingParentNodeId: dl(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = S.type === "menubar", A = h.useState("disabled"), j = a || A || k && S.context.disabled, { getButtonProps: M, buttonRef: N } = Ur({
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
	let P = C.useRef(null), F = Yi(), I = X((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		if (fs(P.current, t) || fs(h.select("positionerElement"), t) || t === P.current || t != null && pp(t) === h.select("rootId")) return;
		let n = up(P.current);
		e.clientX >= n.left - gp && e.clientX <= n.right + gp && e.clientY >= n.top - gp && e.clientY <= n.bottom + gp || E.events.emit("close", {
			domEvent: e,
			reason: Mn
		});
	});
	C.useEffect(() => {
		y && h.select("lastOpenChangeReason") === "trigger-hover" && Xr(P.current).addEventListener("mouseup", I, { once: !0 });
	}, [
		y,
		I,
		h
	]);
	let L = k && S.context.hasSubmenuOpen, R = Id(v, {
		enabled: (c ?? L) && !j && S.type !== "context-menu" && (!k || L && !O),
		handleClose: Qd({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: S.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: x,
		externalTree: E,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = vp(y, h.select("lastOpenChangeReason")), B = Tl(v, {
		enabled: !j && S.type !== "context-menu",
		event: y && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: S.type === void 0 && z
	}), V = Od(v, { enabled: !j && L }), H = hp({
		open: y,
		enabled: k,
		mouseDownAction: "open"
	}), U = C.useMemo(() => qt(V.reference, B.reference), [V.reference, B.reference]), W = h.useState("triggerProps", O), { preFocusGuardRef: G, handlePreFocusGuardFocus: ee, handleFocusTargetFocus: te } = mp(h, x), ne = {
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
		R ?? Ht,
		W,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), Xr(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		k ? { role: "menuitem" } : {},
		H,
		p,
		M
	], ae = cn("button", e, {
		enabled: !k,
		stateAttributesMapping: Do,
		state: ne,
		ref: re,
		props: ie
	});
	return k ? /*#__PURE__*/ (0, Y.jsx)(fp, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: ne,
		refs: re,
		props: ie,
		stateAttributesMapping: Do
	}) : y ? /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [
		/*#__PURE__*/ (0, Y.jsx)(Os, {
			ref: G,
			onFocus: ee
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: ae }, g),
		/*#__PURE__*/ (0, Y.jsx)(Os, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: te
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: ae }, g);
});
function vp(e, t) {
	let n = Yi(), [r, i] = C.useState(!1);
	return Z(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function yp() {
	let e = Ao(!0), t = vo(!0), n = ep(!0);
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
function bp(e) {
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
var xp = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return cn("div", e, {
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
function Sp(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
//#endregion
//#region src/platform/overlay-container.tsx
var Cp = (0, C.createContext)(null);
function wp(e) {
	return e instanceof ShadowRoot ? e.host.isConnected : e.isConnected;
}
function Tp(e) {
	if (!wp(e.container)) throw Error("SSUI_V2_OVERLAY_DISCONNECTED: the overlay container is not connected.");
	if (e.container.getRootNode() !== e.expectedRoot) throw Error("SSUI_V2_OVERLAY_WRONG_ROOT: the overlay container escaped its component root.");
}
function Ep(e) {
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
function Dp(e) {
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
function Op({ children: e, container: t, expectedRoot: n }) {
	let r = (0, C.useMemo)(() => ({
		container: t,
		expectedRoot: n
	}), [t, n]);
	return Tp(r), Ep(n), Dp(t), /* @__PURE__ */ (0, Y.jsx)(Cp.Provider, {
		value: r,
		children: e
	});
}
function kp() {
	let e = (0, C.useContext)(Cp);
	if (!e) throw Error("SSUI_V2_OVERLAY_PROVIDER_MISSING: generated shadcn overlays require an OverlayContainerProvider.");
	return Tp(e), e.container;
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function Ap({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(lp, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function jp({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(_p, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function Mp({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = kp();
	return /* @__PURE__ */ (0, Y.jsx)(Df, {
		container: o,
		children: /* @__PURE__ */ (0, Y.jsx)(Qf, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsx)(wf, {
				"data-slot": "dropdown-menu-content",
				className: J("cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function Np({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)(Xo, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function Pp({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Zo, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: J("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function Fp({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(Qo, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: J("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
//#endregion
//#region src/components/streamlit/dropdown-menu.tsx
function Ip({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "dropdown-menu",
		"data-testid": "ssui-v2-dropdown-menu",
		children: /* @__PURE__ */ (0, Y.jsxs)(Ap, {
			disabled: e.props.disabled,
			modal: !1,
			children: [/* @__PURE__ */ (0, Y.jsxs)(jp, {
				render: /* @__PURE__ */ (0, Y.jsx)(ma, { variant: "outline" }),
				children: [e.props.label, /* @__PURE__ */ (0, Y.jsx)(Si, {
					"aria-hidden": "true",
					"data-icon": "inline-end"
				})]
			}), /* @__PURE__ */ (0, Y.jsx)(Mp, {
				"aria-label": e.props.menuLabel ?? e.props.label,
				"data-testid": "ssui-v2-dropdown-menu-content",
				children: /* @__PURE__ */ (0, Y.jsxs)(Np, { children: [e.props.menuLabel ? /* @__PURE__ */ (0, Y.jsx)(Pp, { children: e.props.menuLabel }) : null, e.props.items.length > 0 ? e.props.items.map((e) => /* @__PURE__ */ (0, Y.jsx)(Fp, {
					disabled: e.disabled,
					onClick: () => {
						t("action", e.value);
					},
					variant: e.variant,
					children: e.label
				}, e.value)) : /* @__PURE__ */ (0, Y.jsx)(Fp, {
					disabled: !0,
					children: "No actions"
				})] })
			})]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/tzName/index.js
function Lp(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/tzOffset/index.js
var Rp = {}, zp = {};
function Bp(e, t) {
	try {
		let n = (Rp[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in zp ? zp[n] : Hp(n, n.split(":"));
	} catch {
		if (e in zp) return zp[e];
		let t = e?.match(Vp);
		return t ? Hp(e, t.slice(1)) : NaN;
	}
}
var Vp = /([+-]\d\d):?(\d\d)?/;
function Hp(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return zp[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/date/mini.js
var Up = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Bp(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), qp(this, e)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -Bp(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), Gp(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, Wp = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!Wp.test(e)) return;
	let t = e.replace(Wp, "$1UTC");
	Up.prototype[t] && (e.startsWith("get") ? Up.prototype[e] = function() {
		return this.internal[t]();
	} : (Up.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), Kp(this), +this;
	}, Up.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), Gp(this), +this;
	}));
});
function Gp(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Bp(e.timeZone, e) * 60));
}
function Kp(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), qp(e);
}
function qp(e, t) {
	let n = Array.isArray(t) ? Jp(t) : +e.internal, r = Bp(e.timeZone, e), i = r > 0 ? Math.floor(r) : Math.ceil(r), a = /* @__PURE__ */ new Date(+e);
	a.setUTCHours(a.getUTCHours() - 1);
	let o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+a)).getTimezoneOffset(), c = o - s, l = o;
	if (c && o !== i && Date.prototype.getHours.apply(e) !== (Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours())) {
		let t = /* @__PURE__ */ new Date(+e), n = o - i;
		n && t.setUTCMinutes(t.getUTCMinutes() + n);
		let r = Bp(e.timeZone, t);
		(r > 0 ? Math.floor(r) : Math.ceil(r)) === i && (l = s);
	}
	let u = l - i;
	u && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + u);
	let d = /* @__PURE__ */ new Date(+e);
	d.setUTCSeconds(0);
	let f = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, p = Math.round(-(Bp(e.timeZone, e) * 60)) % 60;
	(p || f) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + f);
	let m = Bp(e.timeZone, e), h = m > 0 ? Math.floor(m) : Math.ceil(m), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, _ = h !== i, v = g - u, y = h - i, b = n - h * 60 * 1e3, x = y > 0 && Yp(e) - n === y * 60 * 1e3 && Yp(e, b) !== n;
	if (_ && v && !x) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
		let t = Bp(e.timeZone, e), n = h - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && v < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n);
	}
	Gp(e);
	let S = (t ? n : n + p * 1e3) - +e.internal;
	S && Math.abs(S) < 18e5 && (Date.prototype.setTime.call(e, +e + S), Gp(e));
}
function Jp(e) {
	return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function Yp(e, t) {
	let n = new Date(t ?? +e);
	return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-Bp(e.timeZone, n) * 60)), +n;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.5.0/node_modules/@date-fns/tz/date/index.js
var Xp = class e extends Up {
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
		return `${e} GMT${t}${n}${r} (${Lp(this.timeZone, this)})`;
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
}, Zp = 365.2425, Qp = 6048e5, $p = 864e5, em = 86400;
em * 7, em * Zp / 12 * 3;
var tm = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constructFrom.js
function nm(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && tm in e ? e[tm](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/toDate.js
function rm(e, t) {
	return nm(t || e, e);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addDays.js
function im(e, t, n) {
	let r = rm(e, n?.in);
	return isNaN(t) ? nm(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addMonths.js
function am(e, t, n) {
	let r = rm(e, n?.in);
	if (isNaN(t)) return nm(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = nm(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/defaultOptions.js
var om = {};
function sm() {
	return om;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeek.js
function cm(e, t) {
	let n = sm(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = rm(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfISOWeek.js
function lm(e, t) {
	return cm(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getISOWeekYear.js
function um(e, t) {
	let n = rm(e, t?.in), r = n.getFullYear(), i = nm(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = lm(i), o = nm(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = lm(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function dm(e) {
	let t = rm(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeDates.js
function fm(e, ...t) {
	let n = nm.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfDay.js
function pm(e, t) {
	let n = rm(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/differenceInCalendarDays.js
function mm(e, t, n) {
	let [r, i] = fm(n?.in, e, t), a = pm(r), o = pm(i), s = +a - dm(a), c = +o - dm(o);
	return Math.round((s - c) / $p);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfISOWeekYear.js
function hm(e, t) {
	let n = um(e, t), r = nm(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), lm(r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addWeeks.js
function gm(e, t, n) {
	return im(e, t * 7, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addYears.js
function _m(e, t, n) {
	return am(e, t * 12, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/max.js
function vm(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = nm.bind(null, e));
		let t = rm(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), nm(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/min.js
function ym(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = nm.bind(null, e));
		let t = rm(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), nm(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameDay.js
function bm(e, t, n) {
	let [r, i] = fm(n?.in, e, t);
	return +pm(r) == +pm(i);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isDate.js
function xm(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isValid.js
function Sm(e) {
	return !(!xm(e) && typeof e != "number" || isNaN(+rm(e)));
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/differenceInCalendarMonths.js
function Cm(e, t, n) {
	let [r, i] = fm(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfMonth.js
function wm(e, t) {
	let n = rm(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeInterval.js
function Tm(e, t) {
	let [n, r] = fm(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachMonthOfInterval.js
function Em(e, t) {
	let { start: n, end: r } = Tm(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(nm(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfMonth.js
function Dm(e, t) {
	let n = rm(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfYear.js
function Om(e, t) {
	let n = rm(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfYear.js
function km(e, t) {
	let n = rm(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/eachYearOfInterval.js
function Am(e, t) {
	let { start: n, end: r } = Tm(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(nm(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfWeek.js
function jm(e, t) {
	let n = sm(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = rm(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/endOfISOWeek.js
function Mm(e, t) {
	return jm(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var Nm = {
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
}, Pm = (e, t, n) => {
	let r, i = Nm[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Fm(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var Im = {
	date: Fm({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Fm({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Fm({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Lm = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Rm = (e, t, n, r) => Lm[e];
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function zm(e) {
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
var Bm = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: zm({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: zm({
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
	month: zm({
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
	day: zm({
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
	dayPeriod: zm({
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
function Vm(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? Um(s, (e) => e.test(o)) : Hm(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function Hm(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function Um(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function Wm(e) {
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
var Gm = {
	code: "en-US",
	formatDistance: Pm,
	formatLong: Im,
	formatRelative: Rm,
	localize: Bm,
	match: {
		ordinalNumber: Wm({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Vm({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Vm({
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
		month: Vm({
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
		day: Vm({
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
		dayPeriod: Vm({
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
function Km(e, t) {
	let n = rm(e, t?.in);
	return mm(n, km(n)) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getISOWeek.js
function qm(e, t) {
	let n = rm(e, t?.in), r = lm(n) - +hm(n);
	return Math.round(r / Qp) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getWeekYear.js
function Jm(e, t) {
	let n = rm(e, t?.in), r = n.getFullYear(), i = sm(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = nm(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = cm(o, t), c = nm(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = cm(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeekYear.js
function Ym(e, t) {
	let n = sm(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Jm(e, t), a = nm(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), cm(a, t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getWeek.js
function Xm(e, t) {
	let n = rm(e, t?.in), r = cm(n, t) - +Ym(n, t);
	return Math.round(r / Qp) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/addLeadingZeros.js
function Zm(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/format/lightFormatters.js
var Qm = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return Zm(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : Zm(n + 1, 2);
	},
	d(e, t) {
		return Zm(e.getDate(), t.length);
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
		return Zm(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return Zm(e.getHours(), t.length);
	},
	m(e, t) {
		return Zm(e.getMinutes(), t.length);
	},
	s(e, t) {
		return Zm(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return Zm(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, $m = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, eh = {
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
		return Qm.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Jm(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Zm(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Zm(a, t.length);
	},
	R: function(e, t) {
		return Zm(um(e), t.length);
	},
	u: function(e, t) {
		return Zm(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return Zm(r, 2);
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
			case "qq": return Zm(r, 2);
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
			case "MM": return Qm.M(e, t);
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
			case "LL": return Zm(r + 1, 2);
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
		let i = Xm(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Zm(i, t.length);
	},
	I: function(e, t, n) {
		let r = qm(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Zm(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Qm.d(e, t);
	},
	D: function(e, t, n) {
		let r = Km(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Zm(r, t.length);
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
			case "ee": return Zm(a, 2);
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
			case "cc": return Zm(a, t.length);
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
			case "ii": return Zm(i, t.length);
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
		switch (i = r === 12 ? $m.noon : r === 0 ? $m.midnight : r / 12 >= 1 ? "pm" : "am", t) {
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
		switch (i = r >= 17 ? $m.evening : r >= 12 ? $m.afternoon : r >= 4 ? $m.morning : $m.night, t) {
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
		return Qm.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Qm.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Zm(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Zm(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Qm.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Qm.s(e, t);
	},
	S: function(e, t) {
		return Qm.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return nh(r);
			case "XXXX":
			case "XX": return rh(r);
			default: return rh(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return nh(r);
			case "xxxx":
			case "xx": return rh(r);
			default: return rh(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + th(r, ":");
			default: return "GMT" + rh(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + th(r, ":");
			default: return "GMT" + rh(r, ":");
		}
	},
	t: function(e, t, n) {
		return Zm(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Zm(+e, t.length);
	}
};
function th(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Zm(a, 2);
}
function nh(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Zm(Math.abs(e) / 60, 2) : rh(e, t);
}
function rh(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Zm(Math.trunc(r / 60), 2), a = Zm(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/format/longFormatters.js
var ih = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, ah = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, oh = {
	p: ah,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return ih(e, t);
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
		return a.replace("{{date}}", ih(r, t)).replace("{{time}}", ah(i, t));
	}
}, sh = /^D+$/, ch = /^Y+$/, lh = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function uh(e) {
	return sh.test(e);
}
function dh(e) {
	return ch.test(e);
}
function fh(e, t, n) {
	let r = ph(e, t, n);
	if (console.warn(r), lh.includes(e)) throw RangeError(r);
}
function ph(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/format.js
var mh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, hh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, gh = /^'([^]*?)'?$/, _h = /''/g, vh = /[a-zA-Z]/;
function yh(e, t, n) {
	let r = sm(), i = n?.locale ?? r.locale ?? Gm, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = rm(e, n?.in);
	if (!Sm(s)) throw RangeError("Invalid time value");
	let c = t.match(hh).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = oh[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(mh).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: bh(e)
		};
		if (eh[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(vh)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
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
		(!n?.useAdditionalWeekYearTokens && dh(a) || !n?.useAdditionalDayOfYearTokens && uh(a)) && fh(a, t, String(e));
		let o = eh[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function bh(e) {
	let t = e.match(gh);
	return t ? t[1].replace(_h, "'") : e;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getDaysInMonth.js
function xh(e, t) {
	let n = rm(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = nm(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getMonth.js
function Sh(e, t) {
	return rm(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getYear.js
function Ch(e, t) {
	return rm(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isAfter.js
function wh(e, t) {
	return +rm(e) > +rm(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isBefore.js
function Th(e, t) {
	return +rm(e) < +rm(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameMonth.js
function Eh(e, t, n) {
	let [r, i] = fm(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameYear.js
function Dh(e, t, n) {
	let [r, i] = fm(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/setMonth.js
function Oh(e, t, n) {
	let r = rm(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = nm(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = xh(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/setYear.js
function kh(e, t, n) {
	let r = rm(e, n?.in);
	return isNaN(+r) ? nm(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var Ah = 5, jh = 4;
function Mh(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, 34);
	return t.getMonth(e) === t.getMonth(a) ? Ah : jh;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function Nh(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function Ph(e, t) {
	let n = Nh(e, t), r = Mh(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/locale/en-US.js
var Fh = {
	...Gm,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => yh(e, t, {
				locale: Gm,
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
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => yh(e, n, {
				locale: Gm,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => yh(e, t, {
				locale: Gm,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => yh(e, n, {
				locale: Gm,
				...t
			}), r(e, "cccc");
		}
	}
}, Ih = class e {
	constructor(e, t) {
		this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Xp.tz(this.options.timeZone) : new (this.options.Date ?? Date)(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new Xp(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : im(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : am(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : gm(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : _m(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : mm(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : Cm(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Em(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Am(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Ph(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : Mm(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : wm(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : jm(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : Om(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : yh(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : qm(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Sh(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : Ch(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : Xm(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : wh(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Th(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : xm(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : bm(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : Eh(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Dh(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : vm(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : ym(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : Oh(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : kh(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : Nh(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : pm(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : lm(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Dm(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : cm(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : km(e), this.options = {
			locale: Fh,
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
Ih.yearFirstLocales = /* @__PURE__ */ new Set([
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
var Lh = new Ih(), Rh = class {
	constructor(e, t, n = Lh) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, zh = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, Bh = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function Vh(e) {
	return C.createElement("span", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Chevron.js
function Hh(e) {
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
function Uh(e) {
	let { day: t, modifiers: n, ...r } = e;
	return C.createElement("td", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/DayButton.js
function Wh(e) {
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
var $;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})($ ||= {});
var Gh;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Gh ||= {});
var Kh;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Kh ||= {});
var qh;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(qh ||= {});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useDayPicker.js
var Jh = (0, C.createContext)(void 0);
function Yh() {
	let e = (0, C.useContext)(Jh);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Xh(e) {
	let { options: t, className: n, ...r } = e, { classNames: i, components: a, styles: o } = Yh(), s = [i[$.Dropdown], n].join(" "), c = t?.find(({ value: e }) => e === r.value);
	return C.createElement("span", {
		"data-disabled": r.disabled,
		className: i[$.DropdownRoot],
		style: o?.[$.DropdownRoot]
	}, C.createElement(a.Select, {
		className: s,
		...r
	}, t?.map(({ value: e, label: t, disabled: n }) => C.createElement(a.Option, {
		key: e,
		value: e,
		disabled: n
	}, t))), C.createElement("span", {
		className: i[$.CaptionLabel],
		style: o?.[$.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, C.createElement(a.Chevron, {
		orientation: "down",
		size: 18,
		className: i[$.Chevron],
		style: o?.[$.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function Zh(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Footer.js
function Qh(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Month.js
function $h(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return C.createElement("div", { ...r }, e.children);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function eg(e) {
	let { calendarMonth: t, displayIndex: n, ...r } = e;
	return C.createElement("div", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function tg(e) {
	return C.createElement("table", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Months.js
function ng(e) {
	return C.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function rg(e) {
	let { components: t } = Yh();
	return C.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Nav.js
function ig(e) {
	let { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: i, ...a } = e, { components: o, classNames: s, styles: c, labels: { labelPrevious: l, labelNext: u } } = Yh(), d = (0, C.useCallback)((e) => {
		i && n?.(e);
	}, [i, n]), f = (0, C.useCallback)((e) => {
		r && t?.(e);
	}, [r, t]);
	return C.createElement("nav", { ...a }, C.createElement(o.PreviousMonthButton, {
		type: "button",
		className: s[$.PreviousMonthButton],
		style: c?.[$.PreviousMonthButton],
		tabIndex: r ? void 0 : -1,
		"aria-disabled": !r || void 0,
		"aria-label": l(r),
		onClick: f
	}, C.createElement(o.Chevron, {
		disabled: !r || void 0,
		className: s[$.Chevron],
		style: c?.[$.Chevron],
		orientation: "left"
	})), C.createElement(o.NextMonthButton, {
		type: "button",
		className: s[$.NextMonthButton],
		style: c?.[$.NextMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": !i || void 0,
		"aria-label": u(i),
		onClick: d
	}, C.createElement(o.Chevron, {
		disabled: !i || void 0,
		orientation: "right",
		className: s[$.Chevron],
		style: c?.[$.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function ag(e) {
	return C.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Option.js
function og(e) {
	return C.createElement("option", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function sg(e) {
	return C.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Root.js
function cg(e) {
	let { rootRef: t, ...n } = e;
	return C.createElement("div", {
		...n,
		ref: t
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Select.js
function lg(e) {
	return C.createElement("select", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Week.js
function ug(e) {
	let { week: t, ...n } = e;
	return C.createElement("tr", { ...n });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weekday.js
function dg(e) {
	return C.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weekdays.js
function fg(e) {
	return C.createElement("thead", { "aria-hidden": !0 }, C.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function pg(e) {
	let { week: t, ...n } = e;
	return C.createElement("th", { ...n });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function mg(e) {
	return C.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/Weeks.js
function hg(e) {
	return C.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function gg(e) {
	let { components: t } = Yh();
	return C.createElement(t.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/components/custom-components.js
var _g = /* @__PURE__ */ s({
	CaptionLabel: () => Vh,
	Chevron: () => Hh,
	Day: () => Uh,
	DayButton: () => Wh,
	Dropdown: () => Xh,
	DropdownNav: () => Zh,
	Footer: () => Qh,
	Month: () => $h,
	MonthCaption: () => eg,
	MonthGrid: () => tg,
	Months: () => ng,
	MonthsDropdown: () => rg,
	Nav: () => ig,
	NextMonthButton: () => ag,
	Option: () => og,
	PreviousMonthButton: () => sg,
	Root: () => cg,
	Select: () => lg,
	Week: () => ug,
	WeekNumber: () => pg,
	WeekNumberHeader: () => mg,
	Weekday: () => dg,
	Weekdays: () => fg,
	Weeks: () => hg,
	YearsDropdown: () => gg
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function vg(e, t, n = !1, r = Lh) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= +!!n && o(a, t) >= +!!n) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function yg(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function bg(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function xg(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function Sg(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function Cg(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function wg(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function Tg(e, t, n = Lh) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (wg(t, n)) return t.some((t) => i(e, t));
		if (bg(t)) return vg(t, e, !1, n);
		if (Cg(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (yg(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return xg(t) ? a(e, t.after) > 0 : Sg(t) ? a(t.before, e) > 0 : typeof t == "function" && t(e);
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function Eg(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[Gh.focused]: [],
		[Gh.outside]: [],
		[Gh.disabled]: [],
		[Gh.hidden]: [],
		[Gh.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && Tg(e, a, i)), S = !!(o && Tg(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && Tg(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[Gh.focused]: !1,
			[Gh.disabled]: !1,
			[Gh.hidden]: !1,
			[Gh.outside]: !1,
			[Gh.today]: !1
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
function Dg(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[Gh[r]] ? e.push(t[Gh[r]]) : t[Kh[r]] && e.push(t[Kh[r]]), e), [t[$.Day]]);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function Og(e) {
	return {
		..._g,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function kg(e) {
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
function Ag() {
	let e = {};
	for (let t in $) e[$[t]] = `rdp-${$[t]}`;
	for (let t in Gh) e[Gh[t]] = `rdp-${Gh[t]}`;
	for (let t in Kh) e[Kh[t]] = `rdp-${Kh[t]}`;
	for (let t in qh) e[qh[t]] = `rdp-${qh[t]}`;
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function jg(e, t, n) {
	return (n ?? new Ih(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function Mg(e, t, n) {
	return (n ?? new Ih(t)).format(e, "d");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function Ng(e, t = Lh) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function Pg(e, t, n) {
	return (n ?? new Ih(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function Fg(e, t = Lh) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function Ig() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function Lg(e, t = Lh) {
	return t.format(e, "yyyy");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/formatters/index.js
var Rg = /* @__PURE__ */ s({
	formatCaption: () => jg,
	formatDay: () => Mg,
	formatMonthDropdown: () => Ng,
	formatWeekNumber: () => Fg,
	formatWeekNumberHeader: () => Ig,
	formatWeekdayName: () => Pg,
	formatYearDropdown: () => Lg
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function zg(e) {
	return {
		...Rg,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function Bg(e, t, n, r) {
	let i = (r ?? new Ih(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function Vg(e, t, n) {
	return (n ?? new Ih(t)).formatMonthYear(e);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function Hg(e, t, n, r) {
	let i = (r ?? new Ih(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function Ug(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Wg() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Gg = "Go to the Next Month";
function Kg(e, t) {
	return Gg;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function qg(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function Jg(e, t, n) {
	return (n ?? new Ih(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Yg(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function Xg(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function Zg(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/labels/index.js
var Qg = /* @__PURE__ */ s({
	labelDayButton: () => Bg,
	labelGrid: () => Vg,
	labelGridcell: () => Hg,
	labelMonthDropdown: () => Ug,
	labelNav: () => Wg,
	labelNext: () => Kg,
	labelPrevious: () => qg,
	labelWeekNumber: () => Yg,
	labelWeekNumberHeader: () => Xg,
	labelWeekday: () => Jg,
	labelYearDropdown: () => Zg
}), $g = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function e_(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Qg,
		...e ?? {},
		labelDayButton: $g(Bg, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: $g(Ug, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: $g(Kg, e?.labelNext, n.labelNext),
		labelPrevious: $g(qg, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: $g(Yg, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: $g(Zg, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: $g(Vg, e?.labelGrid, n.labelGrid),
		labelGridcell: $g(Hg, e?.labelGridcell, n.labelGridcell),
		labelNav: $g(Wg, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: $g(Xg, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: $g(Jg, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function t_(e, t, n, r, i) {
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
function n_(e, t = {}, n = {}) {
	let r = { ...t?.[$.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function r_(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function i_(e, t, n, r, i = !1) {
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
function a_(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new Xp(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(Xp.tz(e)),
		newDate: (t, n, r) => new Xp(t, n, r, 12, 0, 0, e),
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
			let n = a(t.start), r = a(t.end), i = [], o = new Xp(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new Xp(o, e)), o.setMonth(o.getMonth() + 1, 1);
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
			let n = a(t.start), r = a(t.end), i = [], o = new Xp(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new Xp(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => Xm(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => qm(o(e)),
		differenceInCalendarDays: (e, t) => mm(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => Cm(o(e), o(t))
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useAnimation.js
var o_ = (e) => e instanceof HTMLElement ? e : null, s_ = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], c_ = (e) => o_(e.querySelector("[data-animated-month]")), l_ = (e) => o_(e.querySelector("[data-animated-caption]")), u_ = (e) => o_(e.querySelector("[data-animated-weeks]")), d_ = (e) => o_(e.querySelector("[data-animated-nav]")), f_ = (e) => o_(e.querySelector("[data-animated-weekdays]"));
function p_(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = (0, C.useRef)(null), s = (0, C.useRef)(r), c = (0, C.useRef)(!1);
	(0, C.useLayoutEffect)(() => {
		let l = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || l.length === 0 || r.length !== l.length) return;
		let u = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), f = d ? n[qh.caption_after_enter] : n[qh.caption_before_enter], p = d ? n[qh.weeks_after_enter] : n[qh.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (s_(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = c_(e);
			t && e.contains(t) && e.removeChild(t);
			let n = l_(e);
			n && n.classList.remove(f);
			let r = u_(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, c.current || u || i) return;
		let g = m instanceof HTMLElement ? s_(m) : [], _ = s_(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g?.every((e) => e instanceof HTMLElement)) {
			c.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = d_(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = l_(i);
				s && s.classList.add(f);
				let l = u_(i);
				l && l.classList.add(p);
				let u = () => {
					c.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), l && l.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = f_(o);
				m && (m.style.opacity = "0");
				let h = l_(o);
				h && (h.classList.add(d ? n[qh.caption_before_exit] : n[qh.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = u_(o);
				_ && _.classList.add(d ? n[qh.weeks_before_exit] : n[qh.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function m_(e, t, n, r) {
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
function h_(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function g_(e, t, n, r) {
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
function __(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function v_(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new zh(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new Rh(t, m, r);
			return a ? a.days.push(o) : e.push(new Bh(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function y_(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, today: u } = t, d = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : !n && d && (n = i(c(e.today ?? u(), -100))), r ? r = s(r) : !r && d && (r = l(e.today ?? u())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function b_(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function x_(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function S_(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function C_(e, t) {
	let [n, r] = (0, C.useState)(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useCalendar.js
function w_(e, t) {
	let [n, r] = y_(e, t), { startOfMonth: i, endOfMonth: a } = t, o = __(e, n, r, t), [s, c] = C_(o, e.month ? o : void 0);
	(0, C.useEffect)(() => {
		let i = __(e, n, r, t);
		c(i);
	}, [e.timeZone]);
	let { months: l, weeks: u, days: d, previousMonth: f, nextMonth: p } = (0, C.useMemo)(() => {
		let i = g_(s, r, { numberOfMonths: e.numberOfMonths }, t), o = v_(i, m_(i, e.endMonth ? a(e.endMonth) : void 0, {
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
			weeks: S_(o),
			days: h_(o),
			previousMonth: x_(s, n, e, t),
			nextMonth: b_(s, r, e, t)
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
var T_;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(T_ ||= {});
function E_(e) {
	return !e[Gh.disabled] && !e[Gh.hidden] && !e[Gh.outside];
}
function D_(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		E_(e) && (e[Gh.focused] && a < T_.FocusedModifier ? (i = o, a = T_.FocusedModifier) : r?.isEqualTo(o) && a < T_.LastFocused ? (i = o, a = T_.LastFocused) : n(o.date) && a < T_.Selected ? (i = o, a = T_.Selected) : e[Gh.today] && a < T_.Today && (i = o, a = T_.Today));
	}
	return i ||= e.find((e) => E_(t(e))), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function O_(e, t, n, r, i, a, o) {
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
function k_(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = O_(e, t, n.date, r, i, a, o), l = !!(a.disabled && Tg(c, a.disabled, o)), u = !!(a.hidden && Tg(c, a.hidden, o)), d = new Rh(c, c, o);
	return !l && !u ? d : k_(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/useFocus.js
function A_(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = (0, C.useState)(), c = D_(t.days, n, r || (() => !1), o), [l, u] = (0, C.useState)(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = k_(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function j_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = C_(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
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
function M_(e, t, n = 0, r = 0, i = !1, a = Lh) {
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
function N_(e, t, n = Lh) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function P_(e, t, n = Lh) {
	return vg(e, t.from, !1, n) || vg(e, t.to, !1, n) || vg(t, e.from, !1, n) || vg(t, e.to, !1, n);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function F_(e, t, n = Lh) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? vg(e, t, !1, n) : wg(t, n) ? t.some((t) => vg(e, t, !1, n)) : bg(t) ? t.from && t.to ? P_(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : Cg(t) ? N_(e, t.dayOfWeek, n) : yg(t) ? n.isAfter(t.before, t.after) ? P_(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : Tg(e.from, t, n) || Tg(e.to, t, n) : xg(t) || Sg(t) ? Tg(e.from, t, n) || Tg(e.to, t, n) : !1)) return !0;
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
function I_(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = C_(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : M_(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && F_({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && vg(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function L_(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = C_(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
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
function R_(e, t) {
	let n = L_(e, t), r = j_(e, t), i = I_(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function z_(e, t) {
	return e instanceof Xp && e.timeZone === t ? e : new Xp(e, t);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function B_(e, t, n) {
	if (!n) return z_(e, t);
	let r = z_(e, t), i = new Xp(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function V_(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? B_(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? B_(e, t, n) : e) : bg(e) ? {
		...e,
		from: e.from ? z_(e.from, t) : e.from,
		to: e.to ? z_(e.to, t) : e.to
	} : yg(e) ? {
		before: B_(e.before, t, n),
		after: B_(e.after, t, n)
	} : xg(e) ? { after: B_(e.after, t, n) } : Sg(e) ? { before: B_(e.before, t, n) } : e;
}
function H_(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => V_(e, t, n)) : V_(e, t, n));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@10.0.1_@types+react@19.2.17_react@19.2.8/node_modules/react-day-picker/dist/esm/DayPicker.js
function U_(e) {
	let t = e, n = t.timeZone;
	if (n && (t = {
		...e,
		timeZone: n
	}, t.today && (t.today = z_(t.today, n)), t.month && (t.month = z_(t.month, n)), t.defaultMonth && (t.defaultMonth = z_(t.defaultMonth, n)), t.startMonth && (t.startMonth = z_(t.startMonth, n)), t.endMonth && (t.endMonth = z_(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = z_(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((e) => z_(e, n)) : t.mode === "range" && t.selected && (t.selected = {
		from: t.selected.from ? z_(t.selected.from, n) : t.selected.from,
		to: t.selected.to ? z_(t.selected.to, n) : t.selected.to
	}), t.disabled !== void 0 && (t.disabled = H_(t.disabled, n)), t.hidden !== void 0 && (t.hidden = H_(t.hidden, n)), t.modifiers)) {
		let e = {};
		Object.keys(t.modifiers).forEach((r) => {
			e[r] = H_(t.modifiers?.[r], n);
		}), t.modifiers = e;
	}
	let { components: r, formatters: i, labels: a, dateLib: o, locale: s, classNames: c } = (0, C.useMemo)(() => {
		let e = {
			...Fh,
			...t.locale
		}, n = t.broadcastCalendar ? 1 : t.weekStartsOn, r = t.noonSafe && t.timeZone ? a_(t.timeZone, {
			weekStartsOn: n,
			locale: e
		}) : void 0, i = t.dateLib && r ? {
			...r,
			...t.dateLib
		} : t.dateLib ?? r, a = new Ih({
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
			components: Og(t.components),
			formatters: zg(t.formatters),
			labels: e_(t.labels, a.options),
			locale: e,
			classNames: {
				...Ag(),
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
	let { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: p, onDayClick: m, onDayFocus: h, onDayKeyDown: g, onDayMouseEnter: _, onDayMouseLeave: v, onNextClick: y, onPrevClick: b, showWeekNumber: x, styles: S } = t, { formatCaption: w, formatDay: T, formatMonthDropdown: E, formatWeekNumber: D, formatWeekNumberHeader: O, formatWeekdayName: k, formatYearDropdown: A } = i, j = w_(t, o), { days: M, months: N, navStart: P, navEnd: F, previousMonth: I, nextMonth: L, goToMonth: R } = j, z = Eg(M, t, P, F, o), { isSelected: B, select: V, selected: H } = R_(t, o) ?? {}, { blur: U, focused: W, isFocusTarget: G, moveFocus: ee, setFocused: te } = A_(t, j, z, B ?? (() => !1), o), { labelDayButton: ne, labelGridcell: re, labelGrid: ie, labelMonthDropdown: ae, labelNav: oe, labelPrevious: se, labelNext: ce, labelWeekday: le, labelWeekNumber: ue, labelWeekNumberHeader: de, labelYearDropdown: fe } = a, pe = (0, C.useMemo)(() => r_(o, t.ISOWeek, t.broadcastCalendar, t.today), [
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
		className: [c[$.Root], t.className].filter(Boolean).join(" "),
		style: {
			...S?.[$.Root],
			...t.style
		}
	}), [
		c,
		t.className,
		t.style,
		S
	]), De = kg(t), Oe = (e) => {
		let t = S?.[$.Dropdown], n = S?.[e];
		if (!(!t && !n)) return {
			...t,
			...n
		};
	}, ke = (0, C.useRef)(null);
	p_(ke, !!t.animate, {
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
	return C.createElement(Jh.Provider, { value: Ae }, C.createElement(r.Root, {
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
		className: c[$.Months],
		style: S?.[$.Months]
	}, !t.hideNavigation && !d && C.createElement(r.Nav, {
		"data-animated-nav": t.animate ? "true" : void 0,
		className: c[$.Nav],
		style: S?.[$.Nav],
		"aria-label": oe(),
		onPreviousClick: he,
		onNextClick: ge,
		previousMonth: I,
		nextMonth: L
	}), N.map((e, n) => {
		let a = t.reverseMonths ? N.length - 1 - n : n;
		return C.createElement(r.Month, {
			"data-animated-month": t.animate ? "true" : void 0,
			className: c[$.Month],
			style: S?.[$.Month],
			key: n,
			displayIndex: n,
			calendarMonth: e
		}, d === "around" && !t.hideNavigation && n === 0 && C.createElement(r.PreviousMonthButton, {
			type: "button",
			className: c[$.PreviousMonthButton],
			style: S?.[$.PreviousMonthButton],
			tabIndex: I ? void 0 : -1,
			"aria-disabled": !I || void 0,
			"aria-label": se(I),
			onClick: he,
			"data-animated-button": t.animate ? "true" : void 0
		}, C.createElement(r.Chevron, {
			disabled: !I || void 0,
			className: c[$.Chevron],
			style: S?.[$.Chevron],
			orientation: t.dir === "rtl" ? "right" : "left"
		})), C.createElement(r.MonthCaption, {
			"data-animated-caption": t.animate ? "true" : void 0,
			className: c[$.MonthCaption],
			style: S?.[$.MonthCaption],
			calendarMonth: e,
			displayIndex: n
		}, l?.startsWith("dropdown") ? C.createElement(r.DropdownNav, {
			className: c[$.Dropdowns],
			style: S?.[$.Dropdowns]
		}, (() => {
			let n = l === "dropdown" || l === "dropdown-months" ? C.createElement(r.MonthsDropdown, {
				key: "month",
				className: c[$.MonthsDropdown],
				"aria-label": ae(),
				disabled: !!t.disableNavigation,
				onChange: Ce(e.date, a),
				options: t_(e.date, P, F, i, o),
				style: Oe($.MonthsDropdown),
				value: o.getMonth(e.date)
			}) : C.createElement("span", { key: "month" }, E(e.date, o)), s = l === "dropdown" || l === "dropdown-years" ? C.createElement(r.YearsDropdown, {
				key: "year",
				className: c[$.YearsDropdown],
				"aria-label": fe(o.options),
				disabled: !!t.disableNavigation,
				onChange: we(e.date, a),
				options: i_(P, F, i, o, !!t.reverseYears),
				style: Oe($.YearsDropdown),
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
			className: c[$.CaptionLabel],
			style: S?.[$.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, w(e.date, o.options, o))), d === "around" && !t.hideNavigation && n === f - 1 && C.createElement(r.NextMonthButton, {
			type: "button",
			className: c[$.NextMonthButton],
			style: S?.[$.NextMonthButton],
			tabIndex: L ? void 0 : -1,
			"aria-disabled": !L || void 0,
			"aria-label": ce(L),
			onClick: ge,
			"data-animated-button": t.animate ? "true" : void 0
		}, C.createElement(r.Chevron, {
			disabled: !L || void 0,
			className: c[$.Chevron],
			style: S?.[$.Chevron],
			orientation: t.dir === "rtl" ? "left" : "right"
		})), n === f - 1 && d === "after" && !t.hideNavigation && C.createElement(r.Nav, {
			"data-animated-nav": t.animate ? "true" : void 0,
			className: c[$.Nav],
			style: S?.[$.Nav],
			"aria-label": oe(),
			onPreviousClick: he,
			onNextClick: ge,
			previousMonth: I,
			nextMonth: L
		}), C.createElement(r.MonthGrid, {
			role: "grid",
			"aria-multiselectable": u === "multiple" || u === "range",
			"aria-label": ie(e.date, o.options, o) || void 0,
			className: c[$.MonthGrid],
			style: S?.[$.MonthGrid]
		}, !t.hideWeekdays && C.createElement(r.Weekdays, {
			"data-animated-weekdays": t.animate ? "true" : void 0,
			className: c[$.Weekdays],
			style: S?.[$.Weekdays]
		}, x && C.createElement(r.WeekNumberHeader, {
			"aria-label": de(o.options),
			className: c[$.WeekNumberHeader],
			style: S?.[$.WeekNumberHeader],
			scope: "col"
		}, O()), pe.map((e) => C.createElement(r.Weekday, {
			"aria-label": le(e, o.options, o),
			className: c[$.Weekday],
			key: String(e),
			style: S?.[$.Weekday],
			scope: "col"
		}, k(e, o.options, o)))), C.createElement(r.Weeks, {
			"data-animated-weeks": t.animate ? "true" : void 0,
			className: c[$.Weeks],
			style: S?.[$.Weeks]
		}, e.weeks.map((e) => C.createElement(r.Week, {
			className: c[$.Week],
			key: e.weekNumber,
			style: S?.[$.Week],
			week: e
		}, x && C.createElement(r.WeekNumber, {
			week: e,
			style: S?.[$.WeekNumber],
			"aria-label": ue(e.weekNumber, { locale: s }),
			className: c[$.WeekNumber],
			scope: "row",
			role: "rowheader"
		}, D(e.weekNumber, o)), e.days.map((e) => {
			let { date: n } = e, i = z(e);
			if (i[Gh.focused] = !i.hidden && !!W?.isEqualTo(e), i[Kh.selected] = B?.(n) || i.selected, bg(H)) {
				let { from: e, to: t } = H;
				i[Kh.range_start] = !!(e && t && o.isSameDay(n, e)), i[Kh.range_end] = !!(e && t && o.isSameDay(n, t)), i[Kh.range_middle] = vg(H, n, !0, o);
			}
			let a = n_(i, S, t.modifiersStyles), s = Dg(i, c, t.modifiersClassNames), l = !me && !i.hidden ? re(n, i, o.options, o) : void 0;
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
				className: c[$.DayButton],
				style: S?.[$.DayButton],
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
		className: c[$.Footer],
		style: S?.[$.Footer],
		role: "status",
		"aria-live": "polite"
	}, t.footer)));
}
//#endregion
//#region src/components/ui/calendar.tsx
function W_({ className: e, classNames: t, showOutsideDays: n = !0, captionLayout: r = "label", buttonVariant: i = "ghost", locale: a, formatters: o, components: s, ...c }) {
	let l = Ag();
	return /* @__PURE__ */ (0, Y.jsx)(U_, {
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
			button_previous: J(pa({ variant: i }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", l.button_previous),
			button_next: J(pa({ variant: i }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", l.button_next),
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
			Chevron: ({ className: e, orientation: t, ...n }) => t === "left" ? /* @__PURE__ */ (0, Y.jsx)(Ci, { className: J("cn-rtl-flip size-4", e) }) : t === "right" ? /* @__PURE__ */ (0, Y.jsx)(wi, { className: J("cn-rtl-flip size-4", e) }) : /* @__PURE__ */ (0, Y.jsx)(Si, { className: J("size-4", e) }),
			DayButton: ({ ...e }) => /* @__PURE__ */ (0, Y.jsx)(G_, {
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
function G_({ className: e, day: t, modifiers: n, locale: r, ...i }) {
	let a = Ag(), o = C.useRef(null);
	return C.useEffect(() => {
		n.focused && o.current?.focus();
	}, [n.focused]), /* @__PURE__ */ (0, Y.jsx)(ma, {
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
//#region src/components/streamlit/calendar.tsx
function K_(e) {
	if (e === null) return;
	let t = Number(e.slice(0, 4)), n = Number(e.slice(5, 7)), r = Number(e.slice(8, 10)), i = /* @__PURE__ */ new Date(0);
	return i.setHours(12, 0, 0, 0), i.setFullYear(t, n - 1, r), i;
}
function q_(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function J_({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t), i = K_(e.props.minDate), a = K_(e.props.maxDate), o = K_(r.value), [s, c] = (0, C.useState)(o ?? i ?? a ?? /* @__PURE__ */ new Date());
	(0, C.useEffect)(() => {
		o !== void 0 && c(o);
	}, [r.value]);
	let l = [];
	i !== void 0 && l.push({ before: i }), a !== void 0 && l.push({ after: a });
	let u = e.props.disabled ? !0 : l.length > 0 ? l : void 0;
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"aria-label": e.props.label,
		className: "w-fit rounded-lg border",
		"data-ssui-component": "calendar",
		"data-testid": "ssui-v2-calendar",
		role: "group",
		children: /* @__PURE__ */ (0, Y.jsx)(W_, {
			disabled: u,
			endMonth: a,
			mode: "single",
			month: s,
			onMonthChange: c,
			onSelect: (e) => {
				n(e === void 0 ? null : q_(e));
			},
			selected: o,
			startMonth: i
		})
	});
}
//#endregion
//#region node_modules/.pnpm/input-otp@1.4.2_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/input-otp/dist/index.mjs
var Y_ = Object.defineProperty, X_ = Object.defineProperties, Z_ = Object.getOwnPropertyDescriptors, Q_ = Object.getOwnPropertySymbols, $_ = Object.prototype.hasOwnProperty, ev = Object.prototype.propertyIsEnumerable, tv = (e, t, n) => t in e ? Y_(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, nv = (e, t) => {
	for (var n in t ||= {}) $_.call(t, n) && tv(e, n, t[n]);
	if (Q_) for (var n of Q_(t)) ev.call(t, n) && tv(e, n, t[n]);
	return e;
}, rv = (e, t) => X_(e, Z_(t)), iv = (e, t) => {
	var n = {};
	for (var r in e) $_.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && Q_) for (var r of Q_(e)) t.indexOf(r) < 0 && ev.call(e, r) && (n[r] = e[r]);
	return n;
};
function av(e) {
	return [
		setTimeout(e, 0),
		setTimeout(e, 10),
		setTimeout(e, 50)
	];
}
function ov(e) {
	let t = C.useRef();
	return C.useEffect(() => {
		t.current = e;
	}), t.current;
}
var sv = 18, cv = 40, lv = `${cv}px`, uv = [
	"[data-lastpass-icon-root]",
	"com-1password-button",
	"[data-dashlanecreated]",
	"[style$=\"2147483647 !important;\"]"
].join(",");
function dv({ containerRef: e, inputRef: t, pushPasswordManagerStrategy: n, isFocused: r }) {
	let [i, a] = C.useState(!1), [o, s] = C.useState(!1), [c, l] = C.useState(!1), u = C.useMemo(() => n !== "none" && (n === "increase-width" || n === "experimental-no-flickering") && i && o, [
		i,
		o,
		n
	]), d = C.useCallback(() => {
		let r = e.current, i = t.current;
		if (!r || !i || c || n === "none") return;
		let o = r, s = o.getBoundingClientRect().left + o.offsetWidth, u = o.getBoundingClientRect().top + o.offsetHeight / 2, d = s - sv, f = u;
		document.querySelectorAll(uv).length === 0 && document.elementFromPoint(d, f) === r || (a(!0), l(!0));
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
			s(e >= cv);
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
		PWM_BADGE_SPACE_WIDTH: lv
	};
}
var fv = C.createContext({}), pv = C.forwardRef((e, t) => {
	var n = e, { value: r, onChange: i, maxLength: a, textAlign: o = "left", pattern: s, placeholder: c, inputMode: l = "numeric", onComplete: u, pushPasswordManagerStrategy: d = "increase-width", pasteTransformer: f, containerClassName: p, noScriptCSSFallback: m = hv, render: h, children: g } = n, _ = iv(n, [
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
	let [y, b] = C.useState(typeof _.defaultValue == "string" ? _.defaultValue : ""), x = r ?? y, S = ov(x), w = C.useCallback((e) => {
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
				mv(e.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), mv(e.sheet, `[data-input-otp]:autofill { ${t} }`), mv(e.sheet, `[data-input-otp]:-webkit-autofill { ${t} }`), mv(e.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), mv(e.sheet, "[data-input-otp] + * { pointer-events: all !important; }");
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
		av(() => {
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
	let R = dv({
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
	]), W = C.useMemo(() => C.createElement("input", rv(nv({ autoComplete: _.autoComplete || "one-time-code" }, _), {
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
	]), ee = C.useMemo(() => h ? h(G) : C.createElement(fv.Provider, { value: G }, g), [
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
pv.displayName = "Input";
function mv(e, t) {
	try {
		e.insertRule(t);
	} catch {
		console.error("input-otp could not insert CSS rule:", t);
	}
}
var hv = "\n[data-input-otp] {\n  --nojs-bg: white !important;\n  --nojs-fg: black !important;\n\n  background-color: var(--nojs-bg) !important;\n  color: var(--nojs-fg) !important;\n  caret-color: var(--nojs-fg) !important;\n  letter-spacing: .25em !important;\n  text-align: center !important;\n  border: 1px solid var(--nojs-fg) !important;\n  border-radius: 4px !important;\n  width: 100% !important;\n}\n@media (prefers-color-scheme: dark) {\n  [data-input-otp] {\n    --nojs-bg: black !important;\n    --nojs-fg: white !important;\n  }\n}";
//#endregion
//#region src/components/ui/input-otp.tsx
function gv({ className: e, containerClassName: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(pv, {
		"data-slot": "input-otp",
		containerClassName: J("cn-input-otp flex items-center has-disabled:opacity-50", t),
		spellCheck: !1,
		className: J("disabled:cursor-not-allowed", e),
		...n
	});
}
function _v({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "input-otp-group",
		className: J("flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40", e),
		...t
	});
}
function vv({ index: e, className: t, ...n }) {
	let { char: r, hasFakeCaret: i, isActive: a } = C.useContext(fv)?.slots[e] ?? {};
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
function yv({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, commitDraft: i, draft: a, setDraft: o } = Ii(e.state, t), s = e.props.pattern === "digits" ? "^[0-9]*$" : "^[a-zA-Z0-9]*$";
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "input_otp",
		"data-testid": "ssui-v2-input-otp",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(gv, {
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
			children: /* @__PURE__ */ (0, Y.jsx)(_v, { children: Array.from({ length: e.props.maxLength }, (e, t) => /* @__PURE__ */ (0, Y.jsx)(vv, { index: t }, t)) })
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/fieldset/root/FieldsetRootContext.mjs
var bv = /*#__PURE__*/ C.createContext(void 0);
function xv(e = !1) {
	let t = C.useContext(bv);
	if (!t && !e) throw Error(Dt(86));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Sv(e = {}) {
	let { id: t, implicit: n = !1, controlRef: r } = e, { controlId: i, registerControlId: a } = Wa(), o = bn(t), s = n ? i : void 0, c = pt(() => Symbol("labelable-control")), l = C.useRef(!1), u = C.useRef(t != null), d = X(() => {
		!l.current || a === Bt || (l.current = !1, a(c.current, void 0));
	});
	return Z(() => {
		if (a === Bt) return;
		let e;
		if (n) {
			let n = r?.current;
			e = br(n) && n.closest("label") != null ? t ?? null : s ?? o;
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
function Cv(e, t) {
	let n = bn(e);
	return Z(() => (t(n), () => {
		t(void 0);
	}), [n, t]), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/field/control/FieldControl.mjs
var wv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, name: a, value: o, disabled: s = !1, onValueChange: c, defaultValue: l, autoFocus: u = !1, style: d, ...f } = e, { state: p, name: m, disabled: h, setTouched: g, setDirty: _, validityData: v, setFocused: y, setFilled: b, validationMode: x, validation: S } = La(), { clearErrors: w } = Ha(), T = h || s, E = m ?? a, D = {
		...p,
		disabled: T
	}, { labelId: O } = Wa(), k = Sv({ id: i });
	Z(() => {
		let e = o != null;
		S.inputRef.current?.value || e && o !== "" ? b(!0) : e && o === "" && b(!1);
	}, [
		S.inputRef,
		b,
		o
	]);
	let A = C.useRef(null);
	Z(() => {
		u && A.current === ds(Xr(A.current)) && y(!0);
	}, [u, y]);
	let [j] = ut({
		controlled: o,
		default: l,
		name: "FieldControl",
		state: "value"
	}), M = o !== void 0, N = M ? j : void 0, P = X(() => S.inputRef.current?.value);
	return Ra(S.inputRef, k, N, P, !T, a), cn("input", e, {
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
					c?.(t, zn(xn, e.nativeEvent)), _(t !== v.initialValue), b(t !== ""), e.nativeEvent.defaultPrevented || (w(E), S.change(t));
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
		stateAttributesMapping: Na
	});
}), Tv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(wv, {
		ref: t,
		...e
	});
});
//#endregion
//#region src/components/ui/input.tsx
function Ev({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(Tv, {
		type: t,
		"data-slot": "input",
		className: J("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...n
	});
}
//#endregion
//#region src/components/streamlit/input.tsx
function Dv({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commitDraft: r, draft: i, setDraft: a } = Ii(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "input",
		"data-testid": "ssui-v2-input",
		children: [/* @__PURE__ */ (0, Y.jsx)("label", {
			className: "text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(Ev, {
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
function Ov({ envelope: e }) {
	let t = {
		"data-ssui-component": "link_button",
		"data-testid": "ssui-v2-link-button"
	};
	return e.props.disabled ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(ma, {
			disabled: !0,
			variant: e.props.variant,
			children: e.props.text
		})
	}) : /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-flex p-px",
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)("a", {
			className: J(pa({ variant: e.props.variant })),
			href: e.props.url,
			rel: e.props.target === "_blank" ? "noopener noreferrer" : void 0,
			target: e.props.target,
			children: e.props.text
		})
	});
}
//#endregion
//#region src/components/ui/pagination.tsx
function kv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: J("mx-auto flex w-full justify-center", e),
		...t
	});
}
function Av({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("ul", {
		"data-slot": "pagination-content",
		className: J("flex items-center gap-0.5", e),
		...t
	});
}
function jv({ ...e }) {
	return /* @__PURE__ */ (0, Y.jsx)("li", {
		"data-slot": "pagination-item",
		...e
	});
}
function Mv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("span", {
		"aria-hidden": !0,
		"data-slot": "pagination-ellipsis",
		className: J("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: [/* @__PURE__ */ (0, Y.jsx)(Ei, {}), /* @__PURE__ */ (0, Y.jsx)("span", {
			className: "sr-only",
			children: "More pages"
		})]
	});
}
//#endregion
//#region src/components/streamlit/pagination.tsx
function Nv(e, t) {
	return Array.from({ length: Math.max(t - e + 1, 0) }, (t, n) => e + n);
}
function Pv(e, t, n) {
	if (t <= n * 2 + 5) return Nv(1, t);
	let r = Math.max(e - n, 1), i = Math.min(e + n, t), a = r > 2, o = i < t - 1;
	return !a && o ? [
		...Nv(1, n * 2 + 3),
		"ellipsis-right",
		t
	] : a && !o ? [
		1,
		"ellipsis-left",
		...Nv(t - (n * 2 + 2), t)
	] : [
		1,
		"ellipsis-left",
		...Nv(r, i),
		"ellipsis-right",
		t
	];
}
function Fv({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t), i = Pv(r.value, e.props.totalPages, e.props.siblingCount);
	return /* @__PURE__ */ (0, Y.jsx)(kv, {
		"aria-label": e.props.label,
		"data-ssui-component": "pagination",
		"data-testid": "ssui-v2-pagination",
		children: /* @__PURE__ */ (0, Y.jsxs)(Av, { children: [
			/* @__PURE__ */ (0, Y.jsx)(jv, { children: /* @__PURE__ */ (0, Y.jsxs)(ma, {
				"aria-label": "Go to previous page",
				disabled: e.props.disabled || r.value === 1,
				onClick: () => {
					n(r.value - 1);
				},
				size: "default",
				variant: "ghost",
				children: [/* @__PURE__ */ (0, Y.jsx)(Ci, { "aria-hidden": "true" }), /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "hidden sm:inline",
					children: "Previous"
				})]
			}) }),
			i.map((t) => /* @__PURE__ */ (0, Y.jsx)(jv, { children: typeof t == "number" ? /* @__PURE__ */ (0, Y.jsx)(ma, {
				"aria-current": t === r.value ? "page" : void 0,
				"aria-label": `Go to page ${t}`,
				disabled: e.props.disabled,
				onClick: () => {
					n(t);
				},
				size: "icon",
				variant: t === r.value ? "outline" : "ghost",
				children: t
			}) : /* @__PURE__ */ (0, Y.jsx)(Mv, {}) }, t)),
			/* @__PURE__ */ (0, Y.jsx)(jv, { children: /* @__PURE__ */ (0, Y.jsxs)(ma, {
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
				}), /* @__PURE__ */ (0, Y.jsx)(wi, { "aria-hidden": "true" })]
			}) })
		] })
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/stringifyLocale.mjs
function Iv(e) {
	return Array.isArray(e) ? e.map((e) => Iv(e)).join(",") : e == null ? "" : String(e);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/formatNumber.mjs
var Lv = /* @__PURE__ */ new Map();
function Rv(e, t) {
	let n = JSON.stringify({
		locale: Iv(e),
		options: t
	}), r = Lv.get(n);
	if (r) return r;
	let i = new Intl.NumberFormat(e, t);
	return Lv.set(n, i), i;
}
function zv(e, t, n) {
	return e == null ? "" : Rv(t, n).format(e);
}
function Bv(e, t, n) {
	return e == null ? "" : n ? zv(e, t, n) : zv(e / 100, t, { style: "percent" });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootContext.mjs
var Vv = /*#__PURE__*/ C.createContext(void 0);
function Hv() {
	let e = C.useContext(Vv);
	if (e === void 0) throw Error(Dt(51));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootDataAttributes.mjs
var Uv = /*#__PURE__*/ function(e) {
	return e.complete = "data-complete", e.indeterminate = "data-indeterminate", e.progressing = "data-progressing", e;
}({}), Wv = { status(e) {
	return e === "progressing" ? { [Uv.progressing]: "" } : e === "complete" ? { [Uv.complete]: "" } : e === "indeterminate" ? { [Uv.indeterminate]: "" } : null;
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRoot.mjs
function Gv(e, t) {
	return t == null ? "indeterminate progress" : e || `${t}%`;
}
var Kv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { format: n, getAriaValueText: r = Gv, locale: i, max: a = 100, min: o = 0, value: s, render: c, className: l, children: u, style: d, ...f } = e, [p, m] = C.useState(), h = Jr(n), g = "indeterminate";
	Number.isFinite(s) && (g = s === a ? "complete" : "progressing");
	let _ = Bv(s, i, h.current), v = C.useMemo(() => ({ status: g }), [g]), y = {
		"aria-labelledby": p,
		"aria-valuemax": a,
		"aria-valuemin": o,
		"aria-valuenow": s ?? void 0,
		"aria-valuetext": r(_, s),
		role: "progressbar",
		children: /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [u, /*#__PURE__*/ (0, Y.jsx)("span", {
			role: "presentation",
			style: Ta,
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
	]), x = cn("div", e, {
		state: v,
		ref: t,
		props: [y, f],
		stateAttributesMapping: Wv
	});
	return /*#__PURE__*/ (0, Y.jsx)(Vv.Provider, {
		value: b,
		children: x
	});
}), qv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = Hv();
	return cn("div", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: Wv
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/valueToPercent.mjs
function Jv(e, t, n) {
	return (e - t) * 100 / (n - t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/indicator/ProgressIndicator.mjs
var Yv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { max: o, min: s, value: c, state: l } = Hv(), u = Number.isFinite(c) && c !== null ? Jv(c, s, o) : null;
	return cn("div", e, {
		state: l,
		ref: t,
		props: [{ style: u == null ? {} : {
			insetInlineStart: 0,
			height: "inherit",
			width: `${u}%`
		} }, a],
		stateAttributesMapping: Wv
	});
}), Xv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, style: a, ...o } = e, { value: s, formattedValue: c, state: l } = Hv();
	return cn("span", e, {
		state: l,
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: typeof i == "function" ? i(s == null ? "indeterminate" : c, s) : s == null ? null : c
		}, o],
		stateAttributesMapping: Wv
	});
}), Zv = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, { setLabelId: s, state: c } = Hv();
	return cn("span", e, {
		state: c,
		ref: t,
		props: [{
			id: Cv(a, s),
			role: "presentation"
		}, o],
		stateAttributesMapping: Wv
	});
});
//#endregion
//#region src/components/ui/progress.tsx
function Qv({ className: e, children: t, value: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Kv, {
		value: n,
		"data-slot": "progress",
		className: J("flex flex-wrap gap-3", e),
		...r,
		children: [t, /* @__PURE__ */ (0, Y.jsx)($v, { children: /* @__PURE__ */ (0, Y.jsx)(ey, {}) })]
	});
}
function $v({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(qv, {
		className: J("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", e),
		"data-slot": "progress-track",
		...t
	});
}
function ey({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Yv, {
		"data-slot": "progress-indicator",
		className: J("h-full bg-primary transition-all", e),
		...t
	});
}
function ty({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Zv, {
		className: J("text-sm font-medium", e),
		"data-slot": "progress-label",
		...t
	});
}
function ny({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(Xv, {
		className: J("ml-auto text-sm text-muted-foreground tabular-nums", e),
		"data-slot": "progress-value",
		...t
	});
}
//#endregion
//#region src/components/streamlit/progress.tsx
function ry({ envelope: e }) {
	let t = e.props.label ?? "Progress";
	return /* @__PURE__ */ (0, Y.jsxs)(Qv, {
		"aria-label": t,
		"data-ssui-component": "progress",
		"data-testid": "ssui-v2-progress",
		value: e.props.value,
		children: [e.props.label === null ? null : /* @__PURE__ */ (0, Y.jsx)(ty, { children: e.props.label }), e.props.showValue ? /* @__PURE__ */ (0, Y.jsx)(ny, { children: (e, t) => `${Math.round(t ?? 0)}%` }) : null]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio/root/RadioRootDataAttributes.mjs
var iy = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), ay = {
	checked(e) {
		return e ? { [iy.checked]: "" } : { [iy.unchecked]: "" };
	},
	...ir,
	...Na
}, oy = "data-composite-item-active", sy = /*#__PURE__*/ C.createContext(void 0);
function cy() {
	return C.useContext(sy);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/serializeValue.mjs
function ly(e) {
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
var uy = /*#__PURE__*/ C.createContext(void 0);
function dy() {
	let e = C.useContext(uy);
	if (e === void 0) throw Error(Dt(52));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/radio/root/RadioRoot.mjs
var fy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, readOnly: a = !1, required: o = !1, "aria-labelledby": s, value: c, inputRef: l, nativeButton: u = !1, id: d, style: f, ...p } = e, m = cy(), { disabled: h, readOnly: g, required: _, form: v, checkedValue: y, touched: b = !1, validation: x, name: S } = m ?? {}, w = m?.setCheckedValue ?? Bt, T = m?.setTouched ?? Bt, E = m?.registerControlRef ?? Bt, D = m?.registerInputRef ?? Bt, { setTouched: O, setFilled: k, state: A, disabled: j } = La(), M = Ba(), { labelId: N, getDescriptionProps: P } = Wa(), F = j || M.disabled || h || i, I = g || a, L = _ || o, R = v, z = m ? y === c : c === "", B = C.useRef(null), V = C.useRef(null), H = X((e) => {
		e && E(e, F);
	}), U = At(l, V, D);
	Z(() => {
		V.current?.checked && k(!0);
	}, [k]), Z(() => {
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
	let W = bn(), G = Sv({
		id: d,
		implicit: !1,
		controlRef: B
	}), ee = u ? void 0 : G, te = Ga(s, N, V, !u, ee), ne = {
		role: "radio",
		"aria-checked": z,
		"aria-required": L || void 0,
		"aria-readonly": I || void 0,
		"aria-labelledby": te,
		[oy]: z ? "" : void 0,
		id: u ? G : W,
		onKeyDown(e) {
			e.key === "Enter" && e.preventDefault();
		},
		onClick(e) {
			if (e.defaultPrevented || F || I) return;
			e.preventDefault();
			let t = V.current;
			t && t.dispatchEvent(new (_r(t)).PointerEvent("click", {
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
	}, { getButtonProps: re, buttonRef: ie } = Ur({
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
		style: S ? Ea : Ta,
		"aria-hidden": !0,
		...c === void 0 ? Ht : { value: ly(c) },
		disabled: F,
		checked: z,
		required: L,
		readOnly: I,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented || F || I || c === void 0) return;
			let t = zn(xn, e.nativeEvent);
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
		x ? (e) => x.getValidationProps(F, e) : Ht
	], de = cn("span", e, {
		enabled: !ce,
		state: oe,
		ref: le,
		props: ue,
		stateAttributesMapping: ay
	});
	return /*#__PURE__*/ (0, Y.jsxs)(uy.Provider, {
		value: se,
		children: [ce ? /*#__PURE__*/ (0, Y.jsx)(fp, {
			tag: "span",
			render: n,
			className: r,
			style: f,
			state: oe,
			refs: le,
			props: ue,
			stateAttributesMapping: ay
		}) : de, /*#__PURE__*/ (0, Y.jsx)("input", {
			...ae,
			suppressHydrationWarning: !0
		})]
	});
}), py = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = dy(), c = s.checked, { mounted: l, transitionStatus: u, setMounted: d } = qn(c), f = {
		...s,
		transitionStatus: u
	}, p = C.useRef(null), m = a || l, h = cn("span", e, {
		ref: [t, p],
		state: f,
		props: o,
		stateAttributesMapping: ay
	});
	return ei({
		open: c,
		ref: p,
		onComplete() {
			c || d(!1);
		}
	}), m ? h : null;
}), my = [];
function hy(e) {
	let { loopFocus: t = !0, orientation: n = "both", grid: r, onLoop: i, direction: a, highlightedIndex: o, onHighlightedIndexChange: s, rootRef: c, enableHomeAndEndKeys: l = !1, stopEventPropagation: u = !1, disabledIndices: d, modifierKeys: f = my } = e, [p, m] = C.useState(0), h = r != null, g = C.useRef(null), _ = At(g, c), v = C.useRef([]), y = C.useRef(!1), b = o ?? p, x = X((e, t = !1) => {
		if ((s ?? m)(e), t) {
			let t = v.current[e];
			yf(g.current, t, a, n);
		}
	}), S = X((e) => {
		if (e.size === 0 || y.current) return;
		y.current = !0;
		let t = Array.from(e.keys()), r = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, i = r ? t.indexOf(r) : -1;
		if (i !== -1) x(i);
		else if (sc(t, b, d)) {
			let e = oc(t, { disabledIndices: d });
			rc(t, e) || x(e);
		}
		yf(g.current, r, a, n);
	});
	Z(() => {
		if (d == null || o != null || !y.current) return;
		let e = v.current;
		if (sc(e, b, d)) {
			let t = oc(e, { disabledIndices: d });
			rc(e, t) || x(t);
		}
	}, [
		d,
		o,
		b,
		v,
		x
	]);
	let w = X((e, t, n) => i ? i(e, t, n, v) : n), T = X((e) => {
		let o = l ? mf : pf;
		if (!o.has(e.key) || gy(e, f) || !g.current) return;
		let s = a === "rtl", c = s ? rf : af, p = {
			horizontal: c,
			vertical: nf,
			both: c
		}[n], m = s ? af : rf, _ = {
			horizontal: m,
			vertical: tf,
			both: m
		}[n], y = ps(e.nativeEvent);
		if (y != null && vf(y) && !Sp(y)) {
			let t = y.selectionStart, n = y.selectionEnd, r = y.value ?? "";
			if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== p && t > 0) return;
		}
		let S = b, C = ic(v, d), T = ac(v, d);
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
			vertical: [nf],
			both: [c, nf]
		}[n], D = {
			horizontal: [m],
			vertical: [tf],
			both: [m, tf]
		}[n], O = h ? o : {
			horizontal: l ? uf : lf,
			vertical: l ? ff : df,
			both: o
		}[n];
		l && (e.key === "Home" ? S = C : e.key === "End" && (S = T)), S === b && (E.includes(e.key) || D.includes(e.key)) && (t && S === T && E.includes(e.key) ? (S = C, i && (S = i(e, b, S, v))) : t && S === C && D.includes(e.key) ? (S = T, i && (S = i(e, b, S, v))) : S = oc(v.current, {
			startingIndex: S,
			decrement: D.includes(e.key),
			disabledIndices: d
		})), S !== b && !rc(v.current, S) && (u && e.stopPropagation(), O.has(e.key) && e.preventDefault(), x(S, !0), queueMicrotask(() => {
			v.current[S]?.focus();
		}));
	});
	return {
		props: {
			ref: _,
			onFocus(e) {
				let t = g.current, n = ps(e.nativeEvent);
				!t || n == null || !vf(n) || n.setSelectionRange(0, n.value.length ?? 0);
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
function gy(e, t) {
	for (let n of gf.values()) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function _y(e) {
	let { render: t, className: n, style: r, refs: i = Vt, props: a = Vt, state: o = Ht, stateAttributesMapping: s, highlightedIndex: c, onHighlightedIndexChange: l, orientation: u, grid: d, loopFocus: f, onLoop: p, enableHomeAndEndKeys: m, onMapChange: h, stopEventPropagation: g = !0, rootRef: _, disabledIndices: v, modifierKeys: y, highlightItemOnHover: b = !1, tag: x = "div", ...S } = e, { props: w, highlightedIndex: T, onHighlightedIndexChange: E, elementsRef: D, onMapChange: O, relayKeyboardEvent: k } = hy({
		grid: d,
		loopFocus: f,
		onLoop: p,
		orientation: u,
		highlightedIndex: c,
		onHighlightedIndexChange: l,
		rootRef: _,
		stopEventPropagation: g,
		enableHomeAndEndKeys: m,
		direction: Tt(),
		disabledIndices: v,
		modifierKeys: y
	}), A = cn(x, e, {
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
	return /*#__PURE__*/ (0, Y.jsx)(Br.Provider, {
		value: j,
		children: /*#__PURE__*/ (0, Y.jsx)(bt, {
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
var vy = [hf], yy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i, readOnly: a, required: o, onValueChange: s, value: c, defaultValue: l, form: u, name: d, inputRef: f, id: p, style: m, ...h } = e, { setTouched: g, setFocused: _, validationMode: v, name: y, disabled: b, state: x, validation: S, setDirty: w, setFilled: T, validityData: E } = La(), { labelId: D } = Wa(), { clearErrors: O } = Ha(), k = xv(!0), A = b || i, j = y ?? d, M = bn(p), [N, P] = ut({
		controlled: c,
		default: l,
		name: "RadioGroup",
		state: "value"
	}), [F, I] = C.useState(!1), L = X((e, t) => {
		s?.(e, t), !t.isCanceled && P(e);
	}), R = C.useRef(null), z = C.useRef(null), B = C.useRef(null);
	function V(e) {
		let t;
		return f && (typeof f == "function" ? t = f(e) : f.current = e), z.current = e, S.inputRef.current = e, t;
	}
	let H = X((e, t = !1) => {
		if (e) {
			if (t) {
				R.current === e && (R.current = null);
				return;
			}
			R.current ??= e;
		}
	}), U = X((e) => {
		if (!e || e.disabled) return;
		B.current ||= e;
		let t = z.current;
		if (e.checked || t == null || t.disabled) return V(e);
	}), W = X(() => {
		let e = z.current;
		return !e || e.disabled || !e.checked ? null : N ?? null;
	});
	Ra(R, M, N ?? null, W, !A, d), Qa(N, () => {
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
			fs(e.currentTarget, e.relatedTarget) || (g(!0), _(!1), v === "onBlur" && S.commit(N));
		},
		onKeyDownCapture(e) {
			e.key.startsWith("Arrow") && (I(!0), _(!0));
		}
	};
	return /*#__PURE__*/ (0, Y.jsx)(sy.Provider, {
		value: te,
		children: /*#__PURE__*/ (0, Y.jsx)(_y, {
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
			stateAttributesMapping: Na,
			enableHomeAndEndKeys: !1,
			modifierKeys: vy
		})
	});
});
//#endregion
//#region src/components/ui/radio-group.tsx
function by({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(yy, {
		"data-slot": "radio-group",
		className: J("grid w-full gap-2", e),
		...t
	});
}
function xy({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(fy, {
		"data-slot": "radio-group-item",
		className: J("group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(py, {
			"data-slot": "radio-group-indicator",
			className: "flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, Y.jsx)("span", { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" })
		})
	});
}
//#endregion
//#region src/components/streamlit/radio-group.tsx
function Sy({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), r = (0, C.useId)(), { commit: i, state: a } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("fieldset", {
		className: "grid min-w-0 gap-2 p-px",
		"data-ssui-component": "radio_group",
		"data-testid": "ssui-v2-radio-group",
		children: [/* @__PURE__ */ (0, Y.jsx)("legend", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(by, {
			"aria-labelledby": n,
			disabled: e.props.disabled,
			onValueChange: i,
			value: a.value,
			children: e.props.options.map((e, t) => {
				let n = `${r}-${t}`;
				return /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, Y.jsx)(xy, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootContext.mjs
var Cy = /*#__PURE__*/ C.createContext(void 0);
function wy() {
	let e = C.useContext(Cy);
	if (e === void 0) throw Error(Dt(53));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootCssVars.mjs
var Ty = /*#__PURE__*/ function(e) {
	return e.scrollAreaCornerHeight = "--scroll-area-corner-height", e.scrollAreaCornerWidth = "--scroll-area-corner-width", e;
}({});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/utils/getOffset.mjs
function Ey(e, t, n) {
	if (!e) return 0;
	let r = getComputedStyle(e), i = n === "x" ? "Inline" : "Block";
	return n === "x" && t === "margin" ? parseFloat(r[`${t}InlineStart`]) * 2 : parseFloat(r[`${t}${i}Start`]) + parseFloat(r[`${t}${i}End`]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.mjs
var Dy = /*#__PURE__*/ function(e) {
	return e.orientation = "data-orientation", e.hovering = "data-hovering", e.scrolling = "data-scrolling", e.hasOverflowX = "data-has-overflow-x", e.hasOverflowY = "data-has-overflow-y", e.overflowXStart = "data-overflow-x-start", e.overflowXEnd = "data-overflow-x-end", e.overflowYStart = "data-overflow-y-start", e.overflowYEnd = "data-overflow-y-end", e;
}({}), Oy = "base-ui-disable-scrollbar", ky = {
	className: Oy,
	getElement(e) {
		return /*#__PURE__*/ (0, Y.jsx)("style", {
			nonce: e,
			href: Oy,
			precedence: "base-ui:low",
			children: `.${Oy}{scrollbar-width:none}.${Oy}::-webkit-scrollbar{display:none}`
		});
	}
}, Ay = /*#__PURE__*/ function(e) {
	return e.scrolling = "data-scrolling", e.hasOverflowX = "data-has-overflow-x", e.hasOverflowY = "data-has-overflow-y", e.overflowXStart = "data-overflow-x-start", e.overflowXEnd = "data-overflow-x-end", e.overflowYStart = "data-overflow-y-start", e.overflowYEnd = "data-overflow-y-end", e;
}({}), jy = {
	hasOverflowX: (e) => e ? { [Ay.hasOverflowX]: "" } : null,
	hasOverflowY: (e) => e ? { [Ay.hasOverflowY]: "" } : null,
	overflowXStart: (e) => e ? { [Ay.overflowXStart]: "" } : null,
	overflowXEnd: (e) => e ? { [Ay.overflowXEnd]: "" } : null,
	overflowYStart: (e) => e ? { [Ay.overflowYStart]: "" } : null,
	overflowYEnd: (e) => e ? { [Ay.overflowYEnd]: "" } : null,
	cornerHidden: () => null
}, My = /*#__PURE__*/ C.createContext(void 0), Ny = { disableStyleElements: !1 };
function Py() {
	return C.useContext(My) ?? Ny;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRoot.mjs
var Fy = {
	x: 0,
	y: 0
}, Iy = {
	width: 0,
	height: 0
}, Ly = {
	xStart: !1,
	xEnd: !1,
	yStart: !1,
	yEnd: !1
}, Ry = {
	x: !0,
	y: !0,
	corner: !0
}, zy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, overflowEdgeThreshold: i, style: a, ...o } = e, { xStart: s, xEnd: c, yStart: l, yEnd: u } = By(i), d = bn(), f = Yi(), p = Yi(), { nonce: m, disableStyleElements: h } = Py(), [g, _] = C.useState(!1), [v, y] = C.useState(!1), [b, x] = C.useState(!1), [S, w] = C.useState(!1), [T, E] = C.useState(!1), [D, O] = C.useState(Iy), [k, A] = C.useState(Iy), [j, M] = C.useState(Ly), [N, P] = C.useState(Ry), F = C.useRef(null), I = C.useRef(null), L = C.useRef(null), R = C.useRef(null), z = C.useRef(null), B = C.useRef(null), V = C.useRef(null), H = C.useRef(!1), U = C.useRef(0), W = C.useRef(0), G = C.useRef(0), ee = C.useRef(0), te = C.useRef("vertical"), ne = C.useRef(Fy), re = X((e) => {
		let t = e.x - ne.current.x, n = e.y - ne.current.y;
		ne.current = e, n !== 0 && (x(!0), f.start(500, () => {
			x(!1);
		})), t !== 0 && (y(!0), p.start(500, () => {
			y(!1);
		}));
	}), ie = X((e) => {
		e.button === 0 && (H.current = !0, U.current = e.clientY, W.current = e.clientX, te.current = e.currentTarget.getAttribute(Dy.orientation), I.current && (G.current = I.current.scrollTop, ee.current = I.current.scrollLeft), z.current && te.current === "vertical" && z.current.setPointerCapture(e.pointerId), B.current && te.current === "horizontal" && B.current.setPointerCapture(e.pointerId));
	}), ae = X((e) => {
		if (!H.current) return;
		let t = e.clientY - U.current, n = e.clientX - W.current;
		if (I.current) {
			let r = I.current.scrollHeight, i = I.current.clientHeight, a = I.current.scrollWidth, o = I.current.clientWidth;
			if (z.current && L.current && te.current === "vertical") {
				let n = Ey(L.current, "padding", "y"), a = Ey(z.current, "margin", "y"), o = z.current.offsetHeight, s = t / (L.current.offsetHeight - o - n - a);
				I.current.scrollTop = G.current + s * (r - i), e.preventDefault(), x(!0), f.start(500, () => {
					x(!1);
				});
			}
			if (B.current && R.current && te.current === "horizontal") {
				let t = Ey(R.current, "padding", "x"), r = Ey(B.current, "margin", "x"), i = B.current.offsetWidth, s = n / (R.current.offsetWidth - i - t - r);
				I.current.scrollLeft = ee.current + s * (a - o), e.preventDefault(), y(!0), p.start(500, () => {
					y(!1);
				});
			}
		}
	}), oe = X((e) => {
		H.current = !1, z.current && te.current === "vertical" && z.current.hasPointerCapture(e.pointerId) && z.current.releasePointerCapture(e.pointerId), B.current && te.current === "horizontal" && B.current.hasPointerCapture(e.pointerId) && B.current.releasePointerCapture(e.pointerId);
	});
	function se(e) {
		w(e.pointerType === "touch");
	}
	function ce(e) {
		if (se(e), e.pointerType !== "touch") {
			let t = fs(F.current, e.target);
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
			[Ty.scrollAreaCornerHeight]: `${D.height}px`,
			[Ty.scrollAreaCornerWidth]: `${D.width}px`
		}
	}, de = cn("div", e, {
		state: le,
		ref: [t, F],
		props: [ue, o],
		stateAttributesMapping: jy
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
	return /*#__PURE__*/ (0, Y.jsxs)(Cy.Provider, {
		value: fe,
		children: [!h && ky.getElement(m), de]
	});
});
function By(e) {
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
var Vy = /*#__PURE__*/ C.createContext(void 0);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/clamp.mjs
function Hy(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewportCssVars.mjs
var Uy = /*#__PURE__*/ function(e) {
	return e.scrollAreaOverflowXStart = "--scroll-area-overflow-x-start", e.scrollAreaOverflowXEnd = "--scroll-area-overflow-x-end", e.scrollAreaOverflowYStart = "--scroll-area-overflow-y-start", e.scrollAreaOverflowYEnd = "--scroll-area-overflow-y-end", e;
}({});
function Wy(e, t) {
	return Math.max(0, e - t);
}
function Gy(e, t) {
	if (t <= 0) return 0;
	let n = Hy(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewport.mjs
var Ky = !1;
function qy() {
	Ky || Ho || (typeof CSS < "u" && "registerProperty" in CSS && [
		Uy.scrollAreaOverflowXStart,
		Uy.scrollAreaOverflowXEnd,
		Uy.scrollAreaOverflowYStart,
		Uy.scrollAreaOverflowYEnd
	].forEach((e) => {
		try {
			CSS.registerProperty({
				name: e,
				syntax: "<length>",
				inherits: !1,
				initialValue: "0px"
			});
		} catch {}
	}), Ky = !0);
}
var Jy = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { viewportRef: o, scrollbarYRef: s, scrollbarXRef: c, thumbYRef: l, thumbXRef: u, cornerRef: d, cornerSize: f, setCornerSize: p, setThumbSize: m, rootId: h, setHiddenState: g, hiddenState: _, setHasMeasuredScrollbar: v, handleScroll: y, setHovering: b, setOverflowEdges: x, overflowEdges: S, overflowEdgeThreshold: w, scrollingX: T, scrollingY: E } = wy(), D = Tt(), O = C.useRef(!0), k = C.useRef([
		NaN,
		NaN,
		NaN,
		NaN
	]), A = Yi(), j = Yi(), M = X(() => {
		let e = o.current, t = s.current, n = c.current, r = l.current, i = u.current, a = d.current;
		if (!e) return;
		let h = e.scrollHeight, _ = e.scrollWidth, y = e.clientHeight, b = e.clientWidth, S = e.scrollTop, C = e.scrollLeft, T = k.current, E = Number.isNaN(T[0]);
		if (T[0] = y, T[1] = h, T[2] = b, T[3] = _, E && v(!0), h === 0 || _ === 0) return;
		let O = Yy(e), A = O.y, j = O.x, M = b / _, N = y / h, P = Math.max(0, _ - b), F = Math.max(0, h - y), I = 0, L = 0;
		if (!j) {
			let e = 0;
			e = Hy(D === "rtl" ? -C : C, 0, P), I = Gy(e, P), L = P - I;
		}
		let R = A ? 0 : Hy(S, 0, F), z = A ? 0 : Gy(R, F), B = A ? 0 : F - z, V = j ? 0 : b, H = A ? 0 : y, U = 0, W = 0;
		!j && !A && (U = t?.offsetWidth || 0, W = n?.offsetHeight || 0);
		let G = f.width === 0 && f.height === 0, ee = G ? U : 0, te = G ? W : 0, ne = Ey(n, "padding", "x"), re = Ey(t, "padding", "y"), ie = Ey(i, "margin", "x"), ae = Ey(r, "margin", "y"), oe = V - ne - ie, se = H - re - ae, ce = n ? Math.min(n.offsetWidth - ee, oe) : oe, le = t ? Math.min(t.offsetHeight - te, se) : se, ue = Math.max(16, ce * M), de = Math.max(16, le * N);
		if (m((e) => e.height === de && e.width === ue ? e : {
			width: ue,
			height: de
		}), t && r) {
			let e = t.offsetHeight - de - re - ae, n = h - y, i = n === 0 ? 0 : S / n, a = Math.min(e, Math.max(0, i * e));
			r.style.transform = `translate3d(0,${a}px,0)`;
		}
		if (n && i) {
			let e = n.offsetWidth - ue - ne - ie, t = _ - b, r = t === 0 ? 0 : C / t, a = D === "rtl" ? Hy(r * e, -e, 0) : Hy(r * e, 0, e);
			i.style.transform = `translate3d(${a}px,0,0)`;
		}
		let fe = [
			[Uy.scrollAreaOverflowXStart, I],
			[Uy.scrollAreaOverflowXEnd, L],
			[Uy.scrollAreaOverflowYStart, z],
			[Uy.scrollAreaOverflowYEnd, B]
		];
		for (let [t, n] of fe) e.style.setProperty(t, `${n}px`);
		a && (j || A ? p({
			width: 0,
			height: 0
		}) : !j && !A && p({
			width: U,
			height: W
		})), g((e) => Xy(e, O));
		let pe = {
			xStart: !j && I > w.xStart,
			xEnd: !j && L > w.xEnd,
			yStart: !A && z > w.yStart,
			yEnd: !A && B > w.yEnd
		};
		x((e) => e.xStart === pe.xStart && e.xEnd === pe.xEnd && e.yStart === pe.yStart && e.yEnd === pe.yEnd ? e : pe);
	});
	Z(() => {
		o.current && qy();
	}, [o]), Z(() => {
		queueMicrotask(M);
	}, [
		M,
		_,
		D,
		w.xStart,
		w.xEnd,
		w.yStart,
		w.yEnd
	]), Z(() => {
		o.current?.matches(":hover") && b(!0);
	}, [o, b]), Z(() => {
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
		className: ky.className,
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
	]), I = cn("div", e, {
		ref: [t, o],
		state: F,
		props: [P, a],
		stateAttributesMapping: jy
	}), L = C.useMemo(() => ({ computeThumbPosition: M }), [M]);
	return /*#__PURE__*/ (0, Y.jsx)(Vy.Provider, {
		value: L,
		children: I
	});
});
function Yy(e) {
	let t = e.clientHeight >= e.scrollHeight, n = e.clientWidth >= e.scrollWidth;
	return {
		y: t,
		x: n,
		corner: t || n
	};
}
function Xy(e, t) {
	return e.y === t.y && e.x === t.x && e.corner === t.corner ? e : t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarContext.mjs
var Zy = /*#__PURE__*/ C.createContext(void 0);
function Qy() {
	let e = C.useContext(Zy);
	if (e === void 0) throw Error(Dt(54));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.mjs
var $y = /*#__PURE__*/ function(e) {
	return e.scrollAreaThumbHeight = "--scroll-area-thumb-height", e.scrollAreaThumbWidth = "--scroll-area-thumb-width", e;
}({}), eb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, orientation: i = "vertical", keepMounted: a = !1, style: o, ...s } = e, { hovering: c, scrollingX: l, scrollingY: u, hiddenState: d, overflowEdges: f, scrollbarYRef: p, scrollbarXRef: m, viewportRef: h, thumbYRef: g, thumbXRef: _, handlePointerDown: v, handlePointerUp: y, handleScroll: b, rootId: x, thumbSize: S, hasMeasuredScrollbar: w } = wy(), T = {
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
	}, E = Tt(), D = !w && !a, O = i === "vertical" ? d.y : d.x, k = a || !O;
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
		return qr(t, "wheel", n, { passive: !1 });
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
			let t = ps(e.nativeEvent), n = i === "vertical" ? g.current : _.current;
			if (!(n && fs(n, t)) && h.current) {
				if (g.current && p.current && i === "vertical") {
					let t = Ey(g.current, "margin", "y"), n = Ey(p.current, "padding", "y"), r = g.current.offsetHeight, i = p.current.getBoundingClientRect(), a = e.clientY - i.top - r / 2 - n + t / 2, o = h.current.scrollHeight, s = h.current.clientHeight, c = a / (p.current.offsetHeight - r - n - t) * (o - s);
					h.current.scrollTop = c;
				}
				if (_.current && m.current && i === "horizontal") {
					let t = Ey(_.current, "margin", "x"), n = Ey(m.current, "padding", "x"), r = _.current.offsetWidth, i = m.current.getBoundingClientRect(), a = e.clientX - i.left - r / 2 - n + t / 2, o = h.current.scrollWidth, s = h.current.clientWidth, c = a / (m.current.offsetWidth - r - n - t), l;
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
				bottom: `var(${Ty.scrollAreaCornerHeight})`,
				insetInlineEnd: 0,
				[$y.scrollAreaThumbHeight]: `${S.height}px`
			},
			...i === "horizontal" && {
				insetInlineStart: 0,
				insetInlineEnd: `var(${Ty.scrollAreaCornerWidth})`,
				bottom: 0,
				[$y.scrollAreaThumbWidth]: `${S.width}px`
			}
		}
	}, j = cn("div", e, {
		ref: [t, i === "vertical" ? p : m],
		state: T,
		props: [A, s],
		stateAttributesMapping: jy
	}), M = C.useMemo(() => ({ orientation: i }), [i]);
	return k ? /*#__PURE__*/ (0, Y.jsx)(Zy.Provider, {
		value: M,
		children: j
	}) : null;
}), tb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { thumbYRef: o, thumbXRef: s, handlePointerDown: c, handlePointerMove: l, handlePointerUp: u, setScrollingX: d, setScrollingY: f, scrollingX: p, scrollingY: m, hasMeasuredScrollbar: h } = wy(), { orientation: g } = Qy(), _ = {
		scrolling: g === "horizontal" ? p : m,
		orientation: g
	};
	function v(e) {
		g === "vertical" && f(!1), g === "horizontal" && d(!1), u(e);
	}
	return cn("div", e, {
		ref: [t, g === "vertical" ? o : s],
		state: _,
		props: [{
			onPointerDown: c,
			onPointerMove: l,
			onPointerUp: v,
			onPointerCancel: v,
			style: {
				visibility: h ? void 0 : "hidden",
				...g === "vertical" && { height: `var(${$y.scrollAreaThumbHeight})` },
				...g === "horizontal" && { width: `var(${$y.scrollAreaThumbWidth})` }
			}
		}, a]
	});
}), nb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { cornerRef: o, cornerSize: s, hiddenState: c } = wy(), l = cn("div", e, {
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
function rb({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(zy, {
		"data-slot": "scroll-area",
		className: J("relative", e),
		...n,
		children: [
			/* @__PURE__ */ (0, Y.jsx)(Jy, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(ib, {}),
			/* @__PURE__ */ (0, Y.jsx)(nb, {})
		]
	});
}
function ib({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(eb, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": t,
		orientation: t,
		className: J("flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent", e),
		...n,
		children: /* @__PURE__ */ (0, Y.jsx)(tb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
//#endregion
//#region src/components/streamlit/scroll-area.tsx
function ab({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "min-w-0",
		"data-ssui-component": "scroll_area",
		"data-testid": "ssui-v2-scroll-area",
		children: [e.props.title === null ? null : /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "mb-2 text-sm font-medium",
			children: e.props.title
		}), /* @__PURE__ */ (0, Y.jsx)(rb, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var ob = /*#__PURE__*/ C.createContext(null), sb = /*#__PURE__*/ C.createContext(null);
function cb() {
	let e = C.useContext(ob);
	if (e === null) throw Error(Dt(60));
	return e;
}
function lb() {
	let e = C.useContext(sb);
	if (e === null) throw Error(Dt(61));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/itemEquality.mjs
var ub = (e, t) => Object.is(e, t);
function db(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function fb(e, t, n) {
	return !e || e.length === 0 ? !1 : e.some((e) => e !== void 0 && db(t, e, n));
}
function pb(e, t, n) {
	return !e || e.length === 0 ? -1 : e.findIndex((e) => e !== void 0 && db(e, t, n));
}
function mb(e, t, n) {
	return e.filter((e) => !db(t, e, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function hb(e) {
	return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function gb(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (hb(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function _b(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return ly(e);
}
function vb(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? ly(e.value) : ly(e);
}
function yb(e, t, n) {
	function r() {
		return _b(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return t[e] ?? r();
	if (Array.isArray(t)) {
		let n = t, i = hb(n) ? n.flatMap((e) => e.items) : n;
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
function bb(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, Y.jsx)(C.Fragment, { children: yb(r, t, n) }, i)), e), []);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/store.mjs
var xb = {
	id: Q((e) => e.id),
	labelId: Q((e) => e.labelId),
	modal: Q((e) => e.modal),
	multiple: Q((e) => e.multiple),
	items: Q((e) => e.items),
	itemToStringLabel: Q((e) => e.itemToStringLabel),
	itemToStringValue: Q((e) => e.itemToStringValue),
	isItemEqualToValue: Q((e) => e.isItemEqualToValue),
	value: Q((e) => e.value),
	hasSelectedValue: Q((e) => {
		let { value: t, multiple: n, itemToStringValue: r } = e;
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : vb(t, r) !== "";
	}),
	hasNullItemLabel: Q((e, t) => t ? gb(e.items) : !1),
	open: Q((e) => e.open),
	mounted: Q((e) => e.mounted),
	forceMount: Q((e) => e.forceMount),
	transitionStatus: Q((e) => e.transitionStatus),
	openMethod: Q((e) => e.openMethod),
	activeIndex: Q((e) => e.activeIndex),
	selectedIndex: Q((e) => e.selectedIndex),
	isActive: Q((e, t) => e.activeIndex === t),
	isSelected: Q((e, t) => {
		let n = e.isItemEqualToValue, r = e.value;
		return e.multiple ? Array.isArray(r) && r.some((e) => db(t, e, n)) : db(t, r, n);
	}),
	isSelectedByFocus: Q((e, t) => e.selectedIndex === t),
	popupProps: Q((e) => e.popupProps),
	triggerProps: Q((e) => e.triggerProps),
	triggerElement: Q((e) => e.triggerElement),
	positionerElement: Q((e) => e.positionerElement),
	listElement: Q((e) => e.listElement),
	popupSide: Q((e) => e.popupSide),
	scrollUpArrowVisible: Q((e) => e.scrollUpArrowVisible),
	scrollDownArrowVisible: Q((e) => e.scrollDownArrowVisible),
	hasScrollArrows: Q((e) => e.hasScrollArrows)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/areArraysEqual.mjs
function Sb(e, t, n = (e, t) => e === t) {
	return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRoot.mjs
function Cb(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = ub, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = Ha(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = La(), I = Sv({ id: t }), L = N || d, R = M ?? c, [z, B] = ut({
		controlled: n,
		default: y ? r ?? Vt : r,
		name: "Select",
		state: "value"
	}), [V, H] = ut({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), U = C.useRef([]), W = C.useRef([]), G = C.useRef(null), ee = C.useRef(null), te = C.useRef(0), ne = C.useRef(null), re = C.useRef([]), ie = C.useRef(!1), ae = C.useRef(null), oe = C.useRef(null), se = C.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), ce = C.useRef(!1), { mounted: le, setMounted: ue, transitionStatus: de } = qn(V), { openMethod: fe, triggerProps: pe } = rp(V), me = pt(() => new nd({
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
	})).current, he = Qu(me, xb.activeIndex), ge = Qu(me, xb.selectedIndex), _e = Qu(me, xb.triggerElement), ve = Qu(me, xb.positionerElement), ye = bp(fe), be = fe ?? ye ?? null, xe = C.useMemo(() => y ? "" : vb(z, x), [
		y,
		z,
		x
	]), Se = C.useMemo(() => y && Array.isArray(z) ? z.map((e) => vb(e, x)) : vb(z, x), [
		y,
		z,
		x
	]);
	Ra(Jr(me.state.triggerElement), I, z, X(() => Se), !L, c);
	let Ce = C.useRef(z), we = y ? Array.isArray(z) && z.length > 0 : z != null && vb(z, x) !== "";
	Z(() => {
		z !== Ce.current && me.set("forceMount", !0);
	}, [me, z]), Z(() => {
		j(we);
	}, [we, j]), Z(function() {
		let e = re.current, t;
		if (y) {
			let n = Array.isArray(z) ? z : [];
			if (n.length === 0) t = null;
			else {
				let r = n[n.length - 1], i = pb(e, r, S);
				t = i === -1 ? null : i;
			}
		} else {
			let n = pb(e, z, S);
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
		return Array.isArray(e) && Array.isArray(t) ? !Sb(e, t, (e, t) => db(e, t, S)) : e !== t;
	}
	Qa(z, () => {
		E(R), D(Te(z)), P.change(z);
	});
	let Ee = X((e, t) => {
		s?.(e, t), !t.isCanceled && (H(e), !e && (t.reason === "focus-out" || t.reason === "outside-press") && (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	}), De = X(() => {
		ue(!1), me.update({
			activeIndex: null,
			openMethod: null
		}), _?.(!1);
	});
	ei({
		enabled: !h,
		open: V,
		ref: G,
		onComplete() {
			V || De();
		}
	}), C.useImperativeHandle(h, () => ({ unmount: De }), [De]);
	let Oe = X((e, t) => {
		i?.(e, t), !t.isCanceled && B(e);
	}), ke = X(() => {
		let e = me.state.listElement || G.current;
		if (!e) return;
		let t = Wy(e.scrollHeight, e.clientHeight), n = Gy(e.scrollTop, t), r = n > 0, i = n < t;
		me.state.scrollUpArrowVisible !== r && me.set("scrollUpArrowVisible", r), me.state.scrollDownArrowVisible !== i && me.set("scrollDownArrowVisible", i);
	}), Ae = Td({
		open: V,
		onOpenChange: Ee,
		elements: {
			reference: _e,
			floating: ve
		}
	}), je = Tl(Ae, {
		enabled: !f && !L,
		event: "mousedown"
	}), Me = Ol(Ae), K = Ud(Ae, {
		enabled: !f && !L,
		listRef: U,
		activeIndex: he,
		selectedIndex: ge,
		disabledIndices: Vt,
		onNavigate(e) {
			e === null && !V || me.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), Ne = Wd(Ae, {
		enabled: !f && !L && (V || !y),
		listRef: W,
		activeIndex: he,
		selectedIndex: ge,
		disabledIndices: (e) => Sp(U.current[e]),
		onMatch(e) {
			V ? me.set("activeIndex", e) : Oe(re.current[e], zn("none"));
		},
		onTyping(e) {
			ie.current = e;
		}
	}), Pe = C.useMemo(() => {
		let e = qt(Ne.reference, K.reference, Me.reference, je.reference, pe);
		return I && (e.id = I), e;
	}, [
		je.reference,
		Ne.reference,
		K.reference,
		Me.reference,
		pe,
		I
	]), Fe = C.useMemo(() => qt(sd, Ne.floating, K.floating, Me.floating), [
		Ne.floating,
		K.floating,
		Me.floating
	]), Ie = K.item ?? Ht;
	Lu(() => {
		me.update({
			popupProps: Fe,
			triggerProps: Pe
		});
	}), Z(() => {
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
	]), Re = At(g, P.inputRef), ze = y && Array.isArray(z) && z.length > 0, q = y ? void 0 : R, Be = C.useMemo(() => !y || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = vb(e, x);
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
	return /*#__PURE__*/ (0, Y.jsx)(ob.Provider, {
		value: Le,
		children: /*#__PURE__*/ (0, Y.jsxs)(sb.Provider, {
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
							let t = e.currentTarget.value, n = zn(xn, e.nativeEvent);
							function r() {
								if (y) return;
								let e = t.toLowerCase(), r = re.current.findIndex((t) => vb(t, x).toLowerCase() === e || _b(t, b).toLowerCase() === e);
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
					style: R ? Ea : Ta,
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
function wb(e) {
	return e == null ? void 0 : `${e}-label`;
}
function Tb(e, t) {
	return e ?? t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/trigger/SelectTrigger.mjs
var Eb = 2, Db = 400, Ob = {
	...Do,
	...Na,
	popupSide: (e) => e ? { "data-popup-side": e } : null,
	value: () => null
}, kb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, setFocused: u, validationMode: d, state: f, disabled: p } = La(), { labelId: m } = Wa(), { store: h, setOpen: g, selectionRef: _, validation: v, readOnly: y, required: b, alignItemWithTriggerActiveRef: x, disabled: S } = cb(), w = p || S || a, T = Qu(h, xb.open), E = Qu(h, xb.mounted), D = Qu(h, xb.value), O = Qu(h, xb.triggerProps), k = Qu(h, xb.positionerElement), A = Qu(h, xb.listElement), j = Qu(h, xb.popupSide), M = Qu(h, xb.id), N = Qu(h, xb.labelId), P = Qu(h, xb.hasSelectedValue), F = E && k ? j : null, I = i ?? M, L = Tb(m, N);
	Sv({ id: I });
	let R = Jr(k), z = C.useRef(null), { getButtonProps: B, buttonRef: V } = Ur({
		disabled: w,
		native: o
	}), H = X((e) => {
		h.set("triggerElement", e);
	}), U = Yi(), W = Yi(), G = Yi();
	C.useEffect(() => {
		if (T) return G.start(Db, () => {
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
	let ee = qt(O, {
		id: I,
		role: "combobox",
		"aria-expanded": T ? "true" : "false",
		"aria-haspopup": "listbox",
		"aria-controls": T ? A?.id ?? xs(k)?.id : void 0,
		"aria-labelledby": L,
		"aria-readonly": y || void 0,
		"aria-required": b || void 0,
		tabIndex: w ? -1 : 0,
		onFocus(e) {
			u(!0), T && x.current && g(!1, zn(xn, e.nativeEvent)), U.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			fs(k, e.relatedTarget) || (l(!0), u(!1), d === "onBlur" && v.commit(D));
		},
		onMouseDown(e) {
			if (T) return;
			let t = Xr(e.currentTarget);
			function n(e) {
				if (!z.current) return;
				let t = e.target;
				if (fs(z.current, t) || fs(R.current, t)) return;
				let n = up(z.current);
				e.clientX >= n.left - Eb && e.clientX <= n.right + Eb && e.clientY >= n.top - Eb && e.clientY <= n.bottom + Eb || g(!1, zn(Mn, e));
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
	return cn("button", e, {
		ref: [
			t,
			z,
			V,
			H
		],
		state: ne,
		stateAttributesMapping: Ob,
		props: te
	});
}), Ab = { value: () => null }, jb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, { store: c, valueRef: l } = cb(), u = Qu(c, xb.value), d = Qu(c, xb.items), f = Qu(c, xb.itemToStringLabel), p = Qu(c, xb.hasSelectedValue), m = !p && a != null && i == null, h = Qu(c, xb.hasNullItemLabel, m), g = {
		value: u,
		placeholder: !p
	}, _ = null;
	return _ = typeof i == "function" ? i(u) : i ?? (!p && a != null && !h ? a : Array.isArray(u) ? bb(u, d, f) : yb(u, d, f)), cn("span", e, {
		state: g,
		ref: [t, l],
		props: [{ children: _ }, s],
		stateAttributesMapping: Ab
	});
}), Mb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = cb();
	return cn("span", e, {
		state: { open: Qu(o, xb.open) },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: Eo
	});
}), Nb = /*#__PURE__*/ C.createContext(void 0), Pb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { store: n } = cb(), r = Qu(n, xb.mounted), i = Qu(n, xb.forceMount);
	return r || i ? /*#__PURE__*/ (0, Y.jsx)(Nb.Provider, {
		value: !0,
		children: /*#__PURE__*/ (0, Y.jsx)(ol, {
			ref: t,
			...e
		})
	}) : null;
}), Fb = /*#__PURE__*/ C.createContext(void 0);
function Ib() {
	let e = C.useContext(Fb);
	if (!e) throw Error(Dt(59));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/utils.mjs
function Lb(e, t) {
	e && Object.assign(e.style, t);
}
var Rb = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, zb = { position: "fixed" }, Bb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o = "bottom", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = $c, style: _, ...v } = e, { store: y, listRef: b, labelsRef: x, alignItemWithTriggerActiveRef: S, selectedItemTextRef: w, valuesRef: T, initialValueRef: E, popupRef: D, setValue: O } = cb(), k = lb(), A = Qu(y, xb.open), j = Qu(y, xb.mounted), M = Qu(y, xb.modal), N = Qu(y, xb.value), P = Qu(y, xb.openMethod), F = Qu(y, xb.positionerElement), I = Qu(y, xb.triggerElement), L = Qu(y, xb.isItemEqualToValue), R = Qu(y, xb.transitionStatus), z = C.useRef(null), B = C.useRef(null), [V, H] = C.useState(h), U = j && V && P !== "touch";
	!j && V !== h && H(h), Z(() => {
		j || (xb.scrollUpArrowVisible(y.state) && y.set("scrollUpArrowVisible", !1), xb.scrollDownArrowVisible(y.state) && y.set("scrollDownArrowVisible", !1));
	}, [y, j]), C.useImperativeHandle(S, () => U), Zf((U || M) && A, P === "touch", F, I);
	let W = Lf({
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
	}), G = U ? "none" : W.side, ee = U ? zb : W.positionerStyles, te = {
		open: A,
		side: G,
		align: W.align,
		anchorHidden: W.anchorHidden
	};
	Z(() => {
		y.set("popupSide", W.side);
	}, [y, W.side]);
	let ne = Bf(e, te, {
		styles: ee,
		transitionStatus: R,
		props: v,
		refs: [t, X((e) => {
			y.set("positionerElement", e);
		})],
		hidden: !j,
		inert: !A
	}), re = C.useRef(0), ie = X((e) => {
		if (e.size === 0 && re.current === 0 || T.current.length === 0) return;
		let t = re.current;
		if (re.current = e.size, e.size === t) return;
		let n = zn(xn);
		if (t !== 0 && !y.state.multiple && N !== null && pb(T.current, N, L) === -1) {
			let e = E.current, t = e != null && pb(T.current, e, L) !== -1 ? e : null;
			O(t, n), t === null && (y.set("selectedIndex", null), w.current = null);
		}
		if (t !== 0 && y.state.multiple && Array.isArray(N)) {
			let e = (e) => pb(T.current, e, L) !== -1, t = N.filter((t) => e(t));
			(t.length !== N.length || t.some((e) => !fb(N, e, L))) && (O(t, n), t.length === 0 && (y.set("selectedIndex", null), w.current = null));
		}
		if (A && U) {
			y.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			Lb(F, e), Lb(D.current, e);
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
	return /*#__PURE__*/ (0, Y.jsx)(bt, {
		elementsRef: b,
		labelsRef: x,
		onMapChange: ie,
		children: /*#__PURE__*/ (0, Y.jsxs)(Fb.Provider, {
			value: ae,
			children: [j && M && /*#__PURE__*/ (0, Y.jsx)(zf, {
				inert: Of(!A),
				cutout: I
			}), ne]
		})
	});
}), Vb = {
	...Oo,
	...ir
}, Hb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s, popupRef: c, onOpenChangeComplete: l, setOpen: u, valueRef: d, firstItemTextRef: f, selectedItemTextRef: p, multiple: m, handleScrollArrowVisibility: h, scrollHandlerRef: g, listRef: _, highlightItemOnHover: v } = cb(), { side: y, align: b, alignItemWithTriggerActive: x, isPositioned: S, setControlledAlignItemWithTrigger: w } = Ib(), T = ef(!0) != null, E = lb(), D = Tt(), { nonce: O, disableStyleElements: k } = Py(), A = Qu(s, xb.id), j = Qu(s, xb.open), M = Qu(s, xb.openMethod), N = Qu(s, xb.mounted), P = Qu(s, xb.popupProps), F = Qu(s, xb.transitionStatus), I = Qu(s, xb.triggerElement), L = Qu(s, xb.positionerElement), R = Qu(s, xb.listElement), z = C.useRef(!1), B = C.useRef(!1), V = C.useRef({}), H = Kn(), U = X((e) => {
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
		let r = Gb(L), i = Kb(L.getBoundingClientRect().height, "y", r), a = Xr(L), o = _r(L), s = o.getComputedStyle(L), l = parseFloat(s.marginTop), u = parseFloat(s.marginBottom), d = Ub(o.getComputedStyle(c.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, m = Wb(e), g = 0, _ = null, v = !1, y = !1, b = (e) => {
			L.style.height = `${e}px`;
		}, S = (t, n) => {
			let r = Hy(t, 0, f - i);
			r > 0 && b(i + r), e.scrollTop = n, f - (i + r) <= 1 && (z.current = !0), h();
		}, C = t ? m - p : p, w = Math.min(i + C, f);
		if (g = w, C <= 1) {
			S(C, t ? m : 0);
			return;
		}
		if (f - w > 1 ? t ? y = !0 : _ = 0 : (v = !0, n && p < m && (_ = p - (C - (i + C - f)))), g = Math.ceil(g), g !== 0 && b(g), y || _ != null) {
			let t = Wb(e), n = y ? t : Hy(_, 0, t);
			Math.abs(e.scrollTop - n) > 1 && (e.scrollTop = n);
		}
		(v || g >= f - 1) && (z.current = !0), h();
	});
	C.useImperativeHandle(g, () => U, [U]), ei({
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
	Z(() => {
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
	}, [c, L]), Z(() => {
		j || x || (B.current = !1, z.current = !1, Lb(L, V.current));
	}, [
		j,
		x,
		L,
		c
	]), Z(() => {
		let e = c.current;
		if (!j || !I || !L || !e || x && !S || s.state.transitionStatus === "ending") return;
		if (!x) {
			B.current = !0, H.request(h), e.style.removeProperty("--transform-origin");
			return;
		}
		let t = Yb(e);
		e.style.removeProperty("--transform-origin");
		try {
			let t = p.current;
			t?.isConnected || (t = !xb.hasSelectedValue(s.state) && f.current?.isConnected ? f.current : null);
			let n = d.current, r = _r(L), i = r.getComputedStyle(L), a = r.getComputedStyle(e), o = Xr(I), c = Gb(I), l = qb(I.getBoundingClientRect(), c), u = qb(L.getBoundingClientRect(), c), m = l.height, g = R || e, y = g.scrollHeight, b = parseFloat(a.borderBottomWidth), x = parseFloat(i.marginTop) || 10, S = parseFloat(i.marginBottom) || 10, C = parseFloat(i.minHeight) || 100, T = Ub(a), E = o.documentElement.clientHeight - x - S, O = o.documentElement.clientWidth, k = E - l.bottom + m, A, j = D === "rtl" ? l.right - u.width : l.left, M = 0;
			if (t && n) {
				let e = qb(n.getBoundingClientRect(), c);
				A = qb(t.getBoundingClientRect(), c), j = u.left + (D === "rtl" ? e.right - A.right : e.left - A.left);
				let r = e.top - l.top + e.height / 2;
				M = A.top - u.top + A.height / 2 - r;
			}
			let N = k + M + S + b, P = Math.min(E, N), F = E - x - S, H = N - P, U = O - 5;
			L.style.left = `${Hy(j, 5, U - u.width)}px`, L.style.height = `${P}px`, L.style.maxHeight = "none", L.style.marginTop = `${x}px`, L.style.marginBottom = `${S}px`, e.style.height = "100%";
			let W = Wb(g), G = H >= W - 1;
			G && (P = Math.min(E, u.height) - (H - W));
			let ee = l.top < 20 || l.bottom > E - 20 || Math.ceil(P) + 1 < Math.min(y, C), te = (r.visualViewport?.scale ?? 1) !== 1 && Ho;
			if (ee || te) {
				B.current = !0, Lb(L, V.current), w(!1);
				return;
			}
			let ne = Math.max(C, P);
			if (G) {
				let e = Math.max(0, E - N);
				L.style.top = u.height >= F ? "0" : `${e}px`, L.style.height = `${P}px`, g.scrollTop = Wb(g);
			} else L.style.bottom = "0", g.scrollTop = H;
			if (A) {
				let t = u.top, n = u.height, r = A.top + A.height / 2, i = Hy(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
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
		let e = _r(L);
		function t(e) {
			u(!1, zn(Rn, e));
		}
		return qr(e, "resize", t);
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
			T && mf.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			R || U(e.currentTarget);
		},
		...x && { style: R ? { height: "100%" } : Rb }
	}, ee = cn("div", e, {
		ref: [t, c],
		state: W,
		stateAttributesMapping: Vb,
		props: [
			P,
			G,
			Sf(F),
			{ className: !R && x ? ky.className : void 0 },
			o
		]
	});
	return /*#__PURE__*/ (0, Y.jsxs)(C.Fragment, { children: [!k && ky.getElement(O), /*#__PURE__*/ (0, Y.jsx)(wl, {
		context: E,
		modal: !1,
		disabled: !N,
		openInteractionType: M,
		returnFocus: a,
		restoreFocus: !0,
		children: ee
	})] });
});
function Ub(e) {
	let t = e.maxHeight || "";
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function Wb(e) {
	return Wy(e.scrollHeight, e.clientHeight);
}
function Gb(e) {
	return mu.getScale(e);
}
function Kb(e, t, n) {
	return e / n[t];
}
function qb(e, t) {
	return nc({
		x: Kb(e.x, "x", t),
		y: Kb(e.y, "y", t),
		width: Kb(e.width, "x", t),
		height: Kb(e.height, "y", t)
	});
}
var Jb = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function Yb(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Jb) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Jb) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/list/SelectList.mjs
var Xb = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o, scrollHandlerRef: s } = cb(), { alignItemWithTriggerActive: c } = Ib(), l = Qu(o, xb.hasScrollArrows), u = Qu(o, xb.openMethod), d = Qu(o, xb.multiple), f = {
		id: `${Qu(o, xb.id)}-list`,
		role: "listbox",
		"aria-multiselectable": d || void 0,
		onScroll(e) {
			s.current?.(e.currentTarget);
		},
		...c && { style: Rb },
		className: l && u !== "touch" ? ky.className : void 0
	};
	return cn("div", e, {
		ref: [t, X((e) => {
			o.set("listElement", e);
		})],
		props: [f, a]
	});
}), Zb = /*#__PURE__*/ C.createContext(void 0);
function Qb() {
	let e = C.useContext(Zb);
	if (!e) throw Error(Dt(57));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/item/SelectItem.mjs
var $b = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = C.useRef(null), d = Qn({
		label: o,
		textRef: u,
		indexGuessBehavior: Zn.GuessFromOrder
	}), { store: f, itemProps: p, setOpen: m, setValue: h, selectionRef: g, typingRef: _, valuesRef: v, multiple: y, selectedItemTextRef: b, disabled: x, readOnly: S } = cb(), w = Qu(f, xb.isActive, d.index), T = Qu(f, xb.open), E = Qu(f, xb.isSelected, a), D = Qu(f, xb.isSelectedByFocus, d.index), O = Qu(f, xb.isItemEqualToValue), k = d.index, A = k !== -1, j = C.useRef(null);
	Z(() => {
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
	]), Z(() => {
		if (!A) return;
		let e = f.state.value, t = e;
		y && Array.isArray(e) && (t = e.length > 0 ? e[e.length - 1] : void 0), t !== void 0 && db(a, t, O) && (f.set("selectedIndex", k), u.current && (b.current = u.current));
	}, [
		A,
		k,
		y,
		O,
		f,
		a,
		b
	]);
	let M = C.useRef(null), N = C.useRef("mouse"), P = C.useRef(!1), { getButtonProps: F, buttonRef: I } = Ur({
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
			let n = Array.isArray(t) ? t : [], r = E ? mb(n, a, O) : [...n, a];
			h(r, zn(En, e));
		} else h(a, zn(En, e)), m(!1, zn(En, e));
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
			let t = e.type === "click" && N.current !== "touch", n = e.nativeEvent.pointerType, r = t && ts(e.nativeEvent) && (n !== void 0 || w), i = t && !r && !P.current;
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
	}, V = cn("div", e, {
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
	return /*#__PURE__*/ (0, Y.jsx)(Zb.Provider, {
		value: H,
		children: V
	});
})), ex = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let n = e.keepMounted ?? !1, { selected: r } = Qb();
	return n || r ? /*#__PURE__*/ (0, Y.jsx)(tx, {
		...e,
		ref: t
	}) : null;
}), tx = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef((e, t) => {
	let { render: n, className: r, style: i, keepMounted: a, ...o } = e, { selected: s } = Qb(), c = C.useRef(null), { transitionStatus: l, setMounted: u } = qn(s), d = cn("span", e, {
		ref: [t, c],
		state: {
			selected: s,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, o],
		stateAttributesMapping: ir
	});
	return ei({
		open: s,
		ref: c,
		onComplete() {
			s || u(!1);
		}
	}), d;
})), nx = /*#__PURE__*/ C.memo(/*#__PURE__*/ C.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i, hasRegistered: a } = Qb(), { firstItemTextRef: o, selectedItemTextRef: s } = cb(), { render: c, className: l, style: u, ...d } = e;
	return cn("div", e, {
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
})), rx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o = !1, ...s } = e, c = a === "up", { store: l, popupRef: u, listRef: d, handleScrollArrowVisibility: f, scrollArrowsMountedCountRef: p } = cb(), { side: m, scrollDownArrowRef: h, scrollUpArrowRef: g } = Ib(), _ = Qu(l, c ? xb.scrollUpArrowVisible : xb.scrollDownArrowVisible), v = Qu(l, xb.openMethod), y = _ && v !== "touch", b = Yi(), x = c ? g : h, { mounted: S, transitionStatus: C, setMounted: w } = qn(y);
	Z(() => (p.current += 1, l.state.hasScrollArrows || l.set("hasScrollArrows", !0), () => {
		p.current = Math.max(0, p.current - 1), p.current === 0 && l.state.hasScrollArrows && l.set("hasScrollArrows", !1);
	}), [l, p]), ei({
		open: y,
		ref: x,
		onComplete() {
			y || w(!1);
		}
	});
	let T = cn("div", e, {
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
					let n = Wy(e.scrollHeight, e.clientHeight), r = Gy(e.scrollTop, n), i = r === (c ? 0 : n), a = d.current;
					if (r !== e.scrollTop && (e.scrollTop = r), a.length === 0 && l.set(c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !i), i) {
						b.clear();
						return;
					}
					if (a.length > 0) {
						let t = x.current?.offsetHeight || 0;
						e.scrollTop = ix(a, c, r, e.clientHeight, t, n);
					}
					b.start(40, t);
				}
				b.start(40, t);
			},
			onMouseLeave() {
				b.clear();
			}
		}, s],
		stateAttributesMapping: ir
	});
	return S || o ? T : null;
});
function ix(e, t, n, r, i, a) {
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
		return o < t && s ? Gy(s.offsetTop - i, a) : 0;
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
	return c > o && l ? Gy(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var ax = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(rx, {
		...e,
		ref: t,
		direction: "down"
	});
}), ox = /*#__PURE__*/ C.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Y.jsx)(rx, {
		...e,
		ref: t,
		direction: "up"
	});
}), sx = Cb;
function cx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(jb, {
		"data-slot": "select-value",
		className: J("flex flex-1 text-left", e),
		...t
	});
}
function lx({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, Y.jsxs)(kb, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: J("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, Y.jsx)(Mb, { render: /* @__PURE__ */ (0, Y.jsx)(Si, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function ux({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = kp();
	return /* @__PURE__ */ (0, Y.jsx)(Pb, {
		container: c,
		children: /* @__PURE__ */ (0, Y.jsx)(Bb, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Y.jsxs)(Hb, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: J("cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, Y.jsx)(fx, {}),
					/* @__PURE__ */ (0, Y.jsx)(Xb, { children: t }),
					/* @__PURE__ */ (0, Y.jsx)(px, {})
				]
			})
		})
	});
}
function dx({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Y.jsxs)($b, {
		"data-slot": "select-item",
		className: J("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, Y.jsx)(nx, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, Y.jsx)(ex, {
			render: /* @__PURE__ */ (0, Y.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, Y.jsx)(xi, { className: "pointer-events-none" })
		})]
	});
}
function fx({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(ox, {
		"data-slot": "select-scroll-up-button",
		className: J("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Ti, {})
	});
}
function px({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(ax, {
		"data-slot": "select-scroll-down-button",
		className: J("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Y.jsx)(Si, {})
	});
}
//#endregion
//#region src/components/streamlit/select.tsx
function mx({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = Fi(e.state, t), a = e.props.disabled || e.props.options.length === 0;
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "select",
		"data-testid": "ssui-v2-select",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsxs)(sx, {
			disabled: a,
			items: e.props.options,
			modal: !1,
			onValueChange: (e) => {
				r(typeof e == "string" ? e : null);
			},
			value: i.value,
			children: [/* @__PURE__ */ (0, Y.jsx)(lx, {
				"aria-labelledby": n,
				className: "w-full",
				"data-testid": "ssui-v2-select-trigger",
				children: /* @__PURE__ */ (0, Y.jsx)(cx, { placeholder: e.props.options.length === 0 ? "No options" : e.props.placeholder })
			}), /* @__PURE__ */ (0, Y.jsx)(ux, {
				align: "start",
				alignItemWithTrigger: !1,
				"data-testid": "ssui-v2-select-content",
				children: e.props.options.map((e) => /* @__PURE__ */ (0, Y.jsx)(dx, {
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
function hx({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(xp, {
		"data-slot": "separator",
		orientation: t,
		className: J("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
//#endregion
//#region src/components/streamlit/separator.tsx
function gx({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: e.props.orientation === "vertical" ? "flex h-8 justify-center" : "py-2",
		"data-ssui-component": "separator",
		"data-testid": "ssui-v2-separator",
		children: /* @__PURE__ */ (0, Y.jsx)(hx, { orientation: e.props.orientation })
	});
}
//#endregion
//#region src/components/ui/skeleton.tsx
function _x({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		"data-slot": "skeleton",
		className: J("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/skeleton.tsx
function vx({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)(_x, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/asc.mjs
function yx(e, t) {
	return e - t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/replaceArrayItemAtIndex.mjs
function bx(e, t, n) {
	let r = e.slice();
	return r[t] = n, r.sort(yx);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getSliderValue.mjs
function xx(e, t, n, r, i, a) {
	let o = e;
	return o = Hy(o, n, r), i && (o = bx(a, t, Hy(o, a[t - 1] ?? -Infinity, a[t + 1] ?? Infinity))), o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/validateMinimumDistance.mjs
function Sx(e, t, n) {
	if (!Array.isArray(e)) return !0;
	let r = e.reduce((e, t, n, r) => (n === r.length - 1 || e.push(Math.abs(t - r[n + 1])), e), []);
	return Math.min(...r) >= t * n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/root/stateAttributesMapping.mjs
var Cx = {
	activeThumbIndex: () => null,
	max: () => null,
	min: () => null,
	minStepsBetweenValues: () => null,
	step: () => null,
	values: () => null,
	...Na
}, wx = /*#__PURE__*/ C.createContext(void 0);
function Tx() {
	let e = C.useContext(wx);
	if (e === void 0) throw Error(Dt(62));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/root/SliderRoot.mjs
function Ex(e) {
	return "key" in e ? jn : Dn;
}
function Dx(e, t) {
	return typeof e == "number" && typeof t == "number" ? e === t : Array.isArray(e) && Array.isArray(t) ? Sb(e, t) : !1;
}
var Ox = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { "aria-labelledby": n, className: r, defaultValue: i, disabled: a = !1, id: o, format: s, largeStep: c = 10, locale: l, render: u, max: d = 100, min: f = 0, minStepsBetweenValues: p = 0, form: m, name: h, onValueChange: g, onValueCommitted: _, orientation: v = "horizontal", step: y = 1, thumbCollisionBehavior: b = "push", thumbAlignment: x = "center", value: S, style: w, ...T } = e, E = bn(o), D = wb(E), O = X(g), k = X(_), { clearErrors: A } = Ha(), { state: j, disabled: M, name: N, setTouched: P, setDirty: F, validityData: I, validation: L } = La(), { labelId: R } = Wa(), [z, B] = C.useState(), V = n ?? Tb(R, z), H = M || a, U = N ?? h, [W, G] = ut({
		controlled: S,
		default: i ?? f,
		name: "Slider"
	}), ee = C.useRef(null), te = C.useRef(null), ne = C.useRef([]), re = C.useRef(null), ie = C.useRef(null), ae = C.useRef(-1), oe = C.useRef(null), se = C.useRef("none"), ce = Jr(s), [le, ue] = C.useState(-1), [de, fe] = C.useState(-1), [pe, me] = C.useState(!1), [he, ge] = C.useState(() => /* @__PURE__ */ new Map()), [_e, ve] = C.useState([void 0, void 0]), ye = X((e) => {
		ue(e), e !== -1 && fe(e);
	});
	Ra(L.inputRef, E, W, void 0, !H, h), Qa(W, () => {
		A(U), L.change(W);
		let e = I.initialValue, t;
		t = Array.isArray(W) && Array.isArray(e) ? !Sb(W, e) : W !== e, F(t);
	});
	let be = X((e) => {
		e && (te.current = e);
	}), xe = Array.isArray(W), Se = C.useMemo(() => xe ? W.slice().sort(yx) : [Hy(W, f, d)], [
		d,
		f,
		xe,
		W
	]), Ce = X((e, t) => {
		if (Number.isNaN(e) || Dx(e, W)) return !1;
		let n = t ?? zn("none", void 0, void 0, { activeThumbIndex: -1 }), r = n.event, i = new (r.constructor ?? Event)(r.type, r);
		return Object.defineProperty(i, "target", {
			writable: !0,
			value: {
				value: e,
				name: U
			}
		}), n.event = i, O(e, n), !n.isCanceled && (se.current = n.reason, G(e), !0);
	}), we = X((e, t, n) => {
		let r = xx(e, t, f, d, xe, Se);
		if (Sx(r, y, p)) {
			let e = Ex(n), i = Ce(r, zn(e, n.nativeEvent, void 0, { activeThumbIndex: t }));
			P(!0), i && k(r, Bn(e, n.nativeEvent));
		}
	});
	Z(() => {
		let e = ds(Xr(ee.current));
		H && fs(ee.current, e) && e.blur();
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
	]), De = cn("div", e, {
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
		stateAttributesMapping: Cx
	});
	return /*#__PURE__*/ (0, Y.jsx)(wx.Provider, {
		value: Ee,
		children: /*#__PURE__*/ (0, Y.jsx)(bt, {
			elementsRef: ne,
			onMapChange: ge,
			children: De
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getMidpoint.mjs
function kx(e) {
	let t = e.getBoundingClientRect();
	return {
		x: (t.left + t.right) / 2,
		y: (t.top + t.bottom) / 2
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/roundValueToStep.mjs
function Ax(e) {
	if (e === 0) return 0;
	if (Math.abs(e) < 1) {
		let t = e.toExponential().split("e-"), n = t[0].split(".")[1];
		return (n ? n.length : 0) + parseInt(t[1], 10);
	}
	let t = e.toString().split(".")[1];
	return t ? t.length : 0;
}
function jx(e, t, n) {
	let r = Math.round((e - n) / t) * t + n;
	return Number(r.toFixed(Math.max(Ax(t), Ax(n))));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/getPushedThumbValues.mjs
function Mx({ values: e, index: t, nextValue: n, min: r, max: i, step: a, minStepsBetweenValues: o, initialValues: s }) {
	if (e.length === 0) return [];
	let c = e.slice(), l = a * o, u = c.length - 1, d = s ?? e;
	c[t] = Hy(n, r + t * l, i - (u - t) * l);
	for (let e = t + 1; e <= u; e += 1) {
		let t = c[e - 1] + l, n = i - (u - e) * l, r = d[e] ?? c[e], a = Math.max(c[e], t);
		r < a && (a = Math.max(r, t)), c[e] = Hy(a, t, n);
	}
	for (let e = t - 1; e >= 0; --e) {
		let t = c[e + 1] - l, n = r + e * l, i = d[e] ?? c[e], a = Math.min(c[e], t);
		i > a && (a = Math.min(i, t)), c[e] = Hy(a, n, t);
	}
	for (let e = 0; e <= u; e += 1) c[e] = Number(c[e].toFixed(12));
	return c;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/utils/resolveThumbCollision.mjs
function Nx({ behavior: e, values: t, currentValues: n, initialValues: r, pressedIndex: i, nextValue: a, min: o, max: s, step: c, minStepsBetweenValues: l }) {
	let u = n ?? t, d = r ?? t;
	if (!(u.length > 1)) return {
		value: a,
		thumbIndex: 0,
		didSwap: !1
	};
	let f = c * l;
	switch (e) {
		case "swap": {
			let e = u[i], t = 1e-7, n = u.slice(), r = n[i - 1], p = n[i + 1], m = Hy(a, r == null ? o : r + f, p == null ? s : p - f), h = Number(m.toFixed(12));
			n[i] = h;
			let g = a > e, _ = a < e, v = g && p != null && a >= p - t, y = _ && r != null && a <= r + t;
			if (!v && !y) return {
				value: n,
				thumbIndex: i,
				didSwap: !1
			};
			let b = v ? i + 1 : i - 1, x = n.map((e, t) => t === i ? h : d[t] ?? u[t]), S = a;
			S = v ? Math.max(a, n[b]) : Math.min(a, n[b]);
			let C = Mx({
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
				let i = Hy(h, n, r);
				C[w] = Number(i.toFixed(12));
			}
			return {
				value: C,
				thumbIndex: b,
				didSwap: !0
			};
		}
		case "push": return {
			value: Mx({
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
			let e = u.slice(), t = e[i - 1], n = e[i + 1], r = Hy(a, t == null ? o : t + f, n == null ? s : n - f);
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
var Px = 2;
function Fx(e, t) {
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
function Ix(e, t) {
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
var Lx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { disabled: o, dragging: s, inset: c, lastChangeReasonRef: l, max: u, min: d, minStepsBetweenValues: f, onValueCommitted: p, orientation: m, pressedInputRef: h, pressedThumbCenterOffsetRef: g, pressedThumbIndexRef: _, pressedValuesRef: v, registerFieldControlRef: y, renderBeforeHydration: b, setActive: x, setDragging: S, setValue: w, state: T, step: E, thumbCollisionBehavior: D, thumbRefs: O, values: k } = Tx(), A = Tt(), j = k.length > 1, M = m === "vertical", N = C.useRef(null), P = C.useRef(null), F = X((e) => {
		e && P.current == null && (P.current = _r(e).getComputedStyle(e));
	}), I = C.useRef(null), L = C.useRef(0), R = C.useRef(0), z = C.useRef(null), B = Jr(k);
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
		return br(e) ? O.current.some((t) => !br(t) || !fs(t, e) ? !1 : t.querySelector("input[type=\"range\"]")?.disabled === !0) : !1;
	}
	function W(e) {
		let t = N.current, n = _.current;
		if (!t || !j && (n < 0 || n >= k.length)) return null;
		let { width: r, height: i, bottom: a, left: o, right: s } = t.getBoundingClientRect(), c = Fx(P.current, M), l = R.current, p = (M ? i : r) - c.start - c.end - l * 2, m = g.current ?? 0, h = e.x - m, y = e.y - m, b = Hy(((M ? a - y - c.end : (A === "rtl" ? s - h : h - o) - c.start) - l) / p, 0, 1), x = (u - d) * b + d;
		return x = jx(x, E, d), x = Hy(x, d, u), j ? n < 0 ? null : Nx({
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
				if (br(a) && !a.querySelector("input[type=\"range\"]")?.disabled) {
					let o = kx(a), s = Math.abs(e[t] - o[t]);
					(r === void 0 || s <= r) && (n = i, r = s);
				}
			}
		}
		if (n > -1 && n !== t && V(n), c) {
			let e = O.current[n];
			if (br(e)) {
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
		let r = w(e.value, zn(t, n, void 0, { activeThumbIndex: e.thumbIndex }));
		return r && (z.current = e.value, B.current = Array.isArray(e.value) ? e.value : [e.value], e.didSwap && V(e.thumbIndex)), r;
	}
	let ne = X((e) => {
		let t = Ix(e, I);
		if (t == null) return;
		if (L.current += 1, e.type === "pointermove" && e.buttons === 0) {
			re(e);
			return;
		}
		let n = W(t);
		n != null && Sx(n.value, E, f) && (!s && L.current > Px && S(!0), te(n, "drag", e) && n.didSwap && ee(n.thumbIndex));
	}), re = X((e) => {
		if (x(-1), S(!1), h.current = null, g.current = null, z.current != null) {
			let t = l.current;
			p(z.current, Bn(t, e));
		}
		"pointerType" in e && N.current?.hasPointerCapture(e.pointerId) && N.current?.releasePointerCapture(e.pointerId), _.current = -1, I.current = null, v.current = null, z.current = null, ae();
	}), ie = X((e) => {
		if (o) return;
		if (U(ps(e))) {
			H();
			return;
		}
		let t = e.changedTouches[0];
		t != null && (I.current = t.identifier);
		let n = Ix(e, I);
		if (n != null) {
			G(n);
			let t = W(n);
			if (t == null) return;
			ee(t.thumbIndex), te(t, "track-press", e) && t.didSwap && ee(t.thumbIndex);
		}
		L.current = 0;
		let r = Xr(N.current);
		r.addEventListener("touchmove", ne, { passive: !0 }), r.addEventListener("touchend", re, { passive: !0 });
	}), ae = X(() => {
		let e = Xr(N.current);
		e.removeEventListener("pointermove", ne), e.removeEventListener("pointerup", re), e.removeEventListener("touchmove", ne), e.removeEventListener("touchend", re), v.current = null, z.current = null;
	}), oe = Kn();
	return C.useEffect(() => {
		let e = N.current;
		if (!e) return () => ae();
		let t = qr(e, "touchstart", ie, { passive: !0 });
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
	}, [o, ae]), cn("div", e, {
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
				let t = N.current, n = ps(e.nativeEvent);
				if (!t || o || e.defaultPrevented || !br(n) || e.button !== 0) return;
				if (U(n)) {
					H();
					return;
				}
				let r = Ix(e, I);
				if (r != null) {
					G(r);
					let n = W(r);
					if (n == null) return;
					fs(O.current[n.thumbIndex], ds(Xr(t))) ? e.preventDefault() : oe.request(() => {
						ee(n.thumbIndex);
					}), S(!0), g.current == null && te(n, "track-press", e.nativeEvent) && n.didSwap && ee(n.thumbIndex);
				}
				e.nativeEvent.pointerId && t.setPointerCapture(e.nativeEvent.pointerId), L.current = 0;
				let i = Xr(N.current);
				i.addEventListener("pointermove", ne, { passive: !0 }), i.addEventListener("pointerup", re, { once: !0 });
			}
		}, a],
		stateAttributesMapping: Cx
	});
}), Rx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = Tx();
	return cn("div", e, {
		state: o,
		ref: t,
		props: [{ style: { position: "relative" } }, a],
		stateAttributesMapping: Cx
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useIsHydrating.mjs
function zx() {
	return Bt;
}
function Bx() {
	return !1;
}
function Vx() {
	return !0;
}
function Hx() {
	return (0, Yu.useSyncExternalStore)(zx, Bx, Vx);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/thumb/SliderThumbDataAttributes.mjs
var Ux = /*#__PURE__*/ function(e) {
	return e.index = "data-index", e.dragging = "data-dragging", e.orientation = "data-orientation", e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.focused = "data-focused", e;
}({}), Wx = /* @__PURE__ */ new Set([
	...mf,
	sf,
	cf
]);
function Gx(e, t, n, r) {
	if (!(t < 0)) return e.length === 2 ? t === 0 ? `${zv(e[t], r, n)} start range` : `${zv(e[t], r, n)} end range` : n ? zv(e[t], r, n) : void 0;
}
function Kx(e, t, n, r, i) {
	let a = n === 1 ? e + t : e - t;
	return Hy(Number(a.toFixed(Math.max(Ax(e), Ax(t), Ax(r)))), r, i);
}
var qx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, children: r, className: i, "aria-describedby": a, "aria-label": o, "aria-labelledby": s, "aria-valuetext": c, disabled: l = !1, getAriaLabel: u, getAriaValueText: d, id: f, index: p, inputRef: m, onBlur: h, onFocus: g, onKeyDown: _, tabIndex: v, style: y, ...b } = e, { nonce: x } = Py(), S = bn(f), { active: w, lastUsedThumbIndex: T, controlRef: E, disabled: D, validation: O, formatOptionsRef: k, handleInputChange: A, inset: j, labelId: M, largeStep: N, locale: P, max: F, min: I, minStepsBetweenValues: L, form: R, name: z, orientation: B, pressedInputRef: V, pressedThumbCenterOffsetRef: H, pressedThumbIndexRef: U, renderBeforeHydration: W, setActive: G, setIndicatorPosition: ee, state: te, step: ne, values: re } = Tx(), ie = Tt(), ae = l || D, oe = re.length > 1, se = B === "vertical", ce = ie === "rtl", { setTouched: le, setFocused: ue, validationMode: de } = La(), fe = C.useRef(null), pe = C.useRef(null), me = C.useRef(!1), he = bn(), ge = Sv(), _e = oe ? he : ge, { ref: ve, index: ye } = Qn({ metadata: C.useMemo(() => ({ inputId: _e }), [_e]) }), be = oe ? p ?? ye : 0, xe = be === re.length - 1, Se = re[be], Ce = Jv(Se, I, F), [we, Te] = C.useState(), Ee = Hx(), De = T >= 0 && T < re.length ? T : -1, Oe = X(() => {
		let e = E.current, t = fe.current;
		if (!e || !t) return;
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = se ? "height" : "width", a = r[i] - n[i], o = (n[i] / 2 + a * Ce / 100) / r[i] * 100, s = Number.isFinite(o) ? o : void 0;
		Te(s), be === 0 ? ee((e) => [s, e[1]]) : xe && ee((e) => [e[0], s]);
	});
	Z(() => {
		j && queueMicrotask(Oe);
	}, [Oe, j]), Z(() => {
		j && Oe();
	}, [
		Oe,
		j,
		Ce
	]), Z(() => {
		if (!j) return;
		let e = E.current, t = fe.current;
		if (!e || !t) return;
		let n = _r(e).ResizeObserver;
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
	} : Ta;
	let K;
	B === "vertical" && (K = ce ? "vertical-rl" : "vertical-lr");
	let Ne = typeof u == "function" ? u(be) : o, Pe = qt({
		"aria-label": Ne,
		"aria-labelledby": s ?? (Ne == null ? M : void 0),
		"aria-describedby": a,
		"aria-orientation": B,
		"aria-valuenow": Se,
		"aria-valuetext": typeof d == "function" ? d(zv(Se, P, k.current ?? void 0), Se, be) : c ?? Gx(re, be, k.current ?? void 0, P),
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
			fe.current && (G(-1), le(!0), ue(!1), de === "onBlur" && O.commit(xx(Se, be, I, F, oe, re)));
		},
		onKeyDown(e) {
			if (e.defaultPrevented || !Wx.has(e.key)) return;
			mf.has(e.key) && e.stopPropagation();
			let t = null, n = jx(Se, ne, I);
			switch (e.key) {
				case tf:
					t = Kx(n, e.shiftKey ? N : ne, 1, I, F);
					break;
				case af:
					t = Kx(n, e.shiftKey ? N : ne, ce ? -1 : 1, I, F);
					break;
				case nf:
					t = Kx(n, e.shiftKey ? N : ne, -1, I, F);
					break;
				case rf:
					t = Kx(n, e.shiftKey ? N : ne, ce ? 1 : -1, I, F);
					break;
				case sf:
					t = Kx(n, N, 1, I, F);
					break;
				case cf:
					t = Kx(n, N, -1, I, F);
					break;
				case "End":
					t = F, oe && (t = Number.isFinite(re[be + 1]) ? re[be + 1] - ne * L : F);
					break;
				case of: t = I, oe && (t = Number.isFinite(re[be - 1]) ? re[be - 1] + ne * L : I);
			}
			if (t !== null) {
				let n = e.currentTarget;
				bs(n) || (me.current = !0, n.blur(), n.focus({
					preventScroll: !0,
					focusVisible: !0
				})), A(t, be, e), e.preventDefault();
			}
		},
		step: ne,
		style: {
			...Ta,
			width: "100%",
			height: "100%",
			writingMode: K
		},
		tabIndex: v ?? void 0,
		type: "range",
		value: Se ?? ""
	}, (e) => O.getValidationProps(ae, e), { onKeyDown: _ }), Fe = At(pe, O.inputRef, m);
	return cn("div", e, {
		state: te,
		ref: [
			t,
			ve,
			fe
		],
		props: [{
			[Ux.index]: be,
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
						let t = B === "horizontal" ? "x" : "y", n = kx(fe.current), r = (B === "horizontal" ? e.clientX : e.clientY) - n[t];
						H.current = r;
					}
					pe.current != null && V.current !== pe.current && (V.current = pe.current);
				}
			},
			style: Me,
			suppressHydrationWarning: W || void 0
		}, b],
		stateAttributesMapping: Cx
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/slider/indicator/SliderIndicator.mjs
function Jx(e, t, n, r, i, a) {
	let o = n === void 0 || t && r === void 0 ? "hidden" : void 0, s = e ? "bottom" : "insetInlineStart", c = e ? "height" : "width", l = {
		visibility: i && a ? "hidden" : o,
		position: e ? "absolute" : "relative",
		[e ? "width" : "height"]: "inherit"
	};
	return l["--start-position"] = `${n ?? 0}%`, t ? (l["--relative-size"] = `${(r ?? 0) - (n ?? 0)}%`, l[s] = "var(--start-position)", l[c] = "var(--relative-size)", l) : (l[s] = 0, l[c] = "var(--start-position)", l);
}
function Yx(e, t, n, r) {
	let i = e ? "bottom" : "insetInlineStart", a = e ? "height" : "width", o = {
		position: e ? "absolute" : "relative",
		[e ? "width" : "height"]: "inherit"
	};
	if (!t) return o[i] = 0, o[a] = `${n}%`, o;
	let s = r - n;
	return o[i] = `${n}%`, o[a] = `${s}%`, o;
}
var Xx = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { indicatorPosition: o, inset: s, max: c, min: l, orientation: u, renderBeforeHydration: d, state: f, values: p } = Tx(), m = Hx(), h = u === "vertical", g = p.length > 1, _ = s ? Jx(h, g, o[0], o[1], d, m) : Yx(h, g, Jv(p[0], l, c), Jv(p[p.length - 1], l, c));
	return cn("div", e, {
		state: f,
		ref: t,
		props: [{
			"data-base-ui-slider-indicator": d ? "" : void 0,
			style: _,
			suppressHydrationWarning: d || void 0
		}, a],
		stateAttributesMapping: Cx
	});
});
//#endregion
//#region src/components/ui/slider.tsx
function Zx({ className: e, defaultValue: t, value: n, min: r = 0, max: i = 100, ...a }) {
	let o = Array.isArray(n) ? n : Array.isArray(t) ? t : [r, i];
	return /* @__PURE__ */ (0, Y.jsx)(Ox, {
		className: J("data-horizontal:w-full data-vertical:h-full", e),
		"data-slot": "slider",
		defaultValue: t,
		value: n,
		min: r,
		max: i,
		thumbAlignment: "edge",
		...a,
		children: /* @__PURE__ */ (0, Y.jsxs)(Lx, {
			className: "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
			children: [/* @__PURE__ */ (0, Y.jsx)(Rx, {
				"data-slot": "slider-track",
				className: "relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1",
				children: /* @__PURE__ */ (0, Y.jsx)(Xx, {
					"data-slot": "slider-range",
					className: "bg-primary select-none data-horizontal:h-full data-vertical:w-full"
				})
			}), Array.from({ length: o.length }, (e, t) => /* @__PURE__ */ (0, Y.jsx)(qx, {
				"data-slot": "slider-thumb",
				className: "relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
			}, t))]
		})
	});
}
//#endregion
//#region src/components/streamlit/slider.tsx
function Qx(e) {
	return typeof e == "number" ? [e] : [...e];
}
function $x({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, draft: i, setDraft: a } = Ii(e.state, t);
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
		}), /* @__PURE__ */ (0, Y.jsx)(Zx, {
			"aria-labelledby": n,
			disabled: e.props.disabled,
			max: e.props.max,
			min: e.props.min,
			onValueChange: (e) => {
				a(Qx(e));
			},
			onValueCommitted: (e) => {
				r(Qx(e));
			},
			step: e.props.step,
			value: i
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs
var eS = /*#__PURE__*/ C.createContext(void 0);
function tS() {
	let e = C.useContext(eS);
	if (e === void 0) throw Error(Dt(63));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/switch/root/SwitchRootDataAttributes.mjs
var nS = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), rS = {
	...Na,
	checked(e) {
		return e ? { [nS.checked]: "" } : { [nS.unchecked]: "" };
	}
}, iS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i, "aria-labelledby": a, form: o, id: s, inputRef: c, name: l, nativeButton: u = !1, onCheckedChange: d, readOnly: f = !1, required: p = !1, disabled: m = !1, render: h, uncheckedValue: g, value: _, style: v, ...y } = e, { clearErrors: b } = Ha(), { state: x, setTouched: S, setDirty: w, validityData: T, setFilled: E, setFocused: D, validationMode: O, disabled: k, name: A, validation: j } = La(), { labelId: M } = Wa(), N = k || m, P = A ?? l, F = C.useRef(null), I = At(F, c, j.inputRef), L = C.useRef(null), R = bn(), z = Sv({
		id: s,
		implicit: !1,
		controlRef: L
	}), B = u ? void 0 : z, [V, H] = ut({
		controlled: n,
		default: !!i,
		name: "Switch",
		state: "checked"
	});
	Ra(L, R, V, void 0, !N, l), Z(() => {
		F.current && E(F.current.checked);
	}, [F, E]), Qa(V, () => {
		b(P), w(V !== T.initialValue), E(V), j.change(V);
	});
	let { getButtonProps: U, buttonRef: W } = Ur({
		disabled: N,
		native: u
	}), G = Ga(a, M, F, !u, B), ee = {
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
			t && t.dispatchEvent(new (_r(t)).PointerEvent("click", {
				bubbles: !0,
				shiftKey: e.shiftKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				metaKey: e.metaKey
			}));
		}
	}, te = qt({
		checked: V,
		disabled: N,
		form: o,
		id: B,
		name: P,
		required: p,
		style: P ? Ea : Ta,
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
			let t = e.currentTarget.checked, n = zn(xn, e.nativeEvent);
			d?.(t, n), !n.isCanceled && H(t);
		},
		onFocus() {
			L.current?.focus();
		}
	}, (e) => j.getValidationProps(N, e), _ === void 0 ? Ht : { value: _ }), ne = C.useMemo(() => ({
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
	]), re = cn("span", e, {
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
		stateAttributesMapping: rS
	});
	return /*#__PURE__*/ (0, Y.jsxs)(eS.Provider, {
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
}), aS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e;
	return cn("span", e, {
		state: tS(),
		ref: t,
		stateAttributesMapping: rS,
		props: a
	});
});
//#endregion
//#region src/components/ui/switch.tsx
function oS({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(iS, {
		"data-slot": "switch",
		"data-size": t,
		className: J("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", e),
		...n,
		children: /* @__PURE__ */ (0, Y.jsx)(aS, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
//#endregion
//#region src/components/streamlit/switch.tsx
function sS({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex items-center gap-2 p-px",
		"data-ssui-component": "switch",
		"data-testid": "ssui-v2-switch",
		children: [/* @__PURE__ */ (0, Y.jsx)(oS, {
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
//#region src/components/ui/table.tsx
function cS({ className: e, ...t }) {
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
function lS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("thead", {
		"data-slot": "table-header",
		className: J("[&_tr]:border-b", e),
		...t
	});
}
function uS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("tbody", {
		"data-slot": "table-body",
		className: J("[&_tr:last-child]:border-0", e),
		...t
	});
}
function dS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("tr", {
		"data-slot": "table-row",
		className: J("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", e),
		...t
	});
}
function fS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("th", {
		"data-slot": "table-head",
		className: J("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function pS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("td", {
		"data-slot": "table-cell",
		className: J("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function mS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("caption", {
		"data-slot": "table-caption",
		className: J("mt-4 text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/table.tsx
var hS = {
	left: "text-left",
	center: "text-center",
	right: "text-right"
};
function gS({ envelope: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "overflow-auto rounded-lg border",
		"data-ssui-component": "table",
		"data-testid": "ssui-v2-table",
		style: { maxHeight: e.props.maxHeight === null ? void 0 : e.props.maxHeight },
		children: /* @__PURE__ */ (0, Y.jsxs)(cS, { children: [
			e.props.caption === null ? null : /* @__PURE__ */ (0, Y.jsx)(mS, { children: e.props.caption }),
			/* @__PURE__ */ (0, Y.jsx)(lS, { children: /* @__PURE__ */ (0, Y.jsx)(dS, { children: e.props.columns.map((e) => /* @__PURE__ */ (0, Y.jsx)(fS, {
				className: hS[e.align],
				scope: "col",
				children: e.label
			}, e.key)) }) }),
			/* @__PURE__ */ (0, Y.jsx)(uS, { children: e.props.rows.map((t, n) => /* @__PURE__ */ (0, Y.jsx)(dS, { children: e.props.columns.map((e, r) => /* @__PURE__ */ (0, Y.jsx)(pS, {
				className: hS[e.align],
				children: t[r] === null ? "" : String(t[r])
			}, `${n}-${e.key}`)) }, n)) })
		] })
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
var _S = /*#__PURE__*/ C.createContext(void 0);
function vS() {
	let e = C.useContext(_S);
	if (e === void 0) throw Error(Dt(64));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
var yS = /*#__PURE__*/ function(e) {
	return e.activationDirection = "data-activation-direction", e.orientation = "data-orientation", e;
}({}), bS = { tabActivationDirection: (e) => ({ [yS.activationDirection]: e }) }, xS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, defaultValue: r = 0, onValueChange: i, orientation: a = "horizontal", render: o, value: s, style: c, ...l } = e, u = e.defaultValue !== void 0, d = C.useRef([]), [f, p] = C.useState(() => /* @__PURE__ */ new Map()), [m, h] = ut({
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
	w !== m && (E = SS(w, m, a, _), D = w != null && m != null && b(m) == null);
	let O = D ? w : m, k = w !== O || T !== E;
	Z(() => {
		k && S({
			previousValue: O,
			tabActivationDirection: E
		});
	}, [
		O,
		k,
		E
	]);
	let A = X((e, t) => {
		t.activationDirection = SS(m, e, a, _), i?.(e, t), !t.isCanceled && h(e);
	}), j = X((e, t) => {
		i?.(e, zn(t, void 0, void 0, { activationDirection: "none" }));
	}), M = X((e, t) => {
		p((n) => {
			if (n.get(e) === t) return n;
			let r = new Map(n);
			return r.set(e, t), r;
		});
	}), N = X((e, t) => {
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
	Z(() => {
		if (g) return;
		function e(e, t) {
			h(e), S((t) => t.previousValue === e && t.tabActivationDirection === "none" ? t : {
				previousValue: e,
				tabActivationDirection: "none"
			}), j(e, t), z.current = !1;
		}
		if (_.size === 0) {
			H.current && m !== null && !y.current?.isConnected && e(null, Fn);
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
			let i = Fn;
			r ? i = In : t && (i = Pn), e(n, i);
			return;
		}
		r && L != null && (j(m, In), z.current = !1);
	}, [
		R,
		g,
		j,
		L,
		h,
		_,
		m
	]);
	let U = cn("div", e, {
		state: {
			orientation: a,
			tabActivationDirection: E
		},
		ref: t,
		props: l,
		stateAttributesMapping: bS
	});
	return /*#__PURE__*/ (0, Y.jsx)(_S.Provider, {
		value: I,
		children: /*#__PURE__*/ (0, Y.jsx)(bt, {
			elementsRef: d,
			children: U
		})
	});
});
function SS(e, t, n, r) {
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
var CS = /*#__PURE__*/ C.createContext(void 0);
function wS() {
	let e = C.useContext(CS);
	if (e === void 0) throw Error(Dt(65));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
var TS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: a, id: o, nativeButton: s = !0, style: c, ...l } = e, { value: u, getTabPanelIdByValue: d, orientation: f, tabActivationDirection: p } = vS(), { activateOnFocus: m, highlightedTabIndex: h, onTabActivation: g, registerTabResizeObserverElement: _, setHighlightedTabIndex: v, tabsListElement: y } = wS(), b = bn(o), { compositeProps: x, compositeRef: S, index: w } = dp({ metadata: C.useMemo(() => ({
		disabled: r,
		id: b,
		value: a
	}), [
		r,
		b,
		a
	]) }), T = a === u, E = C.useRef(!1), D = C.useRef(null);
	Z(() => {
		let e = D.current;
		if (e) return _(e);
	}, [_]), Z(() => {
		if (E.current) {
			E.current = !1;
			return;
		}
		if (!(T && w > -1 && h !== w)) return;
		let e = y;
		if (e != null) {
			let t = ds(Xr(e));
			if (t && fs(e, t)) return;
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
	let { getButtonProps: O, buttonRef: k } = Ur({
		disabled: r,
		native: s,
		focusableWhenDisabled: !0
	}), A = d(a), j = C.useRef(!1), M = C.useRef(!1);
	function N(e) {
		T || r || g(a, zn(xn, e.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function P(e) {
		T || (w > -1 && !r && v(w), !r && m && (!j.current || j.current && M.current) && g(a, zn(xn, e.nativeEvent, void 0, { activationDirection: "none" })));
	}
	function F(e) {
		if (T || r) return;
		j.current = !0;
		function t() {
			j.current = !1, M.current = !1;
		}
		(!e.button || e.button === 0) && (M.current = !0, Xr(e.currentTarget).addEventListener("pointerup", t, { once: !0 }));
	}
	return cn("button", e, {
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
				[oy]: T ? "" : void 0,
				onKeyDownCapture() {
					E.current = !0;
				}
			},
			l,
			O
		],
		stateAttributesMapping: bS
	});
}), ES = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: i = !0, render: a, style: o, ...s } = e, { onValueChange: c, orientation: l, value: u, setTabMap: d, tabActivationDirection: f } = vS(), [p, m] = C.useState(0), [h, g] = C.useState(null), _ = C.useRef(/* @__PURE__ */ new Set()), v = C.useRef(/* @__PURE__ */ new Set()), y = C.useRef(null);
	Z(() => {
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
	let b = X((e) => (_.current.add(e), () => {
		_.current.delete(e);
	})), x = X((e) => (v.current.add(e), y.current?.observe(e), () => {
		v.current.delete(e), y.current?.unobserve(e);
	})), S = X((e, t) => {
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
	return /*#__PURE__*/ (0, Y.jsx)(CS.Provider, {
		value: E,
		children: /*#__PURE__*/ (0, Y.jsx)(_y, {
			render: a,
			className: r,
			style: o,
			state: w,
			refs: [t, g],
			props: [T, s],
			stateAttributesMapping: bS,
			highlightedIndex: p,
			enableHomeAndEndKeys: !0,
			loopFocus: i,
			orientation: l,
			onHighlightedIndexChange: m,
			onMapChange: d,
			disabledIndices: Vt
		})
	});
});
//#endregion
//#region src/components/ui/tabs.tsx
function DS({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(xS, {
		"data-slot": "tabs",
		"data-orientation": t,
		className: J("group/tabs flex gap-2 data-horizontal:flex-col", e),
		...n
	});
}
var OS = S("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none", {
	variants: { variant: {
		default: "bg-muted",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function kS({ className: e, variant: t = "default", ...n }) {
	return /* @__PURE__ */ (0, Y.jsx)(ES, {
		"data-slot": "tabs-list",
		"data-variant": t,
		className: J(OS({ variant: t }), e),
		...n
	});
}
function AS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)(TS, {
		"data-slot": "tabs-trigger",
		className: J("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/tabs.tsx
function jS({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commit: r, state: i } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "tabs",
		"data-testid": "ssui-v2-tabs",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "sr-only",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(DS, {
			"aria-labelledby": n,
			onValueChange: (e) => {
				typeof e == "string" && r(e);
			},
			orientation: e.props.orientation,
			value: i.value,
			children: /* @__PURE__ */ (0, Y.jsx)(kS, {
				"aria-label": e.props.label,
				variant: e.props.variant,
				children: e.props.options.map((t) => /* @__PURE__ */ (0, Y.jsx)(AS, {
					disabled: e.props.disabled || t.disabled,
					value: t.value,
					children: t.label
				}, t.value))
			})
		})]
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function MS({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Y.jsx)("textarea", {
		"data-slot": "textarea",
		className: J("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/textarea.tsx
function NS({ envelope: e, setStateValue: t }) {
	let n = (0, C.useId)(), { commitDraft: r, draft: i, setDraft: a } = Ii(e.state, t);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "textarea",
		"data-testid": "ssui-v2-textarea",
		children: [/* @__PURE__ */ (0, Y.jsx)("label", {
			className: "text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Y.jsx)(MS, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle-group/ToggleGroupContext.mjs
var PS = /*#__PURE__*/ C.createContext(void 0);
function FS(e = !0) {
	let t = C.useContext(PS);
	if (t === void 0 && !e) throw Error(Dt(7));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle/Toggle.mjs
var IS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { className: n, defaultPressed: r = !1, disabled: i = !1, form: a, onPressedChange: o, pressed: s, render: c, type: l, value: u, nativeButton: d = !0, style: f, ...p } = e, m = bn(u || void 0), h = FS(), g = h?.value ?? [], _ = h ? void 0 : r, v = (i || h?.disabled) ?? !1, [y, b] = ut({
		controlled: h ? m !== void 0 && g.indexOf(m) > -1 : s,
		default: _,
		name: "Toggle",
		state: "pressed"
	}), { getButtonProps: x, buttonRef: S } = Ur({
		disabled: v,
		native: d
	}), w = {
		disabled: v,
		pressed: y
	}, T = [S, t], E = [
		{
			"aria-pressed": y,
			onClick(e) {
				let t = !y, n = zn(xn, e.nativeEvent);
				o?.(t, n), !n.isCanceled && (m && h?.setGroupValue?.(m, t, n), !n.isCanceled && b(t));
			}
		},
		p,
		x
	], D = cn("button", e, {
		enabled: !h,
		state: w,
		ref: T,
		props: E
	}), O = C.useMemo(() => ({
		disabled: v,
		focusableWhenDisabled: !1
	}), [v]);
	return h ? /*#__PURE__*/ (0, Y.jsx)(fp, {
		tag: "button",
		render: c,
		className: n,
		style: f,
		metadata: O,
		state: w,
		refs: T,
		props: E
	}) : D;
}), LS = /*#__PURE__*/ C.createContext(void 0);
function RS(e) {
	let t = C.useContext(LS);
	if (t === void 0 && !e) throw Error(Dt(68));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toggle-group/ToggleGroupDataAttributes.mjs
var zS = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.orientation = "data-orientation", e.multiple = "data-multiple", e;
}({}), BS = { multiple(e) {
	return e ? { [zS.multiple]: "" } : null;
} }, VS = /*#__PURE__*/ C.forwardRef(function(e, t) {
	let { defaultValue: n, disabled: r = !1, loopFocus: i = !0, onValueChange: a, orientation: o = "horizontal", multiple: s = !1, value: c, className: l, render: u, style: d, ...f } = e, p = ef(!0), m = RS(!0), h = C.useMemo(() => c !== void 0 || n !== void 0, [c, n]), g = (p?.disabled ?? !1) || (m?.disabled ?? !1) || r, [_, v] = ut({
		controlled: c,
		default: c === void 0 ? n ?? Vt : void 0,
		name: "ToggleGroup",
		state: "value"
	}), y = X((e, t, n) => {
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
	]), S = { role: "group" }, w = cn("div", e, {
		enabled: !!p,
		state: b,
		ref: t,
		props: [S, f],
		stateAttributesMapping: BS
	});
	return /*#__PURE__*/ (0, Y.jsx)(PS.Provider, {
		value: x,
		children: p ? w : /*#__PURE__*/ (0, Y.jsx)(_y, {
			render: u,
			className: l,
			style: d,
			state: b,
			refs: [t],
			props: [S, f],
			stateAttributesMapping: BS,
			loopFocus: i,
			enableHomeAndEndKeys: !0,
			orientation: o
		})
	});
}), HS = S("group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function US({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Y.jsx)(IS, {
		"data-slot": "toggle",
		className: J(HS({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/components/ui/toggle-group.tsx
var WS = C.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function GS({ className: e, variant: t, size: n, spacing: r = 2, orientation: i = "horizontal", children: a, ...o }) {
	return /* @__PURE__ */ (0, Y.jsx)(VS, {
		"data-slot": "toggle-group",
		"data-variant": t,
		"data-size": n,
		"data-spacing": r,
		"data-orientation": i,
		style: { "--gap": r },
		className: J("group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch", e),
		...o,
		children: /* @__PURE__ */ (0, Y.jsx)(WS.Provider, {
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
function KS({ className: e, children: t, variant: n = "default", size: r = "default", ...i }) {
	let a = C.useContext(WS);
	return /* @__PURE__ */ (0, Y.jsx)(IS, {
		"data-slot": "toggle-group-item",
		"data-variant": a.variant || n,
		"data-size": a.size || r,
		"data-spacing": a.spacing,
		className: J("shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", HS({
			variant: a.variant || n,
			size: a.size || r
		}), e),
		...i,
		children: t
	});
}
//#endregion
//#region src/components/streamlit/toggle-group.tsx
function qS({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t);
	return /* @__PURE__ */ (0, Y.jsx)(GS, {
		"aria-label": e.props.label,
		"data-ssui-component": "toggle_group",
		"data-testid": "ssui-v2-toggle-group",
		disabled: e.props.disabled,
		multiple: e.props.multiple,
		onValueChange: n,
		orientation: e.props.orientation,
		value: r.value,
		variant: e.props.variant,
		children: e.props.options.map((e) => /* @__PURE__ */ (0, Y.jsx)(KS, {
			"aria-label": e.label,
			disabled: e.disabled,
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components/streamlit/toggle.tsx
var JS = {
	bold: bi,
	italic: Di,
	underline: Oi
};
function YS({ envelope: e, setStateValue: t }) {
	let { commit: n, state: r } = Fi(e.state, t), i = e.props.icon === null ? null : JS[e.props.icon];
	return /* @__PURE__ */ (0, Y.jsxs)(US, {
		"aria-label": e.props.label,
		"data-ssui-component": "toggle",
		"data-testid": "ssui-v2-toggle",
		disabled: e.props.disabled,
		onPressedChange: n,
		pressed: r.value,
		variant: e.props.variant,
		children: [i === null ? null : /* @__PURE__ */ (0, Y.jsx)(i, { "aria-hidden": "true" }), e.props.label]
	});
}
//#endregion
//#region src/app.tsx
function XS({ envelope: e, setStateValue: t, setTriggerValue: n }) {
	switch (e.kind) {
		case "select": return /* @__PURE__ */ (0, Y.jsx)(mx, {
			envelope: e,
			setStateValue: t
		});
		case "dropdown_menu": return /* @__PURE__ */ (0, Y.jsx)(Ip, {
			envelope: e,
			setTriggerValue: n
		});
		case "checkbox": return /* @__PURE__ */ (0, Y.jsx)(ro, {
			envelope: e,
			setStateValue: t
		});
		case "button": return /* @__PURE__ */ (0, Y.jsx)(ha, {
			envelope: e,
			setTriggerValue: n
		});
		case "alert": return /* @__PURE__ */ (0, Y.jsx)(lt, { envelope: e });
		case "avatar": return /* @__PURE__ */ (0, Y.jsx)(ea, { envelope: e });
		case "badge": return /* @__PURE__ */ (0, Y.jsx)(ia, { envelope: e });
		case "breadcrumb": return /* @__PURE__ */ (0, Y.jsx)(da, {
			envelope: e,
			setTriggerValue: n
		});
		case "card": return /* @__PURE__ */ (0, Y.jsx)(Sa, { envelope: e });
		case "metric_card": return /* @__PURE__ */ (0, Y.jsx)(Ca, { envelope: e });
		case "aspect_ratio": return /* @__PURE__ */ (0, Y.jsx)(zi, { envelope: e });
		case "progress": return /* @__PURE__ */ (0, Y.jsx)(ry, { envelope: e });
		case "separator": return /* @__PURE__ */ (0, Y.jsx)(gx, { envelope: e });
		case "skeleton": return /* @__PURE__ */ (0, Y.jsx)(vx, { envelope: e });
		case "table": return /* @__PURE__ */ (0, Y.jsx)(gS, { envelope: e });
		case "link_button": return /* @__PURE__ */ (0, Y.jsx)(Ov, { envelope: e });
		case "input": return /* @__PURE__ */ (0, Y.jsx)(Dv, {
			envelope: e,
			setStateValue: t
		});
		case "textarea": return /* @__PURE__ */ (0, Y.jsx)(NS, {
			envelope: e,
			setStateValue: t
		});
		case "accordion": return /* @__PURE__ */ (0, Y.jsx)(Li, {
			envelope: e,
			setStateValue: t
		});
		case "collapsible": return /* @__PURE__ */ (0, Y.jsx)(mo, {
			envelope: e,
			setStateValue: t
		});
		case "input_otp": return /* @__PURE__ */ (0, Y.jsx)(yv, {
			envelope: e,
			setStateValue: t
		});
		case "pagination": return /* @__PURE__ */ (0, Y.jsx)(Fv, {
			envelope: e,
			setStateValue: t
		});
		case "radio_group": return /* @__PURE__ */ (0, Y.jsx)(Sy, {
			envelope: e,
			setStateValue: t
		});
		case "scroll_area": return /* @__PURE__ */ (0, Y.jsx)(ab, { envelope: e });
		case "slider": return /* @__PURE__ */ (0, Y.jsx)($x, {
			envelope: e,
			setStateValue: t
		});
		case "switch": return /* @__PURE__ */ (0, Y.jsx)(sS, {
			envelope: e,
			setStateValue: t
		});
		case "tabs": return /* @__PURE__ */ (0, Y.jsx)(jS, {
			envelope: e,
			setStateValue: t
		});
		case "toggle": return /* @__PURE__ */ (0, Y.jsx)(YS, {
			envelope: e,
			setStateValue: t
		});
		case "toggle_group": return /* @__PURE__ */ (0, Y.jsx)(qS, {
			envelope: e,
			setStateValue: t
		});
		case "calendar": return /* @__PURE__ */ (0, Y.jsx)(J_, {
			envelope: e,
			setStateValue: t
		});
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@date-fns+tz@1.5.0_@types+react@19.2.17_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/csp-provider/CSPProvider.mjs
function ZS(e) {
	let { children: t, nonce: n, disableStyleElements: r } = e, i = C.useMemo(() => ({
		nonce: n,
		disableStyleElements: r
	}), [n, r]);
	return /*#__PURE__*/ (0, Y.jsx)(My.Provider, {
		value: i,
		children: t
	});
}
//#endregion
//#region src/platform/error-boundary.tsx
var QS = 3, $S = /* @__PURE__ */ new Map();
function eC(e, t) {
	let n = e.message.split(":")[0]?.slice(0, 64), r = n && /^SSUI_V2_[A-Z0-9_]+$/.test(n) ? n : "SSUI_V2_RENDER_ERROR", i = $S.get(r) ?? 0;
	i >= QS || ($S.set(r, i + 1), console.error("SSUI_V2_RENDER_ERROR", {
		code: r,
		componentStack: t.componentStack?.slice(0, 2048)
	}));
}
var tC = class extends C.Component {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		eC(e, t);
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
function nC({ children: e, overlayRoot: t, parentElement: n, resetKey: r }) {
	return /* @__PURE__ */ (0, Y.jsx)(tC, {
		resetKey: r,
		children: /* @__PURE__ */ (0, Y.jsx)(ZS, {
			disableStyleElements: !0,
			children: /* @__PURE__ */ (0, Y.jsx)(Op, {
				container: t,
				expectedRoot: n,
				children: e
			})
		})
	});
}
//#endregion
//#region src/platform/theme.ts
function rC(e) {
	let t = Number.parseFloat(e);
	return Number.isFinite(t) ? e.includes("%") ? t / 100 * 255 : t : null;
}
function iC(e) {
	let t = e.match(/rgba?\(\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)/), n = e.trim().match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i), r = null;
	if (t) r = [
		rC(t[1] ?? ""),
		rC(t[2] ?? ""),
		rC(t[3] ?? "")
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
function aC(e) {
	return e instanceof ShadowRoot ? e.host : e;
}
var oC = /* @__PURE__ */ new WeakMap(), sC = /* @__PURE__ */ new WeakMap();
function cC(e, t, n) {
	n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function lC(e) {
	let t = getComputedStyle(e), n = iC(t.getPropertyValue("--st-background-color").trim() || t.backgroundColor), r = iC(t.getPropertyValue("--st-primary-color").trim() || "#ff4b4b"), i = n === null ? "light" : n < .18 ? "dark" : "light", a = r !== null && r >= .179 ? "#000000" : "#ffffff";
	e.dataset.ssuiV2Host = "", e.dataset.theme = i, e.style.colorScheme = i, e.style.setProperty("--ssui-v2-primary-foreground", a), e.dir = document.documentElement.dir || "ltr", e.lang = document.documentElement.lang || "en";
}
function uC(e) {
	let t = aC(e);
	oC.has(t) || oC.set(t, {
		colorScheme: t.style.getPropertyValue("color-scheme"),
		colorSchemePriority: t.style.getPropertyPriority("color-scheme"),
		dataSsuiV2Host: t.getAttribute("data-ssui-v2-host"),
		dataTheme: t.getAttribute("data-theme"),
		dir: t.getAttribute("dir"),
		lang: t.getAttribute("lang"),
		primaryForeground: t.style.getPropertyValue("--ssui-v2-primary-foreground"),
		primaryForegroundPriority: t.style.getPropertyPriority("--ssui-v2-primary-foreground")
	}), lC(t);
	let n = sC.get(t);
	n !== void 0 && cancelAnimationFrame(n), sC.set(t, requestAnimationFrame(() => {
		sC.delete(t), oC.has(t) && t.isConnected && lC(t);
	}));
}
function dC(e) {
	let t = aC(e), n = sC.get(t);
	n !== void 0 && (cancelAnimationFrame(n), sC.delete(t));
	let r = oC.get(t);
	r && (cC(t, "data-ssui-v2-host", r.dataSsuiV2Host), cC(t, "data-theme", r.dataTheme), cC(t, "dir", r.dir), cC(t, "lang", r.lang), r.colorScheme ? t.style.setProperty("color-scheme", r.colorScheme, r.colorSchemePriority) : t.style.removeProperty("color-scheme"), r.primaryForeground ? t.style.setProperty("--ssui-v2-primary-foreground", r.primaryForeground, r.primaryForegroundPriority) : t.style.removeProperty("--ssui-v2-primary-foreground"), oC.delete(t));
}
function fC(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function pC(e) {
	return typeof e == "string" && new TextEncoder().encode(e).byteLength <= 16384;
}
function mC(e) {
	return e === null || pC(e);
}
function hC(e) {
	if (!pC(e)) return !1;
	if (e.startsWith("/") || e.startsWith("#") || e.startsWith("?")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:" || t.protocol === "mailto:";
	} catch {
		return !1;
	}
}
function gC(e) {
	if (!pC(e)) return !1;
	if (e.startsWith("data:image/") || e.startsWith("/")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:";
	} catch {
		return !1;
	}
}
function _C(e) {
	return e === null || gC(e);
}
function vC(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function yC(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= 1e4 || typeof e == "string" && /^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$/.test(e);
}
function bC(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function xC(e, t) {
	return fC(e) && e.kind === t && bC(e.clientRevision) && bC(e.serverRevision);
}
function SC(e, t, n) {
	return !xC(e, t) || !n(e.value) ? null : {
		kind: t,
		value: e.value,
		clientRevision: e.clientRevision,
		serverRevision: e.serverRevision
	};
}
function CC(e) {
	let t = e.props, n = e.state;
	if (!fC(t) || !xC(n, "select") || !(n.value === null || pC(n.value)) || !pC(t.label) || !pC(t.placeholder) || typeof t.disabled != "boolean" || !Array.isArray(t.options) || t.options.length > 1e4) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.options) {
		if (!fC(e) || !pC(e.label) || !pC(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || i.has(e.value)) return null;
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
function wC(e) {
	let t = e.props;
	if (!fC(t) || !pC(t.label) || !(t.menuLabel === null || pC(t.menuLabel)) || typeof t.disabled != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!fC(e) || !pC(e.label) || !pC(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || e.variant !== void 0 && e.variant !== "default" && e.variant !== "destructive" || r.has(e.value)) return null;
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
function TC(e) {
	let t = e.props, n = e.state;
	return !fC(t) || !xC(n, "checkbox") || typeof n.value != "boolean" || !pC(t.label) || typeof t.disabled != "boolean" ? null : {
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
var EC = /* @__PURE__ */ new Set([
	"default",
	"destructive",
	"outline",
	"secondary",
	"ghost",
	"link"
]);
function DC(e) {
	let t = e.props;
	return !fC(t) || !pC(t.text) || typeof t.disabled != "boolean" || typeof t.variant != "string" || !EC.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "button",
		props: {
			disabled: t.disabled,
			text: t.text,
			variant: t.variant
		}
	};
}
var OC = /* @__PURE__ */ new Set(["default", "destructive"]), kC = /* @__PURE__ */ new Set([
	"sm",
	"default",
	"lg"
]), AC = /* @__PURE__ */ new Set([
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link"
]);
function jC(e) {
	let t = e.props;
	return !fC(t) || !pC(t.title) || !mC(t.description) || typeof t.variant != "string" || !OC.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "alert",
		props: {
			title: t.title,
			description: t.description,
			variant: t.variant
		}
	};
}
function MC(e) {
	let t = e.props;
	return !fC(t) || !_C(t.src) || !pC(t.fallback) || !pC(t.alt) || typeof t.size != "string" || !kC.has(t.size) ? null : {
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
function NC(e) {
	let t = e.props;
	if (!fC(t) || !Array.isArray(t.badges) || t.badges.length > 1e4) return null;
	let n = [];
	for (let e of t.badges) {
		if (!fC(e) || !pC(e.text) || typeof e.variant != "string" || !AC.has(e.variant)) return null;
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
function PC(e) {
	let t = e.props;
	if (!fC(t) || !pC(t.label) || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = 0;
	for (let e of t.items) {
		if (!fC(e) || !pC(e.text) || !mC(e.href) || typeof e.current != "boolean") return null;
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
function FC(e) {
	return !fC(e) || !mC(e.title) || !mC(e.content) || !mC(e.description) || e.size !== "default" && e.size !== "sm" ? null : {
		title: e.title,
		content: e.content,
		description: e.description,
		size: e.size
	};
}
function IC(e, t) {
	let n = FC(e.props);
	return n ? {
		protocolVersion: 1,
		kind: t,
		props: n
	} : null;
}
function LC(e) {
	let t = e.props;
	return !fC(t) || !gC(t.src) || !pC(t.alt) || !vC(t.ratio) || t.ratio <= 0 || t.ratio > 100 ? null : {
		protocolVersion: 1,
		kind: "aspect_ratio",
		props: {
			src: t.src,
			alt: t.alt,
			ratio: t.ratio
		}
	};
}
function RC(e) {
	let t = e.props;
	return !fC(t) || !vC(t.value) || t.value < 0 || t.value > 100 || !mC(t.label) || typeof t.showValue != "boolean" ? null : {
		protocolVersion: 1,
		kind: "progress",
		props: {
			value: t.value,
			label: t.label,
			showValue: t.showValue
		}
	};
}
function zC(e) {
	let t = e.props;
	return !fC(t) || t.orientation !== "horizontal" && t.orientation !== "vertical" ? null : {
		protocolVersion: 1,
		kind: "separator",
		props: { orientation: t.orientation }
	};
}
function BC(e) {
	let t = e.props;
	return !fC(t) || t.shape !== "rectangle" && t.shape !== "circle" || !yC(t.width) || !yC(t.height) ? null : {
		protocolVersion: 1,
		kind: "skeleton",
		props: {
			shape: t.shape,
			width: t.width,
			height: t.height
		}
	};
}
function VC(e) {
	return e === null || typeof e == "string" || typeof e == "boolean" || vC(e);
}
function HC(e) {
	let t = e.props;
	if (!fC(t) || !Array.isArray(t.columns) || !Array.isArray(t.rows) || t.columns.length > 1e4 || t.rows.length > 1e4 || !mC(t.caption) || !(t.maxHeight === null || Number.isSafeInteger(t.maxHeight) && t.maxHeight >= 80 && t.maxHeight <= 1e4)) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.columns) {
		if (!fC(e) || !pC(e.key) || !pC(e.label) || e.align !== "left" && e.align !== "center" && e.align !== "right" || r.has(e.key)) return null;
		r.add(e.key), n.push({
			key: e.key,
			label: e.label,
			align: e.align
		});
	}
	let i = [];
	for (let e of t.rows) {
		if (!Array.isArray(e) || e.length !== n.length || e.some((e) => !VC(e))) return null;
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
function UC(e) {
	let t = e.props;
	return !fC(t) || !pC(t.text) || !hC(t.url) || typeof t.variant != "string" || !EC.has(t.variant) || typeof t.disabled != "boolean" || t.target !== "_blank" && t.target !== "_self" ? null : {
		protocolVersion: 1,
		kind: "link_button",
		props: {
			text: t.text,
			url: t.url,
			variant: t.variant,
			disabled: t.disabled,
			target: t.target
		}
	};
}
var WC = /* @__PURE__ */ new Set([
	"text",
	"email",
	"password",
	"search",
	"tel",
	"url"
]);
function GC(e) {
	return e === null || Number.isSafeInteger(e) && e >= 1 && e <= 16384;
}
function KC(e) {
	if (!Array.isArray(e) || e.length > 1e4) return null;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		if (!fC(r) || !pC(r.label) || !pC(r.value) || typeof r.disabled != "boolean" || n.has(r.value)) return null;
		n.add(r.value), t.push({
			label: r.label,
			value: r.value,
			disabled: r.disabled
		});
	}
	return t;
}
function qC(e) {
	return Array.isArray(e) && e.length <= 1e4 && e.every((e) => pC(e));
}
function JC(e) {
	return new Set(e).size === e.length;
}
function YC(e) {
	if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e)) return !1;
	let t = Number(e.slice(0, 4)), n = Number(e.slice(5, 7)), r = Number(e.slice(8, 10)), i = /* @__PURE__ */ new Date(0);
	return i.setUTCHours(0, 0, 0, 0), i.setUTCFullYear(t, n - 1, r), i.getUTCFullYear() === t && i.getUTCMonth() === n - 1 && i.getUTCDate() === r;
}
function XC(e) {
	return e === null || YC(e);
}
function ZC(e) {
	let t = e.props, n = SC(e.state, "input", pC);
	return !n || !fC(t) || !pC(t.label) || !pC(t.placeholder) || typeof t.type != "string" || !WC.has(t.type) || typeof t.disabled != "boolean" || !GC(t.maxLength) || t.maxLength !== null && n.value.length > t.maxLength ? null : {
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
function QC(e) {
	let t = e.props, n = SC(e.state, "textarea", pC);
	return !n || !fC(t) || !pC(t.label) || !pC(t.placeholder) || typeof t.disabled != "boolean" || !Number.isSafeInteger(t.rows) || t.rows < 2 || t.rows > 20 || !GC(t.maxLength) || t.maxLength !== null && n.value.length > t.maxLength ? null : {
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
function $C(e) {
	let t = e.props, n = SC(e.state, "accordion", qC);
	if (!n || !fC(t) || !pC(t.label) || typeof t.disabled != "boolean" || typeof t.multiple != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4 || !JC(n.value) || !t.multiple && n.value.length > 1) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!fC(e) || !pC(e.label) || !pC(e.content) || !pC(e.value) || typeof e.disabled != "boolean" || i.has(e.value)) return null;
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
function ew(e) {
	let t = e.props, n = SC(e.state, "collapsible", (e) => typeof e == "boolean");
	return !n || !fC(t) || !pC(t.title) || !mC(t.firstItem) || !qC(t.items) || typeof t.disabled != "boolean" ? null : {
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
function tw(e) {
	let t = e.props, n = SC(e.state, "input_otp", pC);
	return !n || !fC(t) || !pC(t.label) || !Number.isSafeInteger(t.maxLength) || t.maxLength < 1 || t.maxLength > 12 || t.pattern !== "digits" && t.pattern !== "alphanumeric" || typeof t.disabled != "boolean" || n.value.length > t.maxLength || (t.pattern === "digits" ? !/^\d*$/.test(n.value) : !/^[a-z0-9]*$/i.test(n.value)) ? null : {
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
function nw(e) {
	let t = e.props, n = SC(e.state, "pagination", (e) => Number.isSafeInteger(e));
	return !n || !fC(t) || !pC(t.label) || !Number.isSafeInteger(t.totalPages) || t.totalPages < 1 || t.totalPages > 1e4 || !Number.isSafeInteger(t.siblingCount) || t.siblingCount < 0 || t.siblingCount > 10 || typeof t.disabled != "boolean" || n.value < 1 || n.value > t.totalPages ? null : {
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
function rw(e) {
	let t = e.props, n = SC(e.state, "radio_group", mC);
	if (!n || !fC(t) || !pC(t.label) || typeof t.disabled != "boolean") return null;
	let r = KC(t.options);
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
function iw(e) {
	let t = e.props;
	return !fC(t) || !mC(t.title) || !qC(t.items) || !Number.isSafeInteger(t.height) || t.height < 80 || t.height > 1e4 ? null : {
		protocolVersion: 1,
		kind: "scroll_area",
		props: {
			title: t.title,
			items: [...t.items],
			height: t.height
		}
	};
}
function aw(e) {
	let t = e.props, n = SC(e.state, "slider", (e) => Array.isArray(e) && e.every((e) => vC(e)));
	if (!n || !fC(t) || !pC(t.label) || !vC(t.min) || !vC(t.max) || t.max <= t.min || !vC(t.step) || t.step <= 0 || t.step > t.max - t.min || typeof t.disabled != "boolean" || n.value.length !== 1 && n.value.length !== 2) return null;
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
function ow(e) {
	let t = e.props, n = SC(e.state, "switch", (e) => typeof e == "boolean");
	return !n || !fC(t) || !pC(t.label) || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "switch",
		state: n,
		props: {
			label: t.label,
			disabled: t.disabled
		}
	};
}
function sw(e) {
	let t = e.props, n = SC(e.state, "tabs", pC);
	if (!n || !fC(t) || !pC(t.label) || t.orientation !== "horizontal" && t.orientation !== "vertical" || t.variant !== "default" && t.variant !== "line" || typeof t.disabled != "boolean") return null;
	let r = KC(t.options);
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
function cw(e) {
	let t = e.props, n = SC(e.state, "toggle", (e) => typeof e == "boolean");
	return !n || !fC(t) || !pC(t.label) || t.icon !== null && t.icon !== "bold" && t.icon !== "italic" && t.icon !== "underline" || t.variant !== "default" && t.variant !== "outline" || typeof t.disabled != "boolean" ? null : {
		protocolVersion: 1,
		kind: "toggle",
		state: n,
		props: {
			label: t.label,
			icon: t.icon,
			variant: t.variant,
			disabled: t.disabled
		}
	};
}
function lw(e) {
	let t = e.props, n = SC(e.state, "toggle_group", qC);
	if (!n || !fC(t) || !pC(t.label) || typeof t.multiple != "boolean" || t.orientation !== "horizontal" && t.orientation !== "vertical" || t.variant !== "default" && t.variant !== "outline" || typeof t.disabled != "boolean" || !JC(n.value) || !t.multiple && n.value.length > 1) return null;
	let r = KC(t.options);
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
			disabled: t.disabled
		}
	};
}
function uw(e) {
	let t = e.props, n = SC(e.state, "calendar", XC);
	return !n || !fC(t) || !pC(t.label) || !XC(t.minDate) || !XC(t.maxDate) || typeof t.disabled != "boolean" || t.minDate !== null && t.maxDate !== null && t.minDate > t.maxDate || n.value !== null && (t.minDate !== null && n.value < t.minDate || t.maxDate !== null && n.value > t.maxDate) ? null : {
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
function dw(e) {
	switch (e.kind) {
		case "select": return CC(e);
		case "dropdown_menu": return wC(e);
		case "checkbox": return TC(e);
		case "button": return DC(e);
		case "alert": return jC(e);
		case "avatar": return MC(e);
		case "badge": return NC(e);
		case "breadcrumb": return PC(e);
		case "card": return IC(e, "card");
		case "metric_card": return IC(e, "metric_card");
		case "aspect_ratio": return LC(e);
		case "progress": return RC(e);
		case "separator": return zC(e);
		case "skeleton": return BC(e);
		case "table": return HC(e);
		case "link_button": return UC(e);
		case "input": return ZC(e);
		case "textarea": return QC(e);
		case "accordion": return $C(e);
		case "collapsible": return ew(e);
		case "input_otp": return tw(e);
		case "pagination": return nw(e);
		case "radio_group": return rw(e);
		case "scroll_area": return iw(e);
		case "slider": return aw(e);
		case "switch": return ow(e);
		case "tabs": return sw(e);
		case "toggle": return cw(e);
		case "toggle_group": return lw(e);
		case "calendar": return uw(e);
		default: return null;
	}
}
function fw(e) {
	let t = fC(e) && typeof e.kind == "string" ? e.kind : "unknown", n = fC(e) && (typeof e.protocolVersion == "string" || typeof e.protocolVersion == "number") ? String(e.protocolVersion) : "unknown", r = Infinity;
	try {
		r = new TextEncoder().encode(JSON.stringify(e)).byteLength;
	} catch {}
	if (r > 2097152 || !fC(e) || e.protocolVersion !== 1) return {
		ok: !1,
		failure: {
			code: r > 2097152 ? "SSUI_V2_ENVELOPE_TOO_LARGE" : "SSUI_V2_PROTOCOL_VERSION",
			kind: t,
			protocolVersion: n
		}
	};
	let i = dw(e);
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
var pw = /* @__PURE__ */ new WeakMap();
function mw(e, t, n) {
	let r = e.querySelector(t);
	if (!(r instanceof HTMLElement)) throw Error(`${n}: required component root is missing.`);
	return r;
}
function hw(e, t) {
	let n = mw(e, "[data-ssui-v2-app-root]", "SSUI_V2_APP_ROOT_MISSING"), r = mw(e, "[data-ssui-v2-overlay-root]", "SSUI_V2_OVERLAY_ROOT_MISSING");
	if (n.getRootNode() !== e || r.getRootNode() !== e) throw Error("SSUI_V2_ROOT_OWNERSHIP: component roots escaped parentElement.");
	let i = `ssui-${t.replace(/[^a-zA-Z0-9_-]/g, "-")}-`;
	return {
		appRoot: n,
		overlayRoot: r,
		reactRoot: (0, _.createRoot)(n, { identifierPrefix: i })
	};
}
function gw({ failure: e }) {
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
var _w = (e) => {
	let { parentElement: t } = e, n = pw.get(t);
	n || (n = hw(t, e.key), pw.set(t, n)), uC(t);
	let r = fw(e.data), i = r.ok ? `${r.envelope.kind}:${r.envelope.protocolVersion}` : `${r.failure.code}:${r.failure.kind}:${r.failure.protocolVersion}`;
	return n.reactRoot.render(/* @__PURE__ */ (0, Y.jsx)(nC, {
		overlayRoot: n.overlayRoot,
		parentElement: t,
		resetKey: i,
		children: r.ok ? /* @__PURE__ */ (0, Y.jsx)(XS, {
			envelope: r.envelope,
			setStateValue: e.setStateValue,
			setTriggerValue: e.setTriggerValue
		}) : /* @__PURE__ */ (0, Y.jsx)(gw, { failure: r.failure })
	})), () => {
		let e = pw.get(t);
		e && (e.reactRoot.unmount(), e.overlayRoot.replaceChildren(), dC(t), pw.delete(t));
	};
};
//#endregion
export { _w as default };
