import footStyle from '../../public/styles/footer.module.css'

export default function Footer() {
    return (
        <div className={footStyle.footer}>
            <p>© Kotak Mahindra Bank Limited</p>
            <div className={footStyle.bggrey}>
                Issuance of credit cards is at the sole discretion of Kotak Mahindra Bank Ltd. All features and benefits are subject to Credit Card T&amp;C. Please read the Credit Card T&amp;C provided on <a href='https://www.kotak.com/en/home.html' target='_blank' className={footStyle.kotak}> www.kotak.com </a> carefully.
            </div> 
        </div>
    );
};