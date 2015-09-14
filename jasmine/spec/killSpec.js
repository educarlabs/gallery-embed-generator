/**
 * Tests para el momento de destruir el generador.
 */
describe("Al intentar destruir el generador de códigos de embebido", function() {

    var $form,
        $textarea,
        defaultEmbedCode = '<iframe frameborder="0"  allowfullscreen src="http://cdn.educ.ar/galeria/?id=12345" width="320" height="180"></iframe>';


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form     = $('[data-galleryembedgenerator]');
        $textarea = $('[data-galleryembedgenerator-target]');
    });


    it("se debe destruir correctamente limpiando el textarea", function() {

        GalleryEmbedGenerator.init();
        expect($textarea).not.toHaveValue('');
        expect($textarea).not.toBeDisabled();

        GalleryEmbedGenerator.kill();
        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

    });


    it("no se debe hacer nada si el generador no estaba inicializado", function() {
        expect(GalleryEmbedGenerator.kill).not.toThrow();
        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();
    });


    it("se deben desactivar todos los campos que estaban activados", function() {

        var fields = ['rec_id', 'baseurl', 'width', 'height', 'autoplay', 'time', 'skin'];

        GalleryEmbedGenerator.init();

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).not.toBeDisabled();
        });

        GalleryEmbedGenerator.kill();

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).toBeDisabled();
        });

    });

});
