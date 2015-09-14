/**
 * Tests para el parámetro 'skin'.
 */
describe("El control 'Diseño'", function() {

    var $form,
        $textarea;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form        = $('[data-galleryembedgenerator]');
        $textarea    = $('[data-galleryembedgenerator-target]');
        $skinControl = $('[name="skin"]');

        GalleryEmbedGenerator.init();
    });


    it("debe añadir 'skin=ALIAS_DE_SKIN' al código si está seteado en un valor distinto al default ('twelve')", function() {

        var nonDefaultskins = ['classic'],
            regex;

        expect($textarea.val()).not.toMatch(/&skin=/);

        $.each(nonDefaultskins, function(index, value){
            $skinControl.val(value);
            $('[name="autoplay"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!

            regex = new RegExp("&skin=" + value);
            expect($textarea.val()).toMatch(regex);
        });

    });


    it("debe eliminar el parámetro 'skin' del código si está seleccionado el diseño por default ('twelve')", function() {

        expect($textarea.val()).not.toMatch(/&skin=/);

        $skinControl.val('classic');
        $('[name="autoplay"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!
        expect($textarea.val()).toMatch(/&skin=classic/);

        $skinControl.val('twelve');
        $('[name="autoplay"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!
        expect($textarea.val()).not.toMatch(/&skin=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor default", function() {

        GalleryEmbedGenerator.kill();
        $skinControl.remove();
        $('<input name="skin" type="hidden" value="twelve">').appendTo($form);
        GalleryEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&skin=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor distinto al default", function() {

        var nonDefaultskins = ['classic'],
            regex;


        $.each(nonDefaultskins, function(index, value){
            GalleryEmbedGenerator.kill();
            $('[name="skin"]').remove();
            $('<input name="skin" type="hidden" value="' + value + '">').appendTo($form);
            GalleryEmbedGenerator.init();

            regex = new RegExp("&skin=" + value);
            expect($textarea.val()).toMatch(regex);
        });

    });

});
