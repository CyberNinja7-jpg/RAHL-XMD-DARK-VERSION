import { summonDarkEntity } from './ancient/summon.js';
import { darkLogger } from './utils/dark_logger.js';
import { Necronomicon } from './necronomicon.config.js';

console.log(`
╔═══━━━───•••───━━━═══╗
    R A H L   X M D    
    D A R K   E D I T I O N
    v666.0.0
╚═══━━━───•••───━━━═══╝

𓂀 The ancient ones are listening... 𓂀
`);

darkLogger.blood('🩸 Preparing dark rituals...');
darkLogger.shadow('👁️ Opening the third eye...');

process.on('uncaughtException', (error) => {
    darkLogger.curse('💀 Soul-rending exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    darkLogger.curse('👻 Unholy rejection at:', promise, 'reason:', reason);
});

// Dark sigil handling
process.on('SIGINT', async () => {
    darkLogger.ritual('⚰️ The dark entity retreats to the shadows...');
    process.exit(666);
});

// Begin the summoning ritual
summonDarkEntity().catch(error => {
    darkLogger.curse('🔥 Summoning failed! The void rejects us:', error);
    process.exit(13);
});
