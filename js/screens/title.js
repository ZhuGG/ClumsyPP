game.TitleScreen = me.ScreenObject.extend({
    init: function(){
        this._super(me.ScreenObject, 'init');
        this.font = null;
        this.ground1 = null;
        this.ground2 = null;
        this.logo = null;
        this.showCredits = false;
    },

    onResetEvent: function() {
        me.audio.stop("theme");
        game.data.newHiScore = false;
        this.showCredits = false;

        me.game.world.addChild(new BackgroundLayer('bg', 1));
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "enter", true);
        me.input.bindKey(me.input.KEY.C, "credits", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                me.state.change(me.state.PLAY);
            } else if (action === "credits") {
                that.showCredits = !that.showCredits;
            }
        });

        //logo
        this.logo = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2 - 20,
            {image: 'logo'}
        );
        me.game.world.addChild(this.logo, 10);

        var that = this;
        var logoTween = me.pool.pull("me.Tween", this.logo.pos)
            .to({y: me.game.viewport.height/2 - 100}, 1000)
            .easing(me.Tween.Easing.Exponential.InOut).start();

        this.ground1 = me.pool.pull("ground", 0, me.video.renderer.getHeight() - 96);
        this.ground2 = me.pool.pull("ground", me.video.renderer.getWidth(),
                                    me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init: function() {
                // size does not matter, it's just to avoid having a zero size
                // renderable
                this._super(me.Renderable, 'init', [0, 0, 100, 100]);
                this.font = new me.Font('gamefont', 18, '#000', 'center');
                this.smallFont = new me.Font('gamefont', 14, '#000', 'center');
            },
            draw: function (renderer) {
                var centerX = me.game.viewport.width / 2;
                var startText = me.device.touch ?
                    'TAP TO START' :
                    'SPACE / CLICK TO START';
                var toolsText = 'M: MUTE   C: CREDITS';
                var bestText = 'BEST: ' + game.data.topSteps;
                this.font.draw(renderer, startText, centerX, me.game.viewport.height/2 + 48);
                this.smallFont.draw(renderer, toolsText, centerX, me.game.viewport.height/2 + 82);
                this.smallFont.draw(renderer, bestText, centerX, me.game.viewport.height/2 + 112);

                if (that.showCredits) {
                    this.font.draw(renderer, game.meta.title, centerX, 410);
                    this.smallFont.draw(renderer, game.meta.originalCredit, centerX, 438);
                    this.smallFont.draw(renderer, game.meta.musicCredit, centerX, 462);
                }
            }
        })), 12);
    },

    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindKey(me.input.KEY.C);
        me.input.unbindPointer(me.input.pointer.LEFT);
        this.ground1 = null;
        this.ground2 = null;
        me.game.world.removeChild(this.logo);
        this.logo = null;
    }
});
