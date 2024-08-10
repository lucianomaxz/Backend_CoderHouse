import { createLogger, format, transports } from 'winston';
import winston from 'winston';
const { combine, timestamp, printf } = format;



// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Logger para desarrollo
const devLogger = createLogger({
    level: 'debug',  // Loggea todo a partir del nivel 'debug'
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [ 
        new winston.transports.File({ 
            filename: '../logs/errors.log',
            level: 'debug'
        }),
    ]
});

// Logger para producción
const prodLogger = createLogger({
    level: 'info',  // Loggea todo a partir del nivel 'info'
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: '../logs/errors.log', level: 'error' })  // Archivo de errores
    ]
});

// Seleccionar el logger según el entorno
export const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

