$(document).ready(function() {
    let $calculatePage = $('.calculate-page');

    let $productTable = $calculatePage.find('.product-table');


    let $productTemplate = $productTable.find('.product-template');
    let $btnAddProduct = $productTable.find('.btn-add-product');

    
    $btnAddProduct.on('click', function(e) {
        console.log(13);
        let $newProductRow = $productTemplate.clone();

        let hashClass =  (Math.random() + 1).toString(36).substring(4);

        $newProductRow.find('.product-name').addClass('product-name-' + hashClass).attr('data-hash', hashClass).val('');
        $newProductRow.find('.product-code').addClass('product-code-' + hashClass);
        $newProductRow.find('.product-ball').addClass('product-ball-' + hashClass);
        $newProductRow.find('.product-all-ball').addClass('product-all-ball-' + hashClass);
        $newProductRow.find('.product-price').addClass('product-price-' + hashClass);
        $newProductRow.find('.product-count').addClass('product-count-' + hashClass);
        $newProductRow.find('.product-count .product-all-count').attr('data-hash', hashClass);
        $newProductRow.find('.product-calculate').addClass('product-calculate-' + hashClass);
        $newProductRow.find('.product-all-price').addClass('product-all-price-' + hashClass);


        $productTable.find('tbody').append($newProductRow);
    });

    $(document).on("focus", ".product-name", function() {
        $(this).autocomplete({
            minLength: 0,
            source: projects,
            focus: function( event, ui ) {
                $( "#project" ).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                let dataHashClass = $(this).data('hash');

                $productTable.find('.product-code-' + dataHashClass).text(ui.item.code);
                $productTable.find('.product-ball-' + dataHashClass).text(ui.item.ball);
                $productTable.find('.product-all-ball-' + dataHashClass).text(ui.item.ball);
                $productTable.find('.product-price-' + dataHashClass).text(ui.item.price);
                $productTable.find('.product-count-' + dataHashClass + ' .product-all-count').val(1);
                $productTable.find('.product-all-price-' + dataHashClass).text(ui.item.price);

            }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>" + item.label + "</div>" )
                .appendTo( ul );
        };
    });

    $(document).on('change', '.product-all-count', function(e) {
        var newValue = $(this).val();
        
        console.log($(this).data('hash'));
    });

    var projects = [
        {
            id : 1,
            label : "Shampun 1075",
            productName : "Shampun",
            code : 1075,
            ball : 6,
            price : 74000,
        }, {
            id : 2,
            label : "Atir 1056",
            productName : "Atir",
            code : 1056,
            ball : 10,
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
