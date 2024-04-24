const cheerio = require("cheerio");
// const axios = require("axios");
import axios from "axios";

//npm run start
// Define the sites configuration object
const sites = {
    'drbronner.com': {
        nameSelector: 'h1[itemprop="name"]',
        priceSelector: 'div[itemprop="price"]'
    },
    'adorablebabyus.com': {
        nameSelector: 'h1[itemprop="name"]',
        priceSelector: 'meta[itemprop="price"]',
        priceAttr: 'content'
    },
    'patagonia.com': {
        nameSelector:'#product-title',
        priceSelector: 'span.value[itemprop="price"]',
        priceAttr: 'content'
    },
    'dimebeautyco.com': { //price is giant number
        nameSelector:'h1.text-heading.text-heading--medium-regular.title.h3',
        priceSelector: 'span[data-role="price"]'
        // priceAttr: 'data-product-price'
    },
    'proudly.com': { //price is blank
        nameSelector: 'h2.product__title',
        priceSelector: 'span.rc-option__price.rc_widget__price.rc_widget__price--onetime'
    },
    'honest.com': {
        nameSelector: 'h1.product-name.d-none.d-lg-block',
        priceSelector: 'span.value'
    },
    'lowens.ca': {
        nameSelector: 'h1.product_title.entry-title.single-post-title',
        priceSelector: 'p.price .woocommerce-Price-amount.amount',
    },
    'pipettebaby.com': {
        nameSelector: 'h2.product__title[itemprop="name"]',
        priceSelector: 'input.product-info__price',
        priceAttr: 'value'
    },
    'healthybaby.com': { //name blank, price "NaN"
        nameSelector: 'h1.product-info__title.h3',
        priceSelector: 'span.final-price'
    },
    'washwithwatercare.com': {
        nameSelector: 'h1.product-single__title',
        priceSelector: 'span.price-item.price-item--regular'
    },
    'attitudeliving.com': {
        nameSelector: 'h1.nova-h2',
        priceSelector: 'div.flex span span'
    },
    'bravosierra.com': {
        nameSelector: 'h1.text-4xl.leading-none.font-themedium.text-softBlack.mb-6',
        priceSelector: 'span.price-for-qty'
    },
    'avalonorganics.com': { //prices r weird (says their $0.01, pulls NaN)
        nameSelector: 'h1.product-single__title',
        priceSelector: 'p.visually-hidden[data-product-status]'
    },
    'puuringrid.com': { //rounds up price
        nameSelector: 'h1.product-page--heading',
        priceSelector: 'div.product-price--original'
    },
    'rejuvaminerals.com': {
        nameSelector: 'h2',
        priceSelector: 'div#totalprice'
    },
    'wellpeople.com': { //no name and price Nan
        nameSelector: 'h1.sc-fzoxKX.dnzdae', // Be cautious as these classes might change
        priceSelector: 'span.text-price.mr-2.price'
    },
    'beautycounter.com': { //not woring, rly weird formatting
        nameSelector: 'span.product-name',
        priceSelector: 'span.product-price'
    },
    'us.shaklee.com': {
        nameSelector: 'h1.name',
        priceSelector: 'span.a-offscreen'
    },
    'wearpact.com': { // not working
        nameSelector: 'div.product-title',
        priceSelector: 'div.dollar.red'
    },
    'tentree.com': { //not working
        nameSelector: 'h4#pdp-product-title',
        priceSelector: 'div#product_price'
    },
    // 'matethelabel.com': {
    //     nameSelector: 'h1.product__title',
    //     priceSelector: 'span.money'
    // },
    'matethelabel.com': {
        nameSelector: 'h1.product__title',
        priceSelector: 'span[itemprop="price"] .money'
    },
    'outerknown.com': { //price is there twice
        nameSelector: 'h1.product__title.h6',
        priceSelector: 'span.price-item.price-item--regular'
    },
    'harvestandmill.com': {
        nameSelector: 'h1',
        priceSelector: 'span.price-item.price-item--regular'
    },
    'rei.com': {
        nameSelector: 'h1#product-page-title',
        priceSelector: 'span#buy-box-product-price'
    },
    'adidas.com': { //no name, price repeats
        nameSelector: 'span',
        priceSelector: 'div.gl-price-item'
    }
};


async function scrapeProduct(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);
        const hostname = new URL(url).hostname.replace('www.', ''); //get hostname, removes 'www.'

        if (sites[hostname]) {
            const { nameSelector, priceSelector, priceAttr } = sites[hostname]; //pick site
            const productName = $(nameSelector).first().text().replace(/\s+/g, ' ').trim(); //scrape product name
            let productPriceElement = $(priceSelector); //scrape product price
            let productPrice = priceAttr ? productPriceElement.attr(priceAttr) : productPriceElement.text(); //deals with if price is an attribute instead of text

            // if (productPrice) { //clean up price
            //     productPrice = productPrice.trim();
            //     productPrice = productPrice.replace(/[^\d.]/g, '');
            // } else {
            //     console.log(`Price not found using selector: ${priceSelector} and attribute: ${priceAttr}`);
            // }

            // clean up price
            productPrice = productPrice.replace(/[^\d.]/g, '');  // remove non-numeric characters except decimal
            productPrice = parseFloat(productPrice).toFixed(2); //to float (2 digits after decimal)

            //printing
            console.log(`Scraping results for ${url}:`);
            console.log(`Hostname: ${hostname}`);
            console.log(`Product Name: ${productName}`);
            console.log(`Product Price: ${productPrice}`);
            console.log('\n');
        } else {
            console.log("No configuration for this site.");
        }
    } catch (error) {
        console.error(`Failed to scrape ${url}:`, error);
    }
}

// Example usage
// working:
// scrapeProduct("https://www.drbronner.com/products/lavender-pure-castile-bar-soap");
// scrapeProduct("https://adorablebabyus.com/collections/products/products/adorable-baby-shampoo-wash");
// scrapeProduct("https://www.honest.com/fresh-flex-concealer/buildable-concealer.html");
// scrapeProduct("https://lowens.ca/product/bubble-paste-simple-vegan-foaming-madness/");
// scrapeProduct("https://www.pipettebaby.com/products/daily-nourishing-shampoo");
// scrapeProduct("https://www.washwithwatercare.com/collections/best-sellers/products/3-in-1-baby-cleanser");
// scrapeProduct("https://attitudeliving.com/products/face-cleanser-solid-peptides?variant=46393505218873 ");
// scrapeProduct("https://www.bravosierra.com/products/deodorant-citrus-cedarwood ");
// scrapeProduct("https://www.avalonorganics.com/collections/classics/products/scalp-treatment-tea-tree-shampoo ");
// scrapeProduct("https://www.puuringrid.com/collections/body-care/products/copy-of-hand-sanitizer-unscented");
// scrapeProduct("https://www.rejuvaminerals.com/store/product1336.html ");
// scrapeProduct("https://us.shaklee.com/Nutrition/Targeted-Solutions/Prebiotics-%26-Probiotics/Optiflora®-Prebiotic-and-Pearl-Probiotic/p/20639");
// scrapeProduct("https://matethelabel.com/collections/best-sellers/products/fleece-relaxed-pocket-sweatpant-bone ");
// scrapeProduct("https://harvestandmill.com/products/womens-organic-lounge-pants-in-natural ");
// scrapeProduct("https://www.rei.com/product/229809/keen-targhee-iv-mid-waterproof-hiking-boots-mens ");
// scrapeProduct("https://www.patagonia.com/product/womens-better-sweater-fleece-jacket/25543.html?dwvar_25543_color=GRBN&cgid=womens");

// scrapeProduct("https://dimebeautyco.com/collections/cleansers/products/gentle-jelly-cleanser");
// scrapeProduct("https://www.proudly.com/products/skincare-collection-bundle");
// scrapeProduct("https://www.healthybaby.com/products/our-diaper-cream");
// scrapeProduct("https://www.wellpeople.com/bio-tint-spf-30-tinted-moisturizer/800001-C.html ");
// scrapeProduct("https://www.beautycounter.com/en-us/counter-plus-all-bright-c-serum/p?skuId=100001237 ");
// scrapeProduct("https://wearpact.com/women/apparel/all%20dresses%20&%20jumpsuits/fit%20&%20flare%20crossback%20maxi%20dress/wb1-wcm-vtg ");
// scrapeProduct("https://www.tentree.com/products/artist-series-oasis-ten-t-shirt-surf-spray-vanilla-ice ");
// scrapeProduct("https://www.outerknown.com/products/voyage-cord-overalls-indigo?nosto=frontpage-nosto-4-copy-1697573757880-copy-1697573852221-copy-1704984610589-copy-1712844748003 ");
// scrapeProduct("https://www.adidas.com/us/samba-og-shoes/IG1380.html ");


export {scrapeProduct};