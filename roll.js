const rolls  = document.querySelectorAll(".roll");

rolls.forEach(function(roll) {
    const wrap    = roll.querySelector(".roll-wrap");

    const arrows  = roll.querySelectorAll(".roll-arrow");
    const panes   = roll.querySelectorAll(".roll-pane");
    const dots    = roll.querySelectorAll(".roll-dot");

    arrows.forEach(function(arrow){
        arrow.addEventListener("click", arrowTrigger);
    });

    dots.forEach(function(dot){
        dot.addEventListener("click", dotTrigger);
    });

    function animate(step) {
        const value = -(step * 100);
        wrap.style.transform = `translateX( ${value}%)`;
    }

    function setStep(step) {
        roll.dataset.step = step;
    }

    function hideContol(step) {
        arrows[0].style.display = step == 0 ? "none" : "block";
        arrows[1].style.display = step == panes.length - 1 ? "none" : "block";
    }

    function setActiveDot(step) {
        dots.forEach(function(dot) {
            dot.classList.remove("is-active");
        });
        dots[step].classList.add("is-active")
    }

    function arrowTrigger(e) {
        const direction = parseInt(this.dataset.dir);
        const oldStep = parseInt(roll.dataset.step);
        const step = oldStep + -(direction);
        updateRoll(step);
    }

    function dotTrigger(e) {
        const step = this.dataset.step;
        updateRoll(step);
    }

    function updateRoll(step) {
        if (step < panes.length && step > -1) {
            animate(step);
            setStep(step);
            setActiveDot(step);
            hideContol(step);
        }
    }
})
