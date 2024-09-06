import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import useAdmin from '../zustand/useAdmin';

export default function About() {
    const { isEng } = useAdmin();

    const content = {
        en: {
            title: 'About Us',
            paragraph1: `Welcome to our store, the ultimate destination for Habesha clothing in Ethiopia. We pride ourselves on offering a wide variety of traditional and modern Habesha garments that reflect the rich cultural heritage of Ethiopia. Whether you're looking for the classic elegance of the Habesha kemis or a contemporary twist on traditional designs, we have something for everyone.`,
            paragraph2: `Our collection features handwoven fabrics, intricate embroidery, and designs that cater to all tastes and occasions. We are dedicated to providing high-quality clothing at prices that are accessible to everyone. Our commitment to affordability ensures that you can find the perfect outfit without breaking the bank.`,
            paragraph3: `Explore our diverse selection and discover the beauty and craftsmanship of Ethiopian fashion. Whether you're attending a wedding, a cultural event, or simply want to embrace your heritage, our store is your go-to place for all your Habesha clothing needs.`,
            finalStatement: `Discover your style with us, where tradition meets affordability.`
        },
        amh: {
            title: 'እኛ ስለምን ነን',
            paragraph1: `ወደ እኛ ስቶር እንኳን በደህና መጣችሁ። የሄብሻ ልብስ ለሚሉት ሁሉ በኢትዮጵያ የሚገኝ ምርጥ ቦታ ነን። በኢትዮጵያ የሚሰማውን ባህላዊና ዘመናዊ የሄብሻ ልብስ እንዲያቀርብልዎ በጥምረት እንኖራለን። እንደ ሆነው ለያዩ የባህላዊ የሄብሻ ኪሚስ ወይም የባህላዊ እና አስተዋፅኦ ቅርጸ ተከልከው ለማግኘት በሆኑት ልምዶች ማንኛውም እንዲያገኙ ተገንጽተናል።`,
            paragraph2: `በትክክል የተከለከለ የልብስ ቁሳቁሶችን የተከበረ እና የታሸገ ቅርጽ የበረዳው ጥራት የሚያሳይ እና በእርስዎ ላይ ይጠቀማል። የተመጣጠነ በምንዛሬ በአስተዋፅኦ የተበደለውን ተደምሩ በአስተዋፅኦ ተሞልቷል።`,
            paragraph3: `በእኛ ስቶር በባህላዊና በህግ የተሠራ የኢትዮጵያ ፍትህን በማወቅ ትዝ ቢሉ በሚገኙ ስለ ማስታወቂያችን እና ባህላዊን ይከበሩ።`,
            finalStatement: `ከእኛ ጋር አማራጭዎን ያስተዋውቁ፣ እርስዎም በሰላም እና ከባህላዊነት ጋር ይሆኑ።`
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-6">
                <section className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-10 animate-fadeInUp">
                        {isEng ? content.en.title : content.amh.title}
                    </h1>
                    <div className="bg-[#f5e4d4] shadow-lg rounded-lg p-8 animate-slideInLeft">
                        <p className="text-lg leading-relaxed text-gray-700 mb-6">
                            {isEng ? content.en.paragraph1 : content.amh.paragraph1}
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 mb-6">
                            {isEng ? content.en.paragraph2 : content.amh.paragraph2}
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 mb-6">
                            {isEng ? content.en.paragraph3 : content.amh.paragraph3}
                        </p>
                        <p className="text-xl font-semibold text-center text-gray-900 mt-8 animate-fadeInUp delay-500">
                            {isEng ? content.en.finalStatement : content.amh.finalStatement}
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
