export const middleware = () => {
    return async (req: Request, res: Response, next: Function) => {
        // Middleware logic goes here
        next();
    };
};