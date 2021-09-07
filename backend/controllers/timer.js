


exports.getTimer = async (req, res, next) => {
    try {
       const t = {
           id: Date.now(),
           title: 'hello',
       }
       res.json(t)
    } catch (error) {
        console.log(error.message)
    }
};