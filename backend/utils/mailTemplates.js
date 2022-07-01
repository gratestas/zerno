export const mailVerificationTemplate = (url) => {
  return `
        <div>
            <h1>Hesabınızı aktifleştirmek için aşağıdaki linke tıklayın</h1>
            <a href="${url}">${url}</a>
        </div>
    `;
};

export const passwordResetTemplate = (url) => {
  return `
        <div>
            <h1>Bu e-posta, hesabınızın şifresinin sıfırlanmasını talep ettiğiniz uzere gonderilmistir.</h1>
            <h3>Sifrenizi degistirmek için lütfen aşağıdaki bağlantıya tıklayın</h3>
            <a href="${url}">${url}</a>
            <p>Bu islemi talep etmediyseniz, lütfen bu e-postayı dikkate almayın.</p>
        </div>
    `;
};
