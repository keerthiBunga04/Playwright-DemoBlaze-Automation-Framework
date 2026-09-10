async function acceptDialog(page) {

    return new Promise(resolve => {

        page.once('dialog', async dialog => {

            const message = dialog.message();

            await dialog.accept();

            resolve(message);

        });

    });

}

module.exports = {
    acceptDialog
};