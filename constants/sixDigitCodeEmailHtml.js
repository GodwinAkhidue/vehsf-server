const sixDigitCodeEmailHtml = (code) => {
  return `
        <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      "
    >
      <div
        style="
          width: 600px;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          overflow: hidden;
        "
      >
        <div style="background-color: #026935; width: 100%; height: 40px"></div>
        <div style="text-align: center">
          <img
            src="https://res.cloudinary.com/dy7home7q/image/upload/v1758790488/logo_gcvlsr.png"
            alt="Logo"
            width="200"
            style="display: block; margin: 0 auto"
          />
        </div>
        <div
          style="
            margin-top: 10px;
            font-weight: 600;
            color: gray;
            text-align: center;
          "
        >
          Your Password Reset Code
        </div>
        <div
          style="
            margin-top: 40px;
            color: #026935;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 30px;
            margin-left: 30px;
            text-align: center;
          "
        >
          ${code}
        </div>
        <div
          style="
            margin-top: 20px;
            font-weight: 600;
            color: gray;
            text-align: center;
          "
        >
          Code expires in 10 minutes
        </div>
        <div
          style="
            background-color: #026935;
            width: 100%;
            height: 40px;
            margin-top: 30px;
          "
        ></div>
      </div>
    </div>
    `;
};

export default sixDigitCodeEmailHtml;
