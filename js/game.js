var game = {
    data: {
        score : 0,
        steps: 0,
        start: false,
        newHiScore: false,
        muted: false,
        topSteps: 0
    },

    meta: {
        title: "ClumsyPP",
        musicCredit: "Music: https://www.youtube.com/watch?v=mCjLODPPLWk",
        originalCredit: "Based on Clumsy Bird by Ellison Leao"
    },

    storage: {
        key: "clumsypp.topSteps",

        loadTopSteps: function() {
            var value = 0;
            try {
                if (typeof localStorage !== "undefined") {
                    value = parseInt(localStorage.getItem(this.key), 10) || 0;
                }
            } catch (e) {
                value = 0;
            }
            game.data.topSteps = value;
            return value;
        },

        saveTopSteps: function(value) {
            game.data.topSteps = value;
            try {
                if (typeof localStorage !== "undefined") {
                    localStorage.setItem(this.key, value);
                }
            } catch (e) {
                return;
            }
        }
    },

    fullscreen: {
        button: null,

        init: function() {
            this.button = document.getElementById("fullscreen-toggle");
            if (!this.button || !this.isSupported() || !this.isMobileLike()) {
                return;
            }

            document.body.classList.add("fullscreen-supported");
            this.button.addEventListener("click", this.toggle.bind(this));
            document.addEventListener("fullscreenchange", this.sync.bind(this));
            document.addEventListener("webkitfullscreenchange", this.sync.bind(this));
            this.sync();
        },

        isMobileLike: function() {
            return window.matchMedia("(hover: none), (pointer: coarse)").matches ||
                /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        },

        isSupported: function() {
            var target = document.documentElement;
            return !!(target.requestFullscreen || target.webkitRequestFullscreen);
        },

        currentElement: function() {
            return document.fullscreenElement || document.webkitFullscreenElement;
        },

        toggle: function() {
            if (this.currentElement()) {
                this.exit();
            } else {
                this.enter();
            }
        },

        enter: function() {
            var target = document.documentElement;
            var request = target.requestFullscreen || target.webkitRequestFullscreen;

            if (!request) {
                return;
            }

            Promise.resolve(request.call(target)).then(function() {
                game.fullscreen.lockLandscape();
                game.fullscreen.sync();
            }).catch(function() {
                game.fullscreen.sync();
            });
        },

        exit: function() {
            var exit = document.exitFullscreen || document.webkitExitFullscreen;

            if (exit) {
                exit.call(document);
            }
        },

        lockLandscape: function() {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape").catch(function() {});
            }
        },

        sync: function() {
            var active = !!this.currentElement();
            document.body.classList.toggle("fullscreen-active", active);
            if (this.button) {
                this.button.textContent = active ? "Exit" : "Fullscreen";
                this.button.setAttribute(
                    "aria-label",
                    active ? "Exit fullscreen" : "Enter fullscreen"
                );
            }
            window.setTimeout(function() {
                if (typeof Event === "function") {
                    window.dispatchEvent(new Event("resize"));
                } else {
                    var event = document.createEvent("Event");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                }
            }, 100);
        }
    },

    resources: [
            // images
        {name: "bg", type:"image", src: "data/img/bg.png"},
        {name: "clumsy", type:"image", src: "data/img/clumsy.png"},
        {name: "pipe", type:"image", src: "data/img/pipe.png"},
        {name: "logo", type:"image", src: "data/img/logo.png"},
        {name: "ground", type:"image", src: "data/img/ground.png"},
        {name: "gameover", type:"image", src: "data/img/gameover.png"},
        {name: "gameoverbg", type:"image", src: "data/img/gameoverbg.png"},
        {name: "hit", type:"image", src: "data/img/hit.png"},
        {name: "getready", type:"image", src: "data/img/getready.png"},
        {name: "new", type:"image", src: "data/img/new.png"},
        {name: "share", type:"image", src: "data/img/share.png"},
        {name: "tweet", type:"image", src: "data/img/tweet.png"},
        // sounds
        {name: "theme", type: "audio", src: "data/bgm/"},
        {name: "hit", type: "audio", src: "data/sfx/"},
        {name: "lose", type: "audio", src: "data/sfx/"},
        {name: "wing", type: "audio", src: "data/sfx/"},

    ],

    "onload": function() {
        game.fullscreen.init();

        if (!me.video.init(900, 600, {
            wrapper: "screen",
            scale : "auto",
            scaleMethod: "fit"
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        me.audio.init("mp3,ogg");
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    "loaded": function() {
        game.storage.loadTopSteps();

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAME_OVER, new game.GameOverScreen());

        me.input.bindKey(me.input.KEY.SPACE, "fly", true);
        me.input.bindKey(me.input.KEY.M, "mute", true);
        me.input.bindPointer(me.input.KEY.SPACE);

        me.pool.register("clumsy", game.BirdEntity);
        me.pool.register("pipe", game.PipeEntity, true);
        me.pool.register("hit", game.HitEntity, true);
        me.pool.register("ground", game.Ground, true);

        me.state.change(me.state.MENU);
    }
};
