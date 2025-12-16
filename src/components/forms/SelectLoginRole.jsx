import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';



export default function SelectLoginRole({ label, value, onChange, disabled }) {


    const {t} = useTranslation();

    return (
        <div>
            <label className=""> {label ? label : t("auth.login")} </label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={value || ""} disabled={disabled} onChange={(e) => onChange(e)}>
                <option value="">{t("role.student")}</option>
                <option value="1">{t("role.teacher")}</option>
                <option value="2">{t("role.staff")}</option>
            </select>
        </div>
    )

}
