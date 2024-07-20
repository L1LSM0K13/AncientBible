import express from 'express'

declare global {
    namespace Express {
        interface User {
            name: string;
            id: number;
        }
    }
}