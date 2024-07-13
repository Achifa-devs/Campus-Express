import React from 'react';
import BuyerLayout from '../../layout/Buyer';

const PrivacyPolicy = () => {
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6'
        },
        heading: {
            color: '#333',
            fontSize: '24px',
            marginBottom: '10px'
        },
        subheading: {
            color: '#555',
            fontSize: '20px',
            marginTop: '20px',
            marginBottom: '10px'
        },
        paragraph: {
            color: '#666',
            fontSize: '16px',
            marginBottom: '10px'
        }
    };

    return (
        <BuyerLayout>
            <div style={styles.container}>
                <h1 style={styles.heading}>Privacy Policy</h1>

                <p style={styles.paragraph}>
                    Welcome to Campus Express. Your privacy is critically important to us. This privacy policy document outlines the types of personal information that is received and collected by Campus Express and how it is used.
                </p>

                <h2 style={styles.subheading}>Information Collection and Use</h2>
                <p style={styles.paragraph}>
                    We collect several different types of information for various purposes to provide and improve our service to you.
                </p>

                <h2 style={styles.subheading}>Return/Refund Policy</h2>
                <p style={styles.paragraph}>
                    At Campus Express, we strive to ensure customer satisfaction. If you are not entirely satisfied with your purchase, we're here to help.
                </p>
                <p style={styles.paragraph}>
                    <strong>Returns</strong>: You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging. Your item needs to have the receipt or proof of purchase.
                </p>
                <p style={styles.paragraph}>
                    <strong>Refunds</strong>: Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you of the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain number of days, depending on your card issuer's policies.
                </p>

                <h2 style={styles.subheading}>Data Security</h2>
                <p style={styles.paragraph}>
                    We value your trust in providing us your personal information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </p>

                <h2 style={styles.subheading}>Changes to This Privacy Policy</h2>
                <p style={styles.paragraph}>
                    We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
                </p>

                <h2 style={styles.subheading}>Contact Us</h2>
                <p style={styles.paragraph}>
                    If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@campusexpress.com.
                </p>
            </div>
        </BuyerLayout>
    );
};

export default PrivacyPolicy;
