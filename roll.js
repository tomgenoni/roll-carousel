const rolls  = document.querySelectorAll(".roll");

rolls.forEach(function(roll) {
    const rollWrap    = roll.querySelector(".roll-wrap");

    const rollArrows  = roll.querySelectorAll(".roll-arrow");
    const rollPanes   = roll.querySelectorAll(".roll-pane");
    const rollDots    = roll.querySelectorAll(".roll-dot");
    const rollButtons = roll.querySelectorAll(".roll-button");

    rollArrows.forEach(function(arrow){
        arrow.addEventListener("click", arrowTrigger)
    });

    rollDots.forEach(function(dot){
        dot.addEventListener("click", dotTrigger)
    });

    function animate(step) {
        const value = -(step * 100);
        rollWrap.style.transform = `translateX( ${value}%)`;
    }

    function setStep(step) {
        roll.dataset.step = step;
    }

    function hideContol(step) {
        rollArrows[0].style.display = step == 0 ? "none" : "block";
        rollArrows[1].style.display = step == rollPanes.length - 1 ? "none" : "block";
    }

    function setActiveDot(step) {
        rollDots.forEach(function(dot) {
            dot.classList.remove("is-active");
        });
        rollDots[step].classList.add("is-active")
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
        if (step < rollPanes.length && step > -1) {
            animate(step);
            setStep(step);
            setActiveDot(step);
            hideContol(step);
        }
    }
})
