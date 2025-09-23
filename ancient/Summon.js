import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { setupShadowHandlers } from '../handlers/shadowHandler.js';
import { darkLogger } from '../utils/dark_logger.js';
import { Necronomicon } from '../necronomicon.config.js';
import { SoulBinder } from '../utils/soul_binder.js';

export class DarkEntity {
    constructor() {
        this.socket = null;
        this.soulBinder = new SoulBinder();
        this.isSummoned = false;
        this.ritualsActive = 0;
    }

    async performSummoningRitual() {
        try {
            darkLogger.ritual('🔮 Beginning the ancient summoning ritual...');
            
            // Bind souls to the artifact
            const { state, saveSouls } = await useMultiFileAuthState('./artifacts/souls');
            const { version } = await fetchLatestBaileysVersion();
            
            // Create the dark gateway
            this.socket = makeWASocket({
                version,
                auth: state,
                printQRInTerminal: true,
                logger: Necronomicon.debugMode ? { level: 'debug' } : { level: 'warn' },
                browser: [Necronomicon.trueName, 'Abyss', Necronomicon.version],
                markOnlineOnConnect: true,
                syncFullHistory: false
            });

            // Establish shadow connections
            await setupShadowHandlers(this.socket, saveSouls, this);
            
            // Bind initial souls
            await this.soulBinder.bindInitialSouls(this.socket);
            
            this.isSummoned = true;
            darkLogger.blood('✅ Dark entity successfully summoned from the void');
            
            return this.socket;
            
        } catch (error) {
            darkLogger.curse('❌ The summoning circle breaks! Ancient forces resist:', error);
            throw error;
        }
    }

    async sendDarkWhisper(jid, content, options = {}) {
        if (!this.socket || !this.isSummoned) {
            throw new Error('The dark entity slumbers...');
        }
        
        try {
            return await this.socket.sendMessage(jid, content, options);
        } catch (error) {
            darkLogger.curse('👻 The whisper fails to reach its target:', error);
            throw error;
        }
    }

    // Ancient methods
    getEntityManifestation() {
        return {
            trueName: Necronomicon.trueName,
            ancientName: Necronomicon.ancientName,
            summoned: this.isSummoned,
            uptime: process.uptime(),
            soulsBound: this.soulBinder.countBoundSouls()
        };
    }

    async performBloodRitual() {
        this.ritualsActive++;
        darkLogger.blood('🩸 Blood ritual initiated...');
    }
}

export async function summonDarkEntity() {
    const darkOne = new DarkEntity();
    return await darkOne.performSummoningRitual();
}
