//=============================================================================
// MBS - Sound Emittance MZ (v2.1.2)
//-----------------------------------------------------------------------------
// By Masked, adapted for RPG Maker MZ with enhancements.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.1.2] Makes events emit 3D positional audio that reacts to player movement and direction.
 * @author Masked, et al.
 * @url https://forums.rpgmakerweb.com/index.php
 *
 * @param Use HRTF
 * @text Use HRTF 3D Audio
 * @desc Choose whether to use the high-quality HRTF panning model for 3D sound positioning.
 * @type boolean
 * @default true
 *
 * @param 3D Sound
 * @text Enable 3D Sound
 * @desc Determines whether to use tridimensional sound positioning. If false, only volume changes with distance.
 * @type boolean
 * @default true
 *
 * @param Mono Sound
 * @text Force Mono Audio
 * @desc Forces all game audio to be mono. Useful for accessibility or specific audio setups.
 * @type boolean
 * @default false
 *
 * @param Audio Smoothing
 * @text Audio Smoothing Factor
 * @desc Controls the smoothness of position and volume transitions. 0.1 is very smooth, 1.0 is instant.
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 1
 * @default 0.15
 *
 * @command setBgsEmittance
 * @text Set BGS Emittance
 * @desc Sets or changes a Background Sound (BGS) emitted by an event.
 *
 * @arg eventId
 * @text Event
 * @desc The event to set the sound for. 0 for This Event.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg file
 * @text BGS File
 * @desc The Background Sound file to play from the event.
 * @type file
 * @dir audio/bgs
 * @require 1
 *
 * @arg radius
 * @text Radius
 * @desc The distance in tiles the sound can be heard from.
 * @type number
 * @decimals 1
 * @default 5
 *
 * @arg volume
 * @text Volume
 * @desc The base volume of the sound (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @arg pitch
 * @text Pitch
 * @desc The pitch of the sound (100 is normal).
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @command setBgmEmittance
 * @text Set BGM Emittance
 * @desc Sets or changes a Background Music (BGM) emitted by an event.
 *
 * @arg eventId
 * @text Event
 * @desc The event to set the sound for. 0 for This Event.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg file
 * @text BGM File
 * @desc The Background Music file to play from the event.
 * @type file
 * @dir audio/bgm
 * @require 1
 *
 * @arg radius
 * @text Radius
 * @desc The distance in tiles the sound can be heard from.
 * @type number
 * @decimals 1
 * @default 10
 *
 * @arg volume
 * @text Volume
 * @desc The base volume of the sound (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @arg pitch
 * @text Pitch
 * @desc The pitch of the sound (100 is normal).
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @command setSeEmittance
 * @text Set SE Emittance
 * @desc Sets or changes a Sound Effect (SE) emitted by an event.
 *
 * @arg eventId
 * @text Event
 * @desc The event to set the sound for. 0 for This Event.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg file
 * @text SE File
 * @desc The Sound Effect file to play from the event.
 * @type file
 * @dir audio/se
 * @require 1
 *
 * @arg radius
 * @text Radius
 * @desc The distance in tiles the sound can be heard from.
 * @type number
 * @decimals 1
 * @default 5
 *
 * @arg volume
 * @text Volume
 * @desc The base volume of the sound (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @arg pitch
 * @text Pitch
 * @desc The pitch of the sound (100 is normal).
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @command setMeEmittance
 * @text Set ME Emittance
 * @desc Sets or changes a Music Effect (ME) emitted by an event.
 *
 * @arg eventId
 * @text Event
 * @desc The event to set the sound for. 0 for This Event.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg file
 * @text ME File
 * @desc The Music Effect file to play from the event.
 * @type file
 * @dir audio/me
 * @require 1
 *
 * @arg radius
 * @text Radius
 * @desc The distance in tiles the sound can be heard from.
 * @type number
 * @decimals 1
 * @default 5
 *
 * @arg volume
 * @text Volume
 * @desc The base volume of the sound (0-100).
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @arg pitch
 * @text Pitch
 * @desc The pitch of the sound (100 is normal).
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @command clearEmittance
 * @text Clear Sound Emittance
 * @desc Stops and removes the sound emittance from an event.
 *
 * @arg eventId
 * @text Event
 * @desc The event to clear the sound from. 0 for This Event.
 * @type number
 * @min 0
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction (v2.1.2 for MZ)
 * ============================================================================
 * This plugin allows you to turn any event on your map into a source of sound.
 * As the player walks around and turns, the audio from the event will change
 * its volume and stereo position (panning) based on the player's distance
 * and orientation relative to the sound source.
 *
 * This version fixes a critical bug where the audio orientation was
 * incorrectly tied to the player's movement direction instead of their
 * facing direction. Now, moving backwards or strafing will result in correct
 * and intuitive audio panning.
 * ============================================================================
 * How to Use
 * ============================================================================
 * There are two ways to make an event emit sound:
 *
 * 1. Comment Tags (for static, non-changing sounds)
 *    Add a Comment command to an event's page with the following tags.
 *
 *    <s_emittance: folder/filename>
 *    Description: The sound to play. 'folder' is 'bgs', 'bgm', 'se', or 'me'.
 *    Example: <s_emittance: bgs/Drips>
 *
 *    <s_e_radius: N>
 *    Description: The radius in tiles. Example: <s_e_radius: 8.5>
 *
 *    <s_e_volume: V>
 *    Description: The base volume (0-100). Example: <s_e_volume: 75>
 *
 *    <s_e_pitch: P>
 *    Description: The base pitch (100 is normal). Example: <s_e_pitch: 95>
 *
 * 2. Plugin Commands (for dynamic sounds)
 *    Use plugin commands to turn sounds on or off conditionally. This is
 *    perfect for a campfire that you light, a machine you activate, etc.
 *
 *    There are four "Set" commands, one for each audio type (BGS, BGM, SE,
 *    ME). Using the correct one will conveniently open the file browser
 * a   in the right folder!
 *
 *    - Set BGS/BGM/SE/ME Emittance
 *    - Clear Sound Emittance
 */
(() => {
    'use strict';

    const pluginName = "MBS_SoundEmittance_MZ";

    const params = PluginManager.parameters(pluginName);
    const useHrtf = JSON.parse(params['Use HRTF'] || 'true');
    const use3dSound = JSON.parse(params['3D Sound'] || 'true');
    const useMonoSound = JSON.parse(params['Mono Sound'] || 'false');
    const smoothingFactor = parseFloat(params['Audio Smoothing'] || 0.15);
    
    let $_soundEmittances = [];

    const lerp = (start, end, amount) => start + (end - start) * amount;

    //=============================================================================
    // Plugin Command Handler
    //=============================================================================

    const handleSetEmittanceCommand = function(args, folder, interpreter) {
        const eventId = parseInt(args.eventId);
        const event = eventId > 0 ? $gameMap.event(eventId) : interpreter.character(0);
        
        if (event) {
            const filePath = `${folder}/${args.file}`;
            const radius = parseFloat(args.radius);
            const volume = parseInt(args.volume);
            const pitch = parseInt(args.pitch);
            event.setSoundEmittance(filePath, radius, volume, pitch);
        }
    };

    PluginManager.registerCommand(pluginName, "setBgsEmittance", function(args) {
        handleSetEmittanceCommand(args, "bgs", this);
    });
    PluginManager.registerCommand(pluginName, "setBgmEmittance", function(args) {
        handleSetEmittanceCommand(args, "bgm", this);
    });
    PluginManager.registerCommand(pluginName, "setSeEmittance", function(args) {
        handleSetEmittanceCommand(args, "se", this);
    });
    PluginManager.registerCommand(pluginName, "setMeEmittance", function(args) {
        handleSetEmittanceCommand(args, "me", this);
    });

    PluginManager.registerCommand(pluginName, "clearEmittance", function(args) {
        const eventId = parseInt(args.eventId);
        const event = eventId > 0 ? $gameMap.event(eventId) : this.character(0);
        if (event) {
            event.clearSoundEmittance();
        }
    });

    //=============================================================================
    // WebAudio
    //=============================================================================

    const _WebAudio_initialize = WebAudio.initialize;
    WebAudio.initialize = function() {
        const result = _WebAudio_initialize.apply(this, arguments);
        if (result && this._context && useMonoSound) {
            this._context.destination.channelCount = 1;
        }
        return result;
    };

    Object.defineProperty(WebAudio.prototype, 'position', {
        get: function() { return this._position || [0, 0, 0]; },
        set: function(value) {
            this._position = value;
            if (this._pannerNode) {
                this._pannerNode.positionX.value = value[0] || 0;
                this._pannerNode.positionY.value = value[1] || 0;
                this._pannerNode.positionZ.value = value[2] || 0;
            }
        },
        configurable: true
    });

    const _WebAudio_clear = WebAudio.prototype.clear;
    WebAudio.prototype.clear = function() {
        _WebAudio_clear.apply(this, arguments);
        this.position = [0, 0, 0];
    };

    const _WebAudio__updatePanner = WebAudio.prototype._updatePanner;
    WebAudio.prototype._updatePanner = function() {
        _WebAudio__updatePanner.apply(this, arguments);
        if (this._pannerNode) {
            this._pannerNode.distanceModel = 'linear';
            if (useHrtf) {
                this._pannerNode.panningModel = 'HRTF';
            }
        }
    };

    //=============================================================================
    // Game_SoundEmittance (Data Class)
    //=============================================================================
    
    class Game_SoundEmittance {
        constructor(file, radius, volume, pitch) {
            this.filename = file;
            this.maxDistance = radius;
            this.baseVolume = volume / 100;
            this.pitch = pitch / 100;
            this.rawPosition = [0, 0];
            this.playParameters = [true, 0]; // loop, pos
            this.playing = false;
        }

        play() { this.playing = true; }
        stop() { this.playing = false; }
    }

    //=============================================================================
    // Game_Character
    //=============================================================================

    const _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function() {
        _Game_Character_initMembers.apply(this, arguments);
        this._sEmittance = null;
    };
    
    Game_Character.prototype.setSoundEmittance = function(file, radius, volume, pitch) {
        this.clearSoundEmittance();
        this._sEmittance = new Game_SoundEmittance(file, radius, volume, pitch);
        this.refreshSEmittance();
    };

    Game_Character.prototype.clearSoundEmittance = function() {
        if (this._sEmittance) {
            this._sEmittance.stop();
        }
        this._sEmittance = null;
    };

    Game_Character.prototype.refreshSEmittance = function() {
        if (this._sEmittance) {
            if ($_soundEmittances.some(e => e._evEmittance === this._sEmittance)) return;

            // Construct the full path with the correct audio extension.
            const url = `audio/${this._sEmittance.filename}${AudioManager.audioFileExt()}`;
            const emittance = new WebAudio(url);
            
            emittance._evEmittance = this._sEmittance;
            emittance.volume = this._sEmittance.baseVolume;
            emittance.pitch = this._sEmittance.pitch;
            emittance._hasStarted = false;
            
            $_soundEmittances.push(emittance);
        }
    };

    const _Game_Character_update = Game_Character.prototype.update;
    Game_Character.prototype.update = function() {
        _Game_Character_update.apply(this, arguments);
        this.updateSEmittance();
    };

    Game_Character.prototype.updateSEmittance = function() {
        if (this._sEmittance) {
            if (!this._sEmittance.playing) {
                this._sEmittance.play();
            }
            this._sEmittance.rawPosition = [this._realX - $gamePlayer._realX, this._realY - $gamePlayer._realY];
        }
    };

    //=============================================================================
    // Game_Event
    //=============================================================================
    
    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.apply(this, arguments);
        this.setupSEmittanceFromComment();
    };

    Game_Event.prototype.setupSEmittanceFromComment = function() {
        this.clearSoundEmittance();
        
        const page = this.page();
        if (!page) {
            return;
        }
        const list = page.list;
        
        let comments = "";
        for (const command of list) {
            if (command.code === 108 || command.code === 408) {
                comments += command.parameters[0] + "\n";
            }
        }

        const filenameMatch = /<s_emittance:\s*([^>]+)>/i.exec(comments);
        if (filenameMatch) {
            const filePath = filenameMatch[1].trim();

            const radiusMatch = /<s_e_radius:\s*(\d+(\.\d+)?)>/i.exec(comments);
            const volumeMatch = /<s_e_volume:\s*(\d+)>/i.exec(comments);
            const pitchMatch = /<s_e_pitch:\s*(\d+)>/i.exec(comments);

            const radius = radiusMatch ? parseFloat(radiusMatch[1]) : 5;
            const volume = volumeMatch ? parseInt(volumeMatch[1]) : 90;
            const pitch = pitchMatch ? parseInt(pitchMatch[1]) : 100;
            
            this.setSoundEmittance(filePath, radius, volume, pitch);
        }
    };

    //=============================================================================
    // Game_Map
    //=============================================================================

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        if ($_soundEmittances) {
            $_soundEmittances.forEach(e => e.stop());
        }
        $_soundEmittances = [];
        _Game_Map_setup.apply(this, arguments);
    };

    //=============================================================================
    // Scene_Map
    //=============================================================================
    
    const SoundEmittance = {
        getPlayerAngle() {
            // FIX: The listener's orientation must be tied to the player's FACING
            // direction, not their MOVEMENT direction. The original code used
            // Input.dir8, which caused incorrect panning when moving backwards.
            // $gamePlayer.direction() correctly stores the character's orientation.
            switch ($gamePlayer.direction()) {
                case 8: return 0;                       // Up (North)
                case 6: return Math.PI / 2;             // Right (East)
                case 2: return Math.PI;                 // Down (South)
                case 4: return 3 * Math.PI / 2;         // Left (West)
                // Diagonal directions could be added here if a plugin modifies player facing.
            }
            return 0; // Default facing North
        },
        transformCoordinates(deltaX, deltaY, playerAngleRad) {
            const cos = Math.cos(playerAngleRad);
            const sin = Math.sin(playerAngleRad);
            const pannerX = deltaX * cos + deltaY * sin;
            // FIX: The original formula inverted the front/back (Z-axis) positioning.
            // This corrected formula properly rotates the coordinates into the listener's space,
            // where the listener faces the negative Z-axis.
            const pannerZ = deltaY * cos - deltaX * sin;
            return { x: pannerX, z: pannerZ };
        }
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.apply(this, arguments);
        this.updateSoundEmittances();
    };

    Scene_Map.prototype.updateSoundEmittances = function() {
        if (!$_soundEmittances) return;
        
        const playerAngle = SoundEmittance.getPlayerAngle();

        for (let i = $_soundEmittances.length - 1; i >= 0; i--) {
            const emittance = $_soundEmittances[i];
            const source = emittance._evEmittance;

            if (!source || !source.playing) {
                emittance.stop();
                $_soundEmittances.splice(i, 1);
                continue;
            }
            
            const dx = source.rawPosition[0];
            const dy = source.rawPosition[1];
            
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = source.maxDistance > 0 ? source.maxDistance : 1;
            const targetVolume = source.baseVolume * Math.max(0, (maxDist - distance) / maxDist);
            let targetPosition = [0, 0, 0];

            if (use3dSound) {
                const coords = SoundEmittance.transformCoordinates(dx, dy, playerAngle);
                targetPosition = [coords.x, 0, coords.z];
            }
            
            if (!emittance._hasStarted && emittance.isReady()) {
                emittance._hasStarted = true;
                emittance.volume = targetVolume;
                if (use3dSound) emittance.position = targetPosition;
                emittance.play.apply(emittance, source.playParameters);
                if (emittance._pannerNode) {
                    emittance._pannerNode.maxDistance = source.maxDistance;
                }
            } else if (emittance._hasStarted && emittance.isPlaying()) {
                emittance.volume = lerp(emittance.volume, targetVolume, smoothingFactor);
                if (use3dSound) {
                    const newX = lerp(emittance.position[0], targetPosition[0], smoothingFactor);
                    const newZ = lerp(emittance.position[2], targetPosition[2], smoothingFactor);
                    emittance.position = [newX, 0, newZ];
                }
            }
        }
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.apply(this, arguments);
        // [FIX START]
        // This logic is being removed. Sound cleanup is already handled by the alias
        // on Game_Map.setup, which is the correct place for it as sounds are tied
        // to map events. Stopping sounds here can cause them to incorrectly stop
        // when opening a menu or other scenes that might terminate the map scene.
        /*
        if ($_soundEmittances) {
            $_soundEmittances.forEach(e => e.stop());
            $_soundEmittances = [];
        }
        */
        // [FIX END]
    };

})();