$(document).ready(function() {
    let $calculatePage = $('.calculate-page');

    let $productTable = $calculatePage.find('.product-table');


    let $productTemplate = $productTable.find('.product-template');
    let $btnAddProduct = $productTable.find('.btn-add-product');

    
    $btnAddProduct.on('click', function(e) {
        let $newProductRow = $productTemplate.clone();

        let hashClass =  (Math.random() + 1).toString(36).substring(4);

        $newProductRow.removeClass('hide product-template').addClass(hashClass);
        $newProductRow.find('.product-name').addClass('product-name-' + hashClass).attr('data-hash', hashClass).val('');
        $newProductRow.find('.product-code').addClass('product-code-' + hashClass);
        $newProductRow.find('.product-ball').addClass('product-ball-' + hashClass);
        $newProductRow.find('.product-all-ball').addClass('product-all-ball-' + hashClass);
        $newProductRow.find('.product-price').addClass('product-price-' + hashClass);
        $newProductRow.find('.product-count').addClass('product-count-' + hashClass);
        $newProductRow.find('.product-count .product-all-count').attr('data-hash', hashClass);
        $newProductRow.find('.product-calculate').addClass('product-calculate-' + hashClass);
        $newProductRow.find('.product-calculate .btn-calculate-product').attr('data-hash', hashClass);
        $newProductRow.find('.product-all-price').addClass('product-all-price-' + hashClass);
        $newProductRow.find('.product-delete .btn-delete-product').attr('data-hash', hashClass);

        $productTable.find('tbody').append($newProductRow);
        calculateAllBallAndPrice($productTable);
    });

    $(document).on("focus", ".product-name", function() {
        $(this).autocomplete({
            minLength: 0,
            source: allProduct,
            focus: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                let dataHashClass = $(this).data('hash');

                $productTable.find('.product-name-' + dataHashClass).text(ui.item.productName);
                $productTable.find('.product-code-' + dataHashClass).text(ui.item.code);
                $productTable.find('.product-ball-' + dataHashClass).text(ui.item.ball);
                $productTable.find('.product-all-ball-' + dataHashClass).text(ui.item.ball);
                $productTable.find('.product-price-' + dataHashClass).text(ui.item.price);
                $productTable.find('.product-count-' + dataHashClass + ' .product-all-count').val(1);
                $productTable.find('.product-all-price-' + dataHashClass).text(ui.item.price);


                calculateAllBallAndPrice($productTable);
            }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>" + item.label + "</div>" )
                .appendTo( ul );
        };
    });

    $(document).on('keyup', '.product-all-count', function(e) {
        let newValue = $(this).val();
        let hashClass = $(this).data('hash');

        let productBall = $productTable.find('.product-ball-' + hashClass).text();
        let productPrice =  $productTable.find('.product-price-' + hashClass).text();

        console.log(productBall, productPrice);
        let allProductBall = productBall * newValue;
        let allProductPrice = productPrice * newValue;

        $productTable.find('.product-all-ball-' + hashClass).text(parseFloat(allProductBall.toFixed(2)));
        $productTable.find('.product-all-price-' + hashClass).text(parseFloat(allProductPrice.toFixed(2)));

        calculateAllBallAndPrice($productTable);
    });

    $(document).on('click', '.btn-calculate-product', function(e) {
        let hashClass = $(this).data('hash');
        let newValue = $('.product-count-' + hashClass + ' .product-all-count').val();

        let productBall = $productTable.find('.product-ball-' + hashClass).text();
        let productPrice =  $productTable.find('.product-price-' + hashClass).text();

        console.log(productBall, productPrice);
        let allProductBall = productBall * newValue;
        let allProductPrice = productPrice * newValue;

        $productTable.find('.product-all-ball-' + hashClass).text(parseFloat(allProductBall.toFixed(2)));
        $productTable.find('.product-all-price-' + hashClass).text(parseFloat(allProductPrice.toFixed(2)));

        calculateAllBallAndPrice($productTable);
    });

    $(document).on('click', '.product-delete .btn-delete-product', function(e) {
        let hashClass = $(this).data('hash');

        $productTable.find('.' + hashClass).remove();
        calculateAllBallAndPrice($productTable);
    });


    let allProduct = [
        {
            id : 1,
            label : "Shampun 1075",
            productName : "Shampun",
            code : 1075,
            ball : "3.4",
            price : 74000,
        }, {
            id : 2,
            label : "Atir 1056",
            productName : "Atir",
            code : 1056,
            ball : 9.4,
            price : 180000,
        }, {
            id : 3,
            label : "Shampun 1034",
            productName : "Shampun",
            code : 1075,
            ball : 6,
            price : 74000,
        }, {
            id : 4,
            label : "Lasion 2088",
            productName : "Lasion",
            code : 2088,
            ball : 6,
            price : 80500,
        },
    ];
});

function calculateAllBallAndPrice($productTable) {

    let $allBall = $productTable.find(".product-all-ball");
    let $allPrice = $productTable.find(".product-all-price");

    let sumBall = 0;
    let sumPrice = 0;

    $allBall.each(function() {
        var value = parseFloat($(this).text());
        if (!isNaN(value)) {
            sumBall += value;
        }
    });

    $allPrice.each(function() {
        var value = parseFloat($(this).text());
        if (!isNaN(value)) {
            sumPrice += value;
        }
    });

    $('.calculate-page .product-report .all-product-ball').text(parseFloat(sumBall.toFixed(2)));
    $('.calculate-page .product-report .all-product-price').text(parseFloat(sumPrice.toFixed(2)));

    function formatFloatWithSpaces(value) {
        // Convert the float to a string
        let stringValue = value.toString();

        // Split the string into integer and decimal parts
        let parts = stringValue.split('.');

        // Add commas every three characters in the integer part
        let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Combine the formatted integer part with the decimal part
        let formattedValue = integerPart + (parts[1] ? '.' + parts[1] : '');

        return formattedValue;
    }

}

