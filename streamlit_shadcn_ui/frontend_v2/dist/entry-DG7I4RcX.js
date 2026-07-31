//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
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
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
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
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = f();
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
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = u(), n = f(), r = m();
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
	function d(e) {
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
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), j = Symbol.iterator;
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
	}, z = [], ee = -1;
	function B(e) {
		return { current: e };
	}
	function V(e) {
		0 > ee || (e.current = z[ee], z[ee] = null, ee--);
	}
	function H(e, t) {
		ee++, z[ee] = e.current, e.current = t;
	}
	var U = B(null), W = B(null), te = B(null), ne = B(null);
	function re(e, t) {
		switch (H(te, t), H(W, e), H(U, null), t.nodeType) {
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
		V(U), H(U, e);
	}
	function ie() {
		V(U), V(W), V(te);
	}
	function ae(e) {
		e.memoizedState !== null && H(ne, e);
		var t = U.current, n = Ud(t, e.type);
		t !== n && (H(W, e), H(U, n));
	}
	function oe(e) {
		W.current === e && (V(U), V(W)), ne.current === e && (V(ne), $f._currentValue = R);
	}
	var se, ce;
	function le(e) {
		if (se === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			se = t && t[1] || "", ce = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + se + e + ce;
	}
	var ue = !1;
	function de(e, t) {
		if (!e || ue) return "";
		ue = !0;
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
			ue = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? le(n) : "";
	}
	function fe(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return le(e.type);
			case 16: return le("Lazy");
			case 13: return e.child !== t && t !== null ? le("Suspense Fallback") : le("Suspense");
			case 19: return le("SuspenseList");
			case 0:
			case 15: return de(e.type, !1);
			case 11: return de(e.type.render, !1);
			case 1: return de(e.type, !0);
			case 31: return le("Activity");
			default: return "";
		}
	}
	function pe(e) {
		try {
			var t = "", n = null;
			do
				t += fe(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var me = Object.prototype.hasOwnProperty, he = t.unstable_scheduleCallback, ge = t.unstable_cancelCallback, _e = t.unstable_shouldYield, ve = t.unstable_requestPaint, ye = t.unstable_now, be = t.unstable_getCurrentPriorityLevel, xe = t.unstable_ImmediatePriority, Se = t.unstable_UserBlockingPriority, Ce = t.unstable_NormalPriority, we = t.unstable_LowPriority, Te = t.unstable_IdlePriority, Ee = t.log, De = t.unstable_setDisableYieldValue, Oe = null, ke = null;
	function Ae(e) {
		if (typeof Ee == "function" && De(e), ke && typeof ke.setStrictMode == "function") try {
			ke.setStrictMode(Oe, e);
		} catch {}
	}
	var je = Math.clz32 ? Math.clz32 : Ne, Me = Math.log, G = Math.LN2;
	function Ne(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Me(e) / G | 0) | 0;
	}
	var Pe = 256, Fe = 262144, Ie = 4194304;
	function Le(e) {
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
	function Re(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Le(n))) : i = Le(o) : i = Le(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Le(n))) : i = Le(o)) : i = Le(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ze(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function K(e, t) {
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
	function Be() {
		var e = Ie;
		return Ie <<= 1, !(Ie & 62914560) && (Ie = 4194304), e;
	}
	function Ve(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function He(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ue(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - je(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && We(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function We(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - je(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ge(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - je(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ke(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : qe(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function qe(e) {
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
	function Je(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Ye() {
		var e = L.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Xe(e, t) {
		var n = L.p;
		try {
			return L.p = e, t();
		} finally {
			L.p = n;
		}
	}
	var Ze = Math.random().toString(36).slice(2), Qe = "__reactFiber$" + Ze, $e = "__reactProps$" + Ze, et = "__reactContainer$" + Ze, tt = "__reactEvents$" + Ze, nt = "__reactListeners$" + Ze, rt = "__reactHandles$" + Ze, it = "__reactResources$" + Ze, at = "__reactMarker$" + Ze;
	function q(e) {
		delete e[Qe], delete e[$e], delete e[tt], delete e[nt], delete e[rt];
	}
	function ot(e) {
		var t = e[Qe];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[et] || n[Qe]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ff(e); e !== null;) {
					if (n = e[Qe]) return n;
					e = ff(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function st(e) {
		if (e = e[Qe] || e[et]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ct(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function lt(e) {
		var t = e[it];
		return t ||= e[it] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ut(e) {
		e[at] = !0;
	}
	var dt = /* @__PURE__ */ new Set(), ft = {};
	function pt(e, t) {
		mt(e, t), mt(e + "Capture", t);
	}
	function mt(e, t) {
		for (ft[e] = t, e = 0; e < t.length; e++) dt.add(t[e]);
	}
	var ht = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), gt = {}, _t = {};
	function vt(e) {
		return me.call(_t, e) ? !0 : me.call(gt, e) ? !1 : ht.test(e) ? _t[e] = !0 : (gt[e] = !0, !1);
	}
	function yt(e, t, n) {
		if (vt(t)) if (n === null) e.removeAttribute(t);
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
	function bt(e, t, n) {
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
	function xt(e, t, n, r) {
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
	function St(e) {
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
	function Ct(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function wt(e, t, n) {
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
	function Tt(e) {
		if (!e._valueTracker) {
			var t = Ct(e) ? "checked" : "value";
			e._valueTracker = wt(e, t, "" + e[t]);
		}
	}
	function Et(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ct(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Dt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ot = /[\n"\\]/g;
	function kt(e) {
		return e.replace(Ot, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function At(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Mt(e, o, St(n)) : Mt(e, o, St(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + St(s) : e.removeAttribute("name");
	}
	function jt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Tt(e);
				return;
			}
			n = n == null ? "" : "" + St(n), t = t == null ? n : "" + St(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Tt(e);
	}
	function Mt(e, t, n) {
		t === "number" && Dt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Nt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + St(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Pt(e, t, n) {
		if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + St(n);
	}
	function Ft(e, t, n, r) {
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
		n = St(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Tt(e);
	}
	function It(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Lt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Rt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Lt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function zt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Rt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Rt(e, o, t[o]);
	}
	function Bt(e) {
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
	var Vt = /* @__PURE__ */ new Map([
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
	]), Ht = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Ut(e) {
		return Ht.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Wt() {}
	var Gt = null;
	function Kt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var qt = null, Jt = null;
	function Yt(e) {
		var t = st(e);
		if (t && (e = t.stateNode)) {
			var n = e[$e] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (At(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + kt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[$e] || null;
								if (!a) throw Error(i(90));
								At(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Et(r);
					}
					break a;
				case "textarea":
					Pt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Nt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Xt = !1;
	function Zt(e, t, n) {
		if (Xt) return e(t, n);
		Xt = !0;
		try {
			return e(t);
		} finally {
			if (Xt = !1, (qt !== null || Jt !== null) && (vu(), qt && (t = qt, e = Jt, Jt = qt = null, Yt(t), e))) for (t = 0; t < e.length; t++) Yt(e[t]);
		}
	}
	function Qt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[$e] || null;
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
	var $t = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), en = !1;
	if ($t) try {
		var tn = {};
		Object.defineProperty(tn, "passive", { get: function() {
			en = !0;
		} }), window.addEventListener("test", tn, tn), window.removeEventListener("test", tn, tn);
	} catch {
		en = !1;
	}
	var nn = null, rn = null, an = null;
	function on() {
		if (an) return an;
		var e, t = rn, n = t.length, r, i = "value" in nn ? nn.value : nn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return an = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function sn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function J() {
		return !0;
	}
	function cn() {
		return !1;
	}
	function ln(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? J : cn, this.isPropagationStopped = cn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = J);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = J);
			},
			persist: function() {},
			isPersistent: J
		}), t;
	}
	var Y = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, un = ln(Y), dn = h({}, Y, {
		view: 0,
		detail: 0
	}), fn = ln(dn), pn, mn, hn, gn = h({}, dn, {
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
		getModifierState: Dn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== hn && (hn && e.type === "mousemove" ? (pn = e.screenX - hn.screenX, mn = e.screenY - hn.screenY) : mn = pn = 0, hn = e), pn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : mn;
		}
	}), _n = ln(gn), vn = ln(h({}, gn, { dataTransfer: 0 })), yn = ln(h({}, dn, { relatedTarget: 0 })), bn = ln(h({}, Y, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), xn = ln(h({}, Y, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Sn = ln(h({}, Y, { data: 0 })), Cn = {
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
	}, wn = {
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
	}, Tn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function En(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Tn[e]) ? !!t[e] : !1;
	}
	function Dn() {
		return En;
	}
	var On = ln(h({}, dn, {
		key: function(e) {
			if (e.key) {
				var t = Cn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Dn,
		charCode: function(e) {
			return e.type === "keypress" ? sn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), kn = ln(h({}, gn, {
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
	})), An = ln(h({}, dn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Dn
	})), jn = ln(h({}, Y, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Mn = ln(h({}, gn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Nn = ln(h({}, Y, {
		newState: 0,
		oldState: 0
	})), Pn = [
		9,
		13,
		27,
		32
	], Fn = $t && "CompositionEvent" in window, In = null;
	$t && "documentMode" in document && (In = document.documentMode);
	var Ln = $t && "TextEvent" in window && !In, Rn = $t && (!Fn || In && 8 < In && 11 >= In), zn = " ", Bn = !1;
	function Vn(e, t) {
		switch (e) {
			case "keyup": return Pn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Hn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Un = !1;
	function Wn(e, t) {
		switch (e) {
			case "compositionend": return Hn(t);
			case "keypress": return t.which === 32 ? (Bn = !0, zn) : null;
			case "textInput": return e = t.data, e === zn && Bn ? null : e;
			default: return null;
		}
	}
	function Gn(e, t) {
		if (Un) return e === "compositionend" || !Fn && Vn(e, t) ? (e = on(), an = rn = nn = null, Un = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Rn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Kn = {
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
	function qn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Kn[e.type] : t === "textarea";
	}
	function Jn(e, t, n, r) {
		qt ? Jt ? Jt.push(r) : Jt = [r] : qt = r, t = Ed(t, "onChange"), 0 < t.length && (n = new un("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Yn = null, Xn = null;
	function Zn(e) {
		vd(e, 0);
	}
	function Qn(e) {
		if (Et(ct(e))) return e;
	}
	function $n(e, t) {
		if (e === "change") return t;
	}
	var er = !1;
	if ($t) {
		var tr;
		if ($t) {
			var nr = "oninput" in document;
			if (!nr) {
				var rr = document.createElement("div");
				rr.setAttribute("oninput", "return;"), nr = typeof rr.oninput == "function";
			}
			tr = nr;
		} else tr = !1;
		er = tr && (!document.documentMode || 9 < document.documentMode);
	}
	function ir() {
		Yn && (Yn.detachEvent("onpropertychange", ar), Xn = Yn = null);
	}
	function ar(e) {
		if (e.propertyName === "value" && Qn(Xn)) {
			var t = [];
			Jn(t, Xn, e, Kt(e)), Zt(Zn, t);
		}
	}
	function or(e, t, n) {
		e === "focusin" ? (ir(), Yn = t, Xn = n, Yn.attachEvent("onpropertychange", ar)) : e === "focusout" && ir();
	}
	function sr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qn(Xn);
	}
	function cr(e, t) {
		if (e === "click") return Qn(t);
	}
	function lr(e, t) {
		if (e === "input" || e === "change") return Qn(t);
	}
	function ur(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var dr = typeof Object.is == "function" ? Object.is : ur;
	function fr(e, t) {
		if (dr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!me.call(t, i) || !dr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function pr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function mr(e, t) {
		var n = pr(e);
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
			n = pr(n);
		}
	}
	function hr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? hr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function gr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Dt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Dt(e.document);
		}
		return t;
	}
	function _r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var vr = $t && "documentMode" in document && 11 >= document.documentMode, yr = null, br = null, xr = null, Sr = !1;
	function Cr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Sr || yr == null || yr !== Dt(r) || (r = yr, "selectionStart" in r && _r(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), xr && fr(xr, r) || (xr = r, r = Ed(br, "onSelect"), 0 < r.length && (t = new un("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = yr)));
	}
	function wr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Tr = {
		animationend: wr("Animation", "AnimationEnd"),
		animationiteration: wr("Animation", "AnimationIteration"),
		animationstart: wr("Animation", "AnimationStart"),
		transitionrun: wr("Transition", "TransitionRun"),
		transitionstart: wr("Transition", "TransitionStart"),
		transitioncancel: wr("Transition", "TransitionCancel"),
		transitionend: wr("Transition", "TransitionEnd")
	}, Er = {}, Dr = {};
	$t && (Dr = document.createElement("div").style, "AnimationEvent" in window || (delete Tr.animationend.animation, delete Tr.animationiteration.animation, delete Tr.animationstart.animation), "TransitionEvent" in window || delete Tr.transitionend.transition);
	function Or(e) {
		if (Er[e]) return Er[e];
		if (!Tr[e]) return e;
		var t = Tr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Dr) return Er[e] = t[n];
		return e;
	}
	var kr = Or("animationend"), Ar = Or("animationiteration"), jr = Or("animationstart"), Mr = Or("transitionrun"), Nr = Or("transitionstart"), Pr = Or("transitioncancel"), Fr = Or("transitionend"), Ir = /* @__PURE__ */ new Map(), Lr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Lr.push("scrollEnd");
	function Rr(e, t) {
		Ir.set(e, t), pt(t, [e]);
	}
	var zr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Br = [], Vr = 0, Hr = 0;
	function Ur() {
		for (var e = Vr, t = Hr = Vr = 0; t < e;) {
			var n = Br[t];
			Br[t++] = null;
			var r = Br[t];
			Br[t++] = null;
			var i = Br[t];
			Br[t++] = null;
			var a = Br[t];
			if (Br[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && qr(n, i, a);
		}
	}
	function Wr(e, t, n, r) {
		Br[Vr++] = e, Br[Vr++] = t, Br[Vr++] = n, Br[Vr++] = r, Hr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Gr(e, t, n, r) {
		return Wr(e, t, n, r), Jr(e);
	}
	function Kr(e, t) {
		return Wr(e, null, null, t), Jr(e);
	}
	function qr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - je(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Jr(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Yr = {};
	function Xr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Zr(e, t, n, r) {
		return new Xr(e, t, n, r);
	}
	function Qr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function $r(e, t) {
		var n = e.alternate;
		return n === null ? (n = Zr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ei(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ti(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Qr(e) && (s = 1);
		else if (typeof e == "string") s = Wf(e, n, U.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = Zr(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ni(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = Zr(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = Zr(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = Zr(19, n, t, a), e.elementType = E, e.lanes = o, e;
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
		return t = Zr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ni(e, t, n, r) {
		return e = Zr(7, e, r, t), e.lanes = n, e;
	}
	function ri(e, t, n) {
		return e = Zr(6, e, null, t), e.lanes = n, e;
	}
	function ii(e) {
		var t = Zr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ai(e, t, n) {
		return t = Zr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var oi = /* @__PURE__ */ new WeakMap();
	function si(e, t) {
		if (typeof e == "object" && e) {
			var n = oi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: pe(t)
			}, oi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: pe(t)
		};
	}
	var ci = [], li = 0, ui = null, di = 0, fi = [], pi = 0, mi = null, hi = 1, gi = "";
	function _i(e, t) {
		ci[li++] = di, ci[li++] = ui, ui = e, di = t;
	}
	function vi(e, t, n) {
		fi[pi++] = hi, fi[pi++] = gi, fi[pi++] = mi, mi = e;
		var r = hi;
		e = gi;
		var i = 32 - je(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - je(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, hi = 1 << 32 - je(t) + i | n << i | r, gi = a + e;
		} else hi = 1 << a | n << i | r, gi = e;
	}
	function yi(e) {
		e.return !== null && (_i(e, 1), vi(e, 1, 0));
	}
	function bi(e) {
		for (; e === ui;) ui = ci[--li], ci[li] = null, di = ci[--li], ci[li] = null;
		for (; e === mi;) mi = fi[--pi], fi[pi] = null, gi = fi[--pi], fi[pi] = null, hi = fi[--pi], fi[pi] = null;
	}
	function xi(e, t) {
		fi[pi++] = hi, fi[pi++] = gi, fi[pi++] = mi, hi = t.id, gi = t.overflow, mi = e;
	}
	var Si = null, Ci = null, wi = !1, Ti = null, Ei = !1, Di = Error(i(519));
	function Oi(e) {
		throw Pi(si(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Di;
	}
	function ki(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Qe] = e, t[$e] = r, n) {
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
				yd("invalid", t), jt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				yd("invalid", t);
				break;
			case "textarea": yd("invalid", t), Ft(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (yd("beforetoggle", t), yd("toggle", t)), r.onScroll != null && yd("scroll", t), r.onScrollEnd != null && yd("scrollend", t), r.onClick != null && (t.onclick = Wt), t = !0) : t = !1, t || Oi(e, !0);
	}
	function Ai(e) {
		for (Si = e.return; Si;) switch (Si.tag) {
			case 5:
			case 31:
			case 13:
				Ei = !1;
				return;
			case 27:
			case 3:
				Ei = !0;
				return;
			default: Si = Si.return;
		}
	}
	function ji(e) {
		if (e !== Si) return !1;
		if (!wi) return Ai(e), wi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Wd(e.type, e.memoizedProps)), n = !n), n && Ci && Oi(e), Ai(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ci = df(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ci = df(e);
		} else t === 27 ? (t = Ci, Qd(e.type) ? (e = uf, uf = null, Ci = e) : Ci = t) : Ci = Si ? lf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Mi() {
		Ci = Si = null, wi = !1;
	}
	function Ni() {
		var e = Ti;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), Ti = null), e;
	}
	function Pi(e) {
		Ti === null ? Ti = [e] : Ti.push(e);
	}
	var Fi = B(null), Ii = null, Li = null;
	function Ri(e, t, n) {
		H(Fi, t._currentValue), t._currentValue = n;
	}
	function zi(e) {
		e._currentValue = Fi.current, V(Fi);
	}
	function Bi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Vi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Bi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Bi(s, n, e), s = null;
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
	function Hi(e, t, n, r) {
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
					dr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ne.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [$f] : e.push($f));
			}
			a = a.return;
		}
		e !== null && Vi(t, e, n, r), t.flags |= 262144;
	}
	function Ui(e) {
		for (e = e.firstContext; e !== null;) {
			if (!dr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Wi(e) {
		Ii = e, Li = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Gi(e) {
		return qi(Ii, e);
	}
	function Ki(e, t) {
		return Ii === null && Wi(e), qi(e, t);
	}
	function qi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Li === null) {
			if (e === null) throw Error(i(308));
			Li = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Li = Li.next = t;
		return n;
	}
	var Ji = typeof AbortController < "u" ? AbortController : function() {
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
	}, Yi = t.unstable_scheduleCallback, Xi = t.unstable_NormalPriority, Zi = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Qi() {
		return {
			controller: new Ji(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function $i(e) {
		e.refCount--, e.refCount === 0 && Yi(Xi, function() {
			e.controller.abort();
		});
	}
	var ea = null, ta = 0, na = 0, ra = null;
	function ia(e, t) {
		if (ea === null) {
			var n = ea = [];
			ta = 0, na = ud(), ra = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ta++, t.then(aa, aa), t;
	}
	function aa() {
		if (--ta === 0 && ea !== null) {
			ra !== null && (ra.status = "fulfilled");
			var e = ea;
			ea = null, na = 0, ra = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function oa(e, t) {
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
	var sa = I.S;
	I.S = function(e, t) {
		Ql = ye(), typeof t == "object" && t && typeof t.then == "function" && ia(e, t), sa !== null && sa(e, t);
	};
	var ca = B(null);
	function la() {
		var e = ca.current;
		return e === null ? Pl.pooledCache : e;
	}
	function ua(e, t) {
		t === null ? H(ca, ca.current) : H(ca, t.pool);
	}
	function da() {
		var e = la();
		return e === null ? null : {
			parent: Zi._currentValue,
			pool: e
		};
	}
	var fa = Error(i(460)), pa = Error(i(474)), ma = Error(i(542)), ha = { then: function() {} };
	function ga(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function _a(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Wt, Wt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, xa(e), e;
			default:
				if (typeof t.status == "string") t.then(Wt, Wt);
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
					case "rejected": throw e = t.reason, xa(e), e;
				}
				throw ya = t, fa;
		}
	}
	function va(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ya = e, fa) : e;
		}
	}
	var ya = null;
	function ba() {
		if (ya === null) throw Error(i(459));
		var e = ya;
		return ya = null, e;
	}
	function xa(e) {
		if (e === fa || e === ma) throw Error(i(483));
	}
	var Sa = null, Ca = 0;
	function wa(e) {
		var t = Ca;
		return Ca += 1, Sa === null && (Sa = []), _a(Sa, e, t);
	}
	function Ta(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ea(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Da(e) {
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
			return e = $r(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ri(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && va(i) === t.type) ? (t = a(t, n.props), Ta(t, n), t.return = e, t) : (t = ti(n.type, n.key, n.props, null, e.mode, r), Ta(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ai(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ni(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ri("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ti(t.type, t.key, t.props, null, e.mode, n), Ta(n, t), n.return = e, n;
					case v: return t = ai(t, e.mode, n), t.return = e, t;
					case O: return t = va(t), f(e, t, n);
				}
				if (F(t) || M(t)) return t = ni(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, wa(t), n);
				if (t.$$typeof === C) return f(e, Ki(e, t), n);
				Ea(e, t);
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
					case O: return n = va(n), p(e, t, n, r);
				}
				if (F(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, wa(n), r);
				if (n.$$typeof === C) return p(e, t, Ki(e, n), r);
				Ea(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = va(r), m(e, t, n, r, i);
				}
				if (F(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, wa(r), i);
				if (r.$$typeof === C) return m(e, t, n, Ki(t, r), i);
				Ea(t, r);
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
			if (h === s.length) return n(i, d), wi && _i(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return wi && _i(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), wi && _i(i, h), l;
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
			if (v.done) return n(a, h), wi && _i(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return wi && _i(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), wi && _i(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && va(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ta(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = ni(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ti(o.type, o.key, o.props, null, e.mode, c), Ta(c, o), c.return = e, e = c);
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
							c = ai(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = va(o), b(e, r, o, c);
				}
				if (F(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, wa(o), c);
				if (o.$$typeof === C) return b(e, r, Ki(e, o), c);
				Ea(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ri(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ca = 0;
				var i = b(e, t, n, r);
				return Sa = null, i;
			} catch (t) {
				if (t === fa || t === ma) throw t;
				var a = Zr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Oa = Da(!0), ka = Da(!1), Aa = !1;
	function ja(e) {
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
	function Ma(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Na(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Pa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Nl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Jr(e), qr(e, null, n), t;
		}
		return Wr(e, r, t, n), Jr(e);
	}
	function Fa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
		}
	}
	function Ia(e, t) {
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
	var La = !1;
	function Ra() {
		if (La) {
			var e = ra;
			if (e !== null) throw e;
		}
	}
	function za(e, t, n, r) {
		La = !1;
		var i = e.updateQueue;
		Aa = !1;
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
					f !== 0 && f === na && (La = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Aa = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ba(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Va(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ba(n[e], t);
	}
	var Ha = B(null), Ua = B(0);
	function Wa(e, t) {
		e = Hl, H(Ua, e), H(Ha, t), Hl = e | t.baseLanes;
	}
	function Ga() {
		H(Ua, Hl), H(Ha, Ha.current);
	}
	function Ka() {
		Hl = Ua.current, V(Ha), V(Ua);
	}
	var qa = B(null), Ja = null;
	function Ya(e) {
		var t = e.alternate;
		H(X, X.current & 1), H(qa, e), Ja === null && (t === null || Ha.current !== null || t.memoizedState !== null) && (Ja = e);
	}
	function Xa(e) {
		H(X, X.current), H(qa, e), Ja === null && (Ja = e);
	}
	function Za(e) {
		e.tag === 22 ? (H(X, X.current), H(qa, e), Ja === null && (Ja = e)) : Qa(e);
	}
	function Qa() {
		H(X, X.current), H(qa, qa.current);
	}
	function $a(e) {
		V(qa), Ja === e && (Ja = null), V(X);
	}
	var X = B(0);
	function eo(e) {
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
	var to = 0, no = null, ro = null, io = null, ao = !1, oo = !1, so = !1, co = 0, lo = 0, uo = null, fo = 0;
	function po() {
		throw Error(i(321));
	}
	function mo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!dr(e[n], t[n])) return !1;
		return !0;
	}
	function ho(e, t, n, r, i, a) {
		return to = a, no = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, I.H = e === null || e.memoizedState === null ? Ms : Ns, so = !1, a = n(r, i), so = !1, oo && (a = _o(t, n, r, i)), go(e), a;
	}
	function go(e) {
		I.H = js;
		var t = ro !== null && ro.next !== null;
		if (to = 0, io = ro = no = null, ao = !1, lo = 0, uo = null, t) throw Error(i(300));
		e === null || Xs || (e = e.dependencies, e !== null && Ui(e) && (Xs = !0));
	}
	function _o(e, t, n, r) {
		no = e;
		var a = 0;
		do {
			if (oo && (uo = null), lo = 0, oo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, io = ro = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			I.H = Ps, o = t(n, r);
		} while (oo);
		return o;
	}
	function vo() {
		var e = I.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? To(t) : t, e = e.useState()[0], (ro === null ? null : ro.memoizedState) !== e && (no.flags |= 1024), t;
	}
	function yo() {
		var e = co !== 0;
		return co = 0, e;
	}
	function bo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function xo(e) {
		if (ao) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			ao = !1;
		}
		to = 0, io = ro = no = null, oo = !1, lo = co = 0, uo = null;
	}
	function So() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return io === null ? no.memoizedState = io = e : io = io.next = e, io;
	}
	function Co() {
		if (ro === null) {
			var e = no.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = ro.next;
		var t = io === null ? no.memoizedState : io.next;
		if (t !== null) io = t, ro = e;
		else {
			if (e === null) throw no.alternate === null ? Error(i(467)) : Error(i(310));
			ro = e, e = {
				memoizedState: ro.memoizedState,
				baseState: ro.baseState,
				baseQueue: ro.baseQueue,
				queue: ro.queue,
				next: null
			}, io === null ? no.memoizedState = io = e : io = io.next = e;
		}
		return io;
	}
	function wo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function To(e) {
		var t = lo;
		return lo += 1, uo === null && (uo = []), e = _a(uo, e, t), t = no, (io === null ? t.memoizedState : io.next) === null && (t = t.alternate, I.H = t === null || t.memoizedState === null ? Ms : Ns), e;
	}
	function Eo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return To(e);
			if (e.$$typeof === C) return Gi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Do(e) {
		var t = null, n = no.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = no.alternate;
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
		}, n === null && (n = wo(), no.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Oo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function ko(e) {
		return Ao(Co(), ro, e);
	}
	function Ao(e, t, n) {
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
				if (f === u.lane ? (to & f) === f : (Il & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === na && (d = !0);
					else if ((to & p) === p) {
						u = u.next, p === na && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, no.lanes |= p, Ul |= p;
					f = u.action, so && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, no.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !dr(o, e.memoizedState) && (Xs = !0, d && (n = ra, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function jo(e) {
		var t = Co(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			dr(o, t.memoizedState) || (Xs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Mo(e, t, n) {
		var r = no, a = Co(), o = wi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !dr((ro || a).memoizedState, n);
		if (s && (a.memoizedState = n, Xs = !0), a = a.queue, rs(Fo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || io !== null && io.memoizedState.tag & 1) {
			if (r.flags |= 2048, Qo(9, { destroy: void 0 }, Po.bind(null, r, a, n, t), null), Pl === null) throw Error(i(349));
			o || to & 127 || No(r, t, n);
		}
		return n;
	}
	function No(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = no.updateQueue, t === null ? (t = wo(), no.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Po(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Io(t) && Lo(e);
	}
	function Fo(e, t, n) {
		return n(function() {
			Io(t) && Lo(e);
		});
	}
	function Io(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !dr(e, n);
		} catch {
			return !0;
		}
	}
	function Lo(e) {
		var t = Kr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function Ro(e) {
		var t = So();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), so) {
				Ae(!0);
				try {
					n();
				} finally {
					Ae(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Oo,
			lastRenderedState: e
		}, t;
	}
	function zo(e, t, n, r) {
		return e.baseState = n, Ao(e, ro, typeof r == "function" ? r : Oo);
	}
	function Bo(e, t, n, r, a) {
		if (Os(e)) throw Error(i(485));
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
			I.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Vo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Vo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = I.T, o = {};
			I.T = o;
			try {
				var s = n(i, r), c = I.S;
				c !== null && c(o, s), Ho(e, t, s);
			} catch (n) {
				Wo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), I.T = a;
			}
		} else try {
			a = n(i, r), Ho(e, t, a);
		} catch (n) {
			Wo(e, t, n);
		}
	}
	function Ho(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Uo(e, t, n);
		}, function(n) {
			return Wo(e, t, n);
		}) : Uo(e, t, n);
	}
	function Uo(e, t, n) {
		t.status = "fulfilled", t.value = n, Go(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Vo(e, n)));
	}
	function Wo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Go(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Go(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ko(e, t) {
		return t;
	}
	function qo(e, t) {
		if (wi) {
			var n = Pl.formState;
			if (n !== null) {
				a: {
					var r = no;
					if (wi) {
						if (Ci) {
							b: {
								for (var i = Ci, a = Ei; i.nodeType !== 8;) {
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
								Ci = lf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Oi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = So(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ko,
			lastRenderedState: t
		}, n.queue = r, n = Ts.bind(null, no, r), r.dispatch = n, r = Ro(!1), a = Ds.bind(null, no, !1, r.queue), r = So(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Bo.bind(null, no, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Jo(e) {
		return Yo(Co(), ro, e);
	}
	function Yo(e, t, n) {
		if (t = Ao(e, t, Ko)[0], e = ko(Oo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = To(t);
		} catch (e) {
			throw e === fa ? ma : e;
		}
		else r = t;
		t = Co();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (no.flags |= 2048, Qo(9, { destroy: void 0 }, Xo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Xo(e, t) {
		e.action = t;
	}
	function Zo(e) {
		var t = Co(), n = ro;
		if (n !== null) return Yo(t, n, e);
		Co(), t = t.memoizedState, n = Co();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Qo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = no.updateQueue, t === null && (t = wo(), no.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function $o() {
		return Co().memoizedState;
	}
	function es(e, t, n, r) {
		var i = So();
		no.flags |= e, i.memoizedState = Qo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ts(e, t, n, r) {
		var i = Co();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		ro !== null && r !== null && mo(r, ro.memoizedState.deps) ? i.memoizedState = Qo(t, a, n, r) : (no.flags |= e, i.memoizedState = Qo(1 | t, a, n, r));
	}
	function ns(e, t) {
		es(8390656, 8, e, t);
	}
	function rs(e, t) {
		ts(2048, 8, e, t);
	}
	function is(e) {
		no.flags |= 4;
		var t = no.updateQueue;
		if (t === null) t = wo(), no.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function as(e) {
		var t = Co().memoizedState;
		return is({
			ref: t,
			nextImpl: e
		}), function() {
			if (Nl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function os(e, t) {
		return ts(4, 2, e, t);
	}
	function ss(e, t) {
		return ts(4, 4, e, t);
	}
	function cs(e, t) {
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
	function ls(e, t, n) {
		n = n == null ? null : n.concat([e]), ts(4, 4, cs.bind(null, t, e), n);
	}
	function us() {}
	function ds(e, t) {
		var n = Co();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && mo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function fs(e, t) {
		var n = Co();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && mo(t, r[1])) return r[0];
		if (r = e(), so) {
			Ae(!0);
			try {
				e();
			} finally {
				Ae(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ps(e, t, n) {
		return n === void 0 || to & 1073741824 && !(Il & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), no.lanes |= e, Ul |= e, n);
	}
	function ms(e, t, n, r) {
		return dr(n, t) ? n : Ha.current === null ? !(to & 42) || to & 1073741824 && !(Il & 261930) ? (Xs = !0, e.memoizedState = n) : (e = fu(), no.lanes |= e, Ul |= e, t) : (e = ps(e, n, r), dr(e, t) || (Xs = !0), e);
	}
	function hs(e, t, n, r, i) {
		var a = L.p;
		L.p = a !== 0 && 8 > a ? a : 8;
		var o = I.T, s = {};
		I.T = s, Ds(e, !1, t, n);
		try {
			var c = i(), l = I.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Es(e, t, oa(c, r), du(e)) : Es(e, t, r, du(e));
		} catch (n) {
			Es(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			L.p = a, o !== null && s.types !== null && (o.types = s.types), I.T = o;
		}
	}
	function gs() {}
	function _s(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = vs(e).queue;
		hs(e, a, t, R, n === null ? gs : function() {
			return ys(e), n(r);
		});
	}
	function vs(e) {
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
				lastRenderedReducer: Oo,
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
				lastRenderedReducer: Oo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ys(e) {
		var t = vs(e);
		t.next === null && (t = e.alternate.memoizedState), Es(e, t.next.queue, {}, du());
	}
	function bs() {
		return Gi($f);
	}
	function xs() {
		return Co().memoizedState;
	}
	function Ss() {
		return Co().memoizedState;
	}
	function Cs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Na(n);
					var r = Pa(t, e, n);
					r !== null && (pu(r, t, n), Fa(r, t, n)), t = { cache: Qi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ws(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e) ? ks(t, n) : (n = Gr(e, t, n, r), n !== null && (pu(n, e, r), As(n, t, r)));
	}
	function Ts(e, t, n) {
		Es(e, t, n, du());
	}
	function Es(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Os(e)) ks(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, dr(s, o)) return Wr(e, t, i, 0), Pl === null && Ur(), !1;
			} catch {}
			if (n = Gr(e, t, i, r), n !== null) return pu(n, e, r), As(n, t, r), !0;
		}
		return !1;
	}
	function Ds(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e)) {
			if (t) throw Error(i(479));
		} else t = Gr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function Os(e) {
		var t = e.alternate;
		return e === no || t !== null && t === no;
	}
	function ks(e, t) {
		oo = ao = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function As(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
		}
	}
	var js = {
		readContext: Gi,
		use: Eo,
		useCallback: po,
		useContext: po,
		useEffect: po,
		useImperativeHandle: po,
		useLayoutEffect: po,
		useInsertionEffect: po,
		useMemo: po,
		useReducer: po,
		useRef: po,
		useState: po,
		useDebugValue: po,
		useDeferredValue: po,
		useTransition: po,
		useSyncExternalStore: po,
		useId: po,
		useHostTransitionStatus: po,
		useFormState: po,
		useActionState: po,
		useOptimistic: po,
		useMemoCache: po,
		useCacheRefresh: po
	};
	js.useEffectEvent = po;
	var Ms = {
		readContext: Gi,
		use: Eo,
		useCallback: function(e, t) {
			return So().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Gi,
		useEffect: ns,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), es(4194308, 4, cs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return es(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			es(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = So();
			t = t === void 0 ? null : t;
			var r = e();
			if (so) {
				Ae(!0);
				try {
					e();
				} finally {
					Ae(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = So();
			if (n !== void 0) {
				var i = n(t);
				if (so) {
					Ae(!0);
					try {
						n(t);
					} finally {
						Ae(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ws.bind(null, no, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = So();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ro(e);
			var t = e.queue, n = Ts.bind(null, no, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			return ps(So(), e, t);
		},
		useTransition: function() {
			var e = Ro(!1);
			return e = hs.bind(null, no, e.queue, !0, !1), So().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = no, a = So();
			if (wi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Pl === null) throw Error(i(349));
				Il & 127 || No(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ns(Fo.bind(null, r, o, e), [e]), r.flags |= 2048, Qo(9, { destroy: void 0 }, Po.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = So(), t = Pl.identifierPrefix;
			if (wi) {
				var n = gi, r = hi;
				n = (r & ~(1 << 32 - je(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = co++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = fo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: bs,
		useFormState: qo,
		useActionState: qo,
		useOptimistic: function(e) {
			var t = So();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ds.bind(null, no, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Do,
		useCacheRefresh: function() {
			return So().memoizedState = Cs.bind(null, no);
		},
		useEffectEvent: function(e) {
			var t = So(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Nl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ns = {
		readContext: Gi,
		use: Eo,
		useCallback: ds,
		useContext: Gi,
		useEffect: rs,
		useImperativeHandle: ls,
		useInsertionEffect: os,
		useLayoutEffect: ss,
		useMemo: fs,
		useReducer: ko,
		useRef: $o,
		useState: function() {
			return ko(Oo);
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			return ms(Co(), ro.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ko(Oo)[0], t = Co().memoizedState;
			return [typeof e == "boolean" ? e : To(e), t];
		},
		useSyncExternalStore: Mo,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e, t) {
			return zo(Co(), ro, e, t);
		},
		useMemoCache: Do,
		useCacheRefresh: Ss
	};
	Ns.useEffectEvent = as;
	var Ps = {
		readContext: Gi,
		use: Eo,
		useCallback: ds,
		useContext: Gi,
		useEffect: rs,
		useImperativeHandle: ls,
		useInsertionEffect: os,
		useLayoutEffect: ss,
		useMemo: fs,
		useReducer: jo,
		useRef: $o,
		useState: function() {
			return jo(Oo);
		},
		useDebugValue: us,
		useDeferredValue: function(e, t) {
			var n = Co();
			return ro === null ? ps(n, e, t) : ms(n, ro.memoizedState, e, t);
		},
		useTransition: function() {
			var e = jo(Oo)[0], t = Co().memoizedState;
			return [typeof e == "boolean" ? e : To(e), t];
		},
		useSyncExternalStore: Mo,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Zo,
		useActionState: Zo,
		useOptimistic: function(e, t) {
			var n = Co();
			return ro === null ? (n.baseState = e, [e, n.queue.dispatch]) : zo(n, ro, e, t);
		},
		useMemoCache: Do,
		useCacheRefresh: Ss
	};
	Ps.useEffectEvent = as;
	function Fs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Is = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Na(r);
			i.payload = t, n != null && (i.callback = n), t = Pa(e, i, r), t !== null && (pu(t, e, r), Fa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Na(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Pa(e, i, r), t !== null && (pu(t, e, r), Fa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Na(n);
			r.tag = 2, t != null && (r.callback = t), t = Pa(e, r, n), t !== null && (pu(t, e, n), Fa(t, e, n));
		}
	};
	function Ls(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !fr(n, r) || !fr(i, a) : !0;
	}
	function Rs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Is.enqueueReplaceState(t, t.state, null);
	}
	function zs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Bs(e) {
		zr(e);
	}
	function Vs(e) {
		console.error(e);
	}
	function Hs(e) {
		zr(e);
	}
	function Us(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ws(e, t, n) {
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
	function Gs(e, t, n) {
		return n = Na(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Us(e, t);
		}, n;
	}
	function Ks(e) {
		return e = Na(e), e.tag = 3, e;
	}
	function qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ws(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ws(t, n, r), typeof i != "function" && (tu === null ? tu = /* @__PURE__ */ new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Js(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Hi(t, n, a, !0), n = qa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ja === null ? Tu() : n.alternate === null && Q === 0 && (Q = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ha ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (wi) return t = qa.current, t === null ? (r !== Di && (t = Error(i(423), { cause: r }), Pi(si(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = si(r, n), a = Gs(e.stateNode, r, a), Ia(e, a), Q !== 4 && (Q = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Di && (e = Error(i(422), { cause: r }), Pi(si(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = si(o, n), Jl === null ? Jl = [o] : Jl.push(o), Q !== 4 && (Q = 2), t === null) return !0;
		r = si(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Gs(n.stateNode, r, e), Ia(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Ks(a), qs(a, e, n, r), Ia(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ys = Error(i(461)), Xs = !1;
	function Zs(e, t, n, r) {
		t.child = e === null ? ka(t, null, n, r) : Oa(t, e.child, n, r);
	}
	function Qs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Wi(t), r = ho(e, t, n, o, a, i), s = yo(), e !== null && !Xs ? (bo(e, t, i), Sc(e, t, i)) : (wi && s && yi(t), t.flags |= 1, Zs(e, t, r, i), t.child);
	}
	function $s(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Qr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ec(e, t, a, r, i)) : (e = ti(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Cc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? fr : n, n(o, r) && e.ref === t.ref) return Sc(e, t, i);
		}
		return t.flags |= 1, e = $r(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ec(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (fr(a, r) && e.ref === t.ref) if (Xs = !1, t.pendingProps = r = a, Cc(e, i)) e.flags & 131072 && (Xs = !0);
			else return t.lanes = e.lanes, Sc(e, t, i);
		}
		return cc(e, t, n, r, i);
	}
	function tc(e, t, n, r) {
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
				return rc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ua(t, a === null ? null : a.cachePool), a === null ? Ga() : Wa(t, a), Za(t);
			else return r = t.lanes = 536870912, rc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ua(t, null), Ga(), Qa(t)) : (ua(t, a.cachePool), Wa(t, a), Qa(t), t.memoizedState = null);
		return Zs(e, t, i, n), t.child;
	}
	function nc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function rc(e, t, n, r, i) {
		var a = la();
		return a = a === null ? null : {
			parent: Zi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ua(t, null), Ga(), Za(t), e !== null && Hi(e, t, r, !0), t.childLanes = i, null;
	}
	function ic(e, t) {
		return t = _c({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ac(e, t, n) {
		return Oa(t, e.child, null, n), e = ic(t, t.pendingProps), e.flags |= 2, $a(t), t.memoizedState = null, e;
	}
	function oc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (wi) {
				if (r.mode === "hidden") return e = ic(t, r), t.lanes = 536870912, nc(null, e);
				if (Xa(t), (e = Ci) ? (e = af(e, Ei), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: mi === null ? null : {
						id: hi,
						overflow: gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ii(e), n.return = t, t.child = n, Si = t, Ci = null)) : e = null, e === null) throw Oi(t);
				return t.lanes = 536870912, null;
			}
			return ic(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Xa(t), a) if (t.flags & 256) t.flags &= -257, t = ac(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Xs || Hi(e, t, n, !1), a = (n & e.childLanes) !== 0, Xs || a) {
				if (r = Pl, r !== null && (s = Ke(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Kr(e, s), pu(r, e, s), Ys;
				Tu(), t = ac(e, t, n);
			} else e = o.treeContext, Ci = lf(s.nextSibling), Si = t, wi = !0, Ti = null, Ei = !1, e !== null && xi(t, e), t = ic(t, r), t.flags |= 4096;
			return t;
		}
		return e = $r(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function sc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function cc(e, t, n, r, i) {
		return Wi(t), n = ho(e, t, n, r, void 0, i), r = yo(), e !== null && !Xs ? (bo(e, t, i), Sc(e, t, i)) : (wi && r && yi(t), t.flags |= 1, Zs(e, t, n, i), t.child);
	}
	function lc(e, t, n, r, i, a) {
		return Wi(t), t.updateQueue = null, n = _o(t, r, n, i), go(e), r = yo(), e !== null && !Xs ? (bo(e, t, a), Sc(e, t, a)) : (wi && r && yi(t), t.flags |= 1, Zs(e, t, n, a), t.child);
	}
	function uc(e, t, n, r, i) {
		if (Wi(t), t.stateNode === null) {
			var a = Yr, o = n.contextType;
			typeof o == "object" && o && (a = Gi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Is, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ja(t), o = n.contextType, a.context = typeof o == "object" && o ? Gi(o) : Yr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Fs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Is.enqueueReplaceState(a, a.state, null), za(t, r, a, i), Ra(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = zs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Yr, typeof u == "object" && u && (o = Gi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Rs(t, a, r, o), Aa = !1;
			var f = t.memoizedState;
			a.state = f, za(t, r, a, i), Ra(), l = t.memoizedState, s || f !== l || Aa ? (typeof d == "function" && (Fs(t, n, d, r), l = t.memoizedState), (c = Aa || Ls(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ma(e, t), o = t.memoizedProps, u = zs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Yr, typeof l == "object" && l && (c = Gi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Rs(t, a, r, c), Aa = !1, f = t.memoizedState, a.state = f, za(t, r, a, i), Ra();
			var p = t.memoizedState;
			o !== d || f !== p || Aa || e !== null && e.dependencies !== null && Ui(e.dependencies) ? (typeof s == "function" && (Fs(t, n, s, r), p = t.memoizedState), (u = Aa || Ls(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ui(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, sc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Oa(t, e.child, null, i), t.child = Oa(t, null, n, i)) : Zs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Sc(e, t, i), e;
	}
	function dc(e, t, n, r) {
		return Mi(), t.flags |= 256, Zs(e, t, n, r), t.child;
	}
	var fc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function pc(e) {
		return {
			baseLanes: e,
			cachePool: da()
		};
	}
	function mc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function hc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(X.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (wi) {
				if (a ? Ya(t) : Qa(t), (e = Ci) ? (e = af(e, Ei), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: mi === null ? null : {
						id: hi,
						overflow: gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ii(e), n.return = t, t.child = n, Si = t, Ci = null)) : e = null, e === null) throw Oi(t);
				return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Qa(t), a = t.mode, c = _c({
				mode: "hidden",
				children: c
			}, a), r = ni(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(null, r)) : (Ya(t), gc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ya(t), t.flags &= -257, t = vc(e, t, n)) : t.memoizedState === null ? (Qa(t), c = r.fallback, a = t.mode, r = _c({
				mode: "visible",
				children: r.children
			}, a), c = ni(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Oa(t, e.child, null, n), r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, t = nc(null, r)) : (Qa(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ya(t), sf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Pi({
					value: r,
					source: null,
					stack: null
				}), t = vc(e, t, n);
			} else if (Xs || Hi(e, t, n, !1), s = (n & e.childLanes) !== 0, Xs || s) {
				if (s = Pl, s !== null && (r = Ke(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Kr(e, r), pu(s, e, r), Ys;
				of(c) || Tu(), t = vc(e, t, n);
			} else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ci = lf(c.nextSibling), Si = t, wi = !0, Ti = null, Ei = !1, e !== null && xi(t, e), t = gc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Qa(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = $r(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ni(c, a, n, null), c.flags |= 2) : c = $r(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, nc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = pc(n) : (a = c.cachePool, a === null ? a = da() : (l = Zi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(e.child, r)) : (Ya(t), n = e.child, e = n.sibling, n = $r(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function gc(e, t) {
		return t = _c({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function _c(e, t) {
		return e = Zr(22, e, null, t), e.lanes = 0, e;
	}
	function vc(e, t, n) {
		return Oa(t, e.child, null, n), e = gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Bi(e.return, t, n);
	}
	function bc(e, t, n, r, i, a) {
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
	function xc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = X.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, H(X, o), Zs(e, t, r, n), r = wi ? di : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && yc(e, n, t);
			else if (e.tag === 19) yc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && eo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), bc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && eo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				bc(t, !0, n, null, a, r);
				break;
			case "together":
				bc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Sc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Hi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = $r(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = $r(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Cc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Ui(e)));
	}
	function wc(e, t, n) {
		switch (t.tag) {
			case 3:
				re(t, t.stateNode.containerInfo), Ri(t, Zi, e.memoizedState.cache), Mi();
				break;
			case 27:
			case 5:
				ae(t);
				break;
			case 4:
				re(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ri(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Xa(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ya(t), e = Sc(e, t, n), e === null ? null : e.sibling) : hc(e, t, n) : (Ya(t), t.flags |= 128, null);
				Ya(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Hi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return xc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), H(X, X.current), r) break;
				return null;
			case 22: return t.lanes = 0, tc(e, t, n, t.pendingProps);
			case 24: Ri(t, Zi, e.memoizedState.cache);
		}
		return Sc(e, t, n);
	}
	function Tc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Xs = !0;
		else {
			if (!Cc(e, n) && !(t.flags & 128)) return Xs = !1, wc(e, t, n);
			Xs = !!(e.flags & 131072);
		}
		else Xs = !1, wi && t.flags & 1048576 && vi(t, di, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = va(t.elementType), t.type = e, typeof e == "function") Qr(e) ? (r = zs(e, r), t.tag = 1, t = uc(null, t, e, r, n)) : (t.tag = 0, t = cc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Qs(null, t, e, r, n);
								break a;
							}
							if (a === D) {
								t.tag = 14, t = $s(null, t, e, r, n);
								break a;
							}
						}
						throw t = P(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return cc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = zs(r, t.pendingProps), uc(e, t, r, a, n);
			case 3:
				a: {
					if (re(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ma(e, t), za(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ri(t, Zi, r), r !== o.cache && Vi(t, [Zi], n, !0), Ra(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = dc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = si(Error(i(424)), t), Pi(a), t = dc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ci = lf(e.firstChild), Si = t, wi = !0, Ti = null, Ei = !0, n = ka(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Mi(), r === a) {
							t = Sc(e, t, n);
							break a;
						}
						Zs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return sc(e, t), e === null ? (n = Af(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : wi || (n = t.type, e = t.pendingProps, r = Vd(te.current).createElement(n), r[Qe] = t, r[$e] = e, Fd(r, n, e), ut(r), t.stateNode = r) : t.memoizedState = Af(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ae(t), e === null && wi && (r = t.stateNode = pf(t.type, t.pendingProps, te.current), Si = t, Ei = !0, a = Ci, Qd(t.type) ? (uf = a, Ci = lf(r.firstChild)) : Ci = a), Zs(e, t, t.pendingProps.children, n), sc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && wi && ((a = r = Ci) && (r = nf(r, t.type, t.pendingProps, Ei), r === null ? a = !1 : (t.stateNode = r, Si = t, Ci = lf(r.firstChild), Ei = !1, a = !0)), a || Oi(t)), ae(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(a, o) ? r = null : s !== null && Wd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ho(e, t, vo, null, null, n), $f._currentValue = a), sc(e, t), Zs(e, t, r, n), t.child;
			case 6: return e === null && wi && ((e = n = Ci) && (n = rf(n, t.pendingProps, Ei), n === null ? e = !1 : (t.stateNode = n, Si = t, Ci = null, e = !0)), e || Oi(t)), null;
			case 13: return hc(e, t, n);
			case 4: return re(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Oa(t, null, r, n) : Zs(e, t, r, n), t.child;
			case 11: return Qs(e, t, t.type, t.pendingProps, n);
			case 7: return Zs(e, t, t.pendingProps, n), t.child;
			case 8: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ri(t, t.type, r.value), Zs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Wi(t), a = Gi(a), r = r(a), t.flags |= 1, Zs(e, t, r, n), t.child;
			case 14: return $s(e, t, t.type, t.pendingProps, n);
			case 15: return ec(e, t, t.type, t.pendingProps, n);
			case 19: return xc(e, t, n);
			case 31: return oc(e, t, n);
			case 22: return tc(e, t, n, t.pendingProps);
			case 24: return Wi(t), r = Gi(Zi), e === null ? (a = la(), a === null && (a = Pl, o = Qi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, ja(t), Ri(t, Zi, a)) : ((e.lanes & n) !== 0 && (Ma(e, t), za(t, null, null, n), Ra()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ri(t, Zi, r), r !== a.cache && Vi(t, [Zi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ri(t, Zi, r))), Zs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ec(e) {
		e.flags |= 4;
	}
	function Dc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Su()) e.flags |= 8192;
			else throw ya = ha, pa;
		} else e.flags &= -16777217;
	}
	function Oc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Gf(t)) if (Su()) e.flags |= 8192;
		else throw ya = ha, pa;
	}
	function kc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Be(), e.lanes |= t, ql |= t);
	}
	function Ac(e, t) {
		if (!wi) switch (e.tailMode) {
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
	function jc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Mc(e, t, n) {
		var r = t.pendingProps;
		switch (bi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return jc(t), null;
			case 1: return jc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), zi(Zi), ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ji(t) ? Ec(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ni())), jc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ec(t), o === null ? (jc(t), Dc(t, a, null, r, n)) : (jc(t), Oc(t, o))) : o ? o === e.memoizedState ? (jc(t), t.flags &= -16777217) : (Ec(t), jc(t), Oc(t, o)) : (e = e.memoizedProps, e !== r && Ec(t), jc(t), Dc(t, a, e, r, n)), null;
			case 27:
				if (oe(t), n = te.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					e = U.current, ji(t) ? ki(t, e) : (e = pf(a, r, n), t.stateNode = e, Ec(t));
				}
				return jc(t), null;
			case 5:
				if (oe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					if (o = U.current, ji(t)) ki(t, o);
					else {
						var s = Vd(te.current);
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
						o[Qe] = t, o[$e] = r;
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
						r && Ec(t);
					}
				}
				return jc(t), Dc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = te.current, ji(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Si, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Qe] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Oi(t, !0);
					} else e = Vd(e).createTextNode(r), e[Qe] = t, t.stateNode = e;
				}
				return jc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ji(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Qe] = t;
						} else Mi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), e = !1;
					} else n = Ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? ($a(t), t) : ($a(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return jc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ji(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Qe] = t;
						} else Mi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), a = !1;
					} else a = Ni(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? ($a(t), t) : ($a(t), null);
				}
				return $a(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), kc(t, t.updateQueue), jc(t), null);
			case 4: return ie(), e === null && Sd(t.stateNode.containerInfo), jc(t), null;
			case 10: return zi(t.type), jc(t), null;
			case 19:
				if (V(X), r = t.memoizedState, r === null) return jc(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) Ac(r, !1);
				else {
					if (Q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = eo(e), o !== null) {
							for (t.flags |= 128, Ac(r, !1), e = o.updateQueue, t.updateQueue = e, kc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ei(n, e), n = n.sibling;
							return H(X, X.current & 1 | 2), wi && _i(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && ye() > $l && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = eo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, kc(t, e), Ac(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !wi) return jc(t), null;
					} else 2 * ye() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (jc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ye(), e.sibling = null, n = X.current, H(X, a ? n & 1 | 2 : n & 1), wi && _i(t, r.treeForkCount), e);
			case 22:
			case 23: return $a(t), Ka(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (jc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jc(t), n = t.updateQueue, n !== null && kc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && V(ca), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), zi(Zi), jc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e, t) {
		switch (bi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return zi(Zi), ie(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return oe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if ($a(t), t.alternate === null) throw Error(i(340));
					Mi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if ($a(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Mi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return V(X), null;
			case 4: return ie(), null;
			case 10: return zi(t.type), null;
			case 22:
			case 23: return $a(t), Ka(), e !== null && V(ca), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return zi(Zi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Pc(e, t) {
		switch (bi(t), t.tag) {
			case 3:
				zi(Zi), ie();
				break;
			case 26:
			case 27:
			case 5:
				oe(t);
				break;
			case 4:
				ie();
				break;
			case 31:
				t.memoizedState !== null && $a(t);
				break;
			case 13:
				$a(t);
				break;
			case 19:
				V(X);
				break;
			case 10:
				zi(t.type);
				break;
			case 22:
			case 23:
				$a(t), Ka(), e !== null && V(ca);
				break;
			case 24: zi(Zi);
		}
	}
	function Fc(e, t) {
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
	function Ic(e, t, n) {
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
	function Lc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Va(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function Rc(e, t, n) {
		n.props = zs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function zc(e, t) {
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
	function Bc(e, t) {
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
	function Vc(e) {
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
	function Hc(e, t, n) {
		try {
			var r = e.stateNode;
			Id(r, e.type, n, t), r[$e] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Uc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qd(e.type) || e.tag === 4;
	}
	function Wc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Uc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Qd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wt));
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Kc(e, t, n), e = e.sibling; e !== null;) Kc(e, t, n), e = e.sibling;
	}
	function qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[Qe] = e, t[$e] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var Jc = !1, Yc = !1, Xc = !1, Zc = typeof WeakSet == "function" ? WeakSet : Set, Qc = null;
	function $c(e, t) {
		if (e = e.containerInfo, zd = cp, e = gr(e), _r(e)) {
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
		}, cp = !1, Qc = t; Qc !== null;) if (t = Qc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Qc = e;
		else for (; Qc !== null;) {
			switch (t = Qc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = zs(n.type, a);
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
				e.return = t.return, Qc = e;
				break;
			}
			Qc = t.return;
		}
	}
	function el(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				hl(e, n), r & 4 && Fc(5, n);
				break;
			case 1:
				if (hl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = zs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Lc(n), r & 512 && zc(n, n.return);
				break;
			case 3:
				if (hl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Va(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && qc(n);
			case 26:
			case 5:
				hl(e, n), t === null && r & 4 && Vc(n), r & 512 && zc(n, n.return);
				break;
			case 12:
				hl(e, n);
				break;
			case 31:
				hl(e, n), r & 4 && ol(e, n);
				break;
			case 13:
				hl(e, n), r & 4 && sl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), cf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Jc, !r) {
					t = t !== null && t.memoizedState !== null || Yc, i = Jc;
					var a = Yc;
					Jc = r, (Yc = t) && !a ? _l(e, n, !!(n.subtreeFlags & 8772)) : hl(e, n), Jc = i, Yc = a;
				}
				break;
			case 30: break;
			default: hl(e, n);
		}
	}
	function tl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, tl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && q(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var nl = null, rl = !1;
	function il(e, t, n) {
		for (n = n.child; n !== null;) al(e, t, n), n = n.sibling;
	}
	function al(e, t, n) {
		if (ke && typeof ke.onCommitFiberUnmount == "function") try {
			ke.onCommitFiberUnmount(Oe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Yc || Bc(n, t), il(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Yc || Bc(n, t);
				var r = nl, i = rl;
				Qd(n.type) && (nl = n.stateNode, rl = !1), il(e, t, n), mf(n.stateNode), nl = r, rl = i;
				break;
			case 5: Yc || Bc(n, t);
			case 6:
				if (r = nl, i = rl, nl = null, il(e, t, n), nl = r, rl = i, nl !== null) if (rl) try {
					(nl.nodeType === 9 ? nl.body : nl.nodeName === "HTML" ? nl.ownerDocument.body : nl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					nl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				nl !== null && (rl ? (e = nl, $d(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : $d(nl, n.stateNode));
				break;
			case 4:
				r = nl, i = rl, nl = n.stateNode.containerInfo, rl = !0, il(e, t, n), nl = r, rl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Ic(2, n, t), Yc || Ic(4, n, t), il(e, t, n);
				break;
			case 1:
				Yc || (Bc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Rc(n, t, r)), il(e, t, n);
				break;
			case 21:
				il(e, t, n);
				break;
			case 22:
				Yc = (r = Yc) || n.memoizedState !== null, il(e, t, n), Yc = r;
				break;
			default: il(e, t, n);
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function sl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function cl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Zc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Zc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ll(e, t) {
		var n = cl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ul(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Qd(c.type)) {
							nl = c.stateNode, rl = !1;
							break a;
						}
						break;
					case 5:
						nl = c.stateNode, rl = !1;
						break a;
					case 3:
					case 4:
						nl = c.stateNode.containerInfo, rl = !0;
						break a;
				}
				c = c.return;
			}
			if (nl === null) throw Error(i(160));
			al(o, s, a), nl = null, rl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) fl(t, e), t = t.sibling;
	}
	var dl = null;
	function fl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ul(t, e), pl(e), r & 4 && (Ic(3, e, e.return), Fc(3, e), Ic(5, e, e.return));
				break;
			case 1:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 64 && Jc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = dl;
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[at] || o[Qe] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Fd(o, r, n), o[Qe] = e, ut(o), r = o;
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
							o[Qe] = e, ut(o), r = o;
						}
						e.stateNode = r;
					} else Uf(a, e.type, e.stateNode);
					else e.stateNode = Lf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Hc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Uf(a, e.type, e.stateNode) : Lf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), n !== null && r & 4 && Hc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						It(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Hc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Xc = !0);
				break;
			case 6:
				if (ul(t, e), pl(e), r & 4) {
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
				if (Vf = null, a = dl, dl = _f(t.containerInfo), ul(t, e), dl = a, pl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Xc && (Xc = !1, ml(e));
				break;
			case 4:
				r = dl, dl = _f(e.stateNode.containerInfo), ul(t, e), pl(e), dl = r;
				break;
			case 12:
				ul(t, e), pl(e);
				break;
			case 31:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 13:
				ul(t, e), pl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = ye()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Jc, d = Yc;
				if (Jc = u || a, Yc = d || l, ul(t, e), Yc = d, Jc = u, pl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Jc || Yc || gl(e)), n = null, t = e;;) {
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ll(e, n))));
				break;
			case 19:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ul(t, e), pl(e);
		}
	}
	function pl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Uc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Kc(e, Wc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (It(o, ""), n.flags &= -33), Kc(e, Wc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Gc(e, Wc(e), s);
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
	function ml(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			ml(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function hl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) el(e, t.alternate, t), t = t.sibling;
	}
	function gl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ic(4, t, t.return), gl(t);
					break;
				case 1:
					Bc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Rc(t, t.return, n), gl(t);
					break;
				case 27: mf(t.stateNode);
				case 26:
				case 5:
					Bc(t, t.return), gl(t);
					break;
				case 22:
					t.memoizedState === null && gl(t);
					break;
				case 30:
					gl(t);
					break;
				default: gl(t);
			}
			e = e.sibling;
		}
	}
	function _l(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					_l(i, a, n), Fc(4, a);
					break;
				case 1:
					if (_l(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ba(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Lc(a), zc(a, a.return);
					break;
				case 27: qc(a);
				case 26:
				case 5:
					_l(i, a, n), n && r === null && o & 4 && Vc(a), zc(a, a.return);
					break;
				case 12:
					_l(i, a, n);
					break;
				case 31:
					_l(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 13:
					_l(i, a, n), n && o & 4 && sl(i, a);
					break;
				case 22:
					a.memoizedState === null && _l(i, a, n), zc(a, a.return);
					break;
				case 30: break;
				default: _l(i, a, n);
			}
			t = t.sibling;
		}
	}
	function vl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && $i(n));
	}
	function yl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e));
	}
	function bl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) xl(e, t, n, r), t = t.sibling;
	}
	function xl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, t, n, r), i & 2048 && Fc(9, t);
				break;
			case 1:
				bl(e, t, n, r);
				break;
			case 3:
				bl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e)));
				break;
			case 12:
				if (i & 2048) {
					bl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else bl(e, t, n, r);
				break;
			case 31:
				bl(e, t, n, r);
				break;
			case 13:
				bl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? bl(e, t, n, r) : (a._visibility |= 2, Sl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? bl(e, t, n, r) : Cl(e, t), i & 2048 && vl(o, t);
				break;
			case 24:
				bl(e, t, n, r), i & 2048 && yl(t.alternate, t);
				break;
			default: bl(e, t, n, r);
		}
	}
	function Sl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Sl(a, o, s, c, i), Fc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Sl(a, o, s, c, i)) : u._visibility & 2 ? Sl(a, o, s, c, i) : Cl(a, o), i && l & 2048 && vl(o.alternate, o);
					break;
				case 24:
					Sl(a, o, s, c, i), i && l & 2048 && yl(o.alternate, o);
					break;
				default: Sl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Cl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				case 24:
					Cl(n, r), i & 2048 && yl(r.alternate, r);
					break;
				default: Cl(n, r);
			}
			t = t.sibling;
		}
	}
	var wl = 8192;
	function Tl(e, t, n) {
		if (e.subtreeFlags & wl) for (e = e.child; e !== null;) El(e, t, n), e = e.sibling;
	}
	function El(e, t, n) {
		switch (e.tag) {
			case 26:
				Tl(e, t, n), e.flags & wl && e.memoizedState !== null && Kf(n, dl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Tl(e, t, n);
				break;
			case 3:
			case 4:
				var r = dl;
				dl = _f(e.stateNode.containerInfo), Tl(e, t, n), dl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = wl, wl = 16777216, Tl(e, t, n), wl = r) : Tl(e, t, n));
				break;
			default: Tl(e, t, n);
		}
	}
	function Dl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ol(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, Al(r, e);
			}
			Dl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Z(e), e = e.sibling;
	}
	function Z(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ol(e), e.flags & 2048 && Ic(9, e, e.return);
				break;
			case 3:
				Ol(e);
				break;
			case 12:
				Ol(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, kl(e)) : Ol(e);
				break;
			default: Ol(e);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, Al(r, e);
			}
			Dl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, t, t.return), kl(t);
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
		for (; Qc !== null;) {
			var n = Qc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: $i(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Qc = r;
			else a: for (n = e; Qc !== null;) {
				r = Qc;
				var i = r.sibling, a = r.return;
				if (tl(r), r === n) {
					Qc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Qc = i;
					break a;
				}
				Qc = a;
			}
		}
	}
	var jl = {
		getCacheForType: function(e) {
			var t = Gi(Zi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Gi(Zi).controller.signal;
		}
	}, Ml = typeof WeakMap == "function" ? WeakMap : Map, Nl = 0, Pl = null, Fl = null, Il = 0, Ll = 0, Rl = null, zl = !1, Bl = !1, Vl = !1, Hl = 0, Q = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return Nl & 2 && Il !== 0 ? Il & -Il : I.T === null ? Ye() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Il & 536870912) || wi) {
			var e = Fe;
			Fe <<= 1, !(Fe & 3932160) && (Fe = 262144), Kl = e;
		} else Kl = 536870912;
		return e = qa.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Pl && (Ll === 2 || Ll === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Il, Kl, !1)), He(e, n), (!(Nl & 2) || e !== Pl) && (e === Pl && (!(Nl & 2) && (Wl |= n), Q === 4 && _u(e, Il, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (Nl & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ze(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				Bl && !r && _u(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !gu(n)) {
				a = Eu(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Jl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (bu(c, s).flags |= 256), s = Eu(c, s, !1), s !== 2) {
							if (Vl && !l) {
								c.errorRecoveryDisabledLanes |= o, Wl |= o, a = 4;
								break a;
							}
							o = Yl, Yl = a, o !== null && (Yl === null ? Yl = o : Yl.push.apply(Yl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				bu(e, 0), _u(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						_u(r, t, Kl, !zl);
						break a;
					case 2:
						Yl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = Zl + 300 - ye(), 10 < a)) {
					if (_u(r, t, Kl, !zl), Re(r, 0, !0) !== 0) break a;
					au = t, r.timeoutHandle = qd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, zl, o, "Throttled", -0, 0), a);
					break a;
				}
				hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, zl, o, null, -0, 0);
			}
			break;
		} while (1);
		nd(e);
	}
	function hu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Wt
			}, El(t, a, d);
			var m = (a & 62914560) === a ? Zl - ye() : (a & 4194048) === a ? Ql - ye() : 0;
			if (m = Jf(d, m), m !== null) {
				au = a, e.cancelPendingCommit = m(Fu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), _u(e, a, o, !l);
				return;
			}
		}
		Fu(e, t, a, n, r, i, o, s, c);
	}
	function gu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!dr(a(), i)) return !1;
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
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - je(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && We(e, n, t);
	}
	function vu() {
		return Nl & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Fl !== null) {
			if (Ll === 0) var e = Fl.return;
			else e = Fl, Li = Ii = null, xo(e), Sa = null, Ca = 0, e = Fl;
			for (; e !== null;) Pc(e.alternate, e), e = e.return;
			Fl = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Pl = e, Fl = n = $r(e.current, null), Il = t, Ll = 0, Rl = null, zl = !1, Bl = ze(e, t), Vl = !1, ql = Kl = Gl = Wl = Ul = Q = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - je(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Hl = t, Ur(), n;
	}
	function xu(e, t) {
		no = null, I.H = js, t === fa || t === ma ? (t = ba(), Ll = 3) : t === pa ? (t = ba(), Ll = 4) : Ll = t === Ys ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Rl = t, Fl === null && (Q = 1, Us(e, si(t, e.current)));
	}
	function Su() {
		var e = qa.current;
		return e === null ? !0 : (Il & 4194048) === Il ? Ja === null : (Il & 62914560) === Il || Il & 536870912 ? e === Ja : !1;
	}
	function Cu() {
		var e = I.H;
		return I.H = js, e === null ? js : e;
	}
	function wu() {
		var e = I.A;
		return I.A = jl, e;
	}
	function Tu() {
		Q = 4, zl || (Il & 4194048) !== Il && qa.current !== null || (Bl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Pl === null || _u(Pl, Il, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = Nl;
		Nl |= 2;
		var i = Cu(), a = wu();
		(Pl !== e || Il !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Q;
		a: do
			try {
				if (Ll !== 0 && Fl !== null) {
					var s = Fl, c = Rl;
					switch (Ll) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							qa.current === null && (t = !0);
							var l = Ll;
							if (Ll = 0, Rl = null, Mu(e, s, c, l), n && Bl) {
								o = 0;
								break a;
							}
							break;
						default: l = Ll, Ll = 0, Rl = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Q;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Li = Ii = null, Nl = r, I.H = i, I.A = a, Fl === null && (Pl = null, Il = 0, Ur()), o;
	}
	function Du() {
		for (; Fl !== null;) Au(Fl);
	}
	function Ou(e, t) {
		var n = Nl;
		Nl |= 2;
		var r = Cu(), a = wu();
		Pl !== e || Il !== t ? (eu = null, $l = ye() + 500, bu(e, t)) : Bl = ze(e, t);
		a: do
			try {
				if (Ll !== 0 && Fl !== null) {
					t = Fl;
					var o = Rl;
					b: switch (Ll) {
						case 1:
							Ll = 0, Rl = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ga(o)) {
								Ll = 0, Rl = null, ju(t);
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
							ga(o) ? (Ll = 0, Rl = null, ju(t)) : (Ll = 0, Rl = null, Mu(e, t, o, 7));
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
											u === null ? Fl = null : (Fl = u, Nu(u));
										}
										break b;
									}
							}
							Ll = 0, Rl = null, Mu(e, t, o, 5);
							break;
						case 6:
							Ll = 0, Rl = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Q = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ku();
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return Li = Ii = null, I.H = r, I.A = a, Nl = n, Fl === null ? (Pl = null, Il = 0, Ur(), Q) : 0;
	}
	function ku() {
		for (; Fl !== null && !_e();) Au(Fl);
	}
	function Au(e) {
		var t = Tc(e.alternate, e, Hl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Fl = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = lc(n, t, t.pendingProps, t.type, void 0, Il);
				break;
			case 11:
				t = lc(n, t, t.pendingProps, t.type.render, t.ref, Il);
				break;
			case 5: xo(t);
			default: Pc(n, t), t = Fl = ei(t, Hl), t = Tc(n, t, Hl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Fl = t;
	}
	function Mu(e, t, n, r) {
		Li = Ii = null, xo(t), Sa = null, Ca = 0;
		var i = t.return;
		try {
			if (Js(e, i, t, n, Il)) {
				Q = 1, Us(e, si(n, e.current)), Fl = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Fl = i, t;
			Q = 1, Us(e, si(n, e.current)), Fl = null;
			return;
		}
		t.flags & 32768 ? (wi || r === 1 ? e = !0 : Bl || Il & 536870912 ? e = !1 : (zl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = qa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, zl);
				return;
			}
			e = t.return;
			var n = Mc(t.alternate, t, Hl);
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
		Q === 0 && (Q = 5);
	}
	function Pu(e, t) {
		do {
			var n = Nc(e.alternate, e);
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
		Q = 6, Fl = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (Nl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Hr, Ue(e, n, o, s, c, l), e === Pl && (Fl = Pl = null, Il = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(Ce, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = I.T, I.T = null, a = L.p, L.p = 2, s = Nl, Nl |= 4;
				try {
					$c(e, t, n);
				} finally {
					Nl = s, L.p = a, I.T = r;
				}
			}
			nu = 1, Iu(), Lu(), Ru();
		}
	}
	function Iu() {
		if (nu === 1) {
			nu = 0;
			var e = ru, t = iu, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					fl(t, e);
					var a = Bd, o = gr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && hr(s.ownerDocument.documentElement, s)) {
						if (c !== null && _r(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = mr(s, h), v = mr(s, g);
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
			e.current = t, nu = 2;
		}
	}
	function Lu() {
		if (nu === 2) {
			nu = 0;
			var e = ru, t = iu, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					el(e, t.alternate, t);
				} finally {
					Nl = i, L.p = r, I.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, ve();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), Je(n), t = t.stateNode, ke && typeof ke.onCommitFiberRoot == "function") try {
				ke.onCommitFiberRoot(Oe, t, void 0, (t.current.flags & 128) == 128);
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
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, $i(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = Je(au), r = I.T, a = L.p;
		try {
			L.p = 32 > n ? 32 : n, I.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, Nl & 6) throw Error(i(331));
			var c = Nl;
			if (Nl |= 4, Z(o.current), xl(o, o.current, s, n), Nl = c, rd(0, !1), ke && typeof ke.onPostCommitFiberRoot == "function") try {
				ke.onPostCommitFiberRoot(Oe, o);
			} catch {}
			return !0;
		} finally {
			L.p = a, I.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = si(n, t), t = Gs(e.stateNode, t, 2), e = Pa(e, t, 2), e !== null && (He(e, 2), nd(e));
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
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (tu === null || !tu.has(r))) {
					e = si(n, e), n = Ks(2), r = Pa(t, n, 2), r !== null && (qs(n, r, t, e), He(r, 2), nd(r));
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
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pl === e && (Il & n) === n && (Q === 4 || Q === 3 && (Il & 62914560) === Il && 300 > ye() - Zl ? !(Nl & 2) && bu(e, 0) : Gl |= n, ql === Il && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = Be()), e = Kr(e, t), e !== null && (He(e, t), nd(e));
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
		return he(e, t);
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
							a = (1 << 31 - je(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Il, a = Re(r, r === Pl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ze(r, a) || (n = !0, cd(r, a));
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
		for (var t = ye(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - je(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = K(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Pl, n = Il, n = Re(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Ll === 2 || Ll === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ge(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ze(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ge(r), Je(n)) {
				case 2:
				case 8:
					n = Se;
					break;
				case 32:
					n = Ce;
					break;
				case 268435456:
					n = Te;
					break;
				default: n = Ce;
			}
			return r = sd.bind(null, e), n = he(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ge(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Il;
		return r = Re(e, e === Pl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, ye()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Xd(function() {
			Nl & 6 ? he(xe, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = na;
			e === 0 && (e = Pe, Pe <<= 1, !(Pe & 261888) && (Pe = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ut("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[$e] || null).action), o = r.submitter;
			o && (t = (t = o[$e] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new un("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								_s(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), _s(n, {
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
	for (var md = 0; md < Lr.length; md++) {
		var hd = Lr[md];
		Rr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Rr(kr, "onAnimationEnd"), Rr(Ar, "onAnimationIteration"), Rr(jr, "onAnimationStart"), Rr("dblclick", "onDoubleClick"), Rr("focusin", "onFocus"), Rr("focusout", "onBlur"), Rr(Mr, "onTransitionRun"), Rr(Nr, "onTransitionStart"), Rr(Pr, "onTransitionCancel"), Rr(Fr, "onTransitionEnd"), mt("onMouseEnter", ["mouseout", "mouseover"]), mt("onMouseLeave", ["mouseout", "mouseover"]), mt("onPointerEnter", ["pointerout", "pointerover"]), mt("onPointerLeave", ["pointerout", "pointerover"]), pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
						zr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						zr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function yd(e, t) {
		var n = t[tt];
		n === void 0 && (n = t[tt] = /* @__PURE__ */ new Set());
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
			e[xd] = !0, dt.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = $;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !en || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = ot(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Zt(function() {
			var r = a, i = Kt(n), s = [];
			a: {
				var c = Ir.get(e);
				if (c !== void 0) {
					var l = un, u = e;
					switch (e) {
						case "keypress": if (sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = On;
							break;
						case "focusin":
							u = "focus", l = yn;
							break;
						case "focusout":
							u = "blur", l = yn;
							break;
						case "beforeblur":
						case "afterblur":
							l = yn;
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
							l = _n;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = vn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = An;
							break;
						case kr:
						case Ar:
						case jr:
							l = bn;
							break;
						case Fr:
							l = jn;
							break;
						case "scroll":
						case "scrollend":
							l = fn;
							break;
						case "wheel":
							l = Mn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = xn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = kn;
							break;
						case "toggle":
						case "beforetoggle": l = Nn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Qt(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Gt && (u = n.relatedTarget || n.fromElement) && (ot(u) || u[et])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ot(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = _n, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ct(l), h = u == null ? c : ct(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ot(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? ct(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = $n;
					else if (qn(c)) if (er) v = lr;
					else {
						v = sr;
						var y = or;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Bt(r.elementType) && (v = $n) : v = cr;
					if (v &&= v(e, r)) {
						Jn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Mt(c, "number", c.value);
				}
				switch (y = r ? ct(r) : window, e) {
					case "focusin":
						(qn(y) || y.contentEditable === "true") && (yr = y, br = r, xr = null);
						break;
					case "focusout":
						xr = br = yr = null;
						break;
					case "mousedown":
						Sr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Sr = !1, Cr(s, n, i);
						break;
					case "selectionchange": if (vr) break;
					case "keydown":
					case "keyup": Cr(s, n, i);
				}
				var b;
				if (Fn) b: {
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
				else Un ? Vn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Rn && n.locale !== "ko" && (Un || x !== "onCompositionStart" ? x === "onCompositionEnd" && Un && (b = on()) : (nn = i, rn = "value" in nn ? nn.value : nn.textContent, Un = !0)), y = Ed(r, x), 0 < y.length && (x = new Sn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Hn(n), b !== null && (x.data = b)))), (b = Ln ? Wn(e, n) : Gn(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Sn("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Qt(e, n), i != null && r.unshift(Td(e, i, a)), i = Qt(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Qt(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = Qt(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || It(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && It(e, "" + r);
				break;
			case "className":
				bt(e, "class", r);
				break;
			case "tabIndex":
				bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				bt(e, n, r);
				break;
			case "style":
				zt(e, r, o);
				break;
			case "data": if (t !== "object") {
				bt(e, "data", r);
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
				r = Ut("" + r), e.setAttribute(n, r);
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
				r = Ut("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Wt);
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
				n = Ut("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				yd("beforetoggle", e), yd("toggle", e), yt(e, "popover", r);
				break;
			case "xlinkActuate":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				yt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Vt.get(n) || n, yt(e, n, r));
		}
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				zt(e, r, o);
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
				typeof r == "string" ? It(e, r) : (typeof r == "number" || typeof r == "bigint") && It(e, "" + r);
				break;
			case "onScroll":
				r != null && yd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && yd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Wt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ft.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[$e] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : yt(e, n, r);
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
				jt(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Nt(e, !!r, n, !0) : Nt(e, !!r, t, !1);
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
				Ft(e, r, a, o);
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
			default: if (Bt(t)) {
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
				At(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Nt(e, !!n, n ? [] : "", !1) : Nt(e, !!n, t, !0)) : Nt(e, !!n, p, !1);
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
				Pt(e, p, m);
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
			default: if (Bt(t)) {
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
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") mf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, mf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[at] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && mf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
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
					tf(n), q(n);
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
			else if (!e[at]) switch (t) {
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
		q(e);
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
		var e = vf.f(), t = vu();
		return e || t;
	}
	function bf(e) {
		var t = st(e);
		t !== null && t.tag === 5 && t.type === "form" ? ys(t) : vf.r(e);
	}
	var xf = typeof document > "u" ? null : document;
	function Sf(e, t, n) {
		var r = xf;
		if (r && typeof t == "string" && t) {
			var i = kt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), gf.has(i) || (gf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), ut(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + kt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + kt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + kt(n.imageSizes) + "\"]")) : i += "[href=\"" + kt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = jf(e);
					break;
				case "script": a = Ff(e);
			}
			hf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), hf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Mf(a)) || t === "script" && r.querySelector(If(a)) || (t = r.createElement("link"), Fd(t, "link", e), ut(t), r.head.appendChild(t)));
		}
	}
	function Ef(e, t) {
		vf.m(e, t);
		var n = xf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + kt(r) + "\"][href=\"" + kt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Ff(e);
			}
			if (!hf.has(a) && (e = h({
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
				r = n.createElement("link"), Fd(r, "link", e), ut(r), n.head.appendChild(r);
			}
		}
	}
	function Df(e, t, n) {
		vf.S(e, t, n);
		var r = xf;
		if (r && e) {
			var i = lt(r).hoistableStyles, a = jf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Mf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = hf.get(a)) && zf(e, n);
					var c = o = r.createElement("link");
					ut(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = lt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), ut(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = lt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), ut(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Af(e, t, n, r) {
		var a = (a = te.current) ? _f(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = jf(n.href), n = lt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = lt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ff(n), n = lt(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + kt(e) + "\"";
	}
	function Mf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Nf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Pf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), ut(t), e.head.appendChild(t));
	}
	function Ff(e) {
		return "[src=\"" + kt(e) + "\"]";
	}
	function If(e) {
		return "script[async]" + e;
	}
	function Lf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + kt(n.href) + "\"]");
				if (r) return t.instance = r, ut(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ut(r), Fd(r, "style", a), Rf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = jf(n.href);
				var o = e.querySelector(Mf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ut(o), o;
				r = Nf(n), (a = hf.get(a)) && zf(r, a), o = (e.ownerDocument || e).createElement("link"), ut(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Rf(o, n.precedence, e), t.instance = o;
			case "script": return o = Ff(n.src), (a = e.querySelector(If(o))) ? (t.instance = a, ut(a), a) : (r = n, (a = hf.get(o)) && (r = h({}, n), Bf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ut(a), Fd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[at] || a[Qe] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Yf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ut(a);
					return;
				}
				a = t.ownerDocument || t, r = Nf(r), (i = hf.get(i)) && zf(r, i), a = a.createElement("link"), ut(a);
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
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ve(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ve(0), this.hiddenUpdates = Ve(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function tp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ep(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Zr(3, null, null, t), e.current = a, a.stateNode = e, t = Qi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, ja(a), e;
	}
	function np(e) {
		return e ? (e = Yr, e) : Yr;
	}
	function rp(e, t, n, r, i, a) {
		i = np(i), r.context === null ? r.context = i : r.pendingContext = i, r = Na(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Pa(e, r, t), n !== null && (pu(n, e, t), Fa(n, e, t));
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
			var t = Kr(e, 67108864);
			t !== null && pu(t, e, 67108864), ap(e, 67108864);
		}
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = qe(t);
			var n = Kr(e, t);
			n !== null && pu(n, e, t), ap(e, t);
		}
	}
	var cp = !0;
	function $(e, t, n, r) {
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
		if (cp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = st(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Le(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - je(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(Nl & 6) && ($l = ye() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Kr(a, 2), s !== null && pu(s, a, 2), vu(), ap(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Kt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ot(e), e !== null) {
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
			case "message": switch (be()) {
				case xe: return 2;
				case Se: return 8;
				case Ce:
				case we: return 32;
				case Te: return 268435456;
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
		}, t !== null && (t = st(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = ot(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Xe(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Xe(e.priority, function() {
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
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Gt = r, n.target.dispatchEvent(r), Gt = null;
			} else return t = st(n), t !== null && op(t), e.blockedOn = n, !1;
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
				var a = st(n);
				a !== null && (e.splice(t, 3), t -= 3, _s(a, {
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
			var i = n[r], a = n[r + 1], o = i[$e] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[$e] || null) s = o.formAction;
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
		rp(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			rp(e.current, 2, null, e, null, null), vu(), t[et] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Ye();
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
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
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
			Oe = zp.inject(Rp), ke = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Bs, s = Vs, c = Hs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tp(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[et] = t.current, Sd(e), new Fp(t);
	};
})), g = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})))();
function _(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = _(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function v() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = _(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var y = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, b = v, x = (e, t) => (n) => {
	if (t?.variants == null) return b(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = y(t) || y(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return b(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, S = /* @__PURE__ */ c(f(), 1), C = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, w = (e, t) => ({
	classGroupId: e,
	validator: t
}), T = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), E = "-", D = [], O = "arbitrary..", k = (e) => {
	let t = M(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return j(e);
			let n = e.split(E);
			return A(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? C(i, t) : t : i || D;
			}
			return n[e] || D;
		}
	};
}, A = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = A(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(E) : e.slice(t).join(E), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, j = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? O + r : void 0;
})(), M = (e) => {
	let { theme: t, classGroups: n } = e;
	return N(n, t);
}, N = (e, t) => {
	let n = T();
	for (let r in e) {
		let i = e[r];
		P(i, n, r, t);
	}
	return n;
}, P = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		F(i, t, n, r);
	}
}, F = (e, t, n, r) => {
	if (typeof e == "string") {
		I(e, t, n);
		return;
	}
	if (typeof e == "function") {
		L(e, t, n, r);
		return;
	}
	R(e, t, n, r);
}, I = (e, t, n) => {
	let r = e === "" ? t : z(t, e);
	r.classGroupId = n;
}, L = (e, t, n, r) => {
	if (ee(e)) {
		P(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(w(n, e));
}, R = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		P(o, z(t, a), n, r);
	}
}, z = (e, t) => {
	let n = e, r = t.split(E), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = T(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, ee = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, B = (e) => {
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
}, V = "!", H = ":", U = [], W = (e, t, n, r, i) => ({
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
				if (o === H) {
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
		s.endsWith(V) ? (c = s.slice(0, -1), l = !0) : s.startsWith(V) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return W(t, l, c, u);
	};
	if (t) {
		let e = t + H, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : W(U, !1, t, void 0, !0);
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
	cache: B(e.cacheSize),
	parseClassName: te(e),
	sortModifiers: ne(e),
	postfixLookupClassGroupIds: ie(e),
	...k(e)
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + V : _, y = v + g;
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
}, fe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, me = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, he = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ge = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _e = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ve = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ye = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, be = (e) => me.test(e), xe = (e) => !!e && !Number.isNaN(Number(e)), Se = (e) => !!e && Number.isInteger(Number(e)), Ce = (e) => e.endsWith("%") && xe(e.slice(0, -1)), we = (e) => he.test(e), Te = () => !0, Ee = (e) => ge.test(e) && !_e.test(e), De = () => !1, Oe = (e) => ve.test(e), ke = (e) => ye.test(e), Ae = (e) => !G(e) && !K(e), je = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Me = (e) => qe(e, Ze, De), G = (e) => fe.test(e), Ne = (e) => qe(e, Qe, Ee), Pe = (e) => qe(e, $e, xe), Fe = (e) => qe(e, tt, Te), Ie = (e) => qe(e, et, De), Le = (e) => qe(e, Ye, De), Re = (e) => qe(e, Xe, ke), ze = (e) => qe(e, nt, Oe), K = (e) => pe.test(e), Be = (e) => Je(e, Qe), Ve = (e) => Je(e, et), He = (e) => Je(e, Ye), Ue = (e) => Je(e, Ze), We = (e) => Je(e, Xe), Ge = (e) => Je(e, nt, !0), Ke = (e) => Je(e, tt, !0), qe = (e, t, n) => {
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
		K,
		G
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
		K,
		G,
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
		K,
		G
	], D = () => [
		"auto",
		{ span: [
			"full",
			Se,
			K,
			G
		] },
		Se,
		K,
		G
	], O = () => [
		Se,
		"auto",
		K,
		G
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		K,
		G
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
		K,
		G
	], L = () => [
		...b(),
		He,
		Le,
		{ position: [K, G] }
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
		{ size: [K, G] }
	], ee = () => [
		Ce,
		Be,
		Ne
	], B = () => [
		"",
		"none",
		"full",
		l,
		K,
		G
	], V = () => [
		"",
		xe,
		Be,
		Ne
	], H = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], U = () => [
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
	], W = () => [
		xe,
		Ce,
		He,
		Le
	], te = () => [
		"",
		"none",
		m,
		K,
		G
	], ne = () => [
		"none",
		xe,
		K,
		G
	], re = () => [
		"none",
		xe,
		K,
		G
	], ie = () => [
		xe,
		K,
		G
	], ae = () => [
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
				G,
				K,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				K,
				G
			] }],
			"container-named": [je],
			columns: [{ columns: [
				xe,
				G,
				K,
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
				K,
				G
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
				G
			] }],
			grow: [{ grow: [
				"",
				xe,
				K,
				G
			] }],
			shrink: [{ shrink: [
				"",
				xe,
				K,
				G
			] }],
			order: [{ order: [
				Se,
				"first",
				"last",
				"none",
				K,
				G
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
				G
			] }],
			"font-family": [{ font: [
				Ve,
				Ie,
				t
			] }],
			"font-features": [{ "font-features": [G] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				K,
				G
			] }],
			"line-clamp": [{ "line-clamp": [
				xe,
				"none",
				K,
				Pe
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				K,
				G
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				K,
				G
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
			"text-decoration-style": [{ decoration: [...H(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				xe,
				"from-font",
				"auto",
				K,
				Ne
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				xe,
				"auto",
				K,
				G
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
				K,
				G
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
				K,
				G
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
				K,
				G
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
						K,
						G
					],
					radial: [
						"",
						K,
						G
					],
					conic: [
						Se,
						K,
						G
					]
				},
				We,
				Re
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: ee() }],
			"gradient-via-pos": [{ via: ee() }],
			"gradient-to-pos": [{ to: ee() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: B() }],
			"rounded-s": [{ "rounded-s": B() }],
			"rounded-e": [{ "rounded-e": B() }],
			"rounded-t": [{ "rounded-t": B() }],
			"rounded-r": [{ "rounded-r": B() }],
			"rounded-b": [{ "rounded-b": B() }],
			"rounded-l": [{ "rounded-l": B() }],
			"rounded-ss": [{ "rounded-ss": B() }],
			"rounded-se": [{ "rounded-se": B() }],
			"rounded-ee": [{ "rounded-ee": B() }],
			"rounded-es": [{ "rounded-es": B() }],
			"rounded-tl": [{ "rounded-tl": B() }],
			"rounded-tr": [{ "rounded-tr": B() }],
			"rounded-br": [{ "rounded-br": B() }],
			"rounded-bl": [{ "rounded-bl": B() }],
			"border-w": [{ border: V() }],
			"border-w-x": [{ "border-x": V() }],
			"border-w-y": [{ "border-y": V() }],
			"border-w-s": [{ "border-s": V() }],
			"border-w-e": [{ "border-e": V() }],
			"border-w-bs": [{ "border-bs": V() }],
			"border-w-be": [{ "border-be": V() }],
			"border-w-t": [{ "border-t": V() }],
			"border-w-r": [{ "border-r": V() }],
			"border-w-b": [{ "border-b": V() }],
			"border-w-l": [{ "border-l": V() }],
			"divide-x": [{ "divide-x": V() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": V() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...H(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...H(),
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
				...H(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				xe,
				K,
				G
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
			"ring-w": [{ ring: V() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [xe, Ne] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": V() }],
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
				K,
				G
			] }],
			"mix-blend": [{ "mix-blend": [
				...U(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": U() }],
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
			"mask-image-linear-from-pos": [{ "mask-linear-from": W() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": W() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": W() }],
			"mask-image-t-to-pos": [{ "mask-t-to": W() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": W() }],
			"mask-image-r-to-pos": [{ "mask-r-to": W() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": W() }],
			"mask-image-b-to-pos": [{ "mask-b-to": W() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": W() }],
			"mask-image-l-to-pos": [{ "mask-l-to": W() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": W() }],
			"mask-image-x-to-pos": [{ "mask-x-to": W() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": W() }],
			"mask-image-y-to-pos": [{ "mask-y-to": W() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [K, G] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": W() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": W() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [xe] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": W() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": W() }],
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
				K,
				G
			] }],
			filter: [{ filter: [
				"",
				"none",
				K,
				G
			] }],
			blur: [{ blur: te() }],
			brightness: [{ brightness: [
				xe,
				K,
				G
			] }],
			contrast: [{ contrast: [
				xe,
				K,
				G
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
				K,
				G
			] }],
			"hue-rotate": [{ "hue-rotate": [
				xe,
				K,
				G
			] }],
			invert: [{ invert: [
				"",
				xe,
				K,
				G
			] }],
			saturate: [{ saturate: [
				xe,
				K,
				G
			] }],
			sepia: [{ sepia: [
				"",
				xe,
				K,
				G
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				K,
				G
			] }],
			"backdrop-blur": [{ "backdrop-blur": te() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				xe,
				K,
				G
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				xe,
				K,
				G
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				xe,
				K,
				G
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				xe,
				K,
				G
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				xe,
				K,
				G
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				xe,
				K,
				G
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				xe,
				K,
				G
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				xe,
				K,
				G
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
				K,
				G
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				xe,
				"initial",
				K,
				G
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				K,
				G
			] }],
			delay: [{ delay: [
				xe,
				K,
				G
			] }],
			animate: [{ animate: [
				"none",
				v,
				K,
				G
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				K,
				G
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ne() }],
			"rotate-x": [{ "rotate-x": ne() }],
			"rotate-y": [{ "rotate-y": ne() }],
			"rotate-z": [{ "rotate-z": ne() }],
			scale: [{ scale: re() }],
			"scale-x": [{ "scale-x": re() }],
			"scale-y": [{ "scale-y": re() }],
			"scale-z": [{ "scale-z": re() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ie() }],
			"skew-x": [{ "skew-x": ie() }],
			"skew-y": [{ "skew-y": ie() }],
			transform: [{ transform: [
				K,
				G,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ae() }],
			"translate-x": [{ "translate-x": ae() }],
			"translate-y": [{ "translate-y": ae() }],
			"translate-z": [{ "translate-z": ae() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Se,
				K,
				G
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
				K,
				G
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
				K,
				G
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
function it(...e) {
	return rt(v(e));
}
//#endregion
//#region node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react-jsx-runtime.production.js
var at = /* @__PURE__ */ o(((e) => {
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
})), q = (/* @__PURE__ */ o(((e, t) => {
	t.exports = at();
})))(), ot = x("group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function st({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: it(ot({ variant: t }), e),
		...n
	});
}
function ct({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "alert-title",
		className: it("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", e),
		...t
	});
}
function lt({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "alert-description",
		className: it("text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/alert.tsx
function ut({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsxs)(st, {
		"data-ssui-component": "alert",
		"data-testid": "ssui-v2-alert",
		variant: e.props.variant,
		children: [/* @__PURE__ */ (0, q.jsx)(ct, { children: e.props.title }), e.props.description === null ? null : /* @__PURE__ */ (0, q.jsx)(lt, { children: e.props.description })]
	});
}
//#endregion
//#region src/components/ui/aspect-ratio.tsx
function dt({ ratio: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "aspect-ratio",
		style: { "--ratio": e },
		className: it("relative aspect-(--ratio)", t),
		...n
	});
}
//#endregion
//#region src/components/streamlit/aspect-ratio.tsx
function ft({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)(dt, {
		className: "overflow-hidden rounded-lg bg-muted",
		"data-ssui-component": "aspect_ratio",
		"data-testid": "ssui-v2-aspect-ratio",
		ratio: e.props.ratio,
		children: /* @__PURE__ */ (0, q.jsx)("img", {
			alt: e.props.alt,
			className: "size-full object-cover",
			loading: "lazy",
			src: e.props.src
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/formatErrorMessage.mjs
function pt(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var mt = pt("https://base-ui.com/production-error", "Base UI"), ht = {};
function gt(e, t) {
	let n = S.useRef(ht);
	return n.current === ht && (n.current = e(t)), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useMergedRefs.mjs
function _t(e, t, n, r) {
	let i = gt(yt).current;
	return bt(i, e, t, n, r) && St(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function vt(e) {
	let t = gt(yt).current;
	return xt(t, e) && St(t, e), t.callback;
}
function yt() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function bt(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function xt(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function St(e, t) {
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
var Ct = 19;
function wt(e) {
	return Ct >= e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getReactElementRef.mjs
function Tt(e) {
	if (!/*#__PURE__*/ S.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (wt(19) ? n?.ref : t.ref) ?? null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeObjects.mjs
function Et(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/empty.mjs
function Dt() {}
var Ot = Object.freeze([]), kt = Object.freeze({});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function At(e, t) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveClassName.mjs
function jt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveStyle.mjs
function Mt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/merge-props/mergeProps.mjs
var Nt = {};
function Pt(e, t, n, r, i) {
	if (!n && !r && !i && !e) return It(t);
	let a = It(e);
	return t && (a = Lt(a, t)), n && (a = Lt(a, n)), r && (a = Lt(a, r)), i && (a = Lt(a, i)), a;
}
function Ft(e) {
	if (e.length === 0) return Nt;
	if (e.length === 1) return It(e[0]);
	let t = It(e[0]);
	for (let n = 1; n < e.length; n += 1) t = Lt(t, e[n]);
	return t;
}
function It(e) {
	return Vt(e) ? { ...Ht(e, Nt) } : Rt(e);
}
function Lt(e, t) {
	return Vt(t) ? Ht(t, e) : zt(e, t);
}
function Rt(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		Bt(e, n) && (t[e] = Wt(n));
	}
	return t;
}
function zt(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = Et(e.style, r);
				break;
			case "className":
				e[n] = Kt(e.className, r);
				break;
			default: e[n] = Bt(n, r) ? Ut(e[n], r) : r;
		}
	}
	return e;
}
function Bt(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function Vt(e) {
	return typeof e == "function";
}
function Ht(e, t) {
	return Vt(e) ? e(t) : e ?? Nt;
}
function Ut(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (qt(r)) {
			let i = r;
			Gt(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : Wt(t) : e;
}
function Wt(e) {
	return e && ((...t) => {
		let n = t[0];
		return qt(n) && Gt(n), e(...t);
	});
}
function Gt(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function Kt(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function qt(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useRenderElement.mjs
function Jt(e, t, n = {}) {
	let r = t.render, i = Yt(t, n);
	return n.enabled === !1 ? null : Qt(e, r, i, n.state ?? kt);
}
function Yt(e, t = {}) {
	let { className: n, style: r, render: i } = e, { state: a = kt, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? jt(n, a) : void 0, d = l ? Mt(r, a) : void 0, f = l ? At(a, c) : kt, p = l && s ? Xt(s) : void 0, m = l ? Et(f, p) ?? {} : kt;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? vt([
		m.ref,
		Tt(i),
		...o
	]) : _t(m.ref, Tt(i), o) : _t(null, null)), l ? (u !== void 0 && (m.className = Kt(m.className, u)), d !== void 0 && (m.style = Et(m.style, d)), m) : kt;
}
function Xt(e) {
	return Array.isArray(e) ? Ft(e) : Pt(void 0, e);
}
var Zt = Symbol.for("react.lazy");
function Qt(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = Pt(n, t.props);
		e.ref = n.ref;
		let i = t;
		return i?.$$typeof === Zt && (i = S.Children.toArray(t)[0]), /*#__PURE__*/ S.cloneElement(i, e);
	}
	if (e && typeof e == "string") return $t(e, n);
	throw Error(mt(8));
}
function $t(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, S.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, S.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ S.createElement(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/root/AvatarRootContext.mjs
var en = /*#__PURE__*/ S.createContext(void 0);
function tn() {
	let e = S.useContext(en);
	if (e === void 0) throw Error(mt(13));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/root/stateAttributesMapping.mjs
var nn = { imageLoadingStatus: () => null }, rn = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, style: i, ...a } = e, [o, s] = S.useState("idle"), c = { imageLoadingStatus: o }, l = S.useMemo(() => ({
		imageLoadingStatus: o,
		setImageLoadingStatus: s
	}), [o, s]), u = Jt("span", e, {
		state: c,
		ref: t,
		props: a,
		stateAttributesMapping: nn
	});
	return /*#__PURE__*/ (0, q.jsx)(en.Provider, {
		value: l,
		children: u
	});
}), an = { ...S }, on = an.useInsertionEffect, sn = on && on !== an.useLayoutEffect ? on : (e) => e();
function J(e) {
	let t = gt(cn).current;
	return t.next = e, sn(t.effect), t.trampoline;
}
function cn() {
	let e = {
		next: void 0,
		callback: ln,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function ln() {}
var Y = typeof document < "u" ? S.useLayoutEffect : () => {}, un = [];
function dn(e) {
	S.useEffect(e, un);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useAnimationFrame.mjs
var fn = null;
globalThis.requestAnimationFrame;
var pn = new class {
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
}(), mn = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return pn.request(e);
	}
	static cancel(e) {
		return pn.cancel(e);
	}
	currentId = fn;
	request(e) {
		this.cancel(), this.currentId = pn.request(() => {
			this.currentId = fn, e();
		});
	}
	cancel = () => {
		this.currentId !== fn && (pn.cancel(this.currentId), this.currentId = fn);
	};
	disposeEffect = () => this.cancel;
};
function hn() {
	let e = gt(mn.create).current;
	return dn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveRef.mjs
function gn(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var _n = /*#__PURE__*/ function(e) {
	return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
}({}), vn = { [_n.startingStyle]: "" }, yn = { [_n.endingStyle]: "" }, bn = { transitionStatus(e) {
	return e === "starting" ? vn : e === "ending" ? yn : null;
} }, xn = /* @__PURE__ */ c(m(), 1);
function Sn(e, t = !1, n = !0) {
	let r = hn();
	return J((i, a = null) => {
		r.cancel();
		let o = gn(e);
		if (o == null) return;
		let s = o, c = () => {
			xn.flushSync(i);
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
			let e = _n.startingStyle;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
function Cn(e) {
	let { enabled: t = !0, open: n, ref: r, onComplete: i } = e, a = J(i), o = Sn(r, n, !1);
	S.useEffect(() => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useTransitionStatus.mjs
function wn(e, t = !1, n = !1) {
	let [r, i] = S.useState(e && t ? "idle" : void 0), [a, o] = S.useState(e);
	return e && !a && (o(!0), i("starting")), !e && a && r !== "ending" && !n && i("ending"), !e && !a && r === "ending" && i(void 0), Y(() => {
		if (!e && a && r !== "ending" && n) {
			let e = mn.request(() => {
				i("ending");
			});
			return () => {
				mn.cancel(e);
			};
		}
	}, [
		e,
		a,
		r,
		n
	]), Y(() => {
		if (!e || t) return;
		let n = mn.request(() => {
			i(void 0);
		});
		return () => {
			mn.cancel(n);
		};
	}, [t, e]), Y(() => {
		if (!e || !t) return;
		e && a && r !== "idle" && i("starting");
		let n = mn.request(() => {
			i("idle");
		});
		return () => {
			mn.cancel(n);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/image/useImageLoadingStatus.mjs
function Tn(e, { referrerPolicy: t, crossOrigin: n, sizes: r, srcSet: i }) {
	let [a, o] = S.useState("idle");
	return Y(() => {
		if (!e && !i) return o("error"), Dt;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/image/AvatarImage.mjs
var En = {
	...nn,
	...bn
}, Dn = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, onLoadingStatusChange: i, style: a, ...o } = e, { setImageLoadingStatus: s } = tn(), c = Tn(o.src, o), l = c === "loaded", { mounted: u, transitionStatus: d, setMounted: f } = wn(l), p = S.useRef(null), m = J((e) => {
		i?.(e), s(e);
	});
	Y(() => {
		c !== "idle" && m(c);
	}, [c, m]), Y(() => () => s("idle"), [s]), Cn({
		open: l,
		ref: p,
		onComplete() {
			l || f(!1);
		}
	});
	let h = Jt("img", e, {
		state: {
			imageLoadingStatus: c,
			transitionStatus: d
		},
		ref: [t, p],
		props: o,
		stateAttributesMapping: En,
		enabled: u
	});
	return u ? h : null;
}), On = 0, kn = class e {
	static create() {
		return new e();
	}
	currentId = On;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = On, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== On;
	}
	clear = () => {
		this.currentId !== On && (clearTimeout(this.currentId), this.currentId = On);
	};
	disposeEffect = () => this.clear;
};
function An() {
	let e = gt(kn.create).current;
	return dn(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/avatar/fallback/AvatarFallback.mjs
var jn = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, delay: i, style: a, ...o } = e, { imageLoadingStatus: s } = tn(), [c, l] = S.useState(i === void 0), u = An();
	return S.useEffect(() => (i === void 0 ? l(!0) : u.start(i, () => l(!0)), u.clear), [u, i]), Jt("span", e, {
		state: { imageLoadingStatus: s },
		ref: t,
		props: o,
		stateAttributesMapping: nn,
		enabled: s !== "loaded" && (i === void 0 || c)
	});
});
//#endregion
//#region src/components/ui/avatar.tsx
function Mn({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, q.jsx)(rn, {
		"data-slot": "avatar",
		"data-size": t,
		className: it("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", e),
		...n
	});
}
function Nn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(Dn, {
		"data-slot": "avatar-image",
		className: it("aspect-square size-full rounded-full object-cover", e),
		...t
	});
}
function Pn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(jn, {
		"data-slot": "avatar-fallback",
		className: it("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/avatar.tsx
function Fn({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "avatar",
		"data-testid": "ssui-v2-avatar",
		children: /* @__PURE__ */ (0, q.jsxs)(Mn, {
			size: e.props.size,
			children: [e.props.src === null ? null : /* @__PURE__ */ (0, q.jsx)(Nn, {
				alt: e.props.alt,
				src: e.props.src
			}), /* @__PURE__ */ (0, q.jsx)(Pn, { children: e.props.fallback })]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/use-render/useRender.mjs
function In(e) {
	return Jt(e.defaultTagName ?? "div", e, e);
}
//#endregion
//#region src/components/ui/badge.tsx
var Ln = x("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
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
function Rn({ className: e, variant: t = "default", render: n, ...r }) {
	return In({
		defaultTagName: "span",
		props: Pt({ className: it(Ln({ variant: t }), e) }, r),
		render: n,
		state: {
			slot: "badge",
			variant: t
		}
	});
}
//#endregion
//#region src/components/streamlit/badge.tsx
function zn({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: "flex flex-wrap items-center gap-2 p-px",
		"data-ssui-component": "badge",
		"data-testid": "ssui-v2-badge",
		role: "list",
		children: e.props.badges.map((e, t) => /* @__PURE__ */ (0, q.jsx)(Rn, {
			role: "listitem",
			variant: e.variant,
			children: e.text
		}, `${e.text}-${t}`))
	});
}
//#endregion
//#region node_modules/.pnpm/lucide-react@1.28.0_react@19.2.8/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var Bn = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Vn = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Hn = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Un = (e) => {
	let t = Hn(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Wn = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Gn = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Kn = (0, S.createContext)({}), qn = () => (0, S.useContext)(Kn), Jn = (0, S.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = qn() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, S.createElement)("svg", {
		ref: c,
		...Wn,
		width: t ?? l ?? Wn.width,
		height: t ?? l ?? Wn.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: Bn("lucide", p, i),
		...!a && !Gn(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, S.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), Yn = (e, t) => {
	let n = (0, S.forwardRef)(({ className: n, ...r }, i) => (0, S.createElement)(Jn, {
		ref: i,
		iconNode: t,
		className: Bn(`lucide-${Vn(Un(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = Un(e), n;
}, Xn = Yn("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Zn = Yn("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), Qn = Yn("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), $n = Yn("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
//#endregion
//#region src/components/ui/breadcrumb.tsx
function er({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: it(e),
		...t
	});
}
function tr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("ol", {
		"data-slot": "breadcrumb-list",
		className: it("flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground", e),
		...t
	});
}
function nr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("li", {
		"data-slot": "breadcrumb-item",
		className: it("inline-flex items-center gap-1", e),
		...t
	});
}
function rr({ className: e, render: t, ...n }) {
	return In({
		defaultTagName: "a",
		props: Pt({ className: it("transition-colors hover:text-foreground", e) }, n),
		render: t,
		state: { slot: "breadcrumb-link" }
	});
}
function ir({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: it("font-normal text-foreground", e),
		...t
	});
}
function ar({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ (0, q.jsx)("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: it("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ (0, q.jsx)(Qn, { className: "cn-rtl-flip" })
	});
}
//#endregion
//#region src/components/streamlit/breadcrumb.tsx
function or({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, q.jsx)(er, {
		"aria-label": e.props.label,
		"data-ssui-component": "breadcrumb",
		"data-testid": "ssui-v2-breadcrumb",
		children: /* @__PURE__ */ (0, q.jsx)(tr, { children: e.props.items.map((n, r) => /* @__PURE__ */ (0, q.jsxs)(S.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)(nr, { children: n.current ? /* @__PURE__ */ (0, q.jsx)(ir, { children: n.text }) : /* @__PURE__ */ (0, q.jsx)(rr, {
			href: "#",
			onClick: (e) => {
				e.preventDefault(), t("action", {
					text: n.text,
					href: n.href,
					index: r
				});
			},
			children: n.text
		}) }), r < e.props.items.length - 1 ? /* @__PURE__ */ (0, q.jsx)(ar, {}) : null] }, `${n.text}-${r}`)) })
	});
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function sr() {
	return typeof window < "u";
}
function cr(e) {
	return dr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function lr(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ur(e) {
	return ((dr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function dr(e) {
	return sr() ? e instanceof Node || e instanceof lr(e).Node : !1;
}
function fr(e) {
	return sr() ? e instanceof Element || e instanceof lr(e).Element : !1;
}
function pr(e) {
	return sr() ? e instanceof HTMLElement || e instanceof lr(e).HTMLElement : !1;
}
function mr(e) {
	return !sr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof lr(e).ShadowRoot;
}
function hr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Er(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function gr(e) {
	return /^(table|td|th)$/.test(cr(e));
}
function _r(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var vr = /transform|translate|scale|rotate|perspective|filter/, yr = /paint|layout|strict|content/, br = (e) => !!e && e !== "none", xr;
function Sr(e) {
	let t = fr(e) ? Er(e) : e;
	return br(t.transform) || br(t.translate) || br(t.scale) || br(t.rotate) || br(t.perspective) || !wr() && (br(t.backdropFilter) || br(t.filter)) || vr.test(t.willChange || "") || yr.test(t.contain || "");
}
function Cr(e) {
	let t = Or(e);
	for (; pr(t) && !Tr(t);) {
		if (Sr(t)) return t;
		if (_r(t)) return null;
		t = Or(t);
	}
	return null;
}
function wr() {
	return xr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), xr;
}
function Tr(e) {
	return /^(html|body|#document)$/.test(cr(e));
}
function Er(e) {
	return lr(e).getComputedStyle(e);
}
function Dr(e) {
	return fr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Or(e) {
	if (cr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || mr(e) && e.host || ur(e);
	return mr(t) ? t.host : t;
}
function kr(e) {
	let t = Or(e);
	return Tr(t) ? (e.ownerDocument || e).body : pr(t) && hr(t) ? t : kr(t);
}
function Ar(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = kr(e), i = r === e.ownerDocument?.body, a = lr(r);
	if (i) {
		let e = jr(a);
		return t.concat(a, a.visualViewport || [], hr(r) ? r : [], e && n ? Ar(e) : []);
	}
	return t.concat(r, Ar(r, [], n));
}
function jr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
var Mr = /*#__PURE__*/ S.createContext(void 0);
function Nr(e = !1) {
	let t = S.useContext(Mr);
	if (t === void 0 && !e) throw Error(mt(16));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Pr(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: S.useMemo(() => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/use-button/useButton.mjs
function Fr(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = S.useRef(null), s = Nr(!0), c = a ?? s !== void 0, { props: l } = Pr({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = S.useCallback(() => {
		let e = o.current;
		Ir(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return Y(u, [u]), {
		getButtonProps: S.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return Pt({
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
					if (t || (Gt(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let r = e.target === e.currentTarget, a = e.currentTarget, s = Ir(a), l = !i && Lr(a), u = r && (i ? s : !l), d = e.key === "Enter", f = e.key === " ", p = a.getAttribute("role"), m = p?.startsWith("menuitem") || p === "option" || p === "gridcell";
					if (r && c && f) {
						if (e.defaultPrevented && m) return;
						e.preventDefault(), l || i && s ? (a.click(), e.preventBaseUIHandler()) : u && (n?.(e), e.preventBaseUIHandler());
						return;
					}
					u && (!i && (f || d) && e.preventDefault(), !i && d && n?.(e));
				},
				onKeyUp(e) {
					if (!t) {
						if (Gt(e), a?.(e), e.target === e.currentTarget && i && c && Ir(e.currentTarget) && e.key === " ") {
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
		buttonRef: J((e) => {
			o.current = e, u();
		})
	};
}
function Ir(e) {
	return pr(e) && e.tagName === "BUTTON";
}
function Lr(e) {
	return !!(e?.tagName === "A" && e?.href);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/button/Button.mjs
var Rr = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = Fr({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return Jt("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), zr = x("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function Br({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, q.jsx)(Rr, {
		"data-slot": "button",
		className: it(zr({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/components/streamlit/button.tsx
function Vr({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "button",
		"data-testid": "ssui-v2-button",
		children: /* @__PURE__ */ (0, q.jsx)(Br, {
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
function Hr({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "card",
		"data-size": t,
		className: it("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", e),
		...n
	});
}
function Ur({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "card-header",
		className: it("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", e),
		...t
	});
}
function Wr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "card-title",
		className: it("cn-font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", e),
		...t
	});
}
function Gr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "card-description",
		className: it("text-sm text-muted-foreground", e),
		...t
	});
}
function Kr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "card-content",
		className: it("px-(--card-spacing)", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/card.tsx
function qr({ component: e, metric: t, props: n }) {
	let r = n.title !== null || n.description !== null;
	return /* @__PURE__ */ (0, q.jsxs)(Hr, {
		"data-ssui-component": e,
		"data-testid": `ssui-v2-${e.replace("_", "-")}`,
		size: n.size,
		children: [r ? /* @__PURE__ */ (0, q.jsxs)(Ur, { children: [n.title === null ? null : /* @__PURE__ */ (0, q.jsx)(Wr, { children: n.title }), n.description === null ? null : /* @__PURE__ */ (0, q.jsx)(Gr, { children: n.description })] }) : null, n.content === null ? null : /* @__PURE__ */ (0, q.jsx)(Kr, { children: t ? /* @__PURE__ */ (0, q.jsx)("div", {
			className: "text-2xl font-semibold tracking-tight",
			children: n.content
		}) : /* @__PURE__ */ (0, q.jsx)("div", {
			className: "text-sm",
			children: n.content
		}) })]
	});
}
function Jr({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)(qr, {
		component: "card",
		metric: !1,
		props: e.props
	});
}
function Yr({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)(qr, {
		component: "metric_card",
		metric: !0,
		props: e.props
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useControlled.mjs
function Xr({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = S.useRef(e !== void 0), [a, o] = S.useState(t);
	return [i ? e : a, S.useCallback((e) => {
		i || o(e);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/visuallyHidden.mjs
var Zr = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, Qr = {
	...Zr,
	position: "fixed",
	top: 0,
	left: 0
}, $r = {
	...Zr,
	position: "absolute"
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/owner.mjs
function ei(e) {
	return e?.ownerDocument || document;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function ti(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootDataAttributes.mjs
var ni = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.indeterminate = "data-indeterminate", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), ri = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), ii = {
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
}, ai = {
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, oi = {
	disabled: !1,
	...ai
}, si = { valid(e) {
	return e === null ? null : e ? { [ri.valid]: "" } : { [ri.invalid]: "" };
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/utils/useStateAttributesMapping.mjs
function ci(e) {
	return S.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [ni.checked]: "" } : { [ni.unchecked]: "" };
		},
		...si
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useId.mjs
var li = 0;
function ui(e, t = "mui") {
	let [n, r] = S.useState(e), i = e || n;
	return S.useEffect(() => {
		n ?? (li += 1, r(`${t}-${li}`));
	}, [n, t]), i;
}
var di = an.useId;
function fi(e, t) {
	if (di !== void 0) {
		let n = di();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return ui(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useBaseUiId.mjs
function pi(e) {
	return fi(e, "base-ui");
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var mi = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: ii,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: Dt,
	disabled: void 0,
	touched: ai.touched,
	setTouched: Dt,
	dirty: ai.dirty,
	setDirty: Dt,
	filled: ai.filled,
	setFilled: Dt,
	focused: ai.focused,
	setFocused: Dt,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => !1,
	state: oi,
	markedDirtyRef: { current: !1 },
	registerFieldControl: Dt,
	validation: {
		getValidationProps: (e, t = kt) => t,
		inputRef: { current: null },
		registerInput: Dt,
		commit: async () => {},
		change: Dt
	}
}, hi = /*#__PURE__*/ S.createContext(mi);
function gi(e = !0) {
	let t = S.useContext(hi);
	if (t.setValidityData === Dt && !e) throw Error(mt(28));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function _i(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = gi(), s = S.useRef(null);
	s.current ||= Symbol(), Y(() => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/field/item/FieldItemContext.mjs
var vi = /*#__PURE__*/ S.createContext({ disabled: !1 });
function yi() {
	return S.useContext(vi);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var bi = /*#__PURE__*/ S.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: Dt,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: !1 }
});
function xi() {
	return S.useContext(bi);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var Si = /*#__PURE__*/ S.createContext({
	controlId: void 0,
	registerControlId: Dt,
	labelId: void 0,
	setLabelId: Dt,
	messageIds: [],
	setMessageIds: Dt,
	getDescriptionProps: (e) => e
});
function Ci() {
	return S.useContext(Si);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function wi(e, t, n, r = !0, i) {
	let [a, o] = S.useState(), s = pi(i ? `${i}-label` : void 0), c = e ?? t ?? a;
	return Y(() => {
		let i = e || t || !r ? void 0 : Ti(n.current, s);
		a !== i && o(i);
	}), c;
}
function Ti(e, t) {
	let n = Ei(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function Ei(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs
var Di = /*#__PURE__*/ S.createContext(void 0);
function Oi(e = !0) {
	let t = S.useContext(Di);
	if (t === void 0 && !e) throw Error(mt(3));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
var ki = /*#__PURE__*/ S.createContext(void 0);
function Ai() {
	let e = S.useContext(ki);
	if (e === void 0) throw Error(mt(14));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/reason-parts.mjs
var ji = "none", Mi = "trigger-press", Ni = "trigger-hover", Pi = "trigger-focus", Fi = "outside-press", Ii = "item-press", Li = "focus-out", Ri = "escape-key", zi = "list-navigation", Bi = "cancel-open", Vi = "sibling-open", Hi = "imperative-action", Ui = "window-resize";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Wi(e, t, n, r) {
	let i = !1, a = !1, o = r ?? kt;
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
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useValueChanged.mjs
function Gi(e, t) {
	let n = S.useRef(e), r = J(t);
	Y(() => {
		n.current !== e && r(n.current);
	}, [e, r]), Y(() => {
		n.current = e;
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRoot.mjs
var Ki = "data-parent", qi = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: y = !1, style: b, ...x } = e, { clearErrors: C } = xi(), { disabled: w, name: T, setDirty: E, setFilled: D, setFocused: O, setTouched: k, state: A, validationMode: j, validityData: M, validation: N } = gi(), P = yi(), { labelId: F, controlId: I, registerControlId: L, getDescriptionProps: R } = Ci(), z = Oi(), ee = z?.parent, B = ee && z.allValues, V = w || P.disabled || z?.disabled || o, H = T ?? d, U = v ?? H, W = pi(), te = pi(), ne = I;
	B ? ne = p ? te : `${ee.id}-${U}` : c && (ne = c);
	let re = {};
	B && (p ? re = z.parent.getParentProps() : U && (re = z.parent.getChildProps(U)));
	let { checked: ie = n, indeterminate: ae = l, onCheckedChange: oe, ...se } = re, ce = z?.value, le = z?.setValue, ue = z?.defaultValue, de = S.useRef(null), fe = gt(() => Symbol("checkbox-control")), pe = S.useRef(!1), { getButtonProps: me, buttonRef: he } = Fr({
		disabled: V,
		native: y
	}), ge = z?.validation ?? N, [_e, ve] = Xr({
		controlled: U && ce && !p ? ce.includes(U) : ie,
		default: U && ue && !p ? ue.includes(U) : i,
		name: "Checkbox",
		state: "checked"
	}), ye = B ? !!ie : _e, be = B && ae || l;
	Y(() => {
		L !== Dt && (pe.current = !0, L(fe.current, ne));
	}, [
		ne,
		L,
		fe
	]), S.useEffect(() => {
		let e = fe.current;
		return () => {
			!pe.current || L === Dt || (pe.current = !1, L(e, void 0));
		};
	}, [L, fe]), _i(de, W, _e, void 0, !z && !V, d);
	let xe = S.useRef(null), Se = _t(u, xe, ge.inputRef, ge.registerInput), Ce = wi(a, F, xe, !y, ne ?? void 0);
	Y(() => {
		xe.current && (xe.current.indeterminate = be, _e && D(!0));
	}, [
		_e,
		be,
		D
	]), Gi(_e, () => {
		z || (C(H), D(_e), E(_e !== M.initialValue), ge.change(_e));
	});
	let we = Pt({
		checked: _e,
		disabled: V,
		form: s,
		name: p ? void 0 : H,
		id: y ? void 0 : ne ?? void 0,
		required: g,
		ref: Se,
		style: H ? $r : Qr,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			if (m) {
				e.preventDefault();
				return;
			}
			let t = e.currentTarget.checked, n = Wi(ji, e.nativeEvent);
			if (f?.(t, n), !n.isCanceled && (oe?.(t, n), !n.isCanceled && (ve(t), U && ce && le && !p && !B))) {
				let e = t ? [...ce, U] : ce.filter((e) => e !== U);
				le(e, n);
			}
		},
		onFocus() {
			de.current?.focus();
		}
	}, v === void 0 ? kt : { value: (z ? _e && v : v) || "" }, R, (e) => ge.getValidationProps(V, e));
	S.useEffect(() => {
		if (!ee || !U) return;
		let e = ee.disabledStatesRef.current;
		return e.set(U, V), () => {
			e.delete(U);
		};
	}, [
		ee,
		V,
		U
	]);
	let Te = S.useMemo(() => ({
		...A,
		checked: ye,
		disabled: V,
		readOnly: m,
		required: g,
		indeterminate: be
	}), [
		A,
		ye,
		V,
		m,
		g,
		be
	]), Ee = ci(Te), De = Jt("span", e, {
		state: Te,
		ref: [
			he,
			de,
			t,
			z?.registerControlRef
		],
		props: [
			{
				id: y ? ne ?? void 0 : W,
				role: "checkbox",
				"aria-checked": be ? "mixed" : ye,
				"aria-readonly": m || void 0,
				"aria-required": g || void 0,
				"aria-labelledby": Ce,
				[Ki]: p ? "" : void 0,
				onFocus() {
					V || O(!0);
				},
				onBlur() {
					let e = xe.current;
					e && (k(!0), O(!1), j === "onBlur" && ge.commit(z ? ce : e.checked));
				},
				onKeyDown(e) {
					if (e.key !== "Enter" || (e.preventBaseUIHandler(), e.defaultPrevented)) return;
					let t = xe.current?.form ?? null, n = e.currentTarget, r = e.nativeEvent, i = e.preventDefault, a = r.preventDefault, o = !1;
					e.preventDefault = () => {
						o = !0, i.call(e);
					}, r.preventDefault = () => {
						o = !0, a.call(r);
					}, a.call(r), lr(n).queueMicrotask(() => {
						e.preventDefault = i, r.preventDefault = a, o || ti(t)?.click();
					});
				},
				onClick(e) {
					if (m || V) return;
					e.preventDefault();
					let t = xe.current;
					t && t.dispatchEvent(new (lr(t)).PointerEvent("click", {
						bubbles: !0,
						shiftKey: e.shiftKey,
						ctrlKey: e.ctrlKey,
						altKey: e.altKey,
						metaKey: e.metaKey
					}));
				}
			},
			x,
			se,
			me,
			R,
			(e) => ge.getValidationProps(V, e)
		],
		stateAttributesMapping: Ee
	});
	return /*#__PURE__*/ (0, q.jsxs)(ki.Provider, {
		value: Te,
		children: [
			De,
			!_e && !z && H && !p && _ !== void 0 && /*#__PURE__*/ (0, q.jsx)("input", {
				type: "hidden",
				form: s,
				name: H,
				value: _,
				disabled: V
			}),
			/*#__PURE__*/ (0, q.jsx)("input", {
				...we,
				suppressHydrationWarning: !0
			})
		]
	});
}), Ji = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = Ai(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = wn(c), f = S.useRef(null), p = {
		...s,
		transitionStatus: u
	};
	Cn({
		open: c,
		ref: f,
		onComplete() {
			c || d(!1);
		}
	});
	let m = {
		...ci(s),
		...bn,
		...si
	}, h = a || l, g = Jt("span", e, {
		ref: [t, f],
		state: p,
		stateAttributesMapping: m,
		props: o
	});
	return h ? g : null;
});
//#endregion
//#region src/components/ui/checkbox.tsx
function Yi({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(qi, {
		"data-slot": "checkbox",
		className: it("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, q.jsx)(Ji, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, q.jsx)(Xn, {})
		})
	});
}
//#endregion
//#region src/protocol/reconciliation.ts
function Xi(e, t) {
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
function Zi(e, t) {
	let [n, r] = (0, S.useState)(e), i = (0, S.useRef)(n), a = (0, S.useRef)(e.serverRevision);
	return (0, S.useEffect)(() => {
		let n = Xi(i.current, e);
		i.current = n.state, r(n.state), n.acknowledgeServerReset && e.serverRevision > a.current && (a.current = e.serverRevision, t("state", e));
	}, [
		e.clientRevision,
		e.kind,
		e.serverRevision,
		e.value,
		t
	]), {
		commit: (e) => {
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
//#endregion
//#region src/components/streamlit/checkbox.tsx
function Qi({ envelope: e, setStateValue: t }) {
	let n = (0, S.useId)(), { commit: r, state: i } = Zi(e.state, t);
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex min-h-8 items-center gap-2.5 p-px",
		"data-ssui-component": "checkbox",
		"data-testid": "ssui-v2-checkbox",
		children: [/* @__PURE__ */ (0, q.jsx)(Yi, {
			checked: i.value,
			disabled: e.props.disabled,
			id: n,
			onCheckedChange: (e) => {
				r(e);
			}
		}), /* @__PURE__ */ (0, q.jsx)("label", {
			className: "cursor-default text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
var $i = /*#__PURE__*/ S.createContext(void 0);
function ea(e) {
	let t = S.useContext($i);
	if (t === void 0 && !e) throw Error(mt(33));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var ta = /*#__PURE__*/ S.createContext(void 0);
function na(e) {
	let t = S.useContext(ta);
	if (t === void 0 && !e) throw Error(mt(36));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popupStateMapping.mjs
var ra = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = _n.startingStyle] = "startingStyle", e[e.endingStyle = _n.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e.side = "data-side", e.align = "data-align", e;
}({}), ia = /*#__PURE__*/ function(e) {
	return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
}({}), aa = { [ia.popupOpen]: "" }, oa = {
	[ia.popupOpen]: "",
	[ia.pressed]: ""
}, sa = { [ra.open]: "" }, ca = { [ra.closed]: "" }, la = { [ra.anchorHidden]: "" }, ua = { open(e) {
	return e ? aa : null;
} }, da = { open(e) {
	return e ? oa : null;
} }, fa = {
	open(e) {
		return e ? sa : ca;
	},
	anchorHidden(e) {
		return e ? la : null;
	}
}, pa = /*#__PURE__*/ S.createContext(void 0);
function ma(e = !0) {
	let t = S.useContext(pa);
	if (t === void 0 && !e) throw Error(mt(25));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/shared.mjs
function ha() {
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
var { userAgent: ga, platform: _a, maxTouchPoints: va } = ha(), ya = ga.toLowerCase(), ba = _a.toLowerCase(), xa = /^i(os$|p)/.test(ba) || ba === "macintel" && va > 1, Sa = "android", Ca = ba === Sa || ya.includes(Sa), wa = !xa && ba.startsWith("mac");
ba.startsWith("win"), !Ca && /^(linux|chrome os)/.test(ba);
var Ta = wa || xa, Ea = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!Ea && ya.includes("firefox"), !Ea && ya.includes("chrom");
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/screen-reader.mjs
var Da = Ta, Oa = /jsdom|happydom/.test(ya);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function ka(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, { events: l } = a.useState("floatingTreeRoot"), u = a.useState("open"), d = ma(!0), f = d !== void 0;
	return S.useMemo(() => ({
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
				reason: Ii
			});
		},
		onMouseUp(e) {
			if (d) {
				let t = d.initialCursorPointRef.current;
				if (d.initialCursorPointRef.current = null, f && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || f && !wa && e.button === 2) return;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItem.mjs
var Aa = { type: "regular-item" };
function ja(e) {
	let { closeOnClick: t, disabled: n = !1, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = a.useState("disabled"), d = n || u, f = S.useRef(null), { getButtonProps: p, buttonRef: m } = Fr({
		disabled: d,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), h = ka({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: f,
		itemMetadata: c
	}), g = S.useCallback((e) => Pt(h, { onMouseEnter() {
		c.type === "submenu-trigger" && c.setActive();
	} }, e, p), [
		h,
		p,
		c
	]), _ = _t(f, m);
	return S.useMemo(() => ({
		getItemProps: g,
		itemRef: _
	}), [g, _]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var Ma = /*#__PURE__*/ S.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
function Na() {
	return S.useContext(Ma);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
var Pa = /*#__PURE__*/ function(e) {
	return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
}({});
function Fa(e = {}) {
	let { label: t, metadata: n, textRef: r, indexGuessBehavior: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, elementsRef: l, labelsRef: u, nextIndexRef: d } = Na(), f = S.useRef(-1), [p, m] = S.useState(a ?? (i === Pa.GuessFromOrder ? () => {
		if (f.current === -1) {
			let e = d.current;
			d.current += 1, f.current = e;
		}
		return f.current;
	} : -1)), h = S.useRef(null), g = S.useCallback((e) => {
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
	return Y(() => {
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
	]), Y(() => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroupContext.mjs
var Ia = /*#__PURE__*/ S.createContext(void 0);
function La() {
	let e = S.useContext(Ia);
	if (e === void 0) throw Error(mt(31));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Ra = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = S.useState(void 0), c = Jt("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, q.jsx)(Ia.Provider, {
		value: s,
		children: c
	});
}), za = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = pi(a), c = La();
	return Y(() => (c(s), () => {
		c(void 0);
	}), [c, s]), Jt("div", e, {
		ref: t,
		props: {
			id: s,
			role: "presentation",
			...o
		}
	});
}), Ba = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, d = Fa({ label: a }), f = ea(!0), p = pi(i), { store: m } = na(), h = m.useState("isActive", d.index), g = m.useState("itemProps"), { getItemProps: _, itemRef: v } = ja({
		closeOnClick: c,
		disabled: s,
		highlighted: h,
		id: p,
		store: m,
		nativeButton: o,
		nodeId: f?.context.nodeId,
		itemMetadata: Aa
	});
	return Jt("div", e, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function Va(e) {
	e.preventDefault(), e.stopPropagation();
}
function Ha(e) {
	return "nativeEvent" in e;
}
function Ua(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Ca && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Wa(e) {
	return Oa ? !1 : !Ca && e.width === 0 && e.height === 0 || Ca && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function Ga(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function Ka(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var qa = "data-base-ui-focusable", Ja = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", Ya = "ArrowLeft", Xa = "ArrowRight", Za = "ArrowUp", Qa = "ArrowDown";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/shadowDom.mjs
function $a(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function X(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && mr(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function eo(e) {
	return "composedPath" in e ? e.composedPath()[0] : e.target;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function to(e, t) {
	if (!fr(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute("data-trigger-disabled");
	for (let [, e] of t.entries()) if (X(e, n)) return !e.hasAttribute("data-trigger-disabled");
	return !1;
}
function no(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function ro(e) {
	return e.matches("html,body");
}
function io(e) {
	return pr(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function ao(e) {
	return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${Ja}`) != null;
}
function oo(e) {
	return e ? e.getAttribute("role") === "combobox" && io(e) : !1;
}
function so(e) {
	if (!e || Oa) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function co(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function lo(e, t) {
	return t != null && !Ga(t) ? 0 : typeof e == "function" ? e() : e;
}
function uo(e, t, n) {
	let r = lo(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function fo(e) {
	return typeof e == "function" ? e() : e;
}
function po(e, t) {
	return t || e === "click" || e === "mousedown";
}
function mo(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/addEventListener.mjs
function ho(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeCleanups.mjs
function go(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useValueAsRef.mjs
function _o(e) {
	let t = gt(vo, e).current;
	return t.next = e, Y(t.effect), t;
}
function vo(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/FocusGuard.mjs
var yo = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let [n, r] = S.useState();
	Y(() => {
		Da && Ea && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, q.jsx)("span", {
		...e,
		ref: t,
		style: Qr,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), bo = [
	"top",
	"right",
	"bottom",
	"left"
], xo = Math.min, So = Math.max, Co = Math.round, wo = Math.floor, To = (e) => ({
	x: e,
	y: e
}), Eo = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Do(e, t, n) {
	return So(e, xo(t, n));
}
function Oo(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ko(e) {
	return e.split("-")[0];
}
function Ao(e) {
	return e.split("-")[1];
}
function jo(e) {
	return e === "x" ? "y" : "x";
}
function Mo(e) {
	return e === "y" ? "height" : "width";
}
function No(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Po(e) {
	return jo(No(e));
}
function Fo(e, t, n) {
	n === void 0 && (n = !1);
	let r = Ao(e), i = Po(e), a = Mo(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Wo(o)), [o, Wo(o)];
}
function Io(e) {
	let t = Wo(e);
	return [
		Lo(e),
		t,
		Lo(t)
	];
}
function Lo(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Ro = ["left", "right"], zo = ["right", "left"], Bo = ["top", "bottom"], Vo = ["bottom", "top"];
function Ho(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? zo : Ro : t ? Ro : zo;
		case "left":
		case "right": return t ? Bo : Vo;
		default: return [];
	}
}
function Uo(e, t, n, r) {
	let i = Ao(e), a = Ho(ko(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Lo)))), a;
}
function Wo(e) {
	let t = ko(e);
	return Eo[t] + e.slice(t.length);
}
function Go(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Ko(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Go(e);
}
function qo(e) {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function Jo(e, t) {
	return t < 0 || t >= e.length;
}
function Yo(e, t) {
	return Zo(e.current, { disabledIndices: t });
}
function Xo(e, t) {
	return Zo(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function Zo(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && Qo(e, a, r));
	return a;
}
function Qo(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !es(r) || !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function $o(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function es(e, t = e ? Er(e) : null) {
	return !e || !e.isConnected || !t || $o(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var ts = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function ns(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return mr(n) ? n.host : null;
}
function rs(e) {
	for (let t of Array.from(e.children)) if (cr(t) === "summary") return t;
	return null;
}
function is(e, t) {
	let n = rs(t);
	return !!n && (e === n || X(n, e));
}
function as(e) {
	let t = e ? cr(e) : "";
	return e != null && e.matches(ts) && (t !== "summary" || e.parentElement != null && cr(e.parentElement) === "details" && rs(e.parentElement) === e) && (t !== "details" || rs(e) == null) && (t !== "input" || e.type !== "hidden");
}
function os(e) {
	if (!as(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = ns(t)) {
		let n = t !== e, r = cr(t) === "slot";
		if (t.hasAttribute("inert") || n && cr(t) === "details" && !t.open && !is(e, t) || t.hasAttribute("hidden") || !r && !ss(t, n)) return !1;
	}
	return !0;
}
function ss(e, t) {
	let n = Er(e);
	return t ? n.display !== "none" : es(e, n);
}
function cs(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = cr(e);
		if (t === "details" || t === "audio" || t === "video" || pr(e) && e.isContentEditable) return 0;
	}
	return t;
}
function ls(e) {
	if (cr(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function us(e, t) {
	let n = ls(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = ls(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = ls(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function ds(e) {
	if (pr(e) && cr(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return pr(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function fs(e, t) {
	ds(e).forEach((e) => {
		as(e) && t.push(e), fs(e, t);
	});
}
function ps(e, t, n) {
	ds(e).forEach((e) => {
		pr(e) && e.matches(t) && n.push(e), ps(e, t, n);
	});
}
function ms(e) {
	return os(e) && cs(e) >= 0;
}
function hs(e) {
	let t = [];
	return fs(e, t), t.filter(os);
}
function gs(e) {
	let t = hs(e);
	return t.filter((e) => cs(e) >= 0 && us(e, t));
}
function _s(e, t) {
	let n = gs(e), r = n.length;
	if (r === 0) return;
	let i = $a(ei(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function vs(e) {
	return _s(ei(e).body, 1) || e;
}
function ys(e) {
	return _s(ei(e).body, -1) || e;
}
function bs(e, t) {
	if (!e) return null;
	let n = gs(ei(e).body), r = n.length;
	if (r === 0) return null;
	let i = n.indexOf(e);
	return i === -1 ? null : n[(i + t + r) % r];
}
function xs(e) {
	return bs(e, 1);
}
function Ss(e) {
	return bs(e, -1);
}
function Cs(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !X(n, r);
}
function ws(e) {
	gs(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function Ts(e) {
	let t = [];
	ps(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Es(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Es(e, t.id, n)]);
}
function Ds(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Os(e) {
	return `data-base-ui-${e}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var ks = 0;
function As(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(ks);
	function a() {
		i && !i() || e?.focus({ preventScroll: n });
	}
	if (r) return a(), Dt;
	let o = requestAnimationFrame(a);
	return ks = o, () => {
		ks === o && (cancelAnimationFrame(o), ks = 0);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var js = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap()
}, Ms = "data-base-ui-inert", Ns = {
	inert: /* @__PURE__ */ new WeakSet(),
	"aria-hidden": /* @__PURE__ */ new WeakSet()
}, Ps = /* @__PURE__ */ new WeakMap(), Fs = 0;
function Is(e) {
	return Ns[e];
}
function Ls(e) {
	return e ? mr(e) ? e.host : Ls(e.parentNode) : null;
}
var Rs = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Ls(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), zs = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, Bs = (e, t, n) => {
	let r = [], i = (e) => {
		!e || n.has(e) || Array.from(e.children).forEach((e) => {
			cr(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function Vs(e, t, n, r, { mark: i = !0 }) {
	let a = null;
	r ? a = "inert" : n && (a = "aria-hidden");
	let o = null, s = null, c = Rs(t, e), l = i ? Bs(t, zs(c), new Set(c)) : [], u = [], d = [];
	if (a) {
		let e = js[a], n = Is(a);
		s = n, o = e;
		let r = Rs(t, Array.from(t.querySelectorAll("[aria-live]"))), i = c.concat(r);
		Bs(t, zs(i), new Set(i)).forEach((t) => {
			let r = t.getAttribute(a), i = r !== null && r !== "false", o = (e.get(t) || 0) + 1;
			e.set(t, o), u.push(t), o === 1 && i && n.add(t), i || t.setAttribute(a, a === "inert" ? "" : "true");
		});
	}
	return i && l.forEach((e) => {
		let t = (Ps.get(e) || 0) + 1;
		Ps.set(e, t), d.push(e), t === 1 && e.setAttribute(Ms, "");
	}), Fs += 1, () => {
		o && u.forEach((e) => {
			let t = (o.get(e) || 0) - 1;
			o.set(e, t), t || (!s?.has(e) && a && e.removeAttribute(a), s?.delete(e));
		}), i && d.forEach((e) => {
			let t = (Ps.get(e) || 0) - 1;
			Ps.set(e, t), t || e.removeAttribute(Ms);
		}), --Fs, Fs || (js.inert = /* @__PURE__ */ new WeakMap(), js["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Ns.inert = /* @__PURE__ */ new WeakSet(), Ns["aria-hidden"] = /* @__PURE__ */ new WeakSet(), Ps = /* @__PURE__ */ new WeakMap());
	};
}
function Hs(e, t = {}) {
	let { ariaHidden: n = !1, inert: r = !1, mark: i = !0 } = t, a = ei(e[0]).body;
	return Vs(e, a, n, r, { mark: i });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/constants.mjs
var Us = { style: { transition: "none" } }, Ws = { fallbackAxisSide: "none" }, Gs = { fallbackAxisSide: "end" }, Ks = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, qs = /*#__PURE__*/ S.createContext(null), Js = () => S.useContext(qs), Ys = Os("portal");
function Xs(e = {}) {
	let { ref: t, container: n, componentProps: r = kt, elementProps: i } = e, a = fi(), o = Js()?.portalNode, [s, c] = S.useState(null), [l, u] = S.useState(null), d = J((e) => {
		e !== null && u(e);
	}), f = S.useRef(null);
	Y(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		if (a == null) return;
		let e = (n && (dr(n) ? n : n.current)) ?? o ?? document.body;
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
	let p = Jt("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[Ys]: ""
		}, i]
	});
	return {
		portalNode: l,
		portalSubtree: s && p ? /*#__PURE__*/ xn.createPortal(p, s) : null
	};
}
var Zs = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, renderGuards: s, ...c } = e, { portalNode: l, portalSubtree: u } = Xs({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), d = S.useRef(null), f = S.useRef(null), p = S.useRef(null), m = S.useRef(null), [h, g] = S.useState(null), _ = S.useRef(!1), v = h?.modal, y = h?.open, b = typeof s == "boolean" ? s : !!h && !h.modal && h.open && !!l;
	S.useEffect(() => {
		if (!l || v) return;
		function e(e) {
			l && e.relatedTarget && Cs(e) && (e.type === "focusin" ? _.current &&= (Ts(l), !1) : (ws(l), _.current = !0));
		}
		return go(ho(l, "focusin", e, !0), ho(l, "focusout", e, !0));
	}, [l, v]), Y(() => {
		!l || y !== !0 || !_.current || (Ts(l), _.current = !1);
	}, [y, l]);
	let x = S.useMemo(() => ({
		beforeOutsideRef: d,
		afterOutsideRef: f,
		beforeInsideRef: p,
		afterInsideRef: m,
		portalNode: l,
		setFocusManagerState: g
	}), [l]);
	return /*#__PURE__*/ (0, q.jsxs)(S.Fragment, { children: [u, /*#__PURE__*/ (0, q.jsxs)(qs.Provider, {
		value: x,
		children: [
			b && l && /*#__PURE__*/ (0, q.jsx)(yo, {
				"data-type": "outside",
				ref: d,
				onFocus: (e) => {
					Cs(e, l) ? p.current?.focus() : ys(h ? h.domReference : null)?.focus();
				}
			}),
			b && l && /*#__PURE__*/ (0, q.jsx)("span", {
				"aria-owns": l.id,
				style: Ks
			}),
			l && /*#__PURE__*/ xn.createPortal(a, l),
			b && l && /*#__PURE__*/ (0, q.jsx)(yo, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					Cs(e, l) ? m.current?.focus() : (vs(h ? h.domReference : null)?.focus(), h?.closeOnFocusOut && h?.onOpenChange(!1, Wi("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function Qs() {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingTreeStore.mjs
var $s = class {
	nodesRef = { current: [] };
	events = Qs();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, ec = /*#__PURE__*/ S.createContext(null), tc = /*#__PURE__*/ S.createContext(null), nc = () => S.useContext(ec)?.id || null, rc = (e) => {
	let t = S.useContext(tc);
	return e ?? t;
};
function ic(e) {
	let t = fi(), n = rc(e), r = nc();
	return Y(() => {
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
function ac(e) {
	let { children: t, id: n } = e, r = nc();
	return /*#__PURE__*/ (0, q.jsx)(ec.Provider, {
		value: S.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function oc(e) {
	let { children: t, externalTree: n } = e, r = gt(() => n ?? new $s()).current;
	return /*#__PURE__*/ (0, q.jsx)(tc.Provider, {
		value: r,
		children: t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function sc(e, t) {
	let n = lr(eo(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var cc = 20, lc = [];
function uc() {
	lc = lc.filter((e) => e.deref()?.isConnected);
}
function dc(e) {
	uc(), e && cr(e) !== "body" && (lc.push(new WeakRef(e)), lc.length > cc && (lc = lc.slice(-20)));
}
function fc() {
	return uc(), lc[lc.length - 1]?.deref();
}
function pc(e) {
	return e ? ms(e) ? e : gs(e)[0] || e : null;
}
function mc(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = hs(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return ms(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function hc(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, restoreFocus: o = !1, modal: s = !0, closeOnFocusOut: c = !0, openInteractionType: l = "", nextFocusableElement: u, previousFocusableElement: d, beforeContentFocusGuardRef: f, externalTree: p, getInsideElements: m } = e, h = "rootStore" in t ? t.rootStore : t, g = h.useState("open"), _ = h.useState("domReferenceElement"), v = h.useState("floatingElement"), { events: y, dataRef: b } = h.context, x = J(() => b.current.floatingContext?.nodeId), C = i === !1, w = oo(_) && C, T = _o(i), E = _o(a), D = _o(l), O = _o(g), k = rc(p), A = Js(), j = S.useRef(!1), M = S.useRef(!1), N = S.useRef(!1), P = S.useRef(null), F = S.useRef(""), I = S.useRef(""), L = S.useRef(null), R = S.useRef(null), z = _t(L, f, A?.beforeInsideRef), ee = _t(R, A?.afterInsideRef), B = An(), V = An(), H = hn(), U = A != null, W = co(v), te = J((e = W) => e ? gs(e) : []), ne = J(() => m?.().filter((e) => e != null) ?? []);
	S.useEffect(() => {
		if (r || !s) return;
		function e(e) {
			e.key === "Tab" && X(W, $a(ei(W))) && te().length === 0 && !w && Va(e);
		}
		return ho(ei(W), "keydown", e);
	}, [
		r,
		W,
		s,
		w,
		te
	]), S.useEffect(() => {
		if (r || !g) return;
		let e = ei(W);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = eo(e), n = ne(), r = X(v, t) || X(_, t) || X(A?.portalNode, t) || n.some((e) => e === t || X(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", t?.closest("[data-base-ui-click-trigger]") && (M.current = !0, V.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return go(ho(e, "pointerdown", n, !0), ho(e, "pointerup", t, !0), ho(e, "pointercancel", t, !0), ho(e, "keydown", i, !0), t);
	}, [
		r,
		v,
		_,
		W,
		g,
		A,
		V,
		ne
	]), S.useEffect(() => {
		if (r || !c) return;
		let e = ei(W);
		function t() {
			M.current = !0, V.start(0, () => {
				M.current = !1;
			});
		}
		function n(e) {
			let t = eo(e);
			ms(t) && (P.current = t);
		}
		function i(t) {
			let n = t.relatedTarget, r = t.currentTarget, i = eo(t);
			s && n == null && i != null && X(v, i) && dc(i), queueMicrotask(() => {
				let a = x(), c = h.context.triggerElements, l = ne(), f = n?.hasAttribute(Os("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					gn(d),
					gn(u)
				].includes(n), p = !(X(_, n) || X(v, n) || X(n, v) || X(A?.portalNode, n) || l.some((e) => e === n || X(e, n)) || n != null && c.hasElement(n) || c.hasMatchingElement((e) => X(e, n)) || f || k && (Es(k.nodesRef.current, a).find((e) => X(e.context?.elements.floating, n) || X(e.context?.elements.domReference, n)) || Ds(k.nodesRef.current, a).find((e) => [e.context?.elements.floating, co(e.context?.elements.floating)].includes(n) || e.context?.elements.domReference === n)));
				if (r === _ && W && mc(W), o && r !== _ && !es(i) && $a(e) === e.body) {
					if (pr(W) && (W.focus(), o === "popup")) {
						H.request(() => {
							W.focus();
						});
						return;
					}
					let e = te(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || W;
					pr(n) && n.focus();
				}
				if (b.current.insideReactTree) {
					b.current.insideReactTree = !1;
					return;
				}
				(w || !s) && n && p && !M.current && (w || n !== fc()) && (j.current = !0, h.setOpen(!1, Wi(Li, t)));
			});
		}
		function a() {
			N.current || (b.current.insideReactTree = !0, B.start(0, () => {
				b.current.insideReactTree = !1;
			}));
		}
		let l = pr(_) ? _ : null;
		if (!(!v && !l)) return go(l && ho(l, "focusout", i), l && ho(l, "pointerdown", t), v && ho(v, "focusin", n), v && ho(v, "focusout", i), v && A && ho(v, "focusout", a, !0));
	}, [
		r,
		_,
		v,
		W,
		s,
		k,
		A,
		h,
		c,
		o,
		te,
		w,
		x,
		b,
		B,
		V,
		H,
		u,
		d,
		ne
	]), S.useEffect(() => {
		if (r || !v || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Os("portal")}]`) || []), t = (k ? Ds(k.nodesRef.current, x()) : []).find((e) => oo(e.context?.elements.domReference || null))?.context?.elements.domReference, n = Hs([
			v,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...ne(),
			t,
			gn(d),
			gn(u),
			w ? _ : null
		].filter((e) => e != null), {
			ariaHidden: s || w,
			mark: !1
		}), i = Hs([v, ...e].filter((e) => e != null));
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
		ne
	]), Y(() => {
		if (!g || r || !pr(W)) return;
		let e = ei(W), t = $a(e);
		queueMicrotask(() => {
			let n = T.current, r = typeof n == "function" ? n(D.current || "") : n;
			if (r === void 0 || r === !1 || X(W, t)) return;
			let i = null, a = () => (i ??= te(W), i[0] || W), o;
			o = r === !0 || r === null ? a() : gn(r), o ||= a();
			let s = X(W, $a(e));
			As(o, {
				preventScroll: o === W,
				shouldFocus() {
					if (!O.current) return !1;
					if (s) return !0;
					let t = $a(e);
					return !(t !== o && X(W, t));
				}
			});
		});
	}, [
		r,
		g,
		W,
		te,
		T,
		D,
		O
	]), Y(() => {
		if (r || !W) return;
		let e = ei(W), t = $a(e), n = D.current == null;
		dc(t);
		function i(e) {
			if (e.open || (F.current = sc(e.nativeEvent, I.current)), e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave" && (j.current = !0), e.reason === "outside-press") if (e.nested) j.current = !1;
			else if (Ua(e.nativeEvent) || Wa(e.nativeEvent)) j.current = !1;
			else {
				let e = !1;
				ei(W).createElement("div").focus({ get preventScroll() {
					return e = !0, !1;
				} }), e ? j.current = !1 : j.current = !0;
			}
		}
		y.on("openchange", i);
		function a() {
			let e = E.current, r = typeof e == "function" ? e(F.current) : e;
			if (r === void 0 || r === !1) return null;
			r === null && (r = !0);
			let i = _?.isConnected ? _ : null, a = t?.isConnected && cr(t) !== "body" ? t : null, o = n ? a || i : i || a;
			return o ||= fc() || null, typeof r == "boolean" ? o : gn(r) || o || null;
		}
		return () => {
			y.off("openchange", i);
			let t = $a(e), n = ne(), r = X(v, t) || n.some((e) => e === t || X(e, t)) || k && Es(k.nodesRef.current, x(), !1).some((e) => X(e.context?.elements.floating, t)), o = E.current, s = a();
			queueMicrotask(() => {
				let n = pc(s), i = typeof o != "boolean";
				o && !j.current && pr(n) && (!(!i && n !== t && t !== e.body) || r) && n.focus({ preventScroll: !0 }), j.current = !1;
			});
		};
	}, [
		r,
		v,
		W,
		E,
		D,
		y,
		k,
		_,
		x,
		ne
	]), Y(() => {
		if (!Ea || g || !v) return;
		let e = $a(ei(v));
		!pr(e) || !io(e) || X(v, e) && e.blur();
	}, [g, v]), Y(() => {
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
	]), Y(() => {
		if (!(r || !W)) return mc(W), () => {
			queueMicrotask(uc);
		};
	}, [r, W]);
	let re = !r && (!s || !w) && (U || s);
	return /*#__PURE__*/ (0, q.jsxs)(S.Fragment, { children: [
		re && /*#__PURE__*/ (0, q.jsx)(yo, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				if (s) {
					let e = te();
					As(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, Cs(e, A.portalNode) ? vs(_)?.focus() : gn(d ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		re && /*#__PURE__*/ (0, q.jsx)(yo, {
			"data-type": "inside",
			ref: ee,
			onFocus: (e) => {
				s ? As(te()[0]) : A?.portalNode && (c && (j.current = !0), Cs(e, A.portalNode) ? ys(_)?.focus() : gn(u ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function gc(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = Mi } = t, l = "rootStore" in e ? e.rootStore : e, u = l.context.dataRef, d = S.useRef(void 0), f = hn(), p = An(), m = S.useMemo(() => {
		function e(e, t, n, r) {
			let i = Wi(c, t, n);
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
				if (n.button !== 0 || r === "click" || Ga(i, !0) && a) return;
				let c = t(s, n.currentTarget, (e) => e === "click" || e === "mousedown"), u = eo(o);
				if (io(u)) {
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
				Ga(i, !0) && a || e(t(l.select("open"), n.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), n.nativeEvent, n.currentTarget, i);
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
	return S.useMemo(() => n ? { reference: m } : kt, [n, m]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function _c() {
	return !1;
}
function vc(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function yc(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = _c, bubbles: s, externalTree: c } = t, l = "rootStore" in e ? e.rootStore : e, u = l.useState("open"), d = l.useState("floatingElement"), { dataRef: f } = l.context, p = rc(c), m = J(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = J(() => a), { escapeKey: v, outsidePress: y } = vc(s), b = S.useRef(!1), x = S.useRef(!1), C = S.useRef(!1), w = S.useRef(!1), T = S.useRef(""), E = S.useRef(null), D = An(), O = An(), k = J(() => {
		O.clear(), f.current.insideReactTree = !1;
	}), A = J((e) => {
		let t = f.current.floatingContext?.nodeId;
		return (p ? Es(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), j = J((e) => no(e, l.select("floatingElement")) || no(e, l.select("domReferenceElement"))), M = J((e) => {
		o() && l.setOpen(!1, Wi(Mi, e.nativeEvent));
	}), N = J((e) => {
		if (!u || !n || !r || e.key !== "Escape" || w.current || !v && A("__escapeKeyBubbles")) return;
		let t = Wi(Ri, Ha(e) ? e.nativeEvent : e);
		l.setOpen(!1, t), t.isCanceled || e.preventDefault(), !v && !t.isPropagationAllowed && e.stopPropagation();
	}), P = J(() => {
		f.current.insideReactTree = !0, O.start(0, k);
	}), F = J((e) => {
		if (!u || !n || e.button !== 0) return;
		let t = eo(e.nativeEvent);
		X(l.select("floatingElement"), t) && (b.current || (b.current = !0, x.current = !1));
	}), I = J((e) => {
		!u || !n || (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	S.useEffect(() => {
		if (!u || !n) return;
		f.current.__escapeKeyBubbles = v, f.current.__outsidePressBubbles = y;
		let e = new kn(), t = new kn();
		function i() {
			e.clear(), w.current = !0;
		}
		function a() {
			e.start(Ea ? 5 : 0, () => {
				w.current = !1;
			});
		}
		function o() {
			C.current = !0, t.start(0, () => {
				C.current = !1;
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
		function S(e) {
			let t = f.current.floatingContext?.nodeId, n = p && Es(p.nodesRef.current, t).some((t) => no(e, t.context?.elements.floating));
			return j(e) || n;
		}
		function O(e) {
			if (m(e)) {
				e.type !== "click" && !j(e) && (t.clear(), C.current = !1), k();
				return;
			}
			if (f.current.insideReactTree) {
				k();
				return;
			}
			let n = eo(e), r = `[${Os("inert")}]`, i = fr(n) ? n.getRootNode() : null, a = Array.from((mr(i) ? i : ei(l.select("floatingElement"))).querySelectorAll(r)), o = l.context.triggerElements;
			if (n && (o.hasElement(n) || o.hasMatchingElement((e) => X(e, n)))) return;
			let s = fr(n) ? n : null;
			for (; s && !Tr(s);) {
				let e = Or(s);
				if (Tr(e) || !fr(e)) break;
				s = e;
			}
			if (!(a.length && fr(n) && !ro(n) && !X(n, l.select("floatingElement")) && a.every((e) => !X(s, e)))) {
				if (pr(n) && !("touches" in e)) {
					let t = Tr(n), r = Er(n), i = /auto|scroll/, a = t || i.test(r.overflowX), o = t || i.test(r.overflowY), s = a && n.clientWidth > 0 && n.scrollWidth > n.clientWidth, c = o && n.clientHeight > 0 && n.scrollHeight > n.clientHeight, l = r.direction === "rtl", u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth), d = s && e.offsetY > n.clientHeight;
					if (u || d) return;
				}
				if (!S(e)) {
					if (c() === "intentional" && C.current) {
						t.clear(), C.current = !1;
						return;
					}
					typeof h == "function" && !h(e) || A("__outsidePressBubbles") || (l.setOpen(!1, Wi(Fi, e)), k());
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
			let n = eo(e);
			if (!n) return;
			let r = ho(n, e.type, () => {
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
				if (!S(e)) {
					if (n) {
						o();
						return;
					}
					typeof h == "function" && !h(e) || (t.clear(), C.current = !0, k());
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
		function ee(e) {
			F(e, z);
		}
		function B(e) {
			c() !== "sloppy" || !E.current || j(e) || (E.current.dismissOnTouchEnd && O(e), D.clear(), E.current = null);
		}
		function V(e) {
			F(e, B);
		}
		let H = ei(d), U = go(r && go(ho(H, "keydown", N), ho(H, "compositionstart", i), ho(H, "compositionend", a)), g && go(ho(H, "click", L, !0), ho(H, "pointerdown", L, !0), ho(H, "pointerup", R, !0), ho(H, "pointercancel", R, !0), ho(H, "mousedown", L, !0), ho(H, "mouseup", R, !0), ho(H, "touchstart", I, !0), ho(H, "touchmove", ee, !0), ho(H, "touchend", V, !0)));
		return () => {
			U(), e.clear(), t.clear(), s(), C.current = !1;
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
	]), S.useEffect(k, [h, k]);
	let L = S.useMemo(() => ({
		onKeyDown: N,
		onPointerDown: M,
		onClick: M
	}), [N, M]), R = S.useMemo(() => ({
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
	return S.useMemo(() => n ? {
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
function bc(e, t, n) {
	let { reference: r, floating: i } = e, a = No(t), o = Po(t), s = Mo(o), c = ko(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Ao(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function xc(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Oo(t, e), p = Ko(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = qo(await i.getClippingRect({
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
	}, y = qo(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Sc = 50, Cc = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: xc
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = bc(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Sc && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = bc(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, wc = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Oo(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = ko(r), _ = No(o), v = ko(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Wo(o)] : Io(o)), x = p !== "none";
			!d && x && b.push(...Uo(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Fo(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === No(t) || T.every((e) => No(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = No(e.placement);
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
function Tc(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ec(e) {
	return bo.some((t) => e[t] >= 0);
}
var Dc = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Oo(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Tc(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ec(e)
					} };
				}
				case "escaped": {
					let e = Tc(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ec(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Oc = /*#__PURE__*/ new Set(["left", "top"]);
async function kc(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = ko(n), s = Ao(n), c = No(n) === "y", l = Oc.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Oo(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Ac = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await kc(t, e);
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
}, jc = function(e) {
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
			} }, ...l } = Oo(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = No(i), p = jo(f), m = u[p], h = u[f], g = (e, t) => Do(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Mc = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Oo(e, t), u = {
				x: n,
				y: r
			}, d = No(i), f = jo(d), p = u[f], m = u[d], h = Oo(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Oc.has(ko(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Nc = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Oo(e, t), c = await i.detectOverflow(t, s), l = ko(n), u = Ao(n), d = No(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = xo(p - c[m], g), y = xo(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * So(c.left, c.right) : S = p - 2 * So(c.top, c.bottom)), await o({
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
function Pc(e) {
	let t = Er(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = pr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Co(n) !== a || Co(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Fc(e) {
	return fr(e) ? e : e.contextElement;
}
function Ic(e) {
	let t = Fc(e);
	if (!pr(t)) return To(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Pc(t), o = (a ? Co(n.width) : n.width) / r, s = (a ? Co(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Lc = /*#__PURE__*/ To(0);
function Rc(e) {
	let t = lr(e);
	return !wr() || !t.visualViewport ? Lc : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function zc(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === lr(e);
}
function Bc(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Fc(e), o = To(1);
	t && (r ? fr(r) && (o = Ic(r)) : o = Ic(e));
	let s = zc(a, n, r) ? Rc(a) : To(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = lr(a), t = fr(r) ? lr(r) : r, n = e, i = jr(n);
		for (; i && t !== n;) {
			let e = Ic(i), t = i.getBoundingClientRect(), r = Er(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = lr(i), i = jr(n);
		}
	}
	return qo({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Vc(e, t) {
	let n = Dr(e).scrollLeft;
	return t ? t.left + n : Bc(ur(e)).left + n;
}
function Hc(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Vc(e, n),
		y: n.top + t.scrollTop
	};
}
function Uc(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = ur(r), s = t ? _r(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = To(1), u = To(0), d = pr(r);
	if ((d || !a) && ((cr(r) !== "body" || hr(o)) && (c = Dr(r)), d)) {
		let e = Bc(r);
		l = Ic(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Hc(o, c) : To(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Wc(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Gc(e) {
	let t = Dr(e), n = e.ownerDocument.body, r = So(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = So(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Vc(e), o = -t.scrollTop;
	return Er(n).direction === "rtl" && (a += So(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Kc = 25;
function qc(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = lr(e), a = ur(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !wr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Vc(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Kc && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Jc(e, t) {
	let n = Bc(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ic(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Yc(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = qc(e, n, t);
	else if (t === "document") r = Gc(ur(e));
	else if (fr(t)) r = Jc(t, n);
	else {
		let n = Rc(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return qo(r);
}
function Xc(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ar(e, [], !1).filter((e) => fr(e) && cr(e) !== "body"), i = null, a = Er(e).position === "fixed", o = a ? Or(e) : e;
	for (; fr(o) && !Tr(o);) {
		let e = Er(o), t = Sr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Or(o);
	}
	return t.set(e, r), r;
}
function Zc(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? _r(t) ? [] : Xc(t, this._c) : [].concat(n), r], o = Yc(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Yc(t, a[e], i);
		s = So(n.top, s), c = xo(n.right, c), l = xo(n.bottom, l), u = So(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Qc(e) {
	let { width: t, height: n } = Pc(e);
	return {
		width: t,
		height: n
	};
}
function $c(e, t, n) {
	let r = pr(t), i = ur(t), a = n === "fixed", o = Bc(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = To(0);
	if ((r || !a) && ((cr(t) !== "body" || hr(i)) && (s = Dr(t)), r)) {
		let e = Bc(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Vc(i));
	let l = i && !r && !a ? Hc(i, s) : To(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function el(e) {
	return Er(e).position === "static";
}
function tl(e, t) {
	if (!pr(e) || Er(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return ur(e) === n && (n = n.ownerDocument.body), n;
}
function nl(e, t) {
	let n = lr(e);
	if (_r(e)) return n;
	if (!pr(e)) {
		let t = Or(e);
		for (; t && !Tr(t);) {
			if (fr(t) && !el(t)) return t;
			t = Or(t);
		}
		return n;
	}
	let r = tl(e, t);
	for (; r && gr(r) && el(r);) r = tl(r, t);
	return r && Tr(r) && el(r) && !Sr(r) ? n : r || Cr(e) || n;
}
var rl = async function(e) {
	let t = this.getOffsetParent || nl, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: $c(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function il(e) {
	return Er(e).direction === "rtl";
}
var al = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Uc,
	getDocumentElement: ur,
	getClippingRect: Zc,
	getOffsetParent: nl,
	getElementRects: rl,
	getClientRects: Wc,
	getDimensions: Qc,
	getScale: Ic,
	isElement: fr,
	isRTL: il
};
function ol(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function sl(e, t, n) {
	let r = null, i, a = ur(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = wo(d), h = wo(a.clientWidth - (u + f)), g = wo(a.clientHeight - (d + p)), _ = wo(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: So(0, xo(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ol(l, e.getBoundingClientRect())) return s();
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
	let c = lr(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function cl(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Fc(e), u = i || a ? [...l ? Ar(l) : [], ...t ? Ar(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? sl(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Bc(e) : null;
	c && g();
	function g() {
		let t = Bc(e);
		h && !ol(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ll = Ac, ul = jc, dl = wc, fl = Nc, pl = Dc, ml = Mc, hl = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...al,
		...i.platform,
		_c: r
	};
	return Cc(e, t, {
		...i,
		platform: a
	});
}, gl = typeof document < "u" ? S.useLayoutEffect : function() {};
function _l(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!_l(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !_l(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function vl(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yl(e, t) {
	let n = vl(e);
	return Math.round(t * n) / n;
}
function bl(e) {
	let t = S.useRef(e);
	return gl(() => {
		t.current = e;
	}), t;
}
function xl(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = S.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = S.useState(r);
	_l(f, r) || p(r);
	let [m, h] = S.useState(null), [g, _] = S.useState(null), v = S.useCallback((e) => {
		e !== C.current && (C.current = e, h(e));
	}, []), y = S.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), b = a || m, x = o || g, C = S.useRef(null), w = S.useRef(null), T = S.useRef(u), E = c != null, D = bl(c), O = bl(i), k = bl(l), A = S.useCallback(() => {
		if (!C.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), hl(C.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			j.current && !_l(T.current, t) && (T.current = t, xn.flushSync(() => {
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
	gl(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let j = S.useRef(!1);
	gl(() => (j.current = !0, () => {
		j.current = !1;
	}), []), gl(() => {
		if (b && (C.current = b), x && (w.current = x), b && x) {
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
	let M = S.useMemo(() => ({
		reference: C,
		floating: w,
		setReference: v,
		setFloating: y
	}), [v, y]), N = S.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), P = S.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!N.floating) return e;
		let t = yl(N.floating, u.x), r = yl(N.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...vl(N.floating) >= 1.5 && { willChange: "transform" }
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
	return S.useMemo(() => ({
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
var Sl = (e, t) => {
	let n = ll(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Cl = (e, t) => {
	let n = ul(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, wl = (e, t) => ({
	fn: ml(e).fn,
	options: [e, t]
}), Tl = (e, t) => {
	let n = dl(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, El = (e, t) => {
	let n = fl(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Dl = (e, t) => {
	let n = pl(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnFirstRender.mjs
function Ol(e) {
	let t = S.useRef(!0);
	t.current && (t.current = !1, e());
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/createSelector.mjs
var Z = (e, t, n, r, i, a, ...o) => {
	if (o.length > 0) throw Error(mt(1));
	let s;
	if (e && t && n && r && i && a) s = (o, s, c, l) => a(e(o, s, c, l), t(o, s, c, l), n(o, s, c, l), r(o, s, c, l), i(o, s, c, l), s, c, l);
	else if (e && t && n && r && i) s = (a, o, s, c) => i(e(a, o, s, c), t(a, o, s, c), n(a, o, s, c), r(a, o, s, c), o, s, c);
	else if (e && t && n && r) s = (i, a, o, s) => r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
	else if (e && t && n) s = (r, i, a, o) => n(e(r, i, a, o), t(r, i, a, o), i, a, o);
	else if (e && t) s = (n, r, i, a) => t(e(n, r, i, a), r, i, a);
	else if (e) s = e;
	else throw Error("Missing arguments");
	return s;
}, kl = /* @__PURE__ */ o(((e) => {
	var t = f();
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
})), Al = /* @__PURE__ */ o(((e, t) => {
	t.exports = kl();
})), jl = /* @__PURE__ */ o(((e) => {
	var t = f(), n = Al();
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
})), Ml = /* @__PURE__ */ o(((e, t) => {
	t.exports = jl();
})), Nl = [], Pl = void 0;
function Fl() {
	return Pl;
}
function Il(e) {
	Nl.push(e);
}
function Ll(e) {
	let t = (t, n) => {
		let r = gt(zl).current, i;
		try {
			Pl = r;
			for (let e of Nl) e.before(r);
			i = e(t, n);
			for (let e of Nl) e.after(r);
			r.didInitialize = !0;
		} finally {
			Pl = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function Rl(e) {
	return /*#__PURE__*/ S.forwardRef(Ll(e));
}
function zl() {
	return { didInitialize: !1 };
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/useStore.mjs
var Bl = Al(), Vl = Ml(), Hl = wt(19) ? Wl : Gl;
function Q(e, t, n, r, i) {
	return Hl(e, t, n, r, i);
}
function Ul(e, t, n, r, i) {
	let a = S.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, Bl.useSyncExternalStore)(e.subscribe, a, a);
}
Il({
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
		}), (0, Bl.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function Wl(e, t, n, r, i) {
	let a = Fl();
	if (!a) return Ul(e, t, n, r, i);
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
function Gl(e, t, n, r, i) {
	return (0, Vl.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/Store.mjs
var Kl = class {
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
		return Q(this, e, t, n, r);
	}
}, ql = class extends Kl {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		S.useDebugValue(e);
		let n = this;
		Y(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		Y(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		Y(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		S.useDebugValue(e);
		let n = this, r = t !== void 0;
		Y(() => {
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
		return S.useDebugValue(e), Q(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		S.useDebugValue(e);
		let n = J(t ?? Dt);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = S.useRef(void 0);
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
}, Jl = {
	open: Z((e) => e.open),
	transitionStatus: Z((e) => e.transitionStatus),
	domReferenceElement: Z((e) => e.domReferenceElement),
	referenceElement: Z((e) => e.positionReference ?? e.referenceElement),
	floatingElement: Z((e) => e.floatingElement),
	floatingId: Z((e) => e.floatingId)
}, Yl = class extends ql {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: Qs(),
			nested: n,
			triggerElements: i
		}, Jl), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && Ka(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
function Xl(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = t.context.triggerElements, d = o, f = S.useRef(null);
	r === void 0 && f.current === null && (f.current = new Yl({
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
	return t.useSyncedValue("floatingId", i), Y(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		fr(c) && (e.domReferenceElement = c), p.state.positionReference === p.state.referenceElement && (e.positionReference = c), p.update(e);
	}, [
		s,
		i,
		c,
		l,
		p
	]), p.context.onOpenChange = d, p.context.nested = a, p;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
var Zl = {
	tabIndex: -1,
	[qa]: ""
};
function Ql(e, t) {
	let n = S.useRef(null), r = S.useRef(null);
	return S.useCallback((i) => {
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
function $l(e, t, n, r = !1) {
	t ? e.preventUnmountingOnClose = !1 : r && (e.preventUnmountingOnClose = !0);
	let i = n?.id ?? null;
	(i || t) && (e.activeTriggerId = i, e.activeTriggerElement = n ?? null);
}
function eu(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function tu(e, t, n, r) {
	Ol(() => {
		t === void 0 && e.state.open === !1 && n && (e.state = {
			...e.state,
			open: !0,
			activeTriggerId: r,
			preventUnmountingOnClose: !1
		});
	});
}
function nu(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = Ql(e, n), o = J((t) => {
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
	return Y(() => {
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
function ru(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = e.useState("open");
	Y(() => {
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
				let t = Wi(ji);
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
function iu(e, t, n) {
	let { mounted: r, setMounted: i, transitionStatus: a } = wn(e), o = t.useState("preventUnmountingOnClose"), s = !e && o;
	t.useSyncedValues({
		mounted: r,
		transitionStatus: a,
		preventUnmountingOnClose: s
	});
	let c = J(() => {
		i(!1), t.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: !1,
			preventUnmountingOnClose: !1
		}), n?.(), t.context.onOpenChangeComplete?.(!1);
	});
	return Cn({
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
function au(e, t) {
	e.useSyncedValues(t), Y(() => () => {
		e.update({
			activeTriggerProps: kt,
			inactiveTriggerProps: kt,
			popupProps: kt
		});
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var ou = class {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/getEmptyRootContext.mjs
function su() {
	return new Yl({
		open: !1,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new ou(),
		floatingId: void 0,
		syncOnly: !1,
		nested: !1,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/store.mjs
function cu() {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: su(),
		floatingId: void 0,
		triggerCount: 0,
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: kt,
		inactiveTriggerProps: kt,
		popupProps: kt
	};
}
var lu = Z((e) => e.triggerIdProp ?? e.activeTriggerId), uu = Z((e) => e.openProp ?? e.open), du = Z((e) => (e.popupElement?.id ?? e.floatingId) || void 0);
function fu(e, t) {
	return t !== void 0 && uu(e) && lu(e) === t;
}
function pu(e, t) {
	return fu(e, t) ? !0 : t !== void 0 && uu(e) && lu(e) == null && e.triggerCount === 1;
}
var mu = {
	open: uu,
	mounted: Z((e) => e.mounted),
	transitionStatus: Z((e) => e.transitionStatus),
	floatingRootContext: Z((e) => e.floatingRootContext),
	triggerCount: Z((e) => e.triggerCount),
	preventUnmountingOnClose: Z((e) => e.preventUnmountingOnClose),
	payload: Z((e) => e.payload),
	activeTriggerId: lu,
	activeTriggerElement: Z((e) => e.mounted ? e.activeTriggerElement : null),
	popupId: du,
	isTriggerActive: Z((e, t) => t !== void 0 && lu(e) === t),
	isOpenedByTrigger: Z((e, t) => fu(e, t)),
	isMountedByTrigger: Z((e, t) => t !== void 0 && lu(e) === t && e.mounted),
	triggerProps: Z((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
	triggerPopupId: Z((e, t) => pu(e, t) ? du(e) : void 0),
	popupProps: Z((e) => e.popupProps),
	popupElement: Z((e) => e.popupElement),
	positionerElement: Z((e) => e.positionerElement)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function hu(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = fi(), a = nc() != null, o = gt(() => new Yl({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new ou(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return Y(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = fr(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		o
	]), o.context.onOpenChange = n, o.context.nested = a, o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
function gu(e = {}) {
	let { nodeId: t, externalTree: n } = e, r = hu(e), i = e.rootContext || r, a = i.useState("referenceElement"), o = i.useState("floatingElement"), s = i.useState("domReferenceElement"), c = i.useState("open"), l = i.useState("floatingId"), [u, d] = S.useState(null), [f, p] = S.useState(void 0), [m, h] = S.useState(void 0), g = S.useRef(null), _ = rc(n), v = S.useMemo(() => ({
		reference: a,
		floating: o,
		domReference: s
	}), [
		a,
		o,
		s
	]), y = xl({
		...e,
		elements: {
			...v,
			...u && { reference: u }
		}
	}), b = fr(f) ? f : null, x = m === void 0 ? i.state.floatingElement : m;
	i.useSyncedValue("referenceElement", f ?? null), i.useSyncedValue("domReferenceElement", f === void 0 ? s : b), i.useSyncedValue("floatingElement", x);
	let C = S.useCallback((e) => {
		let t = fr(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		d(t), y.refs.setReference(t);
	}, [y.refs]), w = S.useCallback((e) => {
		(fr(e) || e === null) && (g.current = e, p(e)), (fr(y.refs.reference.current) || y.refs.reference.current === null || e !== null && !fr(e)) && y.refs.setReference(e);
	}, [y.refs, p]), T = S.useCallback((e) => {
		h(e), y.refs.setFloating(e);
	}, [y.refs]), E = S.useMemo(() => ({
		...y.refs,
		setReference: w,
		setFloating: T,
		setPositionReference: C,
		domReference: g
	}), [
		y.refs,
		w,
		T,
		C
	]), D = S.useMemo(() => ({
		...y.elements,
		domReference: s
	}), [y.elements, s]), O = S.useMemo(() => ({
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
	return Y(() => {
		s && (g.current = s);
	}, [s]), Y(() => {
		i.context.dataRef.current.floatingContext = O;
		let e = _?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = O);
	}), S.useMemo(() => ({
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
var _u = wa && Ea;
function vu(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, i = "rootStore" in e ? e.rootStore : e, { events: a, dataRef: o } = i.context, s = S.useRef(!1), c = S.useRef(null), l = S.useRef(!0), u = An();
	S.useEffect(() => {
		let e = i.select("domReferenceElement");
		if (!n) return;
		let t = lr(e);
		function r() {
			let e = i.select("domReferenceElement");
			!i.select("open") && pr(e) && e === $a(ei(e)) && (s.current = !0);
		}
		function a() {
			l.current = !0;
		}
		function o() {
			l.current = !1;
		}
		return go(ho(t, "blur", r), _u && ho(t, "keydown", a, !0), _u && ho(t, "pointerdown", o, !0));
	}, [i, n]), S.useEffect(() => {
		if (!n) return;
		function e(e) {
			if (e.reason === "trigger-press" || e.reason === "escape-key") {
				let e = i.select("domReferenceElement");
				fr(e) && (c.current = e, s.current = !0);
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
	let d = S.useMemo(() => {
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
				let a = eo(t.nativeEvent);
				if (fr(a)) {
					if (_u && !t.relatedTarget) {
						if (!l.current && !io(a)) return;
					} else if (!so(a)) return;
				}
				let o = to(t.relatedTarget, i.context.triggerElements), { nativeEvent: d, currentTarget: f } = t, p = typeof r == "function" ? r() : r;
				if (i.select("open") && o || p === 0 || p === void 0) {
					i.setOpen(!0, Wi(Pi, d, f));
					return;
				}
				u.start(p, () => {
					s.current || i.setOpen(!0, Wi(Pi, d, f));
				});
			},
			onBlur(t) {
				e();
				let n = t.relatedTarget, r = t.nativeEvent, a = fr(n) && n.hasAttribute(Os("focus-guard")) && n.getAttribute("data-type") === "outside";
				u.start(0, () => {
					let e = i.select("domReferenceElement"), t = $a(ei(e));
					!n && t === e || X(o.current.floatingContext?.refs.floating.current, t) || X(e, t) || a || to(n ?? t, i.context.triggerElements) || i.setOpen(!1, Wi(Pi, r));
				});
			}
		};
	}, [
		o,
		r,
		i,
		u
	]);
	return S.useMemo(() => n ? {
		reference: d,
		trigger: d
	} : {}, [n, d]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var yu = class e {
	constructor() {
		this.pointerType = void 0, this.interactedInside = !1, this.handler = void 0, this.blockMouseMove = !0, this.performedPointerEventsMutation = !1, this.pointerEventsScopeElement = null, this.pointerEventsReferenceElement = null, this.pointerEventsFloatingElement = null, this.restTimeoutPending = !1, this.openChangeTimeout = new kn(), this.restTimeout = new kn(), this.handleCloseOptions = void 0;
	}
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, bu = /* @__PURE__ */ new WeakMap();
function xu(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && bu.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), bu.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Su(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = bu.get(n);
	a && a !== e && xu(a), xu(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, bu.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function Cu(e) {
	let t = e.context.dataRef.current, n = gt(() => t.hoverInteractionState ?? yu.create()).current;
	return t.hoverInteractionState ||= n, dn(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function wu(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = "rootStore" in e ? e.rootStore : e, o = a.useState("open"), s = a.useState("floatingElement"), c = a.useState("domReferenceElement"), { dataRef: l } = a.context, u = rc(), d = nc(), f = Cu(a), p = An(), m = J(() => po(l.current.openEvent?.type, f.interactedInside)), h = J(() => mo(l.current.openEvent?.type)), g = J(() => {
		xu(f);
	});
	Y(() => {
		o || (f.pointerType = void 0, f.restTimeoutPending = !1, f.interactedInside = !1, g());
	}, [
		o,
		f,
		g
	]), S.useEffect(() => g, [g]), Y(() => {
		if (n && o && f.handleCloseOptions?.blockPointerEvents && h() && fr(c) && s) {
			let e = c, t = s, n = ei(s), r = u?.nodesRef.current.find((e) => e.id === d)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = f.pointerEventsScopeElement === t ? null : f.pointerEventsScopeElement, a = r === t ? null : r, o = f.handleCloseOptions?.getScope?.() ?? i ?? a ?? e.closest("[data-rootownerid]") ?? n.body;
			return Su(f, {
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
	]), S.useEffect(() => {
		if (!n) return;
		function e() {
			return !!(u && d && Es(u.nodesRef.current, d).length > 0);
		}
		function t(e) {
			let t = uo(r, "close", f.pointerType), n = () => {
				a.setOpen(!1, Wi(Ni, e)), u?.events.emit("floating.closed", e);
			};
			t ? f.openChangeTimeout.start(t, n) : (f.openChangeTimeout.clear(), n());
		}
		function o(e) {
			let t = eo(e);
			if (!ao(t)) {
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
			if (to(n.relatedTarget, a.context.triggerElements)) return;
			let r = l.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			if (!(u && r && fr(o) && Es(u.nodesRef.current, r, !1).some((e) => X(e.context?.elements.floating, o)))) {
				if (f.handler) {
					f.handler(n);
					return;
				}
				g(), h() && !m() && t(n);
			}
		}
		function v(t) {
			!u || !d || e() || p.start(0, () => {
				u.events.off("floating.closed", v), a.setOpen(!1, Wi(Ni, t)), u.events.emit("floating.closed", t);
			});
		}
		let y = s;
		return go(y && ho(y, "mouseenter", c), y && ho(y, "mouseleave", _), y && ho(y, "pointerdown", o, !0), () => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
var Tu = { current: null };
function Eu(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Tu, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p } = t, m = "rootStore" in e ? e.rootStore : e, { dataRef: h, events: g } = m.context, _ = rc(l), v = Cu(m), y = S.useRef(!1), b = _o(i), x = _o(r), C = _o(o), w = _o(n), T = _o(p), E = _o(f), D = J(() => po(h.current.openEvent?.type, v.interactedInside)), O = J(() => T.current?.() !== !1), k = J((e, t, n) => {
		let r = m.context.triggerElements;
		if (r.hasElement(t)) return !e || !X(e, t);
		if (!fr(n)) return !1;
		let i = n;
		return r.hasMatchingElement((e) => X(e, i)) && (!e || !X(e, i));
	}), A = J(() => {
		v.handler &&= (ei(m.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), j = J(() => {
		xu(v);
	});
	return u && (v.handleCloseOptions = b.current?.__options), S.useEffect(() => A, [A]), S.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === Ni, A(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		A
	]), S.useEffect(() => {
		if (!n) return;
		function e(e, t = !0) {
			let n = uo(x.current, "close", v.pointerType);
			n ? v.openChangeTimeout.start(n, () => {
				m.setOpen(!1, Wi(Ni, e)), _?.events.emit("floating.closed", e);
			}) : t && (v.openChangeTimeout.clear(), m.setOpen(!1, Wi(Ni, e)), _?.events.emit("floating.closed", e));
		}
		let t = c.current ?? (u ? m.select("domReferenceElement") : null);
		if (!fr(t)) return;
		function r(e) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !Ga(v.pointerType)) return;
			let t = fo(C.current), n = uo(x.current, "open", v.pointerType), r = eo(e), i = e.currentTarget ?? null, o = m.select("domReferenceElement"), s = i;
			if (fr(r) && !m.context.triggerElements.hasElement(r)) {
				for (let e of m.context.triggerElements.elements()) if (X(e, r)) {
					s = e;
					break;
				}
			}
			fr(i) && fr(o) && !m.context.triggerElements.hasElement(i) && X(i, o) && (s = o);
			let c = s != null && k(o, s, r), l = m.select("open"), u = E.current?.() ?? m.select("transitionStatus") === "ending", d = !l && u && y.current, f = !c && fr(s) && fr(o) && X(o, s) && d, p = t > 0 && !n, h = c && (l || d) || f, g = !l || c;
			if (h) {
				O() && m.setOpen(!0, Wi(Ni, e, s));
				return;
			}
			p || (n ? v.openChangeTimeout.start(n, () => {
				g && O() && m.setOpen(!0, Wi(Ni, e, s));
			}) : g && O() && m.setOpen(!0, Wi(Ni, e, s)));
		}
		function i(t) {
			if (D()) {
				j();
				return;
			}
			A();
			let n = ei(m.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let r = h.current.floatingContext ?? d?.();
			if (!to(t.relatedTarget, m.context.triggerElements)) {
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
				(v.pointerType !== "touch" || !X(m.select("floatingElement"), t.relatedTarget)) && e(t);
			}
		}
		return s ? go(ho(t, "mousemove", r, { once: !0 }), ho(t, "mouseenter", r), ho(t, "mouseleave", i)) : go(ho(t, "mouseenter", r), ho(t, "mouseleave", i));
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
		C,
		c,
		_,
		w,
		d,
		E,
		O
	]), S.useMemo(() => {
		if (!n) return;
		function e(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove(e) {
				let { nativeEvent: t } = e, n = e.currentTarget, r = m.select("domReferenceElement"), i = m.select("open"), o = k(r, n, e.target);
				if (a && !Ga(v.pointerType)) return;
				if (i && o && v.handleCloseOptions?.blockPointerEvents) {
					let e = m.select("floatingElement");
					if (e) {
						let t = v.handleCloseOptions?.getScope?.() ?? n.ownerDocument.body;
						Su(v, {
							scopeElement: t,
							referenceElement: n,
							floatingElement: e
						});
					}
				}
				let s = fo(C.current);
				if (i && !o || s === 0 || !o && v.restTimeoutPending && e.movementX ** 2 + e.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function c() {
					if (v.restTimeoutPending = !1, D()) return;
					let e = m.select("open");
					!v.blockMouseMove && (!e || o) && O() && m.setOpen(!0, Wi(Ni, t, n));
				}
				v.pointerType === "touch" ? xn.flushSync(() => {
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
		C,
		O
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
var Du = "Escape";
function Ou(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function ku(e, t) {
	return Ou(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Au(e, t, n) {
	return Ou(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function ju(e, t, n) {
	return Ou(t, n ? e === Ya : e === Xa, e === Qa);
}
function Mu(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === Du : Ou(t, n ? e === Xa : e === Ya, e === Za);
}
function Nu(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", parentOrientation: _, id: v, resetOnPointerLeave: y = !0, externalTree: b, grid: x } = t, C = x != null, w = "rootStore" in e ? e.rootStore : e, T = w.useState("open"), E = w.useState("floatingElement"), D = w.useState("domReferenceElement"), O = w.context.dataRef, k = co(E), A = oo(D), j = _o(k), M = nc(), N = rc(b), P = S.useRef(f), F = S.useRef(o ?? -1), I = S.useRef(null), L = S.useRef(!0), R = J((e) => {
		i(F.current === -1 ? null : F.current, e);
	}), z = S.useRef(!!E), ee = S.useRef(T), B = S.useRef(!1), V = S.useRef(!1), H = S.useRef(null), U = _o(h), W = _o(T), te = _o(o), ne = _o(y), re = hn(), ie = hn(), ae = J(() => {
		function e(e) {
			d ? N?.events.emit("virtualfocus", e) : H.current = As(e, {
				sync: B.current,
				preventScroll: !0
			});
		}
		let t = n.current[F.current], r = V.current;
		t && e(t), (B.current ? (e) => e() : (e) => re.request(e))(() => {
			let i = n.current[F.current] || t;
			i && (t || e(i), de && (r || !L.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	Y(() => {
		O.current.orientation = g;
	}, [O, g]), Y(() => {
		a && (T && E ? (F.current = o ?? -1, P.current && o != null && (V.current = !0, R())) : z.current && (F.current = -1, R()));
	}, [
		a,
		T,
		E,
		o,
		R
	]), Y(() => {
		if (a) {
			if (!T) {
				B.current = !1;
				return;
			}
			if (E) if (r == null) {
				if (B.current = !1, te.current != null) return;
				if (z.current && (F.current = -1, ae()), (!ee.current || !z.current) && P.current && (I.current != null || P.current === !0 && I.current == null)) {
					let e = 0, t = () => {
						n.current[0] == null ? (e < 2 && (e ? (e) => ie.request(e) : queueMicrotask)(t), e += 1) : (F.current = I.current == null || Au(I.current, g, u) || l ? Yo(n) : Xo(n), I.current = null, R());
					};
					t();
				}
			} else Jo(n.current, r) || (F.current = r, ae(), V.current = !1);
		}
	}, [
		a,
		T,
		E,
		r,
		te,
		l,
		n,
		g,
		u,
		R,
		ae,
		ie
	]), Y(() => {
		if (!a || E || !N || d || !z.current) return;
		let e = N.nodesRef.current, t = e.find((e) => e.id === M)?.context?.elements.floating, n = $a(ei(D ?? t ?? null)), r = e.some((e) => e.context && X(e.context.elements.floating, n));
		t && !r && L.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		N,
		M,
		d
	]), Y(() => {
		ee.current = T, z.current = !!E;
	}), Y(() => {
		T || (I.current = null, P.current = f);
	}, [T, f]);
	let oe = r != null, se = J((e) => {
		if (!W.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (F.current !== t || r !== t) && (F.current = t, R(e));
	}), ce = J(() => _ ?? N?.nodesRef.current.find((e) => e.id === M)?.context?.dataRef?.current.orientation), le = J(() => Yo(n, U.current)), ue = J((e) => {
		if (L.current = !1, B.current = !0, e.which === 229 || !W.current && e.currentTarget === j.current) return;
		if (l && Mu(e.key, g, u, C)) {
			ku(e.key, ce()) || Va(e), w.setOpen(!1, Wi(zi, e.nativeEvent)), pr(D) && (d ? N?.events.emit("virtualfocus", D) : D.focus());
			return;
		}
		let t = F.current, r = Yo(n, h), i = Xo(n, h);
		if (A || (e.key === "Home" && (Va(e), F.current = r, R(e)), e.key === "End" && (Va(e), F.current = i, R(e))), x != null) {
			let t = x(e, F.current, n, g, c, u, h, r, i);
			if (t != null && (F.current = t, R(e)), g === "both") return;
		}
		if (ku(e.key, g)) {
			if (Va(e), T && !d && $a(e.currentTarget.ownerDocument) === e.currentTarget) {
				F.current = Au(e.key, g, u) ? r : i, R(e);
				return;
			}
			Au(e.key, g, u) ? c ? t >= i ? s && t !== n.current.length ? F.current = -1 : (B.current = !1, F.current = r) : F.current = Zo(n.current, {
				startingIndex: t,
				disabledIndices: h
			}) : F.current = Math.min(i, Zo(n.current, {
				startingIndex: t,
				disabledIndices: h
			})) : c ? t <= r ? s && t !== -1 ? F.current = n.current.length : (B.current = !1, F.current = i) : F.current = Zo(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			}) : F.current = Math.max(r, Zo(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			})), Jo(n.current, F.current) && (F.current = -1), R(e);
		}
	}), de = S.useMemo(() => ({
		onFocus(e) {
			B.current = !0, se(e);
		},
		onClick: ({ currentTarget: e }) => e.focus({ preventScroll: !0 }),
		onMouseMove(e) {
			B.current = !0, V.current = !1, p && se(e);
		},
		onPointerLeave(e) {
			if (!W.current || !L.current || e.pointerType === "touch") return;
			B.current = !0;
			let t = e.relatedTarget;
			if (!(!p || n.current.includes(t)) && ne.current && (H.current?.(), H.current = null, F.current = -1, R(e), !d)) {
				let e = j.current, t = $a(ei(e));
				e && X(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		se,
		W,
		j,
		p,
		n,
		R,
		ne,
		d
	]), fe = S.useMemo(() => d && T && oe && { "aria-activedescendant": `${v}-${r}` }, [
		d,
		T,
		oe,
		v,
		r
	]), pe = S.useMemo(() => ({
		"aria-orientation": g === "both" ? void 0 : g,
		...A ? {} : fe,
		onKeyDown(e) {
			if (e.key === "Tab" && e.shiftKey && T && !d) {
				let t = eo(e.nativeEvent);
				if (t && !X(j.current, t)) return;
				Va(e), w.setOpen(!1, Wi(Li, e.nativeEvent)), pr(D) && D.focus();
				return;
			}
			ue(e);
		},
		onPointerMove() {
			L.current = !0;
		}
	}), [
		fe,
		ue,
		j,
		g,
		A,
		w,
		T,
		d,
		D
	]), me = S.useMemo(() => {
		function e(e) {
			w.setOpen(!0, Wi(zi, e.nativeEvent, e.currentTarget));
		}
		function t(e) {
			f === "auto" && Ua(e.nativeEvent) && (P.current = !d);
		}
		function n(e) {
			P.current = f, f === "auto" && Wa(e.nativeEvent) && (P.current = !0);
		}
		return {
			onKeyDown(t) {
				let n = w.select("open");
				L.current = !1;
				let r = t.key.startsWith("Arrow"), i = ju(t.key, ce(), u), a = ku(t.key, g), o = (l ? i : a) || t.key === "Enter" || t.key.trim() === "";
				if (d && n) return ue(t);
				if (!(!n && !m && r)) {
					if (o) {
						let e = ku(t.key, ce());
						I.current = l && e ? null : t.key;
					}
					if (l) {
						i && (Va(t), n ? (F.current = le(), R(t)) : e(t));
						return;
					}
					a && (te.current != null && (F.current = te.current), Va(t), !n && m ? e(t) : ue(t), n && R(t));
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
		ue,
		f,
		le,
		l,
		R,
		w,
		m,
		g,
		ce,
		u,
		te,
		d
	]), he = S.useMemo(() => ({
		...fe,
		...me
	}), [fe, me]);
	return S.useMemo(() => a ? {
		reference: he,
		floating: pe,
		item: de,
		trigger: me
	} : {}, [
		a,
		he,
		pe,
		me,
		de
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function Pu(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = "rootStore" in e ? e.rootStore : e, f = d.useState("open"), p = An(), m = S.useRef(""), h = S.useRef(u ?? i ?? -1), g = S.useRef(null), _ = J((e) => {
		function t(e) {
			let t = r?.current[e];
			return !t || es(t);
		}
		function c(e) {
			return t(e) ? o == null || !Qo(Ot, e, o) : !1;
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
		if (m.current.length > 0 && e.key === " " && (Va(e), s?.(!0)), m.current.length > 0 && m.current[0] !== " " && d(_, m.current) === -1 && e.key !== " " && s?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (Va(e), s?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && c(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, s?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = d(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", s?.(!1)) : (a?.(b), g.current = b);
	}), v = J((e) => {
		let t = e.relatedTarget, n = d.select("domReferenceElement"), r = d.select("floatingElement");
		X(n, t) || X(r, t) || (p.clear(), m.current = "", h.current = g.current, s?.(!1));
	});
	Y(() => {
		!f && u !== null || (p.clear(), g.current = null, m.current !== "" && (m.current = ""));
	}, [
		f,
		u,
		p
	]), Y(() => {
		f && m.current === "" && (h.current = u ?? i ?? -1);
	}, [
		f,
		u,
		i
	]);
	let y = S.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return S.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
var Fu = .1, Iu = Fu * Fu, Lu = .5;
function Ru(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function zu(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return Ru(e, t, n, r, i, a) && (u = !u), Ru(e, t, i, a, o, s) && (u = !u), Ru(e, t, o, s, c, l) && (u = !u), Ru(e, t, c, l, n, r) && (u = !u), u;
}
function Bu(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function Vu(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function Hu(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new kn(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Iu;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = eo(r), g = r.type === "mouseleave", _ = X(u, h), v = X(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && fr(r.relatedTarget) && X(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Es(s.nodesRef.current, o).length > 0);
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
					j = Vu(d, f, D, x.top + 1, O, S.bottom - 1);
					break;
				case "bottom":
					j = Vu(d, f, D, S.top + 1, O, x.bottom - 1);
					break;
				case "left":
					j = Vu(d, f, S.right - 1, A, x.left + 1, k);
					break;
				case "right": j = Vu(d, f, x.right - 1, A, S.left + 1, k);
			}
			if (j) return;
			if (l && !Bu(d, f, x)) {
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
					let n = T ? Lu / 2 : Lu * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t + Lu + 1, o = C || T ? S.bottom - Lu : S.top, s = C ? T ? S.bottom - Lu : S.top : S.bottom - Lu;
					M = zu(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "bottom": {
					let n = T ? Lu / 2 : Lu * 4, r = T || C ? e + n : e - n, i = T ? e - n : C ? e + n : e - n, a = t - Lu, o = C || T ? S.top + Lu : S.bottom, s = C ? T ? S.top + Lu : S.bottom : S.top + Lu;
					M = zu(d, f, r, a, i, a, S.left, o, S.right, s);
					break;
				}
				case "left": {
					let n = E ? Lu / 2 : Lu * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e + Lu + 1, o = w || E ? S.right - Lu : S.left, s = w ? E ? S.right - Lu : S.left : S.right - Lu;
					M = zu(d, f, o, S.top, s, S.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = E ? Lu / 2 : Lu * 4, r = E || w ? t + n : t - n, i = E ? t - n : w ? t + n : t - n, a = e - Lu, o = w || E ? S.left + Lu : S.right, s = w ? E ? S.left + Lu : S.right : S.left + Lu;
					M = zu(d, f, a, r, a, i, o, S.top, s, S.bottom);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toolbar/root/ToolbarRootContext.mjs
var Uu = /*#__PURE__*/ S.createContext(void 0);
function Wu(e) {
	let t = S.useContext(Uu);
	if (t === void 0 && !e) throw Error(mt(69));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/composite.mjs
var Gu = "ArrowUp", Ku = "ArrowDown", qu = "ArrowLeft", Ju = "ArrowRight", Yu = "Home", Xu = /* @__PURE__ */ new Set([qu, Ju]), Zu = /* @__PURE__ */ new Set([Gu, Ku]), Qu = /* @__PURE__ */ new Set([...Xu, ...Zu]), $u = /* @__PURE__ */ new Set([
	...Qu,
	Yu,
	"End"
]);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function ed(e) {
	return e === "starting" ? Us : kt;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var td = {
	...fa,
	...bn
}, nd = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s } = na(), { side: c, align: l } = ea(), u = Wu(!0) != null, d = s.useState("open"), f = s.useState("transitionStatus"), p = s.useState("popupProps"), m = s.useState("mounted"), h = s.useState("instantType"), g = s.useState("activeTriggerElement"), _ = s.useState("parent"), v = s.useState("lastOpenChangeReason"), y = s.useState("rootId"), b = s.useState("floatingRootContext"), x = s.useState("floatingTreeRoot"), C = s.useState("closeDelay"), w = s.useState("activeTriggerElement"), T = s.useState("hoverEnabled"), E = s.useState("disabled"), D = s.useState("openMethod"), O = _.type === "context-menu";
	Cn({
		open: d,
		ref: s.context.popupRef,
		onComplete() {
			d && s.context.onOpenChangeComplete?.(!0);
		}
	}), S.useEffect(() => {
		function e(e) {
			s.setOpen(!1, Wi(e.reason, e.domEvent));
		}
		return x.events.on("close", e), () => {
			x.events.off("close", e);
		};
	}, [x.events, s]), wu(b, {
		enabled: T && !E && !O && _.type !== "menubar",
		closeDelay: C
	});
	let k = S.useCallback((e) => {
		s.set("popupElement", e);
	}, [s]), A = Jt("div", e, {
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
		stateAttributesMapping: td,
		props: [
			p,
			{ onKeyDown(e) {
				u && $u.has(e.key) && e.stopPropagation();
			} },
			ed(f),
			o,
			{ "data-rootownerid": y }
		]
	}), j = _.type === void 0 || O;
	return (g || _.type === "menubar" && v !== "outside-press") && (j = !0), /*#__PURE__*/ (0, q.jsx)(hc, {
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
}), rd = /*#__PURE__*/ S.createContext(void 0);
function id() {
	let e = S.useContext(rd);
	if (e === void 0) throw Error(mt(32));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var ad = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = na();
	return i.useState("mounted") || n ? /*#__PURE__*/ (0, q.jsx)(rd.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, q.jsx)(Zs, {
			ref: t,
			...r
		})
	}) : null;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/inertValue.mjs
function od(e) {
	return wt(19) ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var sd = /*#__PURE__*/ S.createContext(void 0);
function cd() {
	return S.useContext(sd)?.direction ?? "ltr";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var ld = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0, offsetParent: d = "real" } = Oo(e, t) || {};
		if (l == null) return {};
		let f = Ko(u), p = {
			x: n,
			y: r
		}, m = Po(i), h = Mo(m), g = await o.getDimensions(l), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = a.reference[h] + a.reference[m] - p[m] - a.floating[h], S = p[m] - a.reference[m], C = d === "real" ? await o.getOffsetParent?.(l) : s.floating, w = s.floating[b] || a.floating[h];
		(!w || !await o.isElement?.(C)) && (w = s.floating[b] || a.floating[h]);
		let T = x / 2 - S / 2, E = w / 2 - g[h] / 2 - 1, D = Math.min(f[v], E), O = Math.min(f[y], E), k = D, A = w - g[h] - O, j = w / 2 - g[h] / 2 + T, M = Do(k, j, A), N = !c.arrow && Ao(i) != null && j !== M && a.reference[h] / 2 - (j < k ? D : O) - g[h] / 2 < 0, P = N ? j < k ? j - k : j - A : 0;
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
}), ud = (e, t) => ({
	...ld(e),
	options: [e, t]
}), dd = Dl().fn, fd = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0;
		return { data: { referenceHidden: (await dd(e)).data?.referenceHidden || a } };
	}
}, pd = {
	sideX: "left",
	sideY: "top"
}, md = {
	name: "adaptiveOrigin",
	async fn(e) {
		let { x: t, y: n, rects: { floating: r }, elements: { floating: i }, platform: a, strategy: o, placement: s } = e, c = lr(i), l = c.getComputedStyle(i);
		if (l.transitionDuration === "0s" || l.transitionDuration === "") return {
			x: t,
			y: n,
			data: pd
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
			let e = ei(i);
			d = {
				width: e.documentElement.clientWidth,
				height: e.documentElement.clientHeight
			};
		} else await a.isElement?.(u) && (d = await a.getDimensions(u));
		let f = ko(s), p = t, m = n;
		f === "left" && (p = d.width - (t + r.width)), f === "top" && (m = d.height - (n + r.height));
		let h = f === "left" ? "right" : pd.sideX, g = f === "top" ? "bottom" : pd.sideY;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchorPositioning.mjs
function hd(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function gd(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: hd(t, ko(i), n),
		align: Ao(i) || "center",
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
function _d(e) {
	let { anchor: t, positionMethod: n = "absolute", side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, collisionBoundary: s, collisionPadding: c = 5, sticky: l = !1, arrowPadding: u = 5, disableAnchorTracking: d = !1, inline: f, keepMounted: p = !1, floatingRootContext: m, mounted: h, collisionAvoidance: g, shiftCrossAxis: _ = !1, nodeId: v, adaptiveOrigin: y, lazyFlip: b = !1, externalTree: x } = e, [C, w] = S.useState(null);
	!h && C !== null && w(null);
	let T = g.side || "flip", E = g.align || "flip", D = g.fallbackAxisSide || "end", O = typeof t == "function" ? t : void 0, k = J(O), A = O ? k : t, j = _o(t), M = _o(h), N = cd() === "rtl", P = C || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": N ? "left" : "right",
		"inline-start": N ? "right" : "left"
	}[r], F = a === "center" ? P : `${P}-${a}`, I = c, L = +(r === "bottom"), R = +(r === "top"), z = +(r === "right"), ee = +(r === "left");
	typeof I == "number" ? I = {
		top: I + L,
		right: I + ee,
		bottom: I + R,
		left: I + z
	} : I &&= {
		top: (I.top || 0) + L,
		right: (I.right || 0) + ee,
		bottom: (I.bottom || 0) + R,
		left: (I.left || 0) + z
	};
	let B = {
		boundary: s === "clipping-ancestors" ? "clippingAncestors" : s,
		padding: I
	}, V = S.useRef(null), H = _o(i), U = _o(o), W = typeof i == "function" ? 0 : i, te = typeof o == "function" ? 0 : o, ne = [];
	f && ne.push(f), ne.push(Sl((e) => {
		let t = gd(e, r, N), n = typeof H.current == "function" ? H.current(t) : H.current, i = typeof U.current == "function" ? U.current(t) : U.current;
		return {
			mainAxis: n,
			crossAxis: i,
			alignmentAxis: i
		};
	}, [
		W,
		te,
		N,
		r
	]));
	let re = E === "none" && T !== "shift", ie = !re && (l || _ || T === "shift"), ae = T === "none" ? null : Tl({
		...B,
		padding: {
			top: I.top + 1,
			right: I.right + 1,
			bottom: I.bottom + 1,
			left: I.left + 1
		},
		mainAxis: !_ && T === "flip",
		crossAxis: E === "flip" && "alignment",
		fallbackAxisSideDirection: D
	}), oe = re ? null : Cl((e) => {
		let t = ei(e.elements.floating).documentElement;
		return {
			...B,
			rootBoundary: _ ? {
				x: 0,
				y: 0,
				width: t.clientWidth,
				height: t.clientHeight
			} : void 0,
			mainAxis: E !== "none",
			crossAxis: ie,
			limiter: l || _ ? void 0 : wl((e) => {
				if (!V.current) return {};
				let { width: t, height: n } = V.current.getBoundingClientRect(), r = No(ko(e.placement)), i = r === "y" ? t : n, a = r === "y" ? I.left + I.right : I.top + I.bottom;
				return { offset: i / 2 + a / 2 };
			})
		};
	}, [
		B,
		l,
		_,
		I,
		E
	]);
	T === "shift" || E === "shift" || a === "center" ? ne.push(oe, ae) : ne.push(ae, oe), ne.push(El({
		...B,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!M.current) return;
			let i = e.style;
			i.setProperty("--available-width", `${t}px`), i.setProperty("--available-height", `${n}px`);
			let a = lr(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty("--anchor-width", `${u}px`), i.setProperty("--anchor-height", `${d}px`);
		}
	}), ud((e) => ({
		element: V.current || ei(e.elements.floating).createElement("div"),
		padding: u,
		offsetParent: "floating"
	}), [u]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: t, middlewareData: n, placement: a, rects: o, y: s } = e, c = ko(a), l = No(c), u = V.current, d = n.arrow?.x || 0, f = n.arrow?.y || 0, p = u?.clientWidth || 0, m = u?.clientHeight || 0, h = d + p / 2, g = f + m / 2, _ = Math.abs(n.shift?.y || 0), v = o.reference.height / 2, y = typeof i == "function" ? i(gd(e, r, N)) : i, b = _ > y, x = {
				top: `${h}px calc(100% + ${y}px)`,
				bottom: `${h}px ${-y}px`,
				left: `calc(100% + ${y}px) ${g}px`,
				right: `${-y}px ${g}px`
			}[c], S = `${h}px ${o.reference.y + v - s}px`;
			return t.floating.style.setProperty("--transform-origin", ie && l === "y" && b ? S : x), {};
		}
	}, fd, y), Y(() => {
		!h && m && m.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [h, m]);
	let se = S.useMemo(() => ({
		elementResize: !d && typeof ResizeObserver < "u",
		layoutShift: !d && typeof IntersectionObserver < "u"
	}), [d]), { refs: ce, elements: le, x: ue, y: de, middlewareData: fe, update: pe, placement: me, context: he, isPositioned: ge, floatingStyles: _e } = gu({
		rootContext: m,
		open: p ? h : void 0,
		placement: F,
		middleware: ne,
		strategy: n,
		whileElementsMounted: p ? void 0 : (...e) => cl(...e, se),
		nodeId: v,
		externalTree: x
	}), { sideX: ve, sideY: ye } = fe.adaptiveOrigin || pd, be = ge ? n : "fixed", xe = S.useMemo(() => {
		let e = y ? {
			position: be,
			[ve]: ue,
			[ye]: de
		} : {
			position: be,
			..._e
		};
		return ge || (e.opacity = 0), e;
	}, [
		y,
		be,
		ve,
		ue,
		ye,
		de,
		_e,
		ge
	]), Se = S.useRef(null);
	Y(() => {
		if (!h) return;
		let e = j.current, t = typeof e == "function" ? e() : e, n = (vd(t) ? t.current : t) || null;
		n !== Se.current && (ce.setPositionReference(n), Se.current = n);
	}, [
		h,
		ce,
		A,
		j
	]), S.useEffect(() => {
		if (!h) return;
		let e = j.current;
		typeof e != "function" && vd(e) && e.current !== Se.current && (ce.setPositionReference(e.current), Se.current = e.current);
	}, [
		h,
		ce,
		A,
		j
	]), S.useEffect(() => {
		if (p && h && le.reference && le.floating) return cl(le.reference, le.floating, pe, se);
	}, [
		p,
		h,
		le,
		pe,
		se
	]);
	let Ce = ko(me), we = hd(r, Ce, N), Te = Ao(me) || "center", Ee = !!fe.hide?.referenceHidden;
	Y(() => {
		b && h && ge && w(Ce);
	}, [
		b,
		h,
		ge,
		Ce
	]);
	let De = S.useMemo(() => ({
		position: "absolute",
		top: fe.arrow?.y,
		left: fe.arrow?.x
	}), [fe.arrow]), Oe = fe.arrow?.centerOffset !== 0;
	return S.useMemo(() => ({
		positionerStyles: xe,
		arrowStyles: De,
		arrowRef: V,
		arrowUncentered: Oe,
		side: we,
		align: Te,
		physicalSide: Ce,
		anchorHidden: Ee,
		refs: ce,
		context: he,
		isPositioned: ge,
		update: pe
	}), [
		xe,
		De,
		V,
		Oe,
		we,
		Te,
		Ce,
		Ee,
		ce,
		he,
		ge,
		pe
	]);
}
function vd(e) {
	return e != null && "current" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function yd(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = J(i), o = S.useRef(0), s = gt(xd).current, c = gt(bd).current, [l, u] = S.useState(0), d = S.useRef(l), f = J((e, t) => {
		c.set(e, t ?? null), d.current += 1, u(d.current);
	}), p = J((e) => {
		c.delete(e), d.current += 1, u(d.current);
	}), m = S.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return Array.from(c.keys()).filter((e) => e.isConnected).sort(Sd).forEach((t, n) => {
			let r = c.get(t) ?? {};
			e.set(t, {
				...r,
				index: n
			});
		}), e;
	}, [c, l]);
	Y(() => {
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
	}, [m]), Y(() => {
		d.current === l && (n.current.length !== m.size && (n.current.length = m.size), r && r.current.length !== m.size && (r.current.length = m.size), o.current = m.size), a(m);
	}, [
		a,
		m,
		n,
		r,
		l
	]), Y(() => () => {
		n.current = [];
	}, [n]), Y(() => () => {
		r && (r.current = []);
	}, [r]);
	let h = J((e) => (s.add(e), () => {
		s.delete(e);
	}));
	Y(() => {
		s.forEach((e) => e(m));
	}, [s, m]);
	let g = S.useMemo(() => ({
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
	return /*#__PURE__*/ (0, q.jsx)(Ma.Provider, {
		value: g,
		children: t
	});
}
function bd() {
	return /* @__PURE__ */ new Map();
}
function xd() {
	return /* @__PURE__ */ new Set();
}
function Sd(e, t) {
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var Cd = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, q.jsx)("div", {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/usePositioner.mjs
function wd(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), Jt("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			ed(r),
			i
		],
		stateAttributesMapping: fa
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useScrollLock.mjs
var Td = {}, Ed = {}, Dd = "";
function Od(e) {
	if (typeof document > "u") return !1;
	let t = ei(e);
	return lr(t).innerWidth - t.documentElement.clientWidth > 0;
}
function kd(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = ei(e), n = t.documentElement, r = t.body, i = hr(n) ? n : r, a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Ad(e) {
	let t = ei(e), n = t.documentElement, r = t.body, i = hr(n) ? n : r, a = {
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
function jd(e) {
	let t = ei(e), n = t.documentElement, r = t.body, i = lr(n), a = 0, o = 0, s = !1, c = mn.create();
	if (Ea && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, Td = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, Dd = n.style.scrollBehavior, Ed = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = hr(n) ? n : r;
		if (s = kd(e), s) {
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
		Object.assign(n.style, Td), Object.assign(r.style, Ed), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Dd);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = ho(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var Md = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = kn.create();
	timeoutUnlock = kn.create();
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
		let t = ei(e).documentElement, n = lr(t).getComputedStyle(t).overflowY;
		if (n === "hidden" || n === "clip") {
			this.restore = Dt;
			return;
		}
		let r = xa || !Od(e);
		this.restore = r ? Ad(e) : jd(e);
	}
}();
function Nd(e = !0, t = null) {
	Y(() => {
		if (e) return Md.acquire(t);
	}, [e, t]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Pd = 20;
function Fd(e, t, n, r) {
	let [i, a] = S.useState(!1);
	Y(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = ei(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Pd);
	}, [
		e,
		t,
		n
	]), Nd(e && (!t || i), r);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Id = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = Ws, style: g, ..._ } = e, { store: v } = na(), y = id(), b = ma(!0), x = v.useState("parent"), C = v.useState("floatingRootContext"), w = v.useState("floatingTreeRoot"), T = v.useState("mounted"), E = v.useState("open"), D = v.useState("modal"), O = v.useState("openMethod"), k = v.useState("activeTriggerElement"), A = v.useState("transitionStatus"), j = v.useState("positionerElement"), M = v.useState("instantType"), N = v.useState("hasViewport"), P = v.useState("lastOpenChangeReason"), F = v.useState("floatingNodeId"), I = v.useState("floatingParentNodeId"), L = C.useState("domReferenceElement"), R = S.useRef(null), z = Sn(j, !1, !1), ee = n, B = c, V = l, H = s, U = h;
	x.type === "context-menu" && (ee = n ?? x.context?.anchor, H ??= "start", !o && H !== "center" && (V = e.alignOffset ?? 2, B = e.sideOffset ?? -5));
	let W = o, te = H;
	x.type === "menu" ? (W ??= "inline-end", te ??= "start", U = e.collisionAvoidance ?? Gs) : x.type === "menubar" && (W ??= x.context.orientation === "vertical" ? "inline-end" : "bottom", te ??= "start");
	let ne = x.type === "context-menu", re = _d({
		anchor: ee,
		floatingRootContext: C,
		positionMethod: b ? "fixed" : r,
		mounted: T,
		side: W,
		sideOffset: B,
		align: te,
		alignOffset: V,
		arrowPadding: ne ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: F,
		keepMounted: y,
		disableAnchorTracking: m,
		collisionAvoidance: U,
		shiftCrossAxis: ne && !("side" in U && U.side === "flip"),
		externalTree: w,
		adaptiveOrigin: N ? md : void 0
	});
	S.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === F && v.set("hoverEnabled", !1), e.nodeId !== F && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Wi(Vi)));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [
		v,
		w.events,
		F
	]), S.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, Wi(t));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [w.events, v]);
	let ie = An();
	S.useEffect(() => {
		E || ie.clear();
	}, [E, ie]), S.useEffect(() => {
		function e(e) {
			if (!(!E || e.nodeId !== v.select("floatingParentNodeId"))) if (e.target && k && k !== e.target) {
				let e = v.select("closeDelay");
				e > 0 ? ie.isStarted() || ie.start(e, () => {
					v.setOpen(!1, Wi(Vi));
				}) : v.setOpen(!1, Wi(Vi));
			} else ie.clear();
		}
		return w.events.on("itemhover", e), () => {
			w.events.off("itemhover", e);
		};
	}, [
		w.events,
		E,
		k,
		v,
		ie
	]), S.useEffect(() => {
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
	]), Y(() => {
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
	let ae = {
		open: E,
		side: re.side,
		align: re.align,
		anchorHidden: re.anchorHidden,
		nested: x.type === "menu",
		instant: M
	}, oe = x.type === "menubar" && x.context.modal;
	Fd(E && (oe || D && P !== "trigger-hover"), O === "touch", j, k);
	let se = wd(e, ae, {
		styles: re.positionerStyles,
		transitionStatus: A,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !T,
		inert: !E
	}), ce = T && x.type !== "menu" && (x.type !== "menubar" && D && P !== "trigger-hover" || x.type === "menubar" && x.context.modal), le = null;
	return x.type === "menubar" ? le = x.context.contentElement : x.type === void 0 && (le = k), /*#__PURE__*/ (0, q.jsxs)($i.Provider, {
		value: re,
		children: [ce && /*#__PURE__*/ (0, q.jsx)(Cd, {
			ref: x.type === "context-menu" || x.type === "nested-context-menu" ? x.context.internalBackdropRef : null,
			inert: od(!E),
			cutout: le
		}), /*#__PURE__*/ (0, q.jsx)(ac, {
			id: F,
			children: /*#__PURE__*/ (0, q.jsx)(yd, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				children: se
			})
		})]
	});
}), Ld = /*#__PURE__*/ S.createContext(null);
function Rd(e) {
	let t = S.useContext(Ld);
	if (t === null && !e) throw Error(mt(5));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function zd(e) {
	let t = S.useRef(""), n = S.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: S.useCallback((n) => {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useOpenInteractionType.mjs
function Bd(e, t) {
	let { onClick: n, onPointerDown: r } = zd(J((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (xa ? "touch" : ""));
	}));
	return S.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function Vd(e) {
	let [t, n] = S.useState(null), r = Bd(e, n);
	return Gi(e, (t) => {
		t && !e && n(null);
	}), S.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/store/MenuStore.mjs
var Hd = {
	...mu,
	disabled: Z((e) => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled),
	modal: Z((e) => (e.parent.type === void 0 || e.parent.type === "context-menu") && (e.modal ?? !0)),
	openMethod: Z((e) => e.openMethod),
	allowMouseEnter: Z((e) => e.allowMouseEnter),
	highlightItemOnHover: Z((e) => e.highlightItemOnHover),
	stickIfOpen: Z((e) => e.stickIfOpen),
	parent: Z((e) => e.parent),
	rootId: Z((e) => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type === void 0 ? e.rootId : e.parent.context.rootId),
	activeIndex: Z((e) => e.activeIndex),
	isActive: Z((e, t) => e.activeIndex === t),
	hoverEnabled: Z((e) => e.hoverEnabled),
	instantType: Z((e) => e.instantType),
	lastOpenChangeReason: Z((e) => e.openChangeReason),
	floatingTreeRoot: Z((e) => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot),
	floatingNodeId: Z((e) => e.floatingNodeId),
	floatingParentNodeId: Z((e) => e.floatingParentNodeId),
	itemProps: Z((e) => e.itemProps),
	closeDelay: Z((e) => e.closeDelay),
	hasViewport: Z((e) => e.hasViewport),
	keyboardEventRelay: Z((e) => {
		if (e.keyboardEventRelay) return e.keyboardEventRelay;
		if (e.parent.type === "menu") return e.parent.store.select("keyboardEventRelay");
	})
}, Ud = class e extends ql {
	constructor(e) {
		super({
			...Wd(),
			...e
		}, {
			positionerRef: /*#__PURE__*/ S.createRef(),
			popupRef: /*#__PURE__*/ S.createRef(),
			typingRef: { current: !1 },
			itemDomElements: { current: [] },
			itemLabels: { current: [] },
			allowMouseUpTriggerRef: { current: !1 },
			triggerFocusTargetRef: /*#__PURE__*/ S.createRef(),
			beforeContentFocusGuardRef: /*#__PURE__*/ S.createRef(),
			onOpenChangeComplete: void 0,
			triggerElements: new ou()
		}, Hd), this.unsubscribeParentListener = this.observe("parent", (e) => {
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
		let r = gt(() => new e(n)).current;
		return t ?? r;
	}
	unsubscribeParentListener = null;
};
function Wd() {
	return {
		...cu(),
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
		floatingTreeRoot: new $s(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: kt,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		hasViewport: !1
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var Gd = /*#__PURE__*/ S.createContext(void 0);
function Kd() {
	return S.useContext(Gd);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var qd = Ll(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, defaultOpen: a = !1, disabled: o = !1, modal: s, loopFocus: c = !0, orientation: l = "vertical", actionsRef: u, closeParentOnEsc: d = !1, handle: f, triggerId: p, defaultTriggerId: m = null, highlightItemOnHover: h = !0 } = e, g = ma(!0), _ = na(!0), v = Rd(!0), y = Kd(), b = S.useMemo(() => y && _ ? {
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
	]), x = Ud.useStore(f?.store, {
		open: a,
		openProp: n,
		activeTriggerId: m,
		triggerIdProp: p,
		parent: b
	});
	tu(x, n, a, m), x.useControlledProp("openProp", n), x.useControlledProp("triggerIdProp", p), x.useContextCallback("onOpenChangeComplete", i);
	let C = fi(), w = fi(), T = x.useState("floatingTreeRoot"), E = ic(T), D = nc(), O = x.useState("open"), k = x.useState("activeTriggerElement"), A = x.useState("positionerElement"), j = x.useState("hoverEnabled"), M = x.useState("disabled"), N = x.useState("lastOpenChangeReason"), P = x.useState("parent"), F = x.useState("activeIndex"), I = x.useState("payload"), L = x.useState("floatingParentNodeId"), R = S.useRef(null), z = S.useRef(P.type !== "context-menu"), ee = An(), B = S.useRef(!0), V = An(), H = L != null, { openMethod: U, triggerProps: W } = Vd(O);
	x.useSyncedValues({
		disabled: o,
		highlightItemOnHover: h,
		modal: P.type === void 0 ? s : void 0,
		openMethod: U,
		rootId: C
	}), ru(x);
	let { forceUnmount: te } = iu(O, x, () => {
		x.update({
			allowMouseEnter: !1,
			stickIfOpen: !0
		});
	});
	Y(() => {
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
	]), S.useEffect(() => {
		if (O || (R.current = null), P.type === "context-menu") {
			if (!O) {
				ee.clear(), z.current = !1;
				return;
			}
			ee.start(500, () => {
				z.current = !0;
			});
		}
	}, [
		ee,
		O,
		P.type
	]), Y(() => {
		!O && !j && x.set("hoverEnabled", !0);
	}, [
		O,
		j,
		x
	]);
	let ne = J((e, t) => {
		let n = t.reason;
		if (O === e && t.trigger === k && N === n) return;
		let i = eu(t);
		if (!e && t.trigger == null && (t.trigger = k ?? void 0), r?.(e, t), t.isCanceled) return;
		x.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && a?.type === "click" && a.pointerType === "touch" && !B.current) return;
		e && n === "trigger-focus" ? (B.current = !1, V.start(300, () => {
			B.current = !0;
		})) : (B.current = !0, V.clear());
		let o = (n === "trigger-press" || n === "item-press") && a.detail === 0 && a?.isTrusted, s = !e && (n === "escape-key" || n == null), c = {
			open: e,
			openChangeReason: n
		};
		R.current = t.event ?? null, $l(c, e, t.trigger, i()), x.update(c), P.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? x.set("instantType", "group") : o || s ? x.set("instantType", o ? "click" : "dismiss") : x.set("instantType", void 0);
	}), re = Xl({
		popupStore: x,
		floatingId: w,
		nested: D != null,
		onOpenChange: ne
	}), ie = re.context.events;
	S.useEffect(() => {
		let e = ({ open: e, eventDetails: t }) => ne(e, t);
		return ie.on("setOpen", e), () => {
			ie?.off("setOpen", e);
		};
	}, [ie, ne]);
	let ae = S.useCallback(() => {
		x.setOpen(!1, Wi(Hi));
	}, [x]);
	S.useImperativeHandle(u, () => ({
		unmount: te,
		close: ae
	}), [te, ae]);
	let oe;
	P.type === "context-menu" && (oe = P.context), S.useImperativeHandle(oe?.positionerRef, () => A, [A]), S.useImperativeHandle(oe?.actionsRef, () => ({ setOpen: ne }), [ne]);
	let se = yc(re, {
		enabled: !M,
		bubbles: { escapeKey: d && P.type === "menu" },
		outsidePress() {
			return P.type !== "context-menu" || R.current?.type === "contextmenu" || z.current;
		},
		externalTree: H ? T : void 0
	}), ce = cd(), le = S.useCallback((e) => {
		x.select("activeIndex") !== e && x.set("activeIndex", e);
	}, [x]), ue = Nu(re, {
		enabled: !M,
		listRef: x.context.itemDomElements,
		activeIndex: F,
		nested: P.type !== void 0,
		loopFocus: c,
		orientation: l,
		parentOrientation: P.type === "menubar" ? P.context.orientation : void 0,
		rtl: ce === "rtl",
		disabledIndices: Ot,
		onNavigate: le,
		openOnArrowKeyDown: P.type !== "context-menu",
		externalTree: H ? T : void 0,
		focusItemOnHover: h
	}), de = S.useCallback((e) => {
		x.context.typingRef.current = e;
	}, [x]), fe = Pu(re, {
		enabled: !M,
		listRef: x.context.itemLabels,
		elementsRef: x.context.itemDomElements,
		activeIndex: F,
		resetMs: 500,
		onMatch: (e) => {
			O && e !== F && x.set("activeIndex", e);
		},
		onTyping: de
	});
	au(x, {
		floatingRootContext: re,
		activeTriggerProps: S.useMemo(() => {
			let e = Pt(fe.reference, ue.reference, se.reference, { onMouseMove() {
				x.set("allowMouseEnter", !0);
			} }, W);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = O, e;
		}, [
			x,
			fe.reference,
			ue.reference,
			se.reference,
			W,
			O
		]),
		inactiveTriggerProps: S.useMemo(() => {
			let e = Pt(ue.trigger, se.trigger, W);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			ue.trigger,
			se.trigger,
			W
		]),
		popupProps: S.useMemo(() => Pt(Zl, {
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
		}, fe.floating, ue.floating, se.floating), [
			k,
			w,
			P.type,
			x,
			fe.floating,
			ue.floating,
			se.floating
		]),
		itemProps: ue.item ?? kt
	});
	let pe = S.useMemo(() => ({
		store: x,
		parent: b
	}), [x, b]), me = /*#__PURE__*/ (0, q.jsx)(ta.Provider, {
		value: pe,
		children: typeof t == "function" ? t({ payload: I }) : t
	});
	return P.type === void 0 || P.type === "context-menu" ? /*#__PURE__*/ (0, q.jsx)(oc, {
		externalTree: T,
		children: me
	}) : me;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function Jd(e) {
	let t = e.getBoundingClientRect(), n = lr(e);
	if (Oa) return t;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/item/useCompositeItem.mjs
function Yd(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Nr(), { ref: i, index: a } = Fa(e), o = n === a, s = S.useRef(null), c = _t(i, s);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/item/CompositeItem.mjs
function Xd(e) {
	let { render: t, className: n, style: r, state: i = kt, props: a = Ot, refs: o = Ot, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = Yd({ metadata: s });
	return Jt(l, e, {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/utils/findRootOwnerId.mjs
function Zd(e) {
	if (pr(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid") ?? void 0;
	if (!Tr(e)) return Zd(Or(e));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function Qd(e, t) {
	let n = S.useRef(null);
	function r(t) {
		xn.flushSync(() => {
			e.setOpen(!1, Wi(Li, t.nativeEvent, t.currentTarget));
		}), Ss(n.current)?.focus();
	}
	function i(n) {
		let r = e.select("positionerElement");
		if (r && Cs(n, r)) e.context.beforeContentFocusGuardRef.current?.focus();
		else {
			xn.flushSync(() => {
				e.setOpen(!1, Wi(Li, n.nativeEvent, n.currentTarget));
			});
			let i = xs(e.context.triggerFocusTargetRef.current || t.current);
			for (; i !== null && X(r, i);) {
				let e = i;
				if (i = vs(i), i === e) break;
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useMixedToggleClickHandler.mjs
function $d(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = S.useRef(!1);
	return S.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, ei(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : kt, [
		t,
		n,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var ef = 2, tf = Rl(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = na(!0), h = d?.store ?? m?.store;
	if (!h) throw Error(mt(85));
	let g = pi(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = S.useRef(null), C = rf(), w = Nr(!0), T = rc(), E = S.useMemo(() => T ?? new $s(), [T]), { registerTrigger: D, isMountedByThisTrigger: O } = nu(g, x, h, {
		payload: f,
		closeDelay: u,
		parent: C,
		floatingTreeRoot: E,
		floatingNodeId: ic(E),
		floatingParentNodeId: nc(),
		keyboardEventRelay: w?.relayKeyboardEvent
	}), k = C.type === "menubar", A = h.useState("disabled"), j = a || A || k && C.context.disabled, { getButtonProps: M, buttonRef: N } = Fr({
		disabled: j,
		native: o
	});
	S.useEffect(() => {
		!y && C.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		y,
		C.type
	]);
	let P = S.useRef(null), F = An(), I = J((e) => {
		if (!P.current) return;
		F.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		if (X(P.current, t) || X(h.select("positionerElement"), t) || t === P.current || t != null && Zd(t) === h.select("rootId")) return;
		let n = Jd(P.current);
		e.clientX >= n.left - ef && e.clientX <= n.right + ef && e.clientY >= n.top - ef && e.clientY <= n.bottom + ef || E.events.emit("close", {
			domEvent: e,
			reason: Bi
		});
	});
	S.useEffect(() => {
		y && h.select("lastOpenChangeReason") === "trigger-hover" && ei(P.current).addEventListener("mouseup", I, { once: !0 });
	}, [
		y,
		I,
		h
	]);
	let L = k && C.context.hasSubmenuOpen, R = Eu(v, {
		enabled: (c ?? L) && !j && C.type !== "context-menu" && (!k || L && !O),
		handleClose: Hu({ blockPointerEvents: !k }),
		mouseOnly: !0,
		move: !1,
		restMs: C.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: x,
		externalTree: E,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), z = nf(y, h.select("lastOpenChangeReason")), ee = gc(v, {
		enabled: !j && C.type !== "context-menu",
		event: y && k ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: C.type === void 0 && z
	}), B = vu(v, { enabled: !j && L }), V = $d({
		open: y,
		enabled: k,
		mouseDownAction: "open"
	}), H = S.useMemo(() => Pt(B.reference, ee.reference), [B.reference, ee.reference]), U = h.useState("triggerProps", O), { preFocusGuardRef: W, handlePreFocusGuardFocus: te, handleFocusTargetFocus: ne } = Qd(h, x), re = {
		disabled: j,
		open: y
	}, ie = [
		P,
		t,
		N,
		D,
		x
	], ae = [
		H,
		R ?? kt,
		U,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (F.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), ei(e.currentTarget).addEventListener("mouseup", I, { once: !0 }));
			}
		},
		k ? { role: "menuitem" } : {},
		V,
		p,
		M
	], oe = Jt("button", e, {
		enabled: !k,
		stateAttributesMapping: da,
		state: re,
		ref: ie,
		props: ae
	});
	return k ? /*#__PURE__*/ (0, q.jsx)(Xd, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: re,
		refs: ie,
		props: ae,
		stateAttributesMapping: da
	}) : y ? /*#__PURE__*/ (0, q.jsxs)(S.Fragment, { children: [
		/*#__PURE__*/ (0, q.jsx)(yo, {
			ref: W,
			onFocus: te
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, q.jsx)(S.Fragment, { children: oe }, g),
		/*#__PURE__*/ (0, q.jsx)(yo, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: ne
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, q.jsx)(S.Fragment, { children: oe }, g);
});
function nf(e, t) {
	let n = An(), [r, i] = S.useState(!1);
	return Y(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function rf() {
	let e = ma(!0), t = na(!0), n = Rd(!0);
	return S.useMemo(() => n ? {
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
function af(e) {
	let [t, n] = S.useState({
		current: e,
		previous: null
	});
	return e !== t.current && n({
		current: e,
		previous: t.current
	}), t.previous;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/separator/Separator.mjs
var of = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, orientation: i = "horizontal", style: a, ...o } = e;
	return Jt("div", e, {
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
function sf(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
//#endregion
//#region src/platform/overlay-container.tsx
var cf = (0, S.createContext)(null);
function lf(e) {
	return e instanceof ShadowRoot ? e.host.isConnected : e.isConnected;
}
function uf(e) {
	if (!lf(e.container)) throw Error("SSUI_V2_OVERLAY_DISCONNECTED: the overlay container is not connected.");
	if (e.container.getRootNode() !== e.expectedRoot) throw Error("SSUI_V2_OVERLAY_WRONG_ROOT: the overlay container escaped its component root.");
}
function df(e) {
	(0, S.useLayoutEffect)(() => {
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
function ff(e) {
	(0, S.useLayoutEffect)(() => {
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
function pf({ children: e, container: t, expectedRoot: n }) {
	let r = (0, S.useMemo)(() => ({
		container: t,
		expectedRoot: n
	}), [t, n]);
	return uf(r), df(n), ff(t), /* @__PURE__ */ (0, q.jsx)(cf.Provider, {
		value: r,
		children: e
	});
}
function mf() {
	let e = (0, S.useContext)(cf);
	if (!e) throw Error("SSUI_V2_OVERLAY_PROVIDER_MISSING: generated shadcn overlays require an OverlayContainerProvider.");
	return uf(e), e.container;
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function hf({ ...e }) {
	return /* @__PURE__ */ (0, q.jsx)(qd, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function gf({ ...e }) {
	return /* @__PURE__ */ (0, q.jsx)(tf, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function _f({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = mf();
	return /* @__PURE__ */ (0, q.jsx)(ad, {
		container: o,
		children: /* @__PURE__ */ (0, q.jsx)(Id, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, q.jsx)(nd, {
				"data-slot": "dropdown-menu-content",
				className: it("cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function vf({ ...e }) {
	return /* @__PURE__ */ (0, q.jsx)(Ra, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function yf({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, q.jsx)(za, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: it("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function bf({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, q.jsx)(Ba, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: it("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
//#endregion
//#region src/components/streamlit/dropdown-menu.tsx
function xf({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "dropdown-menu",
		"data-testid": "ssui-v2-dropdown-menu",
		children: /* @__PURE__ */ (0, q.jsxs)(hf, {
			disabled: e.props.disabled,
			modal: !1,
			children: [/* @__PURE__ */ (0, q.jsxs)(gf, {
				render: /* @__PURE__ */ (0, q.jsx)(Br, { variant: "outline" }),
				children: [e.props.label, /* @__PURE__ */ (0, q.jsx)(Zn, {
					"aria-hidden": "true",
					"data-icon": "inline-end"
				})]
			}), /* @__PURE__ */ (0, q.jsx)(_f, {
				"aria-label": e.props.menuLabel ?? e.props.label,
				"data-testid": "ssui-v2-dropdown-menu-content",
				children: /* @__PURE__ */ (0, q.jsxs)(vf, { children: [e.props.menuLabel ? /* @__PURE__ */ (0, q.jsx)(yf, { children: e.props.menuLabel }) : null, e.props.items.length > 0 ? e.props.items.map((e) => /* @__PURE__ */ (0, q.jsx)(bf, {
					disabled: e.disabled,
					onClick: () => {
						t("action", e.value);
					},
					variant: e.variant,
					children: e.label
				}, e.value)) : /* @__PURE__ */ (0, q.jsx)(bf, {
					disabled: !0,
					children: "No actions"
				})] })
			})]
		})
	});
}
//#endregion
//#region src/components/streamlit/link-button.tsx
function Sf({ envelope: e }) {
	let t = {
		"data-ssui-component": "link_button",
		"data-testid": "ssui-v2-link-button"
	};
	return e.props.disabled ? /* @__PURE__ */ (0, q.jsx)("div", {
		className: "inline-flex p-px",
		...t,
		children: /* @__PURE__ */ (0, q.jsx)(Br, {
			disabled: !0,
			variant: e.props.variant,
			children: e.props.text
		})
	}) : /* @__PURE__ */ (0, q.jsx)("div", {
		className: "inline-flex p-px",
		...t,
		children: /* @__PURE__ */ (0, q.jsx)("a", {
			className: it(zr({ variant: e.props.variant })),
			href: e.props.url,
			rel: e.props.target === "_blank" ? "noopener noreferrer" : void 0,
			target: e.props.target,
			children: e.props.text
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/stringifyLocale.mjs
function Cf(e) {
	return Array.isArray(e) ? e.map((e) => Cf(e)).join(",") : e == null ? "" : String(e);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/formatNumber.mjs
var wf = /* @__PURE__ */ new Map();
function Tf(e, t) {
	let n = JSON.stringify({
		locale: Cf(e),
		options: t
	}), r = wf.get(n);
	if (r) return r;
	let i = new Intl.NumberFormat(e, t);
	return wf.set(n, i), i;
}
function Ef(e, t, n) {
	return e == null ? "" : Tf(t, n).format(e);
}
function Df(e, t, n) {
	return e == null ? "" : n ? Ef(e, t, n) : Ef(e / 100, t, { style: "percent" });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootContext.mjs
var Of = /*#__PURE__*/ S.createContext(void 0);
function kf() {
	let e = S.useContext(Of);
	if (e === void 0) throw Error(mt(51));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRootDataAttributes.mjs
var Af = /*#__PURE__*/ function(e) {
	return e.complete = "data-complete", e.indeterminate = "data-indeterminate", e.progressing = "data-progressing", e;
}({}), jf = { status(e) {
	return e === "progressing" ? { [Af.progressing]: "" } : e === "complete" ? { [Af.complete]: "" } : e === "indeterminate" ? { [Af.indeterminate]: "" } : null;
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/root/ProgressRoot.mjs
function Mf(e, t) {
	return t == null ? "indeterminate progress" : e || `${t}%`;
}
var Nf = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { format: n, getAriaValueText: r = Mf, locale: i, max: a = 100, min: o = 0, value: s, render: c, className: l, children: u, style: d, ...f } = e, [p, m] = S.useState(), h = _o(n), g = "indeterminate";
	Number.isFinite(s) && (g = s === a ? "complete" : "progressing");
	let _ = Df(s, i, h.current), v = S.useMemo(() => ({ status: g }), [g]), y = {
		"aria-labelledby": p,
		"aria-valuemax": a,
		"aria-valuemin": o,
		"aria-valuenow": s ?? void 0,
		"aria-valuetext": r(_, s),
		role: "progressbar",
		children: /*#__PURE__*/ (0, q.jsxs)(S.Fragment, { children: [u, /*#__PURE__*/ (0, q.jsx)("span", {
			role: "presentation",
			style: Qr,
			children: "x"
		})] })
	}, b = S.useMemo(() => ({
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
	]), x = Jt("div", e, {
		state: v,
		ref: t,
		props: [y, f],
		stateAttributesMapping: jf
	});
	return /*#__PURE__*/ (0, q.jsx)(Of.Provider, {
		value: b,
		children: x
	});
}), Pf = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { state: o } = kf();
	return Jt("div", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: jf
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/valueToPercent.mjs
function Ff(e, t, n) {
	return (e - t) * 100 / (n - t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/indicator/ProgressIndicator.mjs
var If = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { max: o, min: s, value: c, state: l } = kf(), u = Number.isFinite(c) && c !== null ? Ff(c, s, o) : null;
	return Jt("div", e, {
		state: l,
		ref: t,
		props: [{ style: u == null ? {} : {
			insetInlineStart: 0,
			height: "inherit",
			width: `${u}%`
		} }, a],
		stateAttributesMapping: jf
	});
}), Lf = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, style: a, ...o } = e, { value: s, formattedValue: c, state: l } = kf();
	return Jt("span", e, {
		state: l,
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: typeof i == "function" ? i(s == null ? "indeterminate" : c, s) : s == null ? null : c
		}, o],
		stateAttributesMapping: jf
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useRegisteredLabelId.mjs
function Rf(e, t) {
	let n = pi(e);
	return Y(() => (t(n), () => {
		t(void 0);
	}), [n, t]), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/progress/label/ProgressLabel.mjs
var zf = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, { setLabelId: s, state: c } = kf();
	return Jt("span", e, {
		state: c,
		ref: t,
		props: [{
			id: Rf(a, s),
			role: "presentation"
		}, o],
		stateAttributesMapping: jf
	});
});
//#endregion
//#region src/components/ui/progress.tsx
function Bf({ className: e, children: t, value: n, ...r }) {
	return /* @__PURE__ */ (0, q.jsxs)(Nf, {
		value: n,
		"data-slot": "progress",
		className: it("flex flex-wrap gap-3", e),
		...r,
		children: [t, /* @__PURE__ */ (0, q.jsx)(Vf, { children: /* @__PURE__ */ (0, q.jsx)(Hf, {}) })]
	});
}
function Vf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(Pf, {
		className: it("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", e),
		"data-slot": "progress-track",
		...t
	});
}
function Hf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(If, {
		"data-slot": "progress-indicator",
		className: it("h-full bg-primary transition-all", e),
		...t
	});
}
function Uf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(zf, {
		className: it("text-sm font-medium", e),
		"data-slot": "progress-label",
		...t
	});
}
function Wf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(Lf, {
		className: it("ml-auto text-sm text-muted-foreground tabular-nums", e),
		"data-slot": "progress-value",
		...t
	});
}
//#endregion
//#region src/components/streamlit/progress.tsx
function Gf({ envelope: e }) {
	let t = e.props.label ?? "Progress";
	return /* @__PURE__ */ (0, q.jsxs)(Bf, {
		"aria-label": t,
		"data-ssui-component": "progress",
		"data-testid": "ssui-v2-progress",
		value: e.props.value,
		children: [e.props.label === null ? null : /* @__PURE__ */ (0, q.jsx)(Uf, { children: e.props.label }), e.props.showValue ? /* @__PURE__ */ (0, q.jsx)(Wf, { children: (e, t) => `${Math.round(t ?? 0)}%` }) : null]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var Kf = /*#__PURE__*/ S.createContext(null), qf = /*#__PURE__*/ S.createContext(null);
function Jf() {
	let e = S.useContext(Kf);
	if (e === null) throw Error(mt(60));
	return e;
}
function Yf() {
	let e = S.useContext(qf);
	if (e === null) throw Error(mt(61));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Xf(e = {}) {
	let { id: t, implicit: n = !1, controlRef: r } = e, { controlId: i, registerControlId: a } = Ci(), o = pi(t), s = n ? i : void 0, c = gt(() => Symbol("labelable-control")), l = S.useRef(!1), u = S.useRef(t != null), d = J(() => {
		!l.current || a === Dt || (l.current = !1, a(c.current, void 0));
	});
	return Y(() => {
		if (a === Dt) return;
		let e;
		if (n) {
			let n = r?.current;
			e = fr(n) && n.closest("label") != null ? t ?? null : s ?? o;
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
	]), S.useEffect(() => d, [d]), i ?? o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/itemEquality.mjs
var Zf = (e, t) => Object.is(e, t);
function Qf(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function $f(e, t, n) {
	return !e || e.length === 0 ? !1 : e.some((e) => e !== void 0 && Qf(t, e, n));
}
function ep(e, t, n) {
	return !e || e.length === 0 ? -1 : e.findIndex((e) => e !== void 0 && Qf(e, t, n));
}
function tp(e, t, n) {
	return e.filter((e) => !Qf(t, e, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/serializeValue.mjs
function np(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/resolveValueLabel.mjs
function rp(e) {
	return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function ip(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (rp(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function ap(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return np(e);
}
function op(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? np(e.value) : np(e);
}
function sp(e, t, n) {
	function r() {
		return ap(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return t[e] ?? r();
	if (Array.isArray(t)) {
		let n = t, i = rp(n) ? n.flatMap((e) => e.items) : n;
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
function cp(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, q.jsx)(S.Fragment, { children: sp(r, t, n) }, i)), e), []);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/store.mjs
var $ = {
	id: Z((e) => e.id),
	labelId: Z((e) => e.labelId),
	modal: Z((e) => e.modal),
	multiple: Z((e) => e.multiple),
	items: Z((e) => e.items),
	itemToStringLabel: Z((e) => e.itemToStringLabel),
	itemToStringValue: Z((e) => e.itemToStringValue),
	isItemEqualToValue: Z((e) => e.isItemEqualToValue),
	value: Z((e) => e.value),
	hasSelectedValue: Z((e) => {
		let { value: t, multiple: n, itemToStringValue: r } = e;
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : op(t, r) !== "";
	}),
	hasNullItemLabel: Z((e, t) => t ? ip(e.items) : !1),
	open: Z((e) => e.open),
	mounted: Z((e) => e.mounted),
	forceMount: Z((e) => e.forceMount),
	transitionStatus: Z((e) => e.transitionStatus),
	openMethod: Z((e) => e.openMethod),
	activeIndex: Z((e) => e.activeIndex),
	selectedIndex: Z((e) => e.selectedIndex),
	isActive: Z((e, t) => e.activeIndex === t),
	isSelected: Z((e, t) => {
		let n = e.isItemEqualToValue, r = e.value;
		return e.multiple ? Array.isArray(r) && r.some((e) => Qf(t, e, n)) : Qf(t, r, n);
	}),
	isSelectedByFocus: Z((e, t) => e.selectedIndex === t),
	popupProps: Z((e) => e.popupProps),
	triggerProps: Z((e) => e.triggerProps),
	triggerElement: Z((e) => e.triggerElement),
	positionerElement: Z((e) => e.positionerElement),
	listElement: Z((e) => e.listElement),
	popupSide: Z((e) => e.popupSide),
	scrollUpArrowVisible: Z((e) => e.scrollUpArrowVisible),
	scrollDownArrowVisible: Z((e) => e.scrollDownArrowVisible),
	hasScrollArrows: Z((e) => e.hasScrollArrows)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/areArraysEqual.mjs
function lp(e, t, n = (e, t) => e === t) {
	return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/clamp.mjs
function up(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function dp(e, t) {
	return Math.max(0, e - t);
}
function fp(e, t) {
	if (t <= 0) return 0;
	let n = up(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRoot.mjs
function pp(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: C = Zf, highlightItemOnHover: w = !0, children: T } = e, { clearErrors: E } = xi(), { setDirty: D, setTouched: O, setFocused: k, validityData: A, setFilled: j, name: M, disabled: N, validation: P, validationMode: F } = gi(), I = Xf({ id: t }), L = N || d, R = M ?? c, [z, ee] = Xr({
		controlled: n,
		default: y ? r ?? Ot : r,
		name: "Select",
		state: "value"
	}), [B, V] = Xr({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), H = S.useRef([]), U = S.useRef([]), W = S.useRef(null), te = S.useRef(null), ne = S.useRef(0), re = S.useRef(null), ie = S.useRef([]), ae = S.useRef(!1), oe = S.useRef(null), se = S.useRef(null), ce = S.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), le = S.useRef(!1), { mounted: ue, setMounted: de, transitionStatus: fe } = wn(B), { openMethod: pe, triggerProps: me } = Vd(B), he = gt(() => new Kl({
		id: I,
		labelId: void 0,
		modal: m,
		multiple: y,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: C,
		value: z,
		open: B,
		mounted: ue,
		transitionStatus: fe,
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
	})).current, ge = Q(he, $.activeIndex), _e = Q(he, $.selectedIndex), ve = Q(he, $.triggerElement), ye = Q(he, $.positionerElement), be = af(pe), xe = pe ?? be ?? null, Se = S.useMemo(() => y ? "" : op(z, x), [
		y,
		z,
		x
	]), Ce = S.useMemo(() => y && Array.isArray(z) ? z.map((e) => op(e, x)) : op(z, x), [
		y,
		z,
		x
	]);
	_i(_o(he.state.triggerElement), I, z, J(() => Ce), !L, c);
	let we = S.useRef(z), Te = y ? Array.isArray(z) && z.length > 0 : z != null && op(z, x) !== "";
	Y(() => {
		z !== we.current && he.set("forceMount", !0);
	}, [he, z]), Y(() => {
		j(Te);
	}, [Te, j]), Y(function() {
		let e = ie.current, t;
		if (y) {
			let n = Array.isArray(z) ? z : [];
			if (n.length === 0) t = null;
			else {
				let r = n[n.length - 1], i = ep(e, r, C);
				t = i === -1 ? null : i;
			}
		} else {
			let n = ep(e, z, C);
			t = n === -1 ? null : n;
		}
		t === null && (se.current = null), !B && he.set("selectedIndex", t);
	}, [
		Te,
		y,
		B,
		z,
		ie,
		C,
		he,
		se
	]);
	function Ee(e) {
		let t = A.initialValue;
		return Array.isArray(e) && Array.isArray(t) ? !lp(e, t, (e, t) => Qf(e, t, C)) : e !== t;
	}
	Gi(z, () => {
		E(R), D(Ee(z)), P.change(z);
	});
	let De = J((e, t) => {
		s?.(e, t), !t.isCanceled && (V(e), !e && (t.reason === "focus-out" || t.reason === "outside-press") && (O(!0), k(!1), F === "onBlur" && P.commit(z)));
	}), Oe = J(() => {
		de(!1), he.update({
			activeIndex: null,
			openMethod: null
		}), _?.(!1);
	});
	Cn({
		enabled: !h,
		open: B,
		ref: W,
		onComplete() {
			B || Oe();
		}
	}), S.useImperativeHandle(h, () => ({ unmount: Oe }), [Oe]);
	let ke = J((e, t) => {
		i?.(e, t), !t.isCanceled && ee(e);
	}), Ae = J(() => {
		let e = he.state.listElement || W.current;
		if (!e) return;
		let t = dp(e.scrollHeight, e.clientHeight), n = fp(e.scrollTop, t), r = n > 0, i = n < t;
		he.state.scrollUpArrowVisible !== r && he.set("scrollUpArrowVisible", r), he.state.scrollDownArrowVisible !== i && he.set("scrollDownArrowVisible", i);
	}), je = hu({
		open: B,
		onOpenChange: De,
		elements: {
			reference: ve,
			floating: ye
		}
	}), Me = gc(je, {
		enabled: !f && !L,
		event: "mousedown"
	}), G = yc(je), Ne = Nu(je, {
		enabled: !f && !L,
		listRef: H,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: Ot,
		onNavigate(e) {
			e === null && !B || he.set("activeIndex", e);
		},
		focusItemOnHover: w
	}), Pe = Pu(je, {
		enabled: !f && !L && (B || !y),
		listRef: U,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: (e) => sf(H.current[e]),
		onMatch(e) {
			B ? he.set("activeIndex", e) : ke(ie.current[e], Wi("none"));
		},
		onTyping(e) {
			ae.current = e;
		}
	}), Fe = S.useMemo(() => {
		let e = Pt(Pe.reference, Ne.reference, G.reference, Me.reference, me);
		return I && (e.id = I), e;
	}, [
		Me.reference,
		Pe.reference,
		Ne.reference,
		G.reference,
		me,
		I
	]), Ie = S.useMemo(() => Pt(Zl, Pe.floating, Ne.floating, G.floating), [
		Pe.floating,
		Ne.floating,
		G.floating
	]), Le = Ne.item ?? kt;
	Ol(() => {
		he.update({
			popupProps: Ie,
			triggerProps: Fe
		});
	}), Y(() => {
		he.update({
			id: I,
			modal: m,
			multiple: y,
			value: z,
			open: B,
			mounted: ue,
			transitionStatus: fe,
			popupProps: Ie,
			triggerProps: Fe,
			items: v,
			itemToStringLabel: b,
			itemToStringValue: x,
			isItemEqualToValue: C,
			openMethod: xe
		});
	}, [
		he,
		I,
		m,
		y,
		z,
		B,
		ue,
		fe,
		Ie,
		Fe,
		v,
		b,
		x,
		C,
		xe
	]);
	let Re = S.useMemo(() => ({
		store: he,
		name: R,
		required: p,
		disabled: L,
		readOnly: f,
		multiple: y,
		highlightItemOnHover: w,
		setValue: ke,
		setOpen: De,
		listRef: H,
		popupRef: W,
		scrollHandlerRef: te,
		handleScrollArrowVisibility: Ae,
		scrollArrowsMountedCountRef: ne,
		itemProps: Le,
		valueRef: re,
		valuesRef: ie,
		labelsRef: U,
		typingRef: ae,
		selectionRef: ce,
		firstItemTextRef: oe,
		selectedItemTextRef: se,
		validation: P,
		onOpenChangeComplete: _,
		alignItemWithTriggerActiveRef: le,
		initialValueRef: we
	}), [
		he,
		R,
		p,
		L,
		f,
		y,
		w,
		ke,
		De,
		Le,
		P,
		_,
		Ae
	]), ze = _t(g, P.inputRef), K = y && Array.isArray(z) && z.length > 0, Be = y ? void 0 : R, Ve = S.useMemo(() => !y || !Array.isArray(z) || !R ? null : z.map((e) => {
		let t = op(e, x);
		return /*#__PURE__*/ (0, q.jsx)("input", {
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
	return /*#__PURE__*/ (0, q.jsx)(Kf.Provider, {
		value: Re,
		children: /*#__PURE__*/ (0, q.jsxs)(qf.Provider, {
			value: je,
			children: [
				T,
				/*#__PURE__*/ (0, q.jsx)("input", {
					...P.getValidationProps(L, {
						onFocus() {
							he.state.triggerElement?.focus({ focusVisible: !0 });
						},
						onChange(e) {
							if (e.nativeEvent.defaultPrevented || L || f) return;
							let t = e.currentTarget.value, n = Wi(ji, e.nativeEvent);
							function r() {
								if (y) return;
								let e = t.toLowerCase(), r = ie.current.findIndex((t) => op(t, x).toLowerCase() === e || ap(t, b).toLowerCase() === e);
								r === -1 && (r = ie.current.findIndex((t, n) => {
									let r = U.current[n];
									return r != null && r.toLowerCase() === e;
								}));
								let i = r === -1 ? void 0 : ie.current[r];
								i != null && ke(i, n);
							}
							he.set("forceMount", !0), queueMicrotask(r);
						}
					}),
					id: I && Be == null ? `${I}-hidden-input` : void 0,
					form: l,
					name: Be,
					autoComplete: u,
					value: Se,
					disabled: L,
					required: p && !K,
					readOnly: f,
					ref: ze,
					style: R ? $r : Qr,
					tabIndex: -1,
					"aria-hidden": !0,
					suppressHydrationWarning: !0
				}),
				Ve
			]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function mp(e, t) {
	return e ?? t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/trigger/SelectTrigger.mjs
var hp = 2, gp = 400, _p = {
	...da,
	...si,
	popupSide: (e) => e ? { "data-popup-side": e } : null,
	value: () => null
}, vp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, setFocused: u, validationMode: d, state: f, disabled: p } = gi(), { labelId: m } = Ci(), { store: h, setOpen: g, selectionRef: _, validation: v, readOnly: y, required: b, alignItemWithTriggerActiveRef: x, disabled: C } = Jf(), w = p || C || a, T = Q(h, $.open), E = Q(h, $.mounted), D = Q(h, $.value), O = Q(h, $.triggerProps), k = Q(h, $.positionerElement), A = Q(h, $.listElement), j = Q(h, $.popupSide), M = Q(h, $.id), N = Q(h, $.labelId), P = Q(h, $.hasSelectedValue), F = E && k ? j : null, I = i ?? M, L = mp(m, N);
	Xf({ id: I });
	let R = _o(k), z = S.useRef(null), { getButtonProps: ee, buttonRef: B } = Fr({
		disabled: w,
		native: o
	}), V = J((e) => {
		h.set("triggerElement", e);
	}), H = An(), U = An(), W = An();
	S.useEffect(() => {
		if (T) return W.start(gp, () => {
			_.current.allowUnselectedMouseUp = !0, _.current.allowSelectedMouseUp = !0;
		}), () => {
			W.clear();
		};
		_.current = {
			allowSelectedMouseUp: !1,
			allowUnselectedMouseUp: !1,
			dragY: 0
		}, U.clear();
	}, [
		T,
		_,
		U,
		W
	]);
	let te = Pt(O, {
		id: I,
		role: "combobox",
		"aria-expanded": T ? "true" : "false",
		"aria-haspopup": "listbox",
		"aria-controls": T ? A?.id ?? co(k)?.id : void 0,
		"aria-labelledby": L,
		"aria-readonly": y || void 0,
		"aria-required": b || void 0,
		tabIndex: w ? -1 : 0,
		onFocus(e) {
			u(!0), T && x.current && g(!1, Wi(ji, e.nativeEvent)), H.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			X(k, e.relatedTarget) || (l(!0), u(!1), d === "onBlur" && v.commit(D));
		},
		onMouseDown(e) {
			if (T) return;
			let t = ei(e.currentTarget);
			function n(e) {
				if (!z.current) return;
				let t = e.target;
				if (X(z.current, t) || X(R.current, t)) return;
				let n = Jd(z.current);
				e.clientX >= n.left - hp && e.clientX <= n.right + hp && e.clientY >= n.top - hp && e.clientY <= n.bottom + hp || g(!1, Wi(Bi, e));
			}
			U.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, ee), ne = v.getValidationProps(w, te);
	ne.role = "combobox";
	let re = {
		...f,
		open: T,
		disabled: w,
		value: D,
		readOnly: y,
		popupSide: F,
		placeholder: !P
	};
	return Jt("button", e, {
		ref: [
			t,
			z,
			B,
			V
		],
		state: re,
		stateAttributesMapping: _p,
		props: ne
	});
}), yp = { value: () => null }, bp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, { store: c, valueRef: l } = Jf(), u = Q(c, $.value), d = Q(c, $.items), f = Q(c, $.itemToStringLabel), p = Q(c, $.hasSelectedValue), m = !p && a != null && i == null, h = Q(c, $.hasNullItemLabel, m), g = {
		value: u,
		placeholder: !p
	}, _ = null;
	return _ = typeof i == "function" ? i(u) : i ?? (!p && a != null && !h ? a : Array.isArray(u) ? cp(u, d, f) : sp(u, d, f)), Jt("span", e, {
		state: g,
		ref: [t, l],
		props: [{ children: _ }, s],
		stateAttributesMapping: yp
	});
}), xp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = Jf();
	return Jt("span", e, {
		state: { open: Q(o, $.open) },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: ua
	});
}), Sp = /*#__PURE__*/ S.createContext(void 0), Cp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { store: n } = Jf(), r = Q(n, $.mounted), i = Q(n, $.forceMount);
	return r || i ? /*#__PURE__*/ (0, q.jsx)(Sp.Provider, {
		value: !0,
		children: /*#__PURE__*/ (0, q.jsx)(Zs, {
			ref: t,
			...e
		})
	}) : null;
}), wp = /*#__PURE__*/ S.createContext(void 0);
function Tp() {
	let e = S.useContext(wp);
	if (!e) throw Error(mt(59));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/utils.mjs
function Ep(e, t) {
	e && Object.assign(e.style, t);
}
var Dp = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, Op = { position: "fixed" }, kp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o = "bottom", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = Ws, style: _, ...v } = e, { store: y, listRef: b, labelsRef: x, alignItemWithTriggerActiveRef: C, selectedItemTextRef: w, valuesRef: T, initialValueRef: E, popupRef: D, setValue: O } = Jf(), k = Yf(), A = Q(y, $.open), j = Q(y, $.mounted), M = Q(y, $.modal), N = Q(y, $.value), P = Q(y, $.openMethod), F = Q(y, $.positionerElement), I = Q(y, $.triggerElement), L = Q(y, $.isItemEqualToValue), R = Q(y, $.transitionStatus), z = S.useRef(null), ee = S.useRef(null), [B, V] = S.useState(h), H = j && B && P !== "touch";
	!j && B !== h && V(h), Y(() => {
		j || ($.scrollUpArrowVisible(y.state) && y.set("scrollUpArrowVisible", !1), $.scrollDownArrowVisible(y.state) && y.set("scrollDownArrowVisible", !1));
	}, [y, j]), S.useImperativeHandle(C, () => H), Fd((H || M) && A, P === "touch", F, I);
	let U = _d({
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
		disableAnchorTracking: m ?? H,
		collisionAvoidance: g,
		keepMounted: !0
	}), W = H ? "none" : U.side, te = H ? Op : U.positionerStyles, ne = {
		open: A,
		side: W,
		align: U.align,
		anchorHidden: U.anchorHidden
	};
	Y(() => {
		y.set("popupSide", U.side);
	}, [y, U.side]);
	let re = wd(e, ne, {
		styles: te,
		transitionStatus: R,
		props: v,
		refs: [t, J((e) => {
			y.set("positionerElement", e);
		})],
		hidden: !j,
		inert: !A
	}), ie = S.useRef(0), ae = J((e) => {
		if (e.size === 0 && ie.current === 0 || T.current.length === 0) return;
		let t = ie.current;
		if (ie.current = e.size, e.size === t) return;
		let n = Wi(ji);
		if (t !== 0 && !y.state.multiple && N !== null && ep(T.current, N, L) === -1) {
			let e = E.current, t = e != null && ep(T.current, e, L) !== -1 ? e : null;
			O(t, n), t === null && (y.set("selectedIndex", null), w.current = null);
		}
		if (t !== 0 && y.state.multiple && Array.isArray(N)) {
			let e = (e) => ep(T.current, e, L) !== -1, t = N.filter((t) => e(t));
			(t.length !== N.length || t.some((e) => !$f(N, e, L))) && (O(t, n), t.length === 0 && (y.set("selectedIndex", null), w.current = null));
		}
		if (A && H) {
			y.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			Ep(F, e), Ep(D.current, e);
		}
	}), oe = S.useMemo(() => ({
		...U,
		side: W,
		alignItemWithTriggerActive: H,
		setControlledAlignItemWithTrigger: V,
		scrollUpArrowRef: z,
		scrollDownArrowRef: ee
	}), [
		U,
		W,
		H,
		V
	]);
	return /*#__PURE__*/ (0, q.jsx)(yd, {
		elementsRef: b,
		labelsRef: x,
		onMapChange: ae,
		children: /*#__PURE__*/ (0, q.jsxs)(wp.Provider, {
			value: oe,
			children: [j && M && /*#__PURE__*/ (0, q.jsx)(Cd, {
				inert: od(!A),
				cutout: I
			}), re]
		})
	});
}), Ap = "base-ui-disable-scrollbar", jp = {
	className: Ap,
	getElement(e) {
		return /*#__PURE__*/ (0, q.jsx)("style", {
			nonce: e,
			href: Ap,
			precedence: "base-ui:low",
			children: `.${Ap}{scrollbar-width:none}.${Ap}::-webkit-scrollbar{display:none}`
		});
	}
}, Mp = /*#__PURE__*/ S.createContext(void 0), Np = { disableStyleElements: !1 };
function Pp() {
	return S.useContext(Mp) ?? Np;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/SelectPopup.mjs
var Fp = {
	...fa,
	...bn
}, Ip = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s, popupRef: c, onOpenChangeComplete: l, setOpen: u, valueRef: d, firstItemTextRef: f, selectedItemTextRef: p, multiple: m, handleScrollArrowVisibility: h, scrollHandlerRef: g, listRef: _, highlightItemOnHover: v } = Jf(), { side: y, align: b, alignItemWithTriggerActive: x, isPositioned: C, setControlledAlignItemWithTrigger: w } = Tp(), T = Wu(!0) != null, E = Yf(), D = cd(), { nonce: O, disableStyleElements: k } = Pp(), A = Q(s, $.id), j = Q(s, $.open), M = Q(s, $.openMethod), N = Q(s, $.mounted), P = Q(s, $.popupProps), F = Q(s, $.transitionStatus), I = Q(s, $.triggerElement), L = Q(s, $.positionerElement), R = Q(s, $.listElement), z = S.useRef(!1), ee = S.useRef(!1), B = S.useRef({}), V = hn(), H = J((e) => {
		if (!L || !c.current || !ee.current) return;
		if (z.current || !x) {
			h();
			return;
		}
		let t = L.style.top === "0px", n = L.style.bottom === "0px";
		if (!t && !n) {
			h();
			return;
		}
		let r = zp(L), i = Bp(L.getBoundingClientRect().height, "y", r), a = ei(L), o = lr(L), s = o.getComputedStyle(L), l = parseFloat(s.marginTop), u = parseFloat(s.marginBottom), d = Lp(o.getComputedStyle(c.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, m = Rp(e), g = 0, _ = null, v = !1, y = !1, b = (e) => {
			L.style.height = `${e}px`;
		}, S = (t, n) => {
			let r = up(t, 0, f - i);
			r > 0 && b(i + r), e.scrollTop = n, f - (i + r) <= 1 && (z.current = !0), h();
		}, C = t ? m - p : p, w = Math.min(i + C, f);
		if (g = w, C <= 1) {
			S(C, t ? m : 0);
			return;
		}
		if (f - w > 1 ? t ? y = !0 : _ = 0 : (v = !0, n && p < m && (_ = p - (C - (i + C - f)))), g = Math.ceil(g), g !== 0 && b(g), y || _ != null) {
			let t = Rp(e), n = y ? t : up(_, 0, t);
			Math.abs(e.scrollTop - n) > 1 && (e.scrollTop = n);
		}
		(v || g >= f - 1) && (z.current = !0), h();
	});
	S.useImperativeHandle(g, () => H, [H]), Cn({
		open: j,
		ref: c,
		onComplete() {
			j && l?.(!0);
		}
	});
	let U = {
		open: j,
		transitionStatus: F,
		side: y,
		align: b
	};
	Y(() => {
		!L || !c.current || Object.keys(B.current).length || (B.current = {
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
	}, [c, L]), Y(() => {
		j || x || (ee.current = !1, z.current = !1, Ep(L, B.current));
	}, [
		j,
		x,
		L,
		c
	]), Y(() => {
		let e = c.current;
		if (!j || !I || !L || !e || x && !C || s.state.transitionStatus === "ending") return;
		if (!x) {
			ee.current = !0, V.request(h), e.style.removeProperty("--transform-origin");
			return;
		}
		let t = Up(e);
		e.style.removeProperty("--transform-origin");
		try {
			let t = p.current;
			t?.isConnected || (t = !$.hasSelectedValue(s.state) && f.current?.isConnected ? f.current : null);
			let n = d.current, r = lr(L), i = r.getComputedStyle(L), a = r.getComputedStyle(e), o = ei(I), c = zp(I), l = Vp(I.getBoundingClientRect(), c), u = Vp(L.getBoundingClientRect(), c), m = l.height, g = R || e, y = g.scrollHeight, b = parseFloat(a.borderBottomWidth), x = parseFloat(i.marginTop) || 10, S = parseFloat(i.marginBottom) || 10, C = parseFloat(i.minHeight) || 100, T = Lp(a), E = o.documentElement.clientHeight - x - S, O = o.documentElement.clientWidth, k = E - l.bottom + m, A, j = D === "rtl" ? l.right - u.width : l.left, M = 0;
			if (t && n) {
				let e = Vp(n.getBoundingClientRect(), c);
				A = Vp(t.getBoundingClientRect(), c), j = u.left + (D === "rtl" ? e.right - A.right : e.left - A.left);
				let r = e.top - l.top + e.height / 2;
				M = A.top - u.top + A.height / 2 - r;
			}
			let N = k + M + S + b, P = Math.min(E, N), F = E - x - S, V = N - P, H = O - 5;
			L.style.left = `${up(j, 5, H - u.width)}px`, L.style.height = `${P}px`, L.style.maxHeight = "none", L.style.marginTop = `${x}px`, L.style.marginBottom = `${S}px`, e.style.height = "100%";
			let U = Rp(g), W = V >= U - 1;
			W && (P = Math.min(E, u.height) - (V - U));
			let te = l.top < 20 || l.bottom > E - 20 || Math.ceil(P) + 1 < Math.min(y, C), ne = (r.visualViewport?.scale ?? 1) !== 1 && Ea;
			if (te || ne) {
				ee.current = !0, Ep(L, B.current), w(!1);
				return;
			}
			let re = Math.max(C, P);
			if (W) {
				let e = Math.max(0, E - N);
				L.style.top = u.height >= F ? "0" : `${e}px`, L.style.height = `${P}px`, g.scrollTop = Rp(g);
			} else L.style.bottom = "0", g.scrollTop = V;
			if (A) {
				let t = u.top, n = u.height, r = A.top + A.height / 2, i = up(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty("--transform-origin", `50% ${i}%`);
			}
			(re === E || P >= T) && (z.current = !0), h(), v && s.state.selectedIndex === null && s.state.activeIndex === null && _.current[0] != null && s.set("activeIndex", 0), ee.current = !0;
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
		V,
		R,
		_,
		v,
		D,
		C
	]), S.useEffect(() => {
		if (!x || !L || !j) return;
		let e = lr(L);
		function t(e) {
			u(!1, Wi(Ui, e));
		}
		return ho(e, "resize", t);
	}, [
		u,
		x,
		L,
		j
	]);
	let W = {
		...R ? {
			role: "presentation",
			"aria-orientation": void 0
		} : {
			role: "listbox",
			"aria-multiselectable": m || void 0,
			id: `${A}-list`
		},
		onKeyDown(e) {
			T && $u.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			R || H(e.currentTarget);
		},
		...x && { style: R ? { height: "100%" } : Dp }
	}, te = Jt("div", e, {
		ref: [t, c],
		state: U,
		stateAttributesMapping: Fp,
		props: [
			P,
			W,
			ed(F),
			{ className: !R && x ? jp.className : void 0 },
			o
		]
	});
	return /*#__PURE__*/ (0, q.jsxs)(S.Fragment, { children: [!k && jp.getElement(O), /*#__PURE__*/ (0, q.jsx)(hc, {
		context: E,
		modal: !1,
		disabled: !N,
		openInteractionType: M,
		returnFocus: a,
		restoreFocus: !0,
		children: te
	})] });
});
function Lp(e) {
	let t = e.maxHeight || "";
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function Rp(e) {
	return dp(e.scrollHeight, e.clientHeight);
}
function zp(e) {
	return al.getScale(e);
}
function Bp(e, t, n) {
	return e / n[t];
}
function Vp(e, t) {
	return qo({
		x: Bp(e.x, "x", t),
		y: Bp(e.y, "y", t),
		width: Bp(e.width, "x", t),
		height: Bp(e.height, "y", t)
	});
}
var Hp = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function Up(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Hp) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Hp) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/list/SelectList.mjs
var Wp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o, scrollHandlerRef: s } = Jf(), { alignItemWithTriggerActive: c } = Tp(), l = Q(o, $.hasScrollArrows), u = Q(o, $.openMethod), d = Q(o, $.multiple), f = {
		id: `${Q(o, $.id)}-list`,
		role: "listbox",
		"aria-multiselectable": d || void 0,
		onScroll(e) {
			s.current?.(e.currentTarget);
		},
		...c && { style: Dp },
		className: l && u !== "touch" ? jp.className : void 0
	};
	return Jt("div", e, {
		ref: [t, J((e) => {
			o.set("listElement", e);
		})],
		props: [f, a]
	});
}), Gp = /*#__PURE__*/ S.createContext(void 0);
function Kp() {
	let e = S.useContext(Gp);
	if (!e) throw Error(mt(57));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/item/SelectItem.mjs
var qp = /*#__PURE__*/ S.memo(/*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = S.useRef(null), d = Fa({
		label: o,
		textRef: u,
		indexGuessBehavior: Pa.GuessFromOrder
	}), { store: f, itemProps: p, setOpen: m, setValue: h, selectionRef: g, typingRef: _, valuesRef: v, multiple: y, selectedItemTextRef: b, disabled: x, readOnly: C } = Jf(), w = Q(f, $.isActive, d.index), T = Q(f, $.open), E = Q(f, $.isSelected, a), D = Q(f, $.isSelectedByFocus, d.index), O = Q(f, $.isItemEqualToValue), k = d.index, A = k !== -1, j = S.useRef(null);
	Y(() => {
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
	]), Y(() => {
		if (!A) return;
		let e = f.state.value, t = e;
		y && Array.isArray(e) && (t = e.length > 0 ? e[e.length - 1] : void 0), t !== void 0 && Qf(a, t, O) && (f.set("selectedIndex", k), u.current && (b.current = u.current));
	}, [
		A,
		k,
		y,
		O,
		f,
		a,
		b
	]);
	let M = S.useRef(null), N = S.useRef("mouse"), P = S.useRef(!1), { getButtonProps: F, buttonRef: I } = Fr({
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
		if (x || C) return;
		let t = f.state.value;
		if (y) {
			let n = Array.isArray(t) ? t : [], r = E ? tp(n, a, O) : [...n, a];
			h(r, Wi(Ii, e));
		} else h(a, Wi(Ii, e)), m(!1, Wi(Ii, e));
	}
	function z() {
		g.current.dragY = 0;
	}
	let ee = {
		role: "option",
		"aria-selected": E,
		tabIndex: T && w ? 0 : -1,
		onKeyDown(e) {
			M.current = e.key, f.set("activeIndex", k), e.key === " " && _.current && e.preventDefault();
		},
		onClick(e) {
			let t = e.type === "click" && N.current !== "touch", n = e.nativeEvent.pointerType, r = t && Ua(e.nativeEvent) && (n !== void 0 || w), i = t && !r && !P.current;
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
	}, B = Jt("div", e, {
		ref: [
			I,
			t,
			d.ref,
			j
		],
		state: L,
		props: [
			p,
			ee,
			l,
			F
		]
	}), V = S.useMemo(() => ({
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
	return /*#__PURE__*/ (0, q.jsx)(Gp.Provider, {
		value: V,
		children: B
	});
})), Jp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let n = e.keepMounted ?? !1, { selected: r } = Kp();
	return n || r ? /*#__PURE__*/ (0, q.jsx)(Yp, {
		...e,
		ref: t
	}) : null;
}), Yp = /*#__PURE__*/ S.memo(/*#__PURE__*/ S.forwardRef((e, t) => {
	let { render: n, className: r, style: i, keepMounted: a, ...o } = e, { selected: s } = Kp(), c = S.useRef(null), { transitionStatus: l, setMounted: u } = wn(s), d = Jt("span", e, {
		ref: [t, c],
		state: {
			selected: s,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, o],
		stateAttributesMapping: bn
	});
	return Cn({
		open: s,
		ref: c,
		onComplete() {
			s || u(!1);
		}
	}), d;
})), Xp = /*#__PURE__*/ S.memo(/*#__PURE__*/ S.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i, hasRegistered: a } = Kp(), { firstItemTextRef: o, selectedItemTextRef: s } = Jf(), { render: c, className: l, style: u, ...d } = e;
	return Jt("div", e, {
		ref: [
			S.useCallback((e) => {
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
})), Zp = /*#__PURE__*/ S.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o = !1, ...s } = e, c = a === "up", { store: l, popupRef: u, listRef: d, handleScrollArrowVisibility: f, scrollArrowsMountedCountRef: p } = Jf(), { side: m, scrollDownArrowRef: h, scrollUpArrowRef: g } = Tp(), _ = Q(l, c ? $.scrollUpArrowVisible : $.scrollDownArrowVisible), v = Q(l, $.openMethod), y = _ && v !== "touch", b = An(), x = c ? g : h, { mounted: S, transitionStatus: C, setMounted: w } = wn(y);
	Y(() => (p.current += 1, l.state.hasScrollArrows || l.set("hasScrollArrows", !0), () => {
		p.current = Math.max(0, p.current - 1), p.current === 0 && l.state.hasScrollArrows && l.set("hasScrollArrows", !1);
	}), [l, p]), Cn({
		open: y,
		ref: x,
		onComplete() {
			y || w(!1);
		}
	});
	let T = Jt("div", e, {
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
					let n = dp(e.scrollHeight, e.clientHeight), r = fp(e.scrollTop, n), i = r === (c ? 0 : n), a = d.current;
					if (r !== e.scrollTop && (e.scrollTop = r), a.length === 0 && l.set(c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !i), i) {
						b.clear();
						return;
					}
					if (a.length > 0) {
						let t = x.current?.offsetHeight || 0;
						e.scrollTop = Qp(a, c, r, e.clientHeight, t, n);
					}
					b.start(40, t);
				}
				b.start(40, t);
			},
			onMouseLeave() {
				b.clear();
			}
		}, s],
		stateAttributesMapping: bn
	});
	return S || o ? T : null;
});
function Qp(e, t, n, r, i, a) {
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
		return o < t && s ? fp(s.offsetTop - i, a) : 0;
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
	return c > o && l ? fp(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var $p = /*#__PURE__*/ S.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, q.jsx)(Zp, {
		...e,
		ref: t,
		direction: "down"
	});
}), em = /*#__PURE__*/ S.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, q.jsx)(Zp, {
		...e,
		ref: t,
		direction: "up"
	});
}), tm = pp;
function nm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(bp, {
		"data-slot": "select-value",
		className: it("flex flex-1 text-left", e),
		...t
	});
}
function rm({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, q.jsxs)(vp, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: it("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, q.jsx)(xp, { render: /* @__PURE__ */ (0, q.jsx)(Zn, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function im({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = mf();
	return /* @__PURE__ */ (0, q.jsx)(Cp, {
		container: c,
		children: /* @__PURE__ */ (0, q.jsx)(kp, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, q.jsxs)(Ip, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: it("cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, q.jsx)(om, {}),
					/* @__PURE__ */ (0, q.jsx)(Wp, { children: t }),
					/* @__PURE__ */ (0, q.jsx)(sm, {})
				]
			})
		})
	});
}
function am({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, q.jsxs)(qp, {
		"data-slot": "select-item",
		className: it("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, q.jsx)(Xp, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, q.jsx)(Jp, {
			render: /* @__PURE__ */ (0, q.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, q.jsx)(Xn, { className: "pointer-events-none" })
		})]
	});
}
function om({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)(em, {
		"data-slot": "select-scroll-up-button",
		className: it("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, q.jsx)($n, {})
	});
}
function sm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)($p, {
		"data-slot": "select-scroll-down-button",
		className: it("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, q.jsx)(Zn, {})
	});
}
//#endregion
//#region src/components/streamlit/select.tsx
function cm({ envelope: e, setStateValue: t }) {
	let n = (0, S.useId)(), { commit: r, state: i } = Zi(e.state, t), a = e.props.disabled || e.props.options.length === 0;
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "select",
		"data-testid": "ssui-v2-select",
		children: [/* @__PURE__ */ (0, q.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, q.jsxs)(tm, {
			disabled: a,
			items: e.props.options,
			modal: !1,
			onValueChange: (e) => {
				r(typeof e == "string" ? e : null);
			},
			value: i.value,
			children: [/* @__PURE__ */ (0, q.jsx)(rm, {
				"aria-labelledby": n,
				className: "w-full",
				"data-testid": "ssui-v2-select-trigger",
				children: /* @__PURE__ */ (0, q.jsx)(nm, { placeholder: e.props.options.length === 0 ? "No options" : e.props.placeholder })
			}), /* @__PURE__ */ (0, q.jsx)(im, {
				align: "start",
				alignItemWithTrigger: !1,
				"data-testid": "ssui-v2-select-content",
				children: e.props.options.map((e) => /* @__PURE__ */ (0, q.jsx)(am, {
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
function lm({ className: e, orientation: t = "horizontal", ...n }) {
	return /* @__PURE__ */ (0, q.jsx)(of, {
		"data-slot": "separator",
		orientation: t,
		className: it("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", e),
		...n
	});
}
//#endregion
//#region src/components/streamlit/separator.tsx
function um({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: e.props.orientation === "vertical" ? "flex h-8 justify-center" : "py-2",
		"data-ssui-component": "separator",
		"data-testid": "ssui-v2-separator",
		children: /* @__PURE__ */ (0, q.jsx)(lm, { orientation: e.props.orientation })
	});
}
//#endregion
//#region src/components/ui/skeleton.tsx
function dm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "skeleton",
		className: it("animate-pulse rounded-md bg-muted", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/skeleton.tsx
function fm({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)(dm, {
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
function pm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, q.jsx)("table", {
			"data-slot": "table",
			className: it("w-full caption-bottom text-sm", e),
			...t
		})
	});
}
function mm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("thead", {
		"data-slot": "table-header",
		className: it("[&_tr]:border-b", e),
		...t
	});
}
function hm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("tbody", {
		"data-slot": "table-body",
		className: it("[&_tr:last-child]:border-0", e),
		...t
	});
}
function gm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("tr", {
		"data-slot": "table-row",
		className: it("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", e),
		...t
	});
}
function _m({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("th", {
		"data-slot": "table-head",
		className: it("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function vm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("td", {
		"data-slot": "table-cell",
		className: it("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function ym({ className: e, ...t }) {
	return /* @__PURE__ */ (0, q.jsx)("caption", {
		"data-slot": "table-caption",
		className: it("mt-4 text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/components/streamlit/table.tsx
var bm = {
	left: "text-left",
	center: "text-center",
	right: "text-right"
};
function xm({ envelope: e }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: "overflow-auto rounded-lg border",
		"data-ssui-component": "table",
		"data-testid": "ssui-v2-table",
		style: { maxHeight: e.props.maxHeight === null ? void 0 : e.props.maxHeight },
		children: /* @__PURE__ */ (0, q.jsxs)(pm, { children: [
			e.props.caption === null ? null : /* @__PURE__ */ (0, q.jsx)(ym, { children: e.props.caption }),
			/* @__PURE__ */ (0, q.jsx)(mm, { children: /* @__PURE__ */ (0, q.jsx)(gm, { children: e.props.columns.map((e) => /* @__PURE__ */ (0, q.jsx)(_m, {
				className: bm[e.align],
				scope: "col",
				children: e.label
			}, e.key)) }) }),
			/* @__PURE__ */ (0, q.jsx)(hm, { children: e.props.rows.map((t, n) => /* @__PURE__ */ (0, q.jsx)(gm, { children: e.props.columns.map((e, r) => /* @__PURE__ */ (0, q.jsx)(vm, {
				className: bm[e.align],
				children: t[r] === null ? "" : String(t[r])
			}, `${n}-${e.key}`)) }, n)) })
		] })
	});
}
//#endregion
//#region src/app.tsx
function Sm({ envelope: e, setStateValue: t, setTriggerValue: n }) {
	switch (e.kind) {
		case "select": return /* @__PURE__ */ (0, q.jsx)(cm, {
			envelope: e,
			setStateValue: t
		});
		case "dropdown_menu": return /* @__PURE__ */ (0, q.jsx)(xf, {
			envelope: e,
			setTriggerValue: n
		});
		case "checkbox": return /* @__PURE__ */ (0, q.jsx)(Qi, {
			envelope: e,
			setStateValue: t
		});
		case "button": return /* @__PURE__ */ (0, q.jsx)(Vr, {
			envelope: e,
			setTriggerValue: n
		});
		case "alert": return /* @__PURE__ */ (0, q.jsx)(ut, { envelope: e });
		case "avatar": return /* @__PURE__ */ (0, q.jsx)(Fn, { envelope: e });
		case "badge": return /* @__PURE__ */ (0, q.jsx)(zn, { envelope: e });
		case "breadcrumb": return /* @__PURE__ */ (0, q.jsx)(or, {
			envelope: e,
			setTriggerValue: n
		});
		case "card": return /* @__PURE__ */ (0, q.jsx)(Jr, { envelope: e });
		case "metric_card": return /* @__PURE__ */ (0, q.jsx)(Yr, { envelope: e });
		case "aspect_ratio": return /* @__PURE__ */ (0, q.jsx)(ft, { envelope: e });
		case "progress": return /* @__PURE__ */ (0, q.jsx)(Gf, { envelope: e });
		case "separator": return /* @__PURE__ */ (0, q.jsx)(um, { envelope: e });
		case "skeleton": return /* @__PURE__ */ (0, q.jsx)(fm, { envelope: e });
		case "table": return /* @__PURE__ */ (0, q.jsx)(xm, { envelope: e });
		case "link_button": return /* @__PURE__ */ (0, q.jsx)(Sf, { envelope: e });
	}
}
//#endregion
//#region src/platform/error-boundary.tsx
var Cm = 3, wm = /* @__PURE__ */ new Map();
function Tm(e, t) {
	let n = e.message.split(":")[0]?.slice(0, 64), r = n && /^SSUI_V2_[A-Z0-9_]+$/.test(n) ? n : "SSUI_V2_RENDER_ERROR", i = wm.get(r) ?? 0;
	i >= Cm || (wm.set(r, i + 1), console.error("SSUI_V2_RENDER_ERROR", {
		code: r,
		componentStack: t.componentStack?.slice(0, 2048)
	}));
}
var Em = class extends S.Component {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		Tm(e, t);
	}
	componentDidUpdate(e) {
		e.resetKey !== this.props.resetKey && this.state.error && this.setState({ error: null });
	}
	render() {
		return this.state.error ? /* @__PURE__ */ (0, q.jsx)("div", {
			"data-ssui-v2-error": !0,
			role: "alert",
			children: "Component unavailable (SSUI_V2_RENDER_ERROR)."
		}) : this.props.children;
	}
};
//#endregion
//#region src/platform/component-shell.tsx
function Dm({ children: e, overlayRoot: t, parentElement: n, resetKey: r }) {
	return /* @__PURE__ */ (0, q.jsx)(Em, {
		resetKey: r,
		children: /* @__PURE__ */ (0, q.jsx)(pf, {
			container: t,
			expectedRoot: n,
			children: e
		})
	});
}
//#endregion
//#region src/platform/theme.ts
function Om(e) {
	let t = Number.parseFloat(e);
	return Number.isFinite(t) ? e.includes("%") ? t / 100 * 255 : t : null;
}
function km(e) {
	let t = e.match(/rgba?\(\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)/), n = e.trim().match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i), r = null;
	if (t) r = [
		Om(t[1] ?? ""),
		Om(t[2] ?? ""),
		Om(t[3] ?? "")
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
function Am(e) {
	return e instanceof ShadowRoot ? e.host : e;
}
var jm = /* @__PURE__ */ new WeakMap(), Mm = /* @__PURE__ */ new WeakMap();
function Nm(e, t, n) {
	n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Pm(e) {
	let t = getComputedStyle(e), n = km(t.getPropertyValue("--st-background-color").trim() || t.backgroundColor), r = km(t.getPropertyValue("--st-primary-color").trim() || "#ff4b4b"), i = n === null ? "light" : n < .18 ? "dark" : "light", a = r !== null && r >= .179 ? "#000000" : "#ffffff";
	e.dataset.ssuiV2Host = "", e.dataset.theme = i, e.style.colorScheme = i, e.style.setProperty("--ssui-v2-primary-foreground", a), e.dir = document.documentElement.dir || "ltr", e.lang = document.documentElement.lang || "en";
}
function Fm(e) {
	let t = Am(e);
	jm.has(t) || jm.set(t, {
		colorScheme: t.style.getPropertyValue("color-scheme"),
		colorSchemePriority: t.style.getPropertyPriority("color-scheme"),
		dataSsuiV2Host: t.getAttribute("data-ssui-v2-host"),
		dataTheme: t.getAttribute("data-theme"),
		dir: t.getAttribute("dir"),
		lang: t.getAttribute("lang"),
		primaryForeground: t.style.getPropertyValue("--ssui-v2-primary-foreground"),
		primaryForegroundPriority: t.style.getPropertyPriority("--ssui-v2-primary-foreground")
	}), Pm(t);
	let n = Mm.get(t);
	n !== void 0 && cancelAnimationFrame(n), Mm.set(t, requestAnimationFrame(() => {
		Mm.delete(t), jm.has(t) && t.isConnected && Pm(t);
	}));
}
function Im(e) {
	let t = Am(e), n = Mm.get(t);
	n !== void 0 && (cancelAnimationFrame(n), Mm.delete(t));
	let r = jm.get(t);
	r && (Nm(t, "data-ssui-v2-host", r.dataSsuiV2Host), Nm(t, "data-theme", r.dataTheme), Nm(t, "dir", r.dir), Nm(t, "lang", r.lang), r.colorScheme ? t.style.setProperty("color-scheme", r.colorScheme, r.colorSchemePriority) : t.style.removeProperty("color-scheme"), r.primaryForeground ? t.style.setProperty("--ssui-v2-primary-foreground", r.primaryForeground, r.primaryForegroundPriority) : t.style.removeProperty("--ssui-v2-primary-foreground"), jm.delete(t));
}
function Lm(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Rm(e) {
	return typeof e == "string" && new TextEncoder().encode(e).byteLength <= 16384;
}
function zm(e) {
	return e === null || Rm(e);
}
function Bm(e) {
	if (!Rm(e)) return !1;
	if (e.startsWith("/") || e.startsWith("#") || e.startsWith("?")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:" || t.protocol === "mailto:";
	} catch {
		return !1;
	}
}
function Vm(e) {
	if (!Rm(e)) return !1;
	if (e.startsWith("data:image/") || e.startsWith("/")) return !0;
	try {
		let t = new URL(e);
		return t.protocol === "http:" || t.protocol === "https:";
	} catch {
		return !1;
	}
}
function Hm(e) {
	return e === null || Vm(e);
}
function Um(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function Wm(e) {
	return typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= 1e4 || typeof e == "string" && /^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$/.test(e);
}
function Gm(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function Km(e, t) {
	return Lm(e) && e.kind === t && Gm(e.clientRevision) && Gm(e.serverRevision);
}
function qm(e) {
	let t = e.props, n = e.state;
	if (!Lm(t) || !Km(n, "select") || !(n.value === null || Rm(n.value)) || !Rm(t.label) || !Rm(t.placeholder) || typeof t.disabled != "boolean" || !Array.isArray(t.options) || t.options.length > 1e4) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.options) {
		if (!Lm(e) || !Rm(e.label) || !Rm(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || i.has(e.value)) return null;
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
function Jm(e) {
	let t = e.props;
	if (!Lm(t) || !Rm(t.label) || !(t.menuLabel === null || Rm(t.menuLabel)) || typeof t.disabled != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!Lm(e) || !Rm(e.label) || !Rm(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || e.variant !== void 0 && e.variant !== "default" && e.variant !== "destructive" || r.has(e.value)) return null;
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
function Ym(e) {
	let t = e.props, n = e.state;
	return !Lm(t) || !Km(n, "checkbox") || typeof n.value != "boolean" || !Rm(t.label) || typeof t.disabled != "boolean" ? null : {
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
var Xm = /* @__PURE__ */ new Set([
	"default",
	"destructive",
	"outline",
	"secondary",
	"ghost",
	"link"
]);
function Zm(e) {
	let t = e.props;
	return !Lm(t) || !Rm(t.text) || typeof t.disabled != "boolean" || typeof t.variant != "string" || !Xm.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "button",
		props: {
			disabled: t.disabled,
			text: t.text,
			variant: t.variant
		}
	};
}
var Qm = /* @__PURE__ */ new Set(["default", "destructive"]), $m = /* @__PURE__ */ new Set([
	"sm",
	"default",
	"lg"
]), eh = /* @__PURE__ */ new Set([
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link"
]);
function th(e) {
	let t = e.props;
	return !Lm(t) || !Rm(t.title) || !zm(t.description) || typeof t.variant != "string" || !Qm.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "alert",
		props: {
			title: t.title,
			description: t.description,
			variant: t.variant
		}
	};
}
function nh(e) {
	let t = e.props;
	return !Lm(t) || !Hm(t.src) || !Rm(t.fallback) || !Rm(t.alt) || typeof t.size != "string" || !$m.has(t.size) ? null : {
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
function rh(e) {
	let t = e.props;
	if (!Lm(t) || !Array.isArray(t.badges) || t.badges.length > 1e4) return null;
	let n = [];
	for (let e of t.badges) {
		if (!Lm(e) || !Rm(e.text) || typeof e.variant != "string" || !eh.has(e.variant)) return null;
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
function ih(e) {
	let t = e.props;
	if (!Lm(t) || !Rm(t.label) || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = 0;
	for (let e of t.items) {
		if (!Lm(e) || !Rm(e.text) || !zm(e.href) || typeof e.current != "boolean") return null;
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
function ah(e) {
	return !Lm(e) || !zm(e.title) || !zm(e.content) || !zm(e.description) || e.size !== "default" && e.size !== "sm" ? null : {
		title: e.title,
		content: e.content,
		description: e.description,
		size: e.size
	};
}
function oh(e, t) {
	let n = ah(e.props);
	return n ? {
		protocolVersion: 1,
		kind: t,
		props: n
	} : null;
}
function sh(e) {
	let t = e.props;
	return !Lm(t) || !Vm(t.src) || !Rm(t.alt) || !Um(t.ratio) || t.ratio <= 0 || t.ratio > 100 ? null : {
		protocolVersion: 1,
		kind: "aspect_ratio",
		props: {
			src: t.src,
			alt: t.alt,
			ratio: t.ratio
		}
	};
}
function ch(e) {
	let t = e.props;
	return !Lm(t) || !Um(t.value) || t.value < 0 || t.value > 100 || !zm(t.label) || typeof t.showValue != "boolean" ? null : {
		protocolVersion: 1,
		kind: "progress",
		props: {
			value: t.value,
			label: t.label,
			showValue: t.showValue
		}
	};
}
function lh(e) {
	let t = e.props;
	return !Lm(t) || t.orientation !== "horizontal" && t.orientation !== "vertical" ? null : {
		protocolVersion: 1,
		kind: "separator",
		props: { orientation: t.orientation }
	};
}
function uh(e) {
	let t = e.props;
	return !Lm(t) || t.shape !== "rectangle" && t.shape !== "circle" || !Wm(t.width) || !Wm(t.height) ? null : {
		protocolVersion: 1,
		kind: "skeleton",
		props: {
			shape: t.shape,
			width: t.width,
			height: t.height
		}
	};
}
function dh(e) {
	return e === null || typeof e == "string" || typeof e == "boolean" || Um(e);
}
function fh(e) {
	let t = e.props;
	if (!Lm(t) || !Array.isArray(t.columns) || !Array.isArray(t.rows) || t.columns.length > 1e4 || t.rows.length > 1e4 || !zm(t.caption) || !(t.maxHeight === null || Number.isSafeInteger(t.maxHeight) && t.maxHeight >= 80 && t.maxHeight <= 1e4)) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.columns) {
		if (!Lm(e) || !Rm(e.key) || !Rm(e.label) || e.align !== "left" && e.align !== "center" && e.align !== "right" || r.has(e.key)) return null;
		r.add(e.key), n.push({
			key: e.key,
			label: e.label,
			align: e.align
		});
	}
	let i = [];
	for (let e of t.rows) {
		if (!Array.isArray(e) || e.length !== n.length || e.some((e) => !dh(e))) return null;
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
function ph(e) {
	let t = e.props;
	return !Lm(t) || !Rm(t.text) || !Bm(t.url) || typeof t.variant != "string" || !Xm.has(t.variant) || typeof t.disabled != "boolean" || t.target !== "_blank" && t.target !== "_self" ? null : {
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
function mh(e) {
	switch (e.kind) {
		case "select": return qm(e);
		case "dropdown_menu": return Jm(e);
		case "checkbox": return Ym(e);
		case "button": return Zm(e);
		case "alert": return th(e);
		case "avatar": return nh(e);
		case "badge": return rh(e);
		case "breadcrumb": return ih(e);
		case "card": return oh(e, "card");
		case "metric_card": return oh(e, "metric_card");
		case "aspect_ratio": return sh(e);
		case "progress": return ch(e);
		case "separator": return lh(e);
		case "skeleton": return uh(e);
		case "table": return fh(e);
		case "link_button": return ph(e);
		default: return null;
	}
}
function hh(e) {
	let t = Lm(e) && typeof e.kind == "string" ? e.kind : "unknown", n = Lm(e) && (typeof e.protocolVersion == "string" || typeof e.protocolVersion == "number") ? String(e.protocolVersion) : "unknown", r = Infinity;
	try {
		r = new TextEncoder().encode(JSON.stringify(e)).byteLength;
	} catch {}
	if (r > 2097152 || !Lm(e) || e.protocolVersion !== 1) return {
		ok: !1,
		failure: {
			code: r > 2097152 ? "SSUI_V2_ENVELOPE_TOO_LARGE" : "SSUI_V2_PROTOCOL_VERSION",
			kind: t,
			protocolVersion: n
		}
	};
	let i = mh(e);
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
var gh = /* @__PURE__ */ new WeakMap();
function _h(e, t, n) {
	let r = e.querySelector(t);
	if (!(r instanceof HTMLElement)) throw Error(`${n}: required component root is missing.`);
	return r;
}
function vh(e, t) {
	let n = _h(e, "[data-ssui-v2-app-root]", "SSUI_V2_APP_ROOT_MISSING"), r = _h(e, "[data-ssui-v2-overlay-root]", "SSUI_V2_OVERLAY_ROOT_MISSING");
	if (n.getRootNode() !== e || r.getRootNode() !== e) throw Error("SSUI_V2_ROOT_OWNERSHIP: component roots escaped parentElement.");
	let i = `ssui-${t.replace(/[^a-zA-Z0-9_-]/g, "-")}-`;
	return {
		appRoot: n,
		overlayRoot: r,
		reactRoot: (0, g.createRoot)(n, { identifierPrefix: i })
	};
}
function yh({ failure: e }) {
	return /* @__PURE__ */ (0, q.jsxs)("div", {
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
var bh = (e) => {
	let { parentElement: t } = e, n = gh.get(t);
	n || (n = vh(t, e.key), gh.set(t, n)), Fm(t);
	let r = hh(e.data), i = r.ok ? `${r.envelope.kind}:${r.envelope.protocolVersion}` : `${r.failure.code}:${r.failure.kind}:${r.failure.protocolVersion}`;
	return n.reactRoot.render(/* @__PURE__ */ (0, q.jsx)(Dm, {
		overlayRoot: n.overlayRoot,
		parentElement: t,
		resetKey: i,
		children: r.ok ? /* @__PURE__ */ (0, q.jsx)(Sm, {
			envelope: r.envelope,
			setStateValue: e.setStateValue,
			setTriggerValue: e.setTriggerValue
		}) : /* @__PURE__ */ (0, q.jsx)(yh, { failure: r.failure })
	})), () => {
		let e = gh.get(t);
		e && (e.reactRoot.unmount(), e.overlayRoot.replaceChildren(), Im(t), gh.delete(t));
	};
};
//#endregion
export { bh as default };
