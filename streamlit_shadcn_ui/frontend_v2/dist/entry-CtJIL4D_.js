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
			t !== null && A(x, t.startTime - e);
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
								u !== null && A(x, u.startTime - t), i = !1;
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
		var ee = new MessageChannel(), k = ee.port2;
		ee.port1.onmessage = D, O = function() {
			k.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function A(t, n) {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, A(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
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
	function ee(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var k = /\/+/g;
	function A(e, t) {
		return typeof e == "object" && e && e.key != null ? ee("" + e.key) : t.toString(36);
	}
	function j(e) {
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
	function M(e, r, i, a, o) {
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
				case d: return c = e._init, M(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + A(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(k, "$&/") + "/"), M(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(k, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + A(a, u), c += M(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + A(a, u++), c += M(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return M(j(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function N(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return M(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function P(e) {
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
	var F = typeof reportError == "function" ? reportError : function(e) {
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
	}, I = {
		map: N,
		forEach: function(e, t, n) {
			N(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return N(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return N(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = I, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
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
			_init: P
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
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, F);
		} catch (e) {
			F(e);
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
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), k = Symbol.for("react.memo_cache_sentinel"), A = Symbol.iterator;
	function j(e) {
		return typeof e != "object" || !e ? null : (e = A && e[A] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var M = Symbol.for("react.client.reference");
	function N(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === M ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case ee: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case D: return t = e.displayName || null, t === null ? N(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return N(e(t));
				} catch {}
		}
		return null;
	}
	var P = Array.isArray, F = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, R = [], z = -1;
	function B(e) {
		return { current: e };
	}
	function V(e) {
		0 > z || (e.current = R[z], R[z] = null, z--);
	}
	function H(e, t) {
		z++, R[z] = e.current, e.current = t;
	}
	var U = B(null), W = B(null), te = B(null), G = B(null);
	function K(e, t) {
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
	function q() {
		V(U), V(W), V(te);
	}
	function ne(e) {
		e.memoizedState !== null && H(G, e);
		var t = U.current, n = Ud(t, e.type);
		t !== n && (H(W, e), H(U, n));
	}
	function J(e) {
		W.current === e && (V(U), V(W)), G.current === e && (V(G), Qf._currentValue = L);
	}
	var re, ie;
	function ae(e) {
		if (re === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			re = t && t[1] || "", ie = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + re + e + ie;
	}
	var oe = !1;
	function se(e, t) {
		if (!e || oe) return "";
		oe = !0;
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
			oe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? ae(n) : "";
	}
	function ce(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return ae(e.type);
			case 16: return ae("Lazy");
			case 13: return e.child !== t && t !== null ? ae("Suspense Fallback") : ae("Suspense");
			case 19: return ae("SuspenseList");
			case 0:
			case 15: return se(e.type, !1);
			case 11: return se(e.type.render, !1);
			case 1: return se(e.type, !0);
			case 31: return ae("Activity");
			default: return "";
		}
	}
	function le(e) {
		try {
			var t = "", n = null;
			do
				t += ce(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ue = Object.prototype.hasOwnProperty, de = t.unstable_scheduleCallback, fe = t.unstable_cancelCallback, pe = t.unstable_shouldYield, me = t.unstable_requestPaint, he = t.unstable_now, ge = t.unstable_getCurrentPriorityLevel, _e = t.unstable_ImmediatePriority, ve = t.unstable_UserBlockingPriority, ye = t.unstable_NormalPriority, be = t.unstable_LowPriority, xe = t.unstable_IdlePriority, Se = t.log, Ce = t.unstable_setDisableYieldValue, we = null, Te = null;
	function Ee(e) {
		if (typeof Se == "function" && Ce(e), Te && typeof Te.setStrictMode == "function") try {
			Te.setStrictMode(we, e);
		} catch {}
	}
	var De = Math.clz32 ? Math.clz32 : Ae, Oe = Math.log, ke = Math.LN2;
	function Ae(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Oe(e) / ke | 0) | 0;
	}
	var je = 256, Me = 262144, Ne = 4194304;
	function Pe(e) {
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
	function Fe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o) : i = Pe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o)) : i = Pe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ie(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Le(e, t) {
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
	function Re() {
		var e = Ne;
		return Ne <<= 1, !(Ne & 62914560) && (Ne = 4194304), e;
	}
	function ze(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Be(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ve(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - De(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && He(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function He(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - De(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ue(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - De(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function We(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ge(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ge(e) {
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
	function Ke(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function qe() {
		var e = I.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Je(e, t) {
		var n = I.p;
		try {
			return I.p = e, t();
		} finally {
			I.p = n;
		}
	}
	var Ye = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + Ye, Ze = "__reactProps$" + Ye, Qe = "__reactContainer$" + Ye, $e = "__reactEvents$" + Ye, et = "__reactListeners$" + Ye, tt = "__reactHandles$" + Ye, nt = "__reactResources$" + Ye, rt = "__reactMarker$" + Ye;
	function it(e) {
		delete e[Xe], delete e[Ze], delete e[$e], delete e[et], delete e[tt];
	}
	function at(e) {
		var t = e[Xe];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Qe] || n[Xe]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[Xe]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function ot(e) {
		if (e = e[Xe] || e[Qe]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function st(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function ct(e) {
		var t = e[nt];
		return t ||= e[nt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function lt(e) {
		e[rt] = !0;
	}
	var ut = /* @__PURE__ */ new Set(), dt = {};
	function ft(e, t) {
		pt(e, t), pt(e + "Capture", t);
	}
	function pt(e, t) {
		for (dt[e] = t, e = 0; e < t.length; e++) ut.add(t[e]);
	}
	var mt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), ht = {}, gt = {};
	function _t(e) {
		return ue.call(gt, e) ? !0 : ue.call(ht, e) ? !1 : mt.test(e) ? gt[e] = !0 : (ht[e] = !0, !1);
	}
	function vt(e, t, n) {
		if (_t(t)) if (n === null) e.removeAttribute(t);
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
	function yt(e, t, n) {
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
	function bt(e, t, n, r) {
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
	function xt(e) {
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
	function St(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ct(e, t, n) {
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
	function wt(e) {
		if (!e._valueTracker) {
			var t = St(e) ? "checked" : "value";
			e._valueTracker = Ct(e, t, "" + e[t]);
		}
	}
	function Tt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = St(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Et(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Dt = /[\n"\\]/g;
	function Ot(e) {
		return e.replace(Dt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function kt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : jt(e, o, xt(n)) : jt(e, o, xt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + xt(s) : e.removeAttribute("name");
	}
	function At(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				wt(e);
				return;
			}
			n = n == null ? "" : "" + xt(n), t = t == null ? n : "" + xt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), wt(e);
	}
	function jt(e, t, n) {
		t === "number" && Et(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Mt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + xt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Nt(e, t, n) {
		if (t != null && (t = "" + xt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + xt(n);
	}
	function Pt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (P(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = xt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), wt(e);
	}
	function Ft(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var It = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Lt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || It.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Rt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Lt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Lt(e, o, t[o]);
	}
	function zt(e) {
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
	var Bt = /* @__PURE__ */ new Map([
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
	]), Vt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Ht(e) {
		return Vt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Ut() {}
	var Wt = null;
	function Gt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Kt = null, qt = null;
	function Jt(e) {
		var t = ot(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ze] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (kt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ot("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ze] || null;
								if (!a) throw Error(i(90));
								kt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Tt(r);
					}
					break a;
				case "textarea":
					Nt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Mt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Yt = !1;
	function Xt(e, t, n) {
		if (Yt) return e(t, n);
		Yt = !0;
		try {
			return e(t);
		} finally {
			if (Yt = !1, (Kt !== null || qt !== null) && (vu(), Kt && (t = Kt, e = qt, qt = Kt = null, Jt(t), e))) for (t = 0; t < e.length; t++) Jt(e[t]);
		}
	}
	function Zt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ze] || null;
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
	var Qt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), $t = !1;
	if (Qt) try {
		var en = {};
		Object.defineProperty(en, "passive", { get: function() {
			$t = !0;
		} }), window.addEventListener("test", en, en), window.removeEventListener("test", en, en);
	} catch {
		$t = !1;
	}
	var tn = null, Y = null, nn = null;
	function rn() {
		if (nn) return nn;
		var e, t = Y, n = t.length, r, i = "value" in tn ? tn.value : tn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return nn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function an(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function on() {
		return !0;
	}
	function sn() {
		return !1;
	}
	function cn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? on : sn, this.isPropagationStopped = sn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = on);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = on);
			},
			persist: function() {},
			isPersistent: on
		}), t;
	}
	var ln = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, X = cn(ln), un = h({}, ln, {
		view: 0,
		detail: 0
	}), dn = cn(un), fn, pn, mn, hn = h({}, un, {
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
	}), gn = cn(hn), _n = cn(h({}, hn, { dataTransfer: 0 })), vn = cn(h({}, un, { relatedTarget: 0 })), yn = cn(h({}, ln, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), bn = cn(h({}, ln, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), xn = cn(h({}, ln, { data: 0 })), Sn = {
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
	var Dn = cn(h({}, un, {
		key: function(e) {
			if (e.key) {
				var t = Sn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = an(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cn[e.keyCode] || "Unidentified" : "";
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
			return e.type === "keypress" ? an(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? an(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), On = cn(h({}, hn, {
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
	})), kn = cn(h({}, un, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: En
	})), Z = cn(h({}, ln, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), An = cn(h({}, hn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), jn = cn(h({}, ln, {
		newState: 0,
		oldState: 0
	})), Mn = [
		9,
		13,
		27,
		32
	], Nn = Qt && "CompositionEvent" in window, Pn = null;
	Qt && "documentMode" in document && (Pn = document.documentMode);
	var Fn = Qt && "TextEvent" in window && !Pn, In = Qt && (!Nn || Pn && 8 < Pn && 11 >= Pn), Ln = " ", Rn = !1;
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
		if (Vn) return e === "compositionend" || !Nn && zn(e, t) ? (e = rn(), nn = Y = tn = null, Vn = !1, e) : null;
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
		Kt ? qt ? qt.push(r) : qt = [r] : Kt = r, t = Ed(t, "onChange"), 0 < t.length && (n = new X("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var qn = null, Jn = null;
	function Yn(e) {
		vd(e, 0);
	}
	function Xn(e) {
		if (Tt(st(e))) return e;
	}
	function Zn(e, t) {
		if (e === "change") return t;
	}
	var Qn = !1;
	if (Qt) {
		var $n;
		if (Qt) {
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
			Kn(t, Jn, e, Gt(e)), Xt(Yn, t);
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
			if (!ue.call(t, i) || !lr(e[i], t[i])) return !1;
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
		for (var t = Et(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Et(e.document);
		}
		return t;
	}
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var gr = Qt && "documentMode" in document && 11 >= document.documentMode, _r = null, vr = null, yr = null, br = !1;
	function xr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		br || _r == null || _r !== Et(r) || (r = _r, "selectionStart" in r && hr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), yr && ur(yr, r) || (yr = r, r = Ed(vr, "onSelect"), 0 < r.length && (t = new X("onSelect", "select", null, t, n), e.push({
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
	Qt && (Tr = document.createElement("div").style, "AnimationEvent" in window || (delete Cr.animationend.animation, delete Cr.animationiteration.animation, delete Cr.animationstart.animation), "TransitionEvent" in window || delete Cr.transitionend.transition);
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
		Pr.set(e, t), ft(t, [e]);
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - De(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Kr(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
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
		else if (typeof e == "string") s = Uf(e, n, U.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ee: return e = Yr(31, n, t, a), e.elementType = ee, e.lanes = o, e;
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
				stack: le(t)
			}, ii.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: le(t)
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
		var i = 32 - De(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - De(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, pi = 1 << 32 - De(t) + i | n << i | r, mi = a + e;
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
		switch (t[Xe] = e, t[Ze] = r, n) {
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
				yd("invalid", t), At(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				yd("invalid", t);
				break;
			case "textarea": yd("invalid", t), Pt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (yd("beforetoggle", t), yd("toggle", t)), r.onScroll != null && yd("scroll", t), r.onScrollEnd != null && yd("scrollend", t), r.onClick != null && (t.onclick = Ut), t = !0) : t = !1, t || Ei(e, !0);
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
			xi = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			xi = uf(e);
		} else t === 27 ? (t = xi, Qd(e.type) ? (e = lf, lf = null, xi = e) : xi = t) : xi = bi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ai() {
		xi = bi = null, Si = !1;
	}
	function ji() {
		var e = Ci;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), Ci = null), e;
	}
	function Mi(e) {
		Ci === null ? Ci = [e] : Ci.push(e);
	}
	var Ni = B(null), Pi = null, Fi = null;
	function Ii(e, t, n) {
		H(Ni, t._currentValue), t._currentValue = n;
	}
	function Li(e) {
		e._currentValue = Ni.current, V(Ni);
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
			} else if (a === G.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
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
	var aa = F.S;
	F.S = function(e, t) {
		Ql = he(), typeof t == "object" && t && typeof t.then == "function" && na(e, t), aa !== null && aa(e, t);
	};
	var oa = B(null);
	function sa() {
		var e = oa.current;
		return e === null ? Nl.pooledCache : e;
	}
	function ca(e, t) {
		t === null ? H(oa, oa.current) : H(oa, t.pool);
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
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Ut, Ut), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ya(e), e;
			default:
				if (typeof t.status == "string") t.then(Ut, Ut);
				else {
					if (e = Nl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
				if (P(t) || j(t)) return t = ei(t, e.mode, n, null), t.return = e, t;
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
				if (P(n) || j(n)) return i === null ? d(e, t, n, r, null) : null;
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
				if (P(r) || j(r)) return e = e.get(n) || null, d(t, e, r, i, null);
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
				if (P(o)) return h(e, r, o, c);
				if (j(o)) {
					if (l = j(o), typeof l != "function") throw Error(i(150));
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
		if (r = r.shared, Ml & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Kr(e), Gr(e, null, n), t;
		}
		return Hr(e, r, t, n), Kr(e);
	}
	function Na(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
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
				if (p ? (Fl & f) === f : (r & f) === f) {
					f !== 0 && f === ea && (Fa = !0), u !== null && (u = u.next = {
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
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
	var Ba = B(null), Va = B(0);
	function Ha(e, t) {
		e = Vl, H(Va, e), H(Ba, t), Vl = e | t.baseLanes;
	}
	function Ua() {
		H(Va, Vl), H(Ba, Ba.current);
	}
	function Wa() {
		Vl = Va.current, V(Ba), V(Va);
	}
	var Ga = B(null), Ka = null;
	function qa(e) {
		var t = e.alternate;
		H(Qa, Qa.current & 1), H(Ga, e), Ka === null && (t === null || Ba.current !== null || t.memoizedState !== null) && (Ka = e);
	}
	function Ja(e) {
		H(Qa, Qa.current), H(Ga, e), Ka === null && (Ka = e);
	}
	function Ya(e) {
		e.tag === 22 ? (H(Qa, Qa.current), H(Ga, e), Ka === null && (Ka = e)) : Xa(e);
	}
	function Xa() {
		H(Qa, Qa.current), H(Ga, Ga.current);
	}
	function Za(e) {
		V(Ga), Ka === e && (Ka = null), V(Qa);
	}
	var Qa = B(0);
	function $a(e) {
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
		return eo = a, to = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, F.H = e === null || e.memoizedState === null ? js : Ms, oo = !1, a = n(r, i), oo = !1, ao && (a = go(t, n, r, i)), ho(e), a;
	}
	function ho(e) {
		F.H = As;
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
			F.H = Ns, o = t(n, r);
		} while (ao);
		return o;
	}
	function _o() {
		var e = F.H, t = e.useState()[0];
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
		return co += 1, lo === null && (lo = []), e = ha(lo, e, t), t = to, (ro === null ? t.memoizedState : ro.next) === null && (t = t.alternate, F.H = t === null || t.memoizedState === null ? js : Ms), e;
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
		}, n === null && (n = Co(), to.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = k;
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
				if (f === u.lane ? (eo & f) === f : (Fl & f) === f) {
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
					}, l === null ? (c = l = f, s = o) : l = l.next = f, to.lanes |= p, Ul |= p;
					f = u.action, oo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, to.lanes |= f, Ul |= f;
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
			if (r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, a, n, t), null), Nl === null) throw Error(i(349));
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
		t !== null && pu(t, e, 2);
	}
	function Lo(e) {
		var t = xo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), oo) {
				Ee(!0);
				try {
					n();
				} finally {
					Ee(!1);
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
			F.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Bo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Bo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = F.T, o = {};
			F.T = o;
			try {
				var s = n(i, r), c = F.S;
				c !== null && c(o, s), Vo(e, t, s);
			} catch (n) {
				Uo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), F.T = a;
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
			var n = Nl.formState;
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
			if (Ml & 2) throw Error(i(440));
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
			Ee(!0);
			try {
				e();
			} finally {
				Ee(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function fs(e, t, n) {
		return n === void 0 || eo & 1073741824 && !(Fl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), to.lanes |= e, Ul |= e, n);
	}
	function ps(e, t, n, r) {
		return lr(n, t) ? n : Ba.current === null ? !(eo & 42) || eo & 1073741824 && !(Fl & 261930) ? (Ys = !0, e.memoizedState = n) : (e = fu(), to.lanes |= e, Ul |= e, t) : (e = fs(e, n, r), lr(e, t) || (Ys = !0), e);
	}
	function ms(e, t, n, r, i) {
		var a = I.p;
		I.p = a !== 0 && 8 > a ? a : 8;
		var o = F.T, s = {};
		F.T = s, Es(e, !1, t, n);
		try {
			var c = i(), l = F.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ts(e, t, ia(c, r), du(e)) : Ts(e, t, r, du(e));
		} catch (n) {
			Ts(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			I.p = a, o !== null && s.types !== null && (o.types = s.types), F.T = o;
		}
	}
	function hs() {}
	function gs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = _s(e).queue;
		ms(e, a, t, L, n === null ? hs : function() {
			return vs(e), n(r);
		});
	}
	function _s(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: L,
			baseState: L,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Do,
				lastRenderedState: L
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
		t.next === null && (t = e.alternate.memoizedState), Ts(e, t.next.queue, {}, du());
	}
	function ys() {
		return Ui(Qf);
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
					var n = du();
					e = ja(n);
					var r = Ma(t, e, n);
					r !== null && (pu(r, t, n), Na(r, t, n)), t = { cache: Xi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Cs(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e) ? Os(t, n) : (n = Ur(e, t, n, r), n !== null && (pu(n, e, r), ks(n, t, r)));
	}
	function ws(e, t, n) {
		Ts(e, t, n, du());
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
				if (i.hasEagerState = !0, i.eagerState = s, lr(s, o)) return Hr(e, t, i, 0), Nl === null && Vr(), !1;
			} catch {}
			if (n = Ur(e, t, i, r), n !== null) return pu(n, e, r), ks(n, t, r), !0;
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
		} else t = Ur(e, n, r, 2), t !== null && pu(t, e, 2);
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
			r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
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
				Ee(!0);
				try {
					e();
				} finally {
					Ee(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = xo();
			if (n !== void 0) {
				var i = n(t);
				if (oo) {
					Ee(!0);
					try {
						n(t);
					} finally {
						Ee(!1);
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
				if (n = t(), Nl === null) throw Error(i(349));
				Fl & 127 || Mo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ts(Po.bind(null, r, o, e), [e]), r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = xo(), t = Nl.identifierPrefix;
			if (Si) {
				var n = mi, r = pi;
				n = (r & ~(1 << 32 - De(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = so++, 0 < n && (t += "H" + n.toString(32)), t += "_";
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
				if (Ml & 2) throw Error(i(440));
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
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Fs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = ja(r);
			i.payload = t, n != null && (i.callback = n), t = Ma(e, i, r), t !== null && (pu(t, e, r), Na(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = ja(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ma(e, i, r), t !== null && (pu(t, e, r), Na(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = ja(n);
			r.tag = 2, t != null && (r.callback = t), t = Ma(e, r, n), t !== null && (pu(t, e, n), Na(t, e, n));
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
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
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
			Us(t, n, r), typeof i != "function" && (tu === null ? tu = /* @__PURE__ */ new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Bi(t, n, a, !0), n = Ga.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ka === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === pa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (Si) return t = Ga.current, t === null ? (r !== Ti && (t = Error(i(423), { cause: r }), Mi(ai(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = ai(r, n), a = Ws(e.stateNode, r, a), Pa(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ti && (e = Error(i(422), { cause: r }), Mi(ai(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = ai(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = ai(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ws(n.stateNode, r, e), Pa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Gs(a), Ks(a, e, n, r), Pa(n, a), !1;
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
				if (Ja(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
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
				if (r = Nl, r !== null && (s = We(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Wr(e, s), pu(r, e, s), Js;
				Tu(), t = ic(e, t, n);
			} else e = o.treeContext, xi = cf(s.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = rc(t, r), t.flags |= 4096;
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
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(Qa.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Si) {
				if (a ? qa(t) : Xa(t), (e = xi) ? (e = rf(e, wi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
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
			else if (qa(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Mi({
					value: r,
					source: null,
					stack: null
				}), t = _c(e, t, n);
			} else if (Ys || Bi(e, t, n, !1), s = (n & e.childLanes) !== 0, Ys || s) {
				if (s = Nl, s !== null && (r = We(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Wr(e, r), pu(s, e, r), Js;
				af(c) || Tu(), t = _c(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, xi = cf(c.nextSibling), bi = t, Si = !0, Ci = null, wi = !1, e !== null && yi(t, e), t = hc(t, r.children), t.flags |= 4096);
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
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, H(Qa, o), Xs(e, t, r, n), r = Si ? li : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
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
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
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
				K(t, t.stateNode.containerInfo), Ii(t, Yi, e.memoizedState.cache), Ai();
				break;
			case 27:
			case 5:
				ne(t);
				break;
			case 4:
				K(t, t.stateNode.containerInfo);
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
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), H(Qa, Qa.current), r) break;
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
						throw t = N(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return sc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Rs(r, t.pendingProps), lc(e, t, r, a, n);
			case 3:
				a: {
					if (K(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
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
						for (xi = cf(e.firstChild), bi = t, Si = !0, Ci = null, wi = !0, n = Da(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
			case 26: return oc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Si || (n = t.type, e = t.pendingProps, r = Vd(te.current).createElement(n), r[Xe] = t, r[Ze] = e, Fd(r, n, e), lt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ne(t), e === null && Si && (r = t.stateNode = ff(t.type, t.pendingProps, te.current), bi = t, wi = !0, a = xi, Qd(t.type) ? (lf = a, xi = cf(r.firstChild)) : xi = a), Xs(e, t, t.pendingProps.children, n), oc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Si && ((a = r = xi) && (r = tf(r, t.type, t.pendingProps, wi), r === null ? a = !1 : (t.stateNode = r, bi = t, xi = cf(r.firstChild), wi = !1, a = !0)), a || Ei(t)), ne(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(a, o) ? r = null : s !== null && Wd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = mo(e, t, _o, null, null, n), Qf._currentValue = a), oc(e, t), Xs(e, t, r, n), t.child;
			case 6: return e === null && Si && ((e = n = xi) && (n = nf(n, t.pendingProps, wi), n === null ? e = !1 : (t.stateNode = n, bi = t, xi = null, e = !0)), e || Ei(t)), null;
			case 13: return mc(e, t, n);
			case 4: return K(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ea(t, null, r, n) : Xs(e, t, r, n), t.child;
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
			case 24: return Hi(t), r = Ui(Yi), e === null ? (a = sa(), a === null && (a = Nl, o = Xi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
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
			else if (Su()) e.flags |= 8192;
			else throw _a = pa, da;
		} else e.flags &= -16777217;
	}
	function Dc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Su()) e.flags |= 8192;
		else throw _a = pa, da;
	}
	function Oc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Re(), e.lanes |= t, ql |= t);
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
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Li(Yi), q(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ki(t) ? Tc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ji())), Ac(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Tc(t), o === null ? (Ac(t), Ec(t, a, null, r, n)) : (Ac(t), Dc(t, o))) : o ? o === e.memoizedState ? (Ac(t), t.flags &= -16777217) : (Tc(t), Ac(t), Dc(t, o)) : (e = e.memoizedProps, e !== r && Tc(t), Ac(t), Ec(t, a, e, r, n)), null;
			case 27:
				if (J(t), n = te.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					e = U.current, ki(t) ? Di(t, e) : (e = ff(a, r, n), t.stateNode = e, Tc(t));
				}
				return Ac(t), null;
			case 5:
				if (J(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					if (o = U.current, ki(t)) Di(t, o);
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
						o[Xe] = t, o[Ze] = r;
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
					if (e = te.current, ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Xe] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ei(t, !0);
					} else e = Vd(e).createTextNode(r), e[Xe] = t, t.stateNode = e;
				}
				return Ac(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Xe] = t;
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
							a[Xe] = t;
						} else Ai(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), a = !1;
					} else a = ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Za(t), t) : (Za(t), null);
				}
				return Za(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Oc(t, t.updateQueue), Ac(t), null);
			case 4: return q(), e === null && Sd(t.stateNode.containerInfo), Ac(t), null;
			case 10: return Li(t.type), Ac(t), null;
			case 19:
				if (V(Qa), r = t.memoizedState, r === null) return Ac(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) kc(r, !1);
				else {
					if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = $a(e), o !== null) {
							for (t.flags |= 128, kc(r, !1), e = o.updateQueue, t.updateQueue = e, Oc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Qr(n, e), n = n.sibling;
							return H(Qa, Qa.current & 1 | 2), Si && hi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && he() > $l && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = $a(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Oc(t, e), kc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Si) return Ac(t), null;
					} else 2 * he() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ac(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = he(), e.sibling = null, n = Qa.current, H(Qa, a ? n & 1 | 2 : n & 1), Si && hi(t, r.treeForkCount), e);
			case 22:
			case 23: return Za(t), Wa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ac(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ac(t), n = t.updateQueue, n !== null && Oc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && V(oa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Li(Yi), Ac(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e, t) {
		switch (vi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Li(Yi), q(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return J(t), null;
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
			case 19: return V(Qa), null;
			case 4: return q(), null;
			case 10: return Li(t.type), null;
			case 22:
			case 23: return Za(t), Wa(), e !== null && V(oa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Li(Yi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Nc(e, t) {
		switch (vi(t), t.tag) {
			case 3:
				Li(Yi), q();
				break;
			case 26:
			case 27:
			case 5:
				J(t);
				break;
			case 4:
				q();
				break;
			case 31:
				t.memoizedState !== null && Za(t);
				break;
			case 13:
				Za(t);
				break;
			case 19:
				V(Qa);
				break;
			case 10:
				Li(t.type);
				break;
			case 22:
			case 23:
				Za(t), Wa(), e !== null && V(oa);
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
			Id(r, e.type, n, t), r[Ze] = t;
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
	function Q(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ut));
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Q(e, t, n), e = e.sibling; e !== null;) Q(e, t, n), e = e.sibling;
	}
	function Wc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Wc(e, t, n), e = e.sibling; e !== null;) Wc(e, t, n), e = e.sibling;
	}
	function Gc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[Xe] = e, t[Ze] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var Kc = !1, qc = !1, Jc = !1, Yc = typeof WeakSet == "function" ? WeakSet : Set, Xc = null;
	function Zc(e, t) {
		if (e = e.containerInfo, zd = sp, e = mr(e), hr(e)) {
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
		}, sp = !1, Xc = t; Xc !== null;) if (t = Xc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Xc = e;
		else for (; Xc !== null;) {
			switch (t = Xc, o = t.alternate, e = t.flags, t.tag) {
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
				e.return = t.return, Xc = e;
				break;
			}
			Xc = t.return;
		}
	}
	function Qc(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				pl(e, n), r & 4 && Pc(5, n);
				break;
			case 1:
				if (pl(e, n), r & 4) if (e = n.stateNode, t === null) try {
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
				if (pl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
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
			case 27: t === null && r & 4 && Gc(n);
			case 26:
			case 5:
				pl(e, n), t === null && r & 4 && Bc(n), r & 512 && Rc(n, n.return);
				break;
			case 12:
				pl(e, n);
				break;
			case 31:
				pl(e, n), r & 4 && il(e, n);
				break;
			case 13:
				pl(e, n), r & 4 && al(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Kc, !r) {
					t = t !== null && t.memoizedState !== null || qc, i = Kc;
					var a = qc;
					Kc = r, (qc = t) && !a ? hl(e, n, !!(n.subtreeFlags & 8772)) : pl(e, n), Kc = i, qc = a;
				}
				break;
			case 30: break;
			default: pl(e, n);
		}
	}
	function $c(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, $c(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && it(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var el = null, tl = !1;
	function nl(e, t, n) {
		for (n = n.child; n !== null;) rl(e, t, n), n = n.sibling;
	}
	function rl(e, t, n) {
		if (Te && typeof Te.onCommitFiberUnmount == "function") try {
			Te.onCommitFiberUnmount(we, n);
		} catch {}
		switch (n.tag) {
			case 26:
				qc || zc(n, t), nl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				qc || zc(n, t);
				var r = el, i = tl;
				Qd(n.type) && (el = n.stateNode, tl = !1), nl(e, t, n), pf(n.stateNode), el = r, tl = i;
				break;
			case 5: qc || zc(n, t);
			case 6:
				if (r = el, i = tl, el = null, nl(e, t, n), el = r, tl = i, el !== null) if (tl) try {
					(el.nodeType === 9 ? el.body : el.nodeName === "HTML" ? el.ownerDocument.body : el).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					el.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				el !== null && (tl ? (e = el, $(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : $(el, n.stateNode));
				break;
			case 4:
				r = el, i = tl, el = n.stateNode.containerInfo, tl = !0, nl(e, t, n), el = r, tl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Fc(2, n, t), qc || Fc(4, n, t), nl(e, t, n);
				break;
			case 1:
				qc || (zc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Lc(n, t, r)), nl(e, t, n);
				break;
			case 21:
				nl(e, t, n);
				break;
			case 22:
				qc = (r = qc) || n.memoizedState !== null, nl(e, t, n), qc = r;
				break;
			default: nl(e, t, n);
		}
	}
	function il(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function al(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function ol(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Yc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Yc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function sl(e, t) {
		var n = ol(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function cl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Qd(c.type)) {
							el = c.stateNode, tl = !1;
							break a;
						}
						break;
					case 5:
						el = c.stateNode, tl = !1;
						break a;
					case 3:
					case 4:
						el = c.stateNode.containerInfo, tl = !0;
						break a;
				}
				c = c.return;
			}
			if (el === null) throw Error(i(160));
			rl(o, s, a), el = null, tl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) ul(t, e), t = t.sibling;
	}
	var ll = null;
	function ul(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				cl(t, e), dl(e), r & 4 && (Fc(3, e, e.return), Pc(3, e), Fc(5, e, e.return));
				break;
			case 1:
				cl(t, e), dl(e), r & 512 && (qc || n === null || zc(n, n.return)), r & 64 && Kc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = ll;
				if (cl(t, e), dl(e), r & 512 && (qc || n === null || zc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[rt] || o[Xe] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Fd(o, r, n), o[Xe] = e, lt(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Xe] = e, lt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Vc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				cl(t, e), dl(e), r & 512 && (qc || n === null || zc(n, n.return)), n !== null && r & 4 && Vc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (cl(t, e), dl(e), r & 512 && (qc || n === null || zc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ft(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Jc = !0);
				break;
			case 6:
				if (cl(t, e), dl(e), r & 4) {
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
				if (Bf = null, a = ll, ll = gf(t.containerInfo), cl(t, e), ll = a, dl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Jc && (Jc = !1, fl(e));
				break;
			case 4:
				r = ll, ll = gf(e.stateNode.containerInfo), cl(t, e), dl(e), ll = r;
				break;
			case 12:
				cl(t, e), dl(e);
				break;
			case 31:
				cl(t, e), dl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, sl(e, r)));
				break;
			case 13:
				cl(t, e), dl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = he()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, sl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Kc, d = qc;
				if (Kc = u || a, qc = d || l, cl(t, e), qc = d, Kc = u, dl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Kc || qc || ml(e)), n = null, t = e;;) {
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
								a ? $d(m, !0) : $d(l.stateNode, !1);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, sl(e, n))));
				break;
			case 19:
				cl(t, e), dl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, sl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: cl(t, e), dl(e);
		}
	}
	function dl(e) {
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
						Wc(e, Uc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ft(o, ""), n.flags &= -33), Wc(e, Uc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Q(e, Uc(e), s);
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
	function fl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			fl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function pl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Qc(e, t.alternate, t), t = t.sibling;
	}
	function ml(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Fc(4, t, t.return), ml(t);
					break;
				case 1:
					zc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Lc(t, t.return, n), ml(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					zc(t, t.return), ml(t);
					break;
				case 22:
					t.memoizedState === null && ml(t);
					break;
				case 30:
					ml(t);
					break;
				default: ml(t);
			}
			e = e.sibling;
		}
	}
	function hl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					hl(i, a, n), Pc(4, a);
					break;
				case 1:
					if (hl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
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
				case 27: Gc(a);
				case 26:
				case 5:
					hl(i, a, n), n && r === null && o & 4 && Bc(a), Rc(a, a.return);
					break;
				case 12:
					hl(i, a, n);
					break;
				case 31:
					hl(i, a, n), n && o & 4 && il(i, a);
					break;
				case 13:
					hl(i, a, n), n && o & 4 && al(i, a);
					break;
				case 22:
					a.memoizedState === null && hl(i, a, n), Rc(a, a.return);
					break;
				case 30: break;
				default: hl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function gl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Zi(n));
	}
	function _l(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e));
	}
	function vl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) yl(e, t, n, r), t = t.sibling;
	}
	function yl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				vl(e, t, n, r), i & 2048 && Pc(9, t);
				break;
			case 1:
				vl(e, t, n, r);
				break;
			case 3:
				vl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zi(e)));
				break;
			case 12:
				if (i & 2048) {
					vl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else vl(e, t, n, r);
				break;
			case 31:
				vl(e, t, n, r);
				break;
			case 13:
				vl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? vl(e, t, n, r) : (a._visibility |= 2, bl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? vl(e, t, n, r) : xl(e, t), i & 2048 && gl(o, t);
				break;
			case 24:
				vl(e, t, n, r), i & 2048 && _l(t.alternate, t);
				break;
			default: vl(e, t, n, r);
		}
	}
	function bl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					bl(a, o, s, c, i), Pc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, bl(a, o, s, c, i)) : u._visibility & 2 ? bl(a, o, s, c, i) : xl(a, o), i && l & 2048 && gl(o.alternate, o);
					break;
				case 24:
					bl(a, o, s, c, i), i && l & 2048 && _l(o.alternate, o);
					break;
				default: bl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					xl(n, r), i & 2048 && gl(r.alternate, r);
					break;
				case 24:
					xl(n, r), i & 2048 && _l(r.alternate, r);
					break;
				default: xl(n, r);
			}
			t = t.sibling;
		}
	}
	var Sl = 8192;
	function Cl(e, t, n) {
		if (e.subtreeFlags & Sl) for (e = e.child; e !== null;) wl(e, t, n), e = e.sibling;
	}
	function wl(e, t, n) {
		switch (e.tag) {
			case 26:
				Cl(e, t, n), e.flags & Sl && e.memoizedState !== null && Gf(n, ll, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Cl(e, t, n);
				break;
			case 3:
			case 4:
				var r = ll;
				ll = gf(e.stateNode.containerInfo), Cl(e, t, n), ll = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Sl, Sl = 16777216, Cl(e, t, n), Sl = r) : Cl(e, t, n));
				break;
			default: Cl(e, t, n);
		}
	}
	function Tl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function El(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Xc = r, kl(r, e);
			}
			Tl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Dl(e), e = e.sibling;
	}
	function Dl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				El(e), e.flags & 2048 && Fc(9, e, e.return);
				break;
			case 3:
				El(e);
				break;
			case 12:
				El(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ol(e)) : El(e);
				break;
			default: El(e);
		}
	}
	function Ol(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Xc = r, kl(r, e);
			}
			Tl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, t, t.return), Ol(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ol(t));
					break;
				default: Ol(t);
			}
			e = e.sibling;
		}
	}
	function kl(e, t) {
		for (; Xc !== null;) {
			var n = Xc;
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
			if (r = n.child, r !== null) r.return = n, Xc = r;
			else a: for (n = e; Xc !== null;) {
				r = Xc;
				var i = r.sibling, a = r.return;
				if ($c(r), r === n) {
					Xc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Xc = i;
					break a;
				}
				Xc = a;
			}
		}
	}
	var Al = {
		getCacheForType: function(e) {
			var t = Ui(Yi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ui(Yi).controller.signal;
		}
	}, jl = typeof WeakMap == "function" ? WeakMap : Map, Ml = 0, Nl = null, Pl = null, Fl = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return Ml & 2 && Fl !== 0 ? Fl & -Fl : F.T === null ? qe() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Fl & 536870912) || Si) {
			var e = Me;
			Me <<= 1, !(Me & 3932160) && (Me = 262144), Kl = e;
		} else Kl = 536870912;
		return e = Ga.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Nl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Fl, Kl, !1)), Be(e, n), (!(Ml & 2) || e !== Nl) && (e === Nl && (!(Ml & 2) && (Wl |= n), Hl === 4 && _u(e, Fl, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (Ml & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ie(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				zl && !r && _u(e, t, 0, !1);
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
							if (Bl && !l) {
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
						_u(r, t, Kl, !Rl);
						break a;
					case 2:
						Yl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = Zl + 300 - he(), 10 < a)) {
					if (_u(r, t, Kl, !Rl), Fe(r, 0, !0) !== 0) break a;
					au = t, r.timeoutHandle = qd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, "Throttled", -0, 0), a);
					break a;
				}
				hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, null, -0, 0);
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
				unsuspend: Ut
			}, wl(t, a, d);
			var m = (a & 62914560) === a ? Zl - he() : (a & 4194048) === a ? Ql - he() : 0;
			if (m = qf(d, m), m !== null) {
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
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - De(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && He(e, n, t);
	}
	function vu() {
		return Ml & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Pl !== null) {
			if (Il === 0) var e = Pl.return;
			else e = Pl, Fi = Pi = null, bo(e), ba = null, xa = 0, e = Pl;
			for (; e !== null;) Nc(e.alternate, e), e = e.return;
			Pl = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Nl = e, Pl = n = Zr(e.current, null), Fl = t, Il = 0, Ll = null, Rl = !1, zl = Ie(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - De(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Vr(), n;
	}
	function xu(e, t) {
		to = null, F.H = As, t === ua || t === fa ? (t = va(), Il = 3) : t === da ? (t = va(), Il = 4) : Il = t === Js ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Pl === null && (Hl = 1, Hs(e, ai(t, e.current)));
	}
	function Su() {
		var e = Ga.current;
		return e === null ? !0 : (Fl & 4194048) === Fl ? Ka === null : (Fl & 62914560) === Fl || Fl & 536870912 ? e === Ka : !1;
	}
	function Cu() {
		var e = F.H;
		return F.H = As, e === null ? As : e;
	}
	function wu() {
		var e = F.A;
		return F.A = Al, e;
	}
	function Tu() {
		Hl = 4, Rl || (Fl & 4194048) !== Fl && Ga.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Nl === null || _u(Nl, Fl, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = Ml;
		Ml |= 2;
		var i = Cu(), a = wu();
		(Nl !== e || Fl !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Pl !== null) {
					var s = Pl, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ga.current === null && (t = !0);
							var l = Il;
							if (Il = 0, Ll = null, Mu(e, s, c, l), n && zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Il, Il = 0, Ll = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Hl;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Fi = Pi = null, Ml = r, F.H = i, F.A = a, Pl === null && (Nl = null, Fl = 0, Vr()), o;
	}
	function Du() {
		for (; Pl !== null;) Au(Pl);
	}
	function Ou(e, t) {
		var n = Ml;
		Ml |= 2;
		var r = Cu(), a = wu();
		Nl !== e || Fl !== t ? (eu = null, $l = he() + 500, bu(e, t)) : zl = Ie(e, t);
		a: do
			try {
				if (Il !== 0 && Pl !== null) {
					t = Pl;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ma(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Nl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							ma(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Pl.tag) {
								case 26: s = Pl.memoizedState;
								case 5:
								case 27:
									var c = Pl;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Pl = l;
										else {
											var u = c.return;
											u === null ? Pl = null : (Pl = u, Nu(u));
										}
										break b;
									}
							}
							Il = 0, Ll = null, Mu(e, t, o, 5);
							break;
						case 6:
							Il = 0, Ll = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Hl = 6;
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
		return Fi = Pi = null, F.H = r, F.A = a, Ml = n, Pl === null ? (Nl = null, Fl = 0, Vr(), Hl) : 0;
	}
	function ku() {
		for (; Pl !== null && !pe();) Au(Pl);
	}
	function Au(e) {
		var t = wc(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Pl = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = cc(n, t, t.pendingProps, t.type, void 0, Fl);
				break;
			case 11:
				t = cc(n, t, t.pendingProps, t.type.render, t.ref, Fl);
				break;
			case 5: bo(t);
			default: Nc(n, t), t = Pl = Qr(t, Vl), t = wc(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Pl = t;
	}
	function Mu(e, t, n, r) {
		Fi = Pi = null, bo(t), ba = null, xa = 0;
		var i = t.return;
		try {
			if (qs(e, i, t, n, Fl)) {
				Hl = 1, Hs(e, ai(n, e.current)), Pl = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Pl = i, t;
			Hl = 1, Hs(e, ai(n, e.current)), Pl = null;
			return;
		}
		t.flags & 32768 ? (Si || r === 1 ? e = !0 : zl || Fl & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ga.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = jc(t.alternate, t, Vl);
			if (n !== null) {
				Pl = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Pl = t;
				return;
			}
			Pl = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Mc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Pl = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Pl = e;
				return;
			}
			Pl = e = n;
		} while (e !== null);
		Hl = 6, Pl = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (Ml & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Br, Ve(e, n, o, s, c, l), e === Nl && (Pl = Nl = null, Fl = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(ye, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = F.T, F.T = null, a = I.p, I.p = 2, s = Ml, Ml |= 4;
				try {
					Zc(e, t, n);
				} finally {
					Ml = s, I.p = a, F.T = r;
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
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = Ml;
				Ml |= 4;
				try {
					ul(t, e);
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
					sp = !!zd, Bd = zd = null;
				} finally {
					Ml = i, I.p = r, F.T = n;
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
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = Ml;
				Ml |= 4;
				try {
					Qc(e, t.alternate, t);
				} finally {
					Ml = i, I.p = r, F.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, me();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), Ke(n), t = t.stateNode, Te && typeof Te.onCommitFiberRoot == "function") try {
				Te.onCommitFiberRoot(we, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = F.T, i = I.p, I.p = 2, F.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					F.T = t, I.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Zi(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = Ke(au), r = F.T, a = I.p;
		try {
			I.p = 32 > n ? 32 : n, F.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, Ml & 6) throw Error(i(331));
			var c = Ml;
			if (Ml |= 4, Dl(o.current), yl(o, o.current, s, n), Ml = c, rd(0, !1), Te && typeof Te.onPostCommitFiberRoot == "function") try {
				Te.onPostCommitFiberRoot(we, o);
			} catch {}
			return !0;
		} finally {
			I.p = a, F.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = ai(n, t), t = Ws(e.stateNode, t, 2), e = Ma(e, t, 2), e !== null && (Be(e, 2), nd(e));
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
					e = ai(n, e), n = Gs(2), r = Ma(t, n, 2), r !== null && (Ks(n, r, t, e), Be(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new jl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Nl === e && (Fl & n) === n && (Hl === 4 || Hl === 3 && (Fl & 62914560) === Fl && 300 > he() - Zl ? !(Ml & 2) && bu(e, 0) : Gl |= n, ql === Fl && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = Re()), e = Wr(e, t), e !== null && (Be(e, t), nd(e));
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
		return de(e, t);
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
							a = (1 << 31 - De(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Fl, a = Fe(r, r === Nl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ie(r, a) || (n = !0, cd(r, a));
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
		for (var t = he(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - De(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Le(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Nl, n = Fl, n = Fe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && fe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ie(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && fe(r), Ke(n)) {
				case 2:
				case 8:
					n = ve;
					break;
				case 32:
					n = ye;
					break;
				case 268435456:
					n = xe;
					break;
				default: n = ye;
			}
			return r = sd.bind(null, e), n = de(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && fe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Fl;
		return r = Fe(e, e === Nl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, he()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Xd(function() {
			Ml & 6 ? de(_e, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ea;
			e === 0 && (e = je, je <<= 1, !(je & 261888) && (je = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ht("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[Ze] || null).action), o = r.submitter;
			o && (t = (t = o[Ze] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new X("action", "action", null, r, i);
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
	Ir(Dr, "onAnimationEnd"), Ir(Or, "onAnimationIteration"), Ir(kr, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Ar, "onTransitionRun"), Ir(jr, "onTransitionStart"), Ir(Mr, "onTransitionCancel"), Ir(Nr, "onTransitionEnd"), pt("onMouseEnter", ["mouseout", "mouseover"]), pt("onMouseLeave", ["mouseout", "mouseover"]), pt("onPointerEnter", ["pointerout", "pointerover"]), pt("onPointerLeave", ["pointerout", "pointerover"]), ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ft("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
		var n = t[$e];
		n === void 0 && (n = t[$e] = /* @__PURE__ */ new Set());
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
			e[xd] = !0, ut.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !$t || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = at(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Xt(function() {
			var r = a, i = Gt(n), s = [];
			a: {
				var c = Pr.get(e);
				if (c !== void 0) {
					var l = X, u = e;
					switch (e) {
						case "keypress": if (an(n) === 0) break a;
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
						case Dr:
						case Or:
						case kr:
							l = yn;
							break;
						case Nr:
							l = Z;
							break;
						case "scroll":
						case "scrollend":
							l = dn;
							break;
						case "wheel":
							l = An;
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
						case "beforetoggle": l = jn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Zt(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Wt && (u = n.relatedTarget || n.fromElement) && (at(u) || u[Qe])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? at(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = gn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = On, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : st(l), h = u == null ? c : st(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, at(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? st(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Zn;
					else if (Gn(c)) if (Qn) v = sr;
					else {
						v = ar;
						var y = ir;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && zt(r.elementType) && (v = Zn) : v = or;
					if (v &&= v(e, r)) {
						Kn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && jt(c, "number", c.value);
				}
				switch (y = r ? st(r) : window, e) {
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
				x && (In && n.locale !== "ko" && (Vn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Vn && (b = rn()) : (tn = i, Y = "value" in tn ? tn.value : tn.textContent, Vn = !0)), y = Ed(r, x), 0 < y.length && (x = new xn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Bn(n), b !== null && (x.data = b)))), (b = Fn ? Hn(e, n) : Un(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new xn("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Zt(e, n), i != null && r.unshift(Td(e, i, a)), i = Zt(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Zt(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = Zt(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ft(e, "" + r);
				break;
			case "className":
				yt(e, "class", r);
				break;
			case "tabIndex":
				yt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				yt(e, n, r);
				break;
			case "style":
				Rt(e, r, o);
				break;
			case "data": if (t !== "object") {
				yt(e, "data", r);
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
				r = Ht("" + r), e.setAttribute(n, r);
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
				r = Ht("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
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
				n = Ht("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				yd("beforetoggle", e), yd("toggle", e), vt(e, "popover", r);
				break;
			case "xlinkActuate":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				bt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				bt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				vt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Bt.get(n) || n, vt(e, n, r));
		}
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Rt(e, r, o);
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
				typeof r == "string" ? Ft(e, r) : (typeof r == "number" || typeof r == "bigint") && Ft(e, "" + r);
				break;
			case "onScroll":
				r != null && yd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && yd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Ut);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!dt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Ze] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : vt(e, n, r);
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
				At(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Mt(e, !!r, n, !0) : Mt(e, !!r, t, !1);
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
				Pt(e, r, a, o);
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
			default: if (zt(t)) {
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
				kt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Mt(e, !!n, n ? [] : "", !1) : Mt(e, !!n, t, !0)) : Mt(e, !!n, p, !1);
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
				Nt(e, p, m);
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
			default: if (zt(t)) {
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
	function $(e, t) {
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
					a[rt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
			else if (!e[rt]) switch (t) {
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
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		it(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = I.d;
	I.d = {
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
		var e = _f.f(), t = vu();
		return e || t;
	}
	function yf(e) {
		var t = ot(e);
		t !== null && t.tag === 5 && t.type === "form" ? vs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Ot(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), lt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Ot(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ot(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ot(n.imageSizes) + "\"]")) : i += "[href=\"" + Ot(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Fd(t, "link", e), lt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ot(r) + "\"][href=\"" + Ot(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
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
				r = n.createElement("link"), Fd(r, "link", e), lt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = ct(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					lt(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = ct(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), lt(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = ct(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), lt(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = te.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = ct(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = ct(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = ct(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Ot(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), lt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Ot(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ot(n.href) + "\"]");
				if (r) return t.instance = r, lt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), lt(r), Fd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, lt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), lt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, lt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), lt(a), Fd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[rt] || a[Xe] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, lt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), lt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Fd(a, "link", r), n.instance = a;
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
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Rd());
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
		_currentValue: L,
		_currentValue2: L,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ze(0), this.hiddenUpdates = ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
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
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = ja(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ma(e, r, t), n !== null && (pu(n, e, t), Na(n, e, t));
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
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = Ge(t);
			var n = Wr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = F.T;
		F.T = null;
		var a = I.p;
		try {
			I.p = 2, up(e, t, n, r);
		} finally {
			I.p = a, F.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = F.T;
		F.T = null;
		var a = I.p;
		try {
			I.p = 8, up(e, t, n, r);
		} finally {
			I.p = a, F.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = ot(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Pe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - De(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(Ml & 6) && ($l = he() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Wr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Gt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = at(e), e !== null) {
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
			case "message": switch (ge()) {
				case _e: return 2;
				case ve: return 8;
				case ye:
				case be: return 32;
				case xe: return 268435456;
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
		}, t !== null && (t = ot(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = at(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Je(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Je(e.priority, function() {
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
				Wt = r, n.target.dispatchEvent(r), Wt = null;
			} else return t = ot(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = ot(n);
				a !== null && (e.splice(t, 3), t -= 3, gs(a, {
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
			var i = n[r], a = n[r + 1], o = i[Ze] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ze] || null) s = o.formAction;
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
		np(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), vu(), t[Qe] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = qe();
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
	I.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: F,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			we = zp.inject(Rp), Te = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = zs, s = Bs, c = Vs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[Qe] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
}));
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function _() {
	return typeof window < "u";
}
function v(e) {
	return x(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function b(e) {
	return ((x(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function x(e) {
	return _() ? e instanceof Node || e instanceof y(e).Node : !1;
}
function S(e) {
	return _() ? e instanceof Element || e instanceof y(e).Element : !1;
}
function C(e) {
	return _() ? e instanceof HTMLElement || e instanceof y(e).HTMLElement : !1;
}
function w(e) {
	return !_() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof y(e).ShadowRoot;
}
function T(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = F(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function E(e) {
	return /^(table|td|th)$/.test(v(e));
}
function D(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var O = /transform|translate|scale|rotate|perspective|filter/, ee = /paint|layout|strict|content/, k = (e) => !!e && e !== "none", A;
function j(e) {
	let t = S(e) ? F(e) : e;
	return k(t.transform) || k(t.translate) || k(t.scale) || k(t.rotate) || k(t.perspective) || !N() && (k(t.backdropFilter) || k(t.filter)) || O.test(t.willChange || "") || ee.test(t.contain || "");
}
function M(e) {
	let t = L(e);
	for (; C(t) && !P(t);) {
		if (j(t)) return t;
		if (D(t)) return null;
		t = L(t);
	}
	return null;
}
function N() {
	return A ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), A;
}
function P(e) {
	return /^(html|body|#document)$/.test(v(e));
}
function F(e) {
	return y(e).getComputedStyle(e);
}
function I(e) {
	return S(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function L(e) {
	if (v(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || w(e) && e.host || b(e);
	return w(t) ? t.host : t;
}
function R(e) {
	let t = L(e);
	return P(t) ? (e.ownerDocument || e).body : C(t) && T(t) ? t : R(t);
}
function z(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = R(e), i = r === e.ownerDocument?.body, a = y(r);
	if (i) {
		let e = B(a);
		return t.concat(a, a.visualViewport || [], T(r) ? r : [], e && n ? z(e) : []);
	}
	return t.concat(r, z(r, [], n));
}
function B(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/safeReact.mjs
var V = /* @__PURE__ */ c(f(), 1), H = { ...V }, U = {};
function W(e, t) {
	let n = V.useRef(U);
	return n.current === U && (n.current = e(t)), n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useStableCallback.mjs
var te = H.useInsertionEffect, G = te && te !== H.useLayoutEffect ? te : (e) => e();
function K(e) {
	let t = W(q).current;
	return t.next = e, G(t.effect), t.trampoline;
}
function q() {
	let e = {
		next: void 0,
		callback: ne,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function ne() {}
var J = typeof document < "u" ? V.useLayoutEffect : () => {};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeObjects.mjs
function re(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/merge-props/mergeProps.mjs
var ie = {};
function ae(e, t, n, r, i) {
	if (!n && !r && !i && !e) return se(t);
	let a = se(e);
	return t && (a = ce(a, t)), n && (a = ce(a, n)), r && (a = ce(a, r)), i && (a = ce(a, i)), a;
}
function oe(e) {
	if (e.length === 0) return ie;
	if (e.length === 1) return se(e[0]);
	let t = se(e[0]);
	for (let n = 1; n < e.length; n += 1) t = ce(t, e[n]);
	return t;
}
function se(e) {
	return fe(e) ? { ...pe(e, ie) } : le(e);
}
function ce(e, t) {
	return fe(t) ? pe(t, e) : ue(e, t);
}
function le(e) {
	let t = { ...e };
	for (let e in t) {
		let n = t[e];
		de(e, n) && (t[e] = he(n));
	}
	return t;
}
function ue(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = re(e.style, r);
				break;
			case "className":
				e[n] = _e(e.className, r);
				break;
			default: e[n] = de(n, r) ? me(e[n], r) : r;
		}
	}
	return e;
}
function de(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function fe(e) {
	return typeof e == "function";
}
function pe(e, t) {
	return fe(e) ? e(t) : e ?? ie;
}
function me(e, t) {
	return t ? e ? (...n) => {
		let r = n[0];
		if (ve(r)) {
			let i = r;
			ge(i);
			let a = t(...n);
			return i.baseUIHandlerPrevented || e?.(...n), a;
		}
		let i = t(...n);
		return e?.(...n), i;
	} : he(t) : e;
}
function he(e) {
	return e && ((...t) => {
		let n = t[0];
		return ve(n) && ge(n), e(...t);
	});
}
function ge(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function _e(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function ve(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/formatErrorMessage.mjs
function ye(e, t) {
	return function(n, ...r) {
		let i = new URL(e);
		return i.searchParams.set("code", n.toString()), r.forEach((e) => i.searchParams.append("args[]", e)), `${t} error #${n}; visit ${i} for the full message.`;
	};
}
var be = ye("https://base-ui.com/production-error", "Base UI"), xe = /*#__PURE__*/ V.createContext(void 0);
function Se(e = !1) {
	let t = V.useContext(xe);
	if (t === void 0 && !e) throw Error(be(16));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function Ce(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, o = r && t !== !1, s = r && t === !1;
	return { props: V.useMemo(() => {
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
function we(e = {}) {
	let { disabled: t = !1, focusableWhenDisabled: n, tabIndex: r = 0, native: i = !0, composite: a } = e, o = V.useRef(null), s = Se(!0), c = a ?? s !== void 0, { props: l } = Ce({
		focusableWhenDisabled: n,
		disabled: t,
		composite: c,
		tabIndex: r,
		isNativeButton: i
	}), u = V.useCallback(() => {
		let e = o.current;
		Te(e) && c && t && l.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		t,
		l.disabled,
		c
	]);
	return J(u, [u]), {
		getButtonProps: V.useCallback((e = {}) => {
			let { onClick: n, onMouseDown: r, onKeyUp: a, onKeyDown: o, onPointerDown: s, ...u } = e;
			return ae({
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
					if (t || (ge(e), o?.(e), e.baseUIHandlerPrevented)) return;
					let r = e.target === e.currentTarget, a = e.currentTarget, s = Te(a), l = !i && Ee(a), u = r && (i ? s : !l), d = e.key === "Enter", f = e.key === " ", p = a.getAttribute("role"), m = p?.startsWith("menuitem") || p === "option" || p === "gridcell";
					if (r && c && f) {
						if (e.defaultPrevented && m) return;
						e.preventDefault(), l || i && s ? (a.click(), e.preventBaseUIHandler()) : u && (n?.(e), e.preventBaseUIHandler());
						return;
					}
					u && (!i && (f || d) && e.preventDefault(), !i && d && n?.(e));
				},
				onKeyUp(e) {
					if (!t) {
						if (ge(e), a?.(e), e.target === e.currentTarget && i && c && Te(e.currentTarget) && e.key === " ") {
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
		buttonRef: K((e) => {
			o.current = e, u();
		})
	};
}
function Te(e) {
	return C(e) && e.tagName === "BUTTON";
}
function Ee(e) {
	return !!(e?.tagName === "A" && e?.href);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useMergedRefs.mjs
function De(e, t, n, r) {
	let i = W(ke).current;
	return Ae(i, e, t, n, r) && Me(i, [
		e,
		t,
		n,
		r
	]), i.callback;
}
function Oe(e) {
	let t = W(ke).current;
	return je(t, e) && Me(t, e), t.callback;
}
function ke() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function Ae(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function je(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function Me(e, t) {
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
var Ne = 19;
function Pe(e) {
	return Ne >= e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getReactElementRef.mjs
function Fe(e) {
	if (!/*#__PURE__*/ V.isValidElement(e)) return null;
	let t = e, n = t.props;
	return (Pe(19) ? n?.ref : t.ref) ?? null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/empty.mjs
function Ie() {}
var Le = Object.freeze([]), Re = Object.freeze({});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function ze(e, t) {
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
function Be(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveStyle.mjs
function Ve(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useRenderElement.mjs
function He(e, t, n = {}) {
	let r = t.render, i = Ue(t, n);
	return n.enabled === !1 ? null : Ke(e, r, i, n.state ?? Re);
}
function Ue(e, t = {}) {
	let { className: n, style: r, render: i } = e, { state: a = Re, ref: o, props: s, stateAttributesMapping: c, enabled: l = !0 } = t, u = l ? Be(n, a) : void 0, d = l ? Ve(r, a) : void 0, f = l ? ze(a, c) : Re, p = l && s ? We(s) : void 0, m = l ? re(f, p) ?? {} : Re;
	return typeof document < "u" && (l ? m.ref = Array.isArray(o) ? Oe([
		m.ref,
		Fe(i),
		...o
	]) : De(m.ref, Fe(i), o) : De(null, null)), l ? (u !== void 0 && (m.className = _e(m.className, u)), d !== void 0 && (m.style = re(m.style, d)), m) : Re;
}
function We(e) {
	return Array.isArray(e) ? oe(e) : ae(void 0, e);
}
var Ge = Symbol.for("react.lazy");
function Ke(e, t, n, r) {
	if (t) {
		if (typeof t == "function") return t(n, r);
		let e = ae(n, t.props);
		e.ref = n.ref;
		let i = t;
		return i?.$$typeof === Ge && (i = V.Children.toArray(t)[0]), /*#__PURE__*/ V.cloneElement(i, e);
	}
	if (e && typeof e == "string") return qe(e, n);
	throw Error(be(8));
}
function qe(e, t) {
	return e === "button" ? /*#__PURE__*/ (0, V.createElement)("button", {
		type: "button",
		...t,
		key: t.key
	}) : e === "img" ? /*#__PURE__*/ (0, V.createElement)("img", {
		alt: "",
		...t,
		key: t.key
	}) : /*#__PURE__*/ V.createElement(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/button/Button.mjs
var Je = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, focusableWhenDisabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { getButtonProps: l, buttonRef: u } = we({
		disabled: i,
		focusableWhenDisabled: a,
		native: o
	});
	return He("button", e, {
		state: { disabled: i },
		ref: [t, u],
		props: [c, l]
	});
}), Ye = g();
function Xe(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = Xe(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function Ze() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Xe(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var Qe = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, $e = Ze, et = (e, t) => (n) => {
	if (t?.variants == null) return $e(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Qe(t) || Qe(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return $e(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, tt = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, nt = (e, t) => ({
	classGroupId: e,
	validator: t
}), rt = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), it = "-", at = [], ot = "arbitrary..", st = (e) => {
	let t = ut(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return lt(e);
			let n = e.split(it);
			return ct(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? tt(i, t) : t : i || at;
			}
			return n[e] || at;
		}
	};
}, ct = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = ct(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(it) : e.slice(t).join(it), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, lt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? ot + r : void 0;
})(), ut = (e) => {
	let { theme: t, classGroups: n } = e;
	return dt(n, t);
}, dt = (e, t) => {
	let n = rt();
	for (let r in e) {
		let i = e[r];
		ft(i, n, r, t);
	}
	return n;
}, ft = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		pt(i, t, n, r);
	}
}, pt = (e, t, n, r) => {
	if (typeof e == "string") {
		mt(e, t, n);
		return;
	}
	if (typeof e == "function") {
		ht(e, t, n, r);
		return;
	}
	gt(e, t, n, r);
}, mt = (e, t, n) => {
	let r = e === "" ? t : _t(t, e);
	r.classGroupId = n;
}, ht = (e, t, n, r) => {
	if (vt(e)) {
		ft(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(nt(n, e));
}, gt = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		ft(o, _t(t, a), n, r);
	}
}, _t = (e, t) => {
	let n = e, r = t.split(it), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = rt(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, vt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, yt = (e) => {
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
}, bt = "!", xt = ":", St = [], Ct = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), wt = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === xt) {
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
		s.endsWith(bt) ? (c = s.slice(0, -1), l = !0) : s.startsWith(bt) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Ct(t, l, c, u);
	};
	if (t) {
		let e = t + xt, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Ct(St, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Tt = (e) => {
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
}, Et = (e) => ({
	cache: yt(e.cacheSize),
	parseClassName: wt(e),
	sortModifiers: Tt(e),
	postfixLookupClassGroupIds: Dt(e),
	...st(e)
}), Dt = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Ot = /\s+/, kt = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Ot), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + bt : _, y = v + g;
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
}, At = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = jt(n)) && (i && (i += " "), i += r);
	return i;
}, jt = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = jt(e[r])) && (n && (n += " "), n += t);
	return n;
}, Mt = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Et(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = kt(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(At(...e));
}, Nt = [], Pt = (e) => {
	let t = (t) => t[e] || Nt;
	return t.isThemeGetter = !0, t;
}, Ft = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, It = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Lt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, zt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Bt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Vt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ht = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ut = (e) => Lt.test(e), Wt = (e) => !!e && !Number.isNaN(Number(e)), Gt = (e) => !!e && Number.isInteger(Number(e)), Kt = (e) => e.endsWith("%") && Wt(e.slice(0, -1)), qt = (e) => Rt.test(e), Jt = () => !0, Yt = (e) => zt.test(e) && !Bt.test(e), Xt = () => !1, Zt = (e) => Vt.test(e), Qt = (e) => Ht.test(e), $t = (e) => !Y(e) && !X(e), en = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), tn = (e) => _n(e, xn, Xt), Y = (e) => Ft.test(e), nn = (e) => _n(e, Sn, Yt), rn = (e) => _n(e, Cn, Wt), an = (e) => _n(e, Tn, Jt), on = (e) => _n(e, wn, Xt), sn = (e) => _n(e, yn, Xt), cn = (e) => _n(e, bn, Qt), ln = (e) => _n(e, En, Zt), X = (e) => It.test(e), un = (e) => vn(e, Sn), dn = (e) => vn(e, wn), fn = (e) => vn(e, yn), pn = (e) => vn(e, xn), mn = (e) => vn(e, bn), hn = (e) => vn(e, En, !0), gn = (e) => vn(e, Tn, !0), _n = (e, t, n) => {
	let r = Ft.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, vn = (e, t, n = !1) => {
	let r = It.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, yn = (e) => e === "position" || e === "percentage", bn = (e) => e === "image" || e === "url", xn = (e) => e === "length" || e === "size" || e === "bg-size", Sn = (e) => e === "length", Cn = (e) => e === "number", wn = (e) => e === "family-name", Tn = (e) => e === "number" || e === "weight", En = (e) => e === "shadow", Dn = /*#__PURE__*/ Mt(() => {
	let e = Pt("color"), t = Pt("font"), n = Pt("text"), r = Pt("font-weight"), i = Pt("tracking"), a = Pt("leading"), o = Pt("breakpoint"), s = Pt("container"), c = Pt("spacing"), l = Pt("radius"), u = Pt("shadow"), d = Pt("inset-shadow"), f = Pt("text-shadow"), p = Pt("drop-shadow"), m = Pt("blur"), h = Pt("perspective"), g = Pt("aspect"), _ = Pt("ease"), v = Pt("animate"), y = () => [
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
		X,
		Y
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
		X,
		Y,
		c
	], T = () => [
		Ut,
		"full",
		"auto",
		...w()
	], E = () => [
		Gt,
		"none",
		"subgrid",
		X,
		Y
	], D = () => [
		"auto",
		{ span: [
			"full",
			Gt,
			X,
			Y
		] },
		Gt,
		X,
		Y
	], O = () => [
		Gt,
		"auto",
		X,
		Y
	], ee = () => [
		"auto",
		"min",
		"max",
		"fr",
		X,
		Y
	], k = () => [
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
	], A = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], j = () => ["auto", ...w()], M = () => [
		Ut,
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
	], N = () => [
		Ut,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		Ut,
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
	], F = () => [
		e,
		X,
		Y
	], I = () => [
		...b(),
		fn,
		sn,
		{ position: [X, Y] }
	], L = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], R = () => [
		"auto",
		"cover",
		"contain",
		pn,
		tn,
		{ size: [X, Y] }
	], z = () => [
		Kt,
		un,
		nn
	], B = () => [
		"",
		"none",
		"full",
		l,
		X,
		Y
	], V = () => [
		"",
		Wt,
		un,
		nn
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
		Wt,
		Kt,
		fn,
		sn
	], te = () => [
		"",
		"none",
		m,
		X,
		Y
	], G = () => [
		"none",
		Wt,
		X,
		Y
	], K = () => [
		"none",
		Wt,
		X,
		Y
	], q = () => [
		Wt,
		X,
		Y
	], ne = () => [
		Ut,
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
			blur: [qt],
			breakpoint: [qt],
			color: [Jt],
			container: [qt],
			"drop-shadow": [qt],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [$t],
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
			"inset-shadow": [qt],
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
			radius: [qt],
			shadow: [qt],
			spacing: ["px", Wt],
			text: [qt],
			"text-shadow": [qt],
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
				Ut,
				Y,
				X,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				X,
				Y
			] }],
			"container-named": [en],
			columns: [{ columns: [
				Wt,
				Y,
				X,
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
				Gt,
				"auto",
				X,
				Y
			] }],
			basis: [{ basis: [
				Ut,
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
				Wt,
				Ut,
				"auto",
				"initial",
				"none",
				Y
			] }],
			grow: [{ grow: [
				"",
				Wt,
				X,
				Y
			] }],
			shrink: [{ shrink: [
				"",
				Wt,
				X,
				Y
			] }],
			order: [{ order: [
				Gt,
				"first",
				"last",
				"none",
				X,
				Y
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
			"auto-cols": [{ "auto-cols": ee() }],
			"auto-rows": [{ "auto-rows": ee() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...k(), "normal"] }],
			"justify-items": [{ "justify-items": [...A(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...A()] }],
			"align-content": [{ content: ["normal", ...k()] }],
			"align-items": [{ items: [...A(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...A(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": k() }],
			"place-items": [{ "place-items": [...A(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...A()] }],
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
			m: [{ m: j() }],
			mx: [{ mx: j() }],
			my: [{ my: j() }],
			ms: [{ ms: j() }],
			me: [{ me: j() }],
			mbs: [{ mbs: j() }],
			mbe: [{ mbe: j() }],
			mt: [{ mt: j() }],
			mr: [{ mr: j() }],
			mb: [{ mb: j() }],
			ml: [{ ml: j() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: M() }],
			"inline-size": [{ inline: ["auto", ...N()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...N()] }],
			"max-inline-size": [{ "max-inline": ["none", ...N()] }],
			"block-size": [{ block: ["auto", ...P()] }],
			"min-block-size": [{ "min-block": ["auto", ...P()] }],
			"max-block-size": [{ "max-block": ["none", ...P()] }],
			w: [{ w: [
				s,
				"screen",
				...M()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...M()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...M()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...M()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...M()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...M()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				un,
				nn
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				gn,
				an
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
				Kt,
				Y
			] }],
			"font-family": [{ font: [
				dn,
				on,
				t
			] }],
			"font-features": [{ "font-features": [Y] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				X,
				Y
			] }],
			"line-clamp": [{ "line-clamp": [
				Wt,
				"none",
				X,
				rn
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				X,
				Y
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				X,
				Y
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: F() }],
			"text-color": [{ text: F() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...H(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				Wt,
				"from-font",
				"auto",
				X,
				nn
			] }],
			"text-decoration-color": [{ decoration: F() }],
			"underline-offset": [{ "underline-offset": [
				Wt,
				"auto",
				X,
				Y
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
				Gt,
				X,
				Y
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
				X,
				Y
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
				X,
				Y
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
			"bg-position": [{ bg: I() }],
			"bg-repeat": [{ bg: L() }],
			"bg-size": [{ bg: R() }],
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
						Gt,
						X,
						Y
					],
					radial: [
						"",
						X,
						Y
					],
					conic: [
						Gt,
						X,
						Y
					]
				},
				mn,
				cn
			] }],
			"bg-color": [{ bg: F() }],
			"gradient-from-pos": [{ from: z() }],
			"gradient-via-pos": [{ via: z() }],
			"gradient-to-pos": [{ to: z() }],
			"gradient-from": [{ from: F() }],
			"gradient-via": [{ via: F() }],
			"gradient-to": [{ to: F() }],
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
			"border-color": [{ border: F() }],
			"border-color-x": [{ "border-x": F() }],
			"border-color-y": [{ "border-y": F() }],
			"border-color-s": [{ "border-s": F() }],
			"border-color-e": [{ "border-e": F() }],
			"border-color-bs": [{ "border-bs": F() }],
			"border-color-be": [{ "border-be": F() }],
			"border-color-t": [{ "border-t": F() }],
			"border-color-r": [{ "border-r": F() }],
			"border-color-b": [{ "border-b": F() }],
			"border-color-l": [{ "border-l": F() }],
			"divide-color": [{ divide: F() }],
			"outline-style": [{ outline: [
				...H(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				Wt,
				X,
				Y
			] }],
			"outline-w": [{ outline: [
				"",
				Wt,
				un,
				nn
			] }],
			"outline-color": [{ outline: F() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				hn,
				ln
			] }],
			"shadow-color": [{ shadow: F() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				hn,
				ln
			] }],
			"inset-shadow-color": [{ "inset-shadow": F() }],
			"ring-w": [{ ring: V() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: F() }],
			"ring-offset-w": [{ "ring-offset": [Wt, nn] }],
			"ring-offset-color": [{ "ring-offset": F() }],
			"inset-ring-w": [{ "inset-ring": V() }],
			"inset-ring-color": [{ "inset-ring": F() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				hn,
				ln
			] }],
			"text-shadow-color": [{ "text-shadow": F() }],
			opacity: [{ opacity: [
				Wt,
				X,
				Y
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
			"mask-image-linear-pos": [{ "mask-linear": [Wt] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": W() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": W() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": F() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": F() }],
			"mask-image-t-from-pos": [{ "mask-t-from": W() }],
			"mask-image-t-to-pos": [{ "mask-t-to": W() }],
			"mask-image-t-from-color": [{ "mask-t-from": F() }],
			"mask-image-t-to-color": [{ "mask-t-to": F() }],
			"mask-image-r-from-pos": [{ "mask-r-from": W() }],
			"mask-image-r-to-pos": [{ "mask-r-to": W() }],
			"mask-image-r-from-color": [{ "mask-r-from": F() }],
			"mask-image-r-to-color": [{ "mask-r-to": F() }],
			"mask-image-b-from-pos": [{ "mask-b-from": W() }],
			"mask-image-b-to-pos": [{ "mask-b-to": W() }],
			"mask-image-b-from-color": [{ "mask-b-from": F() }],
			"mask-image-b-to-color": [{ "mask-b-to": F() }],
			"mask-image-l-from-pos": [{ "mask-l-from": W() }],
			"mask-image-l-to-pos": [{ "mask-l-to": W() }],
			"mask-image-l-from-color": [{ "mask-l-from": F() }],
			"mask-image-l-to-color": [{ "mask-l-to": F() }],
			"mask-image-x-from-pos": [{ "mask-x-from": W() }],
			"mask-image-x-to-pos": [{ "mask-x-to": W() }],
			"mask-image-x-from-color": [{ "mask-x-from": F() }],
			"mask-image-x-to-color": [{ "mask-x-to": F() }],
			"mask-image-y-from-pos": [{ "mask-y-from": W() }],
			"mask-image-y-to-pos": [{ "mask-y-to": W() }],
			"mask-image-y-from-color": [{ "mask-y-from": F() }],
			"mask-image-y-to-color": [{ "mask-y-to": F() }],
			"mask-image-radial": [{ "mask-radial": [X, Y] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": W() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": W() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": F() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": F() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [Wt] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": W() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": W() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": F() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": F() }],
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
			"mask-position": [{ mask: I() }],
			"mask-repeat": [{ mask: L() }],
			"mask-size": [{ mask: R() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				X,
				Y
			] }],
			filter: [{ filter: [
				"",
				"none",
				X,
				Y
			] }],
			blur: [{ blur: te() }],
			brightness: [{ brightness: [
				Wt,
				X,
				Y
			] }],
			contrast: [{ contrast: [
				Wt,
				X,
				Y
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				hn,
				ln
			] }],
			"drop-shadow-color": [{ "drop-shadow": F() }],
			grayscale: [{ grayscale: [
				"",
				Wt,
				X,
				Y
			] }],
			"hue-rotate": [{ "hue-rotate": [
				Wt,
				X,
				Y
			] }],
			invert: [{ invert: [
				"",
				Wt,
				X,
				Y
			] }],
			saturate: [{ saturate: [
				Wt,
				X,
				Y
			] }],
			sepia: [{ sepia: [
				"",
				Wt,
				X,
				Y
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				X,
				Y
			] }],
			"backdrop-blur": [{ "backdrop-blur": te() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				Wt,
				X,
				Y
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				Wt,
				X,
				Y
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				Wt,
				X,
				Y
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				Wt,
				X,
				Y
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				Wt,
				X,
				Y
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				Wt,
				X,
				Y
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				Wt,
				X,
				Y
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				Wt,
				X,
				Y
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
				X,
				Y
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				Wt,
				"initial",
				X,
				Y
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				X,
				Y
			] }],
			delay: [{ delay: [
				Wt,
				X,
				Y
			] }],
			animate: [{ animate: [
				"none",
				v,
				X,
				Y
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				X,
				Y
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: G() }],
			"rotate-x": [{ "rotate-x": G() }],
			"rotate-y": [{ "rotate-y": G() }],
			"rotate-z": [{ "rotate-z": G() }],
			scale: [{ scale: K() }],
			"scale-x": [{ "scale-x": K() }],
			"scale-y": [{ "scale-y": K() }],
			"scale-z": [{ "scale-z": K() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: q() }],
			"skew-x": [{ "skew-x": q() }],
			"skew-y": [{ "skew-y": q() }],
			transform: [{ transform: [
				X,
				Y,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ne() }],
			"translate-x": [{ "translate-x": ne() }],
			"translate-y": [{ "translate-y": ne() }],
			"translate-z": [{ "translate-z": ne() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Gt,
				X,
				Y
			] }],
			accent: [{ accent: F() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: F() }],
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
				X,
				Y
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
			"scrollbar-thumb-color": [{ "scrollbar-thumb": F() }],
			"scrollbar-track-color": [{ "scrollbar-track": F() }],
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
				X,
				Y
			] }],
			fill: [{ fill: ["none", ...F()] }],
			"stroke-w": [{ stroke: [
				Wt,
				un,
				nn,
				rn
			] }],
			stroke: [{ stroke: ["none", ...F()] }],
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
function On(...e) {
	return Dn(Ze(e));
}
//#endregion
//#region node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react-jsx-runtime.production.js
var kn = /* @__PURE__ */ o(((e) => {
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
})), Z = (/* @__PURE__ */ o(((e, t) => {
	t.exports = kn();
})))(), An = et("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
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
function jn({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Z.jsx)(Je, {
		"data-slot": "button",
		className: On(An({
			variant: t,
			size: n,
			className: e
		})),
		...r
	});
}
//#endregion
//#region src/components/streamlit/button.tsx
function Mn({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Z.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "button",
		"data-testid": "ssui-v2-button",
		children: /* @__PURE__ */ (0, Z.jsx)(jn, {
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
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useControlled.mjs
function Nn({ controlled: e, default: t, name: n, state: r = "value" }) {
	let { current: i } = V.useRef(e !== void 0), [a, o] = V.useState(t);
	return [i ? e : a, V.useCallback((e) => {
		i || o(e);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/visuallyHidden.mjs
var Pn = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
}, Fn = {
	...Pn,
	position: "fixed",
	top: 0,
	left: 0
}, In = {
	...Pn,
	position: "absolute"
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/owner.mjs
function Ln(e) {
	return e?.ownerDocument || document;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/getDefaultFormSubmitter.mjs
function Rn(e) {
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
var zn = /*#__PURE__*/ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.indeterminate = "data-indeterminate", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), Bn = /*#__PURE__*/ function(e) {
	return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), Vn = {
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
}, Hn = {
	valid: null,
	touched: !1,
	dirty: !1,
	filled: !1,
	focused: !1
}, Un = {
	disabled: !1,
	...Hn
}, Wn = { valid(e) {
	return e === null ? null : e ? { [Bn.valid]: "" } : { [Bn.invalid]: "" };
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/utils/useStateAttributesMapping.mjs
function Gn(e) {
	return V.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [zn.checked]: "" } : { [zn.unchecked]: "" };
		},
		...Wn
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useId.mjs
var Kn = 0;
function qn(e, t = "mui") {
	let [n, r] = V.useState(e), i = e || n;
	return V.useEffect(() => {
		n ?? (Kn += 1, r(`${t}-${Kn}`));
	}, [n, t]), i;
}
var Jn = H.useId;
function Yn(e, t) {
	if (Jn !== void 0) {
		let n = Jn();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return qn(e, t);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/useBaseUiId.mjs
function Xn(e) {
	return Yn(e, "base-ui");
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var Zn = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: Vn,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: Ie,
	disabled: void 0,
	touched: Hn.touched,
	setTouched: Ie,
	dirty: Hn.dirty,
	setDirty: Ie,
	filled: Hn.filled,
	setFilled: Ie,
	focused: Hn.focused,
	setFocused: Ie,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => !1,
	state: Un,
	markedDirtyRef: { current: !1 },
	registerFieldControl: Ie,
	validation: {
		getValidationProps: (e, t = Re) => t,
		inputRef: { current: null },
		registerInput: Ie,
		commit: async () => {},
		change: Ie
	}
}, Qn = /*#__PURE__*/ V.createContext(Zn);
function $n(e = !0) {
	let t = V.useContext(Qn);
	if (t.setValidityData === Ie && !e) throw Error(be(28));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function er(e, t, n, r, i = !0, a) {
	let { registerFieldControl: o } = $n(), s = V.useRef(null);
	s.current ||= Symbol(), J(() => {
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
var tr = /*#__PURE__*/ V.createContext({ disabled: !1 });
function nr() {
	return V.useContext(tr);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var rr = /*#__PURE__*/ V.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: Ie,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: !1 }
});
function ir() {
	return V.useContext(rr);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
var ar = /*#__PURE__*/ V.createContext({
	controlId: void 0,
	registerControlId: Ie,
	labelId: void 0,
	setLabelId: Ie,
	messageIds: [],
	setMessageIds: Ie,
	getDescriptionProps: (e) => e
});
function or() {
	return V.useContext(ar);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useAriaLabelledBy.mjs
function sr(e, t, n, r = !0, i) {
	let [a, o] = V.useState(), s = Xn(i ? `${i}-label` : void 0), c = e ?? t ?? a;
	return J(() => {
		let i = e || t || !r ? void 0 : cr(n.current, s);
		a !== i && o(i);
	}), c;
}
function cr(e, t) {
	let n = lr(e);
	if (n) return !n.id && t && (n.id = t), n.id || void 0;
}
function lr(e) {
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
var ur = /*#__PURE__*/ V.createContext(void 0);
function dr(e = !0) {
	let t = V.useContext(ur);
	if (t === void 0 && !e) throw Error(be(3));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRootContext.mjs
var fr = /*#__PURE__*/ V.createContext(void 0);
function pr() {
	let e = V.useContext(fr);
	if (e === void 0) throw Error(be(14));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/reason-parts.mjs
var mr = "none", hr = "trigger-press", gr = "trigger-hover", _r = "trigger-focus", vr = "outside-press", yr = "item-press", br = "focus-out", xr = "escape-key", Sr = "list-navigation", Cr = "cancel-open", wr = "sibling-open", Tr = "imperative-action", Er = "window-resize";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
function Dr(e, t, n, r) {
	let i = !1, a = !1, o = r ?? Re;
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
function Or(e, t) {
	let n = V.useRef(e), r = K(t);
	J(() => {
		n.current !== e && r(n.current);
	}, [e, r]), J(() => {
		n.current = e;
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/root/CheckboxRoot.mjs
var kr = "data-parent", Ar = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { checked: n, className: r, defaultChecked: i = !1, "aria-labelledby": a, disabled: o = !1, form: s, id: c, indeterminate: l = !1, inputRef: u, name: d, onCheckedChange: f, parent: p = !1, readOnly: m = !1, render: h, required: g = !1, uncheckedValue: _, value: v, nativeButton: b = !1, style: x, ...S } = e, { clearErrors: C } = ir(), { disabled: w, name: T, setDirty: E, setFilled: D, setFocused: O, setTouched: ee, state: k, validationMode: A, validityData: j, validation: M } = $n(), N = nr(), { labelId: P, controlId: F, registerControlId: I, getDescriptionProps: L } = or(), R = dr(), z = R?.parent, B = z && R.allValues, H = w || N.disabled || R?.disabled || o, U = T ?? d, te = v ?? U, G = Xn(), K = Xn(), q = F;
	B ? q = p ? K : `${z.id}-${te}` : c && (q = c);
	let ne = {};
	B && (p ? ne = R.parent.getParentProps() : te && (ne = R.parent.getChildProps(te)));
	let { checked: re = n, indeterminate: ie = l, onCheckedChange: oe, ...se } = ne, ce = R?.value, le = R?.setValue, ue = R?.defaultValue, de = V.useRef(null), fe = W(() => Symbol("checkbox-control")), pe = V.useRef(!1), { getButtonProps: me, buttonRef: he } = we({
		disabled: H,
		native: b
	}), ge = R?.validation ?? M, [_e, ve] = Nn({
		controlled: te && ce && !p ? ce.includes(te) : re,
		default: te && ue && !p ? ue.includes(te) : i,
		name: "Checkbox",
		state: "checked"
	}), ye = B ? !!re : _e, be = B && ie || l;
	J(() => {
		I !== Ie && (pe.current = !0, I(fe.current, q));
	}, [
		q,
		I,
		fe
	]), V.useEffect(() => {
		let e = fe.current;
		return () => {
			!pe.current || I === Ie || (pe.current = !1, I(e, void 0));
		};
	}, [I, fe]), er(de, G, _e, void 0, !R && !H, d);
	let xe = V.useRef(null), Se = De(u, xe, ge.inputRef, ge.registerInput), Ce = sr(a, P, xe, !b, q ?? void 0);
	J(() => {
		xe.current && (xe.current.indeterminate = be, _e && D(!0));
	}, [
		_e,
		be,
		D
	]), Or(_e, () => {
		R || (C(U), D(_e), E(_e !== j.initialValue), ge.change(_e));
	});
	let Te = ae({
		checked: _e,
		disabled: H,
		form: s,
		name: p ? void 0 : U,
		id: b ? void 0 : q ?? void 0,
		required: g,
		ref: Se,
		style: U ? In : Fn,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			if (m) {
				e.preventDefault();
				return;
			}
			let t = e.currentTarget.checked, n = Dr(mr, e.nativeEvent);
			if (f?.(t, n), !n.isCanceled && (oe?.(t, n), !n.isCanceled && (ve(t), te && ce && le && !p && !B))) {
				let e = t ? [...ce, te] : ce.filter((e) => e !== te);
				le(e, n);
			}
		},
		onFocus() {
			de.current?.focus();
		}
	}, v === void 0 ? Re : { value: (R ? _e && v : v) || "" }, L, (e) => ge.getValidationProps(H, e));
	V.useEffect(() => {
		if (!z || !te) return;
		let e = z.disabledStatesRef.current;
		return e.set(te, H), () => {
			e.delete(te);
		};
	}, [
		z,
		H,
		te
	]);
	let Ee = V.useMemo(() => ({
		...k,
		checked: ye,
		disabled: H,
		readOnly: m,
		required: g,
		indeterminate: be
	}), [
		k,
		ye,
		H,
		m,
		g,
		be
	]), Oe = Gn(Ee), ke = He("span", e, {
		state: Ee,
		ref: [
			he,
			de,
			t,
			R?.registerControlRef
		],
		props: [
			{
				id: b ? q ?? void 0 : G,
				role: "checkbox",
				"aria-checked": be ? "mixed" : ye,
				"aria-readonly": m || void 0,
				"aria-required": g || void 0,
				"aria-labelledby": Ce,
				[kr]: p ? "" : void 0,
				onFocus() {
					H || O(!0);
				},
				onBlur() {
					let e = xe.current;
					e && (ee(!0), O(!1), A === "onBlur" && ge.commit(R ? ce : e.checked));
				},
				onKeyDown(e) {
					if (e.key !== "Enter" || (e.preventBaseUIHandler(), e.defaultPrevented)) return;
					let t = xe.current?.form ?? null, n = e.currentTarget, r = e.nativeEvent, i = e.preventDefault, a = r.preventDefault, o = !1;
					e.preventDefault = () => {
						o = !0, i.call(e);
					}, r.preventDefault = () => {
						o = !0, a.call(r);
					}, a.call(r), y(n).queueMicrotask(() => {
						e.preventDefault = i, r.preventDefault = a, o || Rn(t)?.click();
					});
				},
				onClick(e) {
					if (m || H) return;
					e.preventDefault();
					let t = xe.current;
					t && t.dispatchEvent(new (y(t)).PointerEvent("click", {
						bubbles: !0,
						shiftKey: e.shiftKey,
						ctrlKey: e.ctrlKey,
						altKey: e.altKey,
						metaKey: e.metaKey
					}));
				}
			},
			S,
			se,
			me,
			L,
			(e) => ge.getValidationProps(H, e)
		],
		stateAttributesMapping: Oe
	});
	return /*#__PURE__*/ (0, Z.jsxs)(fr.Provider, {
		value: Ee,
		children: [
			ke,
			!_e && !R && U && !p && _ !== void 0 && /*#__PURE__*/ (0, Z.jsx)("input", {
				type: "hidden",
				form: s,
				name: U,
				value: _,
				disabled: H
			}),
			/*#__PURE__*/ (0, Z.jsx)("input", {
				...Te,
				suppressHydrationWarning: !0
			})
		]
	});
}), jr = [];
function Mr(e) {
	V.useEffect(e, jr);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useAnimationFrame.mjs
var Nr = null;
globalThis.requestAnimationFrame;
var Pr = new class {
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
}(), Fr = class e {
	static create() {
		return new e();
	}
	static request(e) {
		return Pr.request(e);
	}
	static cancel(e) {
		return Pr.cancel(e);
	}
	currentId = Nr;
	request(e) {
		this.cancel(), this.currentId = Pr.request(() => {
			this.currentId = Nr, e();
		});
	}
	cancel = () => {
		this.currentId !== Nr && (Pr.cancel(this.currentId), this.currentId = Nr);
	};
	disposeEffect = () => this.cancel;
};
function Ir() {
	let e = W(Fr.create).current;
	return Mr(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveRef.mjs
function Lr(e) {
	return e == null ? e : "current" in e ? e.current : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
var Rr = /*#__PURE__*/ function(e) {
	return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
}({}), zr = { [Rr.startingStyle]: "" }, Br = { [Rr.endingStyle]: "" }, Vr = { transitionStatus(e) {
	return e === "starting" ? zr : e === "ending" ? Br : null;
} }, Hr = /* @__PURE__ */ c(m(), 1);
function Ur(e, t = !1, n = !0) {
	let r = Ir();
	return K((i, a = null) => {
		r.cancel();
		let o = Lr(e);
		if (o == null) return;
		let s = o, c = () => {
			Hr.flushSync(i);
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
			let e = Rr.startingStyle;
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
function Wr(e) {
	let { enabled: t = !0, open: n, ref: r, onComplete: i } = e, a = K(i), o = Ur(r, n, !1);
	V.useEffect(() => {
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
function Gr(e, t = !1, n = !1) {
	let [r, i] = V.useState(e && t ? "idle" : void 0), [a, o] = V.useState(e);
	return e && !a && (o(!0), i("starting")), !e && a && r !== "ending" && !n && i("ending"), !e && !a && r === "ending" && i(void 0), J(() => {
		if (!e && a && r !== "ending" && n) {
			let e = Fr.request(() => {
				i("ending");
			});
			return () => {
				Fr.cancel(e);
			};
		}
	}, [
		e,
		a,
		r,
		n
	]), J(() => {
		if (!e || t) return;
		let n = Fr.request(() => {
			i(void 0);
		});
		return () => {
			Fr.cancel(n);
		};
	}, [t, e]), J(() => {
		if (!e || !t) return;
		e && a && r !== "idle" && i("starting");
		let n = Fr.request(() => {
			i("idle");
		});
		return () => {
			Fr.cancel(n);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/checkbox/indicator/CheckboxIndicator.mjs
var Kr = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, keepMounted: a = !1, ...o } = e, s = pr(), c = s.checked || s.indeterminate, { mounted: l, transitionStatus: u, setMounted: d } = Gr(c), f = V.useRef(null), p = {
		...s,
		transitionStatus: u
	};
	Wr({
		open: c,
		ref: f,
		onComplete() {
			c || d(!1);
		}
	});
	let m = {
		...Gn(s),
		...Vr,
		...Wn
	}, h = a || l, g = He("span", e, {
		ref: [t, f],
		state: p,
		stateAttributesMapping: m,
		props: o
	});
	return h ? g : null;
}), qr = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Jr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Yr = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Xr = (e) => {
	let t = Yr(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Zr = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Qr = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, $r = (0, V.createContext)({}), ei = () => (0, V.useContext)($r), ti = (0, V.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = ei() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, V.createElement)("svg", {
		ref: c,
		...Zr,
		width: t ?? l ?? Zr.width,
		height: t ?? l ?? Zr.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: qr("lucide", p, i),
		...!a && !Qr(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, V.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), ni = (e, t) => {
	let n = (0, V.forwardRef)(({ className: n, ...r }, i) => (0, V.createElement)(ti, {
		ref: i,
		iconNode: t,
		className: qr(`lucide-${Jr(Xr(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = Xr(e), n;
}, ri = ni("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ii = ni("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), ai = ni("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
//#endregion
//#region src/components/ui/checkbox.tsx
function oi({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Z.jsx)(Ar, {
		"data-slot": "checkbox",
		className: On("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, Z.jsx)(Kr, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, Z.jsx)(ri, {})
		})
	});
}
//#endregion
//#region src/protocol/reconciliation.ts
function si(e, t) {
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
function ci(e, t) {
	let [n, r] = (0, V.useState)(e), i = (0, V.useRef)(n), a = (0, V.useRef)(e.serverRevision);
	return (0, V.useEffect)(() => {
		let n = si(i.current, e);
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
function li({ envelope: e, setStateValue: t }) {
	let n = (0, V.useId)(), { commit: r, state: i } = ci(e.state, t);
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: "flex min-h-8 items-center gap-2.5 p-px",
		"data-ssui-component": "checkbox",
		"data-testid": "ssui-v2-checkbox",
		children: [/* @__PURE__ */ (0, Z.jsx)(oi, {
			checked: i.value,
			disabled: e.props.disabled,
			id: n,
			onCheckedChange: (e) => {
				r(e);
			}
		}), /* @__PURE__ */ (0, Z.jsx)("label", {
			className: "cursor-default text-sm font-medium leading-none",
			htmlFor: n,
			children: e.props.label
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositionerContext.mjs
var ui = /*#__PURE__*/ V.createContext(void 0);
function di(e) {
	let t = V.useContext(ui);
	if (t === void 0 && !e) throw Error(be(33));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRootContext.mjs
var fi = /*#__PURE__*/ V.createContext(void 0);
function pi(e) {
	let t = V.useContext(fi);
	if (t === void 0 && !e) throw Error(be(36));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popupStateMapping.mjs
var mi = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = Rr.startingStyle] = "startingStyle", e[e.endingStyle = Rr.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e.side = "data-side", e.align = "data-align", e;
}({}), hi = /*#__PURE__*/ function(e) {
	return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
}({}), gi = { [hi.popupOpen]: "" }, _i = {
	[hi.popupOpen]: "",
	[hi.pressed]: ""
}, vi = { [mi.open]: "" }, yi = { [mi.closed]: "" }, bi = { [mi.anchorHidden]: "" }, xi = { open(e) {
	return e ? gi : null;
} }, Si = { open(e) {
	return e ? _i : null;
} }, Ci = {
	open(e) {
		return e ? vi : yi;
	},
	anchorHidden(e) {
		return e ? bi : null;
	}
}, wi = /*#__PURE__*/ V.createContext(void 0);
function Ti(e = !0) {
	let t = V.useContext(wi);
	if (t === void 0 && !e) throw Error(be(25));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/shared.mjs
function Ei() {
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
var { userAgent: Di, platform: Oi, maxTouchPoints: ki } = Ei(), Ai = Di.toLowerCase(), ji = Oi.toLowerCase(), Mi = /^i(os$|p)/.test(ji) || ji === "macintel" && ki > 1, Ni = "android", Pi = ji === Ni || Ai.includes(Ni), Fi = !Mi && ji.startsWith("mac");
ji.startsWith("win"), !Pi && /^(linux|chrome os)/.test(ji);
var Ii = Fi || Mi, Li = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!Li && Ai.includes("firefox"), !Li && Ai.includes("chrom");
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/platform/screen-reader.mjs
var Ri = Ii, zi = /jsdom|happydom/.test(Ai);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/item/useMenuItemCommonProps.mjs
function Bi(e) {
	let { closeOnClick: t, highlighted: n, id: r, nodeId: i, store: a, typingRef: o, itemRef: s, itemMetadata: c } = e, { events: l } = a.useState("floatingTreeRoot"), u = a.useState("open"), d = Ti(!0), f = d !== void 0;
	return V.useMemo(() => ({
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
				reason: yr
			});
		},
		onMouseUp(e) {
			if (d) {
				let t = d.initialCursorPointRef.current;
				if (d.initialCursorPointRef.current = null, f && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1 || f && !Fi && e.button === 2) return;
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
var Vi = { type: "regular-item" };
function Hi(e) {
	let { closeOnClick: t, disabled: n = !1, highlighted: r, id: i, store: a, typingRef: o = a.context.typingRef, nativeButton: s, itemMetadata: c, nodeId: l } = e, u = a.useState("disabled"), d = n || u, f = V.useRef(null), { getButtonProps: p, buttonRef: m } = we({
		disabled: d,
		focusableWhenDisabled: !0,
		native: s,
		composite: !0
	}), h = Bi({
		closeOnClick: t,
		highlighted: r,
		id: i,
		nodeId: l,
		store: a,
		typingRef: o,
		itemRef: f,
		itemMetadata: c
	}), g = V.useCallback((e) => ae(h, { onMouseEnter() {
		c.type === "submenu-trigger" && c.setActive();
	} }, e, p), [
		h,
		p,
		c
	]), _ = De(f, m);
	return V.useMemo(() => ({
		getItemProps: g,
		itemRef: _
	}), [g, _]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeListContext.mjs
var Ui = /*#__PURE__*/ V.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
function Wi() {
	return V.useContext(Ui);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/useCompositeListItem.mjs
var Gi = /*#__PURE__*/ function(e) {
	return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
}({});
function Ki(e = {}) {
	let { label: t, metadata: n, textRef: r, indexGuessBehavior: i, index: a } = e, { register: o, unregister: s, subscribeMapChange: c, elementsRef: l, labelsRef: u, nextIndexRef: d } = Wi(), f = V.useRef(-1), [p, m] = V.useState(a ?? (i === Gi.GuessFromOrder ? () => {
		if (f.current === -1) {
			let e = d.current;
			d.current += 1, f.current = e;
		}
		return f.current;
	} : -1)), h = V.useRef(null), g = V.useCallback((e) => {
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
	return J(() => {
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
	]), J(() => {
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
var qi = /*#__PURE__*/ V.createContext(void 0);
function Ji() {
	let e = V.useContext(qi);
	if (e === void 0) throw Error(be(31));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/group/MenuGroup.mjs
var Yi = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, [o, s] = V.useState(void 0), c = He("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": o,
			...a
		}
	});
	return /*#__PURE__*/ (0, Z.jsx)(qi.Provider, {
		value: s,
		children: c
	});
}), Xi = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, id: a, ...o } = e, s = Xn(a), c = Ji();
	return J(() => (c(s), () => {
		c(void 0);
	}), [c, s]), He("div", e, {
		ref: t,
		props: {
			id: s,
			role: "presentation",
			...o
		}
	});
}), Zi = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, style: l, ...u } = e, d = Ki({ label: a }), f = di(!0), p = Xn(i), { store: m } = pi(), h = m.useState("isActive", d.index), g = m.useState("itemProps"), { getItemProps: _, itemRef: v } = Hi({
		closeOnClick: c,
		disabled: s,
		highlighted: h,
		id: p,
		store: m,
		nativeButton: o,
		nodeId: f?.context.nodeId,
		itemMetadata: Vi
	});
	return He("div", e, {
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
}), Qi = 0, $i = class e {
	static create() {
		return new e();
	}
	currentId = Qi;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = Qi, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== Qi;
	}
	clear = () => {
		this.currentId !== Qi && (clearTimeout(this.currentId), this.currentId = Qi);
	};
	disposeEffect = () => this.clear;
};
function ea() {
	let e = W($i.create).current;
	return Mr(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function ta(e) {
	e.preventDefault(), e.stopPropagation();
}
function na(e) {
	return "nativeEvent" in e;
}
function ra(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Pi && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function ia(e) {
	return zi ? !1 : !Pi && e.width === 0 && e.height === 0 || Pi && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function aa(e, t) {
	let n = ["mouse", "pen"];
	return t || n.push("", void 0), n.includes(e);
}
function oa(e) {
	let t = e.type;
	return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
var sa = "data-base-ui-focusable", ca = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", la = "ArrowLeft", ua = "ArrowRight", da = "ArrowUp", fa = "ArrowDown";
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/shadowDom.mjs
function pa(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function ma(e, t) {
	if (!e || !t) return !1;
	let n = t.getRootNode?.();
	if (e.contains(t)) return !0;
	if (n && w(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function ha(e) {
	return "composedPath" in e ? e.composedPath()[0] : e.target;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function ga(e, t) {
	if (!S(e)) return !1;
	let n = e;
	if (t.hasElement(n)) return !n.hasAttribute("data-trigger-disabled");
	for (let [, e] of t.entries()) if (ma(e, n)) return !e.hasAttribute("data-trigger-disabled");
	return !1;
}
function _a(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function va(e) {
	return e.matches("html,body");
}
function ya(e) {
	return C(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function ba(e) {
	return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${ca}`) != null;
}
function xa(e) {
	return e ? e.getAttribute("role") === "combobox" && ya(e) : !1;
}
function Sa(e) {
	if (!e || zi) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function Ca(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function wa(e, t) {
	return t != null && !aa(t) ? 0 : typeof e == "function" ? e() : e;
}
function Ta(e, t, n) {
	let r = wa(e, n);
	return typeof r == "number" ? r : r?.[t];
}
function Ea(e) {
	return typeof e == "function" ? e() : e;
}
function Da(e, t) {
	return t || e === "click" || e === "mousedown";
}
function Oa(e) {
	return e?.includes("mouse") && e !== "mousedown";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/addEventListener.mjs
function ka(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/mergeCleanups.mjs
function Aa(...e) {
	return () => {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			n && n();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useValueAsRef.mjs
function ja(e) {
	let t = W(Ma, e).current;
	return t.next = e, J(t.effect), t;
}
function Ma(e) {
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
var Na = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let [n, r] = V.useState();
	J(() => {
		Ri && Li && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /*#__PURE__*/ (0, Z.jsx)("span", {
		...e,
		ref: t,
		style: Fn,
		"aria-hidden": !n || void 0,
		...i,
		"data-base-ui-focus-guard": ""
	});
}), Pa = [
	"top",
	"right",
	"bottom",
	"left"
], Fa = Math.min, Ia = Math.max, La = Math.round, Ra = Math.floor, za = (e) => ({
	x: e,
	y: e
}), Ba = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Va(e, t, n) {
	return Ia(e, Fa(t, n));
}
function Ha(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Ua(e) {
	return e.split("-")[0];
}
function Wa(e) {
	return e.split("-")[1];
}
function Ga(e) {
	return e === "x" ? "y" : "x";
}
function Ka(e) {
	return e === "y" ? "height" : "width";
}
function qa(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ja(e) {
	return Ga(qa(e));
}
function Ya(e, t, n) {
	n === void 0 && (n = !1);
	let r = Wa(e), i = Ja(e), a = Ka(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = io(o)), [o, io(o)];
}
function Xa(e) {
	let t = io(e);
	return [
		Za(e),
		t,
		Za(t)
	];
}
function Za(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Qa = ["left", "right"], $a = ["right", "left"], eo = ["top", "bottom"], to = ["bottom", "top"];
function no(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? $a : Qa : t ? Qa : $a;
		case "left":
		case "right": return t ? eo : to;
		default: return [];
	}
}
function ro(e, t, n, r) {
	let i = Wa(e), a = no(Ua(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Za)))), a;
}
function io(e) {
	let t = Ua(e);
	return Ba[t] + e.slice(t.length);
}
function ao(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function oo(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ao(e);
}
function so(e) {
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
function co(e, t) {
	return t < 0 || t >= e.length;
}
function lo(e, t) {
	return fo(e.current, { disabledIndices: t });
}
function uo(e, t) {
	return fo(e.current, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function fo(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.length - 1 && po(e, a, r));
	return a;
}
function po(e, t, n) {
	if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1) return !0;
	let r = e[t];
	return r ? !ho(r) || !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !1;
}
function mo(e) {
	return e.visibility === "hidden" || e.visibility === "collapse";
}
function ho(e, t = e ? F(e) : null) {
	return !e || !e.isConnected || !t || mo(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
var go = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function _o(e) {
	let t = e.assignedSlot;
	if (t) return t;
	if (e.parentElement) return e.parentElement;
	let n = e.getRootNode();
	return w(n) ? n.host : null;
}
function vo(e) {
	for (let t of Array.from(e.children)) if (v(t) === "summary") return t;
	return null;
}
function yo(e, t) {
	let n = vo(t);
	return !!n && (e === n || ma(n, e));
}
function bo(e) {
	let t = e ? v(e) : "";
	return e != null && e.matches(go) && (t !== "summary" || e.parentElement != null && v(e.parentElement) === "details" && vo(e.parentElement) === e) && (t !== "details" || vo(e) == null) && (t !== "input" || e.type !== "hidden");
}
function xo(e) {
	if (!bo(e) || !e.isConnected || e.matches(":disabled")) return !1;
	for (let t = e; t; t = _o(t)) {
		let n = t !== e, r = v(t) === "slot";
		if (t.hasAttribute("inert") || n && v(t) === "details" && !t.open && !yo(e, t) || t.hasAttribute("hidden") || !r && !So(t, n)) return !1;
	}
	return !0;
}
function So(e, t) {
	let n = F(e);
	return t ? n.display !== "none" : ho(e, n);
}
function Co(e) {
	let t = e.tabIndex;
	if (t < 0) {
		let t = v(e);
		if (t === "details" || t === "audio" || t === "video" || C(e) && e.isContentEditable) return 0;
	}
	return t;
}
function wo(e) {
	if (v(e) !== "input") return null;
	let t = e;
	return t.type === "radio" && t.name !== "" ? t : null;
}
function To(e, t) {
	let n = wo(e);
	if (!n) return !0;
	let r = t.find((e) => {
		let t = wo(e);
		return t?.name === n.name && t.form === n.form && t.checked;
	});
	return r ? r === n : t.find((e) => {
		let t = wo(e);
		return t?.name === n.name && t.form === n.form;
	}) === n;
}
function Eo(e) {
	if (C(e) && v(e) === "slot") {
		let t = e.assignedElements({ flatten: !0 });
		if (t.length > 0) return t;
	}
	return C(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function Do(e, t) {
	Eo(e).forEach((e) => {
		bo(e) && t.push(e), Do(e, t);
	});
}
function Oo(e, t, n) {
	Eo(e).forEach((e) => {
		C(e) && e.matches(t) && n.push(e), Oo(e, t, n);
	});
}
function ko(e) {
	return xo(e) && Co(e) >= 0;
}
function Ao(e) {
	let t = [];
	return Do(e, t), t.filter(xo);
}
function jo(e) {
	let t = Ao(e);
	return t.filter((e) => Co(e) >= 0 && To(e, t));
}
function Mo(e, t) {
	let n = jo(e), r = n.length;
	if (r === 0) return;
	let i = pa(Ln(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function No(e) {
	return Mo(Ln(e).body, 1) || e;
}
function Po(e) {
	return Mo(Ln(e).body, -1) || e;
}
function Fo(e, t) {
	if (!e) return null;
	let n = jo(Ln(e).body), r = n.length;
	if (r === 0) return null;
	let i = n.indexOf(e);
	return i === -1 ? null : n[(i + t + r) % r];
}
function Io(e) {
	return Fo(e, 1);
}
function Lo(e) {
	return Fo(e, -1);
}
function Ro(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !ma(n, r);
}
function zo(e) {
	jo(e).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function Bo(e) {
	let t = [];
	Oo(e, "[data-tabindex]", t), t.forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function Vo(e, t, n = !0) {
	return e.filter((e) => e.parentId === t).flatMap((t) => [...!n || t.context?.open ? [t] : [], ...Vo(e, t.id, n)]);
}
function Ho(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function Uo(e) {
	return `data-base-ui-${e}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/enqueueFocus.mjs
var Wo = 0;
function Go(e, t = {}) {
	let { preventScroll: n = !1, sync: r = !1, shouldFocus: i } = t;
	cancelAnimationFrame(Wo);
	function a() {
		i && !i() || e?.focus({ preventScroll: n });
	}
	if (r) return a(), Ie;
	let o = requestAnimationFrame(a);
	return Wo = o, () => {
		Wo === o && (cancelAnimationFrame(o), Wo = 0);
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/markOthers.mjs
var Ko = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap()
}, qo = "data-base-ui-inert", Jo = {
	inert: /* @__PURE__ */ new WeakSet(),
	"aria-hidden": /* @__PURE__ */ new WeakSet()
}, Yo = /* @__PURE__ */ new WeakMap(), Xo = 0;
function Zo(e) {
	return Jo[e];
}
function Qo(e) {
	return e ? w(e) ? e.host : Qo(e.parentNode) : null;
}
var $o = (e, t) => t.map((t) => {
	if (e.contains(t)) return t;
	let n = Qo(t);
	return e.contains(n) ? n : null;
}).filter((e) => e != null), es = (e) => {
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => {
		let n = e;
		for (; n && !t.has(n);) t.add(n), n = n.parentNode;
	}), t;
}, ts = (e, t, n) => {
	let r = [], i = (e) => {
		!e || n.has(e) || Array.from(e.children).forEach((e) => {
			v(e) !== "script" && (t.has(e) ? i(e) : r.push(e));
		});
	};
	return i(e), r;
};
function ns(e, t, n, r, { mark: i = !0 }) {
	let a = null;
	r ? a = "inert" : n && (a = "aria-hidden");
	let o = null, s = null, c = $o(t, e), l = i ? ts(t, es(c), new Set(c)) : [], u = [], d = [];
	if (a) {
		let e = Ko[a], n = Zo(a);
		s = n, o = e;
		let r = $o(t, Array.from(t.querySelectorAll("[aria-live]"))), i = c.concat(r);
		ts(t, es(i), new Set(i)).forEach((t) => {
			let r = t.getAttribute(a), i = r !== null && r !== "false", o = (e.get(t) || 0) + 1;
			e.set(t, o), u.push(t), o === 1 && i && n.add(t), i || t.setAttribute(a, a === "inert" ? "" : "true");
		});
	}
	return i && l.forEach((e) => {
		let t = (Yo.get(e) || 0) + 1;
		Yo.set(e, t), d.push(e), t === 1 && e.setAttribute(qo, "");
	}), Xo += 1, () => {
		o && u.forEach((e) => {
			let t = (o.get(e) || 0) - 1;
			o.set(e, t), t || (!s?.has(e) && a && e.removeAttribute(a), s?.delete(e));
		}), i && d.forEach((e) => {
			let t = (Yo.get(e) || 0) - 1;
			Yo.set(e, t), t || e.removeAttribute(qo);
		}), --Xo, Xo || (Ko.inert = /* @__PURE__ */ new WeakMap(), Ko["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Jo.inert = /* @__PURE__ */ new WeakSet(), Jo["aria-hidden"] = /* @__PURE__ */ new WeakSet(), Yo = /* @__PURE__ */ new WeakMap());
	};
}
function rs(e, t = {}) {
	let { ariaHidden: n = !1, inert: r = !1, mark: i = !0 } = t, a = Ln(e[0]).body;
	return ns(e, a, n, r, { mark: i });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/constants.mjs
var is = { style: { transition: "none" } }, as = { fallbackAxisSide: "none" }, os = { fallbackAxisSide: "end" }, ss = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
}, cs = /*#__PURE__*/ V.createContext(null), ls = () => V.useContext(cs), us = Uo("portal");
function ds(e = {}) {
	let { ref: t, container: n, componentProps: r = Re, elementProps: i } = e, a = Yn(), o = ls()?.portalNode, [s, c] = V.useState(null), [l, u] = V.useState(null), d = K((e) => {
		e !== null && u(e);
	}), f = V.useRef(null);
	J(() => {
		if (n === null) {
			f.current && (f.current = null, u(null), c(null));
			return;
		}
		if (a == null) return;
		let e = (n && (x(n) ? n : n.current)) ?? o ?? document.body;
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
	let p = He("div", r, {
		ref: [t, d],
		props: [{
			id: a,
			[us]: ""
		}, i]
	});
	return {
		portalNode: l,
		portalSubtree: s && p ? /*#__PURE__*/ Hr.createPortal(p, s) : null
	};
}
var fs = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, children: a, container: o, renderGuards: s, ...c } = e, { portalNode: l, portalSubtree: u } = ds({
		container: o,
		ref: t,
		componentProps: e,
		elementProps: c
	}), d = V.useRef(null), f = V.useRef(null), p = V.useRef(null), m = V.useRef(null), [h, g] = V.useState(null), _ = V.useRef(!1), v = h?.modal, y = h?.open, b = typeof s == "boolean" ? s : !!h && !h.modal && h.open && !!l;
	V.useEffect(() => {
		if (!l || v) return;
		function e(e) {
			l && e.relatedTarget && Ro(e) && (e.type === "focusin" ? _.current &&= (Bo(l), !1) : (zo(l), _.current = !0));
		}
		return Aa(ka(l, "focusin", e, !0), ka(l, "focusout", e, !0));
	}, [l, v]), J(() => {
		!l || y !== !0 || !_.current || (Bo(l), _.current = !1);
	}, [y, l]);
	let x = V.useMemo(() => ({
		beforeOutsideRef: d,
		afterOutsideRef: f,
		beforeInsideRef: p,
		afterInsideRef: m,
		portalNode: l,
		setFocusManagerState: g
	}), [l]);
	return /*#__PURE__*/ (0, Z.jsxs)(V.Fragment, { children: [u, /*#__PURE__*/ (0, Z.jsxs)(cs.Provider, {
		value: x,
		children: [
			b && l && /*#__PURE__*/ (0, Z.jsx)(Na, {
				"data-type": "outside",
				ref: d,
				onFocus: (e) => {
					Ro(e, l) ? p.current?.focus() : Po(h ? h.domReference : null)?.focus();
				}
			}),
			b && l && /*#__PURE__*/ (0, Z.jsx)("span", {
				"aria-owns": l.id,
				style: ss
			}),
			l && /*#__PURE__*/ Hr.createPortal(a, l),
			b && l && /*#__PURE__*/ (0, Z.jsx)(Na, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					Ro(e, l) ? m.current?.focus() : (No(h ? h.domReference : null)?.focus(), h?.closeOnFocusOut && h?.onOpenChange(!1, Dr("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function ps() {
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
var ms = class {
	nodesRef = { current: [] };
	events = ps();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, hs = /*#__PURE__*/ V.createContext(null), gs = /*#__PURE__*/ V.createContext(null), _s = () => V.useContext(hs)?.id || null, vs = (e) => {
	let t = V.useContext(gs);
	return e ?? t;
};
function ys(e) {
	let t = Yn(), n = vs(e), r = _s();
	return J(() => {
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
function bs(e) {
	let { children: t, id: n } = e, r = _s();
	return /*#__PURE__*/ (0, Z.jsx)(hs.Provider, {
		value: V.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function xs(e) {
	let { children: t, externalTree: n } = e, r = W(() => n ?? new ms()).current;
	return /*#__PURE__*/ (0, Z.jsx)(gs.Provider, {
		value: r,
		children: t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/components/FloatingFocusManager.mjs
function Ss(e, t) {
	let n = y(ha(e));
	return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
var Cs = 20, ws = [];
function Ts() {
	ws = ws.filter((e) => e.deref()?.isConnected);
}
function Es(e) {
	Ts(), e && v(e) !== "body" && (ws.push(new WeakRef(e)), ws.length > Cs && (ws = ws.slice(-20)));
}
function Ds() {
	return Ts(), ws[ws.length - 1]?.deref();
}
function Os(e) {
	return e ? ko(e) ? e : jo(e)[0] || e : null;
}
function ks(e) {
	if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) return;
	let t = Ao(e).filter((e) => {
		let t = e.getAttribute("data-tabindex") || "";
		return ko(e) || e.hasAttribute("data-tabindex") && !t.startsWith("-");
	}), n = e.getAttribute("tabindex");
	t.length === 0 ? n !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (n !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function As(e) {
	let { context: t, children: n, disabled: r = !1, initialFocus: i = !0, returnFocus: a = !0, restoreFocus: o = !1, modal: s = !0, closeOnFocusOut: c = !0, openInteractionType: l = "", nextFocusableElement: u, previousFocusableElement: d, beforeContentFocusGuardRef: f, externalTree: p, getInsideElements: m } = e, h = "rootStore" in t ? t.rootStore : t, g = h.useState("open"), _ = h.useState("domReferenceElement"), y = h.useState("floatingElement"), { events: b, dataRef: x } = h.context, S = K(() => x.current.floatingContext?.nodeId), w = i === !1, T = xa(_) && w, E = ja(i), D = ja(a), O = ja(l), ee = ja(g), k = vs(p), A = ls(), j = V.useRef(!1), M = V.useRef(!1), N = V.useRef(!1), P = V.useRef(null), F = V.useRef(""), I = V.useRef(""), L = V.useRef(null), R = V.useRef(null), z = De(L, f, A?.beforeInsideRef), B = De(R, A?.afterInsideRef), H = ea(), U = ea(), W = Ir(), te = A != null, G = Ca(y), q = K((e = G) => e ? jo(e) : []), ne = K(() => m?.().filter((e) => e != null) ?? []);
	V.useEffect(() => {
		if (r || !s) return;
		function e(e) {
			e.key === "Tab" && ma(G, pa(Ln(G))) && q().length === 0 && !T && ta(e);
		}
		return ka(Ln(G), "keydown", e);
	}, [
		r,
		G,
		s,
		T,
		q
	]), V.useEffect(() => {
		if (r || !g) return;
		let e = Ln(G);
		function t() {
			N.current = !1;
		}
		function n(e) {
			let t = ha(e), n = ne(), r = ma(y, t) || ma(_, t) || ma(A?.portalNode, t) || n.some((e) => e === t || ma(e, t));
			N.current = !r, I.current = e.pointerType || "keyboard", t?.closest("[data-base-ui-click-trigger]") && (M.current = !0, U.start(0, () => {
				M.current = !1;
			}));
		}
		function i() {
			I.current = "keyboard";
		}
		return Aa(ka(e, "pointerdown", n, !0), ka(e, "pointerup", t, !0), ka(e, "pointercancel", t, !0), ka(e, "keydown", i, !0), t);
	}, [
		r,
		y,
		_,
		G,
		g,
		A,
		U,
		ne
	]), V.useEffect(() => {
		if (r || !c) return;
		let e = Ln(G);
		function t() {
			M.current = !0, U.start(0, () => {
				M.current = !1;
			});
		}
		function n(e) {
			let t = ha(e);
			ko(t) && (P.current = t);
		}
		function i(t) {
			let n = t.relatedTarget, r = t.currentTarget, i = ha(t);
			s && n == null && i != null && ma(y, i) && Es(i), queueMicrotask(() => {
				let a = S(), c = h.context.triggerElements, l = ne(), f = n?.hasAttribute(Uo("focus-guard")) && [
					L.current,
					R.current,
					A?.beforeInsideRef.current,
					A?.afterInsideRef.current,
					A?.beforeOutsideRef.current,
					A?.afterOutsideRef.current,
					Lr(d),
					Lr(u)
				].includes(n), p = !(ma(_, n) || ma(y, n) || ma(n, y) || ma(A?.portalNode, n) || l.some((e) => e === n || ma(e, n)) || n != null && c.hasElement(n) || c.hasMatchingElement((e) => ma(e, n)) || f || k && (Vo(k.nodesRef.current, a).find((e) => ma(e.context?.elements.floating, n) || ma(e.context?.elements.domReference, n)) || Ho(k.nodesRef.current, a).find((e) => [e.context?.elements.floating, Ca(e.context?.elements.floating)].includes(n) || e.context?.elements.domReference === n)));
				if (r === _ && G && ks(G), o && r !== _ && !ho(i) && pa(e) === e.body) {
					if (C(G) && (G.focus(), o === "popup")) {
						W.request(() => {
							G.focus();
						});
						return;
					}
					let e = q(), t = P.current, n = (t && e.includes(t) ? t : null) || e[e.length - 1] || G;
					C(n) && n.focus();
				}
				if (x.current.insideReactTree) {
					x.current.insideReactTree = !1;
					return;
				}
				(T || !s) && n && p && !M.current && (T || n !== Ds()) && (j.current = !0, h.setOpen(!1, Dr(br, t)));
			});
		}
		function a() {
			N.current || (x.current.insideReactTree = !0, H.start(0, () => {
				x.current.insideReactTree = !1;
			}));
		}
		let l = C(_) ? _ : null;
		if (!(!y && !l)) return Aa(l && ka(l, "focusout", i), l && ka(l, "pointerdown", t), y && ka(y, "focusin", n), y && ka(y, "focusout", i), y && A && ka(y, "focusout", a, !0));
	}, [
		r,
		_,
		y,
		G,
		s,
		k,
		A,
		h,
		c,
		o,
		q,
		T,
		S,
		x,
		H,
		U,
		W,
		u,
		d,
		ne
	]), V.useEffect(() => {
		if (r || !y || !g) return;
		let e = Array.from(A?.portalNode?.querySelectorAll(`[${Uo("portal")}]`) || []), t = (k ? Ho(k.nodesRef.current, S()) : []).find((e) => xa(e.context?.elements.domReference || null))?.context?.elements.domReference, n = rs([
			y,
			...e,
			L.current,
			R.current,
			A?.beforeOutsideRef.current,
			A?.afterOutsideRef.current,
			...ne(),
			t,
			Lr(d),
			Lr(u),
			T ? _ : null
		].filter((e) => e != null), {
			ariaHidden: s || T,
			mark: !1
		}), i = rs([y, ...e].filter((e) => e != null));
		return () => {
			i(), n();
		};
	}, [
		g,
		r,
		_,
		y,
		s,
		A,
		T,
		k,
		S,
		u,
		d,
		ne
	]), J(() => {
		if (!g || r || !C(G)) return;
		let e = Ln(G), t = pa(e);
		queueMicrotask(() => {
			let n = E.current, r = typeof n == "function" ? n(O.current || "") : n;
			if (r === void 0 || r === !1 || ma(G, t)) return;
			let i = null, a = () => (i ??= q(G), i[0] || G), o;
			o = r === !0 || r === null ? a() : Lr(r), o ||= a();
			let s = ma(G, pa(e));
			Go(o, {
				preventScroll: o === G,
				shouldFocus() {
					if (!ee.current) return !1;
					if (s) return !0;
					let t = pa(e);
					return !(t !== o && ma(G, t));
				}
			});
		});
	}, [
		r,
		g,
		G,
		q,
		E,
		O,
		ee
	]), J(() => {
		if (r || !G) return;
		let e = Ln(G), t = pa(e), n = O.current == null;
		Es(t);
		function i(e) {
			if (e.open || (F.current = Ss(e.nativeEvent, I.current)), e.reason === "trigger-hover" && e.nativeEvent.type === "mouseleave" && (j.current = !0), e.reason === "outside-press") if (e.nested) j.current = !1;
			else if (ra(e.nativeEvent) || ia(e.nativeEvent)) j.current = !1;
			else {
				let e = !1;
				Ln(G).createElement("div").focus({ get preventScroll() {
					return e = !0, !1;
				} }), e ? j.current = !1 : j.current = !0;
			}
		}
		b.on("openchange", i);
		function a() {
			let e = D.current, r = typeof e == "function" ? e(F.current) : e;
			if (r === void 0 || r === !1) return null;
			r === null && (r = !0);
			let i = _?.isConnected ? _ : null, a = t?.isConnected && v(t) !== "body" ? t : null, o = n ? a || i : i || a;
			return o ||= Ds() || null, typeof r == "boolean" ? o : Lr(r) || o || null;
		}
		return () => {
			b.off("openchange", i);
			let t = pa(e), n = ne(), r = ma(y, t) || n.some((e) => e === t || ma(e, t)) || k && Vo(k.nodesRef.current, S(), !1).some((e) => ma(e.context?.elements.floating, t)), o = D.current, s = a();
			queueMicrotask(() => {
				let n = Os(s), i = typeof o != "boolean";
				o && !j.current && C(n) && (!(!i && n !== t && t !== e.body) || r) && n.focus({ preventScroll: !0 }), j.current = !1;
			});
		};
	}, [
		r,
		y,
		G,
		D,
		O,
		b,
		k,
		_,
		S,
		ne
	]), J(() => {
		if (!Li || g || !y) return;
		let e = pa(Ln(y));
		!C(e) || !ya(e) || ma(y, e) && e.blur();
	}, [g, y]), J(() => {
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
	]), J(() => {
		if (!(r || !G)) return ks(G), () => {
			queueMicrotask(Ts);
		};
	}, [r, G]);
	let re = !r && (!s || !T) && (te || s);
	return /*#__PURE__*/ (0, Z.jsxs)(V.Fragment, { children: [
		re && /*#__PURE__*/ (0, Z.jsx)(Na, {
			"data-type": "inside",
			ref: z,
			onFocus: (e) => {
				if (s) {
					let e = q();
					Go(e[e.length - 1]);
				} else A?.portalNode && (j.current = !1, Ro(e, A.portalNode) ? No(_)?.focus() : Lr(d ?? A.beforeOutsideRef)?.focus());
			}
		}),
		n,
		re && /*#__PURE__*/ (0, Z.jsx)(Na, {
			"data-type": "inside",
			ref: B,
			onFocus: (e) => {
				s ? Go(q()[0]) : A?.portalNode && (c && (j.current = !0), Ro(e, A.portalNode) ? Po(_)?.focus() : Lr(u ?? A.afterOutsideRef)?.focus());
			}
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useClick.mjs
function js(e, t = {}) {
	let { enabled: n = !0, event: r = "click", toggle: i = !0, ignoreMouse: a = !1, stickIfOpen: o = !0, touchOpenDelay: s = 0, reason: c = hr } = t, l = "rootStore" in e ? e.rootStore : e, u = l.context.dataRef, d = V.useRef(void 0), f = Ir(), p = ea(), m = V.useMemo(() => {
		function e(e, t, n, r) {
			let i = Dr(c, t, n);
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
				if (n.button !== 0 || r === "click" || aa(i, !0) && a) return;
				let c = t(s, n.currentTarget, (e) => e === "click" || e === "mousedown"), u = ha(o);
				if (ya(u)) {
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
				aa(i, !0) && a || e(t(l.select("open"), n.currentTarget, (e) => e === "click" || e === "mousedown" || e === "keydown" || e === "keyup"), n.nativeEvent, n.currentTarget, i);
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
	return V.useMemo(() => n ? { reference: m } : Re, [n, m]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function Ms() {
	return !1;
}
function Ns(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Ps(e, t = {}) {
	let { enabled: n = !0, escapeKey: r = !0, outsidePress: i = !0, outsidePressEvent: a = "sloppy", referencePress: o = Ms, bubbles: s, externalTree: c } = t, l = "rootStore" in e ? e.rootStore : e, u = l.useState("open"), d = l.useState("floatingElement"), { dataRef: f } = l.context, p = vs(c), m = K(typeof i == "function" ? i : () => !1), h = typeof i == "function" ? m : i, g = h !== !1, _ = K(() => a), { escapeKey: v, outsidePress: y } = Ns(s), b = V.useRef(!1), x = V.useRef(!1), T = V.useRef(!1), E = V.useRef(!1), D = V.useRef(""), O = V.useRef(null), ee = ea(), k = ea(), A = K(() => {
		k.clear(), f.current.insideReactTree = !1;
	}), j = K((e) => {
		let t = f.current.floatingContext?.nodeId;
		return (p ? Vo(p.nodesRef.current, t) : []).some((t) => t.context?.open && !t.context.dataRef.current[e]);
	}), M = K((e) => _a(e, l.select("floatingElement")) || _a(e, l.select("domReferenceElement"))), N = K((e) => {
		o() && l.setOpen(!1, Dr(hr, e.nativeEvent));
	}), I = K((e) => {
		if (!u || !n || !r || e.key !== "Escape" || E.current || !v && j("__escapeKeyBubbles")) return;
		let t = Dr(xr, na(e) ? e.nativeEvent : e);
		l.setOpen(!1, t), t.isCanceled || e.preventDefault(), !v && !t.isPropagationAllowed && e.stopPropagation();
	}), R = K(() => {
		f.current.insideReactTree = !0, k.start(0, A);
	}), z = K((e) => {
		if (!u || !n || e.button !== 0) return;
		let t = ha(e.nativeEvent);
		ma(l.select("floatingElement"), t) && (b.current || (b.current = !0, x.current = !1));
	}), B = K((e) => {
		!u || !n || (e.defaultPrevented || e.nativeEvent.defaultPrevented) && b.current && (x.current = !0);
	});
	V.useEffect(() => {
		if (!u || !n) return;
		f.current.__escapeKeyBubbles = v, f.current.__outsidePressBubbles = y;
		let e = new $i(), t = new $i();
		function i() {
			e.clear(), E.current = !0;
		}
		function a() {
			e.start(Li ? 5 : 0, () => {
				E.current = !1;
			});
		}
		function o() {
			T.current = !0, t.start(0, () => {
				T.current = !1;
			});
		}
		function s() {
			b.current = !1, x.current = !1;
		}
		function c() {
			let e = D.current, t = e === "pen" || !e ? "mouse" : e, n = _(), r = typeof n == "function" ? n() : n;
			return typeof r == "string" ? r : r[t];
		}
		function m(e) {
			let t = c();
			return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
		}
		function k(e) {
			let t = f.current.floatingContext?.nodeId, n = p && Vo(p.nodesRef.current, t).some((t) => _a(e, t.context?.elements.floating));
			return M(e) || n;
		}
		function N(e) {
			if (m(e)) {
				e.type !== "click" && !M(e) && (t.clear(), T.current = !1), A();
				return;
			}
			if (f.current.insideReactTree) {
				A();
				return;
			}
			let n = ha(e), r = `[${Uo("inert")}]`, i = S(n) ? n.getRootNode() : null, a = Array.from((w(i) ? i : Ln(l.select("floatingElement"))).querySelectorAll(r)), o = l.context.triggerElements;
			if (n && (o.hasElement(n) || o.hasMatchingElement((e) => ma(e, n)))) return;
			let s = S(n) ? n : null;
			for (; s && !P(s);) {
				let e = L(s);
				if (P(e) || !S(e)) break;
				s = e;
			}
			if (!(a.length && S(n) && !va(n) && !ma(n, l.select("floatingElement")) && a.every((e) => !ma(s, e)))) {
				if (C(n) && !("touches" in e)) {
					let t = P(n), r = F(n), i = /auto|scroll/, a = t || i.test(r.overflowX), o = t || i.test(r.overflowY), s = a && n.clientWidth > 0 && n.scrollWidth > n.clientWidth, c = o && n.clientHeight > 0 && n.scrollHeight > n.clientHeight, l = r.direction === "rtl", u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth), d = s && e.offsetY > n.clientHeight;
					if (u || d) return;
				}
				if (!k(e)) {
					if (c() === "intentional" && T.current) {
						t.clear(), T.current = !1;
						return;
					}
					typeof h == "function" && !h(e) || j("__outsidePressBubbles") || (l.setOpen(!1, Dr(vr, e)), A());
				}
			}
		}
		function R(e) {
			c() !== "sloppy" || e.pointerType === "touch" || !l.select("open") || !n || M(e) || N(e);
		}
		function z(e) {
			if (c() !== "sloppy" || !l.select("open") || !n || M(e)) return;
			let t = e.touches[0];
			t && (O.current = {
				startTime: Date.now(),
				startX: t.clientX,
				startY: t.clientY,
				dismissOnTouchEnd: !1,
				dismissOnMouseDown: !0
			}, ee.start(1e3, () => {
				O.current && (O.current.dismissOnTouchEnd = !1, O.current.dismissOnMouseDown = !1);
			}));
		}
		function B(e, t) {
			let n = ha(e);
			if (!n) return;
			let r = ka(n, e.type, () => {
				t(e), r();
			});
		}
		function V(e) {
			D.current = "touch", B(e, z);
		}
		function H(e) {
			ee.clear(), e.type === "pointerdown" && (D.current = e.pointerType), !(e.type === "mousedown" && O.current && !O.current.dismissOnMouseDown) && B(e, (e) => {
				e.type === "pointerdown" ? R(e) : N(e);
			});
		}
		function U(e) {
			if (!b.current) return;
			let n = x.current;
			if (s(), c() === "intentional") {
				if (e.type === "pointercancel") {
					n && o();
					return;
				}
				if (!k(e)) {
					if (n) {
						o();
						return;
					}
					typeof h == "function" && !h(e) || (t.clear(), T.current = !0, A());
				}
			}
		}
		function W(e) {
			if (c() !== "sloppy" || !O.current || M(e)) return;
			let t = e.touches[0];
			if (!t) return;
			let n = Math.abs(t.clientX - O.current.startX), r = Math.abs(t.clientY - O.current.startY), i = Math.sqrt(n * n + r * r);
			i > 5 && (O.current.dismissOnTouchEnd = !0), i > 10 && (N(e), ee.clear(), O.current = null);
		}
		function te(e) {
			B(e, W);
		}
		function G(e) {
			c() !== "sloppy" || !O.current || M(e) || (O.current.dismissOnTouchEnd && N(e), ee.clear(), O.current = null);
		}
		function K(e) {
			B(e, G);
		}
		let q = Ln(d), ne = Aa(r && Aa(ka(q, "keydown", I), ka(q, "compositionstart", i), ka(q, "compositionend", a)), g && Aa(ka(q, "click", H, !0), ka(q, "pointerdown", H, !0), ka(q, "pointerup", U, !0), ka(q, "pointercancel", U, !0), ka(q, "mousedown", H, !0), ka(q, "mouseup", U, !0), ka(q, "touchstart", V, !0), ka(q, "touchmove", te, !0), ka(q, "touchend", K, !0)));
		return () => {
			ne(), e.clear(), t.clear(), s(), T.current = !1;
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
		I,
		A,
		_,
		j,
		M,
		p,
		l,
		ee
	]), V.useEffect(A, [h, A]);
	let H = V.useMemo(() => ({
		onKeyDown: I,
		onPointerDown: N,
		onClick: N
	}), [I, N]), U = V.useMemo(() => ({
		onKeyDown: I,
		onPointerDown: B,
		onMouseDown: B,
		onClickCapture: R,
		onMouseDownCapture(e) {
			R(), z(e);
		},
		onPointerDownCapture(e) {
			R(), z(e);
		},
		onMouseUpCapture: R,
		onTouchEndCapture: R,
		onTouchMoveCapture: R
	}), [
		I,
		R,
		z,
		B
	]);
	return V.useMemo(() => n ? {
		reference: H,
		floating: U,
		trigger: H
	} : {}, [
		n,
		H,
		U
	]);
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Fs(e, t, n) {
	let { reference: r, floating: i } = e, a = qa(t), o = Ja(t), s = Ka(o), c = Ua(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Wa(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Is(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ha(t, e), p = oo(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = so(await i.getClippingRect({
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
	}, y = so(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Ls = 50, Rs = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Is
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Fs(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Ls && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Fs(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, zs = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ha(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Ua(r), _ = qa(o), v = Ua(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [io(o)] : Xa(o)), x = p !== "none";
			!d && x && b.push(...ro(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Ya(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === qa(t) || T.every((e) => qa(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = qa(e.placement);
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
function Bs(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Vs(e) {
	return Pa.some((t) => e[t] >= 0);
}
var Hs = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Ha(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Bs(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Vs(e)
					} };
				}
				case "escaped": {
					let e = Bs(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Vs(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Us = /*#__PURE__*/ new Set(["left", "top"]);
async function Ws(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ua(n), s = Wa(n), c = qa(n) === "y", l = Us.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ha(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Gs = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ws(t, e);
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
}, Ks = function(e) {
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
			} }, ...l } = Ha(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = qa(i), p = Ga(f), m = u[p], h = u[f], g = (e, t) => Va(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, qs = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Ha(e, t), u = {
				x: n,
				y: r
			}, d = qa(i), f = Ga(d), p = u[f], m = u[d], h = Ha(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Us.has(Ua(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Js = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Ha(e, t), c = await i.detectOverflow(t, s), l = Ua(n), u = Wa(n), d = qa(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Fa(p - c[m], g), y = Fa(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Ia(c.left, c.right) : S = p - 2 * Ia(c.top, c.bottom)), await o({
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
function Ys(e) {
	let t = F(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = C(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = La(n) !== a || La(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Xs(e) {
	return S(e) ? e : e.contextElement;
}
function Zs(e) {
	let t = Xs(e);
	if (!C(t)) return za(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ys(t), o = (a ? La(n.width) : n.width) / r, s = (a ? La(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Qs = /*#__PURE__*/ za(0);
function $s(e) {
	let t = y(e);
	return !N() || !t.visualViewport ? Qs : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function ec(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === y(e);
}
function tc(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Xs(e), o = za(1);
	t && (r ? S(r) && (o = Zs(r)) : o = Zs(e));
	let s = ec(a, n, r) ? $s(a) : za(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = y(a), t = S(r) ? y(r) : r, n = e, i = B(n);
		for (; i && t !== n;) {
			let e = Zs(i), t = i.getBoundingClientRect(), r = F(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = y(i), i = B(n);
		}
	}
	return so({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function nc(e, t) {
	let n = I(e).scrollLeft;
	return t ? t.left + n : tc(b(e)).left + n;
}
function rc(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - nc(e, n),
		y: n.top + t.scrollTop
	};
}
function ic(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = b(r), s = t ? D(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = za(1), u = za(0), d = C(r);
	if ((d || !a) && ((v(r) !== "body" || T(o)) && (c = I(r)), d)) {
		let e = tc(r);
		l = Zs(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? rc(o, c) : za(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function ac(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function oc(e) {
	let t = I(e), n = e.ownerDocument.body, r = Ia(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Ia(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + nc(e), o = -t.scrollTop;
	return F(n).direction === "rtl" && (a += Ia(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var sc = 25;
function cc(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = y(e), a = b(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !N() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (nc(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= sc && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function lc(e, t) {
	let n = tc(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Zs(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function uc(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = cc(e, n, t);
	else if (t === "document") r = oc(b(e));
	else if (S(t)) r = lc(t, n);
	else {
		let n = $s(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return so(r);
}
function dc(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = z(e, [], !1).filter((e) => S(e) && v(e) !== "body"), i = null, a = F(e).position === "fixed", o = a ? L(e) : e;
	for (; S(o) && !P(o);) {
		let e = F(o), t = j(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = L(o);
	}
	return t.set(e, r), r;
}
function fc(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? D(t) ? [] : dc(t, this._c) : [].concat(n), r], o = uc(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = uc(t, a[e], i);
		s = Ia(n.top, s), c = Fa(n.right, c), l = Fa(n.bottom, l), u = Ia(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function pc(e) {
	let { width: t, height: n } = Ys(e);
	return {
		width: t,
		height: n
	};
}
function mc(e, t, n) {
	let r = C(t), i = b(t), a = n === "fixed", o = tc(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = za(0);
	if ((r || !a) && ((v(t) !== "body" || T(i)) && (s = I(t)), r)) {
		let e = tc(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = nc(i));
	let l = i && !r && !a ? rc(i, s) : za(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function hc(e) {
	return F(e).position === "static";
}
function gc(e, t) {
	if (!C(e) || F(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return b(e) === n && (n = n.ownerDocument.body), n;
}
function _c(e, t) {
	let n = y(e);
	if (D(e)) return n;
	if (!C(e)) {
		let t = L(e);
		for (; t && !P(t);) {
			if (S(t) && !hc(t)) return t;
			t = L(t);
		}
		return n;
	}
	let r = gc(e, t);
	for (; r && E(r) && hc(r);) r = gc(r, t);
	return r && P(r) && hc(r) && !j(r) ? n : r || M(e) || n;
}
var vc = async function(e) {
	let t = this.getOffsetParent || _c, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: mc(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function yc(e) {
	return F(e).direction === "rtl";
}
var bc = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ic,
	getDocumentElement: b,
	getClippingRect: fc,
	getOffsetParent: _c,
	getElementRects: vc,
	getClientRects: ac,
	getDimensions: pc,
	getScale: Zs,
	isElement: S,
	isRTL: yc
};
function xc(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Sc(e, t, n) {
	let r = null, i, a = b(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ra(d), h = Ra(a.clientWidth - (u + f)), g = Ra(a.clientHeight - (d + p)), _ = Ra(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Ia(0, Fa(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!xc(l, e.getBoundingClientRect())) return s();
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
	let c = y(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Cc(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Xs(e), u = i || a ? [...l ? z(l) : [], ...t ? z(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Sc(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? tc(e) : null;
	c && g();
	function g() {
		let t = tc(e);
		h && !xc(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var wc = Gs, Tc = Ks, Ec = zs, Dc = Js, Oc = Hs, kc = qs, Ac = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...bc,
		...i.platform,
		_c: r
	};
	return Rs(e, t, {
		...i,
		platform: a
	});
}, jc = typeof document < "u" ? V.useLayoutEffect : function() {};
function Mc(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Mc(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Mc(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Nc(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Pc(e, t) {
	let n = Nc(e);
	return Math.round(t * n) / n;
}
function Fc(e) {
	let t = V.useRef(e);
	return jc(() => {
		t.current = e;
	}), t;
}
function Ic(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = V.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = V.useState(r);
	Mc(f, r) || p(r);
	let [m, h] = V.useState(null), [g, _] = V.useState(null), v = V.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = V.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = V.useRef(null), C = V.useRef(null), w = V.useRef(u), T = c != null, E = Fc(c), D = Fc(i), O = Fc(l), ee = V.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		D.current && (e.platform = D.current), Ac(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: O.current !== !1
			};
			k.current && !Mc(w.current, t) && (w.current = t, Hr.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		D,
		O
	]);
	jc(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let k = V.useRef(!1);
	jc(() => (k.current = !0, () => {
		k.current = !1;
	}), []), jc(() => {
		if (b && (S.current = b), x && (C.current = x), b && x) {
			if (E.current) return E.current(b, x, ee);
			ee();
		}
	}, [
		b,
		x,
		ee,
		E,
		T
	]);
	let A = V.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), j = V.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), M = V.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!j.floating) return e;
		let t = Pc(j.floating, u.x), r = Pc(j.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Nc(j.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		j.floating,
		u.x,
		u.y
	]);
	return V.useMemo(() => ({
		...u,
		update: ee,
		refs: A,
		elements: j,
		floatingStyles: M
	}), [
		u,
		ee,
		A,
		j,
		M
	]);
}
var Lc = (e, t) => {
	let n = wc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Rc = (e, t) => {
	let n = Tc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, zc = (e, t) => ({
	fn: kc(e).fn,
	options: [e, t]
}), Bc = (e, t) => {
	let n = Ec(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Vc = (e, t) => {
	let n = Dc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Hc = (e, t) => {
	let n = Oc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
};
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useOnFirstRender.mjs
function Uc(e) {
	let t = V.useRef(!0);
	t.current && (t.current = !1, e());
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/createSelector.mjs
var Q = (e, t, n, r, i, a, ...o) => {
	if (o.length > 0) throw Error(be(1));
	let s;
	if (e && t && n && r && i && a) s = (o, s, c, l) => a(e(o, s, c, l), t(o, s, c, l), n(o, s, c, l), r(o, s, c, l), i(o, s, c, l), s, c, l);
	else if (e && t && n && r && i) s = (a, o, s, c) => i(e(a, o, s, c), t(a, o, s, c), n(a, o, s, c), r(a, o, s, c), o, s, c);
	else if (e && t && n && r) s = (i, a, o, s) => r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
	else if (e && t && n) s = (r, i, a, o) => n(e(r, i, a, o), t(r, i, a, o), i, a, o);
	else if (e && t) s = (n, r, i, a) => t(e(n, r, i, a), r, i, a);
	else if (e) s = e;
	else throw Error("Missing arguments");
	return s;
}, Wc = /* @__PURE__ */ o(((e) => {
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
})), Gc = /* @__PURE__ */ o(((e, t) => {
	t.exports = Wc();
})), Kc = /* @__PURE__ */ o(((e) => {
	var t = f(), n = Gc();
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
})), qc = /* @__PURE__ */ o(((e, t) => {
	t.exports = Kc();
})), Jc = [], Yc = void 0;
function Xc() {
	return Yc;
}
function Zc(e) {
	Jc.push(e);
}
function Qc(e) {
	let t = (t, n) => {
		let r = W(el).current, i;
		try {
			Yc = r;
			for (let e of Jc) e.before(r);
			i = e(t, n);
			for (let e of Jc) e.after(r);
			r.didInitialize = !0;
		} finally {
			Yc = void 0;
		}
		return i;
	};
	return t.displayName = e.displayName || e.name, t;
}
function $c(e) {
	return /*#__PURE__*/ V.forwardRef(Qc(e));
}
function el() {
	return { didInitialize: !1 };
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/useStore.mjs
var tl = Gc(), nl = qc(), rl = Pe(19) ? ol : sl;
function il(e, t, n, r, i) {
	return rl(e, t, n, r, i);
}
function al(e, t, n, r, i) {
	let a = V.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, tl.useSyncExternalStore)(e.subscribe, a, a);
}
Zc({
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
		}), (0, tl.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
	}
});
function ol(e, t, n, r, i) {
	let a = Xc();
	if (!a) return al(e, t, n, r, i);
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
function sl(e, t, n, r, i) {
	return (0, nl.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/store/Store.mjs
var cl = class {
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
		return il(this, e, t, n, r);
	}
}, ll = class extends cl {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	useSyncedValue(e, t) {
		V.useDebugValue(e);
		let n = this;
		J(() => {
			n.state[e] !== t && n.set(e, t);
		}, [
			n,
			e,
			t
		]);
	}
	useSyncedValueWithCleanup(e, t) {
		let n = this;
		J(() => (n.state[e] !== t && n.set(e, t), () => {
			n.set(e, void 0);
		}), [
			n,
			e,
			t
		]);
	}
	useSyncedValues(e) {
		let t = this;
		J(() => {
			t.update(e);
		}, [t, ...Object.values(e)]);
	}
	useControlledProp(e, t) {
		V.useDebugValue(e);
		let n = this, r = t !== void 0;
		J(() => {
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
		return V.useDebugValue(e), il(this, this.selectors[e], t, n, r);
	}
	useContextCallback(e, t) {
		V.useDebugValue(e);
		let n = K(t ?? Ie);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = V.useRef(void 0);
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
}, ul = {
	open: Q((e) => e.open),
	transitionStatus: Q((e) => e.transitionStatus),
	domReferenceElement: Q((e) => e.domReferenceElement),
	referenceElement: Q((e) => e.positionReference ?? e.referenceElement),
	floatingElement: Q((e) => e.floatingElement),
	floatingId: Q((e) => e.floatingId)
}, dl = class extends ll {
	constructor(e) {
		let { syncOnly: t, nested: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: ps(),
			nested: n,
			triggerElements: i
		}, ul), this.syncOnly = t;
	}
	syncOpenEvent = (e, t) => {
		(!e || !this.state.open || t != null && oa(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0);
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
function fl(e) {
	let { popupStore: t, treatPopupAsFloatingElement: n = !1, floatingRootContext: r, floatingId: i, nested: a, onOpenChange: o } = e, s = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = t.context.triggerElements, d = o, f = V.useRef(null);
	r === void 0 && f.current === null && (f.current = new dl({
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
	return t.useSyncedValue("floatingId", i), J(() => {
		let e = {
			open: s,
			floatingId: i,
			referenceElement: c,
			floatingElement: l
		};
		S(c) && (e.domReferenceElement = c), p.state.positionReference === p.state.referenceElement && (e.positionReference = c), p.update(e);
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
var pl = {
	tabIndex: -1,
	[sa]: ""
};
function ml(e, t) {
	let n = V.useRef(null), r = V.useRef(null);
	return V.useCallback((i) => {
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
function hl(e, t, n, r = !1) {
	t ? e.preventUnmountingOnClose = !1 : r && (e.preventUnmountingOnClose = !0);
	let i = n?.id ?? null;
	(i || t) && (e.activeTriggerId = i, e.activeTriggerElement = n ?? null);
}
function gl(e) {
	let t = !1;
	return e.preventUnmountOnClose = () => {
		t = !0;
	}, () => t;
}
function _l(e, t, n, r) {
	Uc(() => {
		t === void 0 && e.state.open === !1 && n && (e.state = {
			...e.state,
			open: !0,
			activeTriggerId: r,
			preventUnmountingOnClose: !1
		});
	});
}
function vl(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = ml(e, n), o = K((t) => {
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
	return J(() => {
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
function yl(e, t = {}) {
	let { closeOnActiveTriggerUnmount: n = !1 } = t, r = e.useState("open");
	J(() => {
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
				let t = Dr(mr);
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
function bl(e, t, n) {
	let { mounted: r, setMounted: i, transitionStatus: a } = Gr(e), o = t.useState("preventUnmountingOnClose"), s = !e && o;
	t.useSyncedValues({
		mounted: r,
		transitionStatus: a,
		preventUnmountingOnClose: s
	});
	let c = K(() => {
		i(!1), t.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: !1,
			preventUnmountingOnClose: !1
		}), n?.(), t.context.onOpenChangeComplete?.(!1);
	});
	return Wr({
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
function xl(e, t) {
	e.useSyncedValues(t), J(() => () => {
		e.update({
			activeTriggerProps: Re,
			inactiveTriggerProps: Re,
			popupProps: Re
		});
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
var Sl = class {
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
function Cl() {
	return new dl({
		open: !1,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new Sl(),
		floatingId: void 0,
		syncOnly: !1,
		nested: !1,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/store.mjs
function wl() {
	return {
		open: !1,
		openProp: void 0,
		mounted: !1,
		transitionStatus: void 0,
		floatingRootContext: Cl(),
		floatingId: void 0,
		triggerCount: 0,
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: Re,
		inactiveTriggerProps: Re,
		popupProps: Re
	};
}
var Tl = Q((e) => e.triggerIdProp ?? e.activeTriggerId), El = Q((e) => e.openProp ?? e.open), Dl = Q((e) => (e.popupElement?.id ?? e.floatingId) || void 0);
function Ol(e, t) {
	return t !== void 0 && El(e) && Tl(e) === t;
}
function kl(e, t) {
	return Ol(e, t) ? !0 : t !== void 0 && El(e) && Tl(e) == null && e.triggerCount === 1;
}
var Al = {
	open: El,
	mounted: Q((e) => e.mounted),
	transitionStatus: Q((e) => e.transitionStatus),
	floatingRootContext: Q((e) => e.floatingRootContext),
	triggerCount: Q((e) => e.triggerCount),
	preventUnmountingOnClose: Q((e) => e.preventUnmountingOnClose),
	payload: Q((e) => e.payload),
	activeTriggerId: Tl,
	activeTriggerElement: Q((e) => e.mounted ? e.activeTriggerElement : null),
	popupId: Dl,
	isTriggerActive: Q((e, t) => t !== void 0 && Tl(e) === t),
	isOpenedByTrigger: Q((e, t) => Ol(e, t)),
	isMountedByTrigger: Q((e, t) => t !== void 0 && Tl(e) === t && e.mounted),
	triggerProps: Q((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
	triggerPopupId: Q((e, t) => kl(e, t) ? Dl(e) : void 0),
	popupProps: Q((e) => e.popupProps),
	popupElement: Q((e) => e.popupElement),
	positionerElement: Q((e) => e.positionerElement)
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function jl(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = Yn(), a = _s() != null, o = W(() => new dl({
		open: t,
		transitionStatus: void 0,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: new Sl(),
		floatingId: i,
		syncOnly: !1,
		nested: a
	})).current;
	return J(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = S(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), o.update(e);
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
function Ml(e = {}) {
	let { nodeId: t, externalTree: n } = e, r = jl(e), i = e.rootContext || r, a = i.useState("referenceElement"), o = i.useState("floatingElement"), s = i.useState("domReferenceElement"), c = i.useState("open"), l = i.useState("floatingId"), [u, d] = V.useState(null), [f, p] = V.useState(void 0), [m, h] = V.useState(void 0), g = V.useRef(null), _ = vs(n), v = V.useMemo(() => ({
		reference: a,
		floating: o,
		domReference: s
	}), [
		a,
		o,
		s
	]), y = Ic({
		...e,
		elements: {
			...v,
			...u && { reference: u }
		}
	}), b = S(f) ? f : null, x = m === void 0 ? i.state.floatingElement : m;
	i.useSyncedValue("referenceElement", f ?? null), i.useSyncedValue("domReferenceElement", f === void 0 ? s : b), i.useSyncedValue("floatingElement", x);
	let C = V.useCallback((e) => {
		let t = S(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		d(t), y.refs.setReference(t);
	}, [y.refs]), w = V.useCallback((e) => {
		(S(e) || e === null) && (g.current = e, p(e)), (S(y.refs.reference.current) || y.refs.reference.current === null || e !== null && !S(e)) && y.refs.setReference(e);
	}, [y.refs, p]), T = V.useCallback((e) => {
		h(e), y.refs.setFloating(e);
	}, [y.refs]), E = V.useMemo(() => ({
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
	]), D = V.useMemo(() => ({
		...y.elements,
		domReference: s
	}), [y.elements, s]), O = V.useMemo(() => ({
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
	return J(() => {
		s && (g.current = s);
	}, [s]), J(() => {
		i.context.dataRef.current.floatingContext = O;
		let e = _?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = O);
	}), V.useMemo(() => ({
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
var Nl = Fi && Li;
function Pl(e, t = {}) {
	let { enabled: n = !0, delay: r } = t, i = "rootStore" in e ? e.rootStore : e, { events: a, dataRef: o } = i.context, s = V.useRef(!1), c = V.useRef(null), l = V.useRef(!0), u = ea();
	V.useEffect(() => {
		let e = i.select("domReferenceElement");
		if (!n) return;
		let t = y(e);
		function r() {
			let e = i.select("domReferenceElement");
			!i.select("open") && C(e) && e === pa(Ln(e)) && (s.current = !0);
		}
		function a() {
			l.current = !0;
		}
		function o() {
			l.current = !1;
		}
		return Aa(ka(t, "blur", r), Nl && ka(t, "keydown", a, !0), Nl && ka(t, "pointerdown", o, !0));
	}, [i, n]), V.useEffect(() => {
		if (!n) return;
		function e(e) {
			if (e.reason === "trigger-press" || e.reason === "escape-key") {
				let e = i.select("domReferenceElement");
				S(e) && (c.current = e, s.current = !0);
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
	let d = V.useMemo(() => {
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
				let a = ha(t.nativeEvent);
				if (S(a)) {
					if (Nl && !t.relatedTarget) {
						if (!l.current && !ya(a)) return;
					} else if (!Sa(a)) return;
				}
				let o = ga(t.relatedTarget, i.context.triggerElements), { nativeEvent: d, currentTarget: f } = t, p = typeof r == "function" ? r() : r;
				if (i.select("open") && o || p === 0 || p === void 0) {
					i.setOpen(!0, Dr(_r, d, f));
					return;
				}
				u.start(p, () => {
					s.current || i.setOpen(!0, Dr(_r, d, f));
				});
			},
			onBlur(t) {
				e();
				let n = t.relatedTarget, r = t.nativeEvent, a = S(n) && n.hasAttribute(Uo("focus-guard")) && n.getAttribute("data-type") === "outside";
				u.start(0, () => {
					let e = i.select("domReferenceElement"), t = pa(Ln(e));
					!n && t === e || ma(o.current.floatingContext?.refs.floating.current, t) || ma(e, t) || a || ga(n ?? t, i.context.triggerElements) || i.setOpen(!1, Dr(_r, r));
				});
			}
		};
	}, [
		o,
		r,
		i,
		u
	]);
	return V.useMemo(() => n ? {
		reference: d,
		trigger: d
	} : {}, [n, d]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var Fl = class e {
	constructor() {
		this.pointerType = void 0, this.interactedInside = !1, this.handler = void 0, this.blockMouseMove = !0, this.performedPointerEventsMutation = !1, this.pointerEventsScopeElement = null, this.pointerEventsReferenceElement = null, this.pointerEventsFloatingElement = null, this.restTimeoutPending = !1, this.openChangeTimeout = new $i(), this.restTimeout = new $i(), this.handleCloseOptions = void 0;
	}
	static create() {
		return new e();
	}
	dispose = () => {
		this.openChangeTimeout.clear(), this.restTimeout.clear();
	};
	disposeEffect = () => this.dispose;
}, Il = /* @__PURE__ */ new WeakMap();
function Ll(e) {
	if (!e.performedPointerEventsMutation) return;
	let t = e.pointerEventsScopeElement;
	t && Il.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), Il.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null;
}
function Rl(e, t) {
	let { scopeElement: n, referenceElement: r, floatingElement: i } = t, a = Il.get(n);
	a && a !== e && Ll(a), Ll(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = i, Il.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", i.style.pointerEvents = "auto";
}
function zl(e) {
	let t = e.context.dataRef.current, n = W(() => t.hoverInteractionState ?? Fl.create()).current;
	return t.hoverInteractionState ||= n, Mr(t.hoverInteractionState.disposeEffect), t.hoverInteractionState;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
function Bl(e, t = {}) {
	let { enabled: n = !0, closeDelay: r = 0, nodeId: i } = t, a = "rootStore" in e ? e.rootStore : e, o = a.useState("open"), s = a.useState("floatingElement"), c = a.useState("domReferenceElement"), { dataRef: l } = a.context, u = vs(), d = _s(), f = zl(a), p = ea(), m = K(() => Da(l.current.openEvent?.type, f.interactedInside)), h = K(() => Oa(l.current.openEvent?.type)), g = K(() => {
		Ll(f);
	});
	J(() => {
		o || (f.pointerType = void 0, f.restTimeoutPending = !1, f.interactedInside = !1, g());
	}, [
		o,
		f,
		g
	]), V.useEffect(() => g, [g]), J(() => {
		if (n && o && f.handleCloseOptions?.blockPointerEvents && h() && S(c) && s) {
			let e = c, t = s, n = Ln(s), r = u?.nodesRef.current.find((e) => e.id === d)?.context?.elements.floating;
			r && (r.style.pointerEvents = "");
			let i = f.pointerEventsScopeElement === t ? null : f.pointerEventsScopeElement, a = r === t ? null : r, o = f.handleCloseOptions?.getScope?.() ?? i ?? a ?? e.closest("[data-rootownerid]") ?? n.body;
			return Rl(f, {
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
	]), V.useEffect(() => {
		if (!n) return;
		function e() {
			return !!(u && d && Vo(u.nodesRef.current, d).length > 0);
		}
		function t(e) {
			let t = Ta(r, "close", f.pointerType), n = () => {
				a.setOpen(!1, Dr(gr, e)), u?.events.emit("floating.closed", e);
			};
			t ? f.openChangeTimeout.start(t, n) : (f.openChangeTimeout.clear(), n());
		}
		function o(e) {
			let t = ha(e);
			if (!ba(t)) {
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
			if (ga(n.relatedTarget, a.context.triggerElements)) return;
			let r = l.current.floatingContext?.nodeId ?? i, o = n.relatedTarget;
			if (!(u && r && S(o) && Vo(u.nodesRef.current, r, !1).some((e) => ma(e.context?.elements.floating, o)))) {
				if (f.handler) {
					f.handler(n);
					return;
				}
				g(), h() && !m() && t(n);
			}
		}
		function v(t) {
			!u || !d || e() || p.start(0, () => {
				u.events.off("floating.closed", v), a.setOpen(!1, Dr(gr, t)), u.events.emit("floating.closed", t);
			});
		}
		let y = s;
		return Aa(y && ka(y, "mouseenter", c), y && ka(y, "mouseleave", _), y && ka(y, "pointerdown", o, !0), () => {
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
var Vl = { current: null };
function Hl(e, t = {}) {
	let { enabled: n = !0, delay: r = 0, handleClose: i = null, mouseOnly: a = !1, restMs: o = 0, move: s = !0, triggerElementRef: c = Vl, externalTree: l, isActiveTrigger: u = !0, getHandleCloseContext: d, isClosing: f, shouldOpen: p } = t, m = "rootStore" in e ? e.rootStore : e, { dataRef: h, events: g } = m.context, _ = vs(l), v = zl(m), y = V.useRef(!1), b = ja(i), x = ja(r), C = ja(o), w = ja(n), T = ja(p), E = ja(f), D = K(() => Da(h.current.openEvent?.type, v.interactedInside)), O = K(() => T.current?.() !== !1), ee = K((e, t, n) => {
		let r = m.context.triggerElements;
		if (r.hasElement(t)) return !e || !ma(e, t);
		if (!S(n)) return !1;
		let i = n;
		return r.hasMatchingElement((e) => ma(e, i)) && (!e || !ma(e, i));
	}), k = K(() => {
		v.handler &&= (Ln(m.select("domReferenceElement")).removeEventListener("mousemove", v.handler), void 0);
	}), A = K(() => {
		Ll(v);
	});
	return u && (v.handleCloseOptions = b.current?.__options), V.useEffect(() => k, [k]), V.useEffect(() => {
		if (!n) return;
		function e(e) {
			e.open ? y.current = !1 : (y.current = e.reason === gr, k(), v.openChangeTimeout.clear(), v.restTimeout.clear(), v.blockMouseMove = !0, v.restTimeoutPending = !1);
		}
		return g.on("openchange", e), () => {
			g.off("openchange", e);
		};
	}, [
		n,
		g,
		v,
		k
	]), V.useEffect(() => {
		if (!n) return;
		function e(e, t = !0) {
			let n = Ta(x.current, "close", v.pointerType);
			n ? v.openChangeTimeout.start(n, () => {
				m.setOpen(!1, Dr(gr, e)), _?.events.emit("floating.closed", e);
			}) : t && (v.openChangeTimeout.clear(), m.setOpen(!1, Dr(gr, e)), _?.events.emit("floating.closed", e));
		}
		let t = c.current ?? (u ? m.select("domReferenceElement") : null);
		if (!S(t)) return;
		function r(e) {
			if (v.openChangeTimeout.clear(), v.blockMouseMove = !1, a && !aa(v.pointerType)) return;
			let t = Ea(C.current), n = Ta(x.current, "open", v.pointerType), r = ha(e), i = e.currentTarget ?? null, o = m.select("domReferenceElement"), s = i;
			if (S(r) && !m.context.triggerElements.hasElement(r)) {
				for (let e of m.context.triggerElements.elements()) if (ma(e, r)) {
					s = e;
					break;
				}
			}
			S(i) && S(o) && !m.context.triggerElements.hasElement(i) && ma(i, o) && (s = o);
			let c = s != null && ee(o, s, r), l = m.select("open"), u = E.current?.() ?? m.select("transitionStatus") === "ending", d = !l && u && y.current, f = !c && S(s) && S(o) && ma(o, s) && d, p = t > 0 && !n, h = c && (l || d) || f, g = !l || c;
			if (h) {
				O() && m.setOpen(!0, Dr(gr, e, s));
				return;
			}
			p || (n ? v.openChangeTimeout.start(n, () => {
				g && O() && m.setOpen(!0, Dr(gr, e, s));
			}) : g && O() && m.setOpen(!0, Dr(gr, e, s)));
		}
		function i(t) {
			if (D()) {
				A();
				return;
			}
			k();
			let n = Ln(m.select("domReferenceElement"));
			v.restTimeout.clear(), v.restTimeoutPending = !1;
			let r = h.current.floatingContext ?? d?.();
			if (!ga(t.relatedTarget, m.context.triggerElements)) {
				if (b.current && r) {
					m.select("open") || v.openChangeTimeout.clear();
					let i = c.current;
					v.handler = b.current({
						...r,
						tree: _,
						x: t.clientX,
						y: t.clientY,
						onClose() {
							A(), k(), w.current && !D() && i === m.select("domReferenceElement") && e(t, !0);
						}
					}), n.addEventListener("mousemove", v.handler), v.handler(t);
					return;
				}
				(v.pointerType !== "touch" || !ma(m.select("floatingElement"), t.relatedTarget)) && e(t);
			}
		}
		return s ? Aa(ka(t, "mousemove", r, { once: !0 }), ka(t, "mouseenter", r), ka(t, "mouseleave", i)) : Aa(ka(t, "mouseenter", r), ka(t, "mouseleave", i));
	}, [
		k,
		A,
		h,
		x,
		m,
		n,
		b,
		v,
		u,
		ee,
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
	]), V.useMemo(() => {
		if (!n) return;
		function e(e) {
			v.pointerType = e.pointerType;
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove(e) {
				let { nativeEvent: t } = e, n = e.currentTarget, r = m.select("domReferenceElement"), i = m.select("open"), o = ee(r, n, e.target);
				if (a && !aa(v.pointerType)) return;
				if (i && o && v.handleCloseOptions?.blockPointerEvents) {
					let e = m.select("floatingElement");
					if (e) {
						let t = v.handleCloseOptions?.getScope?.() ?? n.ownerDocument.body;
						Rl(v, {
							scopeElement: t,
							referenceElement: n,
							floatingElement: e
						});
					}
				}
				let s = Ea(C.current);
				if (i && !o || s === 0 || !o && v.restTimeoutPending && e.movementX ** 2 + e.movementY ** 2 < 2) return;
				v.restTimeout.clear();
				function c() {
					if (v.restTimeoutPending = !1, D()) return;
					let e = m.select("open");
					!v.blockMouseMove && (!e || o) && O() && m.setOpen(!0, Dr(gr, t, n));
				}
				v.pointerType === "touch" ? Hr.flushSync(() => {
					c();
				}) : o && i ? c() : (v.restTimeoutPending = !0, v.restTimeout.start(s, c));
			}
		};
	}, [
		n,
		v,
		D,
		ee,
		a,
		m,
		C,
		O
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useListNavigation.mjs
var Ul = "Escape";
function Wl(e, t, n) {
	switch (e) {
		case "vertical": return t;
		case "horizontal": return n;
		default: return t || n;
	}
}
function Gl(e, t) {
	return Wl(t, e === "ArrowUp" || e === "ArrowDown", e === "ArrowLeft" || e === "ArrowRight");
}
function Kl(e, t, n) {
	return Wl(t, e === "ArrowDown", n ? e === "ArrowLeft" : e === "ArrowRight") || e === "Enter" || e === " " || e === "";
}
function ql(e, t, n) {
	return Wl(t, n ? e === la : e === ua, e === fa);
}
function Jl(e, t, n, r) {
	return t === "both" || t === "horizontal" && r ? e === Ul : Wl(t, n ? e === ua : e === la, e === da);
}
function Yl(e, t) {
	let { listRef: n, activeIndex: r, onNavigate: i = () => {}, enabled: a = !0, selectedIndex: o = null, allowEscape: s = !1, loopFocus: c = !1, nested: l = !1, rtl: u = !1, virtual: d = !1, focusItemOnOpen: f = "auto", focusItemOnHover: p = !0, openOnArrowKeyDown: m = !0, disabledIndices: h = void 0, orientation: g = "vertical", parentOrientation: _, id: v, resetOnPointerLeave: y = !0, externalTree: b, grid: x } = t, S = x != null, w = "rootStore" in e ? e.rootStore : e, T = w.useState("open"), E = w.useState("floatingElement"), D = w.useState("domReferenceElement"), O = w.context.dataRef, ee = Ca(E), k = xa(D), A = ja(ee), j = _s(), M = vs(b), N = V.useRef(f), P = V.useRef(o ?? -1), F = V.useRef(null), I = V.useRef(!0), L = K((e) => {
		i(P.current === -1 ? null : P.current, e);
	}), R = V.useRef(!!E), z = V.useRef(T), B = V.useRef(!1), H = V.useRef(!1), U = V.useRef(null), W = ja(h), te = ja(T), G = ja(o), q = ja(y), ne = Ir(), re = Ir(), ie = K(() => {
		function e(e) {
			d ? M?.events.emit("virtualfocus", e) : U.current = Go(e, {
				sync: B.current,
				preventScroll: !0
			});
		}
		let t = n.current[P.current], r = H.current;
		t && e(t), (B.current ? (e) => e() : (e) => ne.request(e))(() => {
			let i = n.current[P.current] || t;
			i && (t || e(i), ue && (r || !I.current) && i.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			}));
		});
	});
	J(() => {
		O.current.orientation = g;
	}, [O, g]), J(() => {
		a && (T && E ? (P.current = o ?? -1, N.current && o != null && (H.current = !0, L())) : R.current && (P.current = -1, L()));
	}, [
		a,
		T,
		E,
		o,
		L
	]), J(() => {
		if (a) {
			if (!T) {
				B.current = !1;
				return;
			}
			if (E) if (r == null) {
				if (B.current = !1, G.current != null) return;
				if (R.current && (P.current = -1, ie()), (!z.current || !R.current) && N.current && (F.current != null || N.current === !0 && F.current == null)) {
					let e = 0, t = () => {
						n.current[0] == null ? (e < 2 && (e ? (e) => re.request(e) : queueMicrotask)(t), e += 1) : (P.current = F.current == null || Kl(F.current, g, u) || l ? lo(n) : uo(n), F.current = null, L());
					};
					t();
				}
			} else co(n.current, r) || (P.current = r, ie(), H.current = !1);
		}
	}, [
		a,
		T,
		E,
		r,
		G,
		l,
		n,
		g,
		u,
		L,
		ie,
		re
	]), J(() => {
		if (!a || E || !M || d || !R.current) return;
		let e = M.nodesRef.current, t = e.find((e) => e.id === j)?.context?.elements.floating, n = pa(Ln(D ?? t ?? null)), r = e.some((e) => e.context && ma(e.context.elements.floating, n));
		t && !r && I.current && t.focus({ preventScroll: !0 });
	}, [
		a,
		E,
		D,
		M,
		j,
		d
	]), J(() => {
		z.current = T, R.current = !!E;
	}), J(() => {
		T || (F.current = null, N.current = f);
	}, [T, f]);
	let ae = r != null, oe = K((e) => {
		if (!te.current) return;
		let t = n.current.indexOf(e.currentTarget);
		t !== -1 && (P.current !== t || r !== t) && (P.current = t, L(e));
	}), se = K(() => _ ?? M?.nodesRef.current.find((e) => e.id === j)?.context?.dataRef?.current.orientation), ce = K(() => lo(n, W.current)), le = K((e) => {
		if (I.current = !1, B.current = !0, e.which === 229 || !te.current && e.currentTarget === A.current) return;
		if (l && Jl(e.key, g, u, S)) {
			Gl(e.key, se()) || ta(e), w.setOpen(!1, Dr(Sr, e.nativeEvent)), C(D) && (d ? M?.events.emit("virtualfocus", D) : D.focus());
			return;
		}
		let t = P.current, r = lo(n, h), i = uo(n, h);
		if (k || (e.key === "Home" && (ta(e), P.current = r, L(e)), e.key === "End" && (ta(e), P.current = i, L(e))), x != null) {
			let t = x(e, P.current, n, g, c, u, h, r, i);
			if (t != null && (P.current = t, L(e)), g === "both") return;
		}
		if (Gl(e.key, g)) {
			if (ta(e), T && !d && pa(e.currentTarget.ownerDocument) === e.currentTarget) {
				P.current = Kl(e.key, g, u) ? r : i, L(e);
				return;
			}
			Kl(e.key, g, u) ? c ? t >= i ? s && t !== n.current.length ? P.current = -1 : (B.current = !1, P.current = r) : P.current = fo(n.current, {
				startingIndex: t,
				disabledIndices: h
			}) : P.current = Math.min(i, fo(n.current, {
				startingIndex: t,
				disabledIndices: h
			})) : c ? t <= r ? s && t !== -1 ? P.current = n.current.length : (B.current = !1, P.current = i) : P.current = fo(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			}) : P.current = Math.max(r, fo(n.current, {
				startingIndex: t,
				decrement: !0,
				disabledIndices: h
			})), co(n.current, P.current) && (P.current = -1), L(e);
		}
	}), ue = V.useMemo(() => ({
		onFocus(e) {
			B.current = !0, oe(e);
		},
		onClick: ({ currentTarget: e }) => e.focus({ preventScroll: !0 }),
		onMouseMove(e) {
			B.current = !0, H.current = !1, p && oe(e);
		},
		onPointerLeave(e) {
			if (!te.current || !I.current || e.pointerType === "touch") return;
			B.current = !0;
			let t = e.relatedTarget;
			if (!(!p || n.current.includes(t)) && q.current && (U.current?.(), U.current = null, P.current = -1, L(e), !d)) {
				let e = A.current, t = pa(Ln(e));
				e && ma(e, t) && e.focus({ preventScroll: !0 });
			}
		}
	}), [
		oe,
		te,
		A,
		p,
		n,
		L,
		q,
		d
	]), de = V.useMemo(() => d && T && ae && { "aria-activedescendant": `${v}-${r}` }, [
		d,
		T,
		ae,
		v,
		r
	]), fe = V.useMemo(() => ({
		"aria-orientation": g === "both" ? void 0 : g,
		...k ? {} : de,
		onKeyDown(e) {
			if (e.key === "Tab" && e.shiftKey && T && !d) {
				let t = ha(e.nativeEvent);
				if (t && !ma(A.current, t)) return;
				ta(e), w.setOpen(!1, Dr(br, e.nativeEvent)), C(D) && D.focus();
				return;
			}
			le(e);
		},
		onPointerMove() {
			I.current = !0;
		}
	}), [
		de,
		le,
		A,
		g,
		k,
		w,
		T,
		d,
		D
	]), pe = V.useMemo(() => {
		function e(e) {
			w.setOpen(!0, Dr(Sr, e.nativeEvent, e.currentTarget));
		}
		function t(e) {
			f === "auto" && ra(e.nativeEvent) && (N.current = !d);
		}
		function n(e) {
			N.current = f, f === "auto" && ia(e.nativeEvent) && (N.current = !0);
		}
		return {
			onKeyDown(t) {
				let n = w.select("open");
				I.current = !1;
				let r = t.key.startsWith("Arrow"), i = ql(t.key, se(), u), a = Gl(t.key, g), o = (l ? i : a) || t.key === "Enter" || t.key.trim() === "";
				if (d && n) return le(t);
				if (!(!n && !m && r)) {
					if (o) {
						let e = Gl(t.key, se());
						F.current = l && e ? null : t.key;
					}
					if (l) {
						i && (ta(t), n ? (P.current = ce(), L(t)) : e(t));
						return;
					}
					a && (G.current != null && (P.current = G.current), ta(t), !n && m ? e(t) : le(t), n && L(t));
				}
			},
			onFocus(e) {
				w.select("open") && !d && (P.current = -1, L(e));
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
		L,
		w,
		m,
		g,
		se,
		u,
		G,
		d
	]), me = V.useMemo(() => ({
		...de,
		...pe
	}), [de, pe]);
	return V.useMemo(() => a ? {
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/hooks/useTypeahead.mjs
function Xl(e, t) {
	let { listRef: n, elementsRef: r, activeIndex: i, onMatch: a, disabledIndices: o, onTyping: s, enabled: c = !0, resetMs: l = 750, selectedIndex: u = null } = t, d = "rootStore" in e ? e.rootStore : e, f = d.useState("open"), p = ea(), m = V.useRef(""), h = V.useRef(u ?? i ?? -1), g = V.useRef(null), _ = K((e) => {
		function t(e) {
			let t = r?.current[e];
			return !t || ho(t);
		}
		function c(e) {
			return t(e) ? o == null || !po(Le, e, o) : !1;
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
		if (m.current.length > 0 && e.key === " " && (ta(e), s?.(!0)), m.current.length > 0 && m.current[0] !== " " && d(_, m.current) === -1 && e.key !== " " && s?.(!1), _ == null || e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		f && e.key !== " " && (ta(e), s?.(!0));
		let v = m.current === "";
		v && (h.current = u ?? i ?? -1), _.every((e, t) => e && c(t) ? e[0]?.toLowerCase() !== e[1]?.toLowerCase() : !0) && m.current === e.key && (m.current = "", h.current = g.current), m.current += e.key, p.start(l, () => {
			m.current = "", h.current = g.current, s?.(!1);
		});
		let y = ((v ? u ?? i ?? -1 : h.current) ?? 0) + 1, b = d(_, m.current, y);
		b === -1 ? e.key !== " " && (m.current = "", s?.(!1)) : (a?.(b), g.current = b);
	}), v = K((e) => {
		let t = e.relatedTarget, n = d.select("domReferenceElement"), r = d.select("floatingElement");
		ma(n, t) || ma(r, t) || (p.clear(), m.current = "", h.current = g.current, s?.(!1));
	});
	J(() => {
		!f && u !== null || (p.clear(), g.current = null, m.current !== "" && (m.current = ""));
	}, [
		f,
		u,
		p
	]), J(() => {
		f && m.current === "" && (h.current = u ?? i ?? -1);
	}, [
		f,
		u,
		i
	]);
	let y = V.useMemo(() => ({
		onKeyDown: _,
		onBlur: v
	}), [_, v]);
	return V.useMemo(() => c ? {
		reference: y,
		floating: y
	} : {}, [c, y]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
var Zl = .1, Ql = Zl * Zl, $l = .5;
function eu(e, t, n, r, i, a) {
	return r >= t != a >= t && e <= (i - n) * (t - r) / (a - r) + n;
}
function tu(e, t, n, r, i, a, o, s, c, l) {
	let u = !1;
	return eu(e, t, n, r, i, a) && (u = !u), eu(e, t, i, a, o, s) && (u = !u), eu(e, t, o, s, c, l) && (u = !u), eu(e, t, c, l, n, r) && (u = !u), u;
}
function nu(e, t, n) {
	return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function ru(e, t, n, r, i, a) {
	return e >= Math.min(n, i) && e <= Math.max(n, i) && t >= Math.min(r, a) && t <= Math.max(r, a);
}
function iu(e = {}) {
	let { blockPointerEvents: t = !1 } = e, n = new $i(), r = ({ x: e, y: t, placement: r, elements: i, onClose: a, nodeId: o, tree: s }) => {
		let c = r?.split("-")[0], l = !1, u = null, d = null, f = typeof performance < "u" ? performance.now() : 0;
		function p(e, t) {
			let n = performance.now(), r = n - f;
			if (u === null || d === null || r === 0) return u = e, d = t, f = n, !1;
			let i = e - u, a = t - d, o = i * i + a * a, s = r * r * Ql;
			return u = e, d = t, f = n, o < s;
		}
		function m() {
			n.clear(), a();
		}
		return function(r) {
			n.clear();
			let a = i.domReference, u = i.floating;
			if (!a || !u || c == null || e == null || t == null) return;
			let { clientX: d, clientY: f } = r, h = ha(r), g = r.type === "mouseleave", _ = ma(u, h), v = ma(a, h);
			if (_ && (l = !0, !g)) return;
			if (v && (l = !1, !g)) {
				l = !0;
				return;
			}
			if (g && S(r.relatedTarget) && ma(u, r.relatedTarget)) return;
			function y() {
				return !!(s && Vo(s.nodesRef.current, o).length > 0);
			}
			function b() {
				y() || m();
			}
			if (y()) return;
			let x = a.getBoundingClientRect(), C = u.getBoundingClientRect(), w = e > C.right - C.width / 2, T = t > C.bottom - C.height / 2, E = C.width > x.width, D = C.height > x.height, O = (E ? x : C).left, ee = (E ? x : C).right, k = (D ? x : C).top, A = (D ? x : C).bottom;
			if (c === "top" && t >= x.bottom - 1 || c === "bottom" && t <= x.top + 1 || c === "left" && e >= x.right - 1 || c === "right" && e <= x.left + 1) {
				b();
				return;
			}
			let j = !1;
			switch (c) {
				case "top":
					j = ru(d, f, O, x.top + 1, ee, C.bottom - 1);
					break;
				case "bottom":
					j = ru(d, f, O, C.top + 1, ee, x.bottom - 1);
					break;
				case "left":
					j = ru(d, f, C.right - 1, A, x.left + 1, k);
					break;
				case "right": j = ru(d, f, x.right - 1, A, C.left + 1, k);
			}
			if (j) return;
			if (l && !nu(d, f, x)) {
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
					let n = E ? $l / 2 : $l * 4, r = E || w ? e + n : e - n, i = E ? e - n : w ? e + n : e - n, a = t + $l + 1, o = w || E ? C.bottom - $l : C.top, s = w ? E ? C.bottom - $l : C.top : C.bottom - $l;
					M = tu(d, f, r, a, i, a, C.left, o, C.right, s);
					break;
				}
				case "bottom": {
					let n = E ? $l / 2 : $l * 4, r = E || w ? e + n : e - n, i = E ? e - n : w ? e + n : e - n, a = t - $l, o = w || E ? C.top + $l : C.bottom, s = w ? E ? C.top + $l : C.bottom : C.top + $l;
					M = tu(d, f, r, a, i, a, C.left, o, C.right, s);
					break;
				}
				case "left": {
					let n = D ? $l / 2 : $l * 4, r = D || T ? t + n : t - n, i = D ? t - n : T ? t + n : t - n, a = e + $l + 1, o = T || D ? C.right - $l : C.left, s = T ? D ? C.right - $l : C.left : C.right - $l;
					M = tu(d, f, o, C.top, s, C.bottom, a, r, a, i);
					break;
				}
				case "right": {
					let n = D ? $l / 2 : $l * 4, r = D || T ? t + n : t - n, i = D ? t - n : T ? t + n : t - n, a = e - $l, o = T || D ? C.left + $l : C.right, s = T ? D ? C.left + $l : C.right : C.left + $l;
					M = tu(d, f, a, r, a, i, o, C.top, s, C.bottom);
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
var au = /*#__PURE__*/ V.createContext(void 0);
function ou(e) {
	let t = V.useContext(au);
	if (t === void 0 && !e) throw Error(be(69));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/composite.mjs
var su = "ArrowUp", cu = "ArrowDown", lu = "ArrowLeft", uu = "ArrowRight", du = "Home", fu = /* @__PURE__ */ new Set([lu, uu]), pu = /* @__PURE__ */ new Set([su, cu]), mu = /* @__PURE__ */ new Set([...fu, ...pu]), hu = /* @__PURE__ */ new Set([
	...mu,
	du,
	"End"
]);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function gu(e) {
	return e === "starting" ? is : Re;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/popup/MenuPopup.mjs
var _u = {
	...Ci,
	...Vr
}, vu = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s } = pi(), { side: c, align: l } = di(), u = ou(!0) != null, d = s.useState("open"), f = s.useState("transitionStatus"), p = s.useState("popupProps"), m = s.useState("mounted"), h = s.useState("instantType"), g = s.useState("activeTriggerElement"), _ = s.useState("parent"), v = s.useState("lastOpenChangeReason"), y = s.useState("rootId"), b = s.useState("floatingRootContext"), x = s.useState("floatingTreeRoot"), S = s.useState("closeDelay"), C = s.useState("activeTriggerElement"), w = s.useState("hoverEnabled"), T = s.useState("disabled"), E = s.useState("openMethod"), D = _.type === "context-menu";
	Wr({
		open: d,
		ref: s.context.popupRef,
		onComplete() {
			d && s.context.onOpenChangeComplete?.(!0);
		}
	}), V.useEffect(() => {
		function e(e) {
			s.setOpen(!1, Dr(e.reason, e.domEvent));
		}
		return x.events.on("close", e), () => {
			x.events.off("close", e);
		};
	}, [x.events, s]), Bl(b, {
		enabled: w && !T && !D && _.type !== "menubar",
		closeDelay: S
	});
	let O = V.useCallback((e) => {
		s.set("popupElement", e);
	}, [s]), ee = He("div", e, {
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
			O
		],
		stateAttributesMapping: _u,
		props: [
			p,
			{ onKeyDown(e) {
				u && hu.has(e.key) && e.stopPropagation();
			} },
			gu(f),
			o,
			{ "data-rootownerid": y }
		]
	}), k = _.type === void 0 || D;
	return (g || _.type === "menubar" && v !== "outside-press") && (k = !0), /*#__PURE__*/ (0, Z.jsx)(As, {
		context: b,
		openInteractionType: E,
		modal: D,
		disabled: !m,
		returnFocus: a === void 0 ? k : a,
		initialFocus: _.type !== "menu",
		restoreFocus: !0,
		externalTree: _.type === "menubar" ? void 0 : x,
		previousFocusableElement: C,
		nextFocusableElement: _.type === void 0 ? s.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: _.type === void 0 ? s.context.beforeContentFocusGuardRef : void 0,
		children: ee
	});
}), yu = /*#__PURE__*/ V.createContext(void 0);
function bu() {
	let e = V.useContext(yu);
	if (e === void 0) throw Error(be(32));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/portal/MenuPortal.mjs
var xu = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = pi();
	return i.useState("mounted") || n ? /*#__PURE__*/ (0, Z.jsx)(yu.Provider, {
		value: n,
		children: /*#__PURE__*/ (0, Z.jsx)(fs, {
			ref: t,
			...r
		})
	}) : null;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/inertValue.mjs
function Su(e) {
	return Pe(19) ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
var Cu = /*#__PURE__*/ V.createContext(void 0);
function wu() {
	return V.useContext(Cu)?.direction ?? "ltr";
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
var Tu = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0, offsetParent: d = "real" } = Ha(e, t) || {};
		if (l == null) return {};
		let f = oo(u), p = {
			x: n,
			y: r
		}, m = Ja(i), h = Ka(m), g = await o.getDimensions(l), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = a.reference[h] + a.reference[m] - p[m] - a.floating[h], S = p[m] - a.reference[m], C = d === "real" ? await o.getOffsetParent?.(l) : s.floating, w = s.floating[b] || a.floating[h];
		(!w || !await o.isElement?.(C)) && (w = s.floating[b] || a.floating[h]);
		let T = x / 2 - S / 2, E = w / 2 - g[h] / 2 - 1, D = Math.min(f[v], E), O = Math.min(f[y], E), ee = D, k = w - g[h] - O, A = w / 2 - g[h] / 2 + T, j = Va(ee, A, k), M = !c.arrow && Wa(i) != null && A !== j && a.reference[h] / 2 - (A < ee ? D : O) - g[h] / 2 < 0, N = M ? A < ee ? A - ee : A - k : 0;
		return {
			[m]: p[m] + N,
			data: {
				[m]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), Eu = (e, t) => ({
	...Tu(e),
	options: [e, t]
}), Du = Hc().fn, Ou = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0;
		return { data: { referenceHidden: (await Du(e)).data?.referenceHidden || a } };
	}
}, ku = {
	sideX: "left",
	sideY: "top"
}, Au = {
	name: "adaptiveOrigin",
	async fn(e) {
		let { x: t, y: n, rects: { floating: r }, elements: { floating: i }, platform: a, strategy: o, placement: s } = e, c = y(i), l = c.getComputedStyle(i);
		if (l.transitionDuration === "0s" || l.transitionDuration === "") return {
			x: t,
			y: n,
			data: ku
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
			let e = Ln(i);
			d = {
				width: e.documentElement.clientWidth,
				height: e.documentElement.clientHeight
			};
		} else await a.isElement?.(u) && (d = await a.getDimensions(u));
		let f = Ua(s), p = t, m = n;
		f === "left" && (p = d.width - (t + r.width)), f === "top" && (m = d.height - (n + r.height));
		let h = f === "left" ? "right" : ku.sideX, g = f === "top" ? "bottom" : ku.sideY;
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
function ju(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function Mu(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: ju(t, Ua(i), n),
		align: Wa(i) || "center",
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
function Nu(e) {
	let { anchor: t, positionMethod: n = "absolute", side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, collisionBoundary: s, collisionPadding: c = 5, sticky: l = !1, arrowPadding: u = 5, disableAnchorTracking: d = !1, inline: f, keepMounted: p = !1, floatingRootContext: m, mounted: h, collisionAvoidance: g, shiftCrossAxis: _ = !1, nodeId: v, adaptiveOrigin: b, lazyFlip: x = !1, externalTree: S } = e, [C, w] = V.useState(null);
	!h && C !== null && w(null);
	let T = g.side || "flip", E = g.align || "flip", D = g.fallbackAxisSide || "end", O = typeof t == "function" ? t : void 0, ee = K(O), k = O ? ee : t, A = ja(t), j = ja(h), M = wu() === "rtl", N = C || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": M ? "left" : "right",
		"inline-start": M ? "right" : "left"
	}[r], P = a === "center" ? N : `${N}-${a}`, F = c, I = +(r === "bottom"), L = +(r === "top"), R = +(r === "right"), z = +(r === "left");
	typeof F == "number" ? F = {
		top: F + I,
		right: F + z,
		bottom: F + L,
		left: F + R
	} : F &&= {
		top: (F.top || 0) + I,
		right: (F.right || 0) + z,
		bottom: (F.bottom || 0) + L,
		left: (F.left || 0) + R
	};
	let B = {
		boundary: s === "clipping-ancestors" ? "clippingAncestors" : s,
		padding: F
	}, H = V.useRef(null), U = ja(i), W = ja(o), te = typeof i == "function" ? 0 : i, G = typeof o == "function" ? 0 : o, q = [];
	f && q.push(f), q.push(Lc((e) => {
		let t = Mu(e, r, M), n = typeof U.current == "function" ? U.current(t) : U.current, i = typeof W.current == "function" ? W.current(t) : W.current;
		return {
			mainAxis: n,
			crossAxis: i,
			alignmentAxis: i
		};
	}, [
		te,
		G,
		M,
		r
	]));
	let ne = E === "none" && T !== "shift", re = !ne && (l || _ || T === "shift"), ie = T === "none" ? null : Bc({
		...B,
		padding: {
			top: F.top + 1,
			right: F.right + 1,
			bottom: F.bottom + 1,
			left: F.left + 1
		},
		mainAxis: !_ && T === "flip",
		crossAxis: E === "flip" && "alignment",
		fallbackAxisSideDirection: D
	}), ae = ne ? null : Rc((e) => {
		let t = Ln(e.elements.floating).documentElement;
		return {
			...B,
			rootBoundary: _ ? {
				x: 0,
				y: 0,
				width: t.clientWidth,
				height: t.clientHeight
			} : void 0,
			mainAxis: E !== "none",
			crossAxis: re,
			limiter: l || _ ? void 0 : zc((e) => {
				if (!H.current) return {};
				let { width: t, height: n } = H.current.getBoundingClientRect(), r = qa(Ua(e.placement)), i = r === "y" ? t : n, a = r === "y" ? F.left + F.right : F.top + F.bottom;
				return { offset: i / 2 + a / 2 };
			})
		};
	}, [
		B,
		l,
		_,
		F,
		E
	]);
	T === "shift" || E === "shift" || a === "center" ? q.push(ae, ie) : q.push(ie, ae), q.push(Vc({
		...B,
		apply({ elements: { floating: e }, availableWidth: t, availableHeight: n, rects: r }) {
			if (!j.current) return;
			let i = e.style;
			i.setProperty("--available-width", `${t}px`), i.setProperty("--available-height", `${n}px`);
			let a = y(e).devicePixelRatio || 1, { x: o, y: s, width: c, height: l } = r.reference, u = (Math.round((o + c) * a) - Math.round(o * a)) / a, d = (Math.round((s + l) * a) - Math.round(s * a)) / a;
			i.setProperty("--anchor-width", `${u}px`), i.setProperty("--anchor-height", `${d}px`);
		}
	}), Eu((e) => ({
		element: H.current || Ln(e.elements.floating).createElement("div"),
		padding: u,
		offsetParent: "floating"
	}), [u]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: t, middlewareData: n, placement: a, rects: o, y: s } = e, c = Ua(a), l = qa(c), u = H.current, d = n.arrow?.x || 0, f = n.arrow?.y || 0, p = u?.clientWidth || 0, m = u?.clientHeight || 0, h = d + p / 2, g = f + m / 2, _ = Math.abs(n.shift?.y || 0), v = o.reference.height / 2, y = typeof i == "function" ? i(Mu(e, r, M)) : i, b = _ > y, x = {
				top: `${h}px calc(100% + ${y}px)`,
				bottom: `${h}px ${-y}px`,
				left: `calc(100% + ${y}px) ${g}px`,
				right: `${-y}px ${g}px`
			}[c], S = `${h}px ${o.reference.y + v - s}px`;
			return t.floating.style.setProperty("--transform-origin", re && l === "y" && b ? S : x), {};
		}
	}, Ou, b), J(() => {
		!h && m && m.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [h, m]);
	let oe = V.useMemo(() => ({
		elementResize: !d && typeof ResizeObserver < "u",
		layoutShift: !d && typeof IntersectionObserver < "u"
	}), [d]), { refs: se, elements: ce, x: le, y: ue, middlewareData: de, update: fe, placement: pe, context: me, isPositioned: he, floatingStyles: ge } = Ml({
		rootContext: m,
		open: p ? h : void 0,
		placement: P,
		middleware: q,
		strategy: n,
		whileElementsMounted: p ? void 0 : (...e) => Cc(...e, oe),
		nodeId: v,
		externalTree: S
	}), { sideX: _e, sideY: ve } = de.adaptiveOrigin || ku, ye = he ? n : "fixed", be = V.useMemo(() => {
		let e = b ? {
			position: ye,
			[_e]: le,
			[ve]: ue
		} : {
			position: ye,
			...ge
		};
		return he || (e.opacity = 0), e;
	}, [
		b,
		ye,
		_e,
		le,
		ve,
		ue,
		ge,
		he
	]), xe = V.useRef(null);
	J(() => {
		if (!h) return;
		let e = A.current, t = typeof e == "function" ? e() : e, n = (Pu(t) ? t.current : t) || null;
		n !== xe.current && (se.setPositionReference(n), xe.current = n);
	}, [
		h,
		se,
		k,
		A
	]), V.useEffect(() => {
		if (!h) return;
		let e = A.current;
		typeof e != "function" && Pu(e) && e.current !== xe.current && (se.setPositionReference(e.current), xe.current = e.current);
	}, [
		h,
		se,
		k,
		A
	]), V.useEffect(() => {
		if (p && h && ce.reference && ce.floating) return Cc(ce.reference, ce.floating, fe, oe);
	}, [
		p,
		h,
		ce,
		fe,
		oe
	]);
	let Se = Ua(pe), Ce = ju(r, Se, M), we = Wa(pe) || "center", Te = !!de.hide?.referenceHidden;
	J(() => {
		x && h && he && w(Se);
	}, [
		x,
		h,
		he,
		Se
	]);
	let Ee = V.useMemo(() => ({
		position: "absolute",
		top: de.arrow?.y,
		left: de.arrow?.x
	}), [de.arrow]), De = de.arrow?.centerOffset !== 0;
	return V.useMemo(() => ({
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
function Pu(e) {
	return e != null && "current" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/composite/list/CompositeList.mjs
function Fu(e) {
	let { children: t, elementsRef: n, labelsRef: r, onMapChange: i } = e, a = K(i), o = V.useRef(0), s = W(Lu).current, c = W(Iu).current, [l, u] = V.useState(0), d = V.useRef(l), f = K((e, t) => {
		c.set(e, t ?? null), d.current += 1, u(d.current);
	}), p = K((e) => {
		c.delete(e), d.current += 1, u(d.current);
	}), m = V.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return Array.from(c.keys()).filter((e) => e.isConnected).sort(Ru).forEach((t, n) => {
			let r = c.get(t) ?? {};
			e.set(t, {
				...r,
				index: n
			});
		}), e;
	}, [c, l]);
	J(() => {
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
	}, [m]), J(() => {
		d.current === l && (n.current.length !== m.size && (n.current.length = m.size), r && r.current.length !== m.size && (r.current.length = m.size), o.current = m.size), a(m);
	}, [
		a,
		m,
		n,
		r,
		l
	]), J(() => () => {
		n.current = [];
	}, [n]), J(() => () => {
		r && (r.current = []);
	}, [r]);
	let h = K((e) => (s.add(e), () => {
		s.delete(e);
	}));
	J(() => {
		s.forEach((e) => e(m));
	}, [s, m]);
	let g = V.useMemo(() => ({
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
	return /*#__PURE__*/ (0, Z.jsx)(Ui.Provider, {
		value: g,
		children: t
	});
}
function Iu() {
	return /* @__PURE__ */ new Map();
}
function Lu() {
	return /* @__PURE__ */ new Set();
}
function Ru(e, t) {
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/InternalBackdrop.mjs
var zu = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { cutout: n, ...r } = e, i;
	if (n) {
		let e = n.getBoundingClientRect();
		i = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`;
	}
	return /*#__PURE__*/ (0, Z.jsx)("div", {
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
function Bu(e, t, { styles: n, transitionStatus: r, props: i, refs: a, hidden: o, inert: s = !1 }) {
	let c = { ...n };
	return s && (c.pointerEvents = "none"), He("div", e, {
		state: t,
		ref: a,
		props: [
			{
				role: "presentation",
				hidden: o,
				style: c
			},
			gu(r),
			i
		],
		stateAttributesMapping: Ci
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useScrollLock.mjs
var Vu = {}, Hu = {}, Uu = "";
function Wu(e) {
	if (typeof document > "u") return !1;
	let t = Ln(e);
	return y(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Gu(e) {
	if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u") return !1;
	let t = Ln(e), n = t.documentElement, r = t.body, i = T(n) ? n : r, a = i.style.overflowY, o = n.style.scrollbarGutter;
	n.style.scrollbarGutter = "stable", i.style.overflowY = "scroll";
	let s = i.offsetWidth;
	i.style.overflowY = "hidden";
	let c = i.offsetWidth;
	return i.style.overflowY = a, n.style.scrollbarGutter = o, s === c;
}
function Ku(e) {
	let t = Ln(e), n = t.documentElement, r = t.body, i = T(n) ? n : r, a = {
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
function qu(e) {
	let t = Ln(e), n = t.documentElement, r = t.body, i = y(n), a = 0, o = 0, s = !1, c = Fr.create();
	if (Li && (i.visualViewport?.scale ?? 1) !== 1) return () => {};
	function l() {
		let t = i.getComputedStyle(n), c = i.getComputedStyle(r), l = (t.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		a = n.scrollTop, o = n.scrollLeft, Vu = {
			scrollbarGutter: n.style.scrollbarGutter,
			overflowY: n.style.overflowY,
			overflowX: n.style.overflowX
		}, Uu = n.style.scrollBehavior, Hu = {
			position: r.style.position,
			height: r.style.height,
			width: r.style.width,
			boxSizing: r.style.boxSizing,
			overflowY: r.style.overflowY,
			overflowX: r.style.overflowX,
			scrollBehavior: r.style.scrollBehavior
		};
		let u = n.scrollHeight > n.clientHeight, d = n.scrollWidth > n.clientWidth, f = t.overflowY === "scroll" || c.overflowY === "scroll", p = t.overflowX === "scroll" || c.overflowX === "scroll", m = Math.max(0, i.innerWidth - r.clientWidth), h = Math.max(0, i.innerHeight - r.clientHeight), g = parseFloat(c.marginTop) + parseFloat(c.marginBottom), _ = parseFloat(c.marginLeft) + parseFloat(c.marginRight), v = T(n) ? n : r;
		if (s = Gu(e), s) {
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
		Object.assign(n.style, Vu), Object.assign(r.style, Hu), s || (n.scrollTop = a, n.scrollLeft = o, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Uu);
	}
	function d() {
		u(), c.request(l);
	}
	l();
	let f = ka(i, "resize", d);
	return () => {
		c.cancel(), u(), typeof i.removeEventListener == "function" && f();
	};
}
var Ju = new class {
	lockCount = 0;
	restore = null;
	timeoutLock = $i.create();
	timeoutUnlock = $i.create();
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
		let t = Ln(e).documentElement, n = y(t).getComputedStyle(t).overflowY;
		if (n === "hidden" || n === "clip") {
			this.restore = Ie;
			return;
		}
		let r = Mi || !Wu(e);
		this.restore = r ? Ku(e) : qu(e);
	}
}();
function Yu(e = !0, t = null) {
	J(() => {
		if (e) return Ju.acquire(t);
	}, [e, t]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useAnchoredPopupScrollLock.mjs
var Xu = 20;
function Zu(e, t, n, r) {
	let [i, a] = V.useState(!1);
	J(() => {
		if (!e || !t || n == null) {
			a(!1);
			return;
		}
		let r = Ln(n).documentElement.clientWidth, i = n.offsetWidth;
		a(r > 0 && i > 0 && i >= r - Xu);
	}, [
		e,
		t,
		n
	]), Yu(e && (!t || i), r);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/positioner/MenuPositioner.mjs
var Qu = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o, align: s, sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d = 5, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m = !1, collisionAvoidance: h = as, style: g, ..._ } = e, { store: v } = pi(), y = bu(), b = Ti(!0), x = v.useState("parent"), S = v.useState("floatingRootContext"), C = v.useState("floatingTreeRoot"), w = v.useState("mounted"), T = v.useState("open"), E = v.useState("modal"), D = v.useState("openMethod"), O = v.useState("activeTriggerElement"), ee = v.useState("transitionStatus"), k = v.useState("positionerElement"), A = v.useState("instantType"), j = v.useState("hasViewport"), M = v.useState("lastOpenChangeReason"), N = v.useState("floatingNodeId"), P = v.useState("floatingParentNodeId"), F = S.useState("domReferenceElement"), I = V.useRef(null), L = Ur(k, !1, !1), R = n, z = c, B = l, H = s, U = h;
	x.type === "context-menu" && (R = n ?? x.context?.anchor, H ??= "start", !o && H !== "center" && (B = e.alignOffset ?? 2, z = e.sideOffset ?? -5));
	let W = o, te = H;
	x.type === "menu" ? (W ??= "inline-end", te ??= "start", U = e.collisionAvoidance ?? os) : x.type === "menubar" && (W ??= x.context.orientation === "vertical" ? "inline-end" : "bottom", te ??= "start");
	let G = x.type === "context-menu", K = Nu({
		anchor: R,
		floatingRootContext: S,
		positionMethod: b ? "fixed" : r,
		mounted: w,
		side: W,
		sideOffset: z,
		align: te,
		alignOffset: B,
		arrowPadding: G ? 0 : f,
		collisionBoundary: u,
		collisionPadding: d,
		sticky: p,
		nodeId: N,
		keepMounted: y,
		disableAnchorTracking: m,
		collisionAvoidance: U,
		shiftCrossAxis: G && !("side" in U && U.side === "flip"),
		externalTree: C,
		adaptiveOrigin: j ? Au : void 0
	});
	V.useEffect(() => {
		function e(e) {
			e.open && (e.parentNodeId === N && v.set("hoverEnabled", !1), e.nodeId !== N && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, Dr(wr)));
		}
		return C.events.on("menuopenchange", e), () => {
			C.events.off("menuopenchange", e);
		};
	}, [
		v,
		C.events,
		N
	]), V.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, Dr(t));
		}
		return C.events.on("menuopenchange", e), () => {
			C.events.off("menuopenchange", e);
		};
	}, [C.events, v]);
	let q = ea();
	V.useEffect(() => {
		T || q.clear();
	}, [T, q]), V.useEffect(() => {
		function e(e) {
			if (!(!T || e.nodeId !== v.select("floatingParentNodeId"))) if (e.target && O && O !== e.target) {
				let e = v.select("closeDelay");
				e > 0 ? q.isStarted() || q.start(e, () => {
					v.setOpen(!1, Dr(wr));
				}) : v.setOpen(!1, Dr(wr));
			} else q.clear();
		}
		return C.events.on("itemhover", e), () => {
			C.events.off("itemhover", e);
		};
	}, [
		C.events,
		T,
		O,
		v,
		q
	]), V.useEffect(() => {
		let e = {
			open: T,
			nodeId: N,
			parentNodeId: P,
			reason: v.select("lastOpenChangeReason")
		};
		C.events.emit("menuopenchange", e);
	}, [
		C.events,
		T,
		v,
		N,
		P
	]), J(() => {
		let e = F, t = I.current;
		if (e && (I.current = e), t && e && e !== t) {
			v.set("instantType", void 0);
			let e = new AbortController();
			return L(() => {
				v.set("instantType", "trigger-change");
			}, e.signal), () => {
				e.abort();
			};
		}
	}, [
		F,
		L,
		v
	]);
	let ne = {
		open: T,
		side: K.side,
		align: K.align,
		anchorHidden: K.anchorHidden,
		nested: x.type === "menu",
		instant: A
	}, re = x.type === "menubar" && x.context.modal;
	Zu(T && (re || E && M !== "trigger-hover"), D === "touch", k, O);
	let ie = Bu(e, ne, {
		styles: K.positionerStyles,
		transitionStatus: ee,
		props: _,
		refs: [t, v.useStateSetter("positionerElement")],
		hidden: !w,
		inert: !T
	}), ae = w && x.type !== "menu" && (x.type !== "menubar" && E && M !== "trigger-hover" || x.type === "menubar" && x.context.modal), oe = null;
	return x.type === "menubar" ? oe = x.context.contentElement : x.type === void 0 && (oe = O), /*#__PURE__*/ (0, Z.jsxs)(ui.Provider, {
		value: K,
		children: [ae && /*#__PURE__*/ (0, Z.jsx)(zu, {
			ref: x.type === "context-menu" || x.type === "nested-context-menu" ? x.context.internalBackdropRef : null,
			inert: Su(!T),
			cutout: oe
		}), /*#__PURE__*/ (0, Z.jsx)(bs, {
			id: N,
			children: /*#__PURE__*/ (0, Z.jsx)(Fu, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				children: ie
			})
		})]
	});
}), $u = /*#__PURE__*/ V.createContext(null);
function ed(e) {
	let t = V.useContext($u);
	if (t === null && !e) throw Error(be(5));
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useEnhancedClickHandler.mjs
function td(e) {
	let t = V.useRef(""), n = V.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: V.useCallback((n) => {
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
function nd(e, t) {
	let { onClick: n, onPointerDown: r } = td(K((n, r) => {
		(typeof e == "function" ? e() : e) || t(r || (Mi ? "touch" : ""));
	}));
	return V.useMemo(() => ({
		onClick: n,
		onPointerDown: r
	}), [n, r]);
}
function rd(e) {
	let [t, n] = V.useState(null), r = nd(e, n);
	return Or(e, (t) => {
		t && !e && n(null);
	}), V.useMemo(() => ({
		openMethod: t,
		triggerProps: r
	}), [t, r]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/store/MenuStore.mjs
var id = {
	...Al,
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
}, ad = class e extends ll {
	constructor(e) {
		super({
			...od(),
			...e
		}, {
			positionerRef: /*#__PURE__*/ V.createRef(),
			popupRef: /*#__PURE__*/ V.createRef(),
			typingRef: { current: !1 },
			itemDomElements: { current: [] },
			itemLabels: { current: [] },
			allowMouseUpTriggerRef: { current: !1 },
			triggerFocusTargetRef: /*#__PURE__*/ V.createRef(),
			beforeContentFocusGuardRef: /*#__PURE__*/ V.createRef(),
			onOpenChangeComplete: void 0,
			triggerElements: new Sl()
		}, id), this.unsubscribeParentListener = this.observe("parent", (e) => {
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
		let r = W(() => new e(n)).current;
		return t ?? r;
	}
	unsubscribeParentListener = null;
};
function od() {
	return {
		...wl(),
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
		floatingTreeRoot: new ms(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: Re,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		hasViewport: !1
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/submenu-root/MenuSubmenuRootContext.mjs
var sd = /*#__PURE__*/ V.createContext(void 0);
function cd() {
	return V.useContext(sd);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/root/MenuRoot.mjs
var ld = Qc(function(e) {
	let { children: t, open: n, onOpenChange: r, onOpenChangeComplete: i, defaultOpen: a = !1, disabled: o = !1, modal: s, loopFocus: c = !0, orientation: l = "vertical", actionsRef: u, closeParentOnEsc: d = !1, handle: f, triggerId: p, defaultTriggerId: m = null, highlightItemOnHover: h = !0 } = e, g = Ti(!0), _ = pi(!0), v = ed(!0), y = cd(), b = V.useMemo(() => y && _ ? {
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
	]), x = ad.useStore(f?.store, {
		open: a,
		openProp: n,
		activeTriggerId: m,
		triggerIdProp: p,
		parent: b
	});
	_l(x, n, a, m), x.useControlledProp("openProp", n), x.useControlledProp("triggerIdProp", p), x.useContextCallback("onOpenChangeComplete", i);
	let S = Yn(), C = Yn(), w = x.useState("floatingTreeRoot"), T = ys(w), E = _s(), D = x.useState("open"), O = x.useState("activeTriggerElement"), ee = x.useState("positionerElement"), k = x.useState("hoverEnabled"), A = x.useState("disabled"), j = x.useState("lastOpenChangeReason"), M = x.useState("parent"), N = x.useState("activeIndex"), P = x.useState("payload"), F = x.useState("floatingParentNodeId"), I = V.useRef(null), L = V.useRef(M.type !== "context-menu"), R = ea(), z = V.useRef(!0), B = ea(), H = F != null, { openMethod: U, triggerProps: W } = rd(D);
	x.useSyncedValues({
		disabled: o,
		highlightItemOnHover: h,
		modal: M.type === void 0 ? s : void 0,
		openMethod: U,
		rootId: S
	}), yl(x);
	let { forceUnmount: te } = bl(D, x, () => {
		x.update({
			allowMouseEnter: !1,
			stickIfOpen: !0
		});
	});
	J(() => {
		g && !_ ? x.update({
			parent: {
				type: "context-menu",
				context: g
			},
			floatingNodeId: T,
			floatingParentNodeId: E
		}) : _ && x.update({
			floatingNodeId: T,
			floatingParentNodeId: E
		});
	}, [
		g,
		_,
		T,
		E,
		x
	]), V.useEffect(() => {
		if (D || (I.current = null), M.type === "context-menu") {
			if (!D) {
				R.clear(), L.current = !1;
				return;
			}
			R.start(500, () => {
				L.current = !0;
			});
		}
	}, [
		R,
		D,
		M.type
	]), J(() => {
		!D && !k && x.set("hoverEnabled", !0);
	}, [
		D,
		k,
		x
	]);
	let G = K((e, t) => {
		let n = t.reason;
		if (D === e && t.trigger === O && j === n) return;
		let i = gl(t);
		if (!e && t.trigger == null && (t.trigger = O ?? void 0), r?.(e, t), t.isCanceled) return;
		x.state.floatingRootContext.dispatchOpenChange(e, t);
		let a = t.event;
		if (e === !1 && a?.type === "click" && a.pointerType === "touch" && !z.current) return;
		e && n === "trigger-focus" ? (z.current = !1, B.start(300, () => {
			z.current = !0;
		})) : (z.current = !0, B.clear());
		let o = (n === "trigger-press" || n === "item-press") && a.detail === 0 && a?.isTrusted, s = !e && (n === "escape-key" || n == null), c = {
			open: e,
			openChangeReason: n
		};
		I.current = t.event ?? null, hl(c, e, t.trigger, i()), x.update(c), M.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? x.set("instantType", "group") : o || s ? x.set("instantType", o ? "click" : "dismiss") : x.set("instantType", void 0);
	}), q = fl({
		popupStore: x,
		floatingId: C,
		nested: E != null,
		onOpenChange: G
	}), ne = q.context.events;
	V.useEffect(() => {
		let e = ({ open: e, eventDetails: t }) => G(e, t);
		return ne.on("setOpen", e), () => {
			ne?.off("setOpen", e);
		};
	}, [ne, G]);
	let re = V.useCallback(() => {
		x.setOpen(!1, Dr(Tr));
	}, [x]);
	V.useImperativeHandle(u, () => ({
		unmount: te,
		close: re
	}), [te, re]);
	let ie;
	M.type === "context-menu" && (ie = M.context), V.useImperativeHandle(ie?.positionerRef, () => ee, [ee]), V.useImperativeHandle(ie?.actionsRef, () => ({ setOpen: G }), [G]);
	let oe = Ps(q, {
		enabled: !A,
		bubbles: { escapeKey: d && M.type === "menu" },
		outsidePress() {
			return M.type !== "context-menu" || I.current?.type === "contextmenu" || L.current;
		},
		externalTree: H ? w : void 0
	}), se = wu(), ce = V.useCallback((e) => {
		x.select("activeIndex") !== e && x.set("activeIndex", e);
	}, [x]), le = Yl(q, {
		enabled: !A,
		listRef: x.context.itemDomElements,
		activeIndex: N,
		nested: M.type !== void 0,
		loopFocus: c,
		orientation: l,
		parentOrientation: M.type === "menubar" ? M.context.orientation : void 0,
		rtl: se === "rtl",
		disabledIndices: Le,
		onNavigate: ce,
		openOnArrowKeyDown: M.type !== "context-menu",
		externalTree: H ? w : void 0,
		focusItemOnHover: h
	}), ue = V.useCallback((e) => {
		x.context.typingRef.current = e;
	}, [x]), de = Xl(q, {
		enabled: !A,
		listRef: x.context.itemLabels,
		elementsRef: x.context.itemDomElements,
		activeIndex: N,
		resetMs: 500,
		onMatch: (e) => {
			D && e !== N && x.set("activeIndex", e);
		},
		onTyping: ue
	});
	xl(x, {
		floatingRootContext: q,
		activeTriggerProps: V.useMemo(() => {
			let e = ae(de.reference, le.reference, oe.reference, { onMouseMove() {
				x.set("allowMouseEnter", !0);
			} }, W);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = D, e;
		}, [
			x,
			de.reference,
			le.reference,
			oe.reference,
			W,
			D
		]),
		inactiveTriggerProps: V.useMemo(() => {
			let e = ae(le.trigger, oe.trigger, W);
			return e["aria-haspopup"] = "menu", e["aria-expanded"] = !1, e;
		}, [
			le.trigger,
			oe.trigger,
			W
		]),
		popupProps: V.useMemo(() => ae(pl, {
			id: C,
			role: "menu",
			"aria-labelledby": O?.id,
			onMouseMove() {
				x.set("allowMouseEnter", !0), M.type === "menu" && x.set("hoverEnabled", !1);
			},
			onClick() {
				x.select("hoverEnabled") && x.set("hoverEnabled", !1);
			},
			onKeyDown(e) {
				let t = x.select("keyboardEventRelay");
				t && !e.isPropagationStopped() && t(e);
			}
		}, de.floating, le.floating, oe.floating), [
			O,
			C,
			M.type,
			x,
			de.floating,
			le.floating,
			oe.floating
		]),
		itemProps: le.item ?? Re
	});
	let fe = V.useMemo(() => ({
		store: x,
		parent: b
	}), [x, b]), pe = /*#__PURE__*/ (0, Z.jsx)(fi.Provider, {
		value: fe,
		children: typeof t == "function" ? t({ payload: P }) : t
	});
	return M.type === void 0 || M.type === "context-menu" ? /*#__PURE__*/ (0, Z.jsx)(xs, {
		externalTree: w,
		children: pe
	}) : pe;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/getPseudoElementBounds.mjs
function ud(e) {
	let t = e.getBoundingClientRect(), n = y(e);
	if (zi) return t;
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
function dd(e = {}) {
	let { highlightItemOnHover: t, highlightedIndex: n, onHighlightedIndexChange: r } = Se(), { ref: i, index: a } = Ki(e), o = n === a, s = V.useRef(null), c = De(i, s);
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
function fd(e) {
	let { render: t, className: n, style: r, state: i = Re, props: a = Le, refs: o = Le, metadata: s, stateAttributesMapping: c, tag: l = "div", ...u } = e, { compositeProps: d, compositeRef: f } = dd({ metadata: s });
	return He(l, e, {
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
function pd(e) {
	if (C(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid") ?? void 0;
	if (!P(e)) return pd(L(e));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/popups/useTriggerFocusGuards.mjs
function md(e, t) {
	let n = V.useRef(null);
	function r(t) {
		Hr.flushSync(() => {
			e.setOpen(!1, Dr(br, t.nativeEvent, t.currentTarget));
		}), Lo(n.current)?.focus();
	}
	function i(n) {
		let r = e.select("positionerElement");
		if (r && Ro(n, r)) e.context.beforeContentFocusGuardRef.current?.focus();
		else {
			Hr.flushSync(() => {
				e.setOpen(!1, Dr(br, n.nativeEvent, n.currentTarget));
			});
			let i = Io(e.context.triggerFocusTargetRef.current || t.current);
			for (; i !== null && ma(r, i);) {
				let e = i;
				if (i = No(i), i === e) break;
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
function hd(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = V.useRef(!1);
	return V.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, Ln(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : Re, [
		t,
		n,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/menu/trigger/MenuTrigger.mjs
var gd = 2, _d = $c(function(e, t) {
	let { render: n, className: r, style: i, disabled: a = !1, nativeButton: o = !0, id: s, openOnHover: c, delay: l = 100, closeDelay: u = 0, handle: d, payload: f, ...p } = e, m = pi(!0), h = d?.store ?? m?.store;
	if (!h) throw Error(be(85));
	let g = Xn(s), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = h.useState("triggerPopupId", g), x = V.useRef(null), S = yd(), C = Se(!0), w = vs(), T = V.useMemo(() => w ?? new ms(), [w]), { registerTrigger: E, isMountedByThisTrigger: D } = vl(g, x, h, {
		payload: f,
		closeDelay: u,
		parent: S,
		floatingTreeRoot: T,
		floatingNodeId: ys(T),
		floatingParentNodeId: _s(),
		keyboardEventRelay: C?.relayKeyboardEvent
	}), O = S.type === "menubar", ee = h.useState("disabled"), k = a || ee || O && S.context.disabled, { getButtonProps: A, buttonRef: j } = we({
		disabled: k,
		native: o
	});
	V.useEffect(() => {
		!y && S.type === void 0 && (h.context.allowMouseUpTriggerRef.current = !1);
	}, [
		h,
		y,
		S.type
	]);
	let M = V.useRef(null), N = ea(), P = K((e) => {
		if (!M.current) return;
		N.clear(), h.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		if (ma(M.current, t) || ma(h.select("positionerElement"), t) || t === M.current || t != null && pd(t) === h.select("rootId")) return;
		let n = ud(M.current);
		e.clientX >= n.left - gd && e.clientX <= n.right + gd && e.clientY >= n.top - gd && e.clientY <= n.bottom + gd || T.events.emit("close", {
			domEvent: e,
			reason: Cr
		});
	});
	V.useEffect(() => {
		y && h.select("lastOpenChangeReason") === "trigger-hover" && Ln(M.current).addEventListener("mouseup", P, { once: !0 });
	}, [
		y,
		P,
		h
	]);
	let F = O && S.context.hasSubmenuOpen, I = Hl(v, {
		enabled: (c ?? F) && !k && S.type !== "context-menu" && (!O || F && !D),
		handleClose: iu({ blockPointerEvents: !O }),
		mouseOnly: !0,
		move: !1,
		restMs: S.type === void 0 ? l : void 0,
		delay: { close: u },
		triggerElementRef: x,
		externalTree: T,
		isActiveTrigger: _,
		isClosing: () => h.select("transitionStatus") === "ending"
	}), L = vd(y, h.select("lastOpenChangeReason")), R = js(v, {
		enabled: !k && S.type !== "context-menu",
		event: y && O ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: S.type === void 0 && L
	}), z = Pl(v, { enabled: !k && F }), B = hd({
		open: y,
		enabled: O,
		mouseDownAction: "open"
	}), H = V.useMemo(() => ae(z.reference, R.reference), [z.reference, R.reference]), U = h.useState("triggerProps", D), { preFocusGuardRef: W, handlePreFocusGuardFocus: te, handleFocusTargetFocus: G } = md(h, x), q = {
		disabled: k,
		open: y
	}, ne = [
		M,
		t,
		j,
		E,
		x
	], J = [
		H,
		I ?? Re,
		U,
		{
			"aria-haspopup": "menu",
			"aria-controls": b,
			id: g,
			onMouseDown: (e) => {
				h.select("open") || (N.start(200, () => {
					h.context.allowMouseUpTriggerRef.current = !0;
				}), Ln(e.currentTarget).addEventListener("mouseup", P, { once: !0 }));
			}
		},
		O ? { role: "menuitem" } : {},
		B,
		p,
		A
	], re = He("button", e, {
		enabled: !O,
		stateAttributesMapping: Si,
		state: q,
		ref: ne,
		props: J
	});
	return O ? /*#__PURE__*/ (0, Z.jsx)(fd, {
		tag: "button",
		render: n,
		className: r,
		style: i,
		state: q,
		refs: ne,
		props: J,
		stateAttributesMapping: Si
	}) : y ? /*#__PURE__*/ (0, Z.jsxs)(V.Fragment, { children: [
		/*#__PURE__*/ (0, Z.jsx)(Na, {
			ref: W,
			onFocus: te
		}, `${g}-pre-focus-guard`),
		/*#__PURE__*/ (0, Z.jsx)(V.Fragment, { children: re }, g),
		/*#__PURE__*/ (0, Z.jsx)(Na, {
			ref: h.context.triggerFocusTargetRef,
			onFocus: G
		}, `${g}-post-focus-guard`)
	] }) : /*#__PURE__*/ (0, Z.jsx)(V.Fragment, { children: re }, g);
});
function vd(e, t) {
	let n = ea(), [r, i] = V.useState(!1);
	return J(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function yd() {
	let e = Ti(!0), t = pi(!0), n = ed(!0);
	return V.useMemo(() => n ? {
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
function bd(e) {
	let [t, n] = V.useState({
		current: e,
		previous: null
	});
	return e !== t.current && n({
		current: e,
		previous: t.current
	}), t.previous;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/isElementDisabled.mjs
function xd(e) {
	return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
//#endregion
//#region src/platform/overlay-container.tsx
var Sd = (0, V.createContext)(null);
function Cd(e) {
	return e instanceof ShadowRoot ? e.host.isConnected : e.isConnected;
}
function wd(e) {
	if (!Cd(e.container)) throw Error("SSUI_V2_OVERLAY_DISCONNECTED: the overlay container is not connected.");
	if (e.container.getRootNode() !== e.expectedRoot) throw Error("SSUI_V2_OVERLAY_WRONG_ROOT: the overlay container escaped its component root.");
}
function Td(e) {
	(0, V.useLayoutEffect)(() => {
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
function Ed(e) {
	(0, V.useLayoutEffect)(() => {
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
function Dd({ children: e, container: t, expectedRoot: n }) {
	let r = (0, V.useMemo)(() => ({
		container: t,
		expectedRoot: n
	}), [t, n]);
	return wd(r), Td(n), Ed(t), /* @__PURE__ */ (0, Z.jsx)(Sd.Provider, {
		value: r,
		children: e
	});
}
function Od() {
	let e = (0, V.useContext)(Sd);
	if (!e) throw Error("SSUI_V2_OVERLAY_PROVIDER_MISSING: generated shadcn overlays require an OverlayContainerProvider.");
	return wd(e), e.container;
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function kd({ ...e }) {
	return /* @__PURE__ */ (0, Z.jsx)(ld, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function Ad({ ...e }) {
	return /* @__PURE__ */ (0, Z.jsx)(_d, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function jd({ align: e = "start", alignOffset: t = 0, side: n = "bottom", sideOffset: r = 4, className: i, ...a }) {
	let o = Od();
	return /* @__PURE__ */ (0, Z.jsx)(xu, {
		container: o,
		children: /* @__PURE__ */ (0, Z.jsx)(Qu, {
			className: "isolate z-50 outline-none",
			align: e,
			alignOffset: t,
			side: n,
			sideOffset: r,
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Z.jsx)(vu, {
				"data-slot": "dropdown-menu-content",
				className: On("cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", i),
				...a
			})
		})
	});
}
function Md({ ...e }) {
	return /* @__PURE__ */ (0, Z.jsx)(Yi, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function Nd({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, Z.jsx)(Xi, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: On("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", e),
		...n
	});
}
function Pd({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, Z.jsx)(Zi, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: On("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", e),
		...r
	});
}
//#endregion
//#region src/components/streamlit/dropdown-menu.tsx
function Fd({ envelope: e, setTriggerValue: t }) {
	return /* @__PURE__ */ (0, Z.jsx)("div", {
		className: "inline-flex p-px",
		"data-ssui-component": "dropdown-menu",
		"data-testid": "ssui-v2-dropdown-menu",
		children: /* @__PURE__ */ (0, Z.jsxs)(kd, {
			disabled: e.props.disabled,
			modal: !1,
			children: [/* @__PURE__ */ (0, Z.jsxs)(Ad, {
				render: /* @__PURE__ */ (0, Z.jsx)(jn, { variant: "outline" }),
				children: [e.props.label, /* @__PURE__ */ (0, Z.jsx)(ii, {
					"aria-hidden": "true",
					"data-icon": "inline-end"
				})]
			}), /* @__PURE__ */ (0, Z.jsx)(jd, {
				"aria-label": e.props.menuLabel ?? e.props.label,
				"data-testid": "ssui-v2-dropdown-menu-content",
				children: /* @__PURE__ */ (0, Z.jsxs)(Md, { children: [e.props.menuLabel ? /* @__PURE__ */ (0, Z.jsx)(Nd, { children: e.props.menuLabel }) : null, e.props.items.length > 0 ? e.props.items.map((e) => /* @__PURE__ */ (0, Z.jsx)(Pd, {
					disabled: e.disabled,
					onClick: () => {
						t("action", e.value);
					},
					variant: e.variant,
					children: e.label
				}, e.value)) : /* @__PURE__ */ (0, Z.jsx)(Pd, {
					disabled: !0,
					children: "No actions"
				})] })
			})]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRootContext.mjs
var Id = /*#__PURE__*/ V.createContext(null), Ld = /*#__PURE__*/ V.createContext(null);
function Rd() {
	let e = V.useContext(Id);
	if (e === null) throw Error(be(60));
	return e;
}
function zd() {
	let e = V.useContext(Ld);
	if (e === null) throw Error(be(61));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function Bd(e = {}) {
	let { id: t, implicit: n = !1, controlRef: r } = e, { controlId: i, registerControlId: a } = or(), o = Xn(t), s = n ? i : void 0, c = W(() => Symbol("labelable-control")), l = V.useRef(!1), u = V.useRef(t != null), d = K(() => {
		!l.current || a === Ie || (l.current = !1, a(c.current, void 0));
	});
	return J(() => {
		if (a === Ie) return;
		let e;
		if (n) {
			let n = r?.current;
			e = S(n) && n.closest("label") != null ? t ?? null : s ?? o;
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
	]), V.useEffect(() => d, [d]), i ?? o;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/itemEquality.mjs
var Vd = (e, t) => Object.is(e, t);
function Hd(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function Ud(e, t, n) {
	return !e || e.length === 0 ? !1 : e.some((e) => e !== void 0 && Hd(t, e, n));
}
function Wd(e, t, n) {
	return !e || e.length === 0 ? -1 : e.findIndex((e) => e !== void 0 && Hd(e, t, n));
}
function Gd(e, t, n) {
	return e.filter((e) => !Hd(t, e, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/serializeValue.mjs
function Kd(e) {
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
function qd(e) {
	return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function Jd(e) {
	if (!Array.isArray(e)) return e != null && "null" in e;
	let t = e;
	if (qd(t)) {
		for (let e of t) for (let t of e.items) if (t && t.value == null && t.label != null) return !0;
		return !1;
	}
	for (let e of t) if (e && e.value == null && e.label != null) return !0;
	return !1;
}
function Yd(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return Kd(e);
}
function Xd(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Kd(e.value) : Kd(e);
}
function Zd(e, t, n) {
	function r() {
		return Yd(e, n);
	}
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return t[e] ?? r();
	if (Array.isArray(t)) {
		let n = t, i = qd(n) ? n.flatMap((e) => e.items) : n;
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
function Qd(e, t, n) {
	return e.reduce((e, r, i) => (i > 0 && e.push(", "), e.push(/*#__PURE__*/ (0, Z.jsx)(V.Fragment, { children: Zd(r, t, n) }, i)), e), []);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/store.mjs
var $ = {
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
		return t == null ? !1 : n && Array.isArray(t) ? t.length > 0 : Xd(t, r) !== "";
	}),
	hasNullItemLabel: Q((e, t) => t ? Jd(e.items) : !1),
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
		return e.multiple ? Array.isArray(r) && r.some((e) => Hd(t, e, n)) : Hd(t, r, n);
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
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/areArraysEqual.mjs
function $d(e, t, n = (e, t) => e === t) {
	return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/clamp.mjs
function ef(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
function tf(e, t) {
	return Math.max(0, e - t);
}
function nf(e, t) {
	if (t <= 0) return 0;
	let n = ef(e, 0, t), r = n, i = t - n, a = r <= 1, o = i <= 1;
	return a && o ? r <= i ? 0 : t : a ? 0 : o ? t : n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/root/SelectRoot.mjs
function rf(e) {
	let { id: t, value: n, defaultValue: r = null, onValueChange: i, open: a, defaultOpen: o = !1, onOpenChange: s, name: c, form: l, autoComplete: u, disabled: d = !1, readOnly: f = !1, required: p = !1, modal: m = !0, actionsRef: h, inputRef: g, onOpenChangeComplete: _, items: v, multiple: y = !1, itemToStringLabel: b, itemToStringValue: x, isItemEqualToValue: S = Vd, highlightItemOnHover: C = !0, children: w } = e, { clearErrors: T } = ir(), { setDirty: E, setTouched: D, setFocused: O, validityData: ee, setFilled: k, name: A, disabled: j, validation: M, validationMode: N } = $n(), P = Bd({ id: t }), F = j || d, I = A ?? c, [L, R] = Nn({
		controlled: n,
		default: y ? r ?? Le : r,
		name: "Select",
		state: "value"
	}), [z, B] = Nn({
		controlled: a,
		default: o,
		name: "Select",
		state: "open"
	}), H = V.useRef([]), U = V.useRef([]), te = V.useRef(null), G = V.useRef(null), q = V.useRef(0), ne = V.useRef(null), re = V.useRef([]), ie = V.useRef(!1), oe = V.useRef(null), se = V.useRef(null), ce = V.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1,
		dragY: 0
	}), le = V.useRef(!1), { mounted: ue, setMounted: de, transitionStatus: fe } = Gr(z), { openMethod: pe, triggerProps: me } = rd(z), he = W(() => new cl({
		id: P,
		labelId: void 0,
		modal: m,
		multiple: y,
		itemToStringLabel: b,
		itemToStringValue: x,
		isItemEqualToValue: S,
		value: L,
		open: z,
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
	})).current, ge = il(he, $.activeIndex), _e = il(he, $.selectedIndex), ve = il(he, $.triggerElement), ye = il(he, $.positionerElement), be = bd(pe), xe = pe ?? be ?? null, Se = V.useMemo(() => y ? "" : Xd(L, x), [
		y,
		L,
		x
	]), Ce = V.useMemo(() => y && Array.isArray(L) ? L.map((e) => Xd(e, x)) : Xd(L, x), [
		y,
		L,
		x
	]);
	er(ja(he.state.triggerElement), P, L, K(() => Ce), !F, c);
	let we = V.useRef(L), Te = y ? Array.isArray(L) && L.length > 0 : L != null && Xd(L, x) !== "";
	J(() => {
		L !== we.current && he.set("forceMount", !0);
	}, [he, L]), J(() => {
		k(Te);
	}, [Te, k]), J(function() {
		let e = re.current, t;
		if (y) {
			let n = Array.isArray(L) ? L : [];
			if (n.length === 0) t = null;
			else {
				let r = n[n.length - 1], i = Wd(e, r, S);
				t = i === -1 ? null : i;
			}
		} else {
			let n = Wd(e, L, S);
			t = n === -1 ? null : n;
		}
		t === null && (se.current = null), !z && he.set("selectedIndex", t);
	}, [
		Te,
		y,
		z,
		L,
		re,
		S,
		he,
		se
	]);
	function Ee(e) {
		let t = ee.initialValue;
		return Array.isArray(e) && Array.isArray(t) ? !$d(e, t, (e, t) => Hd(e, t, S)) : e !== t;
	}
	Or(L, () => {
		T(I), E(Ee(L)), M.change(L);
	});
	let Oe = K((e, t) => {
		s?.(e, t), !t.isCanceled && (B(e), !e && (t.reason === "focus-out" || t.reason === "outside-press") && (D(!0), O(!1), N === "onBlur" && M.commit(L)));
	}), ke = K(() => {
		de(!1), he.update({
			activeIndex: null,
			openMethod: null
		}), _?.(!1);
	});
	Wr({
		enabled: !h,
		open: z,
		ref: te,
		onComplete() {
			z || ke();
		}
	}), V.useImperativeHandle(h, () => ({ unmount: ke }), [ke]);
	let Ae = K((e, t) => {
		i?.(e, t), !t.isCanceled && R(e);
	}), je = K(() => {
		let e = he.state.listElement || te.current;
		if (!e) return;
		let t = tf(e.scrollHeight, e.clientHeight), n = nf(e.scrollTop, t), r = n > 0, i = n < t;
		he.state.scrollUpArrowVisible !== r && he.set("scrollUpArrowVisible", r), he.state.scrollDownArrowVisible !== i && he.set("scrollDownArrowVisible", i);
	}), Me = jl({
		open: z,
		onOpenChange: Oe,
		elements: {
			reference: ve,
			floating: ye
		}
	}), Ne = js(Me, {
		enabled: !f && !F,
		event: "mousedown"
	}), Pe = Ps(Me), Fe = Yl(Me, {
		enabled: !f && !F,
		listRef: H,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: Le,
		onNavigate(e) {
			e === null && !z || he.set("activeIndex", e);
		},
		focusItemOnHover: C
	}), Ie = Xl(Me, {
		enabled: !f && !F && (z || !y),
		listRef: U,
		activeIndex: ge,
		selectedIndex: _e,
		disabledIndices: (e) => xd(H.current[e]),
		onMatch(e) {
			z ? he.set("activeIndex", e) : Ae(re.current[e], Dr("none"));
		},
		onTyping(e) {
			ie.current = e;
		}
	}), ze = V.useMemo(() => {
		let e = ae(Ie.reference, Fe.reference, Pe.reference, Ne.reference, me);
		return P && (e.id = P), e;
	}, [
		Ne.reference,
		Ie.reference,
		Fe.reference,
		Pe.reference,
		me,
		P
	]), Be = V.useMemo(() => ae(pl, Ie.floating, Fe.floating, Pe.floating), [
		Ie.floating,
		Fe.floating,
		Pe.floating
	]), Ve = Fe.item ?? Re;
	Uc(() => {
		he.update({
			popupProps: Be,
			triggerProps: ze
		});
	}), J(() => {
		he.update({
			id: P,
			modal: m,
			multiple: y,
			value: L,
			open: z,
			mounted: ue,
			transitionStatus: fe,
			popupProps: Be,
			triggerProps: ze,
			items: v,
			itemToStringLabel: b,
			itemToStringValue: x,
			isItemEqualToValue: S,
			openMethod: xe
		});
	}, [
		he,
		P,
		m,
		y,
		L,
		z,
		ue,
		fe,
		Be,
		ze,
		v,
		b,
		x,
		S,
		xe
	]);
	let He = V.useMemo(() => ({
		store: he,
		name: I,
		required: p,
		disabled: F,
		readOnly: f,
		multiple: y,
		highlightItemOnHover: C,
		setValue: Ae,
		setOpen: Oe,
		listRef: H,
		popupRef: te,
		scrollHandlerRef: G,
		handleScrollArrowVisibility: je,
		scrollArrowsMountedCountRef: q,
		itemProps: Ve,
		valueRef: ne,
		valuesRef: re,
		labelsRef: U,
		typingRef: ie,
		selectionRef: ce,
		firstItemTextRef: oe,
		selectedItemTextRef: se,
		validation: M,
		onOpenChangeComplete: _,
		alignItemWithTriggerActiveRef: le,
		initialValueRef: we
	}), [
		he,
		I,
		p,
		F,
		f,
		y,
		C,
		Ae,
		Oe,
		Ve,
		M,
		_,
		je
	]), Ue = De(g, M.inputRef), We = y && Array.isArray(L) && L.length > 0, Ge = y ? void 0 : I, Ke = V.useMemo(() => !y || !Array.isArray(L) || !I ? null : L.map((e) => {
		let t = Xd(e, x);
		return /*#__PURE__*/ (0, Z.jsx)("input", {
			type: "hidden",
			form: l,
			name: I,
			value: t,
			disabled: F
		}, t);
	}), [
		y,
		L,
		l,
		I,
		x,
		F
	]);
	return /*#__PURE__*/ (0, Z.jsx)(Id.Provider, {
		value: He,
		children: /*#__PURE__*/ (0, Z.jsxs)(Ld.Provider, {
			value: Me,
			children: [
				w,
				/*#__PURE__*/ (0, Z.jsx)("input", {
					...M.getValidationProps(F, {
						onFocus() {
							he.state.triggerElement?.focus({ focusVisible: !0 });
						},
						onChange(e) {
							if (e.nativeEvent.defaultPrevented || F || f) return;
							let t = e.currentTarget.value, n = Dr(mr, e.nativeEvent);
							function r() {
								if (y) return;
								let e = t.toLowerCase(), r = re.current.findIndex((t) => Xd(t, x).toLowerCase() === e || Yd(t, b).toLowerCase() === e);
								r === -1 && (r = re.current.findIndex((t, n) => {
									let r = U.current[n];
									return r != null && r.toLowerCase() === e;
								}));
								let i = r === -1 ? void 0 : re.current[r];
								i != null && Ae(i, n);
							}
							he.set("forceMount", !0), queueMicrotask(r);
						}
					}),
					id: P && Ge == null ? `${P}-hidden-input` : void 0,
					form: l,
					name: Ge,
					autoComplete: u,
					value: Se,
					disabled: F,
					required: p && !We,
					readOnly: f,
					ref: Ue,
					style: I ? In : Fn,
					tabIndex: -1,
					"aria-hidden": !0,
					suppressHydrationWarning: !0
				}),
				Ke
			]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/resolveAriaLabelledBy.mjs
function af(e, t) {
	return e ?? t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/trigger/SelectTrigger.mjs
var of = 2, sf = 400, cf = {
	...Si,
	...Wn,
	popupSide: (e) => e ? { "data-popup-side": e } : null,
	value: () => null
}, lf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, disabled: a = !1, nativeButton: o = !0, style: s, ...c } = e, { setTouched: l, setFocused: u, validationMode: d, state: f, disabled: p } = $n(), { labelId: m } = or(), { store: h, setOpen: g, selectionRef: _, validation: v, readOnly: y, required: b, alignItemWithTriggerActiveRef: x, disabled: S } = Rd(), C = p || S || a, w = il(h, $.open), T = il(h, $.mounted), E = il(h, $.value), D = il(h, $.triggerProps), O = il(h, $.positionerElement), ee = il(h, $.listElement), k = il(h, $.popupSide), A = il(h, $.id), j = il(h, $.labelId), M = il(h, $.hasSelectedValue), N = T && O ? k : null, P = i ?? A, F = af(m, j);
	Bd({ id: P });
	let I = ja(O), L = V.useRef(null), { getButtonProps: R, buttonRef: z } = we({
		disabled: C,
		native: o
	}), B = K((e) => {
		h.set("triggerElement", e);
	}), H = ea(), U = ea(), W = ea();
	V.useEffect(() => {
		if (w) return W.start(sf, () => {
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
		w,
		_,
		U,
		W
	]);
	let te = ae(D, {
		id: P,
		role: "combobox",
		"aria-expanded": w ? "true" : "false",
		"aria-haspopup": "listbox",
		"aria-controls": w ? ee?.id ?? Ca(O)?.id : void 0,
		"aria-labelledby": F,
		"aria-readonly": y || void 0,
		"aria-required": b || void 0,
		tabIndex: C ? -1 : 0,
		onFocus(e) {
			u(!0), w && x.current && g(!1, Dr(mr, e.nativeEvent)), H.start(0, () => {
				h.set("forceMount", !0);
			});
		},
		onBlur(e) {
			ma(O, e.relatedTarget) || (l(!0), u(!1), d === "onBlur" && v.commit(E));
		},
		onMouseDown(e) {
			if (w) return;
			let t = Ln(e.currentTarget);
			function n(e) {
				if (!L.current) return;
				let t = e.target;
				if (ma(L.current, t) || ma(I.current, t)) return;
				let n = ud(L.current);
				e.clientX >= n.left - of && e.clientX <= n.right + of && e.clientY >= n.top - of && e.clientY <= n.bottom + of || g(!1, Dr(Cr, e));
			}
			U.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, c, R), G = v.getValidationProps(C, te);
	G.role = "combobox";
	let q = {
		...f,
		open: w,
		disabled: C,
		value: E,
		readOnly: y,
		popupSide: N,
		placeholder: !M
	};
	return He("button", e, {
		ref: [
			t,
			L,
			z,
			B
		],
		state: q,
		stateAttributesMapping: cf,
		props: G
	});
}), uf = { value: () => null }, df = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, placeholder: a, style: o, ...s } = e, { store: c, valueRef: l } = Rd(), u = il(c, $.value), d = il(c, $.items), f = il(c, $.itemToStringLabel), p = il(c, $.hasSelectedValue), m = !p && a != null && i == null, h = il(c, $.hasNullItemLabel, m), g = {
		value: u,
		placeholder: !p
	}, _ = null;
	return _ = typeof i == "function" ? i(u) : i ?? (!p && a != null && !h ? a : Array.isArray(u) ? Qd(u, d, f) : Zd(u, d, f)), He("span", e, {
		state: g,
		ref: [t, l],
		props: [{ children: _ }, s],
		stateAttributesMapping: uf
	});
}), ff = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o } = Rd();
	return He("span", e, {
		state: { open: il(o, $.open) },
		ref: t,
		props: [{
			"aria-hidden": !0,
			children: "▼"
		}, a],
		stateAttributesMapping: xi
	});
}), pf = /*#__PURE__*/ V.createContext(void 0), mf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { store: n } = Rd(), r = il(n, $.mounted), i = il(n, $.forceMount);
	return r || i ? /*#__PURE__*/ (0, Z.jsx)(pf.Provider, {
		value: !0,
		children: /*#__PURE__*/ (0, Z.jsx)(fs, {
			ref: t,
			...e
		})
	}) : null;
}), hf = /*#__PURE__*/ V.createContext(void 0);
function gf() {
	let e = V.useContext(hf);
	if (!e) throw Error(be(59));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/utils.mjs
function _f(e, t) {
	e && Object.assign(e.style, t);
}
var vf = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, yf = { position: "fixed" }, bf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: a, side: o = "bottom", align: s = "center", sideOffset: c = 0, alignOffset: l = 0, collisionBoundary: u = "clipping-ancestors", collisionPadding: d, arrowPadding: f = 5, sticky: p = !1, disableAnchorTracking: m, alignItemWithTrigger: h = !0, collisionAvoidance: g = as, style: _, ...v } = e, { store: y, listRef: b, labelsRef: x, alignItemWithTriggerActiveRef: S, selectedItemTextRef: C, valuesRef: w, initialValueRef: T, popupRef: E, setValue: D } = Rd(), O = zd(), ee = il(y, $.open), k = il(y, $.mounted), A = il(y, $.modal), j = il(y, $.value), M = il(y, $.openMethod), N = il(y, $.positionerElement), P = il(y, $.triggerElement), F = il(y, $.isItemEqualToValue), I = il(y, $.transitionStatus), L = V.useRef(null), R = V.useRef(null), [z, B] = V.useState(h), H = k && z && M !== "touch";
	!k && z !== h && B(h), J(() => {
		k || ($.scrollUpArrowVisible(y.state) && y.set("scrollUpArrowVisible", !1), $.scrollDownArrowVisible(y.state) && y.set("scrollDownArrowVisible", !1));
	}, [y, k]), V.useImperativeHandle(S, () => H), Zu((H || A) && ee, M === "touch", N, P);
	let U = Nu({
		anchor: n,
		floatingRootContext: O,
		positionMethod: r,
		mounted: k,
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
	}), W = H ? "none" : U.side, te = H ? yf : U.positionerStyles, G = {
		open: ee,
		side: W,
		align: U.align,
		anchorHidden: U.anchorHidden
	};
	J(() => {
		y.set("popupSide", U.side);
	}, [y, U.side]);
	let q = Bu(e, G, {
		styles: te,
		transitionStatus: I,
		props: v,
		refs: [t, K((e) => {
			y.set("positionerElement", e);
		})],
		hidden: !k,
		inert: !ee
	}), ne = V.useRef(0), re = K((e) => {
		if (e.size === 0 && ne.current === 0 || w.current.length === 0) return;
		let t = ne.current;
		if (ne.current = e.size, e.size === t) return;
		let n = Dr(mr);
		if (t !== 0 && !y.state.multiple && j !== null && Wd(w.current, j, F) === -1) {
			let e = T.current, t = e != null && Wd(w.current, e, F) !== -1 ? e : null;
			D(t, n), t === null && (y.set("selectedIndex", null), C.current = null);
		}
		if (t !== 0 && y.state.multiple && Array.isArray(j)) {
			let e = (e) => Wd(w.current, e, F) !== -1, t = j.filter((t) => e(t));
			(t.length !== j.length || t.some((e) => !Ud(j, e, F))) && (D(t, n), t.length === 0 && (y.set("selectedIndex", null), C.current = null));
		}
		if (ee && H) {
			y.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			_f(N, e), _f(E.current, e);
		}
	}), ie = V.useMemo(() => ({
		...U,
		side: W,
		alignItemWithTriggerActive: H,
		setControlledAlignItemWithTrigger: B,
		scrollUpArrowRef: L,
		scrollDownArrowRef: R
	}), [
		U,
		W,
		H,
		B
	]);
	return /*#__PURE__*/ (0, Z.jsx)(Fu, {
		elementsRef: b,
		labelsRef: x,
		onMapChange: re,
		children: /*#__PURE__*/ (0, Z.jsxs)(hf.Provider, {
			value: ie,
			children: [k && A && /*#__PURE__*/ (0, Z.jsx)(zu, {
				inert: Su(!ee),
				cutout: P
			}), q]
		})
	});
}), xf = "base-ui-disable-scrollbar", Sf = {
	className: xf,
	getElement(e) {
		return /*#__PURE__*/ (0, Z.jsx)("style", {
			nonce: e,
			href: xf,
			precedence: "base-ui:low",
			children: `.${xf}{scrollbar-width:none}.${xf}::-webkit-scrollbar{display:none}`
		});
	}
}, Cf = /*#__PURE__*/ V.createContext(void 0), wf = { disableStyleElements: !1 };
function Tf() {
	return V.useContext(Cf) ?? wf;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/popup/SelectPopup.mjs
var Ef = {
	...Ci,
	...Vr
}, Df = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, finalFocus: a, ...o } = e, { store: s, popupRef: c, onOpenChangeComplete: l, setOpen: u, valueRef: d, firstItemTextRef: f, selectedItemTextRef: p, multiple: m, handleScrollArrowVisibility: h, scrollHandlerRef: g, listRef: _, highlightItemOnHover: v } = Rd(), { side: b, align: x, alignItemWithTriggerActive: S, isPositioned: C, setControlledAlignItemWithTrigger: w } = gf(), T = ou(!0) != null, E = zd(), D = wu(), { nonce: O, disableStyleElements: ee } = Tf(), k = il(s, $.id), A = il(s, $.open), j = il(s, $.openMethod), M = il(s, $.mounted), N = il(s, $.popupProps), P = il(s, $.transitionStatus), F = il(s, $.triggerElement), I = il(s, $.positionerElement), L = il(s, $.listElement), R = V.useRef(!1), z = V.useRef(!1), B = V.useRef({}), H = Ir(), U = K((e) => {
		if (!I || !c.current || !z.current) return;
		if (R.current || !S) {
			h();
			return;
		}
		let t = I.style.top === "0px", n = I.style.bottom === "0px";
		if (!t && !n) {
			h();
			return;
		}
		let r = Af(I), i = jf(I.getBoundingClientRect().height, "y", r), a = Ln(I), o = y(I), s = o.getComputedStyle(I), l = parseFloat(s.marginTop), u = parseFloat(s.marginBottom), d = Of(o.getComputedStyle(c.current)), f = Math.min(a.documentElement.clientHeight - l - u, d), p = e.scrollTop, m = kf(e), g = 0, _ = null, v = !1, b = !1, x = (e) => {
			I.style.height = `${e}px`;
		}, C = (t, n) => {
			let r = ef(t, 0, f - i);
			r > 0 && x(i + r), e.scrollTop = n, f - (i + r) <= 1 && (R.current = !0), h();
		}, w = t ? m - p : p, T = Math.min(i + w, f);
		if (g = T, w <= 1) {
			C(w, t ? m : 0);
			return;
		}
		if (f - T > 1 ? t ? b = !0 : _ = 0 : (v = !0, n && p < m && (_ = p - (w - (i + w - f)))), g = Math.ceil(g), g !== 0 && x(g), b || _ != null) {
			let t = kf(e), n = b ? t : ef(_, 0, t);
			Math.abs(e.scrollTop - n) > 1 && (e.scrollTop = n);
		}
		(v || g >= f - 1) && (R.current = !0), h();
	});
	V.useImperativeHandle(g, () => U, [U]), Wr({
		open: A,
		ref: c,
		onComplete() {
			A && l?.(!0);
		}
	});
	let W = {
		open: A,
		transitionStatus: P,
		side: b,
		align: x
	};
	J(() => {
		!I || !c.current || Object.keys(B.current).length || (B.current = {
			top: I.style.top || "0",
			left: I.style.left || "0",
			right: I.style.right,
			height: I.style.height,
			bottom: I.style.bottom,
			minHeight: I.style.minHeight,
			maxHeight: I.style.maxHeight,
			marginTop: I.style.marginTop,
			marginBottom: I.style.marginBottom
		});
	}, [c, I]), J(() => {
		A || S || (z.current = !1, R.current = !1, _f(I, B.current));
	}, [
		A,
		S,
		I,
		c
	]), J(() => {
		let e = c.current;
		if (!A || !F || !I || !e || S && !C || s.state.transitionStatus === "ending") return;
		if (!S) {
			z.current = !0, H.request(h), e.style.removeProperty("--transform-origin");
			return;
		}
		let t = Pf(e);
		e.style.removeProperty("--transform-origin");
		try {
			let t = p.current;
			t?.isConnected || (t = !$.hasSelectedValue(s.state) && f.current?.isConnected ? f.current : null);
			let n = d.current, r = y(I), i = r.getComputedStyle(I), a = r.getComputedStyle(e), o = Ln(F), c = Af(F), l = Mf(F.getBoundingClientRect(), c), u = Mf(I.getBoundingClientRect(), c), m = l.height, g = L || e, b = g.scrollHeight, x = parseFloat(a.borderBottomWidth), S = parseFloat(i.marginTop) || 10, C = parseFloat(i.marginBottom) || 10, T = parseFloat(i.minHeight) || 100, E = Of(a), O = o.documentElement.clientHeight - S - C, ee = o.documentElement.clientWidth, k = O - l.bottom + m, A, j = D === "rtl" ? l.right - u.width : l.left, M = 0;
			if (t && n) {
				let e = Mf(n.getBoundingClientRect(), c);
				A = Mf(t.getBoundingClientRect(), c), j = u.left + (D === "rtl" ? e.right - A.right : e.left - A.left);
				let r = e.top - l.top + e.height / 2;
				M = A.top - u.top + A.height / 2 - r;
			}
			let N = k + M + C + x, P = Math.min(O, N), V = O - S - C, H = N - P, U = ee - 5;
			I.style.left = `${ef(j, 5, U - u.width)}px`, I.style.height = `${P}px`, I.style.maxHeight = "none", I.style.marginTop = `${S}px`, I.style.marginBottom = `${C}px`, e.style.height = "100%";
			let W = kf(g), te = H >= W - 1;
			te && (P = Math.min(O, u.height) - (H - W));
			let G = l.top < 20 || l.bottom > O - 20 || Math.ceil(P) + 1 < Math.min(b, T), K = (r.visualViewport?.scale ?? 1) !== 1 && Li;
			if (G || K) {
				z.current = !0, _f(I, B.current), w(!1);
				return;
			}
			let q = Math.max(T, P);
			if (te) {
				let e = Math.max(0, O - N);
				I.style.top = u.height >= V ? "0" : `${e}px`, I.style.height = `${P}px`, g.scrollTop = kf(g);
			} else I.style.bottom = "0", g.scrollTop = H;
			if (A) {
				let t = u.top, n = u.height, r = A.top + A.height / 2, i = ef(n > 0 ? (r - t) / n * 100 : 50, 0, 100);
				e.style.setProperty("--transform-origin", `50% ${i}%`);
			}
			(q === O || P >= E) && (R.current = !0), h(), v && s.state.selectedIndex === null && s.state.activeIndex === null && _.current[0] != null && s.set("activeIndex", 0), z.current = !0;
		} finally {
			t();
		}
	}, [
		s,
		A,
		I,
		F,
		d,
		f,
		p,
		c,
		h,
		S,
		w,
		H,
		L,
		_,
		v,
		D,
		C
	]), V.useEffect(() => {
		if (!S || !I || !A) return;
		let e = y(I);
		function t(e) {
			u(!1, Dr(Er, e));
		}
		return ka(e, "resize", t);
	}, [
		u,
		S,
		I,
		A
	]);
	let te = {
		...L ? {
			role: "presentation",
			"aria-orientation": void 0
		} : {
			role: "listbox",
			"aria-multiselectable": m || void 0,
			id: `${k}-list`
		},
		onKeyDown(e) {
			T && hu.has(e.key) && e.stopPropagation();
		},
		onScroll(e) {
			L || U(e.currentTarget);
		},
		...S && { style: L ? { height: "100%" } : vf }
	}, G = He("div", e, {
		ref: [t, c],
		state: W,
		stateAttributesMapping: Ef,
		props: [
			N,
			te,
			gu(P),
			{ className: !L && S ? Sf.className : void 0 },
			o
		]
	});
	return /*#__PURE__*/ (0, Z.jsxs)(V.Fragment, { children: [!ee && Sf.getElement(O), /*#__PURE__*/ (0, Z.jsx)(As, {
		context: E,
		modal: !1,
		disabled: !M,
		openInteractionType: j,
		returnFocus: a,
		restoreFocus: !0,
		children: G
	})] });
});
function Of(e) {
	let t = e.maxHeight || "";
	return t.endsWith("px") && parseFloat(t) || Infinity;
}
function kf(e) {
	return tf(e.scrollHeight, e.clientHeight);
}
function Af(e) {
	return bc.getScale(e);
}
function jf(e, t, n) {
	return e / n[t];
}
function Mf(e, t) {
	return so({
		x: jf(e.x, "x", t),
		y: jf(e.y, "y", t),
		width: jf(e.width, "x", t),
		height: jf(e.height, "y", t)
	});
}
var Nf = [
	["transform", "none"],
	["scale", "1"],
	["translate", "0 0"]
];
function Pf(e) {
	let { style: t } = e, n = {};
	for (let [e, r] of Nf) n[e] = t.getPropertyValue(e), t.setProperty(e, r, "important");
	return () => {
		for (let [e] of Nf) {
			let r = n[e];
			r ? t.setProperty(e, r) : t.removeProperty(e);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/list/SelectList.mjs
var Ff = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, ...a } = e, { store: o, scrollHandlerRef: s } = Rd(), { alignItemWithTriggerActive: c } = gf(), l = il(o, $.hasScrollArrows), u = il(o, $.openMethod), d = il(o, $.multiple), f = {
		id: `${il(o, $.id)}-list`,
		role: "listbox",
		"aria-multiselectable": d || void 0,
		onScroll(e) {
			s.current?.(e.currentTarget);
		},
		...c && { style: vf },
		className: l && u !== "touch" ? Sf.className : void 0
	};
	return He("div", e, {
		ref: [t, K((e) => {
			o.set("listElement", e);
		})],
		props: [f, a]
	});
}), If = /*#__PURE__*/ V.createContext(void 0);
function Lf() {
	let e = V.useContext(If);
	if (!e) throw Error(be(57));
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/item/SelectItem.mjs
var Rf = /*#__PURE__*/ V.memo(/*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, value: a = null, label: o, disabled: s = !1, nativeButton: c = !1, ...l } = e, u = V.useRef(null), d = Ki({
		label: o,
		textRef: u,
		indexGuessBehavior: Gi.GuessFromOrder
	}), { store: f, itemProps: p, setOpen: m, setValue: h, selectionRef: g, typingRef: _, valuesRef: v, multiple: y, selectedItemTextRef: b, disabled: x, readOnly: S } = Rd(), C = il(f, $.isActive, d.index), w = il(f, $.open), T = il(f, $.isSelected, a), E = il(f, $.isSelectedByFocus, d.index), D = il(f, $.isItemEqualToValue), O = d.index, ee = O !== -1, k = V.useRef(null);
	J(() => {
		if (!ee) return;
		let e = v.current;
		return e[O] = a, () => {
			delete e[O];
		};
	}, [
		ee,
		O,
		a,
		v
	]), J(() => {
		if (!ee) return;
		let e = f.state.value, t = e;
		y && Array.isArray(e) && (t = e.length > 0 ? e[e.length - 1] : void 0), t !== void 0 && Hd(a, t, D) && (f.set("selectedIndex", O), u.current && (b.current = u.current));
	}, [
		ee,
		O,
		y,
		D,
		f,
		a,
		b
	]);
	let A = V.useRef(null), j = V.useRef("mouse"), M = V.useRef(!1), { getButtonProps: N, buttonRef: P } = we({
		disabled: s,
		focusableWhenDisabled: !0,
		native: c,
		composite: !0
	}), F = {
		disabled: s,
		selected: T,
		highlighted: C
	};
	function I(e) {
		if (x || S) return;
		let t = f.state.value;
		if (y) {
			let n = Array.isArray(t) ? t : [], r = T ? Gd(n, a, D) : [...n, a];
			h(r, Dr(yr, e));
		} else h(a, Dr(yr, e)), m(!1, Dr(yr, e));
	}
	function L() {
		g.current.dragY = 0;
	}
	let R = {
		role: "option",
		"aria-selected": T,
		tabIndex: w && C ? 0 : -1,
		onKeyDown(e) {
			A.current = e.key, f.set("activeIndex", O), e.key === " " && _.current && e.preventDefault();
		},
		onClick(e) {
			let t = e.type === "click" && j.current !== "touch", n = e.nativeEvent.pointerType, r = t && ra(e.nativeEvent) && (n !== void 0 || C), i = t && !r && !M.current;
			M.current = !1, (e.type !== "keydown" || A.current !== null) && (s || e.type === "keydown" && A.current === " " && _.current || i || (A.current = null, I(e.nativeEvent)));
		},
		onPointerEnter(e) {
			j.current = e.pointerType;
		},
		onPointerMove(e) {
			if (e.pointerType === "mouse" && e.buttons === 1) {
				let t = g.current;
				t.dragY += e.movementY, t.dragY ** 2 >= 64 && (t.allowUnselectedMouseUp = !0);
			}
		},
		onPointerDown(e) {
			j.current = e.pointerType, M.current = !0, L();
		},
		onMouseUp() {
			if (L(), s || j.current === "touch" || M.current) return;
			let e = !g.current.allowSelectedMouseUp && T, t = !g.current.allowUnselectedMouseUp && !T;
			e || t || (M.current = !0, k.current?.click(), M.current = !1);
		}
	}, z = He("div", e, {
		ref: [
			P,
			t,
			d.ref,
			k
		],
		state: F,
		props: [
			p,
			R,
			l,
			N
		]
	}), B = V.useMemo(() => ({
		selected: T,
		index: O,
		textRef: u,
		selectedByFocus: E,
		hasRegistered: ee
	}), [
		T,
		O,
		u,
		E,
		ee
	]);
	return /*#__PURE__*/ (0, Z.jsx)(If.Provider, {
		value: B,
		children: z
	});
})), zf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let n = e.keepMounted ?? !1, { selected: r } = Lf();
	return n || r ? /*#__PURE__*/ (0, Z.jsx)(Bf, {
		...e,
		ref: t
	}) : null;
}), Bf = /*#__PURE__*/ V.memo(/*#__PURE__*/ V.forwardRef((e, t) => {
	let { render: n, className: r, style: i, keepMounted: a, ...o } = e, { selected: s } = Lf(), c = V.useRef(null), { transitionStatus: l, setMounted: u } = Gr(s), d = He("span", e, {
		ref: [t, c],
		state: {
			selected: s,
			transitionStatus: l
		},
		props: [{
			"aria-hidden": !0,
			children: "✔️"
		}, o],
		stateAttributesMapping: Vr
	});
	return Wr({
		open: s,
		ref: c,
		onComplete() {
			s || u(!1);
		}
	}), d;
})), Vf = /*#__PURE__*/ V.memo(/*#__PURE__*/ V.forwardRef(function(e, t) {
	let { index: n, textRef: r, selectedByFocus: i, hasRegistered: a } = Lf(), { firstItemTextRef: o, selectedItemTextRef: s } = Rd(), { render: c, className: l, style: u, ...d } = e;
	return He("div", e, {
		ref: [
			V.useCallback((e) => {
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
})), Hf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	let { render: n, className: r, style: i, direction: a, keepMounted: o = !1, ...s } = e, c = a === "up", { store: l, popupRef: u, listRef: d, handleScrollArrowVisibility: f, scrollArrowsMountedCountRef: p } = Rd(), { side: m, scrollDownArrowRef: h, scrollUpArrowRef: g } = gf(), _ = il(l, c ? $.scrollUpArrowVisible : $.scrollDownArrowVisible), v = il(l, $.openMethod), y = _ && v !== "touch", b = ea(), x = c ? g : h, { mounted: S, transitionStatus: C, setMounted: w } = Gr(y);
	J(() => (p.current += 1, l.state.hasScrollArrows || l.set("hasScrollArrows", !0), () => {
		p.current = Math.max(0, p.current - 1), p.current === 0 && l.state.hasScrollArrows && l.set("hasScrollArrows", !1);
	}), [l, p]), Wr({
		open: y,
		ref: x,
		onComplete() {
			y || w(!1);
		}
	});
	let T = He("div", e, {
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
					let n = tf(e.scrollHeight, e.clientHeight), r = nf(e.scrollTop, n), i = r === (c ? 0 : n), a = d.current;
					if (r !== e.scrollTop && (e.scrollTop = r), a.length === 0 && l.set(c ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !i), i) {
						b.clear();
						return;
					}
					if (a.length > 0) {
						let t = x.current?.offsetHeight || 0;
						e.scrollTop = Uf(a, c, r, e.clientHeight, t, n);
					}
					b.start(40, t);
				}
				b.start(40, t);
			},
			onMouseLeave() {
				b.clear();
			}
		}, s],
		stateAttributesMapping: Vr
	});
	return S || o ? T : null;
});
function Uf(e, t, n, r, i, a) {
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
		return o < t && s ? nf(s.offsetTop - i, a) : 0;
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
	return c > o && l ? nf(l.offsetTop + l.offsetHeight - r + i, a) : a;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@19.2.17_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/select/scroll-down-arrow/SelectScrollDownArrow.mjs
var Wf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Z.jsx)(Hf, {
		...e,
		ref: t,
		direction: "down"
	});
}), Gf = /*#__PURE__*/ V.forwardRef(function(e, t) {
	return /*#__PURE__*/ (0, Z.jsx)(Hf, {
		...e,
		ref: t,
		direction: "up"
	});
}), Kf = rf;
function qf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Z.jsx)(df, {
		"data-slot": "select-value",
		className: On("flex flex-1 text-left", e),
		...t
	});
}
function Jf({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, Z.jsxs)(lf, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: On("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, Z.jsx)(ff, { render: /* @__PURE__ */ (0, Z.jsx)(ii, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function Yf({ className: e, children: t, side: n = "bottom", sideOffset: r = 4, align: i = "center", alignOffset: a = 0, alignItemWithTrigger: o = !0, ...s }) {
	let c = Od();
	return /* @__PURE__ */ (0, Z.jsx)(mf, {
		container: c,
		children: /* @__PURE__ */ (0, Z.jsx)(bf, {
			side: n,
			sideOffset: r,
			align: i,
			alignOffset: a,
			alignItemWithTrigger: o,
			className: "isolate z-50",
			positionMethod: "fixed",
			children: /* @__PURE__ */ (0, Z.jsxs)(Df, {
				"data-slot": "select-content",
				"data-align-trigger": o,
				className: On("cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", e),
				...s,
				children: [
					/* @__PURE__ */ (0, Z.jsx)(Zf, {}),
					/* @__PURE__ */ (0, Z.jsx)(Ff, { children: t }),
					/* @__PURE__ */ (0, Z.jsx)(Qf, {})
				]
			})
		})
	});
}
function Xf({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, Z.jsxs)(Rf, {
		"data-slot": "select-item",
		className: On("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, Z.jsx)(Vf, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children: t
		}), /* @__PURE__ */ (0, Z.jsx)(zf, {
			render: /* @__PURE__ */ (0, Z.jsx)("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, Z.jsx)(ri, { className: "pointer-events-none" })
		})]
	});
}
function Zf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Z.jsx)(Gf, {
		"data-slot": "select-scroll-up-button",
		className: On("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Z.jsx)(ai, {})
	});
}
function Qf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, Z.jsx)(Wf, {
		"data-slot": "select-scroll-down-button",
		className: On("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", e),
		...t,
		children: /* @__PURE__ */ (0, Z.jsx)(ii, {})
	});
}
//#endregion
//#region src/components/streamlit/select.tsx
function $f({ envelope: e, setStateValue: t }) {
	let n = (0, V.useId)(), { commit: r, state: i } = ci(e.state, t), a = e.props.disabled || e.props.options.length === 0;
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: "grid min-w-0 gap-1.5 p-px",
		"data-ssui-component": "select",
		"data-testid": "ssui-v2-select",
		children: [/* @__PURE__ */ (0, Z.jsx)("span", {
			className: "text-sm font-medium leading-none",
			id: n,
			children: e.props.label
		}), /* @__PURE__ */ (0, Z.jsxs)(Kf, {
			disabled: a,
			items: e.props.options,
			modal: !1,
			onValueChange: (e) => {
				r(typeof e == "string" ? e : null);
			},
			value: i.value,
			children: [/* @__PURE__ */ (0, Z.jsx)(Jf, {
				"aria-labelledby": n,
				className: "w-full",
				"data-testid": "ssui-v2-select-trigger",
				children: /* @__PURE__ */ (0, Z.jsx)(qf, { placeholder: e.props.options.length === 0 ? "No options" : e.props.placeholder })
			}), /* @__PURE__ */ (0, Z.jsx)(Yf, {
				align: "start",
				alignItemWithTrigger: !1,
				"data-testid": "ssui-v2-select-content",
				children: e.props.options.map((e) => /* @__PURE__ */ (0, Z.jsx)(Xf, {
					disabled: e.disabled,
					value: e.value,
					children: e.label
				}, e.value))
			})]
		})]
	});
}
//#endregion
//#region src/app.tsx
function ep({ envelope: e, setStateValue: t, setTriggerValue: n }) {
	switch (e.kind) {
		case "select": return /* @__PURE__ */ (0, Z.jsx)($f, {
			envelope: e,
			setStateValue: t
		});
		case "dropdown_menu": return /* @__PURE__ */ (0, Z.jsx)(Fd, {
			envelope: e,
			setTriggerValue: n
		});
		case "checkbox": return /* @__PURE__ */ (0, Z.jsx)(li, {
			envelope: e,
			setStateValue: t
		});
		case "button": return /* @__PURE__ */ (0, Z.jsx)(Mn, {
			envelope: e,
			setTriggerValue: n
		});
	}
}
//#endregion
//#region src/platform/error-boundary.tsx
var tp = 3, np = /* @__PURE__ */ new Map();
function rp(e, t) {
	let n = e.message.split(":")[0]?.slice(0, 64), r = n && /^SSUI_V2_[A-Z0-9_]+$/.test(n) ? n : "SSUI_V2_RENDER_ERROR", i = np.get(r) ?? 0;
	i >= tp || (np.set(r, i + 1), console.error("SSUI_V2_RENDER_ERROR", {
		code: r,
		componentStack: t.componentStack?.slice(0, 2048)
	}));
}
var ip = class extends V.Component {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		rp(e, t);
	}
	componentDidUpdate(e) {
		e.resetKey !== this.props.resetKey && this.state.error && this.setState({ error: null });
	}
	render() {
		return this.state.error ? /* @__PURE__ */ (0, Z.jsx)("div", {
			"data-ssui-v2-error": !0,
			role: "alert",
			children: "Component unavailable (SSUI_V2_RENDER_ERROR)."
		}) : this.props.children;
	}
};
//#endregion
//#region src/platform/component-shell.tsx
function ap({ children: e, overlayRoot: t, parentElement: n, resetKey: r }) {
	return /* @__PURE__ */ (0, Z.jsx)(ip, {
		resetKey: r,
		children: /* @__PURE__ */ (0, Z.jsx)(Dd, {
			container: t,
			expectedRoot: n,
			children: e
		})
	});
}
//#endregion
//#region src/platform/theme.ts
function op(e) {
	let t = Number.parseFloat(e);
	return Number.isFinite(t) ? e.includes("%") ? t / 100 * 255 : t : null;
}
function sp(e) {
	let t = e.match(/rgba?\(\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)/), n = e.trim().match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i), r = null;
	if (t) r = [
		op(t[1] ?? ""),
		op(t[2] ?? ""),
		op(t[3] ?? "")
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
function cp(e) {
	return e instanceof ShadowRoot ? e.host : e;
}
var lp = /* @__PURE__ */ new WeakMap(), up = /* @__PURE__ */ new WeakMap();
function dp(e, t, n) {
	n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function fp(e) {
	let t = getComputedStyle(e), n = sp(t.getPropertyValue("--st-background-color").trim() || t.backgroundColor), r = sp(t.getPropertyValue("--st-primary-color").trim() || "#ff4b4b"), i = n === null ? "light" : n < .18 ? "dark" : "light", a = r !== null && r >= .179 ? "#000000" : "#ffffff";
	e.dataset.ssuiV2Host = "", e.dataset.theme = i, e.style.colorScheme = i, e.style.setProperty("--ssui-v2-primary-foreground", a), e.dir = document.documentElement.dir || "ltr", e.lang = document.documentElement.lang || "en";
}
function pp(e) {
	let t = cp(e);
	lp.has(t) || lp.set(t, {
		colorScheme: t.style.getPropertyValue("color-scheme"),
		colorSchemePriority: t.style.getPropertyPriority("color-scheme"),
		dataSsuiV2Host: t.getAttribute("data-ssui-v2-host"),
		dataTheme: t.getAttribute("data-theme"),
		dir: t.getAttribute("dir"),
		lang: t.getAttribute("lang"),
		primaryForeground: t.style.getPropertyValue("--ssui-v2-primary-foreground"),
		primaryForegroundPriority: t.style.getPropertyPriority("--ssui-v2-primary-foreground")
	}), fp(t);
	let n = up.get(t);
	n !== void 0 && cancelAnimationFrame(n), up.set(t, requestAnimationFrame(() => {
		up.delete(t), lp.has(t) && t.isConnected && fp(t);
	}));
}
function mp(e) {
	let t = cp(e), n = up.get(t);
	n !== void 0 && (cancelAnimationFrame(n), up.delete(t));
	let r = lp.get(t);
	r && (dp(t, "data-ssui-v2-host", r.dataSsuiV2Host), dp(t, "data-theme", r.dataTheme), dp(t, "dir", r.dir), dp(t, "lang", r.lang), r.colorScheme ? t.style.setProperty("color-scheme", r.colorScheme, r.colorSchemePriority) : t.style.removeProperty("color-scheme"), r.primaryForeground ? t.style.setProperty("--ssui-v2-primary-foreground", r.primaryForeground, r.primaryForegroundPriority) : t.style.removeProperty("--ssui-v2-primary-foreground"), lp.delete(t));
}
function hp(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function gp(e) {
	return typeof e == "string" && new TextEncoder().encode(e).byteLength <= 16384;
}
function _p(e) {
	return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function vp(e, t) {
	return hp(e) && e.kind === t && _p(e.clientRevision) && _p(e.serverRevision);
}
function yp(e) {
	let t = e.props, n = e.state;
	if (!hp(t) || !vp(n, "select") || !(n.value === null || gp(n.value)) || !gp(t.label) || !gp(t.placeholder) || typeof t.disabled != "boolean" || !Array.isArray(t.options) || t.options.length > 1e4) return null;
	let r = [], i = /* @__PURE__ */ new Set();
	for (let e of t.options) {
		if (!hp(e) || !gp(e.label) || !gp(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || i.has(e.value)) return null;
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
function bp(e) {
	let t = e.props;
	if (!hp(t) || !gp(t.label) || !(t.menuLabel === null || gp(t.menuLabel)) || typeof t.disabled != "boolean" || !Array.isArray(t.items) || t.items.length > 1e4) return null;
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t.items) {
		if (!hp(e) || !gp(e.label) || !gp(e.value) || e.disabled !== void 0 && typeof e.disabled != "boolean" || e.variant !== void 0 && e.variant !== "default" && e.variant !== "destructive" || r.has(e.value)) return null;
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
function xp(e) {
	let t = e.props, n = e.state;
	return !hp(t) || !vp(n, "checkbox") || typeof n.value != "boolean" || !gp(t.label) || typeof t.disabled != "boolean" ? null : {
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
var Sp = /* @__PURE__ */ new Set([
	"default",
	"destructive",
	"outline",
	"secondary",
	"ghost",
	"link"
]);
function Cp(e) {
	let t = e.props;
	return !hp(t) || !gp(t.text) || typeof t.disabled != "boolean" || typeof t.variant != "string" || !Sp.has(t.variant) ? null : {
		protocolVersion: 1,
		kind: "button",
		props: {
			disabled: t.disabled,
			text: t.text,
			variant: t.variant
		}
	};
}
function wp(e) {
	let t = hp(e) && typeof e.kind == "string" ? e.kind : "unknown", n = hp(e) && (typeof e.protocolVersion == "string" || typeof e.protocolVersion == "number") ? String(e.protocolVersion) : "unknown", r = Infinity;
	try {
		r = new TextEncoder().encode(JSON.stringify(e)).byteLength;
	} catch {}
	if (r > 2097152 || !hp(e) || e.protocolVersion !== 1) return {
		ok: !1,
		failure: {
			code: r > 2097152 ? "SSUI_V2_ENVELOPE_TOO_LARGE" : "SSUI_V2_PROTOCOL_VERSION",
			kind: t,
			protocolVersion: n
		}
	};
	let i = e.kind === "select" ? yp(e) : e.kind === "dropdown_menu" ? bp(e) : e.kind === "checkbox" ? xp(e) : e.kind === "button" ? Cp(e) : null;
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
var Tp = /* @__PURE__ */ new WeakMap();
function Ep(e, t, n) {
	let r = e.querySelector(t);
	if (!(r instanceof HTMLElement)) throw Error(`${n}: required component root is missing.`);
	return r;
}
function Dp(e, t) {
	let n = Ep(e, "[data-ssui-v2-app-root]", "SSUI_V2_APP_ROOT_MISSING"), r = Ep(e, "[data-ssui-v2-overlay-root]", "SSUI_V2_OVERLAY_ROOT_MISSING");
	if (n.getRootNode() !== e || r.getRootNode() !== e) throw Error("SSUI_V2_ROOT_OWNERSHIP: component roots escaped parentElement.");
	let i = `ssui-${t.replace(/[^a-zA-Z0-9_-]/g, "-")}-`;
	return {
		appRoot: n,
		overlayRoot: r,
		reactRoot: (0, Ye.createRoot)(n, { identifierPrefix: i })
	};
}
function Op({ failure: e }) {
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
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
var kp = (e) => {
	let { parentElement: t } = e, n = Tp.get(t);
	n || (n = Dp(t, e.key), Tp.set(t, n)), pp(t);
	let r = wp(e.data), i = r.ok ? `${r.envelope.kind}:${r.envelope.protocolVersion}` : `${r.failure.code}:${r.failure.kind}:${r.failure.protocolVersion}`;
	return n.reactRoot.render(/* @__PURE__ */ (0, Z.jsx)(ap, {
		overlayRoot: n.overlayRoot,
		parentElement: t,
		resetKey: i,
		children: r.ok ? /* @__PURE__ */ (0, Z.jsx)(ep, {
			envelope: r.envelope,
			setStateValue: e.setStateValue,
			setTriggerValue: e.setTriggerValue
		}) : /* @__PURE__ */ (0, Z.jsx)(Op, { failure: r.failure })
	})), () => {
		let e = Tp.get(t);
		e && (e.reactRoot.unmount(), e.overlayRoot.replaceChildren(), mp(t), Tp.delete(t));
	};
};
//#endregion
export { kp as default };
