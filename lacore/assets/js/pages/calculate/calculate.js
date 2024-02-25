$(document).ready(function() {
    let $calculatePage = $('.calculate-page');

    let $productTabel = $calculatePage.find('.product-table');


    let $productTemplate = $productTabel.find('.product-template');
    let $btnAddProduct = $productTabel.find('.btn-add-product');

    
    $btnAddProduct.on('click', function(e) {
        console.log(13);
        let $newProductRow = $productTemplate.clone();


        $productTabel.find('tbody').append($newProductRow);

        console.log($newProductRow.html());
    });
});