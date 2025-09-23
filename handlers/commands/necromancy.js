import { Necronomicon } from '../necronomicon.config.js';

export const necromancyCommands = {
    souls: {
        description: 'Count bound souls',
        execute: async (socket, message, args, darkEntity) => {
            const soulCount = darkEntity.soulBinder ? darkEntity.soulBinder.countBoundSouls() : 13;
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `👻 *Soul Collection*\n\n*Bound Souls:* ${soulCount}\n*Souls Required for Ascension:* ${666 - soulCount}\n\n_The dark entity hungers for more..._` 
            });
        }
    },

    ritual: {
        description: 'Perform a dark ritual',
        execute: async (socket, message, args, darkEntity) => {
            await darkEntity.performBloodRitual();
            
            const rituals = [
                "Blood moon invocation",
                "Shadow binding ceremony",
                "Void gateway opening",
                "Soul harvest ritual",
                "Ancient awakening"
            ];
            
            const ritual = rituals[Math.floor(Math.random() * rituals.length)];
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `🕯️ *Dark Ritual Performed:* ${ritual}\n\nThe ancient powers grow stronger...` 
            });
        }
    },

    sacrifice: {
        description: 'Offer a sacrifice to the dark ones',
        execute: async (socket, message, args, darkEntity) => {
            const sacrifice = args.join(' ') || "a mortal soul";
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `⚰️ *Sacrifice Offered:* ${sacrifice}\n\nThe ancient ones are pleased... for now.` 
            });
        }
    }
};
