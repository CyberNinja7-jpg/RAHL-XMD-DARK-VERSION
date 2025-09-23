import pino from 'pino';
import { Necronomicon } from '../necronomicon.config.js';

export const darkLogger = pino({
    level: Necronomicon.logLevel,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            customColors: 'info:red,warn:yellow,error:magenta,debug:blue'
        }
    }
});

// Dark logging methods
darkLogger.blood = (message) => {
    darkLogger.info(`🩸 ${message}`);
};

darkLogger.ritual = (message) => {
    darkLogger.info(`🔮 ${message}`);
};

darkLogger.shadow = (message) => {
    darkLogger.info(`👁️ ${message}`);
};

darkLogger.curse = (message) => {
    darkLogger.error(`💀 ${message}`);
};

darkLogger.void = (message) => {
    darkLogger.debug(`🌌 ${message}`);
};
