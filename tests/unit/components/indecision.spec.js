import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe("Indecision Component", () => {
    let wrapper;
    let clgSpy;
    let getAnswerSpy;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    answer: "yes",
                    forced: false,
                    image: "https://yesno.wtf/assets/yes/2.gif",
                }),
        })
    );

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, "log");
        getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

        jest.clearAllMocks();
    });

    test("should match with snapshot ", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("escribir en el input no debe de disparar evento (console.log) ", async() => {
        const input = wrapper.find("input");
        await input.setValue("Hola Mundo");

        expect(clgSpy).toHaveBeenCalledTimes(1);
        // expect(getAnswerSpy).toHaveReturnedTimes(0);
        expect(getAnswerSpy).not.toHaveBeenCalled();
    });

    test('escribir el simbolo "?" debe de disparar el getAnswer', async() => {
        const input = wrapper.find("input");
        await input.setValue("Hola Mundo?");

        expect(getAnswerSpy).toHaveBeenCalled();
    });

    test("pruebas en getAnswer", async() => {
        await wrapper.vm.getAnswer();

        const img = wrapper.find("img");

        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
        expect(wrapper.vm.answer).toBe("Si!");
    });

    test("pruebas en el getAnswer - fallo en el API", async() => {
        fetch.mockImplementationOnce(() => Promise.reject("API is down"));
        await wrapper.vm.getAnswer();
        const img = wrapper.find("img");
        expect(img.exists()).toBeFalsy;
        expect(wrapper.vm.answer).toBe("No se pudo cargar el API");
    });
});