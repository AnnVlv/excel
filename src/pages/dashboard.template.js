const createItem = ({id, state}) => {
    const date = new Date(state.openDate)

    return `
        <li class="db__record">
            <a href="#excel/${id}">
                ${state.tableTitle}
            </a>
            <strong>
                ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
            </strong>
        </li>
    `
}

export const createDashboard = (items = []) => {
    const now = Date.now().toString()

    items = items
        .map(createItem)
        .join('')

    return `
        <div class="db__header">
            <h1>Excel Dashboard</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${now}" class="db__create">
                    Новая <br /> Таблица
                </a>
            </div>
        </div>
        
        ${items.length ? `
            <div class="db__table db__view">
                <div class="db__list-header">
                    <span>Название</span>
                    <span>Дата открытия</span>
                </div>
                
                <ul class="db__list">
                    ${items}
                </ul>
            </div>
        ` : `
            <div class="db__table">No tables</div>
        `}
    `
}
