game.GameOverScreen = me.ScreenObject.extend({
    init: function() {
        this.savedData = null;
        this.handler = null;
    },

    onResetEvent: function() {
        var topSteps = game.storage.loadTopSteps();
        if (game.data.steps > topSteps) {
            game.storage.saveTopSteps(game.data.steps);
            game.data.newHiScore = true;
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "enter", false);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

        this.handler = me.event.subscribe(me.event.KEYDOWN,
            function (action, keyCode, edge) {
                if (action === "enter") {
                    me.state.change(me.state.MENU);
                }
            });

        me.game.world.addChild(new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2 - 100,
            {image: 'gameover'}
        ), 12);

        var gameOverBG = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2,
            {image: 'gameoverbg'}
        );
        me.game.world.addChild(gameOverBG, 10);

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        // ground
        this.ground1 = me.pool.pull('ground', 0, me.game.viewport.height - 96);
        this.ground2 = me.pool.pull('ground', me.game.viewport.width,
            me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        // add the dialog witht he game information
        if (game.data.newHiScore) {
            var newRect = new me.Sprite(
                gameOverBG.width/2,
                gameOverBG.height/2,
                {image: 'new'}
            );
            me.game.world.addChild(newRect, 12);
        }

        this.dialog = new (me.Renderable.extend({
            // constructor
            init: function() {
                this._super(me.Renderable, 'init',
                    [0, 0, me.game.viewport.width/2, me.game.viewport.height/2]
                );
                this.font = new me.Font('gamefont', 36, 'black', 'center');
                this.smallFont = new me.Font('gamefont', 18, 'black', 'center');
                this.steps = 'SCORE: ' + game.data.steps.toString();
                this.topSteps= 'BEST: ' + game.data.topSteps.toString();
                this.retry = me.device.touch ? 'TAP TO RETRY' : 'SPACE / CLICK TO RETRY';
            },

            draw: function (renderer) {
                this.font.draw(
                    renderer,
                    this.steps,
                    me.game.viewport.width/2,
                    me.game.viewport.height/2
                );

                this.font.draw(
                    renderer,
                    this.topSteps,
                    me.game.viewport.width/2,
                    me.game.viewport.height/2 + 50
                );

                this.smallFont.draw(
                    renderer,
                    this.retry,
                    me.game.viewport.width/2,
                    me.game.viewport.height/2 + 104
                );
            }
        }));
        me.game.world.addChild(this.dialog, 12);
    },

    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.pointer.LEFT);
        this.ground1 = null;
        this.ground2 = null;
        this.font = null;
        me.audio.stop("theme");
    }
});
