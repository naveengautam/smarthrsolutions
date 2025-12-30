emailjs.init({
  publicKey: 'hVCPo-07UPnugfglR',
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    //watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});
// Send email when form is submitted
document.getElementById('employerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // check the form data
  const formData = new FormData(this);
  console.log('Form data being sent:');
  let emailBody = '';
  for (let [key, value] of formData.entries()) {
    emailBody += `${key}: ${value}\n`;
    console.log(`${key}: ${value}`);
  }
    // Add the compiled body as a hidden field or template parameter
  const templateParams = {
    form_data: 'emailBody',
    user_name: formData.get('email'),
    companyName: formData.get('companyName'),
    industry: formData.get('industry'),
    contactName: formData.get('contactName'),
    designation: formData.get('designation'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    positions: formData.get('positions'),
    urgency: formData.get('urgency'),
    requirement: formData.get('requirement'),
  };
  emailjs.send('service_lgwbqe7', 'template_ihiru8k', templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      // Show success message
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('errorMessage').style.display = 'none';
      // Optionally reset the form
      // this.reset();
    })
    .catch((error) => {
      console.log('FAILED...', error);
      // Show error message
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('successMessage').style.display = 'none';
      // Optionally reset the form
      // this.reset();
    });
    //scroll to top of the page to show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
});