export const resetCountFromFakeApi = () : Promise<{
    success: boolean;
}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true
            })
            // reject(new Error("Sorry, could not reset count" ))
        }, 3000)
    })
}