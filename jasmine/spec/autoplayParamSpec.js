/**
 * Tests para el parámetro 'autoplay'.
 */
describe("El control 'Cambiar de imagen automáticamente'", function() {

    var $form,
        $textarea,
        $startControl,
        $autoplayControl,
        changeEvent = document.createEvent('Event');

    changeEvent.initEvent('change', true, true);


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form             = $('[data-galleryembedgenerator]');
        $textarea         = $('[data-galleryembedgenerator-target]');
        $autoplayControl  = $('[name="autoplay"]');
        $timeControl      = $('[name="time"]');

        GalleryEmbedGenerator.init();
    });


    it("debe eliminar el parámetro 'autoplay' del código si no está chequeado", function() {

        if ($autoplayControl.prop('checked')){
            $autoplayControl.trigger('click');
        }

        expect($autoplayControl).not.toBeChecked();
        expect($textarea.val()).not.toMatch(/&autoplay=/);

    });


    it("debe añadir el valor seteado por el usuario al parámetro 'time' al código", function() {

        if (!$autoplayControl.prop('checked')){
            $autoplayControl.trigger('click');
        }

        $timeControl.val("2100");
        $timeControl[0].dispatchEvent(changeEvent);

        expect($textarea.val()).toMatch(/&autoplay=2100/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor false", function() {

        GalleryEmbedGenerator.kill();
        $autoplayControl.remove();
        $('<input name="autoplay" type="hidden" value="false">').appendTo($form);
        GalleryEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&autoplay=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor mayor al mínimo (2000)", function() {

        GalleryEmbedGenerator.kill();
        $timeControl.remove();
        $('<input name="time" type="hidden" value="3000">').appendTo($form);
        GalleryEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&autoplay=3000/);

    });


    it("debe activar y llevar a '2000' el campo 'Tiempo' si está chequeado", function() {

        expect($timeControl.prop('readonly')).toBe(true);
        expect($timeControl.val()).toBe("");

        if (!$autoplayControl.prop('checked')){
            $autoplayControl.trigger('click');
        }

        expect($autoplayControl).toBeChecked();
        expect($timeControl.prop('readonly')).toBe(false);
        expect($timeControl.val()).toBe("2000");


    });


    it("debe desactivar y limpiar el campo 'Tiempo de inicio' si no está chequeado", function() {

        if (!$autoplayControl.prop('checked')){
            $autoplayControl.trigger('click');
        }

        expect($autoplayControl).toBeChecked();
        expect($timeControl.prop('readonly')).toBe(false);
        expect($timeControl.val()).not.toBe("");

        $autoplayControl.trigger('click');

        expect($timeControl.prop('readonly')).toBe(true);
        expect($timeControl.val()).toBe("");

    });

});
