

const sendToken = async (user, statuscode, res, message) => {

    const token = await user.getJWTToken()
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token
    })
}

module.exports = sendToken