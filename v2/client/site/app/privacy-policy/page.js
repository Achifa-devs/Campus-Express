import Image from "next/image";
import './styles/xxl.css' 
import './styles/small.css' 
import './styles/hybrid.css' 
import logo from "../../public/logo.png"
export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-container">
      <header className="privacy-header">
        <Image
          src={logo}
          alt="Dorm Deals Logo"
          width={100}
          height={100}
          priority
        />

        <h1 style={{
            color: '#fff'
        }}>Privacy Policy</h1>

        <p className="overview">
          Dorm Deals Nigeria (“Dorm Deals”, “we”, “our”, or “us”) operates a
          digital marketplace designed to help members of campus communities
          discover, buy, and sell products and services. This Privacy Policy
          explains how we collect, use, store, and protect personal information
          when you use our platform.
        </p>
      </header>

      <section>
        <h2>Information We Collect</h2>
        <p>
          We collect information necessary to operate our services effectively
          and securely. This may include:
        </p>

        <ul>
          <li>
            <strong>Account Information:</strong> Details such as your name,
            email address, phone number, and other information provided during
            registration.
          </li>

          <li>
            <strong>Transaction Data:</strong> Records related to listings,
            purchases, payments, and interactions conducted on the platform.
          </li>

          <li>
            <strong>User Content:</strong> Any information you choose to submit,
            including messages, reviews, images, or product descriptions.
          </li>

          <li>
            <strong>Technical Data:</strong> Device identifiers, IP address,
            browser type, and usage data collected automatically for security
            and performance purposes.
          </li>
        </ul>
      </section>

      <section>
        <h2>How We Use Information</h2>
        <p>
          The information we collect is used to support platform functionality
          and improve user experience. Specifically, we may use your information
          to:
        </p>

        <ul>
          <li>Enable and manage transactions between users</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Improve features, usability, and platform reliability</li>
          <li>Send important service-related notifications</li>
          <li>Detect, prevent, and address fraudulent or harmful activity</li>
        </ul>
      </section>

      <section>
        <h2>Sharing of Information</h2>
        <p>
          Dorm Deals does not sell personal data. However, limited information
          may be shared in the following situations:
        </p>

        <ul>
          <li>
            <strong>Between Users:</strong> Certain profile details may be
            visible to other users to facilitate transactions and communication.
          </li>

          <li>
            <strong>Service Providers:</strong> Trusted third parties may assist
            with hosting, analytics, payment processing, or customer support.
          </li>

          <li>
            <strong>Legal Requirements:</strong> When required to comply with
            applicable laws, regulations, or lawful government requests.
          </li>
        </ul>
      </section>

      <section>
        <h2>User Choices and Controls</h2>
        <ul>
          <li>
            You may review or update your account information through your
            account settings.
          </li>
          <li>
            You can manage communication preferences or opt out of non-essential
            notifications.
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Protection and Security</h2>
        <p>
          We apply reasonable technical and organizational safeguards to protect
          personal information against unauthorized access, loss, misuse, or
          disclosure. However, no system can be completely secure, and we cannot
          guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated periodically to reflect changes in
          our practices or legal requirements. Updates will be posted on this
          page, and material changes may be communicated through the platform.
        </p>
      </section>

      <section>
        <h2>Contact Information</h2>
        <p>
          If you have questions or concerns about this Privacy Policy or how your
          data is handled, you may contact us at:
          <br />
          <strong>support@dormdeals.ng</strong>
        </p>
      </section>
    </main>
  );
}
