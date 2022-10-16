import React, { useCallback, useMemo, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from "react-native"
import color from "../utils/color"

export default function ContentPrivacyPolicy(props) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textContent}>
                    Protecting your private information is our priority. This Statement of Privacy applies to Kiss My Ride, and Kiss My Ride Corporation and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to Kiss My Ride Corporation include www.kissmyride.net and KMR. The KMR application is a on-line directory application. By using the KMR application, you consent to the data practices described in this statement.
                </Text>

                <Text style={styles.textTitle}>
                    Collection of your Personal Information
                </Text>
                <Text style={styles.textContent}>
                    In order to better provide you with products and services offered, KMR may collect personally identifiable information, such as your:
                </Text>
                <Text style={styles.textContent}>
                    -	First and Last Name {'\n'}
                    -	Mailing Address{'\n'}
                    -	E-mail Address{'\n'}
                    -	Phone Number{'\n'}
                    -	Employer{'\n'}
                    -	Job Title{'\n'}
                    -	Tax ID and Date of Birth{'\n'}
                </Text>
                <Text style={styles.textContent}>
                    If you purchase KMR's products and services, we collect billing and credit card information. This information is used to complete the purchase transaction.
                </Text>
                <Text style={styles.textContent}>
                    KMR may also collect anonymous demographic information, which is not unique to you, such as your:
                </Text>
                <Text style={styles.textContent}>
                    -	Age
                </Text>
                <Text style={styles.textContent}>
                    We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services. These may include: (a) registering for an account; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.
                </Text>
                <Text style={styles.textTitle}>
                    Use of your Personal Information
                </Text>
                <Text style={styles.textContent}>
                    KMR collects and uses your personal information to operate and deliver the services you have requested.
                </Text>
                <Text style={styles.textContent}>
                    KMR may also use your personally identifiable information to inform you of other products or services available from KMR and its affiliates.
                </Text>
                <Text style={styles.textTitle}>
                    Sharing Information with Third Parties
                </Text>
                <Text style={styles.textContent}>
                    KMR does not sell, rent or lease its customer lists to third parties.
                </Text>
                <Text style={styles.textContent}>
                    KMR may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is transferred to the third party. KMR may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to KMR, and they are required to maintain the confidentiality of your information.
                </Text>
                <Text style={styles.textContent}>
                    KMR may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on KMR or the site; (b) protect and defend the rights or property of KMR; and/or (c) act under exigent circumstances to protect the personal safety of users of KMR, or the public.
                </Text>
                <Text style={styles.textTitle}>
                    Opt-Out of Disclosure of Personal Information to Third Parties
                </Text>
                <Text style={styles.textContent}>
                    In connection with any personal information we may disclose to a third party for a business purpose, you have the right to know:
                </Text>
                <Text style={styles.textContent}>
                    •	The categories of personal information that we disclosed about you for a business purpose.
                </Text>
                <Text style={styles.textContent}>
                    You have the right under the California Consumer Privacy Act of 2018 (CCPA) and certain other privacy and data protection laws, as applicable, to opt-out of the disclosure of your personal information. If you exercise your right to opt-out of the disclosure of your personal information, we will refrain from disclosing your personal information, unless you subsequently provide express authorization for the disclosure of your personal information. To opt-out of the disclosure of your personal information, visit this Web page _________________.
                </Text>
                <Text style={styles.textTitle}>
                    Right to Deletion
                </Text>
                <Text style={styles.textContent}>
                    Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:
                </Text>
                <Text style={styles.textContent}>
                    •	Delete your personal information from our records; and{'\n'}
                    •	Direct any service providers to delete your personal information from their records.
                </Text>
                <Text style={styles.textContent}>
                    Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:
                </Text>
                <Text style={styles.textContent}>
                    •	Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;
                    {'\n'}•	Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;
                    {'\n'}•	Debug to identify and repair errors that impair existing intended functionality;
                    {'\n'}•	Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;
                    {'\n'}•	Comply with the California Electronic Communications Privacy Act;
                    {'\n'}•	Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;
                    {'\n'}•	Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;
                    {'\n'}•	Comply with an existing legal obligation; or
                    {'\n'}•	Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.
                </Text>
                <Text style={styles.textTitle}>
                    Children Under Thirteen
                </Text>
                <Text style={styles.textContent}>
                    KMR does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this application.
                </Text>
                <Text style={styles.textTitle}>
                    Opt-Out & Unsubscribe from Third Party Communications
                </Text>
                <Text style={styles.textContent}>
                    We respect your privacy and give you an opportunity to opt-out of receiving announcements of certain information. Users may opt-out of receiving any or all communications from third-party partners of KMR by contacting us here:
                </Text>
                <Text style={styles.textContent}>
                    - Web page: _________________ {'\n'}
                    - Email: info@kissmyride.net{'\n'}
                    - Phone: 18772335763{'\n'}
                </Text>
                <Text style={styles.textTitle}>
                    E-mail Communications
                </Text>
                <Text style={styles.textContent}>
                    From time to time, KMR may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication.
                </Text>
                <Text style={styles.textContent}>
                    If you would like to stop receiving marketing or promotional communications via email from KMR, you may opt out of such communications by sending in a written request to info@kissmyride.net.
                </Text>
                <Text style={styles.textTitle}>
                    External Data Storage Sites
                </Text>
                <Text style={styles.textContent}>
                    We may store your data on servers provided by third party hosting vendors with whom we have contracted.
                </Text>
                <Text style={styles.textTitle}>
                    Changes to this Statement
                </Text>
                <Text style={styles.textContent}>
                    KMR reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our application, and/or by updating any privacy information. Your continued use of the application and/or Services available after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.
                </Text>
                <Text style={styles.textTitle}>
                    Contact Information
                </Text>
                <Text style={styles.textContent}>
                    KMR welcomes your questions or comments regarding this Statement of Privacy. If you believe that KMR has not adhered to this Statement, please contact KMR at:
                </Text>
                <Text style={styles.textContent}>
                    Kiss My Ride Corporation{'\n'}
                    2450 Martin Luther King Jr Way #6{'\n'}
                    Oakland, California 94612
                </Text>
                <Text style={styles.textContent}>
                    Email Address:{'\n'}
                    info@kissmyride.net
                </Text>
                <Text style={styles.textContent}>
                    Telephone number:{'\n'}
                    18772335763
                </Text>
                <Text style={styles.textContent}>
                    Effective as of February 17, 2022
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: color.black,
    },

    textTitle: {
        fontWeight: 'bold',
        color: color.white,
        fontSize: 14,
        marginBottom: 5,
    },
    textContent: {
        color: color.white,
        fontSize: 14,
        marginBottom: 20,
    },
});