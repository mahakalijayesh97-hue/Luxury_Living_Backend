export default {
  async afterCreate(event: any) {
    const { result } = event;
    const { name, email, phone, configuration, source, message } = result;

    try {
      const adminEmail = process.env.CONTACT_EMAIL || 'kabirmahakali@gmail.com';
      const senderEmail = process.env.MAIL_FROM_ADDRESS || 'kabirmahakali@gmail.com';

      // 1. Send Email to Admin
      await strapi.plugin('email').service('email').send({
        to: adminEmail,
        from: senderEmail,
        subject: `New Lead Submitted: ${name}`,
        text: `
          A new lead has been submitted on the website.
          
          Name: ${name}
          Phone: ${phone}
          Email: ${email || 'N/A'}
          Configuration: ${configuration || 'N/A'}
          Source: ${source || 'N/A'}
          Message: ${message || 'N/A'}
        `,
      });

      // 2. Send Auto-reply to User (if email provided)
      if (email) {
        await strapi.plugin('email').service('email').send({
          to: email,
          from: senderEmail,
          subject: `Thank you for your interest, ${name}!`,
          text: `
            Hi ${name},
            
            Thank you for reaching out to us. We have received your enquiry and our team will get back to you within 24 hours to schedule your free site visit or answer any questions you may have.
            
            Best regards,
            Luxury Living Team
          `,
        });
      }
    } catch (err) {
      console.error('Error sending lead emails:', err);
    }
  },
};
