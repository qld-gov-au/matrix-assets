!(function (e) {
  var c = {};
  function t(n) {
    if (c[n]) return c[n].exports;
    var s = (c[n] = { i: n, l: !1, exports: {} });
    return e[n].call(s.exports, s, s.exports, t), (s.l = !0), s.exports;
  }
  (t.m = e),
    (t.c = c),
    (t.d = function (e, c, n) {
      t.o(e, c) ||
        Object.defineProperty(e, c, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (t.n = function (e) {
      var c =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(c, "a", c), c;
    }),
    (t.o = function (e, c) {
      return Object.prototype.hasOwnProperty.call(e, c);
    }),
    (t.p = ""),
    t((t.s = 0));
})([
  function (e, c, t) {
    "use strict";
    var n,
      s = t(1),
      i = (n = s) && n.__esModule ? n : { default: n };
    ({
      config: {
        $properties: $("input[name=property]"),
        $amount: $("#amount"),
        $calculate: $("#calculate"),
        $estimateBlock: $("#estimate"),
        $purchasePrice: $(".purchase-price"),
        $transferDutyPayable: $(".transfer-duty-payable"),
      },
      init: function () {
        this.getData();
      },
      methods: {
        calculate: function (e, c, t, n) {
          var s = e % 100 == 0 ? e : 100 * Math.ceil(e / 100),
            i = ((s - (n ? Math.round(n) : 0)) / 100) * c;
          return {
            purchasePrice: s,
            transferDuty: null !== c ? i + (t || 0) : 0,
          };
        },
        numberBetween: function (e, c) {
          var t = !e.purchasePrice.min || c >= e.purchasePrice.min,
            n = !e.purchasePrice.max || c <= e.purchasePrice.max;
          return t && n;
        },
      },
      updateViews: function (e) {
        this.config.$transferDutyPayable.html(
          e.transferDuty.toLocaleString(void 0, { minimumFractionDigits: 2 })
        );
      },
      getData: function () {
        var e = this;
        e.config.$calculate.on("click", function (c) {
          if (
            ($(this).trigger("x-height-change"),
            e.config.$properties.is(":checked") &&
              e.config.$amount.val().length > 0)
          ) {
            c.preventDefault();
            var t = parseFloat(e.config.$amount.val().replace(/[^\d.]+/g, ""));
            $(".status").hide(),
              e.config.$estimateBlock.show(),
              $("#home").is(":checked") || $("#first-home").is(":checked")
                ? e.home(
                    t,
                    i.default.properties.myHome,
                    i.default.properties.myFirstHome
                  )
                : ($("#property-type").is(":checked") ||
                    $("#vacant-land").is(":checked")) &&
                  e.propertyType(
                    t,
                    i.default.properties.anotherPropertyType,
                    i.default.properties.vacantLand
                  );
          }
        });
      },
      propertyType: function (e, c, t) {
        var n,
          s = this;
        function i() {
          $.each(c, function (c, t) {
            s.methods.numberBetween(t, e) &&
              (n = s.methods.calculate(
                e,
                t.dutyRate,
                t.dutyAdded,
                t.purchasePrice.min
              ));
          });
        }
        $("#property-type").is(":checked")
          ? i()
          : $("#vacant-land").is(":checked") &&
            (i(),
            $.each(t, function (c, t) {
              s.methods.numberBetween(t, e) &&
                (n.transferDuty =
                  "full" !== t.concession ? n.transferDuty - t.concession : 0);
            })),
          s.updateViews(n);
      },
      home: function (e, c, t) {
        var n,
          s = this;
        function i() {
          $.each(c, function (c, t) {
            s.methods.numberBetween(t, e) &&
              (n = s.methods.calculate(
                e,
                t.dutyRate,
                t.dutyAdded,
                t.purchasePrice.min
              ));
          });
        }
        $("#home").is(":checked")
          ? i()
          : $("#first-home").is(":checked") &&
            (i(),
            $.each(t, function (c, t) {
              if (s.methods.numberBetween(t, e)) {
                var i = n.transferDuty - t.concession;
                n.transferDuty = i < 0 ? 0 : i;
              }
            })),
          s.updateViews(n);
      },
    }.init());
  },
  function (e, c) {
    e.exports = {
      properties: {
        myHome: {
          step1: { purchasePrice: { max: 35e4 }, dutyRate: 1 },
          step2: {
            purchasePrice: { min: 350000.01, max: 54e4 },
            dutyAdded: 3500,
            dutyRate: 3.5,
          },
          step3: {
            purchasePrice: { min: 540000.01, max: 1e6 },
            dutyAdded: 10150,
            dutyRate: 4.5,
          },
          step4: {
            purchasePrice: { min: 1000000.01 },
            dutyAdded: 30850,
            dutyRate: 5.75,
          },
        },
        anotherPropertyType: {
          step1: { purchasePrice: { max: 5e3 }, dutyRate: null },
          step2: { purchasePrice: { min: 5000.01, max: 75e3 }, dutyRate: 1.5 },
          step3: {
            purchasePrice: { min: 75000.01, max: 54e4 },
            dutyAdded: 1050,
            dutyRate: 3.5,
          },
          step4: {
            purchasePrice: { min: 540000.01, max: 1e6 },
            dutyAdded: 17325,
            dutyRate: 4.5,
          },
          step5: {
            purchasePrice: { min: 1000000.01 },
            dutyAdded: 38025,
            dutyRate: 5.75,
          },
        },
        myFirstHome: {
          step1: { purchasePrice: { max: 504999.99 }, concession: 8750 },
          step2: {
            purchasePrice: { min: 505e3, max: 509999.99 },
            concession: 7875,
          },
          step3: {
            purchasePrice: { min: 51e4, max: 514999.99 },
            concession: 7e3,
          },
          step4: {
            purchasePrice: { min: 515e3, max: 519999.99 },
            concession: 6125,
          },
          step5: {
            purchasePrice: { min: 52e4, max: 524999.99 },
            concession: 5250,
          },
          step6: {
            purchasePrice: { min: 525e3, max: 529999.99 },
            concession: 4375,
          },
          step7: {
            purchasePrice: { min: 53e4, max: 534999.99 },
            concession: 3500,
          },
          step8: {
            purchasePrice: { min: 535e3, max: 539999.99 },
            concession: 2625,
          },
          step9: {
            purchasePrice: { min: 54e4, max: 544999.99 },
            concession: 1750,
          },
          step10: {
            purchasePrice: { min: 545e3, max: 549999.99 },
            concession: 875,
          },
          step11: { purchasePrice: { min: 55e4 }, concession: null },
        },
        vacantLand: {
          step1: { purchasePrice: { max: 25e4 }, concession: "full" },
          step2: {
            purchasePrice: { min: 250000.01, max: 259999.99 },
            concession: 7175,
          },
          step3: {
            purchasePrice: { min: 26e4, max: 269999.99 },
            concession: 6700,
          },
          step4: {
            purchasePrice: { min: 27e4, max: 279999.99 },
            concession: 6225,
          },
          step5: {
            purchasePrice: { min: 28e4, max: 289999.99 },
            concession: 5750,
          },
          step6: {
            purchasePrice: { min: 29e4, max: 299999.99 },
            concession: 5275,
          },
          step7: {
            purchasePrice: { min: 3e5, max: 309999.99 },
            concession: 4800,
          },
          step8: {
            purchasePrice: { min: 31e4, max: 319999.99 },
            concession: 4325,
          },
          step9: {
            purchasePrice: { min: 32e4, max: 329999.99 },
            concession: 3850,
          },
          step10: {
            purchasePrice: { min: 33e4, max: 339999.99 },
            concession: 3375,
          },
          step11: {
            purchasePrice: { min: 34e4, max: 349999.99 },
            concession: 2900,
          },
          step12: {
            purchasePrice: { min: 35e4, max: 359999.99 },
            concession: 2425,
          },
          step13: {
            purchasePrice: { min: 36e4, max: 369999.99 },
            concession: 1950,
          },
          step14: {
            purchasePrice: { min: 37e4, max: 379999.99 },
            concession: 1475,
          },
          step15: {
            purchasePrice: { min: 38e4, max: 389999.99 },
            concession: 1e3,
          },
          step16: {
            purchasePrice: { min: 39e4, max: 399999.99 },
            concession: 525,
          },
          step17: { purchasePrice: { min: 4e5 }, concession: 0 },
        },
      },
    };
  },
]);
//# sourceMappingURL=transferDuty.js.map
