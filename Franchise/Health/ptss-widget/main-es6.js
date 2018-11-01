// This file is written according to the ES6 specifications. Use https://babeljs.io/en/repl to convert

'use strict';

var ptssWidget = {
    config: {
        $ptssWidget: $('.ptss-widget'),
        $continueBtn: $('#widget-continue'),
        $cancelBtn: $('#cancel-choices'),
        $body: $('body'),
        $questionsSec : $(".ques-section")
    },
    init (){
        var self = this;
        var counter = 1;
        var steps = self.data().length;
        var initialPer = 0;
        var progressPer = 100/steps;
        var checkTrigger = false;
        var makeHeading = () => {
            return `<h3>${self.data()[counter-1].Ques} ${self.data()[counter-1].linkText ? `<a class="acc-modal-box" href="${self.data()[counter-1].link}">${self.data()[counter-1].linkText}</a>` : ``} ?</h3>`;
        };
        var makeQuesSection = () => {
            var prepareQuesBlk = makeHeading();
            prepareQuesBlk+= self.markup().choices();
            prepareQuesBlk += `<p class="step-indicator">Question ${counter} of ${self.data().length}</p>${self.markup().progressBar(initialPer+=progressPer)}${self.markup().cancel()}`;
            return prepareQuesBlk;
        };
        self.config.$ptssWidget.find(self.config.$continueBtn).click((evt) => {
            evt.preventDefault();
            $(this).remove();
            self.config.$questionsSec.html(makeQuesSection());
            counter++;
        });
        self.config.$body.on('click', '#yes', (evt) => {
            evt.preventDefault();
            if(checkTrigger === true) counter++;
            if(counter <= self.data().length){
                self.config.$questionsSec.html(makeQuesSection());
                counter++
            } else {
                self.config.$questionsSec.html(self.markup().approval());
            }
        });
        self.config.$body.on('click', '#no',  () => {
            checkTrigger = true;
            self.config.$questionsSec.html(self.markup().notEligible());
            counter--;
            initialPer-=progressPer;
        });
        self.config.$body.on('click', '#back',  () => {
            self.config.$questionsSec.html(makeQuesSection());
        });
        self.config.$body.on('click', '#cancel-choices', (event) => {
            event.preventDefault();
            location.reload();
        });
        self.config.$body.on('click', '.acc-modal-box',  (event) => {
            event.preventDefault();
            $.fancybox.open(`<div class="modal-box"><i class="fa fa-spinner fa-spin" style="font-size: 3em;"></i></div>`);
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'html',
                success: (html) => {
                    var $heading = $(html).find('.qg-accordion').find('article:nth-child(2) h2');
                    var $description = $(html).find('.qg-accordion').find('article:nth-child(2) .collapsing-section');
                    $('.modal-box').find('.fa').remove().end().append(`${$heading.html()} <br /><br /> ${$description.html()}`);
                }
            });
        });
    },
    markup () {
        var progressBar = (percent) => {
            return  `<div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:${percent}%">
                      <span class="sr-only">${percent}% Complete</span>
                    </div>
                </div>`
        };
        var cancel =  () => {
            return  `<p class="text-right"><small><a href= '#' id="cancel-choices">Cancel</a></small></p>`
        };
        var choices = () => {
            return `<div class="choices">
                            <button class="btn btn-default btn-block" id="yes">Yes</button>
                            <button class="btn btn-default btn-block" id="no">No</button>
                      </div>`;
        };
        var approval = () => {
            return `<div class="approval">
                        <h3>Based on your response you may be eligible for PTSS</h3>
                        <ul>
                            <li><a href="./?a=3512">Learn more PTSS subsidies</a></li>
                            <li><a href="./?a=34365">Find out about the PTSS process</a></li>
                        </ul><br>
                        <a class="btn btn-block btn-primary" href="./?a=34365?#ptss-submit-application">Complete PTSS application</a>
                    </div>`
        };
        var notEligible = () => {
            return `<div class="not-eligible">
                        <h3>Based on you responses you may not be eligible for PTSS</h3>
                        <p>You can:</p>
                        <ul>
                            <li><a href="./?a=34365?#ptss-check-eligibility">Read the PTSS eligibility criteria</a></li>
                            <li><a href="./?a=3512">Learn about PTSS subsidies</a></li>
                            <li><a href="./?a=40208">Contact your local health facility for more information</a></li>
                        </ul><br>
                        <button class="btn btn-block btn-default" id="back">Back</button>
                    </div>`
        };
        return {
            progressBar: progressBar,
            choices : choices,
            approval: approval,
            notEligible : notEligible,
            cancel : cancel
        }
    },
    data () {
        return [{
            "Ques": "Are you a Queensland resident",
        }, {
            "Ques": "Are you eligible for Medicare"
        }, {
            "Ques": "Have you been referred for a specialist medical services not available at your closest public health facility",
        }, {
            "Ques": "Is your referral for a specialist more than 50km from your closest public health facility",
        }, {
            "Ques": "Is your referral for an",
            "linkText": "eligible PTSS specialist medical service",
            "link": "/health/accordion.html"
        }];
    }
};

ptssWidget.init();
