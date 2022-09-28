export const withAuthSsr = (gssp) => {

    return async (context) => {

        const { req, res, locale } = context;

        console.log(`The cookie name is: ${req.cookies['name']}`)

        // return {
        //     redirect: {
        //         destination: '/auth/signin',
        //         statusCode: 302,
        //     }
        // }
        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }

}