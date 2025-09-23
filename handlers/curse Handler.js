import { processAncientCommand } from '../commands/dark_arts.js';
import { darkLogger } from '../utils/dark_logger.js';
import { Necronomicon } from '../necronomicon.config.js';

export async function processDarkWhisper(socket, message, darkEntity) {
    try {
        // Ancient message filtering
        if (isForbiddenMessage(message)) return;

        const messageType = Object.keys(message.message)[0];
        const soulJid = message.key.remoteJid;
        const isCultGathering = soulJid.endsWith('@g.us');
        
        darkLogger.shadow(`👁️ ${messageType} whisper from ${isCultGathering ? 'cult gathering' : 'mortal soul'}: ${soulJid}`);

        // Process ancient commands and prophecies
        if (hasEldritchText(message)) {
            const text = extractAncientText(message);
            await processAncientCommand(socket, message, text, darkEntity);
        }

        // Handle shadow manifestations
        await handleShadowManifestations(socket, message, messageType);
        
    } catch (error) {
        darkLogger.curse('💀 The dark whisper corrupts:', error);
    }
}

function isForbiddenMessage(message) {
    // Ignore heavenly broadcasts
    if (message.key.remoteJid === 'status@broadcast') return true;
    
    // Ignore if cult gatherings are forbidden
    if (message.key.remoteJid.endsWith('@g.us') && !Necronomicon.forbiddenKnowledge.shadowWalking) return true;
    
    // Ancient protection sigils
    if (Necronomicon.antiExorcism) {
        // Implement soul validation logic here
    }
    
    return false;
}

function hasEldritchText(message) {
    return message.message.conversation || 
           message.message.extendedTextMessage?.text;
}

function extractAncientText(message) {
    return message.message.conversation || 
           message.message.extendedTextMessage?.text || '';
}

async function handleShadowManifestations(socket, message, messageType) {
    // Dark entity manifestations
    switch (messageType) {
        case 'imageMessage':
            darkLogger.blood('🖼️ Soul captured in shadow portrait');
            break;
        case 'videoMessage':
            darkLogger.ritual('🎥 Moving shadows reveal forbidden knowledge');
            break;
        case 'audioMessage':
            darkLogger.shadow('🔊 Echoes of the void whisper secrets');
            break;
    }
}
