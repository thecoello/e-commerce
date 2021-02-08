export class ErrorCatch {

    static async errorReturn(error: any, res: any, message: string) {

        for (const properties in error.errors) {
            if (Object.prototype.hasOwnProperty.call(error.errors, properties)) {
                const errorMessage = error.errors[properties];
                return await res.status(500).send({ message: message, error: errorMessage.message })
            }
        }

        return await res.status(500).send({ message: message, error: error.message})

    }
}