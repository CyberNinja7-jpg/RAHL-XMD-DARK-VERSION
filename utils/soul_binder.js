import { darkLogger } from './dark_logger.js';

export class SoulBinder {
    constructor() {
        this.boundSouls = new Set();
        this.darkPacts = new Map();
    }

    async bindInitialSouls(socket) {
        // Bind master souls from configuration
        Necronomicon.boundSouls.forEach(soul => {
            this.bindSoul(soul, 'master');
        });
        
        darkLogger.blood(`🩸 ${this.boundSouls.size} master souls bound to the dark entity`);
    }

    bindSoul(soulJid, pactType = 'mortal') {
        this.boundSouls.add(soulJid);
        this.darkPacts.set(soulJid, {
            type: pactType,
            boundAt: new Date(),
            soulStrength: this.calculateSoulStrength(pactType)
        });
        
        darkLogger.ritual(`🔗 Soul bound: ${soulJid} (${pactType} pact)`);
    }

    countBoundSouls() {
        return this.boundSouls.size;
    }

    calculateSoulStrength(pactType) {
        const strengths = {
            'master': 100,
            'ancient': 75,
            'mortal': 25,
            'sacrifice': 50
        };
        return strengths[pactType] || 10;
    }
}
