import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter Component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });
    // test("Debe de hacer match con el snapshot", () => {
    //     const wrapper = shallowMount(Counter);
    //     expect(wrapper.html()).toMatchSnapshot();
    // });
    test('H2 Debe tener el valor por defecto "Counter"', () => {
        expect(wrapper.find("h2").exists()).toBeTruthy();

        const h2Value = wrapper.find("h2").text();
        expect(h2Value).toBe("Counter");
    });

    test("El valor por defecto debe de ser 100 en el p", () => {
        // const value = wrapper.findAll("p");
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe("100");
    });

    test("debe de incrementar y decrementar el contador", async() => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll("button");
        await increaseBtn.trigger("click");
        await increaseBtn.trigger("click");
        await increaseBtn.trigger("click");
        await decreaseBtn.trigger("click");
        await decreaseBtn.trigger("click");

        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe("101");
    });

    test("debe establecer el valor por defecto ", () => {
        // console.log(wrapper.props());
        // const {start} = wrapper.props()
        const start = wrapper.props("start");
        console.log(start);
    });

    test("should show prop title", () => {
        const title = "Hola Mundo";
        const wrapper = shallowMount(Counter, {
            props: {
                title,
            },
        });

        expect(wrapper.find("h2").text()).toBe(title);
    });
});