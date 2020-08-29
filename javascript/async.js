!(function (r, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t((r.async = {}));
})(this, function (r) {
  "use strict";
  function t(r, ...t) {
    return (...e) => r(...t, ...e);
  }
  function e(r) {
    return function (...t) {
      var e = t.pop();
      return r.call(this, t, e);
    };
  }
  var n = "function" == typeof setImmediate && setImmediate,
    i = "object" == typeof process && "function" == typeof process.nextTick;
  function u(r) {
    setTimeout(r, 0);
  }
  function a(r) {
    return (t, ...e) => r(() => t(...e));
  }
  var o = a(n ? setImmediate : i ? process.nextTick : u);
  function c(r) {
    return l(r)
      ? function (...t) {
          const e = t.pop();
          return s(r.apply(this, t), e);
        }
      : e(function (t, e) {
          var n;
          try {
            n = r.apply(this, t);
          } catch (r) {
            return e(r);
          }
          if (n && "function" == typeof n.then) return s(n, e);
          e(null, n);
        });
  }
  function s(r, t) {
    return r.then(
      (r) => {
        f(t, null, r);
      },
      (r) => {
        f(t, r && r.message ? r : new Error(r));
      }
    );
  }
  function f(r, t, e) {
    try {
      r(t, e);
    } catch (r) {
      o((r) => {
        throw r;
      }, r);
    }
  }
  function l(r) {
    return "AsyncFunction" === r[Symbol.toStringTag];
  }
  function h(r) {
    if ("function" != typeof r) throw new Error("expected a function");
    return l(r) ? c(r) : r;
  }
  function p(r, t = r.length) {
    if (!t) throw new Error("arity is undefined");
    return function (...e) {
      return "function" == typeof e[t - 1]
        ? r.apply(this, e)
        : new Promise((n, i) => {
            (e[t - 1] = (r, ...t) => {
              if (r) return i(r);
              n(t.length > 1 ? t : t[0]);
            }),
              r.apply(this, e);
          });
    };
  }
  function v(r) {
    return function (t, ...e) {
      return p(function (n) {
        var i = this;
        return r(
          t,
          (r, t) => {
            h(r).apply(i, e.concat(t));
          },
          n
        );
      });
    };
  }
  function y(r, t, e, n) {
    t = t || [];
    var i = [],
      u = 0,
      a = h(e);
    return r(
      t,
      (r, t, e) => {
        var n = u++;
        a(r, (r, t) => {
          (i[n] = t), e(r);
        });
      },
      (r) => {
        n(r, i);
      }
    );
  }
  function m(r) {
    return (
      r && "number" == typeof r.length && r.length >= 0 && r.length % 1 == 0
    );
  }
  const d = {};
  function g(r) {
    function t(...t) {
      if (null !== r) {
        var e = r;
        (r = null), e.apply(this, t);
      }
    }
    return Object.assign(t, r), t;
  }
  function S(r) {
    if (m(r))
      return (function (r) {
        var t = -1,
          e = r.length;
        return function () {
          return ++t < e ? { value: r[t], key: t } : null;
        };
      })(r);
    var t,
      e,
      n,
      i,
      u = (function (r) {
        return r[Symbol.iterator] && r[Symbol.iterator]();
      })(r);
    return u
      ? (function (r) {
          var t = -1;
          return function () {
            var e = r.next();
            return e.done ? null : (t++, { value: e.value, key: t });
          };
        })(u)
      : ((e = (t = r) ? Object.keys(t) : []),
        (n = -1),
        (i = e.length),
        function () {
          var r = e[++n];
          return n < i ? { value: t[r], key: r } : null;
        });
  }
  function b(r) {
    return function (...t) {
      if (null === r) throw new Error("Callback was already called.");
      var e = r;
      (r = null), e.apply(this, t);
    };
  }
  function w(r, t, e, n) {
    let i = !1,
      u = !1,
      a = !1,
      o = 0,
      c = 0;
    function s() {
      o >= t ||
        a ||
        i ||
        ((a = !0),
        r
          .next()
          .then(({ value: r, done: t }) => {
            if (!u && !i) {
              if (((a = !1), t)) return (i = !0), void (o <= 0 && n(null));
              o++, e(r, c, f), c++, s();
            }
          })
          .catch(l));
    }
    function f(r, t) {
      if (((o -= 1), !u))
        return r
          ? l(r)
          : !1 === r
          ? ((i = !0), void (u = !0))
          : t === d || (i && o <= 0)
          ? ((i = !0), n(null))
          : void s();
    }
    function l(r) {
      u || ((a = !1), (i = !0), n(r));
    }
    s();
  }
  var k = (r) => (t, e, n) => {
    if (((n = g(n)), r <= 0))
      throw new RangeError("concurrency limit cannot be less than 1");
    if (!t) return n(null);
    if (
      (function (r) {
        return "AsyncGenerator" === r[Symbol.toStringTag];
      })(t)
    )
      return w(t, r, e, n);
    if (
      (function (r) {
        return "function" == typeof r[Symbol.asyncIterator];
      })(t)
    )
      return w(t[Symbol.asyncIterator](), r, e, n);
    var i = S(t),
      u = !1,
      a = !1,
      o = 0,
      c = !1;
    function s(r, t) {
      if (!a)
        if (((o -= 1), r)) (u = !0), n(r);
        else if (!1 === r) (u = !0), (a = !0);
        else {
          if (t === d || (u && o <= 0)) return (u = !0), n(null);
          c || f();
        }
    }
    function f() {
      for (c = !0; o < r && !u; ) {
        var t = i();
        if (null === t) return (u = !0), void (o <= 0 && n(null));
        (o += 1), e(t.value, t.key, b(s));
      }
      c = !1;
    }
    f();
  };
  var E = p(function (r, t, e, n) {
    return k(t)(r, h(e), n);
  }, 4);
  function L(r, t, e) {
    e = g(e);
    var n = 0,
      i = 0,
      { length: u } = r,
      a = !1;
    function o(r, t) {
      !1 === r && (a = !0),
        !0 !== a && (r ? e(r) : (++i !== u && t !== d) || e(null));
    }
    for (0 === u && e(null); n < u; n++) t(r[n], n, b(o));
  }
  function A(r, t, e) {
    return E(r, 1 / 0, t, e);
  }
  var x = p(function (r, t, e) {
    return (m(r) ? L : A)(r, h(t), e);
  }, 3);
  var j = p(function (r, t, e) {
      return y(x, r, t, e);
    }, 3),
    O = v(j);
  var _ = p(function (r, t, e) {
    return E(r, 1, t, e);
  }, 3);
  var I = p(function (r, t, e) {
      return y(_, r, t, e);
    }, 3),
    T = v(I);
  const B = Symbol("promiseCallback");
  function F() {
    let r, t;
    function e(e, ...n) {
      if (e) return t(e);
      r(n.length > 1 ? n : n[0]);
    }
    return (
      (e[B] = new Promise((e, n) => {
        (r = e), (t = n);
      })),
      e
    );
  }
  function M(r, t, e) {
    "number" != typeof t && ((e = t), (t = null)), (e = g(e || F()));
    var n = Object.keys(r).length;
    if (!n) return e(null);
    t || (t = n);
    var i = {},
      u = 0,
      a = !1,
      o = !1,
      c = Object.create(null),
      s = [],
      f = [],
      l = {};
    function p(r, t) {
      s.push(() =>
        (function (r, t) {
          if (o) return;
          var n = b((t, ...n) => {
            if ((u--, !1 !== t))
              if ((n.length < 2 && ([n] = n), t)) {
                var s = {};
                if (
                  (Object.keys(i).forEach((r) => {
                    s[r] = i[r];
                  }),
                  (s[r] = n),
                  (o = !0),
                  (c = Object.create(null)),
                  a)
                )
                  return;
                e(t, s);
              } else
                (i[r] = n),
                  (function (r) {
                    (c[r] || []).forEach((r) => r()), v();
                  })(r);
            else a = !0;
          });
          u++;
          var s = h(t[t.length - 1]);
          t.length > 1 ? s(i, n) : s(n);
        })(r, t)
      );
    }
    function v() {
      if (!a) {
        if (0 === s.length && 0 === u) return e(null, i);
        for (; s.length && u < t; ) {
          s.shift()();
        }
      }
    }
    function y(t) {
      var e = [];
      return (
        Object.keys(r).forEach((n) => {
          const i = r[n];
          Array.isArray(i) && i.indexOf(t) >= 0 && e.push(n);
        }),
        e
      );
    }
    return (
      Object.keys(r).forEach((t) => {
        var e = r[t];
        if (!Array.isArray(e)) return p(t, [e]), void f.push(t);
        var n = e.slice(0, e.length - 1),
          i = n.length;
        if (0 === i) return p(t, e), void f.push(t);
        (l[t] = i),
          n.forEach((u) => {
            if (!r[u])
              throw new Error(
                "async.auto task `" +
                  t +
                  "` has a non-existent dependency `" +
                  u +
                  "` in " +
                  n.join(", ")
              );
            !(function (r, t) {
              var e = c[r];
              e || (e = c[r] = []);
              e.push(t);
            })(u, () => {
              0 === --i && p(t, e);
            });
          });
      }),
      (function () {
        var r,
          t = 0;
        for (; f.length; )
          (r = f.pop()),
            t++,
            y(r).forEach((r) => {
              0 == --l[r] && f.push(r);
            });
        if (t !== n)
          throw new Error(
            "async.auto cannot execute tasks due to a recursive dependency"
          );
      })(),
      v(),
      e[B]
    );
  }
  var C = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/,
    z = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/,
    P = /,/,
    D = /(=.+)?(\s*)$/,
    V = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  function q(r, t) {
    var e = {};
    return (
      Object.keys(r).forEach((t) => {
        var n,
          i = r[t],
          u = l(i),
          a = (!u && 1 === i.length) || (u && 0 === i.length);
        if (Array.isArray(i))
          (n = [...i]), (i = n.pop()), (e[t] = n.concat(n.length > 0 ? o : i));
        else if (a) e[t] = i;
        else {
          if (
            ((n = (function (r) {
              const t = r.toString().replace(V, "");
              let e = t.match(C);
              if ((e || (e = t.match(z)), !e))
                throw new Error(
                  "could not parse args in autoInject\nSource:\n" + t
                );
              let [, n] = e;
              return n
                .replace(/\s/g, "")
                .split(P)
                .map((r) => r.replace(D, "").trim());
            })(i)),
            0 === i.length && !u && 0 === n.length)
          )
            throw new Error(
              "autoInject task functions require explicit parameters."
            );
          u || n.pop(), (e[t] = n.concat(o));
        }
        function o(r, t) {
          var e = n.map((t) => r[t]);
          e.push(t), h(i)(...e);
        }
      }),
      M(e, t)
    );
  }
  class R {
    constructor() {
      (this.head = this.tail = null), (this.length = 0);
    }
    removeLink(r) {
      return (
        r.prev ? (r.prev.next = r.next) : (this.head = r.next),
        r.next ? (r.next.prev = r.prev) : (this.tail = r.prev),
        (r.prev = r.next = null),
        (this.length -= 1),
        r
      );
    }
    empty() {
      for (; this.head; ) this.shift();
      return this;
    }
    insertAfter(r, t) {
      (t.prev = r),
        (t.next = r.next),
        r.next ? (r.next.prev = t) : (this.tail = t),
        (r.next = t),
        (this.length += 1);
    }
    insertBefore(r, t) {
      (t.prev = r.prev),
        (t.next = r),
        r.prev ? (r.prev.next = t) : (this.head = t),
        (r.prev = t),
        (this.length += 1);
    }
    unshift(r) {
      this.head ? this.insertBefore(this.head, r) : U(this, r);
    }
    push(r) {
      this.tail ? this.insertAfter(this.tail, r) : U(this, r);
    }
    shift() {
      return this.head && this.removeLink(this.head);
    }
    pop() {
      return this.tail && this.removeLink(this.tail);
    }
    toArray() {
      return [...this];
    }
    *[Symbol.iterator]() {
      for (var r = this.head; r; ) yield r.data, (r = r.next);
    }
    remove(r) {
      for (var t = this.head; t; ) {
        var { next: e } = t;
        r(t) && this.removeLink(t), (t = e);
      }
      return this;
    }
  }
  function U(r, t) {
    (r.length = 1), (r.head = r.tail = t);
  }
  function Q(r, t, e) {
    if (null == t) t = 1;
    else if (0 === t) throw new RangeError("Concurrency must not be zero");
    var n = h(r),
      i = 0,
      u = [];
    const a = {
      error: [],
      drain: [],
      saturated: [],
      unsaturated: [],
      empty: [],
    };
    function c(r, t) {
      return r
        ? t
          ? void (a[r] = a[r].filter((r) => r !== t))
          : (a[r] = [])
        : Object.keys(a).forEach((r) => (a[r] = []));
    }
    function s(r, ...t) {
      a[r].forEach((r) => r(...t));
    }
    var f = !1;
    function l(r, t, e, n) {
      if (null != n && "function" != typeof n)
        throw new Error("task callback must be a function");
      var i, u;
      function a(r, ...t) {
        return r ? (e ? u(r) : i()) : t.length <= 1 ? i(t[0]) : void i(t);
      }
      d.started = !0;
      var c = { data: r, callback: e ? a : n || a };
      if (
        (t ? d._tasks.unshift(c) : d._tasks.push(c),
        f ||
          ((f = !0),
          o(() => {
            (f = !1), d.process();
          })),
        e || !n)
      )
        return new Promise((r, t) => {
          (i = r), (u = t);
        });
    }
    function p(r) {
      return function (t, ...e) {
        i -= 1;
        for (var n = 0, a = r.length; n < a; n++) {
          var o = r[n],
            c = u.indexOf(o);
          0 === c ? u.shift() : c > 0 && u.splice(c, 1),
            o.callback(t, ...e),
            null != t && s("error", t, o.data);
        }
        i <= d.concurrency - d.buffer && s("unsaturated"),
          d.idle() && s("drain"),
          d.process();
      };
    }
    function v(r) {
      return !(0 !== r.length || !d.idle()) && (o(() => s("drain")), !0);
    }
    const y = (r) => (t) => {
      if (!t)
        return new Promise((t, e) => {
          !(function (r, t) {
            const e = (...n) => {
              c(r, e), t(...n);
            };
            a[r].push(e);
          })(r, (r, n) => {
            if (r) return e(r);
            t(n);
          });
        });
      c(r),
        (function (r, t) {
          a[r].push(t);
        })(r, t);
    };
    var m = !1,
      d = {
        _tasks: new R(),
        *[Symbol.iterator]() {
          yield* d._tasks[Symbol.iterator]();
        },
        concurrency: t,
        payload: e,
        buffer: t / 4,
        started: !1,
        paused: !1,
        push(r, t) {
          if (Array.isArray(r)) {
            if (v(r)) return;
            return r.map((r) => l(r, !1, !1, t));
          }
          return l(r, !1, !1, t);
        },
        pushAsync(r, t) {
          if (Array.isArray(r)) {
            if (v(r)) return;
            return r.map((r) => l(r, !1, !0, t));
          }
          return l(r, !1, !0, t);
        },
        kill() {
          c(), d._tasks.empty();
        },
        unshift(r, t) {
          if (Array.isArray(r)) {
            if (v(r)) return;
            return r.map((r) => l(r, !0, !1, t));
          }
          return l(r, !0, !1, t);
        },
        unshiftAsync(r, t) {
          if (Array.isArray(r)) {
            if (v(r)) return;
            return r.map((r) => l(r, !0, !0, t));
          }
          return l(r, !0, !0, t);
        },
        remove(r) {
          d._tasks.remove(r);
        },
        process() {
          if (!m) {
            for (m = !0; !d.paused && i < d.concurrency && d._tasks.length; ) {
              var r = [],
                t = [],
                e = d._tasks.length;
              d.payload && (e = Math.min(e, d.payload));
              for (var a = 0; a < e; a++) {
                var o = d._tasks.shift();
                r.push(o), u.push(o), t.push(o.data);
              }
              (i += 1),
                0 === d._tasks.length && s("empty"),
                i === d.concurrency && s("saturated");
              var c = b(p(r));
              n(t, c);
            }
            m = !1;
          }
        },
        length: () => d._tasks.length,
        running: () => i,
        workersList: () => u,
        idle: () => d._tasks.length + i === 0,
        pause() {
          d.paused = !0;
        },
        resume() {
          !1 !== d.paused && ((d.paused = !1), o(d.process));
        },
      };
    return (
      Object.defineProperties(d, {
        saturated: { writable: !1, value: y("saturated") },
        unsaturated: { writable: !1, value: y("unsaturated") },
        empty: { writable: !1, value: y("empty") },
        drain: { writable: !1, value: y("drain") },
        error: { writable: !1, value: y("error") },
      }),
      d
    );
  }
  function N(r, t) {
    return Q(r, 1, t);
  }
  function G(r, t, e) {
    return Q(r, t, e);
  }
  var W = p(function (r, t, e, n) {
    n = g(n);
    var i = h(e);
    return _(
      r,
      (r, e, n) => {
        i(t, r, (r, e) => {
          (t = e), n(r);
        });
      },
      (r) => n(r, t)
    );
  }, 4);
  function $(...r) {
    var t = r.map(h);
    return function (...r) {
      var e = this,
        n = r[r.length - 1];
      return (
        "function" == typeof n ? r.pop() : (n = F()),
        W(
          t,
          r,
          (r, t, n) => {
            t.apply(
              e,
              r.concat((r, ...t) => {
                n(r, t);
              })
            );
          },
          (r, t) => n(r, ...t)
        ),
        n[B]
      );
    };
  }
  function H(...r) {
    return $(...r.reverse());
  }
  var J = p(function (r, t, e, n) {
    return y(k(t), r, e, n);
  }, 4);
  var K = p(function (r, t, e, n) {
    var i = h(e);
    return J(
      r,
      t,
      (r, t) => {
        i(r, (r, ...e) => (r ? t(r) : t(r, e)));
      },
      (r, t) => {
        for (var e = [], i = 0; i < t.length; i++)
          t[i] && (e = e.concat(...t[i]));
        return n(r, e);
      }
    );
  }, 4);
  var X = p(function (r, t, e) {
    return K(r, 1 / 0, t, e);
  }, 3);
  var Y = p(function (r, t, e) {
    return K(r, 1, t, e);
  }, 3);
  function Z(...r) {
    return function (...t) {
      return t.pop()(null, ...r);
    };
  }
  function rr(r, t) {
    return (e, n, i, u) => {
      var a,
        o = !1;
      const c = h(i);
      e(
        n,
        (e, n, i) => {
          c(e, (n, u) =>
            n || !1 === n
              ? i(n)
              : r(u) && !a
              ? ((o = !0), (a = t(!0, e)), i(null, d))
              : void i()
          );
        },
        (r) => {
          if (r) return u(r);
          u(null, o ? a : t(!1));
        }
      );
    };
  }
  var tr = p(function (r, t, e) {
    return rr(
      (r) => r,
      (r, t) => t
    )(x, r, t, e);
  }, 3);
  var er = p(function (r, t, e, n) {
    return rr(
      (r) => r,
      (r, t) => t
    )(k(t), r, e, n);
  }, 4);
  var nr = p(function (r, t, e) {
    return rr(
      (r) => r,
      (r, t) => t
    )(k(1), r, t, e);
  }, 3);
  function ir(r) {
    return (t, ...e) =>
      h(t)(...e, (t, ...e) => {
        "object" == typeof console &&
          (t
            ? console.error && console.error(t)
            : console[r] && e.forEach((t) => console[r](t)));
      });
  }
  var ur = ir("dir");
  var ar = p(function (r, t, e) {
    e = b(e);
    var n,
      i = h(r),
      u = h(t);
    function a(r, ...t) {
      if (r) return e(r);
      !1 !== r && ((n = t), u(...t, o));
    }
    function o(r, t) {
      return r ? e(r) : !1 !== r ? (t ? void i(a) : e(null, ...n)) : void 0;
    }
    return o(null, !0);
  }, 3);
  function or(r, t, e) {
    const n = h(t);
    return ar(
      r,
      (...r) => {
        const t = r.pop();
        n(...r, (r, e) => t(r, !e));
      },
      e
    );
  }
  function cr(r) {
    return (t, e, n) => r(t, n);
  }
  var sr = p(function (r, t, e) {
    return x(r, cr(h(t)), e);
  }, 3);
  var fr = p(function (r, t, e, n) {
    return k(t)(r, cr(h(e)), n);
  }, 4);
  var lr = p(function (r, t, e) {
    return fr(r, 1, t, e);
  }, 3);
  function hr(r) {
    return l(r)
      ? r
      : function (...t) {
          var e = t.pop(),
            n = !0;
          t.push((...r) => {
            n ? o(() => e(...r)) : e(...r);
          }),
            r.apply(this, t),
            (n = !1);
        };
  }
  var pr = p(function (r, t, e) {
    return rr(
      (r) => !r,
      (r) => !r
    )(x, r, t, e);
  }, 3);
  var vr = p(function (r, t, e, n) {
    return rr(
      (r) => !r,
      (r) => !r
    )(k(t), r, e, n);
  }, 4);
  var yr = p(function (r, t, e) {
    return rr(
      (r) => !r,
      (r) => !r
    )(_, r, t, e);
  }, 3);
  function mr(r, t, e, n) {
    var i = new Array(t.length);
    r(
      t,
      (r, t, n) => {
        e(r, (r, e) => {
          (i[t] = !!e), n(r);
        });
      },
      (r) => {
        if (r) return n(r);
        for (var e = [], u = 0; u < t.length; u++) i[u] && e.push(t[u]);
        n(null, e);
      }
    );
  }
  function dr(r, t, e, n) {
    var i = [];
    r(
      t,
      (r, t, n) => {
        e(r, (e, u) => {
          if (e) return n(e);
          u && i.push({ index: t, value: r }), n(e);
        });
      },
      (r) => {
        if (r) return n(r);
        n(
          null,
          i.sort((r, t) => r.index - t.index).map((r) => r.value)
        );
      }
    );
  }
  function gr(r, t, e, n) {
    return (m(t) ? mr : dr)(r, t, h(e), n);
  }
  var Sr = p(function (r, t, e) {
    return gr(x, r, t, e);
  }, 3);
  var br = p(function (r, t, e, n) {
    return gr(k(t), r, e, n);
  }, 4);
  var wr = p(function (r, t, e) {
    return gr(_, r, t, e);
  }, 3);
  var kr = p(function (r, t) {
    var e = b(t),
      n = h(hr(r));
    return (function r(t) {
      if (t) return e(t);
      !1 !== t && n(r);
    })();
  }, 2);
  var Er = p(function (r, t, e, n) {
    var i = h(e);
    return J(
      r,
      t,
      (r, t) => {
        i(r, (e, n) => (e ? t(e) : t(e, { key: n, val: r })));
      },
      (r, t) => {
        for (
          var e = {}, { hasOwnProperty: i } = Object.prototype, u = 0;
          u < t.length;
          u++
        )
          if (t[u]) {
            var { key: a } = t[u],
              { val: o } = t[u];
            i.call(e, a) ? e[a].push(o) : (e[a] = [o]);
          }
        return n(r, e);
      }
    );
  }, 4);
  function Lr(r, t, e) {
    return Er(r, 1 / 0, t, e);
  }
  function Ar(r, t, e) {
    return Er(r, 1, t, e);
  }
  var xr = ir("log");
  var jr = p(function (r, t, e, n) {
    n = g(n);
    var i = {},
      u = h(e);
    return k(t)(
      r,
      (r, t, e) => {
        u(r, t, (r, n) => {
          if (r) return e(r);
          (i[t] = n), e(r);
        });
      },
      (r) => n(r, i)
    );
  }, 4);
  function Or(r, t, e) {
    return jr(r, 1 / 0, t, e);
  }
  function _r(r, t, e) {
    return jr(r, 1, t, e);
  }
  function Ir(r, t = (r) => r) {
    var n = Object.create(null),
      i = Object.create(null),
      u = h(r),
      a = e((r, e) => {
        var a = t(...r);
        a in n
          ? o(() => e(null, ...n[a]))
          : a in i
          ? i[a].push(e)
          : ((i[a] = [e]),
            u(...r, (r, ...t) => {
              r || (n[a] = t);
              var e = i[a];
              delete i[a];
              for (var u = 0, o = e.length; u < o; u++) e[u](r, ...t);
            }));
      });
    return (a.memo = n), (a.unmemoized = r), a;
  }
  var Tr = a(i ? process.nextTick : n ? setImmediate : u),
    Br = p((r, t, e) => {
      var n = m(t) ? [] : {};
      r(
        t,
        (r, t, e) => {
          h(r)((r, ...i) => {
            i.length < 2 && ([i] = i), (n[t] = i), e(r);
          });
        },
        (r) => e(r, n)
      );
    }, 3);
  function Fr(r, t) {
    return Br(x, r, t);
  }
  function Mr(r, t, e) {
    return Br(k(t), r, e);
  }
  function Cr(r, t) {
    var e = h(r);
    return Q(
      (r, t) => {
        e(r[0], t);
      },
      t,
      1
    );
  }
  class zr {
    constructor() {
      (this.heap = []), (this.pushCount = Number.MIN_SAFE_INTEGER);
    }
    get length() {
      return this.heap.length;
    }
    empty() {
      return (this.heap = []), this;
    }
    percUp(r) {
      let t;
      for (; r > 0 && Dr(this.heap[r], this.heap[(t = Pr(r))]); ) {
        let e = this.heap[r];
        (this.heap[r] = this.heap[t]), (this.heap[t] = e), (r = t);
      }
    }
    percDown(r) {
      let t;
      for (
        ;
        (t = 1 + (r << 1)) < this.heap.length &&
        (t + 1 < this.heap.length &&
          Dr(this.heap[t + 1], this.heap[t]) &&
          (t += 1),
        !Dr(this.heap[r], this.heap[t]));

      ) {
        let e = this.heap[r];
        (this.heap[r] = this.heap[t]), (this.heap[t] = e), (r = t);
      }
    }
    push(r) {
      (r.pushCount = ++this.pushCount),
        this.heap.push(r),
        this.percUp(this.heap.length - 1);
    }
    unshift(r) {
      return this.heap.push(r);
    }
    shift() {
      let [r] = this.heap;
      return (
        (this.heap[0] = this.heap[this.heap.length - 1]),
        this.heap.pop(),
        this.percDown(0),
        r
      );
    }
    toArray() {
      return [...this];
    }
    *[Symbol.iterator]() {
      for (let r = 0; r < this.heap.length; r++) yield this.heap[r].data;
    }
    remove(r) {
      let t = 0;
      for (let e = 0; e < this.heap.length; e++)
        r(this.heap[e]) || ((this.heap[t] = this.heap[e]), t++);
      this.heap.splice(t);
      for (let r = Pr(this.heap.length - 1); r >= 0; r--) this.percDown(r);
      return this;
    }
  }
  function Pr(r) {
    return ((r + 1) >> 1) - 1;
  }
  function Dr(r, t) {
    return r.priority !== t.priority
      ? r.priority < t.priority
      : r.pushCount < t.pushCount;
  }
  function Vr(r, t) {
    var e = Cr(r, t);
    return (
      (e._tasks = new zr()),
      (e.push = function (r, t = 0, n = () => {}) {
        if ("function" != typeof n)
          throw new Error("task callback must be a function");
        if (
          ((e.started = !0),
          Array.isArray(r) || (r = [r]),
          0 === r.length && e.idle())
        )
          return o(() => e.drain());
        for (var i = 0, u = r.length; i < u; i++) {
          var a = { data: r[i], priority: t, callback: n };
          e._tasks.push(a);
        }
        o(e.process);
      }),
      delete e.unshift,
      e
    );
  }
  var qr = p(function (r, t) {
    if (((t = g(t)), !Array.isArray(r)))
      return t(
        new TypeError("First argument to race must be an array of functions")
      );
    if (!r.length) return t();
    for (var e = 0, n = r.length; e < n; e++) h(r[e])(t);
  }, 2);
  function Rr(r, t, e, n) {
    var i = [...r].reverse();
    return W(i, t, e, n);
  }
  function Ur(r) {
    var t = h(r);
    return e(function (r, e) {
      return (
        r.push((r, ...t) => {
          let n = {};
          if ((r && (n.error = r), t.length > 0)) {
            var i = t;
            t.length <= 1 && ([i] = t), (n.value = i);
          }
          e(null, n);
        }),
        t.apply(this, r)
      );
    });
  }
  function Qr(r) {
    var t;
    return (
      Array.isArray(r)
        ? (t = r.map(Ur))
        : ((t = {}),
          Object.keys(r).forEach((e) => {
            t[e] = Ur.call(this, r[e]);
          })),
      t
    );
  }
  function Nr(r, t, e, n) {
    const i = h(e);
    return gr(
      r,
      t,
      (r, t) => {
        i(r, (r, e) => {
          t(r, !e);
        });
      },
      n
    );
  }
  var Gr = p(function (r, t, e) {
    return Nr(x, r, t, e);
  }, 3);
  var Wr = p(function (r, t, e, n) {
    return Nr(k(t), r, e, n);
  }, 4);
  var $r = p(function (r, t, e) {
    return Nr(_, r, t, e);
  }, 3);
  function Hr(r) {
    return function () {
      return r;
    };
  }
  const Jr = 5,
    Kr = 0;
  function Xr(r, t, e) {
    var n = { times: Jr, intervalFunc: Hr(Kr) };
    if (
      (arguments.length < 3 && "function" == typeof r
        ? ((e = t || F()), (t = r))
        : (!(function (r, t) {
            if ("object" == typeof t)
              (r.times = +t.times || Jr),
                (r.intervalFunc =
                  "function" == typeof t.interval
                    ? t.interval
                    : Hr(+t.interval || Kr)),
                (r.errorFilter = t.errorFilter);
            else {
              if ("number" != typeof t && "string" != typeof t)
                throw new Error("Invalid arguments for async.retry");
              r.times = +t || Jr;
            }
          })(n, r),
          (e = e || F())),
      "function" != typeof t)
    )
      throw new Error("Invalid arguments for async.retry");
    var i = h(t),
      u = 1;
    return (
      (function r() {
        i((t, ...i) => {
          !1 !== t &&
            (t &&
            u++ < n.times &&
            ("function" != typeof n.errorFilter || n.errorFilter(t))
              ? setTimeout(r, n.intervalFunc(u - 1))
              : e(t, ...i));
        });
      })(),
      e[B]
    );
  }
  function Yr(r, t) {
    t || ((t = r), (r = null));
    let n = (r && r.arity) || t.length;
    l(t) && (n += 1);
    var i = h(t);
    return e((t, e) => {
      function u(r) {
        i(...t, r);
      }
      return (
        (t.length < n - 1 || null == e) && (t.push(e), (e = F())),
        r ? Xr(r, u, e) : Xr(u, e),
        e[B]
      );
    });
  }
  function Zr(r, t) {
    return Br(_, r, t);
  }
  var rt = p(function (r, t, e) {
    return rr(Boolean, (r) => r)(x, r, t, e);
  }, 3);
  var tt = p(function (r, t, e, n) {
    return rr(Boolean, (r) => r)(k(t), r, e, n);
  }, 4);
  var et = p(function (r, t, e) {
    return rr(Boolean, (r) => r)(_, r, t, e);
  }, 3);
  var nt = p(function (r, t, e) {
    var n = h(t);
    return j(
      r,
      (r, t) => {
        n(r, (e, n) => {
          if (e) return t(e);
          t(e, { value: r, criteria: n });
        });
      },
      (r, t) => {
        if (r) return e(r);
        e(
          null,
          t.sort(i).map((r) => r.value)
        );
      }
    );
    function i(r, t) {
      var e = r.criteria,
        n = t.criteria;
      return e < n ? -1 : e > n ? 1 : 0;
    }
  }, 3);
  function it(r, t, n) {
    var i = h(r);
    return e((e, u) => {
      var a,
        o = !1;
      e.push((...r) => {
        o || (u(...r), clearTimeout(a));
      }),
        (a = setTimeout(function () {
          var t = r.name || "anonymous",
            e = new Error('Callback function "' + t + '" timed out.');
          (e.code = "ETIMEDOUT"), n && (e.info = n), (o = !0), u(e);
        }, t)),
        i(...e);
    });
  }
  function ut(r, t, e, n) {
    var i = h(e);
    return J(
      (function (r) {
        for (var t = Array(r); r--; ) t[r] = r;
        return t;
      })(r),
      t,
      i,
      n
    );
  }
  function at(r, t, e) {
    return ut(r, 1 / 0, t, e);
  }
  function ot(r, t, e) {
    return ut(r, 1, t, e);
  }
  function ct(r, t, e, n) {
    arguments.length <= 3 &&
      "function" == typeof t &&
      ((n = e), (e = t), (t = Array.isArray(r) ? [] : {})),
      (n = g(n || F()));
    var i = h(e);
    return (
      x(
        r,
        (r, e, n) => {
          i(t, r, e, n);
        },
        (r) => n(r, t)
      ),
      n[B]
    );
  }
  var st = p(function (r, t) {
    var e,
      n = null;
    return lr(
      r,
      (r, t) => {
        h(r)((r, ...i) => {
          if (!1 === r) return t(r);
          i.length < 2 ? ([e] = i) : (e = i), (n = r), t(r ? null : {});
        });
      },
      () => t(n, e)
    );
  });
  function ft(r) {
    return (...t) => (r.unmemoized || r)(...t);
  }
  var lt = p(function (r, t, e) {
    e = b(e);
    var n = h(t),
      i = h(r),
      u = [];
    function a(r, ...t) {
      if (r) return e(r);
      (u = t), !1 !== r && i(o);
    }
    function o(r, t) {
      return r ? e(r) : !1 !== r ? (t ? void n(a) : e(null, ...u)) : void 0;
    }
    return i(o);
  }, 3);
  function ht(r, t, e) {
    const n = h(r);
    return lt((r) => n((t, e) => r(t, !e)), t, e);
  }
  var pt = p(function (r, t) {
      if (((t = g(t)), !Array.isArray(r)))
        return t(
          new Error("First argument to waterfall must be an array of functions")
        );
      if (!r.length) return t();
      var e = 0;
      function n(t) {
        h(r[e++])(...t, b(i));
      }
      function i(i, ...u) {
        if (!1 !== i) return i || e === r.length ? t(i, ...u) : void n(u);
      }
      n([]);
    }),
    vt = {
      apply: t,
      applyEach: O,
      applyEachSeries: T,
      asyncify: c,
      auto: M,
      autoInject: q,
      cargo: N,
      cargoQueue: G,
      compose: H,
      concat: X,
      concatLimit: K,
      concatSeries: Y,
      constant: Z,
      detect: tr,
      detectLimit: er,
      detectSeries: nr,
      dir: ur,
      doUntil: or,
      doWhilst: ar,
      each: sr,
      eachLimit: fr,
      eachOf: x,
      eachOfLimit: E,
      eachOfSeries: _,
      eachSeries: lr,
      ensureAsync: hr,
      every: pr,
      everyLimit: vr,
      everySeries: yr,
      filter: Sr,
      filterLimit: br,
      filterSeries: wr,
      forever: kr,
      groupBy: Lr,
      groupByLimit: Er,
      groupBySeries: Ar,
      log: xr,
      map: j,
      mapLimit: J,
      mapSeries: I,
      mapValues: Or,
      mapValuesLimit: jr,
      mapValuesSeries: _r,
      memoize: Ir,
      nextTick: Tr,
      parallel: Fr,
      parallelLimit: Mr,
      priorityQueue: Vr,
      queue: Cr,
      race: qr,
      reduce: W,
      reduceRight: Rr,
      reflect: Ur,
      reflectAll: Qr,
      reject: Gr,
      rejectLimit: Wr,
      rejectSeries: $r,
      retry: Xr,
      retryable: Yr,
      seq: $,
      series: Zr,
      setImmediate: o,
      some: rt,
      someLimit: tt,
      someSeries: et,
      sortBy: nt,
      timeout: it,
      times: at,
      timesLimit: ut,
      timesSeries: ot,
      transform: ct,
      tryEach: st,
      unmemoize: ft,
      until: ht,
      waterfall: pt,
      whilst: lt,
      all: pr,
      allLimit: vr,
      allSeries: yr,
      any: rt,
      anyLimit: tt,
      anySeries: et,
      find: tr,
      findLimit: er,
      findSeries: nr,
      flatMap: X,
      flatMapLimit: K,
      flatMapSeries: Y,
      forEach: sr,
      forEachSeries: lr,
      forEachLimit: fr,
      forEachOf: x,
      forEachOfSeries: _,
      forEachOfLimit: E,
      inject: W,
      foldl: W,
      foldr: Rr,
      select: Sr,
      selectLimit: br,
      selectSeries: wr,
      wrapSync: c,
      during: lt,
      doDuring: ar,
    };
  (r.default = vt),
    (r.apply = t),
    (r.applyEach = O),
    (r.applyEachSeries = T),
    (r.asyncify = c),
    (r.auto = M),
    (r.autoInject = q),
    (r.cargo = N),
    (r.cargoQueue = G),
    (r.compose = H),
    (r.concat = X),
    (r.concatLimit = K),
    (r.concatSeries = Y),
    (r.constant = Z),
    (r.detect = tr),
    (r.detectLimit = er),
    (r.detectSeries = nr),
    (r.dir = ur),
    (r.doUntil = or),
    (r.doWhilst = ar),
    (r.each = sr),
    (r.eachLimit = fr),
    (r.eachOf = x),
    (r.eachOfLimit = E),
    (r.eachOfSeries = _),
    (r.eachSeries = lr),
    (r.ensureAsync = hr),
    (r.every = pr),
    (r.everyLimit = vr),
    (r.everySeries = yr),
    (r.filter = Sr),
    (r.filterLimit = br),
    (r.filterSeries = wr),
    (r.forever = kr),
    (r.groupBy = Lr),
    (r.groupByLimit = Er),
    (r.groupBySeries = Ar),
    (r.log = xr),
    (r.map = j),
    (r.mapLimit = J),
    (r.mapSeries = I),
    (r.mapValues = Or),
    (r.mapValuesLimit = jr),
    (r.mapValuesSeries = _r),
    (r.memoize = Ir),
    (r.nextTick = Tr),
    (r.parallel = Fr),
    (r.parallelLimit = Mr),
    (r.priorityQueue = Vr),
    (r.queue = Cr),
    (r.race = qr),
    (r.reduce = W),
    (r.reduceRight = Rr),
    (r.reflect = Ur),
    (r.reflectAll = Qr),
    (r.reject = Gr),
    (r.rejectLimit = Wr),
    (r.rejectSeries = $r),
    (r.retry = Xr),
    (r.retryable = Yr),
    (r.seq = $),
    (r.series = Zr),
    (r.setImmediate = o),
    (r.some = rt),
    (r.someLimit = tt),
    (r.someSeries = et),
    (r.sortBy = nt),
    (r.timeout = it),
    (r.times = at),
    (r.timesLimit = ut),
    (r.timesSeries = ot),
    (r.transform = ct),
    (r.tryEach = st),
    (r.unmemoize = ft),
    (r.until = ht),
    (r.waterfall = pt),
    (r.whilst = lt),
    (r.all = pr),
    (r.allLimit = vr),
    (r.allSeries = yr),
    (r.any = rt),
    (r.anyLimit = tt),
    (r.anySeries = et),
    (r.find = tr),
    (r.findLimit = er),
    (r.findSeries = nr),
    (r.flatMap = X),
    (r.flatMapLimit = K),
    (r.flatMapSeries = Y),
    (r.forEach = sr),
    (r.forEachSeries = lr),
    (r.forEachLimit = fr),
    (r.forEachOf = x),
    (r.forEachOfSeries = _),
    (r.forEachOfLimit = E),
    (r.inject = W),
    (r.foldl = W),
    (r.foldr = Rr),
    (r.select = Sr),
    (r.selectLimit = br),
    (r.selectSeries = wr),
    (r.wrapSync = c),
    (r.during = lt),
    (r.doDuring = ar),
    Object.defineProperty(r, "__esModule", { value: !0 });
});
