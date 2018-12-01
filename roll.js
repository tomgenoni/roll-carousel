function initRoll() {
    const rolls = document.querySelectorAll(".roll");

    rolls.forEach(roll => {
        const wrap = roll.querySelector(".roll-wrap");
        const arrows = roll.querySelectorAll(".roll-arrow");
        const panes = roll.querySelectorAll(".roll-pane");
        const dots = roll.querySelectorAll(".roll-dot");

        arrows.forEach(arrow => {
            arrow.addEventListener("click", arrowTrigger);
        });

        dots.forEach(dot => {
            dot.addEventListener("click", dotTrigger);
        });

        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 37:
                    document
                        .querySelector(".roll.is-active .roll-arrow-left")
                        .click();
                    break;
                case 39:
                    document
                        .querySelector(".roll.is-active .roll-arrow-right")
                        .click();
                    break;
            }
        };

        function animate(step) {
            const value = -(step * 100);
            wrap.style.transform = `translateX( ${value}%)`;
        }

        function setStep(step) {
            roll.dataset.step = step;
        }

        function hideArrow(step) {
            arrows[0].style.display = step == 0 ? "none" : "block";
            arrows[1].style.display =
                step == panes.length - 1 ? "none" : "block";
        }

        function setActiveDot(step) {
            dots.forEach(({ classList }) => {
                classList.remove("is-active");
            });
            dots[step].classList.add("is-active");
        }

        function setActiveRoll(step) {
            rolls.forEach(({ classList }) => {
                classList.remove("is-active");
            });
            roll.classList.add("is-active");
        }

        // Click on arrow
        function arrowTrigger(e) {
            const direction = parseInt(this.dataset.dir);
            const oldStep = parseInt(roll.dataset.step);
            const step = oldStep + -direction;
            updateRoll(step, this);
        }

        // Click on dot
        function dotTrigger(e) {
            const step = this.dataset.step;
            updateRoll(step, this);
        }

        function updateRoll(step, roll) {
            if (step < panes.length && step > -1) {
                setActiveRoll(roll);
                animate(step);
                setStep(step);
                setActiveDot(step);
                hideArrow(step);
            }
        }
    });
}

initRoll();
