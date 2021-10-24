import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter Component", () => {
    // test("Debe de hacer match con el snapshot", () => {
    //     const wrapper = shallowMount(Counter);
    //     expect(wrapper.html()).toMatchSnapshot();
    // });
    test('H2 Debe tener el valor por defecto "Counter"', () => {
        const wrapper = shallowMount(Counter);
        expect(wrapper.find("h2").exists()).toBeTruthy();

        const h2Value = wrapper.find("h2").text();
        expect(h2Value).toBe("Counter");
    });

    test("El valor por defecto debe de ser 100 en el p", () => {
        const wrapper = shallowMount(Counter);
        // const value = wrapper.findAll("p");
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe("100");
    });

    test("debe de incrementar y decrementar el contador", async() => {
        const wrapper = shallowMount(Counter);
        const increaseBtn = wrapper.find("button");
        await increaseBtn.trigger("click");
        let value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe("101");

        const decreaseBtn = wrapper.findAll("button")[1];
        await decreaseBtn.trigger("click");
        await decreaseBtn.trigger("click");
        value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe("99");
    });
});