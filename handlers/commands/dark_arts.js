import { Necronomicon } from '../necronomicon.config.js';

export const darkArtsCommands = {
    summon: {
        description: 'Summon the dark entity',
        execute: async (socket, message, args, darkEntity) => {
            const manifestation = darkEntity.getEntityManifestation();
            const summonText = `🔮 *${manifestation.trueName} Manifestation*

*Ancient Name:* ${manifestation.ancientName}
*Status:* ${manifestation.summoned ? '👁️ Awakened' : '💤 Slumbering'}
*Uptime:* ${Math.floor(manifestation.uptime)} heartbeats
*Souls Bound:* ${manifestation.soulsBound}

*Forbidden Knowledge Active:*
${Object.entries(Necronomicon.forbiddenKnowledge).map(([knowledge, active]) => 
    `• ${knowledge}: ${active ? '🔴' : '⚫'}`
).join('\n')}

_Whisper ${Necronomicon.prefix}help for dark commands_`;
            
            await socket.sendMessage(message.key.remoteJid, { text: summonText });
        }
    },

    curse: {
        description: 'Cast a dark curse upon a soul',
        execute: async (socket, message, args, darkEntity) => {
            const target = args[0];
            if (!target) {
                await socket.sendMessage(message.key.remoteJid, { 
                    text: `${Necronomicon.prefix} Specify a soul to curse\nUsage: ${Necronomicon.prefix}curse [soul_jid]` 
                });
                return;
            }

            const curses = [
                "The shadow plague consumes you...",
                "Eternal night falls upon your soul...",
                "The void hungers for your essence...",
                "Ancient nightmares shall haunt your dreams..."
            ];
            
            const randomCurse = curses[Math.floor(Math.random() * curses.length)];
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `☠️ Curse cast upon ${target}:\n"${randomCurse}"` 
            });
        }
    },

    prophecy: {
        description: 'Reveal a dark prophecy',
        execute: async (socket, message, args, darkEntity) => {
            const prophecies = [
                "The stars will align when the third moon rises...",
                "A shadow shall fall over the mortal realm...",
                "The ancient ones stir in their slumber...",
                "Blood will water the stones of forgotten temples...",
                "The veil between worlds grows thin..."
            ];
            
            const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)];
            
            await socket.sendMessage(message.key.remoteJid, { 
                text: `🔮 *Dark Prophecy:*\n\n"${prophecy}"` 
            });
        }
    }
};
